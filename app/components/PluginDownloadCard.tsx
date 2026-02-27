"use client";

import { useState } from "react";
import Link from "next/link";

interface PluginDownloadCardProps {
    isAuthed: boolean;
    showAuthToggle?: boolean;
}

export default function PluginDownloadCard({ isAuthed: initialAuth, showAuthToggle = false }: PluginDownloadCardProps) {
    const [isAuthed, setIsAuthed] = useState(initialAuth);

    return (
        <div className="w-full bg-[#f8fbff] border border-blue-100 rounded-2xl p-6 lg:p-8 flex flex-col relative overflow-hidden transition-all duration-300">
            {/* Background decorative Elements */}
            <div className="absolute top-0 right-0 right-[-20%] w-[150%] h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none opacity-50"></div>

            <div className="flex items-start justify-between relative z-10 mb-6">
                <h3 className="text-xl lg:text-3xl font-bold tracking-tight text-gray-900 leading-tight">
                    Monkbot<br />
                    WordPress<br />
                    Plugin
                </h3>
                {showAuthToggle && (
                    <button
                        onClick={() => setIsAuthed(!isAuthed)}
                        className="text-xs font-semibold uppercase tracking-wider text-blue-500 hover:text-blue-700 underline underline-offset-4 decoration-blue-200 transition-colors"
                    >
                        Toggle {isAuthed ? "Auth" : "Lock"}<br />(Mock)
                    </button>
                )}
            </div>

            <p className="text-[#4b5563] text-sm lg:text-lg mb-8 relative z-10 leading-relaxed max-w-sm">
                Download the latest version of the Monkbot WordPress integration plugin. Version 1.2.4.
            </p>

            <div className="relative z-10 mt-auto w-full">
                {isAuthed ? (
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            alert("Downloading monkbot-v1.2.4.zip...");
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                    >
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Plugin.zip
                    </a>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="w-full bg-gray-200/60 rounded-xl py-5 px-6 flex items-center justify-center gap-3 text-gray-500 mb-6 border border-gray-200">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span className="font-semibold text-lg">Authentication Required</span>
                        </div>
                        <p className="text-gray-600">
                            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors">Log in</Link> to download the plugin.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
