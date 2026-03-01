import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authenticatePluginRequest } from "@/lib/auth";
import { consumeCredits } from "@/lib/credits";
import { callOpenAIChatCompletions } from "@/lib/openai";

export const runtime = "nodejs";

const RequestSchema = z.object({
  model: z.string().optional(),
  messages: z.array(z.any()).min(1),
  tools: z.array(z.any()).optional(),
  tool_choice: z.any().optional()
});

export async function POST(req: NextRequest) {
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

  const creditResult = await consumeCredits(auth.key.id, 1, "chat_completion", {
    domain: auth.domain,
    model: assignedModel
  });

  if (!creditResult.ok) {
    return NextResponse.json({ message: creditResult.message }, { status: creditResult.status });
  }

  const ai = await callOpenAIChatCompletions(payloadToProcess);

  if (!ai.ok) {
    return NextResponse.json({ message: ai.message }, { status: ai.status });
  }

  return NextResponse.json(ai.data, { status: 200 });
}
