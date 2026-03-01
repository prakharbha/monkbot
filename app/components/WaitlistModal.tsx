"use client";

import { useState } from "react";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim(), email: email.trim() }),
            });
            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.error || "Something went wrong. Please try again.");
                setStatus("error");
            } else {
                setStatus("success");
            }
        } catch {
            setErrorMsg("Network error. Please check your connection.");
            setStatus("error");
        }
    };

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {status === "success" ? (
                    /* Success state */
                    <div className="flex flex-col items-center text-center py-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re on the list!</h2>
                        <p className="text-gray-500 mb-6">We&apos;ll notify you as soon as MonkBot Pro launches. Check your inbox for a confirmation.</p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    /* Form state */
                    <>
                        {/* Header */}
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                Coming Soon
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Join the Pro Waitlist</h2>
                            <p className="mt-2 text-sm text-gray-500">
                                Be first to know when MonkBot Pro launches — 500 credits, 3 domains, priority support.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="waitlist-name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    id="waitlist-name"
                                    type="text"
                                    required
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label htmlFor="waitlist-email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    id="waitlist-email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            {status === "error" && (
                                <p className="text-red-500 text-sm">{errorMsg}</p>
                            )}

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {status === "loading" ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Joining…
                                    </>
                                ) : (
                                    "Join the Waitlist"
                                )}
                            </button>

                            <p className="text-center text-xs text-gray-400">
                                No spam. Unsubscribe anytime.
                            </p>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
