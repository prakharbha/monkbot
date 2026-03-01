import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/session";
import Link from "next/link";

export default async function AdminOverviewPage() {
    const session = await verifySession();

    if (!session?.userId) {
        redirect("/sign-in");
    }

    // Verify Admin Role
    const user = await prisma.user.findUnique({
        where: { id: session.userId },
    });

    if (user?.role !== "ADMIN") {
        redirect("/dashboard");
    }

    // Quick metrics
    const totalUsers = await prisma.user.count();
    const activeKeys = await prisma.apiKey.count({ where: { status: "ACTIVE" } });
    const totalDomains = await prisma.allowedDomain.count();

    return (
        <div className="max-w-5xl mx-auto w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-1">Total Customers</div>
                    <div className="text-3xl font-bold text-gray-900">{totalUsers}</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-1">Active API Keys</div>
                    <div className="text-3xl font-bold text-gray-900">{activeKeys}</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-1">Connected Domains</div>
                    <div className="text-3xl font-bold text-gray-900">{totalDomains}</div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Quick Links</h2>
                </div>
                <div className="space-y-3">
                    <Link href="/admin/customers" className="flex items-center justify-between p-4 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="font-medium text-gray-900">Manage Customers</span>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>

                    <Link href="/admin/history" className="flex items-center justify-between p-4 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <span className="font-medium text-gray-900">View Chat History</span>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
