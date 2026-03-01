"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ChatLog {
    id: string;
    domain: string;
    prompt: string;
    response: string;
    createdAt: string;
    apiKey: {
        user: {
            name: string | null;
            email: string;
        }
    }
}

export default function AdminHistoryPage() {
    const [logs, setLogs] = useState<ChatLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await fetch("/api/admin/history");
                if (!res.ok) throw new Error("Failed to load chat history");
                const data = await res.json();
                setLogs(data.logs || []);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLogs();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-xl bg-white/50 animate-pulse">
                <span className="text-sm font-medium text-gray-400">Loading chat history...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
                <p className="font-medium text-sm">Error Loading History</p>
                <p className="text-xs mt-1">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] w-full mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Chat History</h1>
                    <p className="text-sm text-gray-500">View recent prompts and responses generated across all sites.</p>
                </div>
                <Link href="/admin" className="text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
                    &larr; Back to Admin
                </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left align-middle text-gray-700">
                        <thead className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase tracking-wider font-semibold text-gray-500">
                            <tr>
                                <th scope="col" className="px-6 py-4 w-[200px]">Customer</th>
                                <th scope="col" className="px-6 py-4 w-[150px]">Site Domain</th>
                                <th scope="col" className="px-6 py-4">Prompt</th>
                                <th scope="col" className="px-6 py-4">Response Preview</th>
                                <th scope="col" className="px-6 py-4 text-right w-[180px]">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                        No chat history found.
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors items-start">
                                        <td className="px-6 py-4 align-top">
                                            <div className="font-medium text-gray-900 truncate max-w-[180px]">
                                                {log.apiKey?.user?.name || "Unnamed"}
                                            </div>
                                            <div className="text-gray-500 text-xs mt-0.5 truncate max-w-[180px]">
                                                {log.apiKey?.user?.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <div className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700 font-mono text-xs border border-gray-200 truncate max-w-[180px]" title={log.domain}>
                                                {log.domain}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <div className="bg-blue-50 text-blue-900 p-3 rounded-lg border border-blue-100 text-xs max-h-[120px] overflow-y-auto whitespace-pre-wrap">
                                                {log.prompt}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-top relative group">
                                            <div className="text-xs text-gray-600 line-clamp-4 leading-relaxed pr-8 h-20 overflow-hidden text-ellipsis whitespace-pre-wrap">
                                                {log.response}
                                            </div>
                                            <div className="absolute hidden group-hover:block z-50 bg-white border border-gray-200 shadow-xl p-4 rounded-xl text-xs w-[400px] left-1/2 -ml-[200px] mt-2 whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                                                {log.response}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right align-top text-gray-500 text-xs">
                                            <div>{new Date(log.createdAt).toLocaleDateString()}</div>
                                            <div className="mt-0.5">{new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
