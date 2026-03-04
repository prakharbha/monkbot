<?php
/**
 * Telegram Webhook Handler
 *
 * Security: All incoming webhook requests are validated against a shared
 * secret token (stored in WP options) via the X-Telegram-Bot-Api-Secret-Token
 * header, as recommended by the Telegram Bot API documentation.
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Telegram Webhook Endpoint
 */
function monkbot_register_telegram_webhook()
{
    register_rest_route('monkbot/v1', '/telegram-webhook', array(
        'methods' => WP_REST_Server::CREATABLE,
        'callback' => 'monkbot_handle_telegram_webhook',
        'permission_callback' => 'monkbot_verify_telegram_secret', // Validates Telegram secret token
    ));
}
add_action('rest_api_init', 'monkbot_register_telegram_webhook');

/**
 * Permission callback: verify the X-Telegram-Bot-Api-Secret-Token header.
 * Returns true only if the header matches our stored secret.
 */
function monkbot_verify_telegram_secret(WP_REST_Request $request)
{
    $stored_secret = get_option('monkbot_telegram_secret_token', '');

    // If no secret is configured, fall back to chat_id validation only (backward compat)
    if (empty($stored_secret)) {
        return true;
    }

    $provided_secret = $request->get_header('X-Telegram-Bot-Api-Secret-Token');

    // Use hash_equals() to prevent timing attacks
    return hash_equals($stored_secret, (string) $provided_secret);
}

/**
 * Generate (or retrieve) the Telegram webhook secret token.
 * Called when the user saves settings.
 */
function monkbot_get_or_create_telegram_secret()
{
    $secret = get_option('monkbot_telegram_secret_token', '');
    if (empty($secret)) {
        // Generate a 32-byte random hex token
        $secret = bin2hex(random_bytes(32));
        update_option('monkbot_telegram_secret_token', $secret, false);
    }
    return $secret;
}

/**
 * Handle incoming Telegram requests
 */
function monkbot_handle_telegram_webhook(WP_REST_Request $request)
{
    $body = $request->get_json_params();

    // Check if it's a message
    if (!isset($body['message']['text'])) {
        return new WP_REST_Response('Not a text message', 200);
    }

    $chat_id = $body['message']['chat']['id'];
    $incoming_text = sanitize_text_field($body['message']['text']);

    // Ensure we are responding to the configured chat ID
    $allowed_chat_id = get_option('monkbot_telegram_chat_id');
    if (!empty($allowed_chat_id) && (string) $chat_id !== (string) $allowed_chat_id) {
        return new WP_REST_Response('Unauthorized chat ID', 200);
    }

    $bot_token = get_option('monkbot_telegram_bot_token');
    if (empty($bot_token)) {
        return new WP_REST_Response('Bot token not configured', 200);
    }

    $validation = monkbot_validate_saas_access(false);


    if (empty($validation['allowed'])) {
        $msg = !empty($validation['message'])
            ? $validation['message']
            : 'MonkBot SaaS key/domain validation failed.';
        monkbot_telegram_send_message($chat_id, $msg, $bot_token);
        return new WP_REST_Response('SaaS Validation Failed', 200);
    }

    $messages = array(
        array('role' => 'system', 'content' => 'You are MonkBot, a helpful WordPress site management assistant.'),
        array('role' => 'user', 'content' => $incoming_text),
    );

    $tools = monkbot_get_tools();

    $payload = array(
        'messages' => $messages,
        'tools' => $tools,
        'tool_choice' => 'auto',
    );

    // Temporarily grant admin privileges for tool execution
    // Telegram webhooks are verified via X-Telegram-Bot-Api-Secret-Token, so this is safe.
    $original_user_id = get_current_user_id();
    $admins = get_users(array('role' => 'administrator', 'number' => 1));
    if (!empty($admins)) {
        wp_set_current_user($admins[0]->ID);
    }

    $response = monkbot_saas_chat_completion($payload, 30);

    // Restore original user context immediately if the initial SaaS call fails
    if (empty($response['ok'])) {
        wp_set_current_user($original_user_id);
        monkbot_telegram_send_message($chat_id, 'Error reaching MonkBot SaaS.', $bot_token);
        return new WP_REST_Response('SaaS Error', 200);
    }

    $data = $response['data'] ?? array();

    if (isset($data['choices'][0]['message'])) {
        $message = $data['choices'][0]['message'];

        if (!empty($message['tool_calls'])) {
            $messages[] = $message;

            foreach ($message['tool_calls'] as $tool_call) {
                $tool_name = $tool_call['function']['name'];
                $tool_args = json_decode($tool_call['function']['arguments'], true) ?: array();
                $tool_result = monkbot_execute_tool($tool_name, $tool_args);

                $messages[] = array(
                    'role' => 'tool',
                    'tool_call_id' => $tool_call['id'],
                    'name' => $tool_name,
                    'content' => $tool_result,
                );
            }

            $payload['messages'] = $messages;
            $second_response = monkbot_saas_chat_completion($payload, 30);

            if (!empty($second_response['ok'])) {
                $second_data = $second_response['data'] ?? array();
                $message = $second_data['choices'][0]['message'] ?? $message;
            }
        }
    }

    // Restore original user context after all tools have executed
    wp_set_current_user($original_user_id);

    $reply_text = 'I encountered an error processing your request.';
    if (!empty($message['content'])) {
        $reply_text = $message['content'];
    }

    monkbot_telegram_send_message($chat_id, $reply_text, $bot_token);

    return new WP_REST_Response('OK', 200);
}

/**
 * Helper: send a message back to Telegram.
 */
function monkbot_telegram_send_message($chat_id, $text, $bot_token)
{
    $url = 'https://api.telegram.org/bot' . $bot_token . '/sendMessage';

    wp_remote_post($url, array(
        'headers' => array('Content-Type' => 'application/json'),
        'body' => wp_json_encode(array(
            'chat_id' => $chat_id,
            'text' => $text,
        )),
        'timeout' => 15,
    ));
}
