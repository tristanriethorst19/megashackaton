"use client";

import { useState } from "react";
import { LinkButton } from "@/components/ui/Button";

const links = [
  { label: "How It Works", href: "#features" },
  { label: "Partners",     href: "#partners" },
  { label: "Regulations",  href: "#regulations" },
  { label: "Pricing",      href: "#pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <header className="w-full max-w-4xl bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl shadow-sm">
        <nav className="flex items-center justify-between px-5 h-14">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 font-semibold text-slate-900 text-base">
            <span className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              C
            </span>
            Complio
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-xl p-1">
            <LinkButton href="/login" variant="ghost" size="sm" className="rounded-lg text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm">
              Log in
            </LinkButton>
            <LinkButton href="/onboarding" variant="primary" size="sm" className="rounded-lg shadow-sm">
              Get started
            </LinkButton>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-slate-100 px-5 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-slate-500 hover:text-slate-900 py-1"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 mt-1 bg-slate-100 rounded-xl p-1">
              <LinkButton href="/login"      variant="ghost"   size="sm" className="flex-1 justify-center rounded-lg text-slate-600 hover:bg-white hover:shadow-sm">Log in</LinkButton>
              <LinkButton href="/onboarding" variant="primary" size="sm" className="flex-1 rounded-lg shadow-sm">Get started</LinkButton>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
