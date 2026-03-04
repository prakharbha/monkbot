import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/db";
import { normalizeDomain } from "@/lib/site";

export function hashApiKey(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

export function generateApiKey(): { rawKey: string; keyPrefix: string; keyHash: string } {
  const token = randomBytes(24).toString("base64url");
  const rawKey = `mb_live_${token}`;
  return {
    rawKey,
    keyPrefix: rawKey.slice(0, 14),
    keyHash: hashApiKey(rawKey)
  };
}

function readBearerToken(header: string | null): string {
  if (!header) return "";
  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return "";
  return token.trim();
}

export async function authenticatePluginRequest(authorizationHeader: string | null, domainHeader: string | null) {
  const token = readBearerToken(authorizationHeader);
  if (!token) {
    return { ok: false as const, status: 401, message: "Missing Bearer token." };
  }

  const keyHash = hashApiKey(token);
  const key = await prisma.apiKey.findUnique({
    where: { keyHash },
    include: { domains: true }
  });

  if (!key || key.status !== "ACTIVE") {
    return { ok: false as const, status: 401, message: "Invalid or disabled API key." };
  }

  const domain = normalizeDomain(domainHeader ?? "");
  if (!domain) {
    return { ok: false as const, status: 400, message: "Missing X-Monkbot-Domain header." };
  }

  // Sort linked domains by createdAt descending (newest first)
  const activeDomains = key.domains
    .filter((d) => d.status === "ACTIVE")
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  // Enforce maxDomains limit: only the newest N domains are allowed
  const allowedDomains = activeDomains.slice(0, key.maxDomains);

  const matchedDomain = allowedDomains.find((d) => d.domain === domain);
  if (!matchedDomain) {
    if (activeDomains.find((d) => d.domain === domain)) {
      return { ok: false as const, status: 403, message: "Domain limit exceeded. Only the most recently added domain is active." };
    }
    return { ok: false as const, status: 403, message: "Domain is not linked to this API key." };
  }

  return { ok: true as const, key, domain: matchedDomain.domain };
}
