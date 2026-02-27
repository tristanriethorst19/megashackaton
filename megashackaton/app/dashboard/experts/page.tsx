import { experts, client } from "../data";

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full;
        const isHalf = !filled && i === full && half;
        return (
          <svg
            key={i}
            className={`w-3 h-3 ${filled
              ? "text-amber-400"
              : isHalf
                ? "text-amber-300"
                : "text-slate-200"
              }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.95 2.704c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.053 9.394c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.951-.69l1.283-3.967z" />
          </svg>
        );
      })}
    </span>
  );
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  "H&P": { bg: "bg-indigo-600", text: "text-white", border: "border-indigo-700" },
  DS: { bg: "bg-emerald-600", text: "text-white", border: "border-emerald-700" },
  AX: { bg: "bg-violet-600", text: "text-white", border: "border-violet-700" },
};

export default function ExpertsPage() {
  const available = experts.filter((e) => e.available);
  const waitlisted = experts.filter((e) => !e.available);

  return (
    <>
      {/* Header */}
      <header className="shrink-0 bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-base font-semibold text-slate-900">
              Matched expert firms
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Selected for {client.name} based on your open compliance items and
              AI systems in use.
            </p>
          </div>
          <span className="text-xs font-medium bg-slate-100 text-slate-600 rounded-full px-3 py-1 border border-slate-200">
            {experts.length} firms matched
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-5">
        <div className="flex flex-col gap-5">

          {/* Context banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 flex gap-3">
            <div className="mt-0.5 text-blue-500 shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-900 mb-0.5">
                How matching works
              </p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Firms are matched to your open compliance items and the AI
                systems listed in your profile. The list updates automatically
                as your compliance feed changes.
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
                {available.map((expert) => (
                  <ExpertCard key={expert.name} expert={expert} />
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
                {waitlisted.map((expert) => (
                  <ExpertCard key={expert.name} expert={expert} />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </>
  );
}

function ExpertCard({
  expert,
}: {
  expert: (typeof experts)[number];
}) {
  const color = colorMap[expert.initials] ?? {
    bg: "bg-slate-800",
    text: "text-white",
    border: "border-slate-900",
  };

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 overflow-hidden transition-shadow hover:shadow-md ${!expert.available ? "opacity-75" : ""
        }`}
    >
      {/* Top bar accent */}
      <div className={`h-1 w-full ${color.bg}`} />

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Logo / initials */}
          <div
            className={`w-12 h-12 rounded-xl ${color.bg} ${color.border} border flex items-center justify-center text-xs font-bold ${color.text} shrink-0 tracking-tight`}
          >
            {expert.initials}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Name + availability */}
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <p className="text-sm font-semibold text-slate-900">
                {expert.name}
              </p>
              {expert.available ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Available
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
                  Waitlist
                </span>
              )}
            </div>

            {/* Tagline */}
            <p className="text-xs text-slate-500 mb-1">{expert.tagline}</p>

            {/* Meta row */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 flex-wrap">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                </svg>
                {expert.location}
              </span>
              <span className="text-slate-200">·</span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 17a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
                </svg>
                {expert.size}
              </span>
              <span className="text-slate-200">·</span>
              <span className="flex items-center gap-1">
                <StarRating rating={expert.rating} />
                <span className="font-medium text-slate-600">{expert.rating}</span>
                <span className="text-slate-400">({expert.reviewCount})</span>
              </span>
            </div>

            {/* Service tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {expert.services.map((s) => (
                <span
                  key={s}
                  className="text-xs bg-slate-50 border border-slate-200 text-slate-600 rounded-md px-2 py-0.5"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Why matched */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5 mb-4">
              <p className="text-xs font-medium text-blue-500 mb-0.5 flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v.258a33.186 33.186 0 016.668 2.878.75.75 0 11-.736 1.302 31.742 31.742 0 00-1.107-.5 16.81 16.81 0 01-.48 4.432c.904.694 1.551 1.612 1.551 2.748a.75.75 0 01-1.5 0c0-.617-.432-1.213-1.154-1.772a16.823 16.823 0 01-3.751 4.655.75.75 0 01-.99-1.126 15.323 15.323 0 003.38-4.21c-.354-.149-.726-.283-1.113-.402a.75.75 0 01.491-1.419c.473.163.924.356 1.349.574a15.32 15.32 0 00.37-3.893 31.6 31.6 0 00-3.75-.988v.66a.75.75 0 01-1.5 0V5.5a.75.75 0 01.75-.75zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Why matched
              </p>
              <p className="text-xs text-blue-800 leading-relaxed">
                {expert.relevance}
              </p>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2">
              <button
                className={`text-xs font-medium px-4 py-2 rounded-lg transition-all ${expert.available
                  ? "bg-slate-900 text-white hover:bg-slate-700 active:scale-95"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                disabled={!expert.available}
              >
                {expert.available ? "Request introduction" : "Join waitlist"}
              </button>
              {expert.available && (
                <button className="text-xs font-medium px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all active:scale-95">
                  View profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
