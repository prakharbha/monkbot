import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { generateApiKey } from "@/lib/auth";
import crypto from "crypto";

export const runtime = "nodejs";

const BodySchema = z.object({
  userId: z.string(),
  label: z.string().min(1).max(100).optional(),
  plan: z.enum(["FREE", "PRO_MANUAL"]).default("FREE"),
  monthlyCreditCap: z.number().int().positive().optional(),
  creditsRemaining: z.number().int().nonnegative().optional()
});

function isAdmin(req: NextRequest): boolean {
  const secret = req.headers.get("x-admin-secret");
  const adminSecret = process.env.ADMIN_SECRET;
  if (!secret || !adminSecret) return false;
  try {
    const a = Buffer.from(secret);
    const b = Buffer.from(adminSecret);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
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

  const generated = generateApiKey();
  const defaultCredits = Number(process.env.DEFAULT_FREE_CREDITS ?? "50");

  const row = await prisma.apiKey.create({
    data: {
      keyPrefix: generated.keyPrefix,
      keyHash: generated.keyHash,
      label: parsed.data.label,
      plan: parsed.data.plan,
      monthlyCreditCap: parsed.data.monthlyCreditCap,
      creditsRemaining: parsed.data.creditsRemaining ?? defaultCredits,
      userId: parsed.data.userId
    }
  });

  return NextResponse.json({
    id: row.id,
    key: generated.rawKey,
    plan: row.plan,
    creditsRemaining: row.creditsRemaining
  });
}
