"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Zap,
  Mail,
  Share2,
  Swords,
  Copy,
  Check,
  Edit3,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
} from "lucide-react";
import { apiFetch } from "@/lib/api-client";

interface Artifact {
  id: string;
  artifact_type: "cold_email" | "linkedin_post" | "battle_card" | string;
  title: string;
  content: string;
  channel: string;
  target_recipient?: string;
  copy_count: number;
}

export default function ActPage() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Edit Modal State
  const [editingArtifact, setEditingArtifact] = useState<Artifact | null>(null);
  const [editContent, setEditContent] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Status tracking state per artifact (client-side execution tracker)
  const [executionStatuses, setExecutionStatuses] = useState<Record<string, string>>({
    cold_email: "Ready to Send",
    linkedin_post: "Scheduled",
    battle_card: "Active in Field",
  });

  useEffect(() => {
    loadArtifacts();
  }, []);

  const loadArtifacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiFetch<any>("/act/artifacts");
      if (res && res.artifacts) {
        setArtifacts(res.artifacts);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load execution artifacts.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    try {
      setGenerating(true);
      setError(null);
      const res = await apiFetch<any>("/act/generate", { method: "POST" });
      if (res && res.artifacts) {
        setArtifacts(res.artifacts);
        setSuccessMsg("Engine 7 regenerated 3 execution artifacts with zero unresolved variables.");
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate artifacts.");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = async (art: Artifact) => {
    try {
      await navigator.clipboard.writeText(art.content);
      setCopiedId(art.id);
      setTimeout(() => setCopiedId(null), 2500);

      // Record copy event in backend (Gate 3 audit)
      const res = await apiFetch<any>(`/act/copy/${art.id}`, { method: "POST" });
      
      // Update local copy count
      setArtifacts((prev) =>
        prev.map((item) =>
          item.id === art.id ? { ...item, copy_count: res.copy_count } : item
        )
      );
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const handleOpenEdit = (art: Artifact) => {
    setEditingArtifact(art);
    setEditContent(art.content);
    setEditError(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArtifact) return;

    try {
      setSavingEdit(true);
      setEditError(null);

      const res = await apiFetch<any>(`/act/edit/${editingArtifact.id}`, {
        method: "PATCH",
        body: JSON.stringify({ content: editContent }),
      });

      setArtifacts((prev) =>
        prev.map((item) =>
          item.id === editingArtifact.id ? { ...item, content: res.content } : item
        )
      );
      setEditingArtifact(null);
      setSuccessMsg("Artifact updated and verified for compliance.");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setEditError(err.message || "Failed to save edits.");
    } finally {
      setSavingEdit(false);
    }
  };

  const getIconForType = (type: string) => {
    if (type === "cold_email") return <Mail className="w-4 h-4 text-blue-400" />;
    if (type === "linkedin_post") return <Share2 className="w-4 h-4 text-indigo-400" />;
    return <Swords className="w-4 h-4 text-amber-400" />;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Stage 4: ACT
            </span>
            <span className="text-xs text-slate-400">Execution Artifacts & Copy Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Zap className="w-6 h-6 text-amber-400" />
            Activation Engine & Ready-to-Use Artifacts
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Answers <span className="text-slate-200 font-semibold">&ldquo;What should we do?&rdquo;</span> by transforming the 3 approved weekly actions into publication-ready copy with embedded cross-sell hooks and zero placeholder tokens.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRegenerate}
            disabled={generating}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${generating ? "animate-spin" : ""}`} />
            {generating ? "Regenerating..." : "Regenerate Artifacts"}
          </button>

          <Link
            href="/learn"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
          >
            <span>Proceed to Stage 5 (LEARN)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
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

      {/* Gate 3 Compliance Notice Banner */}
      <div className="p-4 rounded-2xl bg-[#0f172a] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Gate 3 Policy: Copy-to-Clipboard Only
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                Zero-Unresolved-Variables Verified
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              To guarantee zero unauthorized outbound blunders, ConductOS provides publication-ready copy for 1-click clipboard transfer with human-in-the-loop review.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 self-start sm:self-center font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
            3 Artifacts Active
          </span>
        </div>
      </div>

      {/* Artifacts Display */}
      <div className="space-y-6">
        {artifacts.map((art, idx) => {
          const isCopied = copiedId === art.id;

          return (
            <div
              key={art.id || idx}
              className="p-6 rounded-2xl bg-[#0d1527] border border-slate-800 hover:border-slate-700/80 transition-all space-y-4 shadow-xl"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center">
                    {getIconForType(art.artifact_type)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      {art.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                      <span>Channel: <strong className="text-slate-300">{art.channel}</strong></span>
                      <span>•</span>
                      <span>Target: <strong className="text-slate-300">{art.target_recipient || "Enterprise Decision-Makers"}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
                    Copied: {art.copy_count}x
                  </span>

                  <button
                    onClick={() => handleOpenEdit(art)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                    title="Edit copy inline"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleCopy(art)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${
                      isCopied
                        ? "bg-emerald-600 text-white shadow-emerald-600/30"
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy to Clipboard</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Artifact Content Preview */}
              <div className="p-4 rounded-xl bg-[#080d19] border border-slate-800/90 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto selection:bg-blue-600 selection:text-white">
                {art.content}
              </div>

              {/* Extra context callouts depending on type */}
              {art.artifact_type === "cold_email" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-500/20 text-blue-300 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    <span>Includes embedded cross-sell hook for Enterprise RAG memory.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Includes mandatory Indian DPDP Act 2023 opt-out footer.</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stage 5 Handshake Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Execution Complete
            </span>
          </div>
          <h3 className="text-sm font-bold text-white">Ready for Stage 5 (LEARN): Closed-Loop Retrospective</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            After launching outreach and sales meetings, log real-world revenue, meetings booked, and new objections in Stage 5 to update system memory.
          </p>
        </div>

        <Link
          href="/learn"
          className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 flex-shrink-0 transition-all"
        >
          <span>Proceed to Stage 5: LEARN</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Inline Edit Modal */}
      {editingArtifact && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-400" />
                Refine Artifact: {editingArtifact.title}
              </h3>
              <button
                onClick={() => setEditingArtifact(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            {editError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                {editError}
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1.5">
                  Artifact Content (Compliance rule: No un-substituted [Tokens] or placeholders):
                </label>
                <textarea
                  rows={14}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingArtifact(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{savingEdit ? "Verifying & Saving..." : "Verify & Save"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
