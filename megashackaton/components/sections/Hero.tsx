import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const recentUpdates = [
  { tag: "NEW",    color: "bg-blue-100 text-blue-700",   text: "EU AI Act — Art. 22 obligations for automated HR decisions" },
  { tag: "UPDATE", color: "bg-amber-100 text-amber-700", text: "CCPA Amendment — expanded employee data rights (effective Q1)" },
  { tag: "ALERT",  color: "bg-red-100 text-red-700",     text: "UK Worker Protection Act — AI monitoring disclosure deadline" },
];

export function Hero() {
  return (
    <section className="section bg-white pt-44 pb-24">
      <div className="container-narrow text-center">

        {/* Eyebrow badge */}
        <div className="flex justify-center mb-8">
          <Badge variant="primary">
            ✦ EU AI Act · CCPA · Worker Protection · Updated Daily
          </Badge>
        </div>

        {/* Headline */}
        <h1 className="heading-hero text-slate-900 max-w-3xl mx-auto mb-7">
          Stay ahead of AI &amp;<br className="hidden sm:block" /> automation compliance
        </h1>

        {/* Subtext */}
        <p className="body-lg text-slate-500 max-w-lg mx-auto mb-10">
          Complio monitors every new law, directive, and ruling that affects your
          AI-driven workforce — then connects you to the right experts to act on it.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
          <LinkButton href="/onboarding" variant="primary" size="lg">
            Start your assessment
          </LinkButton>
          <LinkButton href="#features" variant="secondary" size="lg">
            See how it works
          </LinkButton>
        </div>

        {/* Hero image — compliance dashboard mockup */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xl mx-auto max-w-4xl">
          {/* Browser chrome */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <div className="mx-auto bg-white rounded-md px-4 py-1 text-xs text-slate-400 w-48">
              app.complio.com
            </div>
          </div>

          {/* Fake dashboard content */}
          <div className="bg-slate-50 p-6 grid grid-cols-3 gap-4">
            {/* Sidebar */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-3">
              <div className="h-3 w-20 bg-blue-600 rounded-full" />
              {["Dashboard", "Regulations", "Partners", "Alerts", "Settings"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <div className="h-2 rounded-full bg-slate-100 flex-1" />
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="col-span-2 flex flex-col gap-4">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Active Regulations", value: "24" },
                  { label: "New This Week",       value: "3"  },
                  { label: "Compliance Score",    value: "91%" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-3">
                    <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                    <p className="text-base font-semibold text-slate-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent updates list */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2.5">
                <p className="text-xs font-semibold text-slate-500 mb-1">Recent Updates</p>
                {recentUpdates.map((u) => (
                  <div key={u.text} className="flex items-start gap-2.5">
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-md shrink-0 ${u.color}`}>
                      {u.tag}
                    </span>
                    <p className="text-xs text-slate-600 leading-snug text-left">{u.text}</p>
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
