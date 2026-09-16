"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Lightbulb,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  Target,
  Swords,
  Layers,
  ArrowRight,
  Sliders,
  CheckCircle2,
  HelpCircle,
  BarChart3,
  Flame,
  Award,
  ExternalLink,
} from "lucide-react";
import { apiFetch } from "@/lib/api-client";

interface MarketGap {
  area: string;
  market_demand: string;
  our_current_offering: string;
  severity: "High" | "Medium" | "Low";
}

interface OpportunityReport {
  market_fit_score: number;
  offering_gap_score: number;
  target_accounts_count: number;
  reached_accounts_count: number;
  saturation_percentage: number;
  critical_gaps: MarketGap[];
}

interface CompetitorDifferentiation {
  competitor_name: string;
  positioning_comparison: string;
  where_they_win: string[];
  where_we_win: string[];
  suggested_counter_angle: string;
}

interface CompetitiveLandscape {
  monitored_competitors_count: number;
  primary_threats: string[];
  our_defensible_moats: string[];
  competitor_comparisons: CompetitorDifferentiation[];
}

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  pricing_model: string;
  typical_deal_size_inr: number;
  specs_and_benefits: string[];
}

export default function ThinkPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [opportunityReport, setOpportunityReport] = useState<OpportunityReport | null>(null);
  const [competitiveLandscape, setCompetitiveLandscape] = useState<CompetitiveLandscape | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<"gaps" | "moats" | "formula">("gaps");
  const [error, setError] = useState<string | null>(null);

  // Recalculation sensitivity controls
  const [showRecalcModal, setShowRecalcModal] = useState(false);
  const [w1Demand, setW1Demand] = useState(0.4);
  const [w2Spec, setW2Spec] = useState(0.4);
  const [w3Gap, setW3Gap] = useState(0.2);
  const [targetAccounts, setTargetAccounts] = useState(500);
  const [reachedAccounts, setReachedAccounts] = useState(250);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load products list
      const prods = await apiFetch<Product[]>("/products");
      setProducts(prods);

      const initialProdId = prods.length > 0 ? prods[0].id : "";
      setSelectedProductId(initialProdId);

      // Run initial Stage 2 diagnostic
      await runDiagnostic(initialProdId);
    } catch (err: any) {
      setError(err.message || "Failed to load Think stage diagnostic.");
    } finally {
      setLoading(false);
    }
  };

  const runDiagnostic = async (productId?: string) => {
    try {
      setAnalyzing(true);
      setError(null);

      const res = await apiFetch<any>("/think/analyze", {
        method: "POST",
        body: JSON.stringify({ product_id: productId || selectedProductId || undefined }),
      });

      if (res.opportunity_report) {
        setOpportunityReport(res.opportunity_report);
        setTargetAccounts(res.opportunity_report.target_accounts_count);
        setReachedAccounts(res.opportunity_report.reached_accounts_count);
      }
      if (res.competitive_landscape) {
        setCompetitiveLandscape(res.competitive_landscape);
      }
    } catch (err: any) {
      setError(err.message || "Diagnostic run failed.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleProductChange = async (newProductId: string) => {
    setSelectedProductId(newProductId);
    await runDiagnostic(newProductId);
  };

  const handleRecalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAnalyzing(true);
      setError(null);

      const updated = await apiFetch<OpportunityReport>("/think/recalculate", {
        method: "POST",
        body: JSON.stringify({
          product_id: selectedProductId || undefined,
          w1_demand: parseFloat(w1Demand.toString()),
          w2_spec: parseFloat(w2Spec.toString()),
          w3_gap: parseFloat(w3Gap.toString()),
          target_accounts: parseInt(targetAccounts.toString(), 10),
          reached_accounts: parseInt(reachedAccounts.toString(), 10),
        }),
      });

      setOpportunityReport(updated);
      setShowRecalcModal(false);
    } catch (err: any) {
      setError(err.message || "Recalculation failed.");
    } finally {
      setAnalyzing(false);
    }
  };

  const currentProduct = products.find((p) => p.id === selectedProductId);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Stage 2: THINK
            </span>
            <span className="text-xs text-slate-400">Deterministic Diagnostics & Moat Radar</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Lightbulb className="w-6 h-6 text-amber-400" />
            Opportunity & Competitive Moats
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Answers <span className="text-slate-200 font-semibold">&ldquo;What does it mean?&rdquo;</span> by comparing verified market demand against product specifications and competitor positioning.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowRecalcModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 flex items-center gap-2 transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            Tune Math Weights
          </button>

          <button
            onClick={() => runDiagnostic()}
            disabled={analyzing}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${analyzing ? "animate-spin" : ""}`} />
            {analyzing ? "Synthesizing..." : "Re-Run Diagnostic"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Product Selector Filter Bar */}
      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Layers className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-300">Target Product:</span>
          <select
            value={selectedProductId}
            onChange={(e) => handleProductChange(e.target.value)}
            className="bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.category})
              </option>
            ))}
          </select>
        </div>

        {currentProduct && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px]">
              Pricing: {currentProduct.pricing_model}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[11px]">
              Deal Size: ₹{(currentProduct.typical_deal_size_inr / 100000).toFixed(1)} Lakhs
            </span>
          </div>
        )}
      </div>

      {/* Diagnostic KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Market Fit Score Card */}
        <div className="p-4 rounded-2xl bg-[#0f172a]/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Market Fit Score</span>
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {opportunityReport?.market_fit_score.toFixed(1) ?? "--"}
            </span>
            <span className="text-xs text-slate-500">/ 100</span>
          </div>
          <div className="mt-3">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, opportunityReport?.market_fit_score || 0)}%` }}
              ></div>
            </div>
          </div>
          <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            {opportunityReport && opportunityReport.market_fit_score >= 70
              ? "High Product-Market Alignment"
              : "Moderate Fit — Address Gaps"}
          </p>
        </div>

        {/* Offering Gap Score Card */}
        <div className="p-4 rounded-2xl bg-[#0f172a]/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Offering Gap Score</span>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-400">
              {opportunityReport?.offering_gap_score.toFixed(1) ?? "--"}
            </span>
            <span className="text-xs text-slate-500">/ 100 (Lower is better)</span>
          </div>
          <div className="mt-3">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, opportunityReport?.offering_gap_score || 0)}%` }}
              ></div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">
            {opportunityReport?.critical_gaps.length || 0} explicit gaps diagnosed
          </p>
        </div>

        {/* Saturation % Card */}
        <div className="p-4 rounded-2xl bg-[#0f172a]/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Market Saturation</span>
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Target className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {opportunityReport?.saturation_percentage.toFixed(1) ?? "--"}%
            </span>
            <span className="text-xs text-slate-500">reached</span>
          </div>
          <div className="mt-3">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, opportunityReport?.saturation_percentage || 0)}%` }}
              ></div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">
            {opportunityReport?.reached_accounts_count || 0} of {opportunityReport?.target_accounts_count || 0} Target Accounts
          </p>
        </div>

        {/* Moats vs Competitors Card */}
        <div className="p-4 rounded-2xl bg-[#0f172a]/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Defensible Moats</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400">
              {competitiveLandscape?.our_defensible_moats.length || 0}
            </span>
            <span className="text-xs text-slate-500">Active Moats</span>
          </div>
          <div className="mt-3">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-4/5"></div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">
            Vs. {competitiveLandscape?.monitored_competitors_count || 0} Monitored Rivals
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("gaps")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === "gaps"
              ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm"
              : "text-slate-400 hover:text-white hover:bg-slate-800/40"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Critical Market Gaps ({opportunityReport?.critical_gaps.length || 0})
        </button>

        <button
          onClick={() => setActiveTab("moats")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === "moats"
              ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm"
              : "text-slate-400 hover:text-white hover:bg-slate-800/40"
          }`}
        >
          <Swords className="w-3.5 h-3.5" />
          Competitive Moats & Radar ({competitiveLandscape?.competitor_comparisons.length || 0})
        </button>

        <button
          onClick={() => setActiveTab("formula")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === "formula"
              ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm"
              : "text-slate-400 hover:text-white hover:bg-slate-800/40"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          Deterministic Math Breakdown
        </button>
      </div>

      {/* TAB 1: CRITICAL MARKET GAPS */}
      {activeTab === "gaps" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Engine 2 Diagnostic: Detected Customer Demand Gaps</h2>
            <span className="text-xs text-slate-500">
              Evaluated against real-world customer objections and buying criteria
            </span>
          </div>

          {opportunityReport?.critical_gaps.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-white">No Critical Gaps Detected</p>
              <p className="text-xs text-slate-400 mt-1">
                {currentProduct?.name} fully satisfies currently ingested customer demands, compliance criteria, and pricing models.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {opportunityReport?.critical_gaps.map((gap, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#0d1527] border border-slate-800/90 hover:border-slate-700 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase bg-slate-800 text-slate-300">
                        Area: {gap.area}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          gap.severity === "High"
                            ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                            : gap.severity === "Medium"
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {gap.severity} Severity
                      </span>
                    </div>

                    <div className="space-y-2 mt-3">
                      <div className="text-xs">
                        <span className="font-semibold text-slate-300 block mb-0.5">Market Demand / Voice:</span>
                        <p className="text-slate-400 bg-slate-900/70 p-2 rounded-lg border border-slate-800">
                          {gap.market_demand}
                        </p>
                      </div>

                      <div className="text-xs">
                        <span className="font-semibold text-slate-300 block mb-0.5">Our Current Offering Status:</span>
                        <p className="text-slate-400 bg-slate-900/70 p-2 rounded-lg border border-slate-800">
                          {gap.our_current_offering}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Input to Stage 3 Prescriptions</span>
                    <span className="text-blue-400 font-medium flex items-center gap-1">
                      Actionable in ALIGN <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: COMPETITIVE MOATS & BATTLE-CARDS */}
      {activeTab === "moats" && (
        <div className="space-y-6">
          {/* Top Panel: Moats & Threats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Defensible Moats */}
            <div className="p-4 rounded-2xl bg-[#0d1527] border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Nisol AI Defensible Moats
                </h3>
              </div>
              <ul className="space-y-2.5">
                {competitiveLandscape?.our_defensible_moats.map((moat, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                    <span>{moat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary Threats */}
            <div className="p-4 rounded-2xl bg-[#0d1527] border border-amber-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Primary Market Threats
                </h3>
              </div>
              <ul className="space-y-2.5">
                {competitiveLandscape?.primary_threats.map((threat, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0"></span>
                    <span>{threat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Head-to-Head Battle Matrix */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Swords className="w-4 h-4 text-blue-400" />
              Head-to-Head Competitor Differentiation & Battle Angles
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {competitiveLandscape?.competitor_comparisons.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white">{comp.competitor_name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{comp.positioning_comparison}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-[11px] text-slate-300 font-mono self-start">
                      Active Rival
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="font-semibold text-amber-400 block mb-1.5 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> Where They Win:
                      </span>
                      <ul className="space-y-1 text-slate-400">
                        {comp.where_they_win.map((w, wi) => (
                          <li key={wi} className="flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-900/40">
                      <span className="font-semibold text-emerald-400 block mb-1.5 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" /> Where We Win (Moat):
                      </span>
                      <ul className="space-y-1 text-slate-300">
                        {comp.where_we_win.map((w, wi) => (
                          <li key={wi} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20">
                    <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider block mb-1">
                      Recommended Battle Angle (Sales & Founder Counter):
                    </span>
                    <p className="text-xs text-slate-200">{comp.suggested_counter_angle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DETERMINISTIC MATH BREAKDOWN */}
      {activeTab === "formula" && (
        <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              Engine 2: Deterministic Market Fit Mathematical Specification
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Guarantees zero LLM hallucinations by calculating market viability through explicit, auditable weights.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-blue-300 space-y-2">
            <p className="text-slate-200 font-semibold">Formula:</p>
            <p className="text-emerald-400">
              MarketFit (0-100) = (w1 × DemandSignal) + (w2 × SpecMatch) - (w3 × GapPenalty)
            </p>
            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 space-y-1">
              <p>• Default Weights: w1 = 0.4 (Demand), w2 = 0.4 (Spec Match), w3 = 0.2 (Gap Penalty)</p>
              <p>• Account Saturation % = (Reached Accounts ÷ Target Accounts) × 100</p>
              <p>• Clamping: Scores strictly bounded between [0.0, 100.0]</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Active Weight w1 (Demand)</span>
              <span className="text-base font-bold text-white font-mono">{w1Demand}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Active Weight w2 (Spec Match)</span>
              <span className="text-base font-bold text-white font-mono">{w2Spec}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Active Weight w3 (Gap Penalty)</span>
              <span className="text-base font-bold text-white font-mono">{w3Gap}</span>
            </div>
          </div>
        </div>
      )}

      {/* Stage 3 Handshake Bridge */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Diagnostic Complete
            </span>
          </div>
          <h3 className="text-sm font-bold text-white">Ready for Stage 3 (ALIGN): Conductor Prescriptions</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Stage 2 diagnostics feed directly into the Conductor Agent to identify the primary revenue bottleneck and prescribe high-impact weekly actions.
          </p>
        </div>

        <Link
          href="/align"
          className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 flex-shrink-0 transition-all"
        >
          <span>Proceed to Stage 3 (ALIGN)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Modal: Tune Math Weights */}
      {showRecalcModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-400" />
                Tune Diagnostic Math Weights
              </h3>
              <button
                onClick={() => setShowRecalcModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRecalculate} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Demand Signal Weight (w1): <span className="text-blue-400 font-mono">{w1Demand}</span>
                </label>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={w1Demand}
                  onChange={(e) => setW1Demand(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Spec Match Weight (w2): <span className="text-blue-400 font-mono">{w2Spec}</span>
                </label>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={w2Spec}
                  onChange={(e) => setW2Spec(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Gap Penalty Weight (w3): <span className="text-blue-400 font-mono">{w3Gap}</span>
                </label>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={w3Gap}
                  onChange={(e) => setW3Gap(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Target Accounts</label>
                  <input
                    type="number"
                    value={targetAccounts}
                    onChange={(e) => setTargetAccounts(parseInt(e.target.value, 10))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Reached Accounts</label>
                  <input
                    type="number"
                    value={reachedAccounts}
                    onChange={(e) => setReachedAccounts(parseInt(e.target.value, 10))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowRecalcModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={analyzing}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  Apply & Recalculate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
