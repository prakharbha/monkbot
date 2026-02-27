import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/session";

export async function GET() {
    try {
        const session = await verifySession();

        if (!session?.userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Check ADMIN role
        const currentUser = await prisma.user.findUnique({
            where: { id: session.userId },
            select: { role: true }
        });

        if (!currentUser || currentUser.role !== "ADMIN") {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const users = await prisma.user.findMany({
            include: {
                keys: {
                    include: {
                        domains: true,
                    },
                },
                invoices: {
                    orderBy: {
                        invoiceDate: "desc",
                    },
                    take: 1, // Get the latest invoice for quick preview
                },
                subscriptions: {
                    where: {
                        status: "ACTIVE",
                    },
                    take: 1, // Get current active subscription
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({ users });
    } catch (error) {
        console.error("Error fetching admin users:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
