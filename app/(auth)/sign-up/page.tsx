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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("Please fill in all fields.");
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
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
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
          <h1 className="text-[32px] leading-tight tracking-tight">Get started with Monkbot</h1>
          <p className="mt-2 text-sm text-black/60 whitespace-pre-line">
            Start your plugin AI control plane.
            {"\n"}
            We&apos;ll help you connect domains, keys, and credits.
          </p>

          <button
            type="button"
            className="mt-5 h-11 w-full border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50 transition-colors"
          >
            Continue with Google
          </button>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-black/40">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <form className="grid gap-3" onSubmit={handleRegister}>
            {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 border border-gray-300 rounded-md px-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Your Name (e.g. Jane Doe)"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 border border-gray-300 rounded-md px-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter your email address"
            />
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 border border-gray-300 rounded-md px-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Create a password (min 8 characters)"
              minLength={8}
            />
            <button disabled={isLoading} type="submit" className="h-11 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors disabled:opacity-50">
              {isLoading ? "Creating account..." : "Continue"}
            </button>
          </form>

          <p className="mt-4 text-sm text-black/60">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-black hover:underline">
              Sign in
            </Link>
          </p>
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
          <div className="max-w-[460px] mx-auto w-full glass-panel p-10 rounded-3xl shadow-xl relative overflow-hidden">
            {/* Decorative background blur element */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-green-200/40 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
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
      </div>
    </section>
  );
}
