import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addCredits } from "@/lib/credits";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const BodySchema = z.object({
  apiKeyId: z.string().min(1),
  delta: z.number().int(),
  reason: z.string().min(1).max(100).default("manual_adjustment")
});

function isAdmin(req: NextRequest): boolean {
  const secret = req.headers.get("x-admin-secret");
  return !!secret && secret === process.env.ADMIN_SECRET;
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const raw = await req.json().catch(() => ({}));
  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const key = await prisma.apiKey.findUnique({ where: { id: parsed.data.apiKeyId } });
  if (!key) {
    return NextResponse.json({ message: "API key not found" }, { status: 404 });
  }

  await addCredits(parsed.data.apiKeyId, parsed.data.delta, parsed.data.reason, { source: "admin_api" });
  const refreshed = await prisma.apiKey.findUnique({ where: { id: parsed.data.apiKeyId } });

  return NextResponse.json({ id: key.id, creditsRemaining: refreshed?.creditsRemaining ?? null });
}
