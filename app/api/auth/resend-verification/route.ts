import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/session";
import { sendVerificationEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST() {
    const session = await verifySession();
    if (!session?.userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    if (user.emailVerified) {
        return NextResponse.json({ message: "Email is already verified." }, { status: 400 });
    }

    // Delete any existing token for this email
    await prisma.verificationToken.deleteMany({ where: { email: user.email } });

    const token = crypto.randomBytes(32).toString("hex");
    await prisma.verificationToken.create({
        data: {
            email: user.email,
            token,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
    });

    await sendVerificationEmail(user.email, token);

    return NextResponse.json({ message: "Verification email sent." }, { status: 200 });
}
