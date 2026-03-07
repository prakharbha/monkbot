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

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(data.message || "Failed to create account.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-8 p-4 md:p-8">
        <AuthLogo />
        <div className="w-full max-w-[400px] bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="animate-slide-up">
            <h1 className="text-[32px] leading-tight tracking-tight">Create your account</h1>
            <p className="mt-2 text-sm text-black/60">Start your free trial. No credit card required.</p>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-black/40 uppercase tracking-widest font-medium">get started</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <form className="grid gap-4" onSubmit={handleSignUp}>
              {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">{error}</div>}
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="name">Full name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 border border-gray-300 rounded-md px-3 text-sm focus:ring-2 focus:ring-black focus:outline-none transition-shadow bg-gray-50 hover:bg-white"
                  placeholder="Jane Smith"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="email">Work email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 border border-gray-300 rounded-md px-3 text-sm focus:ring-2 focus:ring-black focus:outline-none transition-shadow bg-gray-50 hover:bg-white"
                  placeholder="jane@agency.com"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="password">Password <span className="text-black/40 font-normal">(min. 8 characters)</span></label>
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
              <button
                disabled={isLoading}
                type="submit"
                className="h-11 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors mt-2 disabled:opacity-50"
              >
                {isLoading ? "Creating account..." : "Create free account"}
              </button>
            </form>

            <p className="mt-6 text-sm text-black/60 text-center">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-black font-medium hover:underline">
                Sign in
              </Link>
            </p>

            <p className="mt-4 text-xs text-black/40 text-center leading-relaxed">
              By creating an account you agree to our{" "}
              <Link href="#" className="hover:text-black/60 underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="#" className="hover:text-black/60 underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 h-screen bg-gray-50 border-l border-gray-200 px-10 lg:px-12 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        <div className="w-full h-full flex items-center justify-center relative z-10">
          <div className="max-w-[460px] mx-auto w-full">
            <h2 className="text-4xl tracking-tight leading-tight mb-8">Getting started with Monkbot</h2>
            <div className="space-y-10 relative">
              <div className="absolute left-6 top-8 bottom-12 w-px bg-gradient-to-b from-gray-200 via-gray-300 to-transparent flex-shrink-0 z-0"></div>

              <div className="flex gap-6 relative z-10 group">
                <div className="w-12 h-12 rounded-full bg-gray-900 shadow-md border border-gray-800 flex items-center justify-center flex-shrink-0 text-lg font-semibold text-white">1</div>
                <div className="pt-2.5">
                  <h3 className="text-xl font-medium text-gray-900 leading-tight">Sign up with your work email</h3>
                  <p className="text-sm text-gray-500 mt-1">Free plan, no credit card needed.</p>
                </div>
              </div>

              <div className="flex gap-6 relative z-10 group">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center flex-shrink-0 text-lg font-semibold text-gray-900 group-hover:border-black transition-colors">2</div>
                <div className="pt-2.5">
                  <h3 className="text-xl font-medium text-gray-900 leading-tight">Connect your WordPress installation</h3>
                </div>
              </div>

              <div className="flex gap-6 relative z-10 group">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center flex-shrink-0 text-lg font-semibold text-gray-900 group-hover:border-black transition-colors">3</div>
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
