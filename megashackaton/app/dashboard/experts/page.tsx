"use client";

import { experts, client } from "../data";
import { useUpgrade } from "../upgrade-context";

function StarRatingBlurred() {
  return (
    <span className="flex items-center gap-0.5 select-none" style={{ filter: "blur(3px)" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3 h-3 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.95 2.704c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.053 9.394c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.951-.69l1.283-3.967z" />
        </svg>
      ))}
    </span>
  );
}

const GRADIENTS = [
  "from-indigo-500 to-indigo-700",
  "from-emerald-500 to-emerald-700",
  "from-violet-500 to-violet-700",
];

export default function ExpertsPage() {
  const available = experts.filter((e) => e.available);
  const waitlisted = experts.filter((e) => !e.available);
  const { openUpgrade } = useUpgrade();

  return (
    <>
      {/* Header */}
      <header className="shrink-0 bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-base font-semibold text-slate-900">Matched expert firms</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Selected for {client.name} based on your open compliance items and AI systems in use.
            </p>
          </div>
          <span className="text-xs font-medium bg-slate-100 text-slate-600 rounded-full px-3 py-1 border border-slate-200">
            {experts.length} firms matched
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-5">
        <div className="flex flex-col gap-5">

          {/* Upgrade banner */}
          <div
            onClick={openUpgrade}
            className="cursor-pointer bg-gradient-to-r from-slate-900 to-indigo-900 rounded-xl p-4 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🔒</span>
              <div>
                <p className="text-sm font-semibold text-white">Expert details are hidden on the free plan</p>
                <p className="text-xs text-slate-300 mt-0.5">Upgrade to see firm names, contact details, ratings and locations.</p>
              </div>
            </div>
            <span className="shrink-0 text-xs font-semibold bg-white text-slate-900 px-3 py-2 rounded-lg group-hover:scale-105 transition-transform">
              Unlock →
            </span>
          </div>

          {/* Context banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 flex gap-3">
            <div className="mt-0.5 text-blue-500 shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-900 mb-0.5">How matching works</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Firms are matched to your open compliance items and the AI systems listed in your profile. The list updates automatically as your compliance feed changes.
              </p>
            </div>
          </div>

          {/* Available firms */}
          {available.length > 0 && (
            <section>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Available now · {available.length}
              </p>
              <div className="flex flex-col gap-3">
                {available.map((expert, i) => (
                  <ExpertCardBlurred key={i} index={i} gradient={GRADIENTS[i % GRADIENTS.length]} onUpgrade={openUpgrade} services={expert.services} />
                ))}
              </div>
            </section>
          )}

          {/* Waitlist firms */}
          {waitlisted.length > 0 && (
            <section>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Waitlist · {waitlisted.length}
              </p>
              <div className="flex flex-col gap-3">
                {waitlisted.map((expert, i) => (
                  <ExpertCardBlurred key={i} index={available.length + i} gradient={GRADIENTS[(available.length + i) % GRADIENTS.length]} onUpgrade={openUpgrade} services={expert.services} available={false} />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </>
  );
}

function ExpertCardBlurred({
  index,
  gradient,
  onUpgrade,
  services,
  available = true,
}: {
  index: number;
  gradient: string;
  onUpgrade: () => void;
  services: string[];
  available?: boolean;
}) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 overflow-hidden transition-shadow hover:shadow-md ${!available ? "opacity-75" : ""}`}>
      {/* Top bar accent */}
      <div className={`h-1 w-full bg-gradient-to-r ${gradient}`} />

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Anonymised avatar */}
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
            <svg className="w-6 h-6 text-white/80" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            {/* Blurred name */}
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <p
                className="text-sm font-semibold text-slate-800 select-none"
                style={{ filter: "blur(6px)" }}
              >
                Expert Firm Name Here
              </p>
              <span className="text-xs text-slate-500 bg-slate-100 rounded-full px-2 py-0.5 font-medium shrink-0">
                Firm #{index + 1}
              </span>
              {available ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Available
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Waitlist
                </span>
              )}
            </div>

            {/* Blurred tagline */}
            <p className="text-xs text-slate-400 mb-2 select-none" style={{ filter: "blur(5px)" }}>
              Specialised compliance advisory firm
            </p>

            {/* Meta row — location + size blurred */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 flex-wrap">
              <span className="flex items-center gap-1 select-none" style={{ filter: "blur(4px)" }}>
                📍 City, Country
              </span>
              <span className="text-slate-200">·</span>
              <span className="flex items-center gap-1 select-none" style={{ filter: "blur(4px)" }}>
                👥 50–200 employees
              </span>
              <span className="text-slate-200">·</span>
              <StarRatingBlurred />
              <span className="font-medium text-slate-600 select-none" style={{ filter: "blur(4px)" }}>4.8</span>
            </div>

            {/* Service tags — visible (describes what they do) */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {services.slice(0, 3).map((s) => (
                <span key={s} className="text-xs bg-slate-50 border border-slate-200 text-slate-600 rounded-md px-2 py-0.5">
                  {s}
                </span>
              ))}
            </div>

            {/* Relevance — blurred */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5 mb-4">
              <p className="text-xs font-medium text-blue-500 mb-0.5">Why matched</p>
              <p className="text-xs text-blue-800 leading-relaxed select-none" style={{ filter: "blur(5px)" }}>
                Matched to your compliance items based on specialisation in AI regulation and GDPR enforcement actions across EU markets.
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={onUpgrade}
              className="text-xs font-semibold bg-slate-900 text-white hover:bg-slate-700 active:scale-95 transition-all px-4 py-2 rounded-lg"
            >
              Unlock & connect →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
