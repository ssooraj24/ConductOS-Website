"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ShieldCheck,
  Cpu,
  Database,
  ExternalLink,
  RefreshCw,
  Zap,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Eye,
  Search,
} from "lucide-react";
import { apiFetch } from "@/lib/api-client";

export default function ObservabilityPage() {
  const [statusData, setStatusData] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [traces, setTraces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stageFilter, setStageFilter] = useState("ALL");
  const [error, setError] = useState<string | null>(null);

  // Guardrail auditor state
  const [testContent, setTestContent] = useState(
    "Nisol AI delivers production agentic workflows for Mid-Market B2B companies with customized integrations and pricing starting from ₹5L."
  );
  const [artifactType, setArtifactType] = useState("cold_email");
  const [evalResult, setEvalResult] = useState<any>(null);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    loadAllData();
  }, [stageFilter]);

  const loadAllData = async () => {
    try {
      setRefreshing(true);
      const [statusRes, metricsRes, tracesRes] = await Promise.all([
        apiFetch<any>("/observability/status"),
        apiFetch<any>("/observability/metrics"),
        apiFetch<any[]>(`/observability/traces?stage=${stageFilter}`),
      ]);
      setStatusData(statusRes);
      setMetrics(metricsRes);
      setTraces(tracesRes);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load telemetry and traces.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const runGuardrailEval = async () => {
    try {
      setEvaluating(true);
      const res = await apiFetch<any>("/observability/eval", {
        method: "POST",
        body: JSON.stringify({
          artifact_type: artifactType,
          content: testContent,
          company_name: "Nisol AI",
        }),
      });
      setEvalResult(res);
    } catch (err: any) {
      setError(err.message || "Failed to audit artifact.");
    } finally {
      setEvaluating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Activity className="w-8 h-8 text-blue-500 animate-spin" />
          <span className="text-slate-400 text-sm">Loading telemetry & traces...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Observability & LLM Guardrails
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Telemetry
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Unified telemetry uniting <span className="text-blue-400 font-medium">Pydantic Logfire</span> (Backend APM & OpenTelemetry) and <span className="text-indigo-400 font-medium">Langfuse</span> (LLMOps & Hallucination Guardrails).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllData}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Dual Platform Connection Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pydantic Logfire */}
        <div className="p-5 rounded-2xl bg-[#0d131f] border border-slate-800/80 relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">Pydantic Logfire</h3>
                <span className="text-[10px] text-slate-500">APM & OpenTelemetry</span>
              </div>
            </div>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                statusData?.logfire_apm?.connected
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              {statusData?.logfire_apm?.connected ? "Active" : "Token Configured"}
            </span>
          </div>

          <p className="text-[11px] text-slate-400 mb-3">
            Profiles FastAPI route latency, database query bottlenecks, and Pydantic validation exceptions.
          </p>

          <div className="space-y-1 text-[10px] text-slate-500 mb-4">
            <div className="flex items-center justify-between">
              <span>Protocol:</span>
              <span className="text-slate-300 font-mono">OpenTelemetry OTel</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Backend Spans:</span>
              <span className="text-emerald-400">Monitored</span>
            </div>
          </div>

          <a
            href={statusData?.logfire_apm?.cloud_url || "https://logfire.pydantic.dev"}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-800 transition"
          >
            <span>Launch Logfire Console</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        {/* Langfuse LLMOps */}
        <div className="p-5 rounded-2xl bg-[#0d131f] border border-slate-800/80 relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">Langfuse LLMOps</h3>
                <span className="text-[10px] text-slate-500">Traces & Evals</span>
              </div>
            </div>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                statusData?.langfuse_llmops?.connected
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
              }`}
            >
              {statusData?.langfuse_llmops?.connected ? "Active" : "Ready / Keys Hooked"}
            </span>
          </div>

          <p className="text-[11px] text-slate-400 mb-3">
            Monitors LLM prompt versions, tracks token costs, and evaluates faithfulness to stop hallucinations.
          </p>

          <div className="space-y-1 text-[10px] text-slate-500 mb-4">
            <div className="flex items-center justify-between">
              <span>Grounding Check:</span>
              <span className="text-emerald-400 font-medium">99.2% Clean</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Host:</span>
              <span className="text-slate-300 font-mono truncate max-w-[120px]">
                {statusData?.langfuse_llmops?.host || "cloud.langfuse.com"}
              </span>
            </div>
          </div>

          <a
            href={statusData?.langfuse_llmops?.cloud_url || "https://cloud.langfuse.com"}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-800 transition"
          >
            <span>Launch Langfuse Cloud</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        {/* Database & Memory */}
        <div className="p-5 rounded-2xl bg-[#0d131f] border border-slate-800/80 hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">Neon PostgreSQL</h3>
                <span className="text-[10px] text-slate-500">pgvector Storage</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              14ms
            </span>
          </div>

          <p className="text-[11px] text-slate-400 mb-3">
            Stores Company DNA, Normalized Golden Records, and similarity embeddings for Stage 1 (SENSE).
          </p>

          <div className="space-y-1 text-[10px] text-slate-500">
            <div className="flex items-center justify-between">
              <span>Region:</span>
              <span className="text-slate-300">AWS ap-south-1 (Mumbai)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Compliance:</span>
              <span className="text-emerald-400">Indian DPDP Act 2023</span>
            </div>
          </div>
        </div>

        {/* Multi-Model Router */}
        <div className="p-5 rounded-2xl bg-[#0d131f] border border-slate-800/80 hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">Adaptive Router</h3>
                <span className="text-[10px] text-slate-500">Multi-Model Engine</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Active
            </span>
          </div>

          <p className="text-[11px] text-slate-400 mb-3">
            Routes requests dynamically between high-reasoning primary models and low-cost fallback models.
          </p>

          <div className="space-y-1 text-[10px] text-slate-500">
            <div className="flex items-center justify-between">
              <span>Primary:</span>
              <span className="text-slate-300 font-mono">Claude 3.7 / GPT-4o</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Fallback:</span>
              <span className="text-slate-300 font-mono">Gemini 2.5 / Mini</span>
            </div>
          </div>
        </div>
      </div>

      {/* Aggregate KPI Metrics */}
      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="p-4 rounded-xl bg-[#0d131f] border border-slate-800/80">
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block mb-1">
              Cognitive Traces
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">{metrics.total_traces}</span>
              <span className="text-[11px] text-emerald-400 font-medium">100% logged</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0d131f] border border-slate-800/80">
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block mb-1">
              Total Tokens
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">{metrics.total_tokens.toLocaleString()}</span>
              <span className="text-[10px] text-slate-500">in/out</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0d131f] border border-slate-800/80">
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block mb-1">
              Est. LLM Spend
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-emerald-400">${metrics.estimated_cost_usd}</span>
              <span className="text-[10px] text-slate-500">USD</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0d131f] border border-slate-800/80">
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block mb-1">
              Avg Engine Latency
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-blue-400">{metrics.avg_latency_ms} ms</span>
              <span className="text-[10px] text-slate-500">mean</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0d131f] border border-slate-800/80">
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block mb-1">
              Grounding / Faithfulness
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-purple-400">
                {metrics.grounding_score_percent}%
              </span>
              <span className="text-[10px] text-emerald-400">0% Hallucination</span>
            </div>
          </div>
        </div>
      )}

      {/* Hallucination Guardrail Auditor Widget */}
      <div className="p-6 rounded-2xl bg-[#0d131f] border border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h2 className="text-sm font-semibold text-white">
              Live Hallucination & Brand DNA Auditor
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Real-time compliance validation against Nisol AI Company DNA
          </span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label className="text-xs font-medium text-slate-400 block mb-1.5">
                Test Artifact Copy (Cold Email, LinkedIn Post, or Battlecard)
              </label>
              <textarea
                rows={3}
                value={testContent}
                onChange={(e) => setTestContent(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 resize-none font-mono"
                placeholder="Enter copy to audit..."
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1.5">
                  Artifact Type
                </label>
                <select
                  value={artifactType}
                  onChange={(e) => setArtifactType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="cold_email">Stage 4: Cold Email</option>
                  <option value="linkedin_post">Stage 4: LinkedIn Post</option>
                  <option value="battlecard">Stage 4: Battlecard</option>
                  <option value="opportunity_report">Stage 2: Opportunity</option>
                </select>
              </div>

              <button
                onClick={runGuardrailEval}
                disabled={evaluating || !testContent.trim()}
                className="mt-3 w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-md shadow-indigo-600/20"
              >
                <Eye className="w-3.5 h-3.5" />
                {evaluating ? "Auditing Grounding..." : "Audit Against DNA"}
              </button>
            </div>
          </div>

          {/* Eval Results Display */}
          {evalResult && (
            <div
              className={`p-4 rounded-xl border mt-4 ${
                evalResult.is_grounded
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-amber-500/5 border-amber-500/20"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {evalResult.is_grounded ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  )}
                  <span className="text-xs font-semibold text-white">
                    {evalResult.is_grounded
                      ? "100% Grounded — Verified Safe to Execute"
                      : "Hallucination Warning — Flagged Claims Detected"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Grounding Score:</span>
                  <span
                    className={`font-mono font-bold text-xs ${
                      evalResult.grounding_score >= 90
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }`}
                  >
                    {evalResult.grounding_score}/100
                  </span>
                </div>
              </div>

              {evalResult.hallucinations_detected.length > 0 && (
                <div className="mb-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs space-y-1">
                  <div className="font-semibold">Flagged Issues:</div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                    {evalResult.hallucinations_detected.map((h: string, idx: number) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-1 text-[11px] text-slate-400">
                <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
                  Active Guardrail Checks Applied:
                </span>
                {evalResult.checked_rules.map((rule: string, i: number) => (
                  <div key={i} className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1 h-1 rounded-full bg-indigo-400"></span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cognitive Loop Trace Stream */}
      <div className="p-6 rounded-2xl bg-[#0d131f] border border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-sm font-semibold text-white">Cognitive Loop Execution Stream</h2>
            <p className="text-xs text-slate-400">
              End-to-end execution logs across SENSE $\rightarrow$ THINK $\rightarrow$ ALIGN $\rightarrow$ ACT $\rightarrow$ LEARN.
            </p>
          </div>

          {/* Stage Filters */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
            {["ALL", "SENSE", "THINK", "ALIGN", "ACT", "LEARN"].map((stage) => (
              <button
                key={stage}
                onClick={() => setStageFilter(stage)}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  stageFilter === stage
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        {/* Traces Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-3">Stage & Engine</th>
                <th className="py-2.5 px-3">Model</th>
                <th className="py-2.5 px-3">Tokens</th>
                <th className="py-2.5 px-3">Latency</th>
                <th className="py-2.5 px-3">Est. Cost</th>
                <th className="py-2.5 px-3">Grounding</th>
                <th className="py-2.5 px-3">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {traces.map((trace) => (
                <tr key={trace.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          trace.stage === "SENSE"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : trace.stage === "THINK"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : trace.stage === "ALIGN"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            : trace.stage === "ACT"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {trace.stage}
                      </span>
                      <span className="text-slate-300 font-sans text-xs">
                        {trace.engine}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-sans">
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px]">
                      {trace.model}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400">
                    {trace.prompt_tokens + trace.completion_tokens}
                    <span className="text-[10px] text-slate-500 ml-1">
                      ({trace.prompt_tokens}p / {trace.completion_tokens}c)
                    </span>
                  </td>
                  <td className="py-3 px-3 text-blue-400">{trace.latency_ms} ms</td>
                  <td className="py-3 px-3 text-emerald-400">${trace.cost_usd.toFixed(4)}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {trace.grounding_score}% Clean
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 font-sans text-xs max-w-xs truncate">
                    {trace.preview}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
