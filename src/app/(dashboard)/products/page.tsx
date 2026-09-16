"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Plus,
  Tag,
  DollarSign,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Layers,
  ArrowRight,
  Sparkles,
  Globe,
  Loader2,
  Check,
  CheckSquare,
  Square,
  TrendingUp,
  Cpu,
  ShieldCheck,
  ExternalLink,
  Filter,
  Edit2,
  Info,
} from "lucide-react";
import { apiFetch } from "@/lib/api-client";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterMode, setFilterMode] = useState<"all" | "live" | "whitespace">("all");

  // Auto-Discovery State
  const [discoveryUrl, setDiscoveryUrl] = useState("https://www.nisolai.com");
  const [discovering, setDiscovering] = useState(false);
  const [discoveryResult, setDiscoveryResult] = useState<any | null>(null);
  const [showDiscoveryModal, setShowDiscoveryModal] = useState(false);
  const [selectedVerified, setSelectedVerified] = useState<number[]>([]);
  const [selectedWhitespace, setSelectedWhitespace] = useState<number[]>([]);
  const [applyingProducts, setApplyingProducts] = useState(false);

  // Add / Edit Product Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Agentic AI");
  const [description, setDescription] = useState("");
  const [dealSize, setDealSize] = useState("1000000");
  const [pricingModel, setPricingModel] = useState("Project Milestone");
  const [specs, setSpecs] = useState("Sub-2s response, DPDP compliant");
  const [isWhitespace, setIsWhitespace] = useState(false);
  const [whitespaceRationale, setWhitespaceRationale] = useState("");
  const [savingProduct, setSavingProduct] = useState(false);
  const [promotingId, setPromotingId] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const [prodData, companyData] = await Promise.allSettled([
        apiFetch<any[]>("/products"),
        apiFetch<any>("/company"),
      ]);
      if (prodData.status === "fulfilled") {
        setProducts(prodData.value);
      }
      if (companyData.status === "fulfilled" && companyData.value?.website_url) {
        setDiscoveryUrl(companyData.value.website_url);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setCategory("Agentic AI");
    setDescription("");
    setDealSize("1000000");
    setPricingModel("Project Milestone");
    setSpecs("Sub-2s response, DPDP compliant");
    setIsWhitespace(false);
    setWhitespaceRationale("");
  };

  const openEditModal = (product: any) => {
    setEditingId(product.id);
    setName(product.name || "");
    setCategory(product.category || "Agentic AI");
    setDescription(product.description || "");
    setDealSize(String(product.typical_deal_size_inr || 1000000));
    setPricingModel(product.pricing_model || "Project Milestone");
    setSpecs((product.specs_and_benefits || []).join(", "));
    setIsWhitespace(!!product.is_whitespace);
    setWhitespaceRationale(product.whitespace_rationale || "");
    setShowAddModal(true);
  };

  // --- Auto-Discovery (URL-to-Product) Handlers ---
  const handleAutoDiscover = async () => {
    try {
      setDiscovering(true);
      setError(null);
      const res = await apiFetch<any>("/products/auto-discover", {
        method: "POST",
        body: JSON.stringify({
          website_url: discoveryUrl.trim() || "https://www.nisolai.com",
          focus_hint: "Packaged software products, reverse proxy appliances, agent engines, RoSense AI",
        }),
      });
      setDiscoveryResult(res);
      setSelectedVerified((res.verified_products || []).map((_: any, i: number) => i));
      setSelectedWhitespace((res.whitespace_products || []).map((_: any, i: number) => i));
      setShowDiscoveryModal(true);
    } catch (err: any) {
      setError(err.message || "Failed to auto-discover products from website.");
    } finally {
      setDiscovering(false);
    }
  };

  const handleApplyDiscovered = async () => {
    if (!discoveryResult) return;
    try {
      setApplyingProducts(true);
      setError(null);

      const toApply: any[] = [];
      (discoveryResult.verified_products || []).forEach((p: any, i: number) => {
        if (selectedVerified.includes(i)) {
          toApply.push({ ...p, is_whitespace: false, whitespace_rationale: null });
        }
      });
      (discoveryResult.whitespace_products || []).forEach((p: any, i: number) => {
        if (selectedWhitespace.includes(i)) {
          toApply.push({ ...p, is_whitespace: true });
        }
      });

      if (toApply.length === 0) {
        setError("Please select at least one product candidate to apply.");
        setApplyingProducts(false);
        return;
      }

      await apiFetch("/products/auto-discover/apply", {
        method: "POST",
        body: JSON.stringify({ products: toApply }),
      });

      setShowDiscoveryModal(false);
      setSuccessMsg(`Successfully imported ${toApply.length} product(s) into your catalog!`);
      setTimeout(() => setSuccessMsg(null), 4000);
      await loadProducts();
    } catch (err: any) {
      setError(err.message || "Failed to import discovered products.");
    } finally {
      setApplyingProducts(false);
    }
  };

  const handlePromoteWhitespace = async (product: any) => {
    try {
      setPromotingId(product.id);
      setError(null);
      await apiFetch(`/products/${product.id}`, {
        method: "PUT",
        body: JSON.stringify({
          is_whitespace: false,
          whitespace_rationale: null,
        }),
      });
      setSuccessMsg(`Promoted "${product.name}" to Active Product Catalog!`);
      setTimeout(() => setSuccessMsg(null), 3500);
      await loadProducts();
    } catch (err: any) {
      setError(err.message || "Failed to promote whitespace product.");
    } finally {
      setPromotingId(null);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingProduct(true);
      setError(null);

      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const payload = {
        name,
        slug,
        category,
        description,
        typical_deal_size_inr: parseInt(dealSize) || 1000000,
        pricing_model: pricingModel,
        specs_and_benefits: specs.split(",").map((s) => s.trim()).filter(Boolean),
        is_active: true,
        is_whitespace: isWhitespace,
        whitespace_rationale: isWhitespace ? whitespaceRationale : null,
      };

      if (editingId) {
        await apiFetch(`/products/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setSuccessMsg(`Product "${name}" updated successfully.`);
      } else {
        await apiFetch("/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setSuccessMsg(`Product "${name}" added to catalog.`);
      }

      setTimeout(() => setSuccessMsg(null), 3000);
      setShowAddModal(false);
      resetForm();
      await loadProducts();
    } catch (err: any) {
      setError(err.message || "Failed to save product.");
    } finally {
      setSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await apiFetch(`/products/${productId}`, { method: "DELETE" });
      await loadProducts();
    } catch (err: any) {
      setError(err.message || "Failed to delete product.");
    }
  };

  const filteredProducts = products.filter((p) => {
    if (filterMode === "live") return !p.is_whitespace;
    if (filterMode === "whitespace") return !!p.is_whitespace;
    return true;
  });

  const liveCount = products.filter((p) => !p.is_whitespace).length;
  const whitespaceCount = products.filter((p) => !!p.is_whitespace).length;

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
            <Package className="w-4 h-4" />
            <span>Layer 0 Core Catalog</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Software Product Catalog
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage packaged software platforms & appliances. Distinct from high-volume consulting services on the DNA hub.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/cross-sell"
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Cross-Sell Matrix</span>
          </Link>
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Auto-Discovery URL-to-Product Hero Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-blue-500/30 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden shadow-xl">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Autonomous Product Discovery Engine</span>
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-[10px] font-normal border border-blue-500/30">
                Live Scanner + Whitespace Ideator
              </span>
            </div>
            <h3 className="text-base font-semibold text-white">
              Scan Website Footprint & Discover Packaged Products
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Crawls your company domain to verify active software platforms, and synthesizes high-margin{" "}
              <strong className="text-purple-300 font-medium">Whitespace Product Concepts</strong> (turnkey software solutions missed or unvisualized by the company) with strategic packaging rationale.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
            <div className="relative w-full sm:w-72">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={discoveryUrl}
                onChange={(e) => setDiscoveryUrl(e.target.value)}
                placeholder="https://www.nisolai.com or /products/rosense-ai"
                className="w-full pl-9 pr-3 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
              />
            </div>
            <button
              onClick={handleAutoDiscover}
              disabled={discovering}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
            >
              {discovering ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning Footprint...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Scan & Uncover Products</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter Tabs & Catalog Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterMode("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterMode === "all"
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/40"
                : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200"
            }`}
          >
            All Products ({products.length})
          </button>
          <button
            onClick={() => setFilterMode("live")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterMode === "live"
                ? "bg-cyan-600/20 text-cyan-400 border border-cyan-500/40"
                : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200"
            }`}
          >
            Verified Live ({liveCount})
          </button>
          <button
            onClick={() => setFilterMode("whitespace")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filterMode === "whitespace"
                ? "bg-purple-600/20 text-purple-400 border border-purple-500/40"
                : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>AI Whitespace Concepts ({whitespaceCount})</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>
            Services vs Products: Consulting services live in{" "}
            <Link href="/company" className="text-blue-400 underline hover:text-blue-300">
              DNA Offerings
            </Link>
          </span>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProducts.map((product) => {
          const isWhite = !!product.is_whitespace;
          return (
            <div
              key={product.id}
              className={`border rounded-2xl p-6 flex flex-col justify-between transition-all space-y-4 relative overflow-hidden ${
                isWhite
                  ? "bg-[#141226]/80 border-purple-500/30 hover:border-purple-500/60 shadow-lg shadow-purple-950/20"
                  : "bg-[#121927] border-slate-800/80 hover:border-slate-700/80"
              }`}
            >
              <div>
                {/* Badges & Actions */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-medium">
                      {product.category}
                    </span>
                    {isWhite ? (
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                        <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                        <span>AI Whitespace Concept</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-medium border border-cyan-500/20">
                        <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />
                        <span>Verified Live Product</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(product)}
                      className="p-1.5 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mt-1.5">{product.name}</h3>

                <p className="text-xs text-slate-400 line-clamp-2 mt-1 mb-3">
                  {product.description || "No description provided."}
                </p>

                {/* Whitespace Strategic Rationale Callout */}
                {isWhite && product.whitespace_rationale && (
                  <div className="p-3 bg-purple-950/40 border border-purple-500/20 rounded-xl mb-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-300">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span>Opportunity & Strategic Packaging Rationale:</span>
                    </div>
                    <p className="text-[11px] text-purple-200/90 leading-relaxed italic">
                      "{product.whitespace_rationale}"
                    </p>
                  </div>
                )}

                {/* Specs / Core Capabilities */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                    Core Capabilities
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(product.specs_and_benefits || []).map((spec: string, i: number) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#0b0f17] border border-slate-800 text-slate-300"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Pricing & Action */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      Avg:{" "}
                      <strong className="text-emerald-400 font-mono">
                        ₹{((product.typical_deal_size_inr || 1000000) / 100000).toFixed(1)}L
                      </strong>
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {product.pricing_model || "Milestone"}
                  </span>
                </div>

                {isWhite && (
                  <button
                    onClick={() => handlePromoteWhitespace(product)}
                    disabled={promotingId === product.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-purple-600/20 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    {promotingId === product.id ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Promoting...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Promote to Active Product</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Discovery Staging Review Modal */}
      {showDiscoveryModal && discoveryResult && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1422] border border-blue-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Product Footprint & Whitespace Staging
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Select verified live products and whitespace software opportunities to import into your catalog.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDiscoveryModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Section 1: Verified Live Products */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Verified Live Products ({discoveryResult.verified_products?.length || 0})
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Detected directly from website portfolio
                  </span>
                </div>

                <div className="space-y-2">
                  {(discoveryResult.verified_products || []).map((prod: any, idx: number) => {
                    const isSelected = selectedVerified.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedVerified((prev) =>
                            isSelected ? prev.filter((i) => i !== idx) : [...prev, idx]
                          );
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? "bg-cyan-950/20 border-cyan-500/40"
                            : "bg-slate-900/40 border-slate-800 opacity-60"
                        }`}
                      >
                        <div className="pt-0.5">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{prod.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
                              {prod.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">{prod.description}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {(prod.specs_and_benefits || []).map((spec: string, sIdx: number) => (
                              <span
                                key={sIdx}
                                className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Whitespace Product Concepts */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">
                      ✨ High-Leverage Whitespace Product Concepts ({discoveryResult.whitespace_products?.length || 0})
                    </h4>
                  </div>
                  <span className="text-[11px] text-purple-300">
                    High-margin software products missed by current website
                  </span>
                </div>

                <div className="space-y-3">
                  {(discoveryResult.whitespace_products || []).map((prod: any, idx: number) => {
                    const isSelected = selectedWhitespace.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedWhitespace((prev) =>
                            isSelected ? prev.filter((i) => i !== idx) : [...prev, idx]
                          );
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? "bg-purple-950/30 border-purple-500/50 shadow-md shadow-purple-950/30"
                            : "bg-slate-900/40 border-slate-800 opacity-60"
                        }`}
                      >
                        <div className="pt-0.5">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-purple-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{prod.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                              {prod.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300">{prod.description}</p>

                          {/* Whitespace Rationale Callout */}
                          <div className="p-2.5 bg-[#0b0c16] border border-purple-500/30 rounded-lg">
                            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-purple-300 mb-0.5">
                              <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                              <span>Strategic Whitespace Rationale:</span>
                            </div>
                            <p className="text-[11px] text-purple-200/90 leading-relaxed italic">
                              "{prod.whitespace_rationale}"
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                            <span>
                              Typical Deal:{" "}
                              <strong className="text-emerald-400 font-mono">
                                ₹{((prod.typical_deal_size_inr || 1000000) / 100000).toFixed(1)}L
                              </strong>
                            </span>
                            <span className="text-slate-400">{prod.pricing_model}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                <span className="text-white font-semibold">{selectedVerified.length}</span> live &{" "}
                <span className="text-purple-300 font-semibold">{selectedWhitespace.length}</span> whitespace concept(s) selected
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowDiscoveryModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyDiscovered}
                  disabled={applyingProducts || (selectedVerified.length === 0 && selectedWhitespace.length === 0)}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  {applyingProducts ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Importing Products...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Add to Product Catalog</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121927] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">
              {editingId ? "Edit Product Details" : "Add New Product to Catalog"}
            </h3>
            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. ConductOS Conductor Core"
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What does this product do?"
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Typical Deal (₹)</label>
                  <input
                    type="number"
                    value={dealSize}
                    onChange={(e) => setDealSize(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Pricing Model</label>
                  <input
                    type="text"
                    value={pricingModel}
                    onChange={(e) => setPricingModel(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Specs & Benefits (comma-separated)</label>
                <input
                  type="text"
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              {/* Whitespace Toggle & Rationale */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isWhitespace}
                    onChange={(e) => setIsWhitespace(e.target.checked)}
                    className="w-4 h-4 rounded text-purple-600 bg-slate-900 border-slate-700 focus:ring-purple-500"
                  />
                  <span className="text-xs font-medium text-purple-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    Mark as AI Whitespace / Concept Product
                  </span>
                </label>

                {isWhitespace && (
                  <div>
                    <label className="block text-[11px] text-purple-300 mb-1">
                      Strategic Whitespace Rationale
                    </label>
                    <textarea
                      rows={2}
                      value={whitespaceRationale}
                      onChange={(e) => setWhitespaceRationale(e.target.value)}
                      placeholder="Why should the company build or package this software solution?"
                      className="w-full px-3.5 py-2 bg-[#090d16] border border-purple-500/40 rounded-xl text-white text-xs"
                    />
                  </div>
                )}
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
                  disabled={savingProduct}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-xs cursor-pointer disabled:opacity-50"
                >
                  {savingProduct ? "Saving..." : editingId ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

