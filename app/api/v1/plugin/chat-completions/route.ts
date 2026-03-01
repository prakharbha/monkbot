import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authenticatePluginRequest } from "@/lib/auth";
import { consumeCredits } from "@/lib/credits";
import { callOpenAIChatCompletions } from "@/lib/openai";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const ToolSchema = z.object({
  type: z.literal("function"),
  function: z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(1000).optional(),
    parameters: z.record(z.string(), z.unknown()).optional(),
  }),
});

// M2-R3: Typed message schema — blocks system role injection and unlimited content strings
const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system", "tool"]),
  content: z.string().max(10_000).nullable().optional(),
  tool_calls: z.array(z.any()).optional(),
  tool_call_id: z.string().optional(),
  name: z.string().optional(),
});

// H2-R3: Limit to 50 messages max to prevent DoS + cost amplification
const RequestSchema = z.object({
  model: z.string().optional(),
  messages: z.array(MessageSchema).min(1).max(50),
  tools: z.array(ToolSchema).optional(),
  tool_choice: z.any().optional()
});

export async function POST(req: NextRequest) {
  // H2-R3: Reject oversized payloads before doing anything else (prevent DoS/cost amplification)
  const contentLength = parseInt(req.headers.get("content-length") ?? "0");
  if (contentLength > 100_000) {
    return NextResponse.json({ message: "Request payload too large." }, { status: 413 });
  }

  const auth = await authenticatePluginRequest(
    req.headers.get("authorization"),
    req.headers.get("x-monkbot-domain")
  );

  if (!auth.ok) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }

  const body = await req.json().catch(() => null);
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }

  // Inject model from SaaS billing logic instead of trusting the WordPress parameter
  const assignedModel = auth.key.model || "gpt-4o-mini";
  const payloadToProcess = {
    ...parsed.data,
    model: assignedModel
  };

  const messages = parsed.data.messages;
  const lastMessage = messages[messages.length - 1];
  const isUserPrompt = lastMessage?.role === "user";

  if (isUserPrompt) {
    const creditResult = await consumeCredits(auth.key.id, 1, "chat_completion", {
      domain: auth.domain,
      model: assignedModel
    });

    if (!creditResult.ok) {
      return NextResponse.json({ message: creditResult.message }, { status: creditResult.status });
    }
  }

  const ai = await callOpenAIChatCompletions(payloadToProcess);

  if (!ai.ok) {
    return NextResponse.json({ message: ai.message }, { status: ai.status });
  }

  const responseMessage = ai.data?.choices?.[0]?.message;
  if (responseMessage && responseMessage.content && !responseMessage.tool_calls) {
    const promptMessage = [...messages].reverse().find(m => m.role === "user");
    if (promptMessage && promptMessage.content) {
      const promptText = typeof promptMessage.content === "string"
        ? promptMessage.content
        : JSON.stringify(promptMessage.content);

      await prisma.chatLog.create({
        data: {
          apiKeyId: auth.key.id,
          domain: auth.domain,
          prompt: promptText,
          response: responseMessage.content
        }
      }).catch((e: unknown) => console.error("Failed to save chat log:", e));
    }
  }

  return NextResponse.json(ai.data, { status: 200 });
}
