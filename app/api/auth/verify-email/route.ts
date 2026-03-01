import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.json({ message: "Missing token" }, { status: 400 });
        }

        const existingToken = await prisma.verificationToken.findUnique({
            where: { token },
        });

        if (!existingToken) {
            // L1-R3: Same message for all token failures to prevent timing info leak
            return NextResponse.json({ message: "Invalid or expired verification link." }, { status: 400 });
        }

        const hasExpired = new Date(existingToken.expiresAt) < new Date();
        if (hasExpired) {
            return NextResponse.json({ message: "Invalid or expired verification link." }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: existingToken.email },
        });

        if (!existingUser) {
            return NextResponse.json({ message: "Email does not exist!" }, { status: 400 });
        }

        await prisma.user.update({
            where: { id: existingUser.id },
            data: {
                emailVerified: new Date(),
                email: existingToken.email,
            },
        });

        await prisma.verificationToken.delete({
            where: { id: existingToken.id },
        });

        // H1-R3: Use NEXT_PUBLIC_APP_URL as the base, never req.url (prevents open redirect)
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://monkbot.app";
        return NextResponse.redirect(new URL("/dashboard", appUrl));
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
