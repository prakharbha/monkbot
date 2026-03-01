import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/session";

export async function GET() {
    try {
        const session = await verifySession();

        if (!session?.userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Verify Admin Role
        const currentUser = await prisma.user.findUnique({
            where: { id: session.userId },
            select: { role: true }
        });

        if (!currentUser || currentUser.role !== "ADMIN") {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const logs = await prisma.chatLog.findMany({
            include: {
                apiKey: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 100 // Limit to latest 100 logs for this view
        });

        return NextResponse.json({ logs });
    } catch (error) {
        console.error("Error fetching chat logs:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
