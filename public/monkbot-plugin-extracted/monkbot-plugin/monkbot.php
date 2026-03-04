<?php
/**
 * Plugin Name:       MonkBot SaaS — MCP Server Bot
 * Description:       The first WordPress MCP Server chatbot plugin. Control your entire WordPress site through natural language — via a built-in dashboard chatbot or Telegram. Powered by OpenAI and the WordPress 6.9 Abilities API (wp_register_ability).
 * Version:           1.2.1
 * Author:            Prakhar Bhatia
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       monkbot
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Define plugin constants
define('MONKBOT_VERSION', '1.2.1');
define('MONKBOT_PATH', plugin_dir_path(__FILE__));
define('MONKBOT_URL', plugin_dir_url(__FILE__));

// Include modular files
require_once MONKBOT_PATH . 'includes/admin-menu.php';
require_once MONKBOT_PATH . 'includes/settings.php';
require_once MONKBOT_PATH . 'includes/security-settings.php';
require_once MONKBOT_PATH . 'includes/saas.php';
// Load AI Tools modules first (execution logic used by abilities.php callbacks)
require_once MONKBOT_PATH . 'includes/tools/posts.php';
require_once MONKBOT_PATH . 'includes/tools/users.php';
require_once MONKBOT_PATH . 'includes/tools/comments.php';
require_once MONKBOT_PATH . 'includes/tools/system.php';
require_once MONKBOT_PATH . 'includes/tools/woocommerce.php';
require_once MONKBOT_PATH . 'includes/tools/hooks.php';
require_once MONKBOT_PATH . 'includes/tools/database.php';
// Note: shell.php has been removed for security (see MonkBot Security documentation)
require_once MONKBOT_PATH . 'includes/tools/acf.php';
// Register abilities with WP 6.9 Abilities API (hooks into wp_abilities_api_init)
require_once MONKBOT_PATH . 'includes/abilities.php';
// Bridge: convert WP Abilities into OpenAI function-calling format
require_once MONKBOT_PATH . 'includes/ai-tools.php';


require_once MONKBOT_PATH . 'includes/telegram.php';
require_once MONKBOT_PATH . 'includes/enqueue.php';
require_once MONKBOT_PATH . 'includes/api.php';
