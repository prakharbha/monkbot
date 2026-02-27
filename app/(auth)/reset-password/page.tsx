"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!token) {
            setError("Invalid or missing reset token.");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setIsLoading(true);

        // Simulate API call for mock token
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // In a real app, you would POST to an API route to update the password here
            // const res = await fetch('/api/auth/reset-password', { ... })

            setSuccess(true);
            setTimeout(() => {
                router.push("/sign-in");
            }, 3000);

        } catch (err) {
            setError("Failed to reset password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col flex-1 items-center justify-center p-8 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">Password Reset Successful</h2>
                <p className="text-gray-500 max-w-sm mb-8">Your password has been securely updated. You are being redirected to the sign in page.</p>
                <Link href="/sign-in" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Click here if you are not redirected
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 items-center pt-16 sm:pt-24 lg:pt-32 px-4 shadow-2xl relative overflow-hidden">
            {/* Background decorative fields */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

            <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 p-8 shadow-sm relative z-10">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Set new password</h1>
                    <p className="text-sm text-gray-500 mt-2">Enter your new password below. Make sure it's at least 8 characters.</p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 text-red-600 text-sm p-3.5 rounded-xl border border-red-100 flex items-start gap-2.5">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{error}</span>
                    </div>
                )}

                {!token && !error && (
                    <div className="mb-6 bg-yellow-50 text-yellow-700 text-sm p-3.5 rounded-xl border border-yellow-200 flex items-start gap-2.5">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>No reset token provided. This link may be invalid or expired.</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-900">New Password</label>
                        <input
                            required
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-shadow disabled:opacity-50"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-900">Confirm Password</label>
                        <input
                            required
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-shadow disabled:opacity-50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !token}
                        className="w-full bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition-colors flex justify-center shadow-lg shadow-gray-200 disabled:opacity-50 disabled:shadow-none mt-2"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "Reset Password"
                        )}
                    </button>

                    <div className="text-center pt-4 border-t border-gray-100 mt-6">
                        <p className="text-sm text-gray-500">
                            Remember your password?{" "}
                            <Link href="/sign-in" className="text-gray-900 font-medium hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-1 items-center justify-center pt-32">
                <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}
