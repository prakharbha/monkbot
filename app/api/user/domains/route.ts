import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/session";
import { normalizeDomain } from "@/lib/site";

export async function POST(req: Request) {
    const session = await verifySession();
    if (!session?.userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const { domain } = await req.json();
        if (!domain) return NextResponse.json({ message: "Domain is required" }, { status: 400 });

        const normalized = normalizeDomain(domain);
        if (!normalized) return NextResponse.json({ message: "Invalid domain format" }, { status: 400 });

        const keys = await prisma.apiKey.findMany({ where: { userId: session.userId } });
        if (keys.length === 0) return NextResponse.json({ message: "No API key found" }, { status: 404 });

        const apiKeyId = keys[0].id;

        const existing = await prisma.allowedDomain.findFirst({
            where: { apiKeyId, domain: normalized }
        });

        if (existing) {
            return NextResponse.json({ message: "Domain already added" }, { status: 400 });
        }

        const count = await prisma.allowedDomain.count({ where: { apiKeyId } });
        if (count >= 3 && keys[0].plan === "FREE") {
            return NextResponse.json({ message: "Free plan is limited to 3 domains." }, { status: 403 });
        }

        const newDomain = await prisma.allowedDomain.create({
            data: {
                apiKeyId,
                domain: normalized,
                status: "ACTIVE"
            }
        });

        return NextResponse.json({ domain: newDomain }, { status: 201 });
    } catch (error) {
        console.error("Error adding domain:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await verifySession();
    if (!session?.userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ message: "Domain ID is required" }, { status: 400 });

        const domainRecord = await prisma.allowedDomain.findUnique({
            where: { id },
            include: { apiKey: true }
        });

        if (!domainRecord || domainRecord.apiKey.userId !== session.userId) {
            return NextResponse.json({ message: "Not found or unauthorized" }, { status: 404 });
        }

        await prisma.allowedDomain.delete({ where: { id } });

        return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting domain:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
