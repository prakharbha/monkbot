import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/session";
import { generateApiKey } from "@/lib/auth";

export async function GET() {
    const session = await verifySession();

    if (!session?.userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const [user, keys] = await Promise.all([
            prisma.user.findUnique({ where: { id: session.userId }, select: { name: true, emailVerified: true } }),
            prisma.apiKey.findMany({
                where: { userId: session.userId },
                include: { domains: true },
                orderBy: { createdAt: "desc" },
            }),
        ]);

        return NextResponse.json({ keys, userName: user?.name ?? null, emailVerified: !!user?.emailVerified }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user keys:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST() {
    const session = await verifySession();
    if (!session?.userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const existingKeys = await prisma.apiKey.findMany({ where: { userId: session.userId } });
        if (existingKeys.length === 0) {
            return NextResponse.json({ message: "No keys found to replace" }, { status: 404 });
        }

        const keyToUpdate = existingKeys[0];
        const { rawKey, keyPrefix, keyHash } = generateApiKey();

        const updatedKey = await prisma.apiKey.update({
            where: { id: keyToUpdate.id },
            data: { keyPrefix, keyHash, keyToken: rawKey, lastUsedAt: null },
            include: { domains: true }
        });

        return NextResponse.json({ key: updatedKey, rawKey }, { status: 200 });
    } catch (error) {
        console.error("Error generating new key:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
