import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const recentUpdates = [
  { tag: "NEW", color: "bg-slate-700 text-slate-100", text: "EU AI Act — Art. 22 high-risk classification for AI credit scoring models" },
  { tag: "UPDATE", color: "bg-slate-600 text-slate-200", text: "DORA — ICT risk management obligations now apply to AI-driven trading systems" },
  { tag: "ALERT", color: "bg-red-900 text-red-200", text: "MiCA — crypto-asset AI tools face new disclosure deadline next quarter" },
];

export function Hero() {
  return (
    <section className="section bg-slate-950 pb-24" style={{ paddingTop: "9rem" }}>
      <div className="container-narrow text-center">

        {/* Eyebrow badge */}
        <div className="flex justify-center mb-8">
          <Badge variant="primary">
            ✦ EU AI Act · MiCA · DORA · Basel AI · Updated Daily
          </Badge>
        </div>

        {/* Headline */}
        <h1 className="heading-1 text-white max-w-3xl mx-auto mb-7">
          AI compliance built for<br className="hidden sm:block" /> FinTech companies
        </h1>

        {/* Subtext */}
        <p className="body-lg text-slate-400 max-w-lg mx-auto mb-10">
          Complai tracks every regulation that affects your credit scoring models,
          fraud detection systems, and algorithmic trading — then connects you to
          the right experts before regulators come knocking.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
          <LinkButton href="/onboarding" variant="primary" size="lg" className="bg-white text-slate-900 border-white hover:bg-slate-100 hover:border-slate-100">
            Start onboarding
          </LinkButton>
          <LinkButton href="/dashboard" size="lg" className="btn btn-lg text-slate-300 border border-slate-700 hover:bg-slate-800 rounded-full">
            Go to Dashboard →
          </LinkButton>
        </div>

        {/* Hero image — compliance dashboard mockup */}
        <div className="rounded-2xl border border-slate-700 overflow-hidden shadow-2xl mx-auto max-w-4xl">
          {/* Browser chrome */}
          <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-600" />
            <span className="w-3 h-3 rounded-full bg-slate-600" />
            <span className="w-3 h-3 rounded-full bg-slate-600" />
            <div className="mx-auto bg-slate-700 rounded-md px-4 py-1 text-xs text-slate-400 w-48">
              app.complai.com
            </div>
          </div>

          {/* Fake dashboard content */}
          <div className="bg-slate-900 p-6 grid grid-cols-3 gap-4">
            {/* Sidebar */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 flex flex-col gap-3">
              <div className="h-3 w-20 bg-slate-400 rounded-full" />
              {["Dashboard", "Regulations", "Partners", "Alerts", "Settings"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="h-2 rounded-full bg-slate-700 flex-1" />
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="col-span-2 flex flex-col gap-4">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Active Regulations", value: "24" },
                  { label: "New This Week", value: "3" },
                  { label: "Compliance Score", value: "91%" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-slate-800 rounded-xl border border-slate-700 p-3">
                    <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                    <p className="text-base font-semibold text-slate-100">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent updates list */}
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 flex flex-col gap-2.5">
                <p className="text-xs font-semibold text-slate-500 mb-1">Recent Updates</p>
                {recentUpdates.map((u) => (
                  <div key={u.text} className="flex items-start gap-2.5">
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-md shrink-0 ${u.color}`}>
                      {u.tag}
                    </span>
                    <p className="text-xs text-slate-400 leading-snug text-left">{u.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
