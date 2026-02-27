import { LinkButton } from "@/components/ui/Button";

const plans = [
    {
        icon: "🔓",
        name: "Free",
        subtitle: "Exposure Layer",
        price: "€0",
        period: null,
        desc: "Understand your regulatory exposure before committing.",
        cta: "Start Free Scan",
        href: "/onboarding",
        ctaVariant: "ghost" as const,
        highlight: false,
        features: [
            "Website scan",
            "AI/automation niche classification",
            "1 workflow submission",
            "Basic EU AI Act exposure summary",
        ],
    },
    {
        icon: "🟢",
        name: "Starter",
        subtitle: null,
        price: "€149",
        period: "/ mo",
        desc: "For early-stage FinTech startups with 1–2 AI use cases.",
        cta: "Get Started",
        href: "/onboarding",
        ctaVariant: "ghost" as const,
        highlight: false,
        features: [
            "Monitor 1 workflow",
            "EU AI Act tracking with article mapping",
            "1 jurisdiction",
            "Impact score",
            "Basic obligation overview",
            "2 team members",
            "Expert marketplace access",
        ],
    },
    {
        icon: "🟣",
        name: "Growth",
        subtitle: null,
        price: "€449",
        period: "/ mo",
        desc: "For AI SaaS, payments, and credit scale-ups with multiple AI use cases.",
        cta: "Choose Growth",
        href: "/onboarding",
        ctaVariant: "primary" as const,
        highlight: true,
        features: [
            "Up to 5 workflows",
            "3 jurisdictions",
            "Article-level legal mapping",
            "Compliance dashboard",
            "Risk evolution timeline",
            "Exportable compliance brief",
            "5 team members",
        ],
    },
    {
        icon: "🏢",
        name: "Enterprise",
        subtitle: null,
        price: "€2,000+",
        period: "/ mo",
        desc: "For banks, multi-product AI vendors, and regulated corporates.",
        cta: "Contact Sales",
        href: "/onboarding",
        ctaVariant: "ghost" as const,
        highlight: false,
        features: [
            "Unlimited workflows",
            "Custom jurisdictions",
            "Dedicated onboarding",
            "Custom reporting layer",
            "Advanced compliance support",
            "Custom team size",
        ],
    },
];

function Check() {
    return (
        <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function Pricing() {
    return (
        <section id="pricing" className="section bg-slate-950 py-24">
            <div className="container-narrow">

                {/* Header */}
                <div className="text-center mb-14">
                    <p className="label text-slate-500 mb-3">Pricing</p>
                    <h2 className="text-3xl font-bold text-white mb-3">
                        Simple,{" "}
                        <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                            transparent
                        </span>{" "}
                        pricing
                    </h2>
                    <p className="text-slate-400 max-w-md mx-auto">
                        Start free. Scale as your compliance needs grow.
                        No hidden fees, no surprises from regulators.
                    </p>
                </div>

                {/* Plans */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-2xl p-6 flex flex-col border transition-all ${plan.highlight
                                    ? "bg-slate-800 border-indigo-500 shadow-xl shadow-indigo-900/40"
                                    : "bg-slate-900 border-slate-700/60"
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="flex items-center gap-1 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                                        ✦ Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Header */}
                            <div className="mb-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-lg">{plan.icon}</span>
                                    <div>
                                        <p className="text-white font-bold text-sm leading-tight">{plan.name}</p>
                                        {plan.subtitle && <p className="text-slate-400 text-xs">{plan.subtitle}</p>}
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                                    {plan.period && <span className="text-slate-400 text-xs">{plan.period}</span>}
                                </div>
                                <p className="text-slate-400 text-xs leading-snug">{plan.desc}</p>
                            </div>

                            {/* Features */}
                            <ul className="flex flex-col gap-2 mb-6 flex-1">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2">
                                        <Check />
                                        <span className="text-xs text-slate-300 leading-snug">{f}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <LinkButton
                                href={plan.href}
                                variant={plan.ctaVariant}
                                size="sm"
                                className={`w-full justify-center rounded-xl ${plan.highlight
                                        ? ""
                                        : "border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                {plan.cta}
                            </LinkButton>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
