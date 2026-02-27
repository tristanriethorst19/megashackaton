"use client";

import { useUpgrade, Plan } from "./upgrade-context";
import { useEffect, useState, FormEvent } from "react";

const PLANS = [
    {
        id: "free",
        icon: "🔓",
        name: "Free",
        subtitle: "Exposure Layer",
        price: "€0",
        period: null,
        desc: "Voor bedrijven die willen begrijpen waar ze staan.",
        cta: "Start Free Scan",
        ctaAction: "close" as const,
        ctaStyle: "border border-slate-600 text-white hover:bg-slate-700",
        highlight: false,
        features: [
            "Website scan",
            "AI/automation niche classification",
            "1 workflow submission",
            "Basic EU AI Act exposure summary",
        ],
    },
    {
        id: "starter",
        icon: "🟢",
        name: "Starter",
        subtitle: null,
        price: "€149",
        period: "/ maand",
        desc: "Voor early-stage AI startups met 1–2 use cases.",
        cta: "Get Started",
        ctaAction: "pay" as const,
        ctaStyle: "border border-slate-600 text-white hover:bg-slate-700",
        highlight: false,
        features: [
            "Monitoring van 1 workflow",
            "EU AI Act tracking (incl. mapping naar relevante artikelen)",
            "1 jurisdiction",
            "Impact score",
            "Basic obligation overview",
            "2 gebruikers",
            "Toegang tot expert marketplace",
        ],
    },
    {
        id: "growth",
        icon: "🟣",
        name: "Growth",
        subtitle: null,
        price: "€449",
        period: "/ maand",
        desc: "Voor AI SaaS, HR tech en scale-ups met meerdere AI use cases.",
        cta: "Choose Growth",
        ctaAction: "pay" as const,
        ctaStyle: "bg-indigo-500 hover:bg-indigo-400 text-white",
        highlight: true,
        features: [
            "Tot 5 workflows",
            "3 jurisdictions",
            "Article-level legal mapping",
            "Compliance dashboard",
            "Risk evolution timeline",
            "Exportable compliance brief",
            "5 gebruikers",
        ],
    },
    {
        id: "enterprise",
        icon: "🏢",
        name: "Enterprise",
        subtitle: null,
        price: "€2.000+",
        period: "/ maand",
        desc: "Voor corporates en multi-product AI vendors.",
        cta: "Contact Sales",
        ctaAction: "contact" as const,
        ctaStyle: "border border-slate-600 text-white hover:bg-slate-700",
        highlight: false,
        features: [
            "Unlimited workflows",
            "Custom jurisdictions",
            "Dedicated onboarding",
            "Custom reporting layer",
            "Advanced compliance support",
            "Custom user limits",
        ],
    },
];

function CheckIcon() {
    return (
        <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function Spinner() {
    return (
        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
    );
}

/* ── Payment form (step 2) ── */
function PaymentForm({ plan, onBack }: { plan: Plan; onBack: () => void }) {
    const { closeUpgrade } = useUpgrade();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch("/api/mollie/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, planId: plan.id }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Something went wrong");
            closeUpgrade();
            window.location.href = data.checkoutUrl;
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong");
            setLoading(false);
        }
    }

    const inputClass =
        "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors";

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Back */}
            <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 text-sm mb-6 transition-colors"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to plans
            </button>

            {/* Selected plan badge */}
            <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-slate-800 border border-slate-700">
                <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-0.5">Selected plan</p>
                    <p className="text-white font-bold text-sm">{plan.name}</p>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-extrabold text-white">{plan.price}</span>
                    {plan.period && <span className="text-slate-400 text-xs ml-1">{plan.period}</span>}
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-slate-400 mb-1.5 font-medium">First name</label>
                        <input
                            className={inputClass}
                            type="text"
                            placeholder="Jan"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-slate-400 mb-1.5 font-medium">Last name</label>
                        <input
                            className={inputClass}
                            type="text"
                            placeholder="Jansen"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Email</label>
                    <input
                        className={inputClass}
                        type="email"
                        placeholder="jan@bedrijf.nl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {error && (
                    <p className="text-red-400 text-xs bg-red-950/40 border border-red-800/40 rounded-lg px-3 py-2">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all active:scale-[0.98] mt-1"
                >
                    {loading ? (
                        <>
                            <Spinner />
                            Redirecting to Mollie…
                        </>
                    ) : (
                        <>
                            Continue to Payment
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </>
                    )}
                </button>

                <p className="text-center text-xs text-slate-500 leading-relaxed">
                    Secured by{" "}
                    <span className="text-slate-400 font-medium">Mollie</span>
                    {" "}· By continuing you agree to our subscription terms.
                    <br />Your card will be charged {plan.price}{plan.period ? plan.period : ""}.
                </p>
            </form>
        </div>
    );
}

/* ── Main modal ── */
export default function UpgradeModal() {
    const { isOpen, closeUpgrade, selectedPlan, setSelectedPlan } = useUpgrade();

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeUpgrade(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, closeUpgrade]);

    if (!isOpen) return null;

    const step2Plan = selectedPlan;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(5,8,22,0.80)" }}
            onClick={(e) => { if (e.target === e.currentTarget) closeUpgrade(); }}
        >
            <div className={`w-full my-8 ${step2Plan ? "max-w-md" : "max-w-5xl"} transition-all`}>

                {/* Header */}
                <div className="text-center mb-8 relative">
                    <button
                        onClick={closeUpgrade}
                        className="absolute right-0 top-0 text-slate-500 hover:text-slate-300 transition-colors"
                        aria-label="Close"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                        </svg>
                    </button>

                    {step2Plan ? (
                        <>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Complete your{" "}
                                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                                    subscription
                                </span>
                            </h2>
                            <p className="text-slate-400 text-sm">You'll be redirected to Mollie's secure checkout to authorise payment.</p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold text-white mb-2">
                                Simple, Transparent{" "}
                                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                                    Pricing
                                </span>
                            </h2>
                            <p className="text-slate-400 text-sm">Start free. Scale as your compliance needs grow.</p>
                        </>
                    )}
                </div>

                {/* Step 2 — Payment form */}
                {step2Plan ? (
                    <PaymentForm plan={step2Plan} onBack={() => setSelectedPlan(null)} />
                ) : (
                    /* Step 1 — Plans grid */
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {PLANS.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative rounded-2xl p-5 flex flex-col border transition-all ${plan.highlight
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

                                {/* Plan header */}
                                <div className="mb-4">
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
                                <ul className="flex flex-col gap-2 mb-5 flex-1">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2">
                                            <CheckIcon />
                                            <span className="text-xs text-slate-300 leading-snug">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                {plan.ctaAction === "pay" ? (
                                    <button
                                        onClick={() =>
                                            setSelectedPlan({
                                                id: plan.id,
                                                name: plan.name,
                                                price: plan.price,
                                                period: plan.period,
                                            })
                                        }
                                        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${plan.ctaStyle}`}
                                    >
                                        {plan.cta}
                                    </button>
                                ) : plan.ctaAction === "contact" ? (
                                    <a
                                        href="mailto:sales@complai.ai"
                                        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] text-center block ${plan.ctaStyle}`}
                                    >
                                        {plan.cta}
                                    </a>
                                ) : (
                                    <button
                                        onClick={closeUpgrade}
                                        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${plan.ctaStyle}`}
                                    >
                                        {plan.cta}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
