"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ── Types ───────────────────────────────────────────────────────────────────

type Step = "register" | "profile" | "workflows" | "analyzing" | "results";

interface CompanyProfile {
  name: string;
  industry: string;
  location: string;
  employees: string;
}

interface Risk {
  severity: "HIGH" | "MEDIUM";
  regulation: string;
  title: string;
  description: string;
  deadline: string;
  workflowLabel: string;
}

// ── Static data ─────────────────────────────────────────────────────────────

const WORKFLOWS = [
  { id: "support-chatbot", label: "Customer support chatbot", desc: "AI handling inbound customer queries" },
  { id: "cv-screening", label: "Automated CV screening", desc: "Resume parsing & candidate ranking" },
  { id: "performance-monitoring", label: "AI performance monitoring", desc: "Employee productivity tracking" },
  { id: "customer-comms", label: "Automated communications", desc: "AI-generated emails & messages at scale" },
  { id: "document-processing", label: "Document processing", desc: "Contracts, forms & invoices" },
  { id: "hiring-decisions", label: "AI-assisted hiring", desc: "Scoring or shortlisting candidates" },
  { id: "payroll-automation", label: "Payroll automation", desc: "Automated compensation calculations" },
  { id: "financial-analysis", label: "AI financial scoring", desc: "Credit, risk, or fraud detection" },
  { id: "content-generation", label: "Content generation", desc: "Marketing copy, reports, summaries" },
  { id: "data-analytics", label: "Automated analytics", desc: "BI pipelines & dashboards" },
];

const DISCOVERY_STEPS = [
  "Scanning your domain...",
  "Found your industry: Technology / SaaS",
  "Detected jurisdiction: European Union",
  "Identified 4 data-processing activities on your site",
  "Cross-referencing 40+ AI & automation regulations...",
  "Company profile ready ✓",
];

const ANALYSIS_STAGES = [
  "Scanning selected workflows...",
  "Cross-referencing EU AI Act requirements...",
  "Checking GDPR obligations...",
  "Reviewing CCPA compliance...",
  "Assessing risk severity levels...",
  "Generating your compliance report...",
];

const RISK_BANK: (Risk & { workflow: string })[] = [
  {
    severity: "HIGH",
    regulation: "EU AI Act · Article 13",
    title: "Transparency notices required for customer-facing AI",
    description:
      "Your customer support chatbot must display clear AI disclosure banners and allow users to request human escalation at any time. Non-compliance by Aug 2026 carries fines up to €15M or 3% of global annual turnover.",
    deadline: "Aug 2026",
    workflowLabel: "Customer support chatbot",
    workflow: "support-chatbot",
  },
  {
    severity: "HIGH",
    regulation: "GDPR · Article 22",
    title: "Human oversight required for automated hiring decisions",
    description:
      "Your CV screening system influences or determines hiring outcomes. GDPR mandates explicit candidate disclosure, the right to request human review, and documented bias-prevention safeguards throughout the process.",
    deadline: "Immediate",
    workflowLabel: "Automated CV screening",
    workflow: "cv-screening",
  },
  {
    severity: "HIGH",
    regulation: "EU AI Act · Annex III",
    title: "High-risk AI system registration required",
    description:
      "AI-assisted hiring is classified as high-risk under the EU AI Act. You must register your system in the EU database, maintain technical documentation, and produce auditable decision logs before deployment.",
    deadline: "Aug 2026",
    workflowLabel: "AI-assisted hiring",
    workflow: "hiring-decisions",
  },
  {
    severity: "MEDIUM",
    regulation: "EU AI Act · Article 9",
    title: "Risk management framework for employee monitoring AI",
    description:
      "AI systems monitoring employee performance must include a formal risk management plan, continuous bias testing, and written employee notification procedures before they can be lawfully deployed.",
    deadline: "Feb 2026",
    workflowLabel: "AI performance monitoring",
    workflow: "performance-monitoring",
  },
  {
    severity: "MEDIUM",
    regulation: "CCPA · Section 1798.100",
    title: "Data rights disclosure for automated communications",
    description:
      "Your automated communication system must include updated opt-out mechanisms, a data deletion workflow, and clearly disclosed retention policies in line with the latest CCPA amendments.",
    deadline: "Q1 2026",
    workflowLabel: "Automated communications",
    workflow: "customer-comms",
  },
  {
    severity: "MEDIUM",
    regulation: "GDPR · Article 35",
    title: "Data Protection Impact Assessment required",
    description:
      "Automated document processing involving personal data requires a formal DPIA before deployment, particularly for documents containing sensitive categories such as financial records or health data.",
    deadline: "Apr 2026",
    workflowLabel: "Document processing",
    workflow: "document-processing",
  },
  {
    severity: "MEDIUM",
    regulation: "EU AI Act · Article 52",
    title: "Transparency obligations for AI-generated content",
    description:
      "AI-generated marketing copy and reports must be clearly labelled as AI-generated. Automated outputs distributed at scale require disclosure mechanisms to be in place before Aug 2026.",
    deadline: "Aug 2026",
    workflowLabel: "Content generation",
    workflow: "content-generation",
  },
  {
    severity: "MEDIUM",
    regulation: "CCPA / GDPR",
    title: "Personal data processing compliance for analytics pipelines",
    description:
      "BI pipelines processing personal or behavioural data must have documented legal bases, enforced data minimisation policies, and subject access request procedures before they can operate lawfully.",
    deadline: "Q2 2026",
    workflowLabel: "Automated analytics",
    workflow: "data-analytics",
  },
];

function getRisks(selectedWorkflows: string[]): Risk[] {
  const toRisk = (r: (typeof RISK_BANK)[number]): Risk => ({
    severity: r.severity,
    regulation: r.regulation,
    title: r.title,
    description: r.description,
    deadline: r.deadline,
    workflowLabel: r.workflowLabel,
  });
  const matching = RISK_BANK.filter((r) => selectedWorkflows.includes(r.workflow)).map(toRisk);
  if (matching.length === 0) return RISK_BANK.slice(0, 3).map(toRisk);
  return matching.slice(0, 5);
}

// ── Shared icons ────────────────────────────────────────────────────────────

function IconCheck({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconShield({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11 5.25-.85 9-5.75 9-11V7L12 2Z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" />
    </svg>
  );
}

function IconGoogle() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335" />
    </svg>
  );
}

// ── Step 1: Register ────────────────────────────────────────────────────────

function RegisterStep({
  email,
  setEmail,
  onSubmit,
}: {
  email: string;
  setEmail: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="w-full max-w-md">
      {/* Value hook */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 border border-red-100 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          Most AI workflows have 3–7 unaddressed compliance gaps
        </div>

        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4 leading-tight">
          Find yours in&nbsp;2&nbsp;minutes
        </h1>

        <p className="text-slate-500 text-base leading-relaxed">
          We'll scan your company's AI footprint and surface every regulation that
          applies to your workflows — free, no commitment.
        </p>
      </div>

      {/* Google Workspace SSO */}
      <button
        type="button"
        className="btn btn-secondary btn-lg w-full gap-3 mb-4"
        onClick={() => alert("Google SSO — coming soon")}
      >
        <IconGoogle />
        Continue with Google Workspace
      </button>

      <div className="flex items-center gap-3 mb-4">
        <hr className="flex-1 border-slate-200" />
        <span className="text-sm text-slate-400">or</span>
        <hr className="flex-1 border-slate-200" />
      </div>

      {/* Email form */}
      <form onSubmit={onSubmit} noValidate>
        <input
          type="email"
          className="input mb-2"
          placeholder="you@yourcompany.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <p className="text-xs text-slate-400 mb-4 px-1 leading-relaxed">
          We use your domain to automatically build your company compliance profile — no manual entry needed.
        </p>
        <button type="submit" className="btn btn-primary btn-lg w-full">
          Start your free assessment →
        </button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-6">
        No credit card required · Takes 2 minutes · Free forever for core features
      </p>
    </div>
  );
}

// ── Step 2: Profile generation ──────────────────────────────────────────────

function ProfileStep({
  discoveryIndex,
  profileConfirmed,
  profile,
  setProfile,
  onConfirm,
}: {
  discoveryIndex: number;
  profileConfirmed: boolean;
  profile: CompanyProfile;
  setProfile: React.Dispatch<React.SetStateAction<CompanyProfile>>;
  onConfirm: () => void;
}) {
  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-8">
        {!profileConfirmed ? (
          <>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Building your profile...
            </h2>
            <p className="text-slate-500">Scanning your company's digital footprint</p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Confirm your details
            </h2>
            <p className="text-slate-500">
              We pre-filled these from your domain — correct anything that&apos;s off
            </p>
          </>
        )}
      </div>

      {/* Live discovery feed */}
      <div className="card mb-6 divide-y divide-slate-50 py-2">
        {DISCOVERY_STEPS.map((text, i) => {
          if (i < discoveryIndex) {
            return (
              <div key={i} className="flex items-center gap-3 py-2.5 px-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <IconCheck className="w-3 h-3 text-emerald-600" />
                </div>
                <span className="text-sm text-slate-600">{text}</span>
              </div>
            );
          }
          if (i === discoveryIndex) {
            return (
              <div key={i} className="flex items-center gap-3 py-2.5 px-2">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-slate-700 animate-spin shrink-0" />
                <span className="text-sm text-slate-400">{text}</span>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Profile confirmation */}
      {profileConfirmed && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label text-slate-500 block mb-1.5">Company name</label>
              <input
                className="input"
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="label text-slate-500 block mb-1.5">Industry</label>
              <input
                className="input"
                value={profile.industry}
                onChange={(e) => setProfile((p) => ({ ...p, industry: e.target.value }))}
              />
            </div>
            <div>
              <label className="label text-slate-500 block mb-1.5">Headquarters</label>
              <input
                className="input"
                value={profile.location}
                onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
              />
            </div>
            <div>
              <label className="label text-slate-500 block mb-1.5">Team size</label>
              <select
                className="input"
                value={profile.employees}
                onChange={(e) => setProfile((p) => ({ ...p, employees: e.target.value }))}
              >
                <option>1–10</option>
                <option>11–50</option>
                <option>51–250</option>
                <option>251–1,000</option>
                <option>1,000+</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary btn-lg w-full" onClick={onConfirm}>
            This looks right — continue →
          </button>
        </div>
      )}
    </div>
  );
}

// ── Step 3: Workflow selector ───────────────────────────────────────────────

function WorkflowsStep({
  selected,
  customWorkflows,
  onToggle,
  onAddCustom,
  onAnalyze,
}: {
  selected: string[];
  customWorkflows: { id: string; label: string; desc: string }[];
  onToggle: (id: string) => void;
  onAddCustom: (label: string) => void;
  onAnalyze: () => void;
}) {
  const [addingCustom, setAddingCustom] = useState(false);
  const [customInput, setCustomInput] = useState("");

  function handleAddCustom() {
    if (customInput.trim()) {
      onAddCustom(customInput.trim());
      setCustomInput("");
    }
    setAddingCustom(false);
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
          Which AI workflows does your company use?
        </h2>
        <p className="text-slate-500">Select all that apply — this takes under 30 seconds</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {/* Pre-defined workflow tiles */}
        {WORKFLOWS.map((w) => {
          const active = selected.includes(w.id);
          return (
            <button
              key={w.id}
              onClick={() => onToggle(w.id)}
              className={`text-left p-4 rounded-2xl border-2 transition-all duration-150 ${active
                  ? "border-slate-800 bg-slate-50"
                  : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50"
                }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className={`font-semibold text-sm mb-0.5 ${active ? "text-slate-900" : "text-slate-700"}`}>
                    {w.label}
                  </p>
                  <p className="text-xs text-slate-400 leading-snug">{w.desc}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${active ? "bg-slate-800" : "border-2 border-slate-300"
                    }`}
                >
                  {active && <IconCheck className="w-3 h-3 text-white" />}
                </div>
              </div>
            </button>
          );
        })}

        {/* Custom workflow tiles (already added) */}
        {customWorkflows.map((w) => {
          const active = selected.includes(w.id);
          return (
            <button
              key={w.id}
              onClick={() => onToggle(w.id)}
              className={`text-left p-4 rounded-2xl border-2 transition-all duration-150 ${active
                  ? "border-slate-800 bg-slate-50"
                  : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50"
                }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className={`font-semibold text-sm mb-0.5 ${active ? "text-slate-900" : "text-slate-700"}`}>
                    {w.label}
                  </p>
                  <p className="text-xs text-slate-400 leading-snug">Custom workflow</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${active ? "bg-slate-800" : "border-2 border-slate-300"
                    }`}
                >
                  {active && <IconCheck className="w-3 h-3 text-white" />}
                </div>
              </div>
            </button>
          );
        })}

        {/* Add custom tile */}
        {addingCustom ? (
          <div className="p-4 rounded-2xl border-2 border-slate-800 bg-slate-50 flex flex-col gap-2">
            <input
              autoFocus
              className="input text-sm"
              placeholder="e.g. AI invoice matching"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCustom();
                if (e.key === "Escape") { setAddingCustom(false); setCustomInput(""); }
              }}
            />
            <div className="flex gap-2">
              <button
                className="btn btn-primary flex-1 text-xs py-1.5"
                onClick={handleAddCustom}
              >
                Add
              </button>
              <button
                className="btn btn-secondary text-xs py-1.5 px-3"
                onClick={() => { setAddingCustom(false); setCustomInput(""); }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAddingCustom(true)}
            className="text-left p-4 rounded-2xl border-2 border-dashed border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 transition-all duration-150 flex items-center gap-3"
          >
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0 text-slate-400 text-lg leading-none">
              +
            </div>
            <div>
              <p className="font-semibold text-sm text-slate-500">Add custom workflow</p>
              <p className="text-xs text-slate-400 leading-snug">Not listed above?</p>
            </div>
          </button>
        )}
      </div>

      <button
        className="btn btn-primary btn-lg w-full"
        onClick={onAnalyze}
        disabled={selected.length === 0}
        style={{ opacity: selected.length === 0 ? 0.45 : 1, cursor: selected.length === 0 ? "not-allowed" : "pointer" }}
      >
        {selected.length === 0
          ? "Select at least one workflow to continue"
          : `Analyse ${selected.length} workflow${selected.length > 1 ? "s" : ""} →`}
      </button>

      {selected.length > 0 && (
        <p className="text-center text-xs text-slate-400 mt-3">
          {selected.length} workflow{selected.length > 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}

// ── Step 4: Analyzing ───────────────────────────────────────────────────────

function AnalyzingStep({ stageIndex }: { stageIndex: number }) {
  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Analysing your workflows</h2>
        <p className="text-slate-500">Cross-referencing 40+ AI &amp; automation regulations</p>
      </div>

      {/* Live analysis feed */}
      <div className="card mb-6 divide-y divide-slate-50 py-2">
        {ANALYSIS_STAGES.map((text, i) => {
          if (i < stageIndex) {
            return (
              <div key={i} className="flex items-center gap-3 py-2.5 px-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <IconCheck className="w-3 h-3 text-emerald-600" />
                </div>
                <span className="text-sm text-slate-600">{text}</span>
              </div>
            );
          }
          if (i === stageIndex) {
            return (
              <div key={i} className="flex items-center gap-3 py-2.5 px-2">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-slate-700 animate-spin shrink-0" />
                <span className="text-sm text-slate-400">{text}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

// ── Step 5: Results ─────────────────────────────────────────────────────────

function ResultsStep({ risks, profile }: { risks: Risk[]; profile: CompanyProfile }) {
  const highCount = risks.filter((r) => r.severity === "HIGH").length;
  const mediumCount = risks.filter((r) => r.severity === "MEDIUM").length;
  const displayName = profile.name || "your company";

  return (
    <div className="w-full max-w-2xl py-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 border border-red-100 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
          {risks.length} compliance risk{risks.length > 1 ? "s" : ""} identified
        </div>

        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
          {highCount > 0 ? "Urgent action required" : "Here's what you need to address"}
        </h2>

        <p className="text-slate-500 leading-relaxed max-w-lg mx-auto">
          {highCount > 0 && (
            <>
              <strong className="text-red-600">
                {highCount} high-severity risk{highCount > 1 ? "s" : ""}
              </strong>{" "}
              for {displayName} require immediate attention.{" "}
            </>
          )}
          {mediumCount > 0 && (
            <>
              {mediumCount} medium-severity risk{mediumCount > 1 ? "s" : ""} need planning before their deadlines.
            </>
          )}
        </p>
      </div>

      {/* Risk cards */}
      <div className="space-y-4 mb-8">
        {risks.map((risk, i) => (
          <div
            key={i}
            className="card"
            style={{
              borderLeft: `4px solid ${risk.severity === "HIGH" ? "#e11d48" : "#f59e0b"}`,
              paddingLeft: "1.25rem",
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`label px-2.5 py-1 rounded-lg ${risk.severity === "HIGH" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    }`}
                >
                  {risk.severity}
                </span>
                <span className="text-xs font-medium text-slate-400">{risk.regulation}</span>
              </div>
              <span className="text-xs text-slate-400 font-medium shrink-0">
                Deadline: <span className="text-slate-700">{risk.deadline}</span>
              </span>
            </div>

            <h3 className="font-semibold text-slate-900 mb-2">{risk.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-3">{risk.description}</p>

            <span className="text-xs bg-slate-100 text-slate-600 rounded-full px-3 py-1 font-medium inline-block">
              {risk.workflowLabel}
            </span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="btn btn-primary btn-lg w-full justify-center"
        >
          Create my compliance plan →
        </Link>
        <button className="btn btn-secondary btn-lg w-full">
          Talk to a compliance expert
        </button>
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        Powered by Complai · Monitoring 40+ AI &amp; automation regulations
      </p>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>("register");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<CompanyProfile>({
    name: "",
    industry: "Technology / SaaS",
    location: "European Union",
    employees: "51–250",
  });
  const [discoveryIndex, setDiscoveryIndex] = useState(0);
  const [profileConfirmed, setProfileConfirmed] = useState(false);
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);
  const [customWorkflows, setCustomWorkflows] = useState<{ id: string; label: string; desc: string }[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStageIndex, setAnalysisStageIndex] = useState(0);
  const [risks, setRisks] = useState<Risk[]>([]);

  // ── Discovery animation ──
  useEffect(() => {
    if (step !== "profile" || discoveryIndex >= DISCOVERY_STEPS.length) return;
    const timer = setTimeout(() => setDiscoveryIndex((i) => i + 1), 700);
    return () => clearTimeout(timer);
  }, [step, discoveryIndex]);

  // When discovery completes, populate name from email domain
  useEffect(() => {
    if (step !== "profile" || discoveryIndex < DISCOVERY_STEPS.length) return;
    const domain = email.split("@")[1] || "";
    const raw = domain.split(".")[0];
    setProfile((p) => ({
      ...p,
      name: raw.charAt(0).toUpperCase() + raw.slice(1),
    }));
    setProfileConfirmed(true);
  }, [step, discoveryIndex, email]);

  // ── Analysis stage ticker (advance one stage every 800ms) ──
  useEffect(() => {
    if (step !== "analyzing") return;
    if (analysisStageIndex >= ANALYSIS_STAGES.length - 1) return;
    const timer = setTimeout(() => {
      setAnalysisStageIndex((i) => i + 1);
    }, 800);
    return () => clearTimeout(timer);
  }, [step, analysisStageIndex]);

  // Also advance progress for transition-to-results trigger
  useEffect(() => {
    if (step !== "analyzing") return;
    const interval = setInterval(() => {
      setAnalysisProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [step]);

  // Transition to results when progress bar is full
  useEffect(() => {
    if (analysisProgress < 100) return;
    const timer = setTimeout(() => {
      setRisks(getRisks(selectedWorkflows));
      setStep("results");
    }, 500);
    return () => clearTimeout(timer);
  }, [analysisProgress, selectedWorkflows]);

  // ── Handlers ──
  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) return;
    setDiscoveryIndex(0);
    setProfileConfirmed(false);
    setStep("profile");
  }

  function handleProfileConfirm() {
    setStep("workflows");
  }

  function toggleWorkflow(id: string) {
    setSelectedWorkflows((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  }

  function handleAddCustomWorkflow(label: string) {
    const id = `custom-${Date.now()}`;
    const newW = { id, label, desc: "Custom workflow" };
    setCustomWorkflows((prev) => [...prev, newW]);
    setSelectedWorkflows((prev) => [...prev, id]);
  }

  function handleAnalyze() {
    if (selectedWorkflows.length === 0) return;
    setAnalysisProgress(0);
    setAnalysisStageIndex(0);
    setStep("analyzing");
  }

  // Progress indicator config
  const showProgress = step === "profile" || step === "workflows";
  const progressValue = step === "profile" ? 50 : 100;
  const progressLabel = step === "profile" ? "1" : "2";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal header */}
      <header className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0">
        <Link href="/" className="font-bold text-xl text-slate-900 tracking-tight">
          Complai
        </Link>

        {showProgress && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">Step {progressLabel} of 2</span>
            <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-800 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressValue}%` }}
              />
            </div>
          </div>
        )}

        {step === "results" && (
          <span className="text-sm text-emerald-600 font-medium flex items-center gap-1.5">
            <IconCheck className="w-3.5 h-3.5" />
            Assessment complete
          </span>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        {step === "register" && (
          <RegisterStep email={email} setEmail={setEmail} onSubmit={handleRegister} />
        )}
        {step === "profile" && (
          <ProfileStep
            discoveryIndex={discoveryIndex}
            profileConfirmed={profileConfirmed}
            profile={profile}
            setProfile={setProfile}
            onConfirm={handleProfileConfirm}
          />
        )}
        {step === "workflows" && (
          <WorkflowsStep
            selected={selectedWorkflows}
            customWorkflows={customWorkflows}
            onToggle={toggleWorkflow}
            onAddCustom={handleAddCustomWorkflow}
            onAnalyze={handleAnalyze}
          />
        )}
        {step === "analyzing" && (
          <AnalyzingStep stageIndex={analysisStageIndex} />
        )}
        {step === "results" && (
          <ResultsStep risks={risks} profile={profile} />
        )}
      </main>
    </div>
  );
}
