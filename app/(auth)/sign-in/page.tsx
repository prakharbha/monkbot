"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function AuthLogo() {
  return (
    <img
      src="/brand/monkbot-logo.png"
      alt="Monkbot"
      className="h-10 w-auto object-contain"
    />
  );
}

export default function SignInPage() {
  const router = useRouter();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail })
      });
      if (res.ok) {
        setResetSuccess(true);
      }
    } catch (error) {
      console.error("Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("Please enter your email and password.");
      return;
    }

    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setLoginError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setLoginError("An unexpected error occurred.");
    } finally {
      setIsLoggingIn(false);
    }
  };
  return (
    <section className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-8 p-4 md:p-8">
        <AuthLogo />
        <div className="w-full max-w-[400px] bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          {isForgotPassword ? (
            <div className="animate-slide-up">
              <h1 className="text-[32px] leading-tight tracking-tight">Reset Password</h1>
              <p className="mt-2 text-sm text-black/60 mb-6">Enter your email address and we'll send you a link to reset your password.</p>

              {!resetSuccess ? (
                <form onSubmit={handleResetPassword} className="grid gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="resetEmail" className="text-sm font-medium">Email Address</label>
                    <input
                      id="resetEmail"
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="w-full h-11 border border-gray-300 rounded-md px-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <button disabled={isLoading} type="submit" className="h-11 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center justify-center">
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              ) : (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg text-sm border border-green-200">
                  <p className="font-medium mb-1">Check your inbox!</p>
                  <p>If an account exists for {resetEmail}, we've sent password reset instructions.</p>
                </div>
              )}

              <button
                onClick={() => { setIsForgotPassword(false); setResetSuccess(false); }}
                className="mt-6 text-sm text-black/60 hover:text-black flex items-center gap-2 group transition-colors"
                type="button"
              >
                <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to sign in
              </button>
            </div>
          ) : (
            <div className="animate-slide-up">
              <h1 className="text-[32px] leading-tight tracking-tight">Sign in to Monkbot</h1>
              <p className="mt-2 text-sm text-black/60">Welcome back! Please sign in to continue.</p>

              <button
                type="button"
                className="mt-5 h-11 w-full border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                Continue with Google
              </button>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-black/40 uppercase tracking-widest font-medium">or</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <form className="grid gap-4" onSubmit={handleLogin}>
                {loginError && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{loginError}</div>}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 border border-gray-300 rounded-md px-3 text-sm focus:ring-2 focus:ring-black focus:outline-none transition-shadow bg-gray-50 hover:bg-white"
                    placeholder="jane@company.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium" htmlFor="password">Password</label>
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 border border-gray-300 rounded-md px-3 text-sm focus:ring-2 focus:ring-black focus:outline-none transition-shadow bg-gray-50 hover:bg-white"
                    placeholder="••••••••"
                  />
                </div>
                <button disabled={isLoggingIn} type="submit" className="h-11 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors mt-2 disabled:opacity-50">
                  {isLoggingIn ? "Signing in..." : "Continue"}
                </button>
              </form>

              <p className="mt-6 text-sm text-black/60 text-center">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-black hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:hidden flex justify-center bg-slate-50 px-4 pb-6">
        <img
          src="/auth/sign-up-mobile.webp"
          alt="Getting started with Monkbot"
          className="max-w-[400px] w-full h-auto"
        />
      </div>

      <div className="hidden md:flex md:w-1/2 h-screen bg-gray-50 border-l border-gray-200 px-10 lg:px-12 py-12 relative overflow-hidden">
        {/* Decorative background blur elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        <div className="w-full h-full flex items-center justify-center relative z-10">
          <div className="max-w-[460px] mx-auto w-full">
            <h2 className="text-4xl tracking-tight leading-tight mb-8">Getting started with Monkbot</h2>
            <div className="space-y-10 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-6 top-8 bottom-12 w-px bg-gradient-to-b from-gray-200 via-gray-300 to-transparent flex-shrink-0 z-0"></div>

              {/* Step 1 */}
              <div className="flex gap-6 relative z-10 group">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center flex-shrink-0 text-lg font-semibold text-gray-900 group-hover:border-black transition-colors">1</div>
                <div className="pt-2.5">
                  <h3 className="text-xl font-medium text-gray-900 leading-tight">Sign up with your work email</h3>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6 relative z-10 group">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center flex-shrink-0 text-lg font-semibold text-gray-900 group-hover:border-black transition-colors">2</div>
                <div className="pt-2.5">
                  <h3 className="text-xl font-medium text-gray-900 leading-tight">Connect your WordPress installation</h3>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6 relative z-10 group">
                <div className="w-12 h-12 rounded-full bg-gray-900 shadow-md border border-gray-800 flex items-center justify-center flex-shrink-0 text-lg font-semibold text-white">3</div>
                <div className="pt-2 pb-2">
                  <h3 className="text-xl font-medium text-gray-900 leading-tight mb-3 tracking-tight">Monkbot instantly provisions your AI control plane</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                    Giving you immediate access to agentic operations, content management, and system governance.
                  </p>
                  <div className="mt-5 p-5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl leading-relaxed text-[15px] text-gray-800 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                    <strong className="font-semibold text-gray-900 text-base">You're ready to go in seconds.</strong><br />
                    <span className="text-gray-600 block mt-1">No manual onboarding or waiting periods required.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
