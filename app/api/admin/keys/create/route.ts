import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { generateApiKey } from "@/lib/auth";

export const runtime = "nodejs";

const BodySchema = z.object({
  label: z.string().min(1).max(100).optional(),
  plan: z.enum(["FREE", "PRO_MANUAL"]).default("FREE"),
  monthlyCreditCap: z.number().int().positive().optional(),
  creditsRemaining: z.number().int().nonnegative().optional()
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

  const generated = generateApiKey();
  const defaultCredits = Number(process.env.DEFAULT_FREE_CREDITS ?? "50");

  const row = await prisma.apiKey.create({
    data: {
      keyPrefix: generated.keyPrefix,
      keyHash: generated.keyHash,
      label: parsed.data.label,
      plan: parsed.data.plan,
      monthlyCreditCap: parsed.data.monthlyCreditCap,
      creditsRemaining: parsed.data.creditsRemaining ?? defaultCredits
    }
  });

  return NextResponse.json({
    id: row.id,
    key: generated.rawKey,
    plan: row.plan,
    creditsRemaining: row.creditsRemaining
  });
}
