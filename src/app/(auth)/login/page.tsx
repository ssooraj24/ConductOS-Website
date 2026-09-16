"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, Lock, Mail, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("superadmin@conductos.com");
  const [password, setPassword] = useState("SuperAdmin27$");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // In skeleton phase, verify credentials
      if (email === "superadmin@conductos.com" && password === "SuperAdmin27$") {
        localStorage.setItem("conductos_session", JSON.stringify({
          email,
          role: "superadmin",
          token: "mock_conductos_superadmin_jwt_token_2026"
        }));
        router.push("/company");
      } else {
        setError("Invalid credentials. Use superadmin@conductos.com / SuperAdmin27$");
      }
    } catch (err: any) {
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#070a0f] via-[#0b111d] to-[#0d1627] px-4">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ConductOS Walking Skeleton (v0.1)</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Conduct<span className="text-blue-500">OS</span>
          </h1>
          <p className="text-sm text-slate-400">
            Market Visibility Operating System & AI Business Conductor
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#121927]/90 border border-slate-800/80 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Skeleton Access: Prepopulated Credentials</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Roles & external auth bypassed for rapid verification. Clerk will be integrated post-skeleton.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Username / Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0b0f17] border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0b0f17] border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all cursor-pointer"
            >
              <span>{loading ? "Authenticating..." : "Enter ConductOS"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="text-center mt-6 text-xs text-slate-500">
          Pilot Company: <span className="text-slate-400 font-medium">Nisol AI</span> (www.nisolai.com)
        </div>
      </div>
    </div>
  );
}
