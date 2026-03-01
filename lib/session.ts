import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Fallback secret for local development. In production, ensure this is set in .env
const secretKey = process.env.ADMIN_SECRET || "fallback-secret-key-change-me";
const key = new TextEncoder().encode(secretKey);

export type SessionPayload = {
    userId: string;
    email: string;
    expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(key);
}

export async function decrypt(input: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload as SessionPayload;
    } catch (error) {
        return null;
    }
}

export async function createSession(userId: string, email: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const session = await encrypt({ userId, email, expiresAt });

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}

export async function verifySession() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
        return null;
    }

    const session = await decrypt(sessionCookie);
    if (!session?.userId) {
        return null;
    }

    // M3 Fix: Roll the session on every request so it keeps sliding forward
    // This ensures inactive sessions expire and active sessions stay alive
    await createSession(session.userId, session.email);

    return session;
}

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}
