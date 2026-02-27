"use client";

import Link from "next/link";
import { feed, client, experts } from "../../data";
import { useUpgrade } from "../../upgrade-context";
import { use } from "react";

function LockIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
    </svg>
  );
}

function BlurredBlock({ lines = 3, wide = false }: { lines?: number; wide?: boolean }) {
  return (
    <div className={`relative ${wide ? "w-full" : "max-w-xl"} rounded-xl overflow-hidden`}>
      <div className="select-none pointer-events-none" aria-hidden>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-4 mb-2 rounded-full bg-slate-200"
            style={{ width: i === lines - 1 ? "60%" : "100%", filter: "blur(6px)" }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-3 py-1.5 shadow-sm">
          <LockIcon /> Upgrade to read
        </span>
      </div>
    </div>
  );
}

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const item = feed.find((f) => f.id === id);
  const { openUpgrade } = useUpgrade();

  if (!item) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-slate-400">Item not found.</p>
      </div>
    );
  }

  const matched = experts.filter((e) => e.available);

  return (
    <>
      {/* Header */}
      <header className="shrink-0 bg-white border-b border-slate-200 px-8 py-4 flex items-center gap-4">
        <Link
          href="/dashboard"
          className="text-xs text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1.5"
        >
          ← Back to feed
        </Link>
        <span className="text-slate-200">|</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${item.typeClass}`}>
          {item.type}
        </span>
        <span className="text-xs text-slate-400">{item.jurisdiction}</span>
      </header>

      {/* Body */}
      <main className="flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-2xl">

          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-900 leading-snug mb-6">
            {item.title}
          </h1>

          {/* Key meta — visible */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 pb-8 border-b border-slate-100">
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Status</p>
              <p className="text-sm font-medium text-slate-800 capitalize">{item.status.replace("-", " ")}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Effective</p>
              <p className="text-sm font-medium text-slate-800">{item.effective}</p>
            </div>
            {item.daysLeft && (
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Deadline</p>
                <p className="text-sm font-semibold text-red-600">{item.daysLeft} days left</p>
              </div>
            )}
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Jurisdiction</p>
              <p className="text-sm font-medium text-slate-800">{item.jurisdiction}</p>
            </div>
          </div>

          {/* What this means — blurred body */}
          <section className="mb-8">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">What this means</h2>
            {/* Show just the first sentence, blur the rest */}
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              {item.summary.split(".")[0]}.
            </p>
            <BlurredBlock lines={3} />
          </section>

          {/* Why this applies — fully blurred */}
          <section className="mb-8">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
              Why this applies to {client.name}
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-4">
              <BlurredBlock lines={2} />
            </div>
          </section>

          {/* Action — blurred */}
          {item.status !== "compliant" && (
            <section className="mb-8 pb-8 border-b border-slate-100">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Recommended action</h2>
              <div className="relative inline-block">
                <button
                  className="bg-slate-200 text-transparent text-sm font-medium px-4 py-2.5 rounded-lg cursor-not-allowed select-none"
                  style={{ filter: "blur(4px)" }}
                  disabled
                >
                  {item.action}
                </button>
                <button
                  onClick={openUpgrade}
                  className="absolute inset-0 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 bg-white/70 backdrop-blur-sm rounded-lg border border-slate-200 hover:bg-white transition-all"
                >
                  <LockIcon /> Unlock action plan
                </button>
              </div>
            </section>
          )}

          {/* ── Solve section ─────────────────────────────── */}
          {matched.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Solve this issue</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {matched.length} verified firm{matched.length !== 1 ? "s" : ""} matched to this regulation
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Available now
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {matched.map((expert, i) => (
                  <div
                    key={expert.name}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-4 flex items-center justify-between group hover:border-slate-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3">
                      {/* Anonymised avatar */}
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                        </svg>
                      </div>
                      <div>
                        {/* Blurred firm name */}
                        <div className="flex items-center gap-2">
                          <span
                            className="text-sm font-semibold text-slate-800 select-none"
                            style={{ filter: "blur(5px)" }}
                          >
                            {expert.name}
                          </span>
                          <span className="text-xs text-slate-400 bg-slate-100 rounded px-1.5 py-0.5">
                            Expert firm #{i + 1}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">Specialises in {item.type} compliance</p>
                      </div>
                    </div>
                    <button
                      onClick={openUpgrade}
                      className="flex items-center gap-1.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-700 active:scale-95 transition-all px-3 py-2 rounded-lg shrink-0"
                    >
                      Solve →
                    </button>
                  </div>
                ))}
              </div>

              {/* Upgrade nudge */}
              <div
                className="mt-4 bg-gradient-to-r from-slate-900 to-indigo-900 rounded-xl px-5 py-4 flex items-center justify-between cursor-pointer group"
                onClick={openUpgrade}
              >
                <div>
                  <p className="text-sm font-semibold text-white">Unlock expert details</p>
                  <p className="text-xs text-slate-400 mt-0.5">See firm names, ratings & contact specialists directly</p>
                </div>
                <span className="text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-2 transition-all group-hover:scale-105">
                  Upgrade →
                </span>
              </div>
            </section>
          )}

        </div>
      </main>
    </>
  );
}
