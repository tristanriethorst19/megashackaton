import { client, feed } from "./data";
import type { FeedStatus } from "./data";

const accentClass: Record<FeedStatus, string> = {
  "action-required": "bg-red-400",
  "in-review":       "bg-amber-400",
  "compliant":       "bg-emerald-400",
};

const actionButtonClass: Record<FeedStatus, string> = {
  "action-required": "bg-slate-900 text-white hover:bg-slate-700",
  "in-review":       "bg-slate-100 text-slate-700 hover:bg-slate-200",
  "compliant":       "bg-slate-100 text-slate-500 hover:bg-slate-200",
};

function StatusChip({ status }: { status: FeedStatus }) {
  if (status === "compliant")
    return <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />Compliant</span>;
  if (status === "in-review")
    return <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />In review</span>;
  return <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600"><span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />Action required</span>;
}

export default function FeedPage() {
  const requireAction = feed.filter((f) => f.status === "action-required").length;
  const inReview      = feed.filter((f) => f.status === "in-review").length;
  const compliant     = feed.filter((f) => f.status === "compliant").length;

  return (
    <>
      {/* Header */}
      <header className="shrink-0 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-slate-900">{client.name} — Compliance Feed</h1>
          <p className="text-xs text-slate-400 mt-0.5">European Union · Updated just now</p>
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="9" r="6" /><line x1="14" y1="14" x2="18" y2="18" />
          </svg>
          <input
            type="text"
            placeholder="Search your feed…"
            className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 w-48"
          />
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 overflow-y-auto px-8 py-6">

        {/* Inline stats strip */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-semibold text-red-600">{requireAction} require action</span>
            <span className="text-slate-300">·</span>
            <span className="font-semibold text-amber-600">{inReview} in review</span>
            <span className="text-slate-300">·</span>
            <span className="font-semibold text-emerald-600">{compliant} compliant</span>
          </div>
          <span className="text-xs text-slate-400">{feed.length} items matched for {client.locations[0]}</span>
        </div>

        {/* Feed — unified container, article-list style */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 mb-8">
          {feed.map((item) => (
            <div
              key={item.id}
              className={`flex group transition-colors cursor-pointer ${
                item.status === "compliant" ? "hover:bg-slate-50/60" : "hover:bg-slate-50"
              }`}
            >
              {/* Left accent bar — color signals urgency at a glance */}
              <div className={`w-[3px] shrink-0 ${accentClass[item.status]} ${item.status === "compliant" ? "opacity-40" : ""}`} />

              {/* Content */}
              <div className={`flex-1 px-7 py-6 ${item.status === "compliant" ? "opacity-70" : ""}`}>

                {/* Row 1: type badge + meta + status chip */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${item.typeClass}`}>
                      {item.type}
                    </span>
                    <span className="text-xs text-slate-400">{item.jurisdiction}</span>
                    {item.daysLeft && (
                      <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                        {item.daysLeft} days left
                      </span>
                    )}
                  </div>
                  <StatusChip status={item.status} />
                </div>

                {/* Title — article-sized */}
                <h3 className="text-base font-semibold text-slate-900 leading-snug mb-2">
                  {item.title}
                </h3>

                {/* Summary — 2 lines max, click to read more */}
                <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">
                  {item.summary}
                </p>

                {/* Matched because — personalization signal, inline and subtle */}
                <p className="text-xs text-slate-400 mb-5">
                  <span className="font-medium text-slate-500">Matched because:</span>{" "}
                  {item.whyShort}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Effective {item.effective}</span>
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
                      Full details →
                    </button>
                    <button
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${actionButtonClass[item.status]}`}
                    >
                      {item.action}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How we filter — single quiet line at the bottom */}
        <p className="text-xs text-slate-400 leading-relaxed">
          <span className="font-medium text-slate-500">How we filter:</span>{" "}
          We match against your jurisdictions ({client.locations.join(", ")}), AI systems in use, and industry across 200+ regulatory sources monitored daily — EU Official Journal, member state transpositions, agency guidance, and court rulings.
        </p>

      </main>
    </>
  );
}
