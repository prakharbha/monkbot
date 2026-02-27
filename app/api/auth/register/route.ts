import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";
import { generateApiKey } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user and first API key in a transaction
        const newUser = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                },
            });

            const { rawKey, keyPrefix, keyHash } = generateApiKey();

            await tx.apiKey.create({
                data: {
                    userId: user.id,
                    keyPrefix,
                    keyHash,
                    keyToken: rawKey,
                    label: "API key",
                    plan: "FREE",
                    creditsRemaining: parseInt(process.env.DEFAULT_FREE_CREDITS || "50", 10),
                },
            });

            return user;
        });

        // Create session
        await createSession(newUser.id, newUser.email);

        return NextResponse.json(
            { message: "Registration successful", user: { id: newUser.id, email: newUser.email, name: newUser.name } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
