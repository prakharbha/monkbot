import { NextResponse } from "next/server";
import { verifySession } from "@/lib/session";

export async function GET() {
    const session = await verifySession();
    if (!session) {
        return NextResponse.json({ user: null }, { status: 200 });
    }
    return NextResponse.json({ user: { email: session.email } }, { status: 200 });
}
