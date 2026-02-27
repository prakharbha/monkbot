import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

function toJsonMeta(meta?: Record<string, unknown>): Prisma.InputJsonValue | undefined {
  if (!meta) return undefined;
  return meta as Prisma.InputJsonValue;
}

export async function consumeCredits(apiKeyId: string, amount: number, reason: string, meta?: Record<string, unknown>) {
  if (amount <= 0) return { ok: true as const };

  const updated = await prisma.apiKey.updateMany({
    where: { id: apiKeyId, creditsRemaining: { gte: amount }, status: "ACTIVE" },
    data: { creditsRemaining: { decrement: amount }, lastUsedAt: new Date() }
  });

  if (updated.count !== 1) {
    return { ok: false as const, status: 402, message: "Insufficient credits." };
  }

  await prisma.creditLedger.create({
    data: { apiKeyId, delta: -amount, reason, meta: toJsonMeta(meta) }
  });

  return { ok: true as const };
}

export async function addCredits(apiKeyId: string, delta: number, reason: string, meta?: Record<string, unknown>) {
  await prisma.$transaction([
    prisma.apiKey.update({
      where: { id: apiKeyId },
      data: { creditsRemaining: { increment: delta } }
    }),
    prisma.creditLedger.create({ data: { apiKeyId, delta, reason, meta: toJsonMeta(meta) } })
  ]);
}
