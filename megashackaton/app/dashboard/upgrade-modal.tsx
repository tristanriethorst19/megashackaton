"use client";

import { useUpgrade } from "./upgrade-context";
import { useEffect } from "react";

const PLANS = [
    {
        icon: "🔓",
        name: "Free",
        subtitle: "Exposure Layer",
        price: "€0",
        period: null,
        desc: "Voor bedrijven die willen begrijpen waar ze staan.",
        cta: "Start Free Scan",
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
        icon: "🟢",
        name: "Starter",
        subtitle: null,
        price: "€149",
        period: "/ maand",
        desc: "Voor early-stage AI startups met 1–2 use cases.",
        cta: "Get Started",
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
        icon: "🟣",
        name: "Growth",
        subtitle: null,
        price: "€449",
        period: "/ maand",
        desc: "Voor AI SaaS, HR tech en scale-ups met meerdere AI use cases.",
        cta: "Choose Growth",
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
        icon: "🏢",
        name: "Enterprise",
        subtitle: null,
        price: "€2.000+",
        period: "/ maand",
        desc: "Voor corporates en multi-product AI vendors.",
        cta: "Contact Sales",
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

export default function UpgradeModal() {
    const { isOpen, closeUpgrade } = useUpgrade();

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeUpgrade(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, closeUpgrade]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(5,8,22,0.75)" }}
            onClick={(e) => { if (e.target === e.currentTarget) closeUpgrade(); }}
        >
            <div className="w-full max-w-5xl my-8">

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
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Simple, Transparent{" "}
                        <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                            Pricing
                        </span>
                    </h2>
                    <p className="text-slate-400 text-sm">Start free. Scale as your compliance needs grow.</p>
                </div>

                {/* Plans grid */}
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
                            <button
                                onClick={closeUpgrade}
                                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${plan.ctaStyle}`}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
