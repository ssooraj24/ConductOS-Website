"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Globe,
  Share2,
  Save,
  CheckCircle2,
  AlertCircle,
  Users,
  Target,
  FileText,
  DollarSign,
  ShieldAlert,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Compass,
  TrendingUp,
  Zap,
  ShieldCheck,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Sparkles,
  RefreshCw,
  Layers,
  HelpCircle,
  Award,
  Check,
} from "lucide-react";
import { apiFetch } from "@/lib/api-client";

// Clean Brand SVG Icons for Official Social Channels
function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.596 0 9 1.582 9 4.615V8z"/>
    </svg>
  );
}

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function CompanyPage() {
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("profile");

  // Auto-Discovery (URL-to-DNA) state
  const [discoveryUrl, setDiscoveryUrl] = useState("");
  const [discoveringDNA, setDiscoveringDNA] = useState(false);
  const [discoveryResult, setDiscoveryResult] = useState<any>(null);
  const [showDiscoveryModal, setShowDiscoveryModal] = useState(false);
  const [selectedWhitespaceIndices, setSelectedWhitespaceIndices] = useState<number[]>([0, 1, 2]);
  const [applyingDNA, setApplyingDNA] = useState(false);
  const [discoverySuccessMsg, setDiscoverySuccessMsg] = useState<string | null>(null);

  // Objection state
  const [objectionCategoryFilter, setObjectionCategoryFilter] = useState("All");
  const [objectionSearch, setObjectionSearch] = useState("");
  const [expandedObjectionIdx, setExpandedObjectionIdx] = useState<number | null>(null);

  // Modals state for CRUD
  const [offeringModalOpen, setOfferingModalOpen] = useState(false);
  const [editingOfferingIdx, setEditingOfferingIdx] = useState<number | null>(null);
  const [offeringForm, setOfferingForm] = useState({
    name: "",
    category: "Agentic AI",
    description: "",
    deliverables: "",
    pricing_model: "Fixed Milestone",
    typical_deal_size_inr: 1000000,
    is_whitespace: false,
    whitespace_rationale: "",
  });

  const [objectionModalOpen, setObjectionModalOpen] = useState(false);
  const [editingObjectionIdx, setEditingObjectionIdx] = useState<number | null>(null);
  const [objectionForm, setObjectionForm] = useState({
    category: "Business",
    severity: "High",
    objection: "",
    counter_argument: "",
    detailed_answer: "",
    proof_points: "",
    proof_asset: "",
    buyer_role: "CIO, CTO",
  });

  const [triggerModalOpen, setTriggerModalOpen] = useState(false);
  const [editingTriggerIdx, setEditingTriggerIdx] = useState<number | null>(null);
  const [triggerForm, setTriggerForm] = useState({
    event_name: "",
    category: "Strategic Mandate",
    description: "",
    sense_hook: "",
  });

  const [personaModalOpen, setPersonaModalOpen] = useState(false);
  const [editingPersonaIdx, setEditingPersonaIdx] = useState<number | null>(null);
  const [personaForm, setPersonaForm] = useState({
    role_type: "Technical Buyer",
    title: "",
    daily_headaches: "",
    buying_criteria: "",
  });

  const [assetModalOpen, setAssetModalOpen] = useState(false);
  const [editingAssetIdx, setEditingAssetIdx] = useState<number | null>(null);
  const [assetForm, setAssetForm] = useState({
    title: "",
    asset_type: "Case Study",
    description: "",
    url: "",
  });

  // --- Industry-Agnostic Commercial Ontology State ---
  const [selectedPersonaIdx, setSelectedPersonaIdx] = useState(0);
  const [stakeholderModalOpen, setStakeholderModalOpen] = useState(false);
  const [editingStakeholderIdx, setEditingStakeholderIdx] = useState<number | null>(null);
  const [stakeholderForm, setStakeholderForm] = useState({
    role_name: "",
    role_type: "Executive Leadership",
    primary_concern: "",
    success_metric: "",
    top_objectives: "",
    top_fears: "",
    top_questions: "",
    top_objections: "",
    preferred_messaging: "",
    proof_required: "",
    decision_criteria: "",
  });

  // Buying Signals State
  const [signalModalOpen, setSignalModalOpen] = useState(false);
  const [editingSignalIdx, setEditingSignalIdx] = useState<number | null>(null);
  const [signalForm, setSignalForm] = useState({
    signal: "",
    category: "Corporate Mandate",
    description: "",
    sense_detection_hook: "",
  });

  // Core Pain Points State
  const [painModalOpen, setPainModalOpen] = useState(false);
  const [editingPainIdx, setEditingPainIdx] = useState<number | null>(null);
  const [painForm, setPainForm] = useState({
    pain_point: "",
    business_impact: "",
    targeted_personas: "",
  });

  // Business Outcomes State
  const [outcomeModalOpen, setOutcomeModalOpen] = useState(false);
  const [editingOutcomeIdx, setEditingOutcomeIdx] = useState<number | null>(null);
  const [outcomeForm, setOutcomeForm] = useState({
    outcome: "",
    impact_metric: "",
    buyer_appeal: "",
  });

  // Blueprint Switcher State
  const [switchingBlueprint, setSwitchingBlueprint] = useState(false);

  // Tag inputs helper
  const [newDisqualifier, setNewDisqualifier] = useState("");
  const [newNonPriority, setNewNonPriority] = useState("");
  const [newAlternative, setNewAlternative] = useState("");
  const [newDifferentiator, setNewDifferentiator] = useState("");
  const [newWhyWin, setNewWhyWin] = useState("");
  const [newWhyLose, setNewWhyLose] = useState("");

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      const data = await apiFetch<any>("/company");
      setCompany(data);
      if (data?.website_url) {
        setDiscoveryUrl(data.website_url);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load company profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveSuccess(false);
      setError(null);

      const updatePayload = {
        name: company.name,
        tagline: company.tagline,
        description: company.description,
        website_url: company.website_url,
        social_accounts: company.social_accounts,
        dna: company.dna,
      };

      const updated = await apiFetch<any>("/company", {
        method: "PUT",
        body: JSON.stringify(updatePayload),
      });

      setCompany(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save company profile.");
    } finally {
      setSaving(false);
    }
  };

  // --- Auto-Discovery (URL-to-DNA) Handlers ---
  const handleAutoDiscover = async () => {
    const targetUrl = discoveryUrl.trim() || company?.website_url || "https://www.nisolai.com";
    try {
      setDiscoveringDNA(true);
      setError(null);
      const res = await apiFetch<any>("/company/auto-discover", {
        method: "POST",
        body: JSON.stringify({
          website_url: targetUrl,
          focus_hint: "Production AI Agents & Cognitive Operating Systems",
        }),
      });
      setDiscoveryResult(res);
      if (res.whitespace_opportunities) {
        setSelectedWhitespaceIndices(res.whitespace_opportunities.map((_: any, i: number) => i));
      }
      setShowDiscoveryModal(true);
    } catch (err: any) {
      setError(err.message || "Failed to auto-discover DNA from website.");
    } finally {
      setDiscoveringDNA(false);
    }
  };

  const handleApplyDiscoveredDNA = async () => {
    if (!discoveryResult) return;
    try {
      setApplyingDNA(true);
      setError(null);

      // Filter whitespace offerings based on selection
      const activeWhitespace = (discoveryResult.whitespace_opportunities || []).filter(
        (_: any, i: number) => selectedWhitespaceIndices.includes(i)
      );

      const combinedOfferings = [
        ...(discoveryResult.verified_offerings || []),
        ...activeWhitespace,
      ];

      const applyPayload = {
        name: discoveryResult.name,
        tagline: discoveryResult.tagline,
        description: discoveryResult.description,
        website_url: discoveryResult.website_url,
        social_accounts: discoveryResult.social_accounts,
        include_whitespace_offerings: activeWhitespace.length > 0,
        dna: {
          brand_persona: company?.dna?.brand_persona || {
            tone: "Authoritative, Engineering-Led",
            values: ["Deterministic Execution", "Zero Hallucination"],
          },
          target_audience: company?.dna?.target_audience || {
            primary_verticals: ["FinTech", "HealthTech", "Enterprise SaaS"],
          },
          offerings_catalog: combinedOfferings,
          objections_catalog:
            discoveryResult.objections || company?.dna?.objections_catalog || [],
          personas: discoveryResult.personas || company?.dna?.personas || [],
          buying_triggers:
            discoveryResult.buying_triggers || company?.dna?.buying_triggers || [],
          proof_library:
            discoveryResult.trust_assets || company?.dna?.proof_library || [],
          strategic_objectives:
            discoveryResult.strategic_objectives || company?.dna?.strategic_objectives,
          competitive_positioning:
            discoveryResult.competitive_positioning ||
            company?.dna?.competitive_positioning,
          unit_economics: company?.dna?.unit_economics,
        },
      };

      const updated = await apiFetch<any>("/company/auto-discover/apply", {
        method: "POST",
        body: JSON.stringify(applyPayload),
      });

      setCompany(updated);
      setShowDiscoveryModal(false);
      setDiscoverySuccessMsg(
        "✨ Company DNA and Whitespace offerings successfully committed from website discovery!"
      );
      setTimeout(() => setDiscoverySuccessMsg(null), 6000);
      await fetchCompanyData();
    } catch (err: any) {
      setError(err.message || "Failed to apply discovered DNA.");
    } finally {
      setApplyingDNA(false);
    }
  };

  // --- CRUD: Offerings ---
  const openAddOffering = () => {
    setEditingOfferingIdx(null);
    setOfferingForm({
      name: "",
      category: "Agentic AI",
      description: "",
      deliverables: "",
      pricing_model: "Fixed Milestone",
      typical_deal_size_inr: 1000000,
      is_whitespace: false,
      whitespace_rationale: "",
    });
    setOfferingModalOpen(true);
  };

  const openEditOffering = (idx: number) => {
    const item = company.dna.offerings_catalog[idx];
    setEditingOfferingIdx(idx);
    setOfferingForm({
      name: item.name || "",
      category: item.category || "Agentic AI",
      description: item.description || "",
      deliverables: (item.deliverables || []).join(", "),
      pricing_model: item.pricing_model || "Fixed Milestone",
      typical_deal_size_inr: item.typical_deal_size_inr || 1000000,
      is_whitespace: !!item.is_whitespace,
      whitespace_rationale: item.whitespace_rationale || "",
    });
    setOfferingModalOpen(true);
  };

  const adoptWhitespaceOffering = (idx: number) => {
    const current = [...(company.dna?.offerings_catalog || [])];
    if (current[idx]) {
      current[idx] = {
        ...current[idx],
        is_whitespace: false,
      };
      setCompany({
        ...company,
        dna: { ...company.dna, offerings_catalog: current },
      });
    }
  };

  const saveOffering = () => {
    if (!offeringForm.name.trim()) return;
    const deliverablesArray = offeringForm.deliverables
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const newItem = {
      name: offeringForm.name.trim(),
      category: offeringForm.category,
      description: offeringForm.description.trim(),
      deliverables: deliverablesArray,
      pricing_model: offeringForm.pricing_model,
      typical_deal_size_inr: Number(offeringForm.typical_deal_size_inr) || 1000000,
      is_whitespace: offeringForm.is_whitespace,
      whitespace_rationale: offeringForm.whitespace_rationale.trim(),
    };

    const current = [...(company.dna?.offerings_catalog || [])];
    if (editingOfferingIdx !== null) {
      current[editingOfferingIdx] = newItem;
    } else {
      current.push(newItem);
    }

    setCompany({
      ...company,
      dna: { ...company.dna, offerings_catalog: current },
    });
    setOfferingModalOpen(false);
  };

  const deleteOffering = (idx: number) => {
    if (confirm("Are you sure you want to delete this offering?")) {
      const current = [...(company.dna?.offerings_catalog || [])];
      current.splice(idx, 1);
      setCompany({
        ...company,
        dna: { ...company.dna, offerings_catalog: current },
      });
    }
  };

  // --- CRUD: Objections ---
  const openAddObjection = () => {
    setEditingObjectionIdx(null);
    setObjectionForm({
      category: "Business",
      severity: "High",
      objection: "",
      counter_argument: "",
      detailed_answer: "",
      proof_points: "",
      proof_asset: "",
      buyer_role: "CIO, CTO",
    });
    setObjectionModalOpen(true);
  };

  const openEditObjection = (idx: number) => {
    const item = company.dna.objections_catalog[idx];
    setEditingObjectionIdx(idx);
    setObjectionForm({
      category: item.category || "Business",
      severity: item.severity || "Medium",
      objection: item.objection || "",
      counter_argument: item.counter_argument || "",
      detailed_answer: item.detailed_answer || "",
      proof_points: (item.proof_points || []).join(", "),
      proof_asset: item.proof_asset || "",
      buyer_role: (item.buyer_role || []).join(", "),
    });
    setObjectionModalOpen(true);
  };

  const saveObjection = () => {
    if (!objectionForm.objection.trim() || !objectionForm.counter_argument.trim()) return;
    const proofArray = objectionForm.proof_points
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const rolesArray = objectionForm.buyer_role
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const newItem = {
      category: objectionForm.category,
      severity: objectionForm.severity,
      objection: objectionForm.objection.trim(),
      counter_argument: objectionForm.counter_argument.trim(),
      detailed_answer: objectionForm.detailed_answer.trim(),
      proof_points: proofArray,
      proof_asset: objectionForm.proof_asset.trim() || null,
      buyer_role: rolesArray,
    };

    const current = [...(company.dna?.objections_catalog || [])];
    if (editingObjectionIdx !== null) {
      current[editingObjectionIdx] = newItem;
    } else {
      current.push(newItem);
    }

    setCompany({
      ...company,
      dna: { ...company.dna, objections_catalog: current },
    });
    setObjectionModalOpen(false);
  };

  const deleteObjection = (idx: number) => {
    if (confirm("Delete this field objection?")) {
      const current = [...(company.dna?.objections_catalog || [])];
      current.splice(idx, 1);
      setCompany({
        ...company,
        dna: { ...company.dna, objections_catalog: current },
      });
    }
  };

  // --- CRUD: Buying Triggers ---
  const openAddTrigger = () => {
    setEditingTriggerIdx(null);
    setTriggerForm({
      event_name: "",
      category: "Strategic Mandate",
      description: "",
      sense_hook: "",
    });
    setTriggerModalOpen(true);
  };

  const openEditTrigger = (idx: number) => {
    const item = company.dna.buying_triggers[idx];
    setEditingTriggerIdx(idx);
    setTriggerForm({
      event_name: item.event_name || "",
      category: item.category || "Strategic Mandate",
      description: item.description || "",
      sense_hook: item.sense_hook || "",
    });
    setTriggerModalOpen(true);
  };

  const saveTrigger = () => {
    if (!triggerForm.event_name.trim()) return;
    const newItem = {
      event_name: triggerForm.event_name.trim(),
      category: triggerForm.category,
      description: triggerForm.description.trim(),
      sense_hook: triggerForm.sense_hook.trim(),
    };

    const current = [...(company.dna?.buying_triggers || [])];
    if (editingTriggerIdx !== null) {
      current[editingTriggerIdx] = newItem;
    } else {
      current.push(newItem);
    }

    setCompany({
      ...company,
      dna: { ...company.dna, buying_triggers: current },
    });
    setTriggerModalOpen(false);
  };

  const deleteTrigger = (idx: number) => {
    if (confirm("Delete this buying trigger?")) {
      const current = [...(company.dna?.buying_triggers || [])];
      current.splice(idx, 1);
      setCompany({
        ...company,
        dna: { ...company.dna, buying_triggers: current },
      });
    }
  };

  // --- CRUD: Buyer Committee Personas ---
  const openAddPersona = () => {
    setEditingPersonaIdx(null);
    setPersonaForm({
      role_type: "Technical Buyer",
      title: "",
      daily_headaches: "",
      buying_criteria: "",
    });
    setPersonaModalOpen(true);
  };

  const openEditPersona = (idx: number) => {
    const item = company.dna.target_audiences.personas[idx];
    setEditingPersonaIdx(idx);
    setPersonaForm({
      role_type: item.role_type || "Technical Buyer",
      title: item.title || "",
      daily_headaches: (item.daily_headaches || []).join(", "),
      buying_criteria: (item.buying_criteria || []).join(", "),
    });
    setPersonaModalOpen(true);
  };

  const savePersona = () => {
    if (!personaForm.title.trim()) return;
    const headachesArray = personaForm.daily_headaches
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const criteriaArray = personaForm.buying_criteria
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const newItem = {
      role_type: personaForm.role_type,
      title: personaForm.title.trim(),
      daily_headaches: headachesArray,
      buying_criteria: criteriaArray,
    };

    const current = [...(company.dna?.target_audiences?.personas || [])];
    if (editingPersonaIdx !== null) {
      current[editingPersonaIdx] = newItem;
    } else {
      current.push(newItem);
    }

    setCompany({
      ...company,
      dna: {
        ...company.dna,
        target_audiences: { ...company.dna?.target_audiences, personas: current },
      },
    });
    setPersonaModalOpen(false);
  };

  const deletePersona = (idx: number) => {
    if (confirm("Delete this buyer persona?")) {
      const current = [...(company.dna?.target_audiences?.personas || [])];
      current.splice(idx, 1);
      setCompany({
        ...company,
        dna: {
          ...company.dna,
          target_audiences: { ...company.dna?.target_audiences, personas: current },
        },
      });
    }
  };

  // --- CRUD: Trust Assets ---
  const openAddAsset = () => {
    setEditingAssetIdx(null);
    setAssetForm({
      title: "",
      asset_type: "Case Study",
      description: "",
      url: "",
    });
    setAssetModalOpen(true);
  };

  const openEditAsset = (idx: number) => {
    const item = company.dna.proof_library[idx];
    setEditingAssetIdx(idx);
    setAssetForm({
      title: item.title || "",
      asset_type: item.asset_type || "Case Study",
      description: item.description || "",
      url: item.url || "",
    });
    setAssetModalOpen(true);
  };

  const saveAsset = () => {
    if (!assetForm.title.trim()) return;
    const newItem = {
      title: assetForm.title.trim(),
      asset_type: assetForm.asset_type,
      description: assetForm.description.trim(),
      url: assetForm.url.trim(),
    };

    const current = [...(company.dna?.proof_library || [])];
    if (editingAssetIdx !== null) {
      current[editingAssetIdx] = newItem;
    } else {
      current.push(newItem);
    }

    setCompany({
      ...company,
      dna: { ...company.dna, proof_library: current },
    });
    setAssetModalOpen(false);
  };

  const deleteAsset = (idx: number) => {
    if (confirm("Delete this trust asset?")) {
      const current = [...(company.dna?.proof_library || [])];
      current.splice(idx, 1);
      setCompany({
        ...company,
        dna: { ...company.dna, proof_library: current },
      });
    }
  };

  // --- Blueprint Switcher Handler ---
  const handleSwitchBlueprint = async (industryName: string) => {
    try {
      setSwitchingBlueprint(true);
      setError(null);
      const res = await apiFetch<any>("/company/switch-industry-blueprint", {
        method: "POST",
        body: JSON.stringify({ industry: industryName }),
      });
      setCompany(res);
      setSelectedPersonaIdx(0);
      setDiscoverySuccessMsg(`Successfully switched commercial ontology to "${industryName}"!`);
      setTimeout(() => setDiscoverySuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to switch blueprint.");
    } finally {
      setSwitchingBlueprint(false);
    }
  };

  // --- CRUD: Stakeholder Personas (Deep Buying Psychology) ---
  const openAddStakeholder = () => {
    setEditingStakeholderIdx(null);
    setStakeholderForm({
      role_name: "",
      role_type: "Executive Leadership",
      primary_concern: "",
      success_metric: "",
      top_objectives: "",
      top_fears: "",
      top_questions: "",
      top_objections: "",
      preferred_messaging: "",
      proof_required: "",
      decision_criteria: "",
    });
    setStakeholderModalOpen(true);
  };

  const openEditStakeholder = (idx: number) => {
    const list = company?.dna?.stakeholder_personas || [];
    const item = list[idx];
    if (!item) return;
    setEditingStakeholderIdx(idx);
    setStakeholderForm({
      role_name: item.role_name || "",
      role_type: item.role_type || "Executive Leadership",
      primary_concern: item.primary_concern || "",
      success_metric: item.success_metric || "",
      top_objectives: (item.top_objectives || []).join("\n"),
      top_fears: (item.top_fears || []).join("\n"),
      top_questions: (item.top_questions || []).join("\n"),
      top_objections: (item.top_objections || []).join("\n"),
      preferred_messaging: (item.preferred_messaging || []).join(", "),
      proof_required: (item.proof_required || []).join(", "),
      decision_criteria: (item.decision_criteria || []).join(", "),
    });
    setStakeholderModalOpen(true);
  };

  const saveStakeholder = () => {
    if (!stakeholderForm.role_name.trim()) return;
    const toList = (s: string) =>
      s
        .split(/[\n]+/)
        .map((x) => x.trim().replace(/^[-*•0-9.]+\s*/, ""))
        .filter(Boolean);
    const toCommaList = (s: string) =>
      s
        .split(/[,\n]+/)
        .map((x) => x.trim().replace(/^[-*•]+\s*/, ""))
        .filter(Boolean);

    const newItem = {
      role_name: stakeholderForm.role_name.trim(),
      role_type: stakeholderForm.role_type,
      primary_concern: stakeholderForm.primary_concern.trim(),
      success_metric: stakeholderForm.success_metric.trim(),
      top_objectives: toList(stakeholderForm.top_objectives),
      top_fears: toList(stakeholderForm.top_fears),
      top_questions: toList(stakeholderForm.top_questions),
      top_objections: toList(stakeholderForm.top_objections),
      preferred_messaging: toCommaList(stakeholderForm.preferred_messaging),
      proof_required: toCommaList(stakeholderForm.proof_required),
      decision_criteria: toCommaList(stakeholderForm.decision_criteria),
    };

    const current = [...(company?.dna?.stakeholder_personas || [])];
    if (editingStakeholderIdx !== null) {
      current[editingStakeholderIdx] = newItem;
    } else {
      current.push(newItem);
    }
    setCompany({
      ...company,
      dna: { ...company.dna, stakeholder_personas: current },
    });
    setStakeholderModalOpen(false);
  };

  const deleteStakeholder = (idx: number) => {
    if (confirm("Delete this stakeholder persona?")) {
      const current = [...(company?.dna?.stakeholder_personas || [])];
      current.splice(idx, 1);
      setCompany({
        ...company,
        dna: { ...company.dna, stakeholder_personas: current },
      });
      if (selectedPersonaIdx >= current.length && current.length > 0) {
        setSelectedPersonaIdx(current.length - 1);
      }
    }
  };

  // --- CRUD: Buying Signals ---
  const openAddSignal = () => {
    setEditingSignalIdx(null);
    setSignalForm({
      signal: "",
      category: "Corporate Mandate",
      description: "",
      sense_detection_hook: "",
    });
    setSignalModalOpen(true);
  };

  const openEditSignal = (idx: number) => {
    const item = (company?.dna?.buying_signals || [])[idx];
    if (!item) return;
    setEditingSignalIdx(idx);
    setSignalForm({
      signal: item.signal || "",
      category: item.category || "Corporate Mandate",
      description: item.description || "",
      sense_detection_hook: item.sense_detection_hook || "",
    });
    setSignalModalOpen(true);
  };

  const saveSignal = () => {
    if (!signalForm.signal.trim()) return;
    const newItem = {
      signal: signalForm.signal.trim(),
      category: signalForm.category,
      description: signalForm.description.trim(),
      sense_detection_hook: signalForm.sense_detection_hook.trim(),
    };
    const current = [...(company?.dna?.buying_signals || [])];
    if (editingSignalIdx !== null) {
      current[editingSignalIdx] = newItem;
    } else {
      current.push(newItem);
    }
    setCompany({
      ...company,
      dna: { ...company.dna, buying_signals: current },
    });
    setSignalModalOpen(false);
  };

  const deleteSignal = (idx: number) => {
    if (confirm("Delete this buying signal?")) {
      const current = [...(company?.dna?.buying_signals || [])];
      current.splice(idx, 1);
      setCompany({
        ...company,
        dna: { ...company.dna, buying_signals: current },
      });
    }
  };

  // --- CRUD: Core Pain Points ---
  const openAddPain = () => {
    setEditingPainIdx(null);
    setPainForm({
      pain_point: "",
      business_impact: "",
      targeted_personas: "CEO, CFO, COO",
    });
    setPainModalOpen(true);
  };

  const openEditPain = (idx: number) => {
    const item = (company?.dna?.core_pain_points || [])[idx];
    if (!item) return;
    setEditingPainIdx(idx);
    setPainForm({
      pain_point: item.pain_point || "",
      business_impact: item.business_impact || "",
      targeted_personas: (item.targeted_personas || []).join(", "),
    });
    setPainModalOpen(true);
  };

  const savePain = () => {
    if (!painForm.pain_point.trim()) return;
    const newItem = {
      pain_point: painForm.pain_point.trim(),
      business_impact: painForm.business_impact.trim(),
      targeted_personas: painForm.targeted_personas
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const current = [...(company?.dna?.core_pain_points || [])];
    if (editingPainIdx !== null) {
      current[editingPainIdx] = newItem;
    } else {
      current.push(newItem);
    }
    setCompany({
      ...company,
      dna: { ...company.dna, core_pain_points: current },
    });
    setPainModalOpen(false);
  };

  const deletePain = (idx: number) => {
    if (confirm("Delete this pain point?")) {
      const current = [...(company?.dna?.core_pain_points || [])];
      current.splice(idx, 1);
      setCompany({
        ...company,
        dna: { ...company.dna, core_pain_points: current },
      });
    }
  };

  // --- CRUD: Business Outcomes ---
  const openAddOutcome = () => {
    setEditingOutcomeIdx(null);
    setOutcomeForm({
      outcome: "",
      impact_metric: "",
      buyer_appeal: "CEO, CFO",
    });
    setOutcomeModalOpen(true);
  };

  const openEditOutcome = (idx: number) => {
    const item = (company?.dna?.business_outcomes || [])[idx];
    if (!item) return;
    setEditingOutcomeIdx(idx);
    setOutcomeForm({
      outcome: item.outcome || "",
      impact_metric: item.impact_metric || "",
      buyer_appeal: (item.buyer_appeal || []).join(", "),
    });
    setOutcomeModalOpen(true);
  };

  const saveOutcome = () => {
    if (!outcomeForm.outcome.trim()) return;
    const newItem = {
      outcome: outcomeForm.outcome.trim(),
      impact_metric: outcomeForm.impact_metric.trim(),
      buyer_appeal: outcomeForm.buyer_appeal
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const current = [...(company?.dna?.business_outcomes || [])];
    if (editingOutcomeIdx !== null) {
      current[editingOutcomeIdx] = newItem;
    } else {
      current.push(newItem);
    }
    setCompany({
      ...company,
      dna: { ...company.dna, business_outcomes: current },
    });
    setOutcomeModalOpen(false);
  };

  const deleteOutcome = (idx: number) => {
    if (confirm("Delete this business outcome?")) {
      const current = [...(company?.dna?.business_outcomes || [])];
      current.splice(idx, 1);
      setCompany({
        ...company,
        dna: { ...company.dna, business_outcomes: current },
      });
    }
  };

  // Filtered objections
  const allObjections = company?.dna?.objections_catalog || [];
  const filteredObjections = allObjections.filter((obj: any) => {
    const matchesCategory =
      objectionCategoryFilter === "All" || obj.category === objectionCategoryFilter;
    const matchesSearch =
      !objectionSearch ||
      (obj.objection && obj.objection.toLowerCase().includes(objectionSearch.toLowerCase())) ||
      (obj.counter_argument &&
        obj.counter_argument.toLowerCase().includes(objectionSearch.toLowerCase())) ||
      (obj.category && obj.category.toLowerCase().includes(objectionSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
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
            <Building2 className="w-4 h-4" />
            <span>Layer 0 Foundation</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Company DNA & Strategy Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ground-truth institutional profile powering SENSE, THINK, ALIGN, ACT, and LEARN engines autonomously.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Saved successfully
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save DNA"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {discoverySuccessMsg && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
          <span>{discoverySuccessMsg}</span>
        </div>
      )}

      {/* Auto-Discovery URL-to-DNA Hero Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-[#0d1527] to-indigo-950/40 border border-blue-500/30 rounded-2xl p-5 shadow-lg shadow-blue-950/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Autonomous URL-to-DNA Engine</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Palantir Whitespace Synthesizer</span>
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Auto-Discover Institutional DNA from Website
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter your corporate domain to crawl ground-truth positioning, verify official social channels, extract live offerings, uncover high-margin whitespace service opportunities, and stage enterprise buyer personas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0">
            <div className="relative min-w-[280px]">
              <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="https://www.nisolai.com"
                value={discoveryUrl || company?.website_url || ""}
                onChange={(e) => setDiscoveryUrl(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleAutoDiscover}
              disabled={discoveringDNA}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${discoveringDNA ? "animate-spin" : ""}`} />
              <span>{discoveringDNA ? "Crawling & Synthesizing..." : "✨ Auto-Discover DNA"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-800 overflow-x-auto pb-px">
        {[
          { id: "profile", label: "Profile & Identity", icon: Building2 },
          { id: "strategy", label: "Strategy & Priorities", icon: Compass },
          { id: "positioning", label: "Positioning & Battlecard", icon: TrendingUp },
          { id: "market", label: "Market, Personas & Triggers", icon: Users },
          { id: "offerings", label: "Offerings & Catalog", icon: FileText, count: company?.dna?.offerings_catalog?.length },
          { id: "objections", label: "Objections & Proof", icon: ShieldAlert, count: company?.dna?.objections_catalog?.length },
          { id: "proof", label: "Trust Assets", icon: ShieldCheck, count: company?.dna?.proof_library?.length },
          { id: "math", label: "Constraints & Sales Math", icon: DollarSign },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-blue-500 text-blue-400 bg-blue-500/5"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Profile & Identity */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* General Info */}
            <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>General Information</span>
              </h3>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Company Name</label>
                <input
                  type="text"
                  value={company?.name || ""}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Website URL</label>
                <div className="relative">
                  <input
                    type="text"
                    value={company?.website_url || ""}
                    onChange={(e) => setCompany({ ...company, website_url: e.target.value })}
                    className="w-full pl-3.5 pr-9 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                  />
                  {company?.website_url && (
                    <a
                      href={company.website_url}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Tagline</label>
                <input
                  type="text"
                  value={company?.tagline || ""}
                  onChange={(e) => setCompany({ ...company, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Company Description</label>
                <textarea
                  rows={3}
                  value={company?.description || ""}
                  onChange={(e) => setCompany({ ...company, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Official Social Channels */}
            <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-cyan-400" />
                  <span>Official Social Channels</span>
                </h3>
                <span className="text-[10px] text-slate-400">Verified institutional presences</span>
              </div>

              {/* LinkedIn */}
              <div>
                <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <span className="p-1 rounded bg-[#0077b5]/10 text-[#0077b5]">
                    <LinkedInIcon className="w-3.5 h-3.5" />
                  </span>
                  <span>LinkedIn Company Page</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="https://www.linkedin.com/company/..."
                    value={company?.social_accounts?.linkedin || ""}
                    onChange={(e) =>
                      setCompany({
                        ...company,
                        social_accounts: { ...company.social_accounts, linkedin: e.target.value },
                      })
                    }
                    className="w-full pl-3.5 pr-9 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                  />
                  {company?.social_accounts?.linkedin && (
                    <a
                      href={company.social_accounts.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* X / Twitter */}
              <div>
                <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <span className="p-1 rounded bg-slate-800 text-white">
                    <XIcon className="w-3.5 h-3.5" />
                  </span>
                  <span>X / Twitter Profile</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="https://x.com/..."
                    value={company?.social_accounts?.twitter || ""}
                    onChange={(e) =>
                      setCompany({
                        ...company,
                        social_accounts: { ...company.social_accounts, twitter: e.target.value },
                      })
                    }
                    className="w-full pl-3.5 pr-9 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                  />
                  {company?.social_accounts?.twitter && (
                    <a
                      href={company.social_accounts.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Instagram */}
              <div>
                <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <span className="p-1 rounded bg-pink-500/10 text-pink-500">
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </span>
                  <span>Instagram Official</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="https://instagram.com/..."
                    value={company?.social_accounts?.instagram || ""}
                    onChange={(e) =>
                      setCompany({
                        ...company,
                        social_accounts: { ...company.social_accounts, instagram: e.target.value },
                      })
                    }
                    className="w-full pl-3.5 pr-9 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs focus:border-pink-500 focus:outline-none"
                  />
                  {company?.social_accounts?.instagram && (
                    <a
                      href={company.social_accounts.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Facebook */}
              <div>
                <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <span className="p-1 rounded bg-blue-600/10 text-blue-500">
                    <FacebookIcon className="w-3.5 h-3.5" />
                  </span>
                  <span>Facebook Page</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="https://facebook.com/..."
                    value={company?.social_accounts?.facebook || ""}
                    onChange={(e) =>
                      setCompany({
                        ...company,
                        social_accounts: { ...company.social_accounts, facebook: e.target.value },
                      })
                    }
                    className="w-full pl-3.5 pr-9 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                  />
                  {company?.social_accounts?.facebook && (
                    <a
                      href={company.social_accounts.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* GitHub */}
              <div>
                <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <span className="p-1 rounded bg-slate-800 text-slate-200">
                    <GithubIcon className="w-3.5 h-3.5" />
                  </span>
                  <span>GitHub Organization</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={company?.social_accounts?.github || ""}
                    onChange={(e) =>
                      setCompany({
                        ...company,
                        social_accounts: { ...company.social_accounts, github: e.target.value },
                      })
                    }
                    className="w-full pl-3.5 pr-9 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs focus:border-slate-500 focus:outline-none"
                  />
                  {company?.social_accounts?.github && (
                    <a
                      href={company.social_accounts.github}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* YouTube */}
              <div>
                <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <span className="p-1 rounded bg-red-600/10 text-red-500">
                    <YoutubeIcon className="w-3.5 h-3.5" />
                  </span>
                  <span>YouTube Channel</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="https://youtube.com/@..."
                    value={company?.social_accounts?.youtube || ""}
                    onChange={(e) =>
                      setCompany({
                        ...company,
                        social_accounts: { ...company.social_accounts, youtube: e.target.value },
                      })
                    }
                    className="w-full pl-3.5 pr-9 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                  {company?.social_accounts?.youtube && (
                    <a
                      href={company.social_accounts.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Brand Voice & Narrative */}
          <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Brand Persona, Voice Guidelines & Compliance Guardrails</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Tone & Demeanor</label>
                <input
                  type="text"
                  value={company?.dna?.brand_persona?.tone || ""}
                  onChange={(e) =>
                    setCompany({
                      ...company,
                      dna: {
                        ...company.dna,
                        brand_persona: { ...company.dna?.brand_persona, tone: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Compliance & Privacy Guardrails</label>
                <input
                  type="text"
                  value={company?.dna?.brand_persona?.compliance_rules || ""}
                  onChange={(e) =>
                    setCompany({
                      ...company,
                      dna: {
                        ...company.dna,
                        brand_persona: { ...company.dna?.brand_persona, compliance_rules: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Writing & Positioning Guidelines</label>
              <textarea
                rows={2}
                value={company?.dna?.brand_persona?.voice_guidelines || ""}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    dna: {
                      ...company.dna,
                      brand_persona: { ...company.dna?.brand_persona, voice_guidelines: e.target.value },
                    },
                  })
                }
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Strategy & Priorities */}
      {activeTab === "strategy" && (
        <div className="space-y-6">
          <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-purple-400" />
                  <span>Strategic Objectives & Business Priorities</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tells ALIGN and ACT what outcomes ConductOS is optimizing for autonomously.
                </p>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-mono rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                ALIGN Engine Input
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">North Star Metric</label>
                <input
                  type="text"
                  placeholder="e.g. 10 Enterprise Production Deployments"
                  value={company?.dna?.strategic_objectives?.north_star_metric || ""}
                  onChange={(e) =>
                    setCompany({
                      ...company,
                      dna: {
                        ...company.dna,
                        strategic_objectives: {
                          ...company.dna?.strategic_objectives,
                          north_star_metric: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs font-semibold text-purple-300"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Current Company Stage</label>
                <input
                  type="text"
                  placeholder="e.g. Early Scale / Founder-Led"
                  value={company?.dna?.strategic_objectives?.current_stage || ""}
                  onChange={(e) =>
                    setCompany({
                      ...company,
                      dna: {
                        ...company.dna,
                        strategic_objectives: {
                          ...company.dna?.strategic_objectives,
                          current_stage: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Primary Strategic Goal</label>
                <input
                  type="text"
                  placeholder="e.g. Acquire 10 enterprise customers in 12 months"
                  value={company?.dna?.strategic_objectives?.primary_goal || ""}
                  onChange={(e) =>
                    setCompany({
                      ...company,
                      dna: {
                        ...company.dna,
                        strategic_objectives: {
                          ...company.dna?.strategic_objectives,
                          primary_goal: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Secondary Goal</label>
                <input
                  type="text"
                  placeholder="e.g. Generate ₹1 Cr ARR"
                  value={company?.dna?.strategic_objectives?.secondary_goal || ""}
                  onChange={(e) =>
                    setCompany({
                      ...company,
                      dna: {
                        ...company.dna,
                        strategic_objectives: {
                          ...company.dna?.strategic_objectives,
                          secondary_goal: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Target Annual Revenue / ARR Goal (₹)</label>
                <input
                  type="number"
                  value={company?.dna?.strategic_objectives?.revenue_goal_inr || 10000000}
                  onChange={(e) =>
                    setCompany({
                      ...company,
                      dna: {
                        ...company.dna,
                        strategic_objectives: {
                          ...company.dna?.strategic_objectives,
                          revenue_goal_inr: parseFloat(e.target.value) || 0,
                        },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Target Customer Count</label>
                <input
                  type="number"
                  value={company?.dna?.strategic_objectives?.target_customer_count || 10}
                  onChange={(e) =>
                    setCompany({
                      ...company,
                      dna: {
                        ...company.dna,
                        strategic_objectives: {
                          ...company.dna?.strategic_objectives,
                          target_customer_count: parseInt(e.target.value) || 10,
                        },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Primary Growth & Offering Priority</label>
              <input
                type="text"
                placeholder="e.g. Enterprise AI Agent Workflows & RAG Ops"
                value={company?.dna?.strategic_objectives?.growth_priority || ""}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    dna: {
                      ...company.dna,
                      strategic_objectives: {
                        ...company.dna?.strategic_objectives,
                        growth_priority: e.target.value,
                      },
                    },
                  })
                }
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            {/* Non-Priorities (Anti-Goals) */}
            <div className="pt-2">
              <label className="block text-xs text-slate-400 mb-1">
                Non-Priorities / Out-of-Scope (What ConductOS should actively deprioritize)
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {(company?.dna?.strategic_objectives?.non_priorities || []).map(
                  (np: string, i: number) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs"
                    >
                      <span>{np}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (
                            company.dna.strategic_objectives.non_priorities || []
                          ).filter((_: any, idx: number) => idx !== i);
                          setCompany({
                            ...company,
                            dna: {
                              ...company.dna,
                              strategic_objectives: {
                                ...company.dna.strategic_objectives,
                                non_priorities: updated,
                              },
                            },
                          });
                        }}
                        className="hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Custom mobile apps, low-margin maintenance..."
                  value={newNonPriority}
                  onChange={(e) => setNewNonPriority(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newNonPriority.trim()) {
                      e.preventDefault();
                      const current = company.dna?.strategic_objectives?.non_priorities || [];
                      setCompany({
                        ...company,
                        dna: {
                          ...company.dna,
                          strategic_objectives: {
                            ...company.dna?.strategic_objectives,
                            non_priorities: [...current, newNonPriority.trim()],
                          },
                        },
                      });
                      setNewNonPriority("");
                    }
                  }}
                  className="flex-1 px-3 py-1.5 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newNonPriority.trim()) return;
                    const current = company.dna?.strategic_objectives?.non_priorities || [];
                    setCompany({
                      ...company,
                      dna: {
                        ...company.dna,
                        strategic_objectives: {
                          ...company.dna?.strategic_objectives,
                          non_priorities: [...current, newNonPriority.trim()],
                        },
                      },
                    });
                    setNewNonPriority("");
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Positioning & Battlecard */}
      {activeTab === "positioning" && (
        <div className="space-y-6">
          <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Competitive Positioning & Battlecard DNA</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Powers the THINK stage to generate differentiation pitches and competitive battlecards.
                </p>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                THINK Engine Input
              </span>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Market Category</label>
              <input
                type="text"
                placeholder="e.g. Enterprise AI Transformation & Cognitive Operating Systems"
                value={company?.dna?.competitive_positioning?.category || ""}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    dna: {
                      ...company.dna,
                      competitive_positioning: {
                        ...company.dna?.competitive_positioning,
                        category: e.target.value,
                      },
                    },
                  })
                }
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs font-medium text-emerald-300"
              />
            </div>

            {/* Differentiators */}
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Core Differentiators (Why choose us over alternatives?)
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {(company?.dna?.competitive_positioning?.core_differentiators || []).map(
                  (diff: string, i: number) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs"
                    >
                      <span>{diff}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (
                            company.dna.competitive_positioning.core_differentiators || []
                          ).filter((_: any, idx: number) => idx !== i);
                          setCompany({
                            ...company,
                            dna: {
                              ...company.dna,
                              competitive_positioning: {
                                ...company.dna.competitive_positioning,
                                core_differentiators: updated,
                              },
                            },
                          });
                        }}
                        className="hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Deterministic guardrails, Zero public model leakage..."
                  value={newDifferentiator}
                  onChange={(e) => setNewDifferentiator(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newDifferentiator.trim()) {
                      e.preventDefault();
                      const current =
                        company.dna?.competitive_positioning?.core_differentiators || [];
                      setCompany({
                        ...company,
                        dna: {
                          ...company.dna,
                          competitive_positioning: {
                            ...company.dna?.competitive_positioning,
                            core_differentiators: [...current, newDifferentiator.trim()],
                          },
                        },
                      });
                      setNewDifferentiator("");
                    }
                  }}
                  className="flex-1 px-3 py-1.5 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newDifferentiator.trim()) return;
                    const current =
                      company.dna?.competitive_positioning?.core_differentiators || [];
                    setCompany({
                      ...company,
                      dna: {
                        ...company.dna,
                        competitive_positioning: {
                          ...company.dna?.competitive_positioning,
                          core_differentiators: [...current, newDifferentiator.trim()],
                        },
                      },
                    });
                    setNewDifferentiator("");
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Why We Win & Why We Lose */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs text-emerald-400 font-semibold mb-1">
                  Why We Win Deals
                </label>
                <div className="space-y-1.5 mb-2">
                  {(company?.dna?.competitive_positioning?.why_we_win || []).map(
                    (item: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#090d16] border border-slate-800 text-xs text-slate-300"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (
                              company.dna.competitive_positioning.why_we_win || []
                            ).filter((_: any, idx: number) => idx !== i);
                            setCompany({
                              ...company,
                              dna: {
                                ...company.dna,
                                competitive_positioning: {
                                  ...company.dna.competitive_positioning,
                                  why_we_win: updated,
                                },
                              },
                            });
                          }}
                          className="text-slate-500 hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 10x faster execution speed..."
                    value={newWhyWin}
                    onChange={(e) => setNewWhyWin(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newWhyWin.trim()) {
                        e.preventDefault();
                        const current = company.dna?.competitive_positioning?.why_we_win || [];
                        setCompany({
                          ...company,
                          dna: {
                            ...company.dna,
                            competitive_positioning: {
                              ...company.dna?.competitive_positioning,
                              why_we_win: [...current, newWhyWin.trim()],
                            },
                          },
                        });
                        setNewWhyWin("");
                      }
                    }}
                    className="flex-1 px-3 py-1.5 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newWhyWin.trim()) return;
                      const current = company.dna?.competitive_positioning?.why_we_win || [];
                      setCompany({
                        ...company,
                        dna: {
                          ...company.dna,
                          competitive_positioning: {
                            ...company.dna?.competitive_positioning,
                            why_we_win: [...current, newWhyWin.trim()],
                          },
                        },
                      });
                      setNewWhyWin("");
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs text-amber-400 font-semibold mb-1">
                  Why We Lose Deals (Vulnerabilities)
                </label>
                <div className="space-y-1.5 mb-2">
                  {(company?.dna?.competitive_positioning?.why_we_lose || []).map(
                    (item: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#090d16] border border-slate-800 text-xs text-slate-300"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (
                              company.dna.competitive_positioning.why_we_lose || []
                            ).filter((_: any, idx: number) => idx !== i);
                            setCompany({
                              ...company,
                              dna: {
                                ...company.dna,
                                competitive_positioning: {
                                  ...company.dna.competitive_positioning,
                                  why_we_lose: updated,
                                },
                              },
                            });
                          }}
                          className="text-slate-500 hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Brand recognition vs legacy giants..."
                    value={newWhyLose}
                    onChange={(e) => setNewWhyLose(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newWhyLose.trim()) {
                        e.preventDefault();
                        const current = company.dna?.competitive_positioning?.why_we_lose || [];
                        setCompany({
                          ...company,
                          dna: {
                            ...company.dna,
                            competitive_positioning: {
                              ...company.dna?.competitive_positioning,
                              why_we_lose: [...current, newWhyLose.trim()],
                            },
                          },
                        });
                        setNewWhyLose("");
                      }
                    }}
                    className="flex-1 px-3 py-1.5 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newWhyLose.trim()) return;
                      const current = company.dna?.competitive_positioning?.why_we_lose || [];
                      setCompany({
                        ...company,
                        dna: {
                          ...company.dna,
                          competitive_positioning: {
                            ...company.dna?.competitive_positioning,
                            why_we_lose: [...current, newWhyLose.trim()],
                          },
                        },
                      });
                      setNewWhyLose("");
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Market, Personas & Triggers (Palantir Commercial Ontology) */}
      {activeTab === "market" && (
        <div className="space-y-6">
          {/* Blueprint Switcher Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#121927] to-indigo-950/40 border border-blue-500/20 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20 uppercase tracking-wider">
                    Commercial Ontology Architecture
                  </span>
                  <span className="text-xs text-slate-400">Industry-Agnostic Blueprint</span>
                </div>
                <h3 className="text-sm font-bold text-white mt-1">
                  Multi-Industry Commercial Engine
                </h3>
                <p className="text-xs text-slate-400">
                  Switch or customize pre-calibrated buying psychology, personas, signals, and outcomes for any vertical.
                </p>
              </div>

              {/* Blueprint Switch Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  {
                    id: "Enterprise AI & Digital Transformation",
                    label: "Enterprise AI (Nisol AI)",
                    badge: "Default",
                  },
                  {
                    id: "Logistics & Supply Chain Solutions",
                    label: "Logistics & Supply Chain",
                    badge: "Logistics",
                  },
                  {
                    id: "FMCG & Consumer Goods Distribution",
                    label: "FMCG & CPG Retail",
                    badge: "FMCG",
                  },
                ].map((bp) => (
                  <button
                    key={bp.id}
                    type="button"
                    disabled={switchingBlueprint}
                    onClick={() => handleSwitchBlueprint(bp.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900/80 hover:bg-blue-600/20 text-slate-300 hover:text-white border border-slate-700/80 hover:border-blue-500/40 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {switchingBlueprint ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-blue-400" />
                    ) : (
                      <Layers className="w-3 h-3 text-blue-400" />
                    )}
                    <span>{bp.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stakeholder Personas & Deep Buying Psychology Engine */}
          <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>Stakeholder Personas & Deep Buying Psychology</span>
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
                    {(company?.dna?.stakeholder_personas || []).length} Stakeholders
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Full 7-dimensional buying psychology matrix mapped across objectives, career fears, questions, objections, messaging, proof, and decision criteria.
                </p>
              </div>
              <button
                type="button"
                onClick={openAddStakeholder}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-semibold self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Stakeholder Persona</span>
              </button>
            </div>

            {/* Horizontal Persona Pill Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80 scrollbar-thin">
              {(company?.dna?.stakeholder_personas || []).map((persona: any, idx: number) => {
                const isActive = (selectedPersonaIdx ?? 0) === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPersonaIdx(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "bg-[#090d16] text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                    <span>{persona.role_name}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Persona Deep Psychological Card */}
            {(() => {
              const personas = company?.dna?.stakeholder_personas || [];
              const activePersona = personas[selectedPersonaIdx] || personas[0];
              if (!activePersona) {
                return (
                  <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                    No stakeholder personas configured. Click &quot;Add Stakeholder Persona&quot; or switch to an industry blueprint.
                  </div>
                );
              }
              return (
                <div className="p-5 rounded-xl bg-[#090d16] border border-slate-800/90 space-y-5">
                  {/* Persona Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800/60">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-bold text-white">
                          {activePersona.role_name}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
                          {activePersona.role_type || "Executive Leadership"}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-0.5">
                        {activePersona.primary_concern && (
                          <span className="inline-flex items-center gap-1">
                            <strong className="text-slate-300">Primary Concern:</strong> {activePersona.primary_concern}
                          </span>
                        )}
                        {activePersona.success_metric && (
                          <span className="inline-flex items-center gap-1 text-emerald-400">
                            <strong className="text-emerald-300">Success Metric:</strong> {activePersona.success_metric}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditStakeholder(selectedPersonaIdx)}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteStakeholder(selectedPersonaIdx)}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  {/* 7 Dimensions Psychological Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Dimension 1: Top 5 Objectives */}
                    <div className="p-4 rounded-xl bg-[#121927] border border-emerald-500/20 space-y-2">
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                        <Target className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Top 5 Strategic Objectives</span>
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {(activePersona.top_objectives || []).map((obj: string, i: number) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold mt-0.5">•</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dimension 2: Top 5 Fears */}
                    <div className="p-4 rounded-xl bg-[#121927] border border-rose-500/20 space-y-2">
                      <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                        <span>Top 5 Career & Project Fears</span>
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {(activePersona.top_fears || []).map((fear: string, i: number) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-400 font-bold mt-0.5">•</span>
                            <span>{fear}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dimension 3: Top 5 Questions */}
                    <div className="p-4 rounded-xl bg-[#121927] border border-amber-500/20 space-y-2">
                      <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Top 5 Critical Questions</span>
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {(activePersona.top_questions || []).map((q: string, i: number) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-bold mt-0.5">?</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dimension 4: Top 5 Objections */}
                    <div className="p-4 rounded-xl bg-[#121927] border border-orange-500/20 space-y-2">
                      <span className="text-[11px] font-bold text-orange-400 flex items-center gap-1.5 uppercase tracking-wider">
                        <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                        <span>Top 5 Field Objections</span>
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {(activePersona.top_objections || []).map((obj: string, i: number) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-orange-400 font-bold mt-0.5">✕</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dimension 5: Preferred Messaging */}
                    <div className="p-4 rounded-xl bg-[#121927] border border-blue-500/20 space-y-2">
                      <span className="text-[11px] font-bold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        <span>Preferred Messaging & Tone</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(activePersona.preferred_messaging || []).map((msg: string, i: number) => (
                          <span
                            key={i}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20"
                          >
                            {msg}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Dimension 6 & 7 Combined: Proof Required & Decision Criteria */}
                    <div className="p-4 rounded-xl bg-[#121927] border border-purple-500/20 space-y-3">
                      <div>
                        <span className="text-[11px] font-bold text-purple-400 flex items-center gap-1.5 uppercase tracking-wider mb-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                          <span>Proof Required to Sign Off</span>
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {(activePersona.proof_required || []).map((prf: string, i: number) => (
                            <span
                              key={i}
                              className="text-[10.5px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20"
                            >
                              {prf}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80">
                        <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider mb-1.5">
                          <Award className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Ultimate Decision Criteria</span>
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {(activePersona.decision_criteria || []).map((crit: string, i: number) => (
                            <span
                              key={i}
                              className="text-[10.5px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                            >
                              {crit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Top 10 Buying Signals (SENSE Intent Fuel) */}
          <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Top 10 Buying Signals (SENSE Intent Engine)</span>
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                    {(company?.dna?.buying_signals || []).length} Signals
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  High-intent trigger events monitored continuously by ConductOS across job boards, regulatory filings, executive shifts, and tech stack updates.
                </p>
              </div>
              <button
                type="button"
                onClick={openAddSignal}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Buying Signal</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(company?.dna?.buying_signals || []).map((sig: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 bg-[#090d16] border border-slate-800 rounded-xl space-y-2.5 relative group hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                        {sig.category}
                      </span>
                      <h5 className="text-xs font-bold text-white pt-1">{sig.signal}</h5>
                    </div>
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => openEditSignal(idx)}
                        className="p-1 hover:text-amber-400 text-slate-400 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteSignal(idx)}
                        className="p-1 hover:text-red-400 text-slate-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{sig.description}</p>

                  {sig.sense_detection_hook && (
                    <div className="text-[11px] text-amber-300/90 bg-amber-500/5 p-2.5 rounded-lg border border-amber-500/10 font-mono">
                      <span className="font-semibold text-amber-400">SENSE Detection Hook:</span>{" "}
                      {sig.sense_detection_hook}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Top 10 Enterprise Disqualifiers (Anti-ICP Guardrails) */}
          <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>Top 10 Enterprise Disqualifiers (Anti-ICP Guardrails)</span>
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 font-semibold border border-rose-500/20">
                    {(company?.dna?.target_audiences?.disqualifiers || []).length} Guardrails
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Proactively disqualify poor-fit leads to protect pipeline hygiene, engineering bandwidth, and executive focus.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {(company?.dna?.target_audiences?.disqualifiers || []).map((dq: string, i: number) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>{dq}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = (company?.dna?.target_audiences?.disqualifiers || []).filter(
                        (_: any, idx: number) => idx !== i
                      );
                      setCompany({
                        ...company,
                        dna: {
                          ...company.dna,
                          target_audiences: {
                            ...company.dna?.target_audiences,
                            disqualifiers: updated,
                          },
                        },
                      });
                    }}
                    className="hover:text-white cursor-pointer ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="e.g. Seeking free trials, strictly proprietary non-exportable on-prem only..."
                value={newDisqualifier}
                onChange={(e) => setNewDisqualifier(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newDisqualifier.trim()) {
                    e.preventDefault();
                    const current = company?.dna?.target_audiences?.disqualifiers || [];
                    setCompany({
                      ...company,
                      dna: {
                        ...company.dna,
                        target_audiences: {
                          ...company.dna?.target_audiences,
                          disqualifiers: [...current, newDisqualifier.trim()],
                        },
                      },
                    });
                    setNewDisqualifier("");
                  }
                }}
                className="flex-1 px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs focus:border-rose-500 outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (!newDisqualifier.trim()) return;
                  const current = company?.dna?.target_audiences?.disqualifiers || [];
                  setCompany({
                    ...company,
                    dna: {
                      ...company.dna,
                      target_audiences: {
                        ...company.dna?.target_audiences,
                        disqualifiers: [...current, newDisqualifier.trim()],
                      },
                    },
                  });
                  setNewDisqualifier("");
                }}
                className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Add Guardrail
              </button>
            </div>
          </div>

          {/* Top 10 Core Pain Points vs. Top 10 Business Outcomes Matrix */}
          <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Core Pain Points vs. Quantified Business Outcomes</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                  Value Engineering Matrix
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Direct architectural mapping connecting daily operational friction to measurable executive ROI.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Core Pain Points */}
              <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                      Core Pain Points (Operational Friction)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-mono">
                      {(company?.dna?.core_pain_points || []).length}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={openAddPain}
                    className="flex items-center gap-1 text-[11px] px-2 py-1 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 rounded-lg cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Pain Point</span>
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {(company?.dna?.core_pain_points || []).map((pain: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#121927] border border-slate-800/80 rounded-xl space-y-1.5 relative group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <strong className="text-xs text-white font-semibold">{pain.pain_point}</strong>
                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => openEditPain(idx)}
                            className="p-1 hover:text-blue-400 text-slate-400 cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deletePain(idx)}
                            className="p-1 hover:text-rose-400 text-slate-400 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {pain.business_impact}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(pain.targeted_personas || []).map((tp: string, pi: number) => (
                          <span
                            key={pi}
                            className="text-[9.5px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20"
                          >
                            {tp}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Business Outcomes */}
              <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Business Outcomes (Quantified Value)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                      {(company?.dna?.business_outcomes || []).length}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={openAddOutcome}
                    className="flex items-center gap-1 text-[11px] px-2 py-1 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 rounded-lg cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Outcome</span>
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {(company?.dna?.business_outcomes || []).map((outc: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#121927] border border-slate-800/80 rounded-xl space-y-1.5 relative group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <strong className="text-xs text-white font-semibold">{outc.outcome}</strong>
                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => openEditOutcome(idx)}
                            className="p-1 hover:text-blue-400 text-slate-400 cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteOutcome(idx)}
                            className="p-1 hover:text-rose-400 text-slate-400 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                        {outc.impact_metric}
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(outc.buyer_appeal || []).map((ba: string, bi: number) => (
                          <span
                            key={bi}
                            className="text-[9.5px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20"
                          >
                            {ba}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Target Firmographics (Company Size & Verticals) */}
          <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-400" />
              <span>Target Account Firmographics</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Target Company Size Range</label>
                <input
                  type="text"
                  value={company?.dna?.target_audiences?.company_size_range || ""}
                  onChange={(e) =>
                    setCompany({
                      ...company,
                      dna: {
                        ...company.dna,
                        target_audiences: {
                          ...company.dna?.target_audiences,
                          company_size_range: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="e.g. 50-5,000 employees, ₹10Cr-₹500Cr revenue"
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Target Verticals (comma-separated)
                </label>
                <input
                  type="text"
                  value={(company?.dna?.target_audiences?.verticals || []).join(", ")}
                  onChange={(e) =>
                    setCompany({
                      ...company,
                      dna: {
                        ...company.dna,
                        target_audiences: {
                          ...company.dna?.target_audiences,
                          verticals: e.target.value.split(",").map((s) => s.trim()),
                        },
                      },
                    })
                  }
                  placeholder="Enterprise SaaS, FinTech, Logistics, HealthTech..."
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Offerings & Catalog CRUD */}
      {activeTab === "offerings" && (
        <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Core Service Catalog & Pricing Tiers
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Strategic offerings packaged for deterministic milestone contracting.
              </p>
            </div>
            <button
              onClick={openAddOffering}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Offering</span>
            </button>
          </div>

          <div className="space-y-3">
            {(company?.dna?.offerings_catalog || []).map((offering: any, idx: number) => {
              const isWhitespace = offering.is_whitespace === true;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl space-y-2 relative group transition-all ${
                    isWhitespace
                      ? "bg-gradient-to-r from-purple-950/20 via-[#0d1527] to-amber-950/10 border border-purple-500/30 hover:border-purple-500/50"
                      : "bg-[#090d16] border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white">{offering.name}</span>
                      {isWhitespace ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>✨ AI Whitespace Opportunity</span>
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                          Verified Live Offering
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {offering.category}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {offering.pricing_model}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono font-semibold">
                        ₹{(offering.typical_deal_size_inr / 100000).toFixed(1)} Lakhs
                      </span>
                      {isWhitespace && (
                        <button
                          onClick={() => adoptWhitespaceOffering(idx)}
                          className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-[10.5px] font-medium transition-colors cursor-pointer"
                          title="Adopt into core offerings"
                        >
                          Adopt into Core
                        </button>
                      )}
                      <button
                        onClick={() => openEditOffering(idx)}
                        className="p-1 hover:text-blue-400 text-slate-400 cursor-pointer"
                        title="Edit Offering"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteOffering(idx)}
                        className="p-1 hover:text-red-400 text-slate-400 cursor-pointer"
                        title="Delete Offering"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400">{offering.description}</p>

                  {isWhitespace && offering.whitespace_rationale && (
                    <div className="p-2.5 bg-amber-500/5 border border-amber-500/15 rounded-lg text-[11px] text-amber-300/90 leading-relaxed">
                      <strong className="text-amber-400">💡 Whitespace Strategic Rationale:</strong>{" "}
                      {offering.whitespace_rationale}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(offering.deliverables || []).map((del: string, i: number) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 6: Objections, Risks & Proof CRUD */}
      {activeTab === "objections" && (
        <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Objections, Risks & Proof Ammunition</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Structured ammunition for sales conversations, outreach pitches, and proposal defense.
              </p>
            </div>
            <button
              onClick={openAddObjection}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Field Objection</span>
            </button>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {[
                "All",
                "Business",
                "Technical",
                "Financial",
                "Organizational",
                "Trust & Credibility",
              ].map((cat) => {
                const count =
                  cat === "All"
                    ? allObjections.length
                    : allObjections.filter((o: any) => o.category === cat).length;
                const isSelected = objectionCategoryFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setObjectionCategoryFilter(cat)}
                    className={`px-3 py-1 text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-blue-600 text-white font-medium"
                        : "bg-[#090d16] text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-white/20 text-white" : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search objections..."
                value={objectionSearch}
                onChange={(e) => setObjectionSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Objections List */}
          <div className="space-y-3 pt-1">
            {filteredObjections.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No objections found matching the filter.
              </div>
            ) : (
              filteredObjections.map((obj: any, idx: number) => {
                const globalIdx = allObjections.indexOf(obj);
                const isExpanded = expandedObjectionIdx === globalIdx;

                const categoryColors: Record<string, string> = {
                  Business: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                  Technical: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                  Financial: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                  Organizational: "bg-purple-500/10 text-purple-400 border-purple-500/20",
                  "Trust & Credibility": "bg-rose-500/10 text-rose-400 border-rose-500/20",
                };

                const catBadgeClass =
                  categoryColors[obj.category] || "bg-slate-800 text-slate-300 border-slate-700";

                return (
                  <div
                    key={idx}
                    className="p-4 bg-[#090d16] border border-slate-800 rounded-xl space-y-3 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded border font-medium ${catBadgeClass}`}
                          >
                            {obj.category}
                          </span>
                          {obj.severity && (
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                                obj.severity === "High"
                                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                  : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                              }`}
                            >
                              {obj.severity} Impact
                            </span>
                          )}
                          {(obj.buyer_role || []).map((role: string, rIdx: number) => (
                            <span
                              key={rIdx}
                              className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                        <h4 className="text-xs font-semibold text-white">
                          "{obj.objection}"
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => openEditObjection(globalIdx)}
                          className="p-1 hover:text-blue-400 text-slate-400 cursor-pointer"
                          title="Edit Objection"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteObjection(globalIdx)}
                          className="p-1 hover:text-red-400 text-slate-400 cursor-pointer"
                          title="Delete Objection"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Executive Answer */}
                    <div className="text-xs bg-[#121927] p-3 rounded-lg border border-slate-800/80">
                      <span className="font-semibold text-emerald-400 block mb-0.5">
                        Executive Short Response:
                      </span>
                      <p className="text-slate-300 leading-relaxed">{obj.counter_argument}</p>
                    </div>

                    {/* Expandable Technical Details & Proof */}
                    {obj.detailed_answer && (
                      <div>
                        <button
                          onClick={() =>
                            setExpandedObjectionIdx(isExpanded ? null : globalIdx)
                          }
                          className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-200 cursor-pointer"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                          <span>
                            {isExpanded ? "Hide Technical Answer" : "View Detailed Technical Answer & Proofs"}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="mt-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                            <p className="text-slate-400 leading-relaxed">
                              {obj.detailed_answer}
                            </p>
                            {obj.proof_points && obj.proof_points.length > 0 && (
                              <div className="pt-1">
                                <span className="text-[10px] text-slate-500 font-semibold uppercase block mb-1">
                                  Proof Evidence:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {obj.proof_points.map((pt: string, pIdx: number) => (
                                    <span
                                      key={pIdx}
                                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300"
                                    >
                                      ✓ {pt}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {obj.proof_asset && (
                              <div className="pt-1 flex items-center gap-1.5 text-[11px] text-blue-400">
                                <FileCheck className="w-3.5 h-3.5" />
                                <span>Attached Asset: {obj.proof_asset}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 7: Proof Library & Trust Assets */}
      {activeTab === "proof" && (
        <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Proof Library & Trust Assets</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Reusable architecture diagrams, whitepapers, case studies, and compliance certifications.
              </p>
            </div>
            <button
              onClick={openAddAsset}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Trust Asset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(company?.dna?.proof_library || []).map((asset: any, idx: number) => (
              <div
                key={idx}
                className="p-4 bg-[#090d16] border border-slate-800 rounded-xl space-y-2 relative group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-medium mr-2">
                      {asset.asset_type}
                    </span>
                    <span className="text-xs font-bold text-white">{asset.title}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                    <button
                      onClick={() => openEditAsset(idx)}
                      className="p-1 hover:text-blue-400 text-slate-400"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteAsset(idx)}
                      className="p-1 hover:text-red-400 text-slate-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-400">{asset.description}</p>
                {asset.url && (
                  <div className="pt-1">
                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{asset.url}</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: Constraints & Sales Math */}
      {activeTab === "math" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-400" />
              <span>Operational Capacity & Guardrails (ALIGN Engine)</span>
            </h3>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Max Human Actions Per Week</label>
              <input
                type="number"
                value={company?.dna?.capacity_constraints?.max_weekly_actions || 3}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    dna: {
                      ...company.dna,
                      capacity_constraints: {
                        ...company.dna?.capacity_constraints,
                        max_weekly_actions: parseInt(e.target.value) || 3,
                      },
                    },
                  })
                }
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Max Weekly Budget (₹)</label>
              <input
                type="number"
                value={company?.dna?.capacity_constraints?.max_weekly_budget_inr || 25000}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    dna: {
                      ...company.dna,
                      capacity_constraints: {
                        ...company.dna?.capacity_constraints,
                        max_weekly_budget_inr: parseFloat(e.target.value) || 25000,
                      },
                    },
                  })
                }
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Max Concurrent Active Projects</label>
              <input
                type="number"
                value={company?.dna?.unit_economics?.max_concurrent_projects || 5}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    dna: {
                      ...company.dna,
                      unit_economics: {
                        ...company.dna?.unit_economics,
                        max_concurrent_projects: parseInt(e.target.value) || 5,
                      },
                    },
                  })
                }
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Available Senior AI Architects</label>
              <input
                type="number"
                value={company?.dna?.unit_economics?.available_architects || 3}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    dna: {
                      ...company.dna,
                      unit_economics: {
                        ...company.dna?.unit_economics,
                        available_architects: parseInt(e.target.value) || 3,
                      },
                    },
                  })
                }
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>
          </div>

          <div className="bg-[#121927] border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Pipeline Sales Math & Unit Economics (Forecast Engine)</span>
            </h3>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Historical Win Rate (0.0 to 1.0)</label>
              <input
                type="number"
                step="0.05"
                value={company?.dna?.baseline_sales_math?.historical_win_rate || 0.20}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    dna: {
                      ...company.dna,
                      baseline_sales_math: {
                        ...company.dna?.baseline_sales_math,
                        historical_win_rate: parseFloat(e.target.value) || 0.20,
                      },
                    },
                  })
                }
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Average Deal Size (₹)</label>
              <input
                type="number"
                value={company?.dna?.baseline_sales_math?.average_deal_size_inr || 1000000}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    dna: {
                      ...company.dna,
                      baseline_sales_math: {
                        ...company.dna?.baseline_sales_math,
                        average_deal_size_inr: parseFloat(e.target.value) || 1000000,
                      },
                    },
                  })
                }
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Target Gross Margin (%)</label>
              <input
                type="number"
                value={company?.dna?.unit_economics?.gross_margin_percent || 75}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    dna: {
                      ...company.dna,
                      unit_economics: {
                        ...company.dna?.unit_economics,
                        gross_margin_percent: parseFloat(e.target.value) || 75,
                      },
                    },
                  })
                }
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Target Customer Acquisition Cost CAC (₹)</label>
              <input
                type="number"
                value={company?.dna?.unit_economics?.cac_target_inr || 150000}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    dna: {
                      ...company.dna,
                      unit_economics: {
                        ...company.dna?.unit_economics,
                        cac_target_inr: parseFloat(e.target.value) || 150000,
                      },
                    },
                  })
                }
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* --- MODALS FOR CRUD --- */}

      {/* Offering Modal */}
      {offeringModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121927] border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">
                {editingOfferingIdx !== null ? "Edit Offering" : "Add New Offering"}
              </h3>
              <button
                onClick={() => setOfferingModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Offering Name</label>
              <input
                type="text"
                value={offeringForm.name}
                onChange={(e) => setOfferingForm({ ...offeringForm, name: e.target.value })}
                placeholder="e.g. Agentic AI Workflow Architecture"
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Category</label>
                <input
                  type="text"
                  value={offeringForm.category}
                  onChange={(e) => setOfferingForm({ ...offeringForm, category: e.target.value })}
                  placeholder="e.g. Agentic AI"
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Pricing Model</label>
                <input
                  type="text"
                  value={offeringForm.pricing_model}
                  onChange={(e) =>
                    setOfferingForm({ ...offeringForm, pricing_model: e.target.value })
                  }
                  placeholder="e.g. Fixed Milestone"
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Deal Size (₹ INR)</label>
              <input
                type="number"
                value={offeringForm.typical_deal_size_inr}
                onChange={(e) =>
                  setOfferingForm({
                    ...offeringForm,
                    typical_deal_size_inr: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Description</label>
              <textarea
                rows={3}
                value={offeringForm.description}
                onChange={(e) =>
                  setOfferingForm({ ...offeringForm, description: e.target.value })
                }
                placeholder="Overview of the offering..."
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Deliverables (comma-separated)
              </label>
              <input
                type="text"
                value={offeringForm.deliverables}
                onChange={(e) =>
                  setOfferingForm({ ...offeringForm, deliverables: e.target.value })
                }
                placeholder="Blueprint, Deployment, Logfire Observability..."
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            {/* Whitespace Opportunity Flag */}
            <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={offeringForm.is_whitespace}
                  onChange={(e) =>
                    setOfferingForm({ ...offeringForm, is_whitespace: e.target.checked })
                  }
                  className="rounded border-slate-700 text-purple-600 focus:ring-0 w-4 h-4 bg-[#090d16]"
                />
                <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mark as AI Whitespace Opportunity</span>
                </span>
              </label>

              {offeringForm.is_whitespace && (
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Strategic Whitespace Rationale
                  </label>
                  <input
                    type="text"
                    value={offeringForm.whitespace_rationale}
                    onChange={(e) =>
                      setOfferingForm({
                        ...offeringForm,
                        whitespace_rationale: e.target.value,
                      })
                    }
                    placeholder="e.g. Fills critical enterprise verification gap with high margins"
                    className="w-full px-3 py-1.5 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setOfferingModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveOffering}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold"
              >
                {editingOfferingIdx !== null ? "Save Changes" : "Add Offering"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Objection Modal */}
      {objectionModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121927] border border-slate-800 rounded-2xl w-full max-w-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">
                {editingObjectionIdx !== null ? "Edit Field Objection" : "Add Field Objection"}
              </h3>
              <button
                onClick={() => setObjectionModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Category</label>
                <select
                  value={objectionForm.category}
                  onChange={(e) =>
                    setObjectionForm({ ...objectionForm, category: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                >
                  <option value="Business">Business</option>
                  <option value="Technical">Technical</option>
                  <option value="Financial">Financial</option>
                  <option value="Organizational">Organizational</option>
                  <option value="Trust & Credibility">Trust & Credibility</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Severity / Impact</label>
                <select
                  value={objectionForm.severity}
                  onChange={(e) =>
                    setObjectionForm({ ...objectionForm, severity: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Prospect Objection / Question
              </label>
              <input
                type="text"
                value={objectionForm.objection}
                onChange={(e) =>
                  setObjectionForm({ ...objectionForm, objection: e.target.value })
                }
                placeholder="e.g. What ROI can we realistically expect?"
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Relevant Buyer Roles (comma-separated)
              </label>
              <input
                type="text"
                value={objectionForm.buyer_role}
                onChange={(e) =>
                  setObjectionForm({ ...objectionForm, buyer_role: e.target.value })
                }
                placeholder="e.g. CIO, CTO, CFO, CISO"
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-emerald-400 font-semibold mb-1">
                Executive Short Response (Direct, clear answer)
              </label>
              <textarea
                rows={2}
                value={objectionForm.counter_argument}
                onChange={(e) =>
                  setObjectionForm({ ...objectionForm, counter_argument: e.target.value })
                }
                placeholder="Direct answer to convince senior executives..."
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Detailed Technical / Operational Response (Optional)
              </label>
              <textarea
                rows={3}
                value={objectionForm.detailed_answer}
                onChange={(e) =>
                  setObjectionForm({ ...objectionForm, detailed_answer: e.target.value })
                }
                placeholder="In-depth technical architecture, SLA, or guardrail details..."
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Proof Points (comma-separated)
                </label>
                <input
                  type="text"
                  value={objectionForm.proof_points}
                  onChange={(e) =>
                    setObjectionForm({ ...objectionForm, proof_points: e.target.value })
                  }
                  placeholder="Metric 1, Case study 2..."
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Attached Proof Asset (Optional)
                </label>
                <input
                  type="text"
                  value={objectionForm.proof_asset}
                  onChange={(e) =>
                    setObjectionForm({ ...objectionForm, proof_asset: e.target.value })
                  }
                  placeholder="e.g. ROI_Framework.pdf"
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setObjectionModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveObjection}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold"
              >
                {editingObjectionIdx !== null ? "Save Changes" : "Add Objection"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buying Trigger Modal */}
      {triggerModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121927] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">
                {editingTriggerIdx !== null ? "Edit Buying Trigger" : "Add Buying Trigger"}
              </h3>
              <button
                onClick={() => setTriggerModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Event / Trigger Name</label>
              <input
                type="text"
                value={triggerForm.event_name}
                onChange={(e) => setTriggerForm({ ...triggerForm, event_name: e.target.value })}
                placeholder="e.g. New CIO / CTO Hired"
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Trigger Category</label>
              <select
                value={triggerForm.category}
                onChange={(e) => setTriggerForm({ ...triggerForm, category: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              >
                <option value="Executive Change">Executive Change</option>
                <option value="Funding & Growth">Funding & Growth</option>
                <option value="Strategic Mandate">Strategic Mandate</option>
                <option value="Operational Pain">Operational Pain</option>
                <option value="Regulatory">Regulatory</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Why They Buy (Context)</label>
              <textarea
                rows={2}
                value={triggerForm.description}
                onChange={(e) => setTriggerForm({ ...triggerForm, description: e.target.value })}
                placeholder="Why this trigger creates urgent demand..."
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-amber-400 font-semibold mb-1">
                SENSE Engine Monitor Query
              </label>
              <input
                type="text"
                value={triggerForm.sense_hook}
                onChange={(e) => setTriggerForm({ ...triggerForm, sense_hook: e.target.value })}
                placeholder="e.g. Monitor LinkedIn job transitions for VP Eng & CTO"
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setTriggerModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveTrigger}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold"
              >
                Save Trigger
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persona Modal */}
      {personaModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121927] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">
                {editingPersonaIdx !== null ? "Edit Decision Maker" : "Add Decision Maker"}
              </h3>
              <button
                onClick={() => setPersonaModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Role Type</label>
                <select
                  value={personaForm.role_type}
                  onChange={(e) => setPersonaForm({ ...personaForm, role_type: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                >
                  <option value="Economic Buyer">Economic Buyer</option>
                  <option value="Technical Buyer">Technical Buyer</option>
                  <option value="Champion">Champion</option>
                  <option value="End User">End User</option>
                  <option value="Blocker">Blocker</option>
                  <option value="Procurement">Procurement</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Job Title</label>
                <input
                  type="text"
                  value={personaForm.title}
                  onChange={(e) => setPersonaForm({ ...personaForm, title: e.target.value })}
                  placeholder="e.g. CTO / VP Engineering"
                  className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Daily Headaches (comma-separated)
              </label>
              <textarea
                rows={2}
                value={personaForm.daily_headaches}
                onChange={(e) =>
                  setPersonaForm({ ...personaForm, daily_headaches: e.target.value })
                }
                placeholder="Hallucinations, slow latency, team bandwidth..."
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Buying Criteria (comma-separated)
              </label>
              <textarea
                rows={2}
                value={personaForm.buying_criteria}
                onChange={(e) =>
                  setPersonaForm({ ...personaForm, buying_criteria: e.target.value })
                }
                placeholder="Deterministic accuracy, low TCO, fast deployment..."
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setPersonaModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={savePersona}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold"
              >
                Save Decision Maker
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Asset Modal */}
      {assetModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121927] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">
                {editingAssetIdx !== null ? "Edit Trust Asset" : "Add Trust Asset"}
              </h3>
              <button
                onClick={() => setAssetModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Asset Title</label>
              <input
                type="text"
                value={assetForm.title}
                onChange={(e) => setAssetForm({ ...assetForm, title: e.target.value })}
                placeholder="e.g. Deterministic Architecture Blueprint"
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Asset Type</label>
              <select
                value={assetForm.asset_type}
                onChange={(e) => setAssetForm({ ...assetForm, asset_type: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              >
                <option value="Case Study">Case Study</option>
                <option value="Architecture Blueprint">Architecture Blueprint</option>
                <option value="Security Document">Security Document</option>
                <option value="POC Benchmark">POC Benchmark</option>
                <option value="Testimonial">Testimonial</option>
                <option value="ROI Study">ROI Study</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Description</label>
              <textarea
                rows={2}
                value={assetForm.description}
                onChange={(e) => setAssetForm({ ...assetForm, description: e.target.value })}
                placeholder="What evidence or proof this provides..."
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">URL or File Reference</label>
              <input
                type="text"
                value={assetForm.url}
                onChange={(e) => setAssetForm({ ...assetForm, url: e.target.value })}
                placeholder="https://www.nisolai.com/assets/..."
                className="w-full px-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setAssetModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveAsset}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold"
              >
                Save Asset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Palantir URL-to-DNA Staging & Approval Modal */}
      {showDiscoveryModal && discoveryResult && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#121927] border border-blue-500/30 rounded-2xl w-full max-w-4xl p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl shadow-blue-950/50 flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Palantir-Grade URL-to-DNA Staging Hub</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                      Crawled & Synthesized
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Review crawled institutional DNA and select whitespace offerings before committing into ConductOS Layer 0 ground truth.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDiscoveryModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6 flex-1 pr-1 overflow-y-auto">
              {/* Section 1: Discovered Identity & Official Social Channels */}
              <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 space-y-3">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>1. Crawled Identity & Verified Social Channels</span>
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block mb-0.5">Company Name & Tagline:</span>
                    <strong className="text-white text-sm">{discoveryResult.name}</strong>
                    <p className="text-slate-400 text-xs mt-0.5">{discoveryResult.tagline}</p>
                    <p className="text-slate-400 text-xs mt-2 leading-relaxed">{discoveryResult.description}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Official Social Channels Discovered:</span>
                    <div className="space-y-1.5">
                      {Object.entries(discoveryResult.social_accounts || {}).map(([network, url]: any) => (
                        <div key={network} className="flex items-center justify-between p-1.5 rounded-lg bg-[#121927] border border-slate-800 text-xs">
                          <span className="capitalize text-slate-300 font-medium">{network}:</span>
                          <a href={url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline truncate max-w-[200px] text-[11px]">
                            {url}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Verified Live Offerings */}
              <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>2. Live Offerings Verified on Website ({(discoveryResult.verified_offerings || []).length})</span>
                  </span>
                  <span className="text-[10px] text-emerald-400/90 font-mono">Found on Landing / Products</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(discoveryResult.verified_offerings || []).map((offering: any, i: number) => (
                    <div key={i} className="p-3 rounded-xl bg-[#121927] border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{offering.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                          ₹{(offering.typical_deal_size_inr / 100000).toFixed(1)}L
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{offering.description}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(offering.deliverables || []).map((del: string, di: number) => (
                          <span key={di} className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                            {del}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: ✨ Palantir Whitespace Offerings */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/30 via-[#0d1527] to-purple-950/30 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>3. ✨ AI Whitespace Opportunities (Recommended Offerings)</span>
                  </span>
                  <span className="text-[10px] text-amber-300/80 font-mono">
                    Select to Adopt into Catalog
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our analytical engine analyzed your site positioning against 8 competitors to discover these 3 high-margin whitespace services:
                </p>

                <div className="space-y-3">
                  {(discoveryResult.whitespace_opportunities || []).map((ws: any, i: number) => {
                    const isSelected = selectedWhitespaceIndices.includes(i);
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedWhitespaceIndices(selectedWhitespaceIndices.filter((idx) => idx !== i));
                          } else {
                            setSelectedWhitespaceIndices([...selectedWhitespaceIndices, i]);
                          }
                        }}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                          isSelected
                            ? "bg-purple-950/20 border-purple-500/50 shadow-md shadow-purple-950/30"
                            : "bg-[#090d16]/80 border-slate-800 opacity-60 hover:opacity-80"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="rounded border-slate-700 text-purple-600 focus:ring-0 w-4 h-4 bg-[#090d16] pointer-events-none"
                            />
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-white">{ws.name}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                                  ✨ Whitespace
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                                  ₹{(ws.typical_deal_size_inr / 100000).toFixed(1)} Lakhs
                                </span>
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">{ws.pricing_model}</span>
                        </div>

                        <p className="text-xs text-slate-300 pl-6">{ws.description}</p>

                        {ws.whitespace_rationale && (
                          <div className="ml-6 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300/90 leading-relaxed">
                            <strong>Strategic Whitespace Rationale:</strong> {ws.whitespace_rationale}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1 pl-6">
                          {(ws.deliverables || []).map((del: string, di: number) => (
                            <span key={di} className="text-[9px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                              {del}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 4: Buyer Committee Personas */}
              <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>4. Staged Decision Maker Committee ({(discoveryResult.personas || []).length} Personas)</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {(discoveryResult.personas || []).map((p: any, i: number) => (
                    <div key={i} className="p-2.5 rounded-xl bg-[#121927] border border-slate-800 space-y-1">
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-400 block w-fit">
                        {p.role_type}
                      </span>
                      <strong className="text-white text-xs block">{p.title}</strong>
                      <p className="text-[10.5px] text-slate-400 line-clamp-2">
                        {(p.daily_headaches || []).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5: Field Objections Ammunition (15+ Pre-Seeded) */}
              <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>5. Field Objections Ammunition Catalog ({(discoveryResult.objections || []).length} Items)</span>
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {(discoveryResult.objections || []).slice(0, 6).map((obj: any, i: number) => (
                    <div key={i} className="p-2 rounded-lg bg-[#121927] border border-slate-800 text-xs flex items-center justify-between gap-2">
                      <div className="space-y-0.5 truncate">
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono mr-1.5">
                          {obj.category}
                        </span>
                        <strong className="text-slate-200">{obj.objection}</strong>
                      </div>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                        obj.severity === "High" ? "bg-rose-500/10 text-rose-400" : "bg-amber-500/10 text-amber-400"
                      }`}>
                        {obj.severity}
                      </span>
                    </div>
                  ))}
                  {(discoveryResult.objections || []).length > 6 && (
                    <div className="text-[10px] text-slate-500 text-center pt-1">
                      + {(discoveryResult.objections || []).length - 6} additional objections staged across Technical, Financial, and Trust categories.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 flex-shrink-0">
              <span className="text-xs text-slate-400">
                Adopting <strong className="text-white">{(discoveryResult.verified_offerings || []).length + selectedWhitespaceIndices.length}</strong> offerings (including {selectedWhitespaceIndices.length} whitespace opportunities).
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowDiscoveryModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handleApplyDiscoveredDNA}
                  disabled={applyingDNA}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{applyingDNA ? "Committing DNA..." : "Approve & Commit to Company DNA"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* MODAL: Stakeholder Persona (Deep Buying Psychology) */}
      {stakeholderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121927] border border-slate-700/80 rounded-2xl w-full max-w-2xl p-6 space-y-4 max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white">
                  {editingStakeholderIdx !== null
                    ? "Edit Stakeholder Persona & Psychology"
                    : "Add Stakeholder Persona"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStakeholderModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 overflow-y-auto pr-1 flex-1 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Role Name / Title *</label>
                  <input
                    type="text"
                    value={stakeholderForm.role_name}
                    onChange={(e) =>
                      setStakeholderForm({ ...stakeholderForm, role_name: e.target.value })
                    }
                    placeholder="e.g. Chief Executive Officer (CEO)"
                    className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Committee Role Type</label>
                  <select
                    value={stakeholderForm.role_type}
                    onChange={(e) =>
                      setStakeholderForm({ ...stakeholderForm, role_type: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                  >
                    <option value="Executive Leadership">Executive Leadership (CEO, CFO)</option>
                    <option value="Technical Leadership">Technical Leadership (CIO, CTO)</option>
                    <option value="Operational Buyer">Operational Buyer (COO, Head of Ops)</option>
                    <option value="Risk & Governance">Risk & Governance (CISO, Legal)</option>
                    <option value="Talent & People">Talent & People (CHRO, Head of HR)</option>
                    <option value="Governance & Oversight">Governance & Oversight (Board)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Primary Concern</label>
                  <input
                    type="text"
                    value={stakeholderForm.primary_concern}
                    onChange={(e) =>
                      setStakeholderForm({ ...stakeholderForm, primary_concern: e.target.value })
                    }
                    placeholder="e.g. ROI, Enterprise Valuation, Regulatory Sanctions"
                    className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Key Success Metric</label>
                  <input
                    type="text"
                    value={stakeholderForm.success_metric}
                    onChange={(e) =>
                      setStakeholderForm({ ...stakeholderForm, success_metric: e.target.value })
                    }
                    placeholder="e.g. EBITDA expansion, 40% margin improvement"
                    className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-emerald-400 mb-1 font-semibold">
                  Top 5 Strategic Objectives (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={stakeholderForm.top_objectives}
                  onChange={(e) =>
                    setStakeholderForm({ ...stakeholderForm, top_objectives: e.target.value })
                  }
                  placeholder="Accelerate enterprise operational velocity&#10;Protect market leadership from agile competitors&#10;Drive bottom-line EBITDA improvement"
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-rose-400 mb-1 font-semibold">
                  Top 5 Career & Project Fears (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={stakeholderForm.top_fears}
                  onChange={(e) =>
                    setStakeholderForm({ ...stakeholderForm, top_fears: e.target.value })
                  }
                  placeholder="Public failure of highly visible enterprise AI initiative&#10;Board scrutiny over uncontrolled tech spend&#10;Regulatory breach or reputational damage"
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-amber-400 mb-1 font-semibold">
                  Top 5 Critical Questions (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={stakeholderForm.top_questions}
                  onChange={(e) =>
                    setStakeholderForm({ ...stakeholderForm, top_questions: e.target.value })
                  }
                  placeholder="What is our exact timeline to measurable production ROI?&#10;How does this integrate without breaking existing workflows?&#10;What happens if the model hallucinates or makes a critical error?"
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-orange-400 mb-1 font-semibold">
                  Top 5 Field Objections (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={stakeholderForm.top_objections}
                  onChange={(e) =>
                    setStakeholderForm({ ...stakeholderForm, top_objections: e.target.value })
                  }
                  placeholder="We already have internal teams working on LLM prototypes.&#10;Our legacy databases are too messy for automated agents.&#10;We cannot commit to an annual contract without proof."
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-blue-400 mb-1 font-semibold">
                  Preferred Messaging & Tone (comma-separated)
                </label>
                <input
                  type="text"
                  value={stakeholderForm.preferred_messaging}
                  onChange={(e) =>
                    setStakeholderForm({ ...stakeholderForm, preferred_messaging: e.target.value })
                  }
                  placeholder="Strategic, Board-level, Quantitative ROI, Deterministic Execution"
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-purple-400 mb-1 font-semibold">
                  Proof Required to Sign Off (comma-separated)
                </label>
                <input
                  type="text"
                  value={stakeholderForm.proof_required}
                  onChange={(e) =>
                    setStakeholderForm({ ...stakeholderForm, proof_required: e.target.value })
                  }
                  placeholder="Fortune 500 Case Studies, SOC2 Type II, 14-Day Pilot Benchmark"
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-cyan-400 mb-1 font-semibold">
                  Ultimate Decision Criteria (comma-separated)
                </label>
                <input
                  type="text"
                  value={stakeholderForm.decision_criteria}
                  onChange={(e) =>
                    setStakeholderForm({ ...stakeholderForm, decision_criteria: e.target.value })
                  }
                  placeholder="Clear payback in < 6 months, Zero infrastructure rewrite, Enterprise SLA"
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800 flex-shrink-0">
              <button
                type="button"
                onClick={() => setStakeholderModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveStakeholder}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                {editingStakeholderIdx !== null ? "Save Changes" : "Create Persona"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Buying Signal (SENSE Fuel) */}
      {signalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121927] border border-slate-700/80 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  {editingSignalIdx !== null ? "Edit Buying Signal" : "Add Buying Signal"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSignalModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Signal Title *</label>
                <input
                  type="text"
                  value={signalForm.signal}
                  onChange={(e) => setSignalForm({ ...signalForm, signal: e.target.value })}
                  placeholder="e.g. Executive Mandate on Autonomous Operations"
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Trigger Category</label>
                <select
                  value={signalForm.category}
                  onChange={(e) => setSignalForm({ ...signalForm, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500"
                >
                  <option value="Corporate Mandate">Corporate Mandate</option>
                  <option value="Tech Stack Shift">Tech Stack Shift</option>
                  <option value="Regulatory Compliance">Regulatory Compliance</option>
                  <option value="Operational Scaling">Operational Scaling</option>
                  <option value="Security & Privacy">Security & Privacy</option>
                  <option value="Cost Rationalization">Cost Rationalization</option>
                  <option value="Leadership Transition">Leadership Transition</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Description</label>
                <textarea
                  rows={2}
                  value={signalForm.description}
                  onChange={(e) => setSignalForm({ ...signalForm, description: e.target.value })}
                  placeholder="Why this signal creates high-urgency purchasing readiness..."
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-amber-400 mb-1 font-semibold">
                  SENSE Detection Hook (Monitoring Logic)
                </label>
                <textarea
                  rows={2}
                  value={signalForm.sense_detection_hook}
                  onChange={(e) =>
                    setSignalForm({ ...signalForm, sense_detection_hook: e.target.value })
                  }
                  placeholder="e.g. Scrape quarterly earnings transcripts for mentions of 'agentic automation' or 'cost takeout'..."
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSignalModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveSignal}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                {editingSignalIdx !== null ? "Save Signal" : "Add Signal"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Core Pain Point */}
      {painModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121927] border border-slate-700/80 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-white">
                  {editingPainIdx !== null ? "Edit Core Pain Point" : "Add Core Pain Point"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPainModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Pain Point Title *</label>
                <input
                  type="text"
                  value={painForm.pain_point}
                  onChange={(e) => setPainForm({ ...painForm, pain_point: e.target.value })}
                  placeholder="e.g. Hallucinations & Reliability Breakdown"
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Business Impact</label>
                <textarea
                  rows={3}
                  value={painForm.business_impact}
                  onChange={(e) => setPainForm({ ...painForm, business_impact: e.target.value })}
                  placeholder="Direct impact on operational friction, wasted labor hours, customer churn..."
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">
                  Targeted Personas (comma-separated)
                </label>
                <input
                  type="text"
                  value={painForm.targeted_personas}
                  onChange={(e) =>
                    setPainForm({ ...painForm, targeted_personas: e.target.value })
                  }
                  placeholder="CEO, CTO, CIO, COO"
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setPainModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={savePain}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-rose-600/20 cursor-pointer"
              >
                {editingPainIdx !== null ? "Save Pain Point" : "Add Pain Point"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Business Outcome */}
      {outcomeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121927] border border-slate-700/80 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">
                  {editingOutcomeIdx !== null ? "Edit Business Outcome" : "Add Business Outcome"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOutcomeModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Business Outcome Title *</label>
                <input
                  type="text"
                  value={outcomeForm.outcome}
                  onChange={(e) => setOutcomeForm({ ...outcomeForm, outcome: e.target.value })}
                  placeholder="e.g. 10x Faster Deployment Speed"
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-emerald-400 mb-1 font-semibold">
                  Impact Metric (Quantified Value ROI)
                </label>
                <input
                  type="text"
                  value={outcomeForm.impact_metric}
                  onChange={(e) => setOutcomeForm({ ...outcomeForm, impact_metric: e.target.value })}
                  placeholder="e.g. 80% reduction in cycle times, ₹12 Cr cost savings"
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">
                  Buyer Appeal (comma-separated personas)
                </label>
                <input
                  type="text"
                  value={outcomeForm.buyer_appeal}
                  onChange={(e) => setOutcomeForm({ ...outcomeForm, buyer_appeal: e.target.value })}
                  placeholder="CEO, CFO, CTO, Head of Ops"
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setOutcomeModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveOutcome}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                {editingOutcomeIdx !== null ? "Save Outcome" : "Add Outcome"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
