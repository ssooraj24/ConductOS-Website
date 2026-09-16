"use client";

import { useEffect, useState } from "react";
import {
  Swords,
  Search,
  Plus,
  Globe,
  Trash2,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Building2,
  Target,
  RefreshCw,
  Compass,
  Filter,
  X,
} from "lucide-react";
import { apiFetch } from "@/lib/api-client";

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tierFilter, setTierFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Discovery bot state
  const [discovering, setDiscovering] = useState(false);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [showDiscoveryModal, setShowDiscoveryModal] = useState(false);
  const [addedCandidateDomains, setAddedCandidateDomains] = useState<string[]>([]);

  // Manual Add Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualDomain, setManualDomain] = useState("");
  const [manualSummary, setManualSummary] = useState("");
  const [manualPricing, setManualPricing] = useState("");
  const [manualTier, setManualTier] = useState("Direct Regional");
  const [manualRegion, setManualRegion] = useState("India / South Asia");
  const [manualStrengths, setManualStrengths] = useState("");
  const [manualWeaknesses, setManualWeaknesses] = useState("");
  const [manualOpportunities, setManualOpportunities] = useState("");
  const [manualThreats, setManualThreats] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [comps, compProfile] = await Promise.all([
        apiFetch<any[]>("/competitors"),
        apiFetch<any>("/company"),
      ]);
      setCompetitors(comps);
      setCompany(compProfile);
    } catch (err: any) {
      setError(err.message || "Failed to load competitors.");
    } finally {
      setLoading(false);
    }
  };

  const handleRunDiscoveryBot = async () => {
    try {
      setDiscovering(true);
      setError(null);
      setShowDiscoveryModal(true);

      const res = await apiFetch<any[]>("/competitors/discover", {
        method: "POST",
        body: JSON.stringify({
          company_id: company?.id,
          query_hint: "Enterprise AI Agents, Custom LLM Pipelines, RAG Consulting",
          limit: 10,
        }),
      });

      setCandidates(res);
    } catch (err: any) {
      setError(err.message || "Competitor discovery bot failed.");
    } finally {
      setDiscovering(false);
    }
  };

  const handleAddCandidate = async (candidate: any) => {
    try {
      const strengthsArr =
        candidate.swot?.strengths?.length > 0
          ? candidate.swot.strengths
          : [candidate.estimated_positioning];
      const weaknessesArr =
        candidate.swot?.weaknesses?.length > 0
          ? candidate.swot.weaknesses
          : ["May lack Indian DPDP compliance", "High enterprise price"];

      const payload = {
        name: candidate.name,
        domain: candidate.domain,
        website_url: candidate.website_url,
        summary: candidate.summary,
        claimed_strengths: strengthsArr,
        claimed_weaknesses: weaknessesArr,
        competitor_tier: candidate.competitor_tier || "Direct Regional",
        region: candidate.region || "India / Global",
        swot: candidate.swot || {
          strengths: strengthsArr,
          weaknesses: weaknessesArr,
          opportunities: candidate.swot?.opportunities || [],
          threats: candidate.swot?.threats || [],
        },
        source: "ai_bot",
        is_direct: candidate.competitor_tier !== "Legacy Consultancy",
      };

      await apiFetch("/competitors", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setAddedCandidateDomains((prev) => [...prev, candidate.domain]);
      await loadData();
    } catch (err: any) {
      setError(err.message || "Failed to add competitor.");
    }
  };

  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreating(true);
      const strengthsArr = manualStrengths
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const weaknessesArr = manualWeaknesses
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const oppsArr = manualOpportunities
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const threatsArr = manualThreats
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        name: manualName.trim(),
        domain: manualDomain.trim(),
        website_url: manualDomain.startsWith("http")
          ? manualDomain.trim()
          : `https://${manualDomain.trim()}`,
        summary: manualSummary.trim(),
        pricing_model: manualPricing.trim() || "Custom Enterprise",
        competitor_tier: manualTier,
        region: manualRegion,
        claimed_strengths: strengthsArr,
        claimed_weaknesses: weaknessesArr,
        swot: {
          strengths: strengthsArr,
          weaknesses: weaknessesArr,
          opportunities: oppsArr,
          threats: threatsArr,
        },
        source: "manual",
        is_direct: manualTier !== "Legacy Consultancy",
      };

      await apiFetch("/competitors", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setShowAddModal(false);
      setManualName("");
      setManualDomain("");
      setManualSummary("");
      setManualPricing("");
      setManualStrengths("");
      setManualWeaknesses("");
      setManualOpportunities("");
      setManualThreats("");
      await loadData();
    } catch (err: any) {
      setError(err.message || "Failed to save competitor.");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteCompetitor = async (compId: string) => {
    if (!confirm("Are you sure you want to delete this competitor?")) return;
    try {
      await apiFetch(`/competitors/${compId}`, { method: "DELETE" });
      await loadData();
    } catch (err: any) {
      setError(err.message || "Failed to delete competitor.");
    }
  };

  // Filter competitors by tier and search query
  const filteredCompetitors = competitors.filter((comp) => {
    const tierMatch =
      tierFilter === "All" || (comp.competitor_tier || "Direct Regional") === tierFilter;
    const queryMatch =
      !searchQuery ||
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (comp.domain && comp.domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (comp.summary && comp.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (comp.region && comp.region.toLowerCase().includes(searchQuery.toLowerCase()));
    return tierMatch && queryMatch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Swords className="w-4 h-4" />
            <span>Layer 0 Foundation</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Competitor Intelligence Hub & Radar
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Palantir-grade competitive matrix tracking 7–10 market rivals with 4-Quadrant SWOT
            analyses (Strengths, Weaknesses, Opportunities, Threats).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Manually</span>
          </button>
          <button
            onClick={handleRunDiscoveryBot}
            disabled={discovering}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${discovering ? "animate-spin" : ""}`} />
            <span>{discovering ? "Scanning Web & Radar..." : "Refresh Competitor Radar"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#121927] border border-slate-800/80 p-3 rounded-2xl">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {["All", "Direct Regional", "Direct Global", "Legacy Consultancy"].map((tier) => {
            const count =
              tier === "All"
                ? competitors.length
                : competitors.filter(
                    (c) => (c.competitor_tier || "Direct Regional") === tier
                  ).length;
            const isSelected = tierFilter === tier;
            return (
              <button
                key={tier}
                onClick={() => setTierFilter(tier)}
                className={`px-3 py-1.5 text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-600/20"
                    : "bg-[#090d16] text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                <span>{tier}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search competitor, region, domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Competitor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCompetitors.map((comp) => {
          const swotObj = comp.swot || {};
          const strengths =
            swotObj.strengths && swotObj.strengths.length > 0
              ? swotObj.strengths
              : comp.claimed_strengths || [];
          const weaknesses =
            swotObj.weaknesses && swotObj.weaknesses.length > 0
              ? swotObj.weaknesses
              : comp.claimed_weaknesses || [];
          const opportunities = swotObj.opportunities || [
            "Position ConductOS as lightweight, deterministic, and zero-bloat",
            "Pitch founder-led engineering vs generic off-the-shelf wrappers",
          ];
          const threats = swotObj.threats || [
            "Enterprise procurement MSAs in large accounts",
          ];

          const tierColor =
            comp.competitor_tier === "Direct Regional"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : comp.competitor_tier === "Direct Global"
              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
              : "bg-purple-500/10 text-purple-400 border-purple-500/20";

          return (
            <div
              key={comp.id}
              className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4 shadow-sm"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-white">{comp.name}</h3>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border ${tierColor}`}
                      >
                        {comp.competitor_tier || "Direct Regional"}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-mono">
                        {comp.region || "India / Global"}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                          comp.source === "ai_bot"
                            ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {comp.source === "ai_bot" ? "AI Discovered" : "Manual"}
                      </span>
                    </div>

                    {comp.domain && (
                      <a
                        href={comp.website_url || `https://${comp.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-400 hover:underline mt-1"
                      >
                        <Globe className="w-3 h-3" />
                        <span>{comp.domain}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteCompetitor(comp.id)}
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Delete Competitor"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-400 mb-4">{comp.summary || "No summary provided."}</p>

                {/* 4-Quadrant SWOT Matrix */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Target className="w-3 h-3 text-indigo-400" />
                      <span>Palantir-Grade 4-Quadrant SWOT Matrix</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    {/* Strengths (S) */}
                    <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                      <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>Strengths (Where they lead)</span>
                      </div>
                      <ul className="space-y-1 text-slate-300 text-[10.5px]">
                        {strengths.slice(0, 3).map((s: string, i: number) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Weaknesses (W) */}
                    <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1">
                      <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                        <span>Weaknesses (Attack Angles)</span>
                      </div>
                      <ul className="space-y-1 text-slate-300 text-[10.5px]">
                        {weaknesses.slice(0, 3).map((w: string, i: number) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-rose-500 font-bold">•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Opportunities (O) */}
                    <div className="p-2.5 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-1">
                      <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        <span>Opportunities (Displacement)</span>
                      </div>
                      <ul className="space-y-1 text-slate-300 text-[10.5px]">
                        {opportunities.slice(0, 3).map((o: string, i: number) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Threats (T) */}
                    <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1">
                      <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span>Threats (Procurement / RFP)</span>
                      </div>
                      <ul className="space-y-1 text-slate-300 text-[10.5px]">
                        {threats.slice(0, 3).map((t: string, i: number) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>
                  Pricing: <strong className="text-slate-200">{comp.pricing_model || "Custom Enterprise"}</strong>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {comp.is_direct ? "Direct Competitor" : "Indirect / Ecosystem"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Discovery Bot Radar Modal */}
      {showDiscoveryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121927] border border-slate-800 rounded-2xl max-w-3xl w-full p-6 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">
                  Autonomous Competitor Radar (Web Discovery)
                </h3>
              </div>
              <button
                onClick={() => setShowDiscoveryModal(false)}
                className="text-slate-400 hover:text-white text-xs p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              The AI bot scanned regional and global AI providers for Enterprise AI Agents, Custom RAG,
              and Autonomous Systems, generating deep 4-Quadrant SWOT breakdowns for each:
            </p>

            <div className="overflow-y-auto space-y-3 flex-1 pr-1">
              {candidates.map((c) => {
                const isAlreadyAdded =
                  addedCandidateDomains.includes(c.domain) ||
                  competitors.some((comp) => comp.domain === c.domain);

                return (
                  <div
                    key={c.domain}
                    className="p-4 bg-[#090d16] border border-slate-800 rounded-xl space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-white">{c.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-medium">
                            {c.competitor_tier || "Direct Regional"}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                            {c.region || "India / Global"}
                          </span>
                        </div>
                        <a
                          href={c.website_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-blue-400 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <span>{c.domain}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>

                      <div className="flex-shrink-0">
                        {isAlreadyAdded ? (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 font-medium">
                            <CheckCircle2 className="w-3 h-3" />
                            Monitored on Radar
                          </span>
                        ) : (
                          <button
                            onClick={() => handleAddCandidate(c)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Radar</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-400">{c.summary}</p>

                    {c.match_reason && (
                      <div className="text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-400">Match Reason:</span>{" "}
                        {c.match_reason}
                      </div>
                    )}

                    {/* Candidate SWOT preview */}
                    {c.swot && (
                      <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-slate-800/80">
                        <div className="text-emerald-400/90">
                          <strong className="text-emerald-400 block mb-0.5">Strengths:</strong>
                          {(c.swot.strengths || []).slice(0, 2).join(" • ")}
                        </div>
                        <div className="text-rose-400/90">
                          <strong className="text-rose-400 block mb-0.5">Weaknesses:</strong>
                          {(c.swot.weaknesses || []).slice(0, 2).join(" • ")}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121927] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Add Competitor to Radar</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleManualAdd} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    placeholder="e.g. AI Systems Corp"
                    className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Website Domain</label>
                  <input
                    type="text"
                    required
                    value={manualDomain}
                    onChange={(e) => setManualDomain(e.target.value)}
                    placeholder="e.g. aisystems.com"
                    className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Competitor Tier</label>
                  <select
                    value={manualTier}
                    onChange={(e) => setManualTier(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                  >
                    <option value="Direct Regional">Direct Regional</option>
                    <option value="Direct Global">Direct Global</option>
                    <option value="Legacy Consultancy">Legacy Consultancy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Operating Region</label>
                  <input
                    type="text"
                    value={manualRegion}
                    onChange={(e) => setManualRegion(e.target.value)}
                    placeholder="e.g. India / South Asia"
                    className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Summary / What They Do</label>
                <textarea
                  rows={2}
                  value={manualSummary}
                  onChange={(e) => setManualSummary(e.target.value)}
                  placeholder="Brief description of their offerings..."
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Pricing Model</label>
                <input
                  type="text"
                  value={manualPricing}
                  onChange={(e) => setManualPricing(e.target.value)}
                  placeholder="e.g. $10,000/mo retainer or Time & Materials"
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-800">
                <div>
                  <label className="block text-xs text-emerald-400 font-semibold mb-1">
                    Strengths (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={manualStrengths}
                    onChange={(e) => setManualStrengths(e.target.value)}
                    placeholder="Big brand, low price..."
                    className="w-full px-3 py-1.5 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-rose-400 font-semibold mb-1">
                    Weaknesses (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={manualWeaknesses}
                    onChange={(e) => setManualWeaknesses(e.target.value)}
                    placeholder="Slow delivery, hallucination..."
                    className="w-full px-3 py-1.5 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-blue-400 font-semibold mb-1">
                    Opportunities (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={manualOpportunities}
                    onChange={(e) => setManualOpportunities(e.target.value)}
                    placeholder="Pitch Pydantic guardrails..."
                    className="w-full px-3 py-1.5 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-amber-400 font-semibold mb-1">
                    Threats / RFP Risks (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={manualThreats}
                    onChange={(e) => setManualThreats(e.target.value)}
                    placeholder="Pre-existing procurement MSAs..."
                    className="w-full px-3 py-1.5 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-xs cursor-pointer"
                >
                  {creating ? "Saving..." : "Save to Radar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

