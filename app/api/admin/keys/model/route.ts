import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/session";

export async function POST(req: NextRequest) {
    try {
        const session = await verifySession();

        if (!session?.userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Verify ADMIN role
        const currentUser = await prisma.user.findUnique({
            where: { id: session.userId },
            select: { role: true },
        });

        if (!currentUser || currentUser.role !== "ADMIN") {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const body = await req.json();
        const { keyId, model } = body;

        if (!keyId || !model) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // M1-R2 Fix: Only allow known, valid OpenAI model IDs
        const ALLOWED_MODELS = [
            "gpt-4o",
            "gpt-4o-mini",
            "gpt-4-turbo",
            "gpt-4-turbo-preview",
            "gpt-3.5-turbo",
            "gpt-3.5-turbo-16k",
        ];
        if (!ALLOWED_MODELS.includes(model)) {
            return NextResponse.json(
                { message: `Invalid model. Allowed values: ${ALLOWED_MODELS.join(", ")}` },
                { status: 400 }
            );
        }

        // Update the key's model
        const updatedKey = await prisma.apiKey.update({
            where: { id: keyId },
            data: { model },
        });

        return NextResponse.json({ success: true, key: updatedKey });
    } catch (error) {
        console.error("Error updating API key model:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
