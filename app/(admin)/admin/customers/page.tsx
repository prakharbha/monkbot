"use client";

import { useEffect, useState } from "react";

interface AdminUser {
    id: string;
    email: string;
    name: string | null;
    createdAt: string;
    keys: {
        id: string;
        label: string | null;
        status: string;
        creditsRemaining: number;
        model: string;
        domains: any[];
    }[];
    subscriptions: {
        status: string;
        currentPeriodEnd: string;
        plan: string;
    }[];
    invoices: {
        amount: number;
        status: string;
        invoiceDate: string;
    }[];
}

export default function AdminCustomersPage() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/admin/users");
                if (!res.ok) throw new Error("Failed to load users");
                const data = await res.json();
                setUsers(data.users || []);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleModelChange = async (keyId: string, newModel: string) => {
        try {
            const res = await fetch("/api/admin/keys/model", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ keyId, model: newModel })
            });
            if (res.ok) {
                setUsers(prevUsers =>
                    prevUsers.map(u => ({
                        ...u,
                        keys: u.keys.map(k => k.id === keyId ? { ...k, model: newModel } : k)
                    }))
                );
            } else {
                alert("Failed to update API key model");
            }
        } catch (e) {
            console.error(e);
            alert("Error updating API key model");
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-xl bg-white/50 animate-pulse">
                <span className="text-sm font-medium text-gray-400">Loading customer data...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
                <p className="font-medium text-sm">Error Loading Data</p>
                <p className="text-xs mt-1">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] w-full mx-auto">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Customers</h1>
            <p className="text-sm text-gray-500 mb-8">Manage users, their API limits, and view billing details.</p>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full whitespace-nowrap text-sm text-left align-middle text-gray-700">
                        <thead className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase tracking-wider font-semibold text-gray-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">Customer</th>
                                <th scope="col" className="px-6 py-4">Plan / Status</th>
                                <th scope="col" className="px-6 py-4 text-center">API Keys</th>
                                <th scope="col" className="px-6 py-4 text-center">Domains</th>
                                <th scope="col" className="px-6 py-4 text-right">Credits Left</th>
                                <th scope="col" className="px-6 py-4 text-right">Last Invoice</th>
                                <th scope="col" className="px-6 py-4 text-right">Cycle Ends</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                                        No customers found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => {
                                    const activeKeys = user.keys.filter(k => k.status === 'ACTIVE').length;
                                    const totalDomains = user.keys.reduce((acc, key) => acc + key.domains.length, 0);
                                    const creditsRemaining = user.keys.reduce((acc, key) => acc + key.creditsRemaining, 0);

                                    const activeSub = user.subscriptions?.[0];
                                    const lastInvoice = user.invoices?.[0];

                                    return (
                                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900 truncate max-w-[200px]">{user.name || "Unnamed User"}</div>
                                                <div className="text-gray-500 text-xs mt-0.5 truncate max-w-[200px]">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1 items-start">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-gray-100 text-gray-800 border border-gray-200">
                                                        {activeSub?.plan || 'FREE'}
                                                    </span>
                                                    {activeSub && (
                                                        <span className={`inline-flex items-center text-[10px] font-medium uppercase tracking-wider ${activeSub.status === 'ACTIVE' ? 'text-green-600' : 'text-orange-600'}`}>
                                                            {activeSub.status.replace("_", " ")}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-2">
                                                    {user.keys.map((k) => (
                                                        <div key={k.id} className="flex items-center gap-2 text-xs border border-gray-100 rounded p-1.5 bg-gray-50/50">
                                                            <span className={`w-2 h-2 rounded-full ${k.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                                            <span className="font-mono text-gray-600 truncate max-w-[80px]" title={k.id}>{k.id.slice(0, 10)}...</span>
                                                            <select
                                                                className="ml-auto block w-28 rounded-md border-gray-300 py-1 pl-2 pr-6 text-xs focus:border-blue-500 focus:outline-none focus:ring-blue-500 bg-white"
                                                                value={k.model || "gpt-4o-mini"}
                                                                onChange={(e) => handleModelChange(k.id, e.target.value)}
                                                            >
                                                                <option value="gpt-4o-mini">4o-mini</option>
                                                                <option value="gpt-4o">gpt-4o</option>
                                                                <option value="gpt-3.5-turbo">3.5-turbo</option>
                                                            </select>
                                                        </div>
                                                    ))}
                                                    {user.keys.length === 0 && <span className="text-xs text-gray-400">No API Keys</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-700 font-medium text-xs">
                                                    {totalDomains}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className={`font-mono font-medium ${creditsRemaining < 100 ? 'text-orange-600' : 'text-gray-900'}`}>
                                                    {creditsRemaining.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {lastInvoice ? (
                                                    <div>
                                                        <div className="font-medium text-gray-900">${(lastInvoice.amount / 100).toFixed(2)}</div>
                                                        <div className={`text-xs mt-0.5 ${lastInvoice.status === 'PAID' ? 'text-green-600' : 'text-orange-600'}`}>
                                                            {lastInvoice.status}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 italic text-xs">No invoices</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {activeSub?.currentPeriodEnd ? (
                                                    <div className="text-gray-900 text-sm">
                                                        {new Date(activeSub.currentPeriodEnd).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-xs">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
