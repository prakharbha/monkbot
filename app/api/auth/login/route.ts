import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";

// C1-R2 Fix: IP-based rate limiter — max 10 login attempts per IP per 15 minutes
const loginRateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isLoginRateLimited(ip: string): boolean {
    const now = Date.now();
    const window = 15 * 60 * 1000; // 15 minutes
    const entry = loginRateLimitMap.get(ip);
    if (!entry || entry.resetAt < now) {
        loginRateLimitMap.set(ip, { count: 1, resetAt: now + window });
        return false;
    }
    if (entry.count >= 10) return true;
    entry.count++;
    return false;
}

export async function POST(req: Request) {
    // C1-R2: Rate limit by IP before doing any DB work
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isLoginRateLimited(ip)) {
        return NextResponse.json(
            { message: "Too many login attempts. Please try again in 15 minutes." },
            { status: 429 }
        );
    }

    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        // C1-R2: Use constant-time comparison path — always run bcrypt even if user not found
        // This prevents timing-based account enumeration
        const dummyHash = "$2b$10$invalidhashforbcryptcompare000000000000000000000000000000";
        const hashToCompare = user?.password ?? dummyHash;
        const isPasswordValid = await bcrypt.compare(password, hashToCompare);

        if (!user || !isPasswordValid) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        await createSession(user.id, user.email);

        return NextResponse.json(
            { message: "Login successful", user: { id: user.id, email: user.email, name: user.name } },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
