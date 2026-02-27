import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { normalizeDomain } from "@/lib/site";

export const runtime = "nodejs";

const BodySchema = z.object({
  apiKeyId: z.string().min(1),
  domain: z.string().min(1)
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

  const domain = normalizeDomain(parsed.data.domain);
  const key = await prisma.apiKey.findUnique({ where: { id: parsed.data.apiKeyId } });
  if (!key) {
    return NextResponse.json({ message: "API key not found" }, { status: 404 });
  }

  if (key.plan === "FREE") {
    const activeCount = await prisma.allowedDomain.count({
      where: { apiKeyId: key.id, status: "ACTIVE" }
    });
    const existing = await prisma.allowedDomain.findUnique({
      where: { apiKeyId_domain: { apiKeyId: key.id, domain } }
    });

    if (!existing && activeCount >= 1) {
      return NextResponse.json({ message: "Free plan allows only 1 linked domain." }, { status: 402 });
    }
  }

  const linked = await prisma.allowedDomain.upsert({
    where: { apiKeyId_domain: { apiKeyId: key.id, domain } },
    update: { status: "ACTIVE" },
    create: { apiKeyId: key.id, domain, status: "ACTIVE" }
  });

  return NextResponse.json({ id: linked.id, apiKeyId: linked.apiKeyId, domain: linked.domain, status: linked.status });
}
