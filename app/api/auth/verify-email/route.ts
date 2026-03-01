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
            return NextResponse.json({ message: "Token does not exist!" }, { status: 400 });
        }

        const hasExpired = new Date(existingToken.expiresAt) < new Date();
        if (hasExpired) {
            return NextResponse.json({ message: "Token has expired!" }, { status: 400 });
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

        // Redirect to dashboard or success page
        return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
