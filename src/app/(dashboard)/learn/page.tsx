"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles,
  ShieldCheck,
  Plus,
  Trash2,
  Layers,
  ArrowRight,
  Database,
  History,
  Award,
} from "lucide-react";
import { apiFetch } from "@/lib/api-client";

interface RetrospectiveItem {
  id: string;
  week_identifier: string;
  actions_completed_count: number;
  meetings_booked: number;
  revenue_realized: number;
  pipeline_generated: number;
  new_objections_logged: string[];
  tactics_to_deprioritize: string[];
  insights_and_notes: string;
  created_at: string;
}

export default function LearnPage() {
  const [history, setHistory] = useState<RetrospectiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State
  const [weekId, setWeekId] = useState("2026-W37");
  const [actionsCompleted, setActionsCompleted] = useState(3);
  const [meetingsBooked, setMeetingsBooked] = useState(3);
  const [revenueRealized, setRevenueRealized] = useState(1500000);
  const [pipelineGenerated, setPipelineGenerated] = useState(4500000);
  const [learningNotes, setLearningNotes] = useState(
    "CTOs responded positively to the deterministic Pydantic schema teardown. 3 meetings booked with Mid-Market FinTech firms."
  );

  // Dynamic lists
  const [newObjectionInput, setNewObjectionInput] = useState("");
  const [objectionsList, setObjectionsList] = useState<string[]>([
    "Customer asked for on-premise Kubernetes deployment guide without AWS cloud dependencies.",
  ]);

  const [tacticInput, setTacticInput] = useState("");
  const [tacticsList, setTacticsList] = useState<string[]>([
    "Cold outreach without personalized architecture diagram had 0% reply rate.",
  ]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiFetch<RetrospectiveItem[]>("/learn/history");
      setHistory(res || []);
    } catch (err: any) {
      setError(err.message || "Failed to load retrospective history.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddObjection = () => {
    if (!newObjectionInput.trim()) return;
    setObjectionsList([...objectionsList, newObjectionInput.trim()]);
    setNewObjectionInput("");
  };

  const handleRemoveObjection = (idx: number) => {
    setObjectionsList(objectionsList.filter((_, i) => i !== idx));
  };

  const handleAddTactic = () => {
    if (!tacticInput.trim()) return;
    setTacticsList([...tacticsList, tacticInput.trim()]);
    setTacticInput("");
  };

  const handleRemoveTactic = (idx: number) => {
    setTacticsList(tacticsList.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        week_identifier: weekId,
        actions_completed: parseInt(actionsCompleted.toString(), 10),
        meetings_booked: parseInt(meetingsBooked.toString(), 10),
        revenue_realized_inr: parseFloat(revenueRealized.toString()),
        pipeline_generated_inr: parseFloat(pipelineGenerated.toString()),
        new_objections: objectionsList,
        tactics_to_deprioritize: tacticsList,
        learning_notes: learningNotes,
      };

      await apiFetch("/learn/submit-retrospective", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setSuccessMsg(`Retrospective for ${weekId} logged! Feedback embedded into Company Brain for next SENSE cycle.`);
      setTimeout(() => setSuccessMsg(null), 5000);
      await loadHistory();
    } catch (err: any) {
      setError(err.message || "Failed to submit retrospective.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Stage 5: LEARN
            </span>
            <span className="text-xs text-slate-400">Closed-Loop Learning Retrospective</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <RotateCcw className="w-6 h-6 text-emerald-400" />
            Monday Morning Retrospective & Outcome Reconciliation
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Answers <span className="text-slate-200 font-semibold">&ldquo;What worked?&rdquo;</span> by reconciling real-world revenue and meetings, permanently retiring failed tactics, and embedding new objections into SENSE.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/sense"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Re-Engage Flywheel (1. SENSE)</span>
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

      {/* Flywheel Loop Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0d1527] to-slate-900 border border-emerald-500/30 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  The Full Cybernetic Flywheel
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                  100% Operational
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                SENSE (Brain) ──► THINK (Moats) ──► ALIGN (Conductor) ──► ACT (Copy) ──► LEARN (Feedback)
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 self-start md:self-auto font-mono">
            {history.length} Cycles Completed
          </span>
        </div>
      </div>

      {/* Retrospective Logging Form */}
      <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              Log Weekly Retrospective
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Record ground-truth sales metrics and field feedback.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Cycle:</span>
            <input
              type="text"
              value={weekId}
              onChange={(e) => setWeekId(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono w-28 text-center"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Top Numerical KPI Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-xs font-medium text-slate-300 block">Actions Completed (of 3)</label>
              <input
                type="number"
                min="0"
                max="3"
                value={actionsCompleted}
                onChange={(e) => setActionsCompleted(parseInt(e.target.value, 10))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-base font-bold"
              />
              <span className="text-[10px] text-slate-500 block">Strictly capped at 3 actions</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-xs font-medium text-slate-300 block">Meetings Booked</label>
              <input
                type="number"
                min="0"
                value={meetingsBooked}
                onChange={(e) => setMeetingsBooked(parseInt(e.target.value, 10))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-base font-bold"
              />
              <span className="text-[10px] text-slate-500 block">Qualified pipeline meetings held</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-xs font-medium text-slate-300 block">Revenue Realized (₹)</label>
              <input
                type="number"
                min="0"
                step="50000"
                value={revenueRealized}
                onChange={(e) => setRevenueRealized(parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-emerald-400 font-mono text-base font-bold"
              />
              <span className="text-[10px] text-slate-500 block">Closed deals & signed milestones</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-xs font-medium text-slate-300 block">New Pipeline Generated (₹)</label>
              <input
                type="number"
                min="0"
                step="100000"
                value={pipelineGenerated}
                onChange={(e) => setPipelineGenerated(parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-blue-400 font-mono text-base font-bold"
              />
              <span className="text-[10px] text-slate-500 block">Total active opportunity value</span>
            </div>
          </div>

          {/* New Customer Objections Logger (Feedback into SENSE Brain) */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-blue-400" />
                  New Customer Objections Heard in the Field
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  These objections are automatically converted to clean Golden Records by Engine 0 and embedded into Neon pgvector for the next SENSE cycle.
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 font-mono">
                Auto-SENSE Ingestion
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newObjectionInput}
                onChange={(e) => setNewObjectionInput(e.target.value)}
                placeholder="e.g. Prospect asked about SOC-2 Type II audit report for autonomous agents..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
              <button
                type="button"
                onClick={handleAddObjection}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Objection
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              {objectionsList.map((obj, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-300"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    {obj}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveObjection(i)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Deprioritize Ineffective Tactics */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Tactics to Permanently Deprioritize
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Tactics that flopped or had 0% reply rate. Engine 4 will permanently block them from future weekly action prescriptions.
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 font-mono">
                Engine 4 Blacklist
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tacticInput}
                onChange={(e) => setTacticInput(e.target.value)}
                placeholder="e.g. Unsolicited founder pitch without prior engagement..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <button
                type="button"
                onClick={handleAddTactic}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Tactic
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              {tacticsList.map((tac, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-300"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    {tac}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTactic(i)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Qualitative Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 block">Executive Retrospective Notes</label>
            <textarea
              rows={3}
              value={learningNotes}
              onChange={(e) => setLearningNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? "Processing Retrospective..." : "Submit Retrospective & Close Loop"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Historical Retrospectives */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <History className="w-4 h-4 text-blue-400" />
          Historical Outcome Logs & Flywheel Trajectory
        </h3>

        {history.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center">
            <p className="text-xs text-slate-400">No retrospective logs submitted yet. Submit your first weekly log above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#0d1527] border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 font-mono text-xs font-bold">
                      {item.week_identifier}
                    </span>
                    <span className="text-xs text-slate-400">
                      Logged {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-300">
                      Actions: <strong className="text-white">{item.actions_completed_count}</strong>
                    </span>
                    <span className="text-slate-300">
                      Meetings: <strong className="text-blue-400">{item.meetings_booked}</strong>
                    </span>
                    <span className="text-slate-300">
                      Revenue: <strong className="text-emerald-400">₹{(item.revenue_realized / 100000).toFixed(1)}L</strong>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic">{item.insights_and_notes || "No notes logged."}</p>

                {item.new_objections_logged && item.new_objections_logged.length > 0 && (
                  <div className="pt-1 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">New Objections Fed into SENSE:</span>
                    <ul className="list-disc pl-4 mt-0.5 space-y-0.5">
                      {item.new_objections_logged.map((obj, oi) => (
                        <li key={oi}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
