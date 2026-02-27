"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<{ name?: string, email?: string } | null>(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // We don't have a /api/auth/me yet, but we have /api/user/keys which returns 401 if not authed.
                // It's a quick way to check, or we can just look for the session cookie if we use next-client-cookies.
                // A better way is fetching a brief user info route. Let's create one or just use keys to check auth for now.
                const res = await fetch("/api/user/keys");
                if (res.ok) {
                    setUser({ name: "User" }); // Ideally we'd return the user's name from this API
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setIsLoadingAuth(false);
            }
        };
        checkAuth();
    }, []);

    useEffect(() => {
        // Prevent scrolling when mobile menu is open
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [mobileMenuOpen]);

    // Close menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <header className="w-full sticky top-0 z-50 liquid-glass-nav border-b border-white/20 transition-all duration-300 bg-white/80 backdrop-blur-md">
                <div className="max-w-[1512px] mx-auto px-4 sm:px-6 xl:px-8">
                    <div className="flex items-center justify-between h-14 lg:h-16 xl:h-20">

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex lg:items-center w-full gap-8 xl:gap-16">
                            <div className="flex-shrink-0">
                                <Link href="/" className="inline-flex items-center">
                                    <img src="/brand/monkbot-logo.png" alt="Monkbot" className="h-14 xl:h-16 w-auto object-contain cursor-pointer" />
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 xl:gap-8 flex-1">
                                <nav aria-label="Main navigation" className="flex items-baseline gap-4 xl:gap-8">
                                    <Link href="/product" className="text-black tracking-tight lg:hover:text-gray-600 text-sm xl:text-base font-normal transition-colors duration-200">Product</Link>
                                    <Link href="/resources" className="text-black tracking-tight lg:hover:text-gray-600 text-sm xl:text-base font-normal transition-colors duration-200">Resources</Link>
                                    <Link href="/customer-reviews" className="text-black tracking-tight lg:hover:text-gray-600 text-sm xl:text-base font-normal transition-colors duration-200">Reviews</Link>
                                    <Link href="/pricing" className="text-black tracking-tight lg:hover:text-gray-600 text-sm xl:text-base font-normal transition-colors duration-200">Pricing</Link>
                                    <Link href="/contact" className="text-black tracking-tight lg:hover:text-gray-600 text-sm xl:text-base font-normal transition-colors duration-200">Contact</Link>
                                </nav>
                            </div>
                            <div className="flex items-center gap-2 xl:gap-4">
                                <Link href="/contact" className="text-foreground text-sm xl:text-base font-normal tracking-tight px-3 xl:px-4 py-1">Talk to sales</Link>
                                {!isLoadingAuth && user ? (
                                    <Link href="/dashboard" className="inline-flex items-center rounded-md text-foreground text-sm xl:text-base font-medium tracking-tight border border-gray-300 bg-gray-50 px-3 xl:px-4 py-1 hover:bg-gray-100 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                        My Account
                                    </Link>
                                ) : (
                                    <Link href="/sign-in" className="inline-flex items-center rounded-md text-foreground text-sm xl:text-base font-normal tracking-tight border border-foreground px-3 xl:px-4 py-1">Sign in</Link>
                                )}
                                <Link href="/get-started" className="inline-flex items-center rounded-md tracking-tight bg-foreground border border-foreground px-3 xl:px-4 py-1 text-white text-sm xl:text-base font-normal transition-colors duration-200">Get started</Link>
                            </div>
                        </div>

                        {/* Mobile Navigation Bar */}
                        <div className="flex lg:hidden items-center justify-between w-full">
                            <div className="flex-shrink-0 z-[60]">
                                <Link href="/" className="inline-flex items-center">
                                    <img src="/brand/monkbot-logo.png" alt="Monkbot" className="h-11 w-auto object-contain cursor-pointer" />
                                </Link>
                            </div>
                            <div className="flex items-center gap-3 z-[60]">
                                <Link href="/get-started" className="inline-flex items-center rounded-md tracking-tight bg-foreground border border-foreground px-3 py-1 text-white text-sm font-normal transition-colors duration-200">Get started</Link>
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="p-1.5 focus:outline-none"
                                    aria-label="Toggle mobile menu"
                                >
                                    {mobileMenuOpen ? (
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    ) : (
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Full-page Mobile Navigation Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-white flex flex-col pt-6 px-6 lg:hidden overflow-y-auto w-full h-full">
                    {/* Header inside overlay */}
                    <div className="flex items-center justify-between h-12 mb-8">
                        <Link href="/" className="inline-flex items-center" onClick={() => setMobileMenuOpen(false)}>
                            <img src="/brand/monkbot-logo.png" alt="Monkbot" className="h-11 w-auto object-contain cursor-pointer" />
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-1.5 focus:outline-none text-gray-800"
                            aria-label="Close mobile menu"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-6 text-xl font-medium tracking-tight mb-8">
                        <Link href="/product" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100 flex items-center justify-between">Product <span className="text-gray-400">→</span></Link>
                        <Link href="/resources" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100 flex items-center justify-between">Resources <span className="text-gray-400">→</span></Link>
                        <Link href="/customer-reviews" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100 flex items-center justify-between">Reviews <span className="text-gray-400">→</span></Link>
                        <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100 flex items-center justify-between">Pricing <span className="text-gray-400">→</span></Link>
                        <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100 flex items-center justify-between">Contact <span className="text-gray-400">→</span></Link>
                    </nav>

                    {/* Call to Action Buttons */}
                    <div className="mt-4 flex flex-col gap-4">
                        {!isLoadingAuth && user ? (
                            <Link href="/dashboard" className="w-full text-center rounded-lg text-foreground font-medium border border-gray-300 bg-gray-50 px-6 py-3 flex justify-center items-center" onClick={() => setMobileMenuOpen(false)}>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2.5"></div>
                                My Account
                            </Link>
                        ) : (
                            <Link href="/sign-in" className="w-full text-center rounded-lg text-foreground font-medium border border-foreground px-6 py-3" onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
                        )}
                        <Link href="/get-started" className="w-full text-center rounded-lg bg-foreground text-white font-medium px-6 py-3" onClick={() => setMobileMenuOpen(false)}>Get started</Link>
                    </div>
                </div>
            )}
        </>
    );
}
