"use client";

import { useEffect, useState } from "react";
import {
  Brain,
  Upload,
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Trash2,
  ShieldCheck,
  Layers,
  ArrowRight,
  Database,
  MessageSquare,
} from "lucide-react";
import { apiFetch } from "@/lib/api-client";

export default function SensePage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("vault");

  // Raw note state
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteOrigin, setNoteOrigin] = useState("CallNote");
  const [uploadingNote, setUploadingNote] = useState(false);

  // File upload state
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Search state
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Dossier state (Gate 1)
  const [dossier, setDossier] = useState<any>(null);
  const [extractingDossier, setExtractingDossier] = useState(false);
  const [gateApproved, setGateApproved] = useState(false);

  useEffect(() => {
    loadBrainData();
  }, []);

  const loadBrainData = async () => {
    try {
      setLoading(true);
      const [docsData, dossierData] = await Promise.all([
        apiFetch<any[]>("/brain/documents"),
        apiFetch<any>("/brain/dossier").catch(() => null),
      ]);
      setDocuments(docsData);
      if (dossierData) {
        setDossier(dossierData);
        setGateApproved(true);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load brain knowledge.");
    } finally {
      setLoading(false);
    }
  };

  const handleNoteUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUploadingNote(true);
      setError(null);

      await apiFetch("/brain/upload-note", {
        method: "POST",
        body: JSON.stringify({
          title: noteTitle,
          content: noteContent,
          origin: noteOrigin,
        }),
      });

      setNoteTitle("");
      setNoteContent("");
      setUploadSuccess("Raw note normalized and stored in pgvector!");
      setTimeout(() => setUploadSuccess(null), 3000);
      await loadBrainData();
    } catch (err: any) {
      setError(err.message || "Failed to upload note.");
    } finally {
      setUploadingNote(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingFile(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:4200/api/brain/upload-file", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload document file.");
      }

      setUploadSuccess(`Indexed "${file.name}" into Neon pgvector!`);
      setTimeout(() => setUploadSuccess(null), 3000);
      await loadBrainData();
    } catch (err: any) {
      setError(err.message || "Document upload failed.");
    } finally {
      setUploadingFile(false);
    }
  };

  const handleDeleteDoc = async (docId: string) => {
    if (!confirm("Are you sure you want to delete this document from memory?")) return;
    try {
      await apiFetch(`/brain/documents/${docId}`, { method: "DELETE" });
      await loadBrainData();
    } catch (err: any) {
      setError(err.message || "Failed to delete document.");
    }
  };

  const handleSearchBrain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setSearching(true);
      setError(null);
      const results = await apiFetch<any[]>("/brain/query", {
        method: "POST",
        body: JSON.stringify({ query, limit: 4 }),
      });
      setSearchResults(results);
    } catch (err: any) {
      setError(err.message || "Search failed.");
    } finally {
      setSearching(false);
    }
  };

  const handleExtractDossier = async () => {
    try {
      setExtractingDossier(true);
      setError(null);
      const result = await apiFetch<any>("/brain/extract-dossier", { method: "POST" });
      setDossier(result);
    } catch (err: any) {
      setError(err.message || "Failed to extract intelligence dossier.");
    } finally {
      setExtractingDossier(false);
    }
  };

  const handleApproveGate1 = async () => {
    if (!dossier) return;
    try {
      await apiFetch("/brain/approve-dossier", {
        method: "POST",
        body: JSON.stringify(dossier),
      });
      setGateApproved(true);
    } catch (err: any) {
      setError(err.message || "Failed to approve Gate 1.");
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
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Brain className="w-4 h-4" />
            <span>Executive Stage 1: SENSE</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Company Brain & Memory Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            <em>Executive Question:</em> <strong>"What is happening?"</strong> — Ingests raw chatter, sanitizes into golden records, and retains knowledge in Neon pgvector.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span>
              Memory: <strong className="text-white">{documents.length}</strong> Docs Indexed
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {uploadSuccess && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-px">
        {[
          { id: "vault", label: "Knowledge Vault (Indexed)", icon: Database },
          { id: "upload", label: "Ingest Notes & PDFs", icon: Upload },
          { id: "query", label: "Ask the Brain (RAG)", icon: Search },
          { id: "gate1", label: "Gate 1: Intelligence Dossier", icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-indigo-500 text-indigo-400 bg-indigo-500/5"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.id === "gate1" && gateApproved && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Knowledge Vault */}
      {activeTab === "vault" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Ingested Institutional Documents & Field Notes</h3>
            <button
              onClick={() => setActiveTab("upload")}
              className="text-xs text-blue-400 hover:underline flex items-center gap-1"
            >
              <Upload className="w-3 h-3" />
              <span>Upload New Knowledge</span>
            </button>
          </div>

          {documents.length === 0 ? (
            <div className="p-12 text-center bg-[#121927] border border-slate-800 rounded-2xl text-slate-400 text-xs">
              <Brain className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <span>No knowledge ingested yet. Upload PDFs or paste sales notes to give the brain memory.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-[#121927] border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                        {doc.file_type === "pdf" ? <FileText className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white truncate max-w-[200px]">{doc.title}</h4>
                        <span className="text-[10px] text-slate-500 uppercase font-mono">{doc.file_type} • {doc.chunks_count} Chunks</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteDoc(doc.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
                      Indexed in pgvector
                    </span>
                    <span className="text-slate-500 font-mono">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Ingest Notes & PDFs */}
      {activeTab === "upload" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File Upload */}
          <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-400" />
              <span>Upload Document (PDF / TXT)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Brochures, technical datasheets, case studies, or whitepapers. Chunks into 512-token vectors in Neon pgvector.
            </p>

            <div className="border-2 border-dashed border-slate-700/80 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                id="docUpload"
                accept=".pdf,.txt,.md"
                onChange={handleFileUpload}
                disabled={uploadingFile}
                className="hidden"
              />
              <label htmlFor="docUpload" className="cursor-pointer space-y-2 block">
                <FileText className="w-8 h-8 text-slate-500 mx-auto" />
                <span className="text-xs font-semibold text-blue-400 block">
                  {uploadingFile ? "Sanitizing & Vectorizing..." : "Click to select file (PDF / TXT)"}
                </span>
                <span className="text-[10px] text-slate-500 block">Supports PDF, Markdown, and text up to 10MB</span>
              </label>
            </div>
          </div>

          {/* Paste Raw Note */}
          <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Paste Raw Customer Call / WhatsApp Note</span>
            </h3>
            <form onSubmit={handleNoteUpload} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Note Title / Source</label>
                <input
                  type="text"
                  required
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="e.g. Call with FinTech CTO on Agent Latency"
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Raw Content / Transcript</label>
                <textarea
                  rows={4}
                  required
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Paste verbatim notes, customer objections, or pricing discussions here..."
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={uploadingNote}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
              >
                {uploadingNote ? "Sanitizing via Engine 0..." : "Normalize & Save to Brain"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 3: Ask the Brain (Semantic Query) */}
      {activeTab === "query" && (
        <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Ask the Brain (Semantic Vector Search)</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Query institutional knowledge. Tests cosine similarity against vectorized chunks in Neon pgvector.
            </p>
          </div>

          <form onSubmit={handleSearchBrain} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. What objections did prospects raise regarding LLM hallucinations?"
                className="w-full pl-10 pr-4 py-2.5 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={searching}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer flex-shrink-0"
            >
              {searching ? "Searching..." : "Query Brain"}
            </button>
          </form>

          {/* Results */}
          <div className="space-y-3">
            {searchResults.map((res, i) => (
              <div key={i} className="p-4 bg-[#090d16] border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-blue-400">{res.document_title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                    Match: {(res.similarity_score * 100).toFixed(1)}%
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">{res.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Gate 1 — Intelligence Dossier */}
      {activeTab === "gate1" && (
        <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Gate 1: Intelligence Dossier Review</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Human-in-the-Loop checkpoint: Review and approve extracted customer pains and objections before Stage 2 (THINK) consumes them.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExtractDossier}
                disabled={extractingDossier}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 transition-colors"
              >
                {extractingDossier ? "Synthesizing..." : "Extract New Dossier"}
              </button>
              {dossier && (
                <button
                  onClick={handleApproveGate1}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    gateApproved
                      ? "bg-emerald-600 text-white"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{gateApproved ? "Gate 1 Approved ✓" : "Approve Dossier (Pass Gate 1)"}</span>
                </button>
              )}
            </div>
          </div>

          {!dossier ? (
            <div className="text-center py-8 text-slate-400 text-xs space-y-2">
              <Sparkles className="w-6 h-6 text-indigo-400 mx-auto" />
              <p>Click "Extract New Dossier" to run Engine 1 across all ingested knowledge.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pains */}
              <div className="p-4 bg-[#090d16] border border-slate-800 rounded-xl space-y-2">
                <span className="text-[10px] font-semibold text-rose-400 uppercase tracking-wider">
                  Top Customer Pains
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {dossier.top_customer_pains.map((p: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Objections */}
              <div className="p-4 bg-[#090d16] border border-slate-800 rounded-xl space-y-2">
                <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                  Top Customer Objections
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {dossier.top_objections.map((o: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>"{o}"</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buying Criteria */}
              <div className="p-4 bg-[#090d16] border border-slate-800 rounded-xl space-y-2">
                <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                  Key Buying Criteria
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {dossier.key_buying_criteria.map((c: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Citations */}
              <div className="p-4 bg-[#090d16] border border-slate-800 rounded-xl space-y-2">
                <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
                  Evidence Citations
                </span>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {dossier.evidence_citations.map((c: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">#</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
