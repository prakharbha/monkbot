"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PluginDownloadCard from "@/app/components/PluginDownloadCard";

interface AllowedDomain {
    id: string;
    domain: string;
    status: string;
}

interface ApiKey {
    id: string;
    keyPrefix: string;
    keyToken: string | null;
    label: string | null;
    plan: string;
    status: string;
    creditsRemaining: number;
    domains: AllowedDomain[];
    createdAt: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [keys, setKeys] = useState<ApiKey[]>([]);
    const [userName, setUserName] = useState<string | null>(null);
    const [emailVerified, setEmailVerified] = useState(true);
    const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent">("idle");
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const fetchKeys = async () => {
        try {
            const res = await fetch("/api/user/keys");
            if (!res.ok) {
                if (res.status === 401) {
                    router.push("/sign-in");
                    return;
                }
                throw new Error("Failed to fetch keys");
            }
            const data = await res.json();
            setKeys(data.keys);
            setUserName(data.userName ?? null);
            setEmailVerified(data.emailVerified ?? true);
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchKeys();
    }, [router]);

    const handleResendVerification = async () => {
        setResendStatus("sending");
        try {
            await fetch("/api/auth/resend-verification", { method: "POST" });
            setResendStatus("sent");
        } catch {
            setResendStatus("idle");
        }
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/sign-in");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
            setIsLoggingOut(false);
        }
    };

    const [isGenerating, setIsGenerating] = useState(false);
    const [newKeyData, setNewKeyData] = useState<string | null>(null);
    const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

    const handleGenerateKey = async () => {
        if (!confirm("Are you sure you want to generate a new key? Your existing key will be invalidated immediately, but domains and credits will be preserved.")) return;
        setIsGenerating(true);
        try {
            const res = await fetch("/api/user/keys", { method: "POST" });
            if (!res.ok) throw new Error("Failed to generate key");
            const data = await res.json();
            setNewKeyData(data.rawKey);
            await fetchKeys();
        } catch (error) {
            console.error(error);
            alert("Error generating new key.");
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedKeyId(id);
            setTimeout(() => setCopiedKeyId(null), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    const [addingDomainToKeyId, setAddingDomainToKeyId] = useState<string | null>(null);
    const [domainInput, setDomainInput] = useState("");
    const [domainError, setDomainError] = useState("");
    const [isSubmittingDomain, setIsSubmittingDomain] = useState(false);

    const handleAddDomain = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!domainInput.trim()) return;
        setIsSubmittingDomain(true);
        setDomainError("");
        try {
            const res = await fetch("/api/user/domains", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ domain: domainInput.trim() })
            });
            const data = await res.json();
            if (!res.ok) {
                setDomainError(data.message || "Failed to add domain");
            } else {
                setDomainInput("");
                setAddingDomainToKeyId(null);
                await fetchKeys();
            }
        } catch (err) {
            setDomainError("Unexpected error occurred.");
        } finally {
            setIsSubmittingDomain(false);
        }
    };

    const handleRemoveDomain = async (domainId: string) => {
        if (!confirm("Are you sure you want to remove this domain? Plugins on this domain will stop working.")) return;
        try {
            const res = await fetch(`/api/user/domains?id=${domainId}`, { method: "DELETE" });
            if (res.ok) {
                await fetchKeys();
            } else {
                alert("Failed to remove domain");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/">
                        <img src="/brand/monkbot-logo.png" alt="Monkbot" className="h-14 xl:h-16 w-auto object-contain cursor-pointer" />
                    </Link>
                    <div className="flex items-center gap-4">
                        {userName && (
                            <span className="hidden md:block text-sm font-medium text-black/70">
                                Hi, {userName.split(" ")[0]} 👋
                            </span>
                        )}
                        <div className="flex items-center gap-4 pl-4 ml-2 border-l border-gray-200">
                            <Link href="/contact" className="text-sm font-medium text-black/50 hover:text-black transition-colors flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="4.93" x2="9.17" y1="4.93" y2="9.17" /><line x1="14.83" x2="19.07" y1="14.83" y2="19.07" /><line x1="14.83" x2="19.07" y1="9.17" y2="4.93" /><line x1="14.83" x2="18.36" y1="9.17" y2="5.64" /><line x1="4.93" x2="9.17" y1="19.07" y2="14.83" /></svg>
                                <span className="hidden sm:inline">Support</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="text-sm font-medium text-black/50 hover:text-black transition-colors flex items-center gap-1.5"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                                <span className="hidden sm:inline">{isLoggingOut ? "..." : "Sign out"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {!emailVerified && (
                <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center justify-between gap-4">
                    <p className="text-sm text-amber-800">
                        Please verify your email address to add domains. Check your inbox for a verification link.
                    </p>
                    <button
                        onClick={handleResendVerification}
                        disabled={resendStatus !== "idle"}
                        className="shrink-0 text-sm font-medium text-amber-900 underline hover:text-amber-700 disabled:opacity-50"
                    >
                        {resendStatus === "sending" ? "Sending..." : resendStatus === "sent" ? "Email sent!" : "Resend email"}
                    </button>
                </div>
            )}

            <main className="max-w-6xl mx-auto px-6 pt-10">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
                        <p className="text-black/60 text-sm">Manage your API keys, domains, and credit usage.</p>
                    </div>
                    {keys.length > 0 && (
                        <button
                            onClick={handleGenerateKey}
                            disabled={isGenerating}
                            className="h-10 px-4 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-900 transition-colors shadow-sm disabled:opacity-50"
                        >
                            {isGenerating ? "Generating..." : "Get a New Key"}
                        </button>
                    )}
                </div>

                {newKeyData && (
                    <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                        <h3 className="text-lg font-semibold text-green-900 mb-2">New API Key Generated</h3>
                        <p className="text-green-800 text-sm mb-4">
                            Please copy your new API key now. For your security, <strong className="font-semibold">you will not be able to see it again</strong>.
                        </p>
                        <div className="flex items-center gap-3">
                            <code className="flex-1 bg-white border border-green-200 px-4 py-2 rounded-md font-mono text-sm text-green-900 overflow-x-auto">
                                {newKeyData}
                            </code>
                            <button
                                onClick={() => copyToClipboard(newKeyData, 'new-key')}
                                className={`h-10 px-4 text-white text-sm font-medium rounded-md transition-colors shrink-0 ${copiedKeyId === 'new-key' ? 'bg-green-800' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                                {copiedKeyId === 'new-key' ? 'Copied!' : 'Copy Key'}
                            </button>
                        </div>
                        <button
                            onClick={() => setNewKeyData(null)}
                            className="mt-4 text-sm font-medium text-green-700 hover:text-green-900"
                        >
                            I have copied my key, close this
                        </button>
                    </div>
                )}

                {isLoading ? (
                    <div className="flex items-center justify-center h-64 border border-dashed border-gray-300 rounded-xl bg-white/50">
                        <p className="text-black/50 text-sm animate-pulse">Loading usage data...</p>
                    </div>
                ) : keys.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-300 rounded-xl bg-white/50 space-y-4">
                        <p className="text-black/60 text-sm">You haven't generated any API keys yet.</p>
                        <button
                            onClick={handleGenerateKey}
                            disabled={isGenerating}
                            className="h-10 px-4 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-900 transition-colors shadow-sm disabled:opacity-50"
                        >
                            {isGenerating ? "Generating..." : "Generate Your First Key"}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {keys.map((apiKey) => (
                            <div key={apiKey.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="border-b border-gray-200 bg-gray-50/50 p-6 flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold text-lg">{apiKey.label || "API key"}</h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${apiKey.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {apiKey.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <code className="text-sm font-mono bg-white border border-gray-200 px-3 py-1.5 rounded text-gray-800">
                                                {apiKey.keyToken || apiKey.keyPrefix + "••••••••••••"}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(apiKey.keyToken || "", apiKey.id)}
                                                disabled={!apiKey.keyToken}
                                                className={`text-xs font-medium px-3 py-1.5 rounded transition-colors disabled:opacity-50 ${copiedKeyId === apiKey.id ? 'bg-green-100 text-green-800' : 'text-black bg-gray-100 hover:bg-gray-200'}`}
                                            >
                                                {copiedKeyId === apiKey.id ? 'Copied!' : 'Copy Key'}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold font-mono tracking-tight text-blue-600">
                                            {apiKey.creditsRemaining.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-black/50 uppercase tracking-widest font-medium mt-1">
                                            Credits Remaining
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-sm font-semibold tracking-tight uppercase text-black/40">Allowed Domains</h4>
                                        {addingDomainToKeyId !== apiKey.id && (
                                            <button
                                                onClick={() => setAddingDomainToKeyId(apiKey.id)}
                                                className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                + Add Domain
                                            </button>
                                        )}
                                    </div>

                                    {addingDomainToKeyId === apiKey.id && (
                                        <form onSubmit={handleAddDomain} className="mb-4 bg-gray-50 border border-gray-200 p-3 rounded-lg flex gap-2 items-start">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    value={domainInput}
                                                    onChange={(e) => setDomainInput(e.target.value)}
                                                    placeholder="example.com"
                                                    className="w-full h-9 border border-gray-300 rounded text-sm px-3 focus:outline-none focus:ring-1 focus:ring-black"
                                                />
                                                {domainError && <p className="text-xs text-red-600 mt-1">{domainError}</p>}
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isSubmittingDomain}
                                                className="h-9 px-3 bg-black text-white text-xs font-medium rounded hover:bg-gray-800 disabled:opacity-50 shrink-0"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => { setAddingDomainToKeyId(null); setDomainError(""); setDomainInput(""); }}
                                                className="h-9 px-3 border border-gray-300 bg-white text-black text-xs font-medium rounded hover:bg-gray-50 shrink-0"
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    )}

                                    {apiKey.domains.length === 0 ? (
                                        <div className="text-sm text-black/50 py-3 bg-gray-50 rounded-lg text-center border border-gray-100">
                                            No domains configured. Plugins requests will be denied.
                                        </div>
                                    ) : (
                                        <div className="grid gap-3">
                                            {apiKey.domains.map((d) => (
                                                <div key={d.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 transition-all">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-2 h-2 rounded-full ${d.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-400'}`} />
                                                        <span className="text-sm font-medium">{d.domain}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveDomain(d.id)}
                                                        className="text-xs text-black/40 hover:text-red-600 transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Always show download card in dashboard because they must be authed to reach this page */}
                <div className="mt-8">
                    <PluginDownloadCard isAuthed={true} />
                </div>
            </main>
        </div>
    );
}
