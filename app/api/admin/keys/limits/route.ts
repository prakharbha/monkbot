import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/session";

export async function POST(req: Request) {
    try {
        const session = await verifySession();
        if (!session?.userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const currentUser = await prisma.user.findUnique({
            where: { id: session.userId },
            select: { role: true }
        });

        if (!currentUser || currentUser.role !== "ADMIN") {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const { keyId, maxDomains, creditsRemaining } = await req.json();

        if (!keyId || maxDomains === undefined || creditsRemaining === undefined) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const updatedKey = await prisma.apiKey.update({
            where: { id: keyId },
            data: {
                maxDomains: parseInt(maxDomains, 10),
                creditsRemaining: parseInt(creditsRemaining, 10)
            }
        });

        return NextResponse.json({ success: true, key: updatedKey });
    } catch (error) {
        console.error("Error updating API key limits:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
