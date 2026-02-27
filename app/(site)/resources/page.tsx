"use client";

import Link from "next/link";
import { useState } from "react";

export default function ResourcesPage() {
    // Mock authentication state for demonstration
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const articles = [
        { tag: "Guide", title: "Migrating from traditional CMS management to Agentic control", time: "5 min read", date: "Oct 24, 2026", featured: true },
        { tag: "Technical", title: "Extending MonkBot with Custom PHP Hooks", time: "8 min read", date: "Oct 18, 2026" },
        { tag: "Case Study", title: "How ACME Agency manages 100+ WooCommerce sites via Slack", time: "6 min read", date: "Oct 12, 2026", featured: true },
        { tag: "News", title: "Announcing Claude 4.5 Integration for complex database queries", time: "3 min read", date: "Oct 05, 2026" },
        { tag: "Security", title: "Understanding the Sandbox: Safe execution in WordPress", time: "7 min read", date: "Sep 28, 2026" },
        { tag: "Guide", title: "Automating Daily Plugin Updates based on visual testing", time: "10 min read", date: "Sep 21, 2026" },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gray-50 border-b border-gray-200 py-16 px-4 md:px-6">
                <div className="max-w-5xl mx-auto relative z-10">
                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
                        Resources & Guides
                    </h1>
                    <p className="text-lg text-gray-600 font-light max-w-2xl mb-8">
                        Learn how to leverage MonkBot to its fullest potential. From basic setup guides to complex API integrations.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-xl">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search guides, tutorials, and documentation..."
                            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                        />
                    </div>
                </div>

                {/* Decorative background for header */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            </section>

            {/* Main Content */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 py-16">
                <div className="grid md:grid-cols-12 gap-12">

                    {/* Sidebar */}
                    <div className="md:col-span-3 space-y-8">
                        <div>
                            <ul className="space-y-3 text-gray-600 text-sm">
                                <li><Link href="#documentation" className="text-blue-600 font-medium">Documentation</Link></li>
                                <li><Link href="#" className="hover:text-gray-900 transition-colors">API Reference</Link></li>
                                <li><Link href="#" className="hover:text-gray-900 transition-colors">Guides & Tutorials</Link></li>
                                <li><Link href="#" className="hover:text-gray-900 transition-colors">Case Studies</Link></li>
                                <li><Link href="#" className="hover:text-gray-900 transition-colors">Changelog</Link></li>
                            </ul>
                        </div>

                        {/* Download Plugin Snippet */}
                        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                            <h3 className="font-semibold text-gray-900 mb-2.5 text-sm flex items-center justify-between">
                                Monkbot WordPress Plugin
                                {/* Toggle for testing purposes */}
                                <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="text-[10px] text-gray-400 hover:text-gray-600 underline">
                                    Toggle Auth (Mock)
                                </button>
                            </h3>
                            <p className="text-xs text-gray-600 mb-4 leading-relaxed">Download the latest version of the Monkbot WordPress integration plugin. Version 1.2.4.</p>

                            {isLoggedIn ? (
                                <button className="w-full bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    Download Now
                                </button>
                            ) : (
                                <div className="space-y-3">
                                    <button disabled className="w-full bg-gray-200 text-gray-500 text-sm font-medium px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                        Authentication Required
                                    </button>
                                    <p className="text-[11px] text-center text-gray-500">
                                        <Link href="/sign-in" className="text-blue-600 hover:underline">Log in</Link> to download the plugin.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-2.5 text-sm">Need help?</h3>
                            <p className="text-xs text-gray-600 mb-4">Can't find what you're looking for? Our support team is here to assist.</p>
                            <Link href="/contact" className="text-sm font-medium text-gray-900 underline decoration-gray-300 hover:decoration-gray-900 transition-colors">Contact Support</Link>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="md:col-span-9">
                        <div className="grid sm:grid-cols-2 gap-6">
                            {articles.map((article, i) => (
                                <Link href="#" key={i} className="group block h-full">
                                    <div className={`h-full bg-white border rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden ${article.featured ? 'border-blue-200 hover:border-blue-300 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                                        }`}>

                                        {/* Optional top accent border for featured */}
                                        {article.featured && (
                                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                                        )}

                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className={`inline-block px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded ${article.tag === 'News' ? 'bg-purple-100 text-purple-700' :
                                                        article.tag === 'Guide' ? 'bg-green-100 text-green-700' :
                                                            'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {article.tag}
                                                </span>
                                                {article.featured && (
                                                    <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider flex items-center gap-1">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1h1a1 1 0 110 2h-1v1h1a1 1 0 110 2H9a1 1 0 110-2h1v-1H9a1 1 0 110-2h1v-1H9a1 1 0 110-2h1V3a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug text-balance">
                                                {article.title}
                                            </h3>
                                        </div>
                                        <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-4">
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-medium text-gray-900">{article.date}</span>
                                                <span className="text-xs text-gray-500">{article.time}</span>
                                            </div>
                                            <span className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-x-1">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Dev Portal CTA */}
                        <div className="mt-16 bg-gray-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 blur-3xl rounded-full"></div>
                            <h2 className="text-3xl font-semibold mb-4 relative z-10">Looking to build native MCP clients?</h2>
                            <p className="text-gray-300 font-light mb-8 max-w-lg mx-auto relative z-10">Access our comprehensive API documentation and SDKs to integrate MonkBot's Model Context Protocol into your own applications.</p>
                            <button className="bg-white text-gray-900 font-medium px-6 py-3 rounded-lg relative z-10 hover:bg-gray-100 transition-colors shadow-lg">Go to Developer Portal</button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
