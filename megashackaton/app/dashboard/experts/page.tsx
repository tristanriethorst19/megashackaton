import { experts, client } from "../data";

export default function ExpertsPage() {
  return (
    <>
      {/* Header */}
      <header className="shrink-0 bg-white border-b border-slate-200 px-6 py-4">
        <h1 className="text-base font-semibold text-slate-900">Matched experts</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Selected based on {client.name}'s open items and AI systems in use.
        </p>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-5">
        <div className="max-w-2xl flex flex-col gap-4">

          {/* Context note */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-blue-800 mb-1">How matching works</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              Experts are matched to your open compliance items and the AI systems you've listed in your profile.
              As your feed changes, so does this list.
            </p>
          </div>

          {/* Expert cards */}
          {experts.map((expert) => (
            <div key={expert.name} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {expert.initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-slate-900">{expert.name}</p>
                    {expert.available ? (
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                        Available
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-slate-400 bg-slate-50 border border-slate-200 rounded-full px-2 py-0.5">
                        Waitlist
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-0.5">{expert.role}</p>
                  <p className="text-xs text-slate-400 mb-3">{expert.location} · {expert.focus}</p>

                  {/* Why matched */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 mb-3">
                    <p className="text-xs font-medium text-slate-400 mb-0.5">Why matched</p>
                    <p className="text-xs text-slate-700">{expert.relevance}</p>
                  </div>

                  <button
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                      expert.available
                        ? "bg-slate-900 text-white hover:bg-slate-700"
                        : "bg-slate-100 text-slate-500 cursor-not-allowed"
                    }`}
                    disabled={!expert.available}
                  >
                    {expert.available ? "Request introduction" : "Join waitlist"}
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </main>
    </>
  );
}
