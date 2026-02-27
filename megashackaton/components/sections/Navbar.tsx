"use client";

import { useState } from "react";
import { LinkButton } from "@/components/ui/Button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <header className="w-full max-w-4xl bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-sm">
        <nav className="flex items-center justify-between px-5 h-14">

          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src="/Vector.svg" alt="Complai" className="h-5 w-auto" />
          </a>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-xl p-1">
            <LinkButton href="/onboarding" variant="ghost" size="sm" className="rounded-lg text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm">
              Onboarding
            </LinkButton>
            <LinkButton href="/dashboard" variant="primary" size="sm" className="rounded-lg shadow-sm">
              Dashboard
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
          <div className="md:hidden border-t border-slate-100 px-5 py-4 flex flex-col gap-2">
            <div className="flex flex-col gap-2 bg-slate-100 rounded-xl p-1">
              <LinkButton href="/onboarding" variant="ghost" size="sm" className="justify-center rounded-lg text-slate-600 hover:bg-white hover:shadow-sm" onClick={() => setOpen(false)}>Onboarding</LinkButton>
              <LinkButton href="/dashboard" variant="primary" size="sm" className="justify-center rounded-lg shadow-sm" onClick={() => setOpen(false)}>Dashboard</LinkButton>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
