import Link from "next/link";
import { headers } from "next/headers";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Simple navigation links for the admin sidebar
    const navItems = [
        { name: 'Overview', href: '/admin', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { name: 'Customers', href: '/admin/customers', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen">
                <div className="p-6 h-16 flex items-center border-b border-gray-100">
                    <Link href="/">
                        <img src="/brand/monkbot-logo.png" alt="Monkbot" className="h-8 w-auto" />
                    </Link>
                    <span className="ml-3 text-xs font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link href="/dashboard" className="flex items-center text-sm font-medium text-gray-600 hover:text-black">
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Exit Admin
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-gray-200 h-16 flex items-center px-4 justify-between sticky top-0 z-30">
                    <Link href="/">
                        <img src="/brand/monkbot-logo.png" alt="Monkbot" className="h-8 w-auto" />
                    </Link>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Admin</span>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
