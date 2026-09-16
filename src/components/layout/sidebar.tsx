"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Swords,
  Brain,
  Lightbulb,
  Compass,
  Zap,
  RotateCcw,
  Sparkles,
  LogOut,
  Package,
  Layers,
  Activity,
} from "lucide-react";

const navigationItems = [
  {
    group: "FOUNDATION",
    items: [
      { name: "Company DNA", href: "/company", icon: Building2, desc: "Persona & ICP" },
      { name: "Product Catalog", href: "/products", icon: Package, desc: "Multi-Product" },
      { name: "Cross-Sell Matrix", href: "/cross-sell", icon: Layers, desc: "Synergies & Pitch" },
      { name: "Competitors Hub", href: "/competitors", icon: Swords, desc: "Directory & Bot" },
    ],
  },
  {
    group: "EXECUTIVE LOOP",
    items: [
      { name: "1. SENSE", href: "/sense", icon: Brain, desc: "Brain & RAG Ingest" },
      { name: "2. THINK", href: "/think", icon: Lightbulb, desc: "Gaps & Moats" },
      { name: "3. ALIGN", href: "/align", icon: Compass, desc: "Conductor Prescriptions" },
      { name: "4. ACT", href: "/act", icon: Zap, desc: "Ready Execution Copy" },
      { name: "5. LEARN", href: "/learn", icon: RotateCcw, desc: "Outcome Log" },
    ],
  },
  {
    group: "SYSTEM & TELEMETRY",
    items: [
      { name: "Observability", href: "/observability", icon: Activity, desc: "Logfire & Langfuse" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0d131f] border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              C
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight">
                Conduct<span className="text-blue-500">OS</span>
              </span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 font-mono">
                v0.1
              </span>
            </div>
          </div>
          <div className="mt-2.5 px-2.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-300 font-medium truncate">Nisol AI</span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="p-3 space-y-6 overflow-y-auto">
          {navigationItems.map((section) => (
            <div key={section.group}>
              <div className="px-3 mb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                {section.group}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        <span className={`text-[10px] ${isActive ? "text-blue-100" : "text-slate-500"}`}>
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / User Session */}
      <div className="p-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-200 truncate">SuperAdmin</span>
            <span className="text-[10px] text-slate-500 truncate">superadmin@conductos.com</span>
          </div>
          <Link
            href="/login"
            className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
