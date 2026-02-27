"use client";

import { useState } from "react";
import { client } from "../data";
import { useUpgrade } from "../upgrade-context";

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

const INITIAL_ACTIVE = ["cv-screening"];

function IconCheck({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
    </svg>
  );
}

export default function SystemsPage() {
  const [selected, setSelected] = useState<string[]>(INITIAL_ACTIVE);
  const [saved, setSaved] = useState<string[]>(INITIAL_ACTIVE);
  const [justSaved, setJustSaved] = useState(false);
  const { openUpgrade } = useUpgrade();

  const isDirty = JSON.stringify([...selected].sort()) !== JSON.stringify([...saved].sort());

  function toggle(id: string) {
    if (selected.includes(id)) {
      // Always allow deselecting
      setSelected((prev) => prev.filter((w) => w !== id));
      setJustSaved(false);
    } else {
      // Already have 1 selected — gate
      openUpgrade();
    }
  }

  function handleSave() {
    setSaved(selected);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2500);
  }

  function handleDiscard() {
    setSelected(saved);
    setJustSaved(false);
  }

  const lockedCount = WORKFLOWS.length - 1;

  return (
    <>
      <header className="shrink-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-slate-900">AI Systems in use</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            These systems drive what appears in {client.name}&apos;s compliance feed.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {justSaved && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <IconCheck className="w-3.5 h-3.5" /> Saved
            </span>
          )}
          {isDirty && (
            <>
              <button onClick={handleDiscard} className="text-xs text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 bg-white hover:text-slate-800 transition-colors">
                Discard
              </button>
              <button onClick={handleSave} className="text-xs font-medium text-white bg-slate-900 hover:bg-slate-700 rounded-lg px-3 py-1.5 transition-colors">
                Save changes
              </button>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-5">
        <div className="flex flex-col gap-5">

          {/* Free plan callout */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <span className="text-amber-500 mt-0.5 shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold text-amber-800 mb-0.5">Free plan: 1 AI workflow</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                You can track <strong>1 AI system</strong> on your current plan. Upgrade to track all {WORKFLOWS.length} workflow types and get matched to the right regulations for each one.
              </p>
            </div>
          </div>

          {/* Label + count */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Your AI workflow</p>
            <span className="text-xs text-slate-500">{selected.length} / 1 on free plan</span>
          </div>

          {/* Workflow grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {WORKFLOWS.map((w) => {
              const active = selected.includes(w.id);
              const locked = !active && selected.length >= 1;

              return (
                <button
                  key={w.id}
                  onClick={() => toggle(w.id)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all duration-150 relative ${active
                      ? "border-slate-800 bg-slate-50"
                      : locked
                        ? "border-slate-100 bg-slate-50/50 opacity-60 hover:opacity-80 hover:border-slate-300"
                        : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50"
                    }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className={`font-semibold text-sm mb-0.5 ${active ? "text-slate-900" : "text-slate-600"}`}>
                        {w.label}
                      </p>
                      <p className="text-xs text-slate-400 leading-snug">{w.desc}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${active ? "bg-slate-800" : locked ? "bg-slate-100 border border-slate-300" : "border-2 border-slate-300"
                        }`}
                    >
                      {active && <IconCheck className="w-3 h-3 text-white" />}
                      {locked && <LockIcon className="w-2.5 h-2.5 text-slate-400" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Upgrade CTA */}
          <div
            onClick={openUpgrade}
            className="cursor-pointer bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-6 flex items-center justify-between group hover:shadow-xl transition-all"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 border border-indigo-400/30 rounded-full px-2.5 py-1 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wide">Unlock all workflows</span>
              </div>
              <p className="text-lg font-bold text-white mb-1">
                Track {lockedCount} more AI systems
              </p>
              <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
                Every system you use generates unique compliance obligations. Don&apos;t leave{" "}
                <span className="text-white font-semibold">{lockedCount} workflows unmonitored</span>.
              </p>
              <div className="flex items-center gap-4 mt-4">
                {["Unlimited workflows", "Real-time alerts", "Expert introductions"].map((f) => (
                  <span key={f} className="flex items-center gap-1 text-xs text-slate-300">
                    <IconCheck className="w-3 h-3 text-emerald-400" />
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0 ml-6">
              <div className="bg-white text-slate-900 font-bold text-sm px-5 py-3 rounded-xl group-hover:scale-105 transition-transform shadow-lg">
                Upgrade →
              </div>
              <p className="text-xs text-slate-400 text-center mt-2">14-day free trial</p>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
