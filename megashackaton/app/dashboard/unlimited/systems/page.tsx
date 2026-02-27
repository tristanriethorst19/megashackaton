"use client";

import { useState } from "react";
import { client } from "../../data";

// ── Workflow catalogue ────────────────────────────────────────────────────────

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

// Map the client's existing aiSystems strings to workflow IDs
const INITIAL_ACTIVE: string[] = (() => {
    const mapping: Record<string, string> = {
        "Automated CV screening (Workday AI)": "cv-screening",
        "AI performance monitoring": "performance-monitoring",
        "Payroll automation": "payroll-automation",
        "HR chatbot (internal)": "support-chatbot",
    };
    return client.aiSystems.map((s) => mapping[s]).filter(Boolean) as string[];
})();

// ── Icon helpers ──────────────────────────────────────────────────────────────

function IconCheck({ className = "w-3 h-3" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IconPlus({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function IconX({ className = "w-3 h-3" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SystemsPage() {
    const [selected, setSelected] = useState<string[]>(INITIAL_ACTIVE);
    const [saved, setSaved] = useState<string[]>(INITIAL_ACTIVE);
    const [justSaved, setJustSaved] = useState(false);

    // Custom workflows (freeform, not in the preset catalogue)
    const [customWorkflows, setCustomWorkflows] = useState<{ id: string; label: string }[]>([]);
    const [customInput, setCustomInput] = useState("");

    const isDirty =
        JSON.stringify([...selected].sort()) !== JSON.stringify([...saved].sort()) ||
        customWorkflows.some((cw) => !saved.includes(cw.id));

    function toggle(id: string) {
        setSelected((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]));
        setJustSaved(false);
    }

    function handleSave() {
        // Ensure all custom workflows that are toggled on are included
        setSaved(selected);
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2500);
    }

    function handleDiscard() {
        // Remove custom workflows that were never saved
        setCustomWorkflows((prev) => prev.filter((cw) => saved.includes(cw.id)));
        setSelected(saved);
        setJustSaved(false);
    }

    function handleAddCustom(e: React.FormEvent) {
        e.preventDefault();
        const label = customInput.trim();
        if (!label) return;
        const id = `custom-${Date.now()}`;
        setCustomWorkflows((prev) => [...prev, { id, label }]);
        setSelected((prev) => [...prev, id]);
        setCustomInput("");
        setJustSaved(false);
    }

    function removeCustom(id: string) {
        setCustomWorkflows((prev) => prev.filter((cw) => cw.id !== id));
        setSelected((prev) => prev.filter((w) => w !== id));
    }

    return (
        <>
            <header className="shrink-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-base font-semibold text-slate-900">AI Systems in use</h1>
                    <p className="text-xs text-slate-400 mt-0.5">
                        These systems drive what appears in {client.name}&apos;s compliance feed.
                    </p>
                </div>

                {/* Save / discard controls */}
                <div className="flex items-center gap-2">
                    {justSaved && (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                            <IconCheck className="w-3.5 h-3.5" />
                            Saved
                        </span>
                    )}
                    {isDirty && (
                        <>
                            <button
                                onClick={handleDiscard}
                                className="text-xs text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg px-3 py-1.5 bg-white transition-colors"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleSave}
                                className="text-xs font-medium text-white bg-slate-900 hover:bg-slate-700 rounded-lg px-3 py-1.5 transition-colors"
                            >
                                Save changes
                            </button>
                        </>
                    )}
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-6 py-5">
                <div className="flex flex-col gap-5">

                    {/* Info banner */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-xs font-semibold text-blue-800 mb-1">Why this list matters</p>
                        <p className="text-xs text-blue-700 leading-relaxed">
                            Every regulation in your feed was matched because of one or more of these systems.
                            Keeping this list accurate ensures you never miss a relevant update — and never see noise that doesn&apos;t apply to you.
                        </p>
                    </div>

                    {/* Label + count */}
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                            Select all AI workflows your company uses
                        </p>
                        <span className="text-xs text-slate-500">{selected.length} active</span>
                    </div>

                    {/* Preset workflow grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {WORKFLOWS.map((w) => {
                            const active = selected.includes(w.id);
                            return (
                                <button
                                    key={w.id}
                                    onClick={() => toggle(w.id)}
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
                    </div>

                    {/* ── Custom workflows ───────────────────────────────────────── */}
                    <div className="border-t border-slate-100 pt-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                Custom workflows
                            </p>
                            {customWorkflows.length > 0 && (
                                <span className="text-xs text-slate-400">{customWorkflows.length} added</span>
                            )}
                        </div>
                        <p className="text-xs text-slate-500 -mt-1">
                            Don&apos;t see your workflow above? Add it here so it can be matched against relevant regulations.
                        </p>

                        {/* Existing custom cards */}
                        {customWorkflows.length > 0 && (
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                {customWorkflows.map((cw) => (
                                    <div
                                        key={cw.id}
                                        className="relative text-left p-4 rounded-2xl border-2 border-slate-800 bg-slate-50 flex items-start justify-between gap-2 group"
                                    >
                                        <div className="min-w-0">
                                            <p className="font-semibold text-sm text-slate-900 mb-0.5">{cw.label}</p>
                                            <p className="text-xs text-slate-400 leading-snug">Custom workflow</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1 shrink-0">
                                            <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center">
                                                <IconCheck className="w-3 h-3 text-white" />
                                            </div>
                                            <button
                                                onClick={() => removeCustom(cw.id)}
                                                className="text-slate-300 hover:text-red-500 transition-colors mt-1"
                                                title="Remove"
                                            >
                                                <IconX className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add custom workflow form */}
                        <form onSubmit={handleAddCustom} className="flex items-center gap-2 max-w-lg">
                            <input
                                type="text"
                                value={customInput}
                                onChange={(e) => setCustomInput(e.target.value)}
                                placeholder="e.g. AI-assisted loan underwriting"
                                className="flex-1 text-sm border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent bg-white transition"
                            />
                            <button
                                type="submit"
                                disabled={!customInput.trim()}
                                className="flex items-center gap-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl px-4 py-2.5 transition-colors shrink-0"
                            >
                                <IconPlus className="w-3.5 h-3.5" />
                                Add workflow
                            </button>
                        </form>
                    </div>

                    {/* Bottom save bar */}
                    {isDirty && (
                        <div className="flex items-center justify-between bg-slate-900 text-white rounded-xl px-5 py-3.5">
                            <p className="text-sm font-medium">
                                {selected.length} workflow{selected.length !== 1 ? "s" : ""} selected
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleDiscard}
                                    className="text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5"
                                >
                                    Discard
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="text-xs font-semibold bg-white text-slate-900 hover:bg-slate-100 rounded-lg px-4 py-1.5 transition-colors"
                                >
                                    Save & update feed →
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </>
    );
}
