import Link from "next/link";
import { feed, client, experts } from "../../../data";

export default async function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = feed.find((f) => f.id === id);

    if (!item) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-slate-400">Item not found.</p>
            </div>
        );
    }

    // Find experts relevant to this item (simple: all available ones for now)
    const matched = experts.filter((e) => e.available);

    return (
        <>
            {/* Header */}
            <header className="shrink-0 bg-white border-b border-slate-200 px-8 py-4 flex items-center gap-4">
                <Link
                    href="/dashboard/unlimited"
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

            {/* Body — article reading layout */}
            <main className="flex-1 overflow-y-auto px-8 py-8">
                <div className="max-w-2xl">

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-slate-900 leading-snug mb-6">
                        {item.title}
                    </h1>

                    {/* Key meta — clean row */}
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

                    {/* What this means */}
                    <section className="mb-8">
                        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">What this means</h2>
                        <p className="text-sm text-slate-700 leading-relaxed">{item.summary}</p>
                    </section>

                    {/* Why this applies */}
                    <section className="mb-8">
                        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                            Why this applies to {client.name}
                        </h2>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-4">
                            <p className="text-sm text-blue-900 leading-relaxed">{item.why}</p>
                        </div>
                    </section>

                    {/* Action */}
                    {item.status !== "compliant" && (
                        <section className="mb-8 pb-8 border-b border-slate-100">
                            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Recommended action</h2>
                            <button className="bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-700 transition-colors">
                                {item.action}
                            </button>
                        </section>
                    )}

                    {/* Matched experts */}
                    {matched.length > 0 && (
                        <section>
                            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Experts who can help</h2>
                            <div className="flex flex-col gap-2">
                                {matched.map((expert) => (
                                    <div key={expert.name} className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                                {expert.initials}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-800">{expert.name}</p>
                                                <p className="text-xs text-slate-400">{expert.focus}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/dashboard/unlimited/experts"
                                            className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
                                        >
                                            View →
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </main>
        </>
    );
}
