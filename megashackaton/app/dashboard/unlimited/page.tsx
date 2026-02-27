import Link from "next/link";
import { client, feed } from "../data";
import type { FeedItem, FeedStatus } from "../data";

const accentClass: Record<FeedStatus, string> = {
    "action-required": "bg-red-400",
    "in-review": "bg-amber-400",
    "compliant": "bg-emerald-400",
};

const groups: { status: FeedStatus; label: string; labelClass: string; dotClass: string }[] = [
    { status: "action-required", label: "Action required", labelClass: "text-red-600", dotClass: "bg-red-400" },
    { status: "in-review", label: "In review", labelClass: "text-amber-600", dotClass: "bg-amber-400" },
    { status: "compliant", label: "Compliant", labelClass: "text-slate-400", dotClass: "bg-emerald-400" },
];

function FeedCard({ item }: { item: FeedItem }) {
    return (
        <Link href={`/dashboard/unlimited/item/${item.id}`} className="block group">
            <div className={`flex bg-white rounded-xl border overflow-hidden transition-shadow group-hover:shadow-md ${item.status === "action-required" ? "border-red-200" : "border-slate-200"
                }`}>
                {/* Left accent */}
                <div className={`w-[3px] shrink-0 ${accentClass[item.status]}`} />

                {/* Content */}
                <div className="flex-1 px-5 py-4">
                    {/* Type + urgency — only what's essential */}
                    <div className="flex items-center gap-2 mb-2.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${item.typeClass}`}>
                            {item.type}
                        </span>
                        {item.daysLeft && (
                            <span className="text-xs font-bold text-red-600">
                                {item.daysLeft} days left
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-1.5">
                        {item.title}
                    </h3>

                    {/* One-line teaser */}
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {item.summary}
                    </p>
                </div>

                {/* Right: arrow affordance */}
                <div className="flex items-center pr-4 pl-2 text-slate-300 group-hover:text-slate-500 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}

export default function FeedPage() {
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

                {/* Priority groups */}
                <div className="flex flex-col gap-8 max-w-2xl">
                    {groups.map(({ status, label, labelClass, dotClass }) => {
                        const items = feed.filter((f) => f.status === status);
                        if (items.length === 0) return null;
                        return (
                            <section key={status}>
                                {/* Group heading */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`w-2 h-2 rounded-full shrink-0 ${dotClass}`} />
                                    <h2 className={`text-xs font-semibold uppercase tracking-wide ${labelClass}`}>
                                        {label}
                                    </h2>
                                    <span className="text-xs text-slate-300 font-normal">{items.length}</span>
                                </div>

                                {/* Cards */}
                                <div className="flex flex-col gap-2">
                                    {items.map((item) => (
                                        <FeedCard key={item.id} item={item} />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* How we filter — quiet note at the bottom */}
                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl mt-10">
                    <span className="font-medium text-slate-500">How we filter:</span>{" "}
                    Matched against your jurisdictions ({client.locations.join(", ")}), AI systems in use, and industry across 200+ regulatory sources monitored daily.
                </p>

            </main>
        </>
    );
}
