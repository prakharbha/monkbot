import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/session";

// Routes that require authentication
const protectedRoutes = ["/dashboard"];
// Routes that are strictly for unauthenticated users (e.g. login pages)
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
    const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

    // The verifySession function uses standard Web Crypto API (via jose) and Next.js cookies,
    // which works on the Edge runtime.
    const session = await verifySession();

    if (isProtectedRoute && !session?.userId) {
        // Redirect unauthenticated users trying to access protected routes to /sign-in
        return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
    }

    if (isAuthRoute && session?.userId) {
        // Redirect authenticated users away from auth pages to /dashboard
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
