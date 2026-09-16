"use client";

import { useEffect, useState } from "react";
import {
  Layers,
  Plus,
  ArrowRight,
  Sparkles,
  Trash2,
  AlertCircle,
  Package,
} from "lucide-react";
import { apiFetch } from "@/lib/api-client";
import Link from "next/link";

export default function CrossSellPage() {
  const [rules, setRules] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [sourceId, setSourceId] = useState("");
  const [targetId, setTargetId] = useState("");
  const [rationale, setRationale] = useState("");
  const [pitchHook, setPitchHook] = useState("");
  const [triggerStage, setTriggerStage] = useState("outreach");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [rulesData, productsData] = await Promise.all([
        apiFetch<any[]>("/products/cross-sell"),
        apiFetch<any[]>("/products"),
      ]);
      setRules(rulesData);
      setProducts(productsData);
      if (productsData.length >= 2) {
        setSourceId(productsData[0].id);
        setTargetId(productsData[1].id);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load cross-sell matrix.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sourceId === targetId) {
      setError("Source product and target product cannot be the same.");
      return;
    }

    try {
      setCreating(true);
      setError(null);

      const payload = {
        source_product_id: sourceId,
        target_product_id: targetId,
        synergy_rationale: rationale,
        pitch_hook: pitchHook,
        trigger_stage: triggerStage,
        priority_score: 8,
        is_active: true,
      };

      await apiFetch("/products/cross-sell", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setShowAddModal(false);
      setRationale("");
      setPitchHook("");
      await loadData();
    } catch (err: any) {
      setError(err.message || "Failed to create cross-sell rule.");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteRule = async (ruleId: string) => {
    if (!confirm("Are you sure you want to delete this cross-sell rule?")) return;
    try {
      await apiFetch(`/products/cross-sell/${ruleId}`, { method: "DELETE" });
      await loadData();
    } catch (err: any) {
      setError(err.message || "Failed to delete rule.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Layer 0 Foundation</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Cross-Selling Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Define cross-selling synergy rules so leads entering for Product A automatically discover Product B.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 transition-colors"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Product Catalog</span>
          </Link>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Synergy Rule</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Cross-Sell Rules Cards */}
      <div className="space-y-4">
        {rules.length === 0 ? (
          <div className="p-8 text-center bg-[#121927] border border-slate-800 rounded-2xl text-slate-400 text-xs">
            No cross-sell rules configured. Create one to automatically bridge products during outreach.
          </div>
        ) : (
          rules.map((rule) => (
            <div
              key={rule.id}
              className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700/80 transition-all space-y-4"
            >
              {/* Product Flow Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold text-xs">
                    {rule.source_product_name || "Source Product"}
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <span className="text-[10px] font-mono">CROSS-SELLS</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-xs">
                    {rule.target_product_name || "Target Product"}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 font-medium capitalize">
                    Stage: {rule.trigger_stage}
                  </span>
                  <button
                    onClick={() => handleDeleteRule(rule.id)}
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Rationale & Pitch Hook */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800/60">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
                    Strategic Synergy Rationale
                  </span>
                  <p className="text-xs text-slate-300">{rule.synergy_rationale}</p>
                </div>
                <div className="space-y-1 bg-[#090d16] p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>Injected Activation Hook</span>
                  </div>
                  <p className="text-xs text-slate-300 font-serif italic">"{rule.pitch_hook}"</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Synergy Rule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121927] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Create Cross-Selling Synergy Rule</h3>
            <form onSubmit={handleCreateRule} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Source Product (Prospect buys)</label>
                  <select
                    value={sourceId}
                    onChange={(e) => setSourceId(e.target.value)}
                    className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Target Product (Cross-sell)</label>
                  <select
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Strategic Synergy Rationale</label>
                <textarea
                  rows={2}
                  required
                  value={rationale}
                  onChange={(e) => setRationale(e.target.value)}
                  placeholder="Why does a buyer of Product A naturally need Product B?"
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Activation Pitch Hook (Injected into Cold Emails & Battle-cards)
                </label>
                <textarea
                  rows={2}
                  required
                  value={pitchHook}
                  onChange={(e) => setPitchHook(e.target.value)}
                  placeholder="e.g. P.S. Most teams deploying X also pair it with Y..."
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Trigger Stage</label>
                <select
                  value={triggerStage}
                  onChange={(e) => setTriggerStage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                >
                  <option value="outreach">Outreach (Cold Emails / Posts)</option>
                  <option value="meeting">Meeting (Sales Pitch / Demo)</option>
                  <option value="proposal">Proposal (Contract Bundling)</option>
                  <option value="post-sale">Post-Sale (Customer Expansion)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-xs"
                >
                  {creating ? "Creating..." : "Save Rule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
