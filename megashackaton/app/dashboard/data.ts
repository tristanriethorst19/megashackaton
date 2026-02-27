export const client = {
  name: "NovaCorp",
  industry: "Technology",
  employees: 820,
  hq: "Amsterdam, Netherlands",
  locations: ["European Union"],
  aiSystems: [
    "Automated CV screening (Workday AI)",
    "AI performance monitoring",
    "Payroll automation",
    "HR chatbot (internal)",
  ],
};

export type FeedStatus = "action-required" | "in-review" | "compliant";

export type FeedItem = {
  id: string;
  type: string;
  typeClass: string;
  title: string;
  summary: string;
  why: string;
  whyShort: string;
  jurisdiction: string;
  effective: string;
  daysLeft: number | null;
  status: FeedStatus;
  action: string;
};

export const feed: FeedItem[] = [
  {
    id: "1",
    type: "DEADLINE",
    typeClass: "bg-red-100 text-red-700 border-red-200",
    title: "EU AI Act — High-risk AI system registration",
    summary:
      "Operators of high-risk AI systems must register their systems in the EU AI system database. The registration portal opened February 2026 — the deadline for existing deployments is March 15, 2026.",
    why: "Your Workday AI candidate screening tool falls under Annex III (employment decisions) and must be registered before the deadline.",
    whyShort: "Workday AI (CV screening) falls under Annex III — registration deadline applies.",
    jurisdiction: "🇪🇺 European Union",
    effective: "Mar 15, 2026",
    daysLeft: 16,
    status: "action-required",
    action: "Register system",
  },
  {
    id: "2",
    type: "NEW LAW",
    typeClass: "bg-blue-100 text-blue-700 border-blue-200",
    title: "EU AI Act — Art. 22: Automated HR decisions",
    summary:
      "High-risk AI systems used in recruitment, promotion, or dismissal must be audited, documented, and explained to affected individuals. Mandatory human oversight is required for all automated HR decisions.",
    why: "Your Workday AI candidate screening tool classifies as high-risk under EU AI Act Annex III. A human reviewer must be in the loop for all hiring decisions.",
    whyShort: "Workday AI classifies as high-risk — human oversight required for all hiring decisions.",
    jurisdiction: "🇪🇺 European Union",
    effective: "Aug 2, 2026",
    daysLeft: null,
    status: "in-review",
    action: "Review & assign owner",
  },
  {
    id: "3",
    type: "GUIDANCE",
    typeClass: "bg-slate-100 text-slate-600 border-slate-200",
    title: "EU AI Act — Art. 9: Risk management obligations",
    summary:
      "The European AI Office published updated guidance on continuous risk monitoring for high-risk AI systems, including mandatory logging, model drift detection, and annual independent audits.",
    why: "Applies to your Workday AI deployment. Your current audit cycle may not meet the new annual requirement — review with your AI vendor.",
    whyShort: "Your Workday AI audit cycle may not meet the new annual requirement.",
    jurisdiction: "🇪🇺 European Union",
    effective: "Ongoing",
    daysLeft: null,
    status: "in-review",
    action: "Read guidance",
  },
  {
    id: "4",
    type: "NEW LAW",
    typeClass: "bg-blue-100 text-blue-700 border-blue-200",
    title: "EU AI Act — Art. 52: AI transparency obligations",
    summary:
      "Users interacting with AI systems must be clearly informed they are not speaking to a human. This applies to all AI-powered chat interfaces, including internal tools and employee-facing assistants.",
    why: "Your internal HR chatbot must display a disclosure notice at the start of every session under Art. 52(1).",
    whyShort: "Your internal HR chatbot must show a disclosure at the start of each session.",
    jurisdiction: "🇪🇺 European Union",
    effective: "Aug 2, 2026",
    daysLeft: null,
    status: "action-required",
    action: "Add disclosure notice",
  },
  {
    id: "5",
    type: "COMPLIANT",
    typeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
    title: "GDPR — Art. 22: Automated individual decisions",
    summary:
      "Individuals have the right not to be subject to solely automated decisions that significantly affect them. Organisations must provide a meaningful right to human review.",
    why: "Your privacy policy and processing agreements include GDPR Art. 22 rights. Human review is available for all automated decisions — compliance confirmed Jan 2024.",
    whyShort: "Compliance confirmed Jan 2024 — human review available for all automated decisions.",
    jurisdiction: "🇪🇺 European Union",
    effective: "May 25, 2018",
    daysLeft: null,
    status: "compliant",
    action: "View record",
  },
];

export const experts = [
  {
    name: "Dr. Mia Hartmann",
    role: "EU AI Act specialist",
    focus: "Art. 22 & 52 · High-risk AI systems",
    initials: "MH",
    location: "Berlin, Germany",
    available: true,
    relevance: "Directly relevant to your open Art. 22 and Art. 52 action items.",
  },
  {
    name: "Lena Becker",
    role: "EU data protection lawyer",
    focus: "GDPR · Art. 22 · Data protection impact assessments",
    initials: "LB",
    location: "Amsterdam, Netherlands",
    available: true,
    relevance: "Can help with GDPR Art. 22 documentation and DPIA for your AI systems.",
  },
  {
    name: "Pieter van der Berg",
    role: "AI compliance auditor",
    focus: "EU AI Act · Risk management · Annual audits",
    initials: "PV",
    location: "Brussels, Belgium",
    available: false,
    relevance: "Specialises in Art. 9 risk management audits for HR tech systems.",
  },
];
