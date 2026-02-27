import { NextRequest, NextResponse } from "next/server";
import { authenticatePluginRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const auth = await authenticatePluginRequest(
    req.headers.get("authorization"),
    req.headers.get("x-monkbot-domain")
  );

  if (!auth.ok) {
    return NextResponse.json({ allowed: false, message: auth.message }, { status: auth.status });
  }

  return NextResponse.json({
    allowed: true,
    message: "OK",
    plan: auth.key.plan.toLowerCase(),
    credits_remaining: auth.key.creditsRemaining
  });
}
