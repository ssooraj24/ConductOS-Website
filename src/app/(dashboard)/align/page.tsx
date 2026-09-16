"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Compass,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Zap,
  DollarSign,
  Layers,
  ArrowRight,
  Sliders,
  Sparkles,
  Award,
  AlertTriangle,
  Clock,
  Briefcase,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { apiFetch } from "@/lib/api-client";

interface PrescribedAction {
  action_id: string;
  title: string;
  category: string;
  description: string;
  projected_pipeline_inr: number;
  allocated_spend_inr: number;
}

interface FinalWeeklyActionPlan {
  week_identifier: string;
  primary_bottleneck: string;
  prescribed_actions: PrescribedAction[];
  total_pipeline_impact_inr: number;
  total_budget_allocated_inr: number;
  capacity_exhaustion_percentage: number;
}

interface OverflowAction {
  title: string;
  category: string;
  rationale: string;
  reason_omitted: string;
  projected_pipeline_inr: number;
  estimated_spend_inr: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  pricing_model: string;
  typical_deal_size_inr: number;
}

export default function AlignPage() {
  const [plan, setPlan] = useState<FinalWeeklyActionPlan | null>(null);
  const [overflow, setOverflow] = useState<OverflowAction[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [prescribing, setPrescribing] = useState(false);
  const [approving, setApproving] = useState(false);
  const [gate2Approved, setGate2Approved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showOverflow, setShowOverflow] = useState(false);

  // Simulation modal state
  const [showSimModal, setShowSimModal] = useState(false);
  const [simBudgetCap, setSimBudgetCap] = useState(25000);
  const [simSalesCycle, setSimSalesCycle] = useState(30);
  const [simWinRate, setSimWinRate] = useState(0.2);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [prods, currentPlanRes] = await Promise.all([
        apiFetch<Product[]>("/products"),
        apiFetch<any>("/align/current-plan").catch(() => null),
      ]);

      setProducts(prods);
      const initialProdId = prods.length > 0 ? prods[0].id : "";
      setSelectedProductId(initialProdId);

      if (currentPlanRes && currentPlanRes.final_weekly_plan) {
        setPlan(currentPlanRes.final_weekly_plan);
        setOverflow(currentPlanRes.overflow_actions || []);
        setGate2Approved(currentPlanRes.gate_2_approved || false);
      } else {
        await generatePrescriptions(initialProdId);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load Conductor alignment state.");
    } finally {
      setLoading(false);
    }
  };

  const generatePrescriptions = async (productId?: string) => {
    try {
      setPrescribing(true);
      setError(null);

      const res = await apiFetch<any>("/align/prescribe", {
        method: "POST",
        body: JSON.stringify({
          product_id: productId || selectedProductId || undefined,
          max_actions: 3,
          budget_cap_inr: 25000.0,
        }),
      });

      if (res.final_weekly_plan) {
        setPlan(res.final_weekly_plan);
        setOverflow(res.overflow_actions || []);
        setGate2Approved(res.gate_2_approved || false);
      }
    } catch (err: any) {
      setError(err.message || "Prescription generation failed.");
    } finally {
      setPrescribing(false);
    }
  };

  const handleApprovePlan = async () => {
    try {
      setApproving(true);
      setError(null);

      const res = await apiFetch<any>("/align/approve-plan", {
        method: "POST",
        body: JSON.stringify({ plan }),
      });

      setGate2Approved(true);
      setSuccessMsg(`Gate 2 Passed! Approved ${res.action_count} actions for ${res.week_identifier}. Ready for Stage 4 (ACT).`);
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err: any) {
      setError(err.message || "Failed to approve plan.");
    } finally {
      setApproving(false);
    }
  };

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSimulating(true);
      setError(null);

      const res = await apiFetch<any>("/align/simulate", {
        method: "POST",
        body: JSON.stringify({
          product_id: selectedProductId || undefined,
          budget_cap_inr: parseFloat(simBudgetCap.toString()),
          sales_cycle_days: parseInt(simSalesCycle.toString(), 10),
          historical_win_rate: parseFloat(simWinRate.toString()),
        }),
      });

      if (res.simulated_plan) {
        setPlan(res.simulated_plan);
        setOverflow(res.simulated_overflow || []);
        setShowSimModal(false);
        setSuccessMsg("Simulation applied successfully to current dashboard view.");
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err: any) {
      setError(err.message || "Simulation failed.");
    } finally {
      setSimulating(false);
    }
  };

  const roiMultiple =
    plan && plan.total_budget_allocated_inr > 0
      ? (plan.total_pipeline_impact_inr / plan.total_budget_allocated_inr).toFixed(1)
      : "0";

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Stage 3: ALIGN
            </span>
            <span className="text-xs text-slate-400">The AI Conductor & Impact Predictor</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-blue-400" />
            Conductor Strategic Prescriptions & Forecast
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Answers <span className="text-slate-200 font-semibold">&ldquo;What should we prioritize?&rdquo;</span> by diagnosing the core revenue bottleneck and strictly arbitrating actions against team capacity (Max 3) & budget (₹25,000).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowSimModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 flex items-center gap-2 transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            Simulate Scenarios
          </button>

          <button
            onClick={() => generatePrescriptions()}
            disabled={prescribing}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${prescribing ? "animate-spin" : ""}`} />
            {prescribing ? "Recalculating..." : "Re-Run Conductor"}
          </button>

          {gate2Approved ? (
            <Link
              href="/act"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Gate 2 Approved — Open ACT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button
              onClick={handleApprovePlan}
              disabled={approving || !plan}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>{approving ? "Approving..." : "Approve Plan (Gate 2)"}</span>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Primary Bottleneck Diagnostic Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-[#0f172a] border border-blue-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Primary Revenue Bottleneck Diagnosed
              </span>
              <span className="text-xs text-slate-400 font-mono">Week {plan?.week_identifier || "2026-W37"}</span>
            </div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span className="text-blue-400">{plan?.primary_bottleneck}</span>
              <span className="text-slate-400 text-sm font-normal">Bottleneck</span>
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              {plan?.primary_bottleneck === "Awareness" &&
                "Target accounts have high willingness to adopt deterministic agents, but current saturation is below threshold. All actions prioritize immediate executive outreach and authoritative technical teardowns."}
              {plan?.primary_bottleneck === "Product Fit" &&
                "Critical compliance or schema guardrail concerns block conversion. Immediate actions prioritize publishing DPDP verification, deterministic harnesses, and de-risked milestone offers."}
              {plan?.primary_bottleneck === "Sales Execution" &&
                "Market fit and reach are solid. Immediate actions prioritize sales battlecards against wrapper agencies, Loom architecture walkthroughs, and executive workshops."}
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-1.5 flex-shrink-0">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Gate 2 Review Status
            </span>
            {gate2Approved ? (
              <span className="px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Gate 2 Passed
              </span>
            ) : (
              <span className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Pending Executive Approval
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 4-Metric Financial Impact KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projected Pipeline Impact */}
        <div className="p-4 rounded-2xl bg-[#0f172a]/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Projected Pipeline Impact
            </span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              ₹{((plan?.total_pipeline_impact_inr || 0) / 100000).toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">Lakhs</span>
          </div>
          <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <Award className="w-3 h-3" />
            Deterministic Pipeline Math
          </p>
        </div>

        {/* Total Budget Allocated */}
        <div className="p-4 rounded-2xl bg-[#0f172a]/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Allocated Weekly Budget
            </span>
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-400">
              ₹{(plan?.total_budget_allocated_inr || 0).toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-slate-500">/ ₹25,000 Cap</span>
          </div>
          <div className="mt-3">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${Math.min(100, ((plan?.total_budget_allocated_inr || 0) / 25000) * 100)}%` }}
              ></div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">
            Strict ceiling enforced by Engine 6
          </p>
        </div>

        {/* Capacity Utilization */}
        <div className="p-4 rounded-2xl bg-[#0f172a]/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Capacity Utilization
            </span>
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {plan?.prescribed_actions.length || 0} / 3
            </span>
            <span className="text-xs text-slate-400">Actions (100%)</span>
          </div>
          <div className="mt-3">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: `${plan?.capacity_exhaustion_percentage || 100}%` }}
              ></div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">
            Prevents team cognitive overload
          </p>
        </div>

        {/* Expected ROI Multiple */}
        <div className="p-4 rounded-2xl bg-[#0f172a]/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Return On Spend (ROI)
            </span>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-400">{roiMultiple}x</span>
            <span className="text-xs text-slate-500">Pipeline Multiple</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">
            Projected Pipeline ÷ Allocated Spend
          </p>
        </div>
      </div>

      {/* The 3 Prescribed Weekly Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              The Prescribed Weekly Actions (Arbitrated by Engine 6)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Strictly limited to 3 actions to guarantee execution velocity without dilution.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            3 Actions Selected • {overflow.length} Dropped to Overflow
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {plan?.prescribed_actions.map((action, idx) => (
            <div
              key={action.action_id || idx}
              className="p-5 rounded-2xl bg-[#0d1527] border border-slate-800 hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs font-extrabold">
                    #{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{action.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{action.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] font-medium text-slate-300">
                    Category: {action.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
                    Pipeline: ₹{(action.projected_pipeline_inr / 100000).toFixed(1)}L
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5 text-[11px]">Allocated Spend</span>
                  <span className="text-white font-bold font-mono">
                    ₹{action.allocated_spend_inr.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5 text-[11px]">Formula Math</span>
                  <span className="text-slate-300 font-mono text-[11px]">
                    Accounts × Deal × Win Rate × (30/Cycle)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block mb-0.5 text-[11px]">Cross-Sell Hook</span>
                    <span className="text-blue-400 font-medium text-[11px]">Embedded in ACT Copy</span>
                  </div>
                  <Zap className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capacity Overflow Pool Accordion */}
      {overflow.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
          <button
            onClick={() => setShowOverflow(!showOverflow)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-200">
                Capacity Overflow Pool ({overflow.length} Candidate Actions Dropped)
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>{showOverflow ? "Hide Dropped Actions" : "Show Dropped Actions"}</span>
              {showOverflow ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </div>
          </button>

          {showOverflow && (
            <div className="pt-3 space-y-3 border-t border-slate-800/60">
              <p className="text-xs text-slate-400">
                These candidate actions were synthesized by Engine 4 but intentionally omitted by Engine 6 to enforce team limits and the ₹25,000 budget cap:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {overflow.map((act, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-300">{act.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400">
                        {act.category}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{act.rationale}</p>
                    <p className="text-amber-400/90 text-[11px] font-medium pt-1">
                      Reason Omitted: {act.reason_omitted}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stage 4 Handshake Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${gate2Approved ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`}></span>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {gate2Approved ? "Gate 2 Passed: Ready for Execution" : "Action Required: Executive Approval"}
            </span>
          </div>
          <h3 className="text-sm font-bold text-white">Stage 4 (ACT): Activation Engine Copy Ready</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Approving the 3 weekly actions unlocks Engine 7 to generate personalized cold emails, LinkedIn comparison posts, and sales battlecards with 1-click clipboard copying.
          </p>
        </div>

        {gate2Approved ? (
          <Link
            href="/act"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 flex items-center gap-2 flex-shrink-0 transition-all"
          >
            <span>Proceed to Stage 4 (ACT)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <button
            onClick={handleApprovePlan}
            disabled={approving || !plan}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 flex-shrink-0 transition-all disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Approve & Proceed to ACT</span>
          </button>
        )}
      </div>

      {/* What-If Simulation Modal */}
      {showSimModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-400" />
                Simulate Strategic Alignment Scenarios
              </h3>
              <button
                onClick={() => setShowSimModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSimulate} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Weekly Marketing Budget Ceiling: <span className="text-blue-400 font-mono">₹{simBudgetCap.toLocaleString("en-IN")}</span>
                </label>
                <input
                  type="range"
                  min="10000"
                  max="50000"
                  step="2500"
                  value={simBudgetCap}
                  onChange={(e) => setSimBudgetCap(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Average Enterprise Sales Cycle: <span className="text-blue-400 font-mono">{simSalesCycle} Days</span>
                </label>
                <input
                  type="range"
                  min="15"
                  max="90"
                  step="5"
                  value={simSalesCycle}
                  onChange={(e) => setSimSalesCycle(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Historical Win Rate: <span className="text-blue-400 font-mono">{(simWinRate * 100).toFixed(0)}%</span>
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="0.50"
                  step="0.05"
                  value={simWinRate}
                  onChange={(e) => setSimWinRate(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowSimModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={simulating}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  Run Simulation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
