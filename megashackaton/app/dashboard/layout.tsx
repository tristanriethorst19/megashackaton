"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { client } from "./data";

function IconGrid() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="2" y="2" width="7" height="7" rx="1.5" /><rect x="11" y="2" width="7" height="7" rx="1.5" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" /><rect x="11" y="11" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M6 2h8l4 4v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="6" y1="12" x2="14" y2="12" /><line x1="6" y1="16" x2="10" y2="16" />
    </svg>
  );
}
function IconBell() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M10 2a6 6 0 0 1 6 6v4l2 2v1H2v-1l2-2V8a6 6 0 0 1 6-6z" />
      <path d="M8 17a2 2 0 0 0 4 0" />
    </svg>
  );
}
function IconPerson() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="10" cy="7" r="4" />
      <path d="M2 19c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="7" cy="7" r="3" /><circle cx="14" cy="7" r="3" />
      <path d="M1 18c0-3.3 2.7-6 6-6h.5" /><path d="M8 18c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    </svg>
  );
}
function IconCpu() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="5" y="5" width="10" height="10" rx="1.5" />
      <path d="M8 5V3M12 5V3M8 17v-2M12 17v-2M5 8H3M5 12H3M17 8h-2M17 12h-2" />
    </svg>
  );
}

const navItems = [
  { label: "My Feed",    href: "/dashboard",          icon: <IconGrid />,   badge: undefined },
  { label: "AI Systems", href: "/dashboard/systems",  icon: <IconCpu />,    badge: undefined },
  { label: "Experts",    href: "/dashboard/experts",  icon: <IconUsers />,  badge: undefined },
  { label: "My Company", href: "/dashboard/profile",  icon: <IconPerson />, badge: undefined },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>

      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">

        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-100">
          <span className="text-2xl font-bold text-slate-900 tracking-tight">Complai</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 flex flex-col gap-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-slate-900 text-white font-medium"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <span className={active ? "text-white" : "text-slate-400"}>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-xs font-bold bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Company identity — bottom */}
        <div className="px-4 py-3.5 border-t border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-sm font-bold text-white shrink-0">
            {client.name[0]}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate leading-tight">{client.name}</p>
            <p className="text-xs text-slate-400 truncate">{client.hq}</p>
          </div>
        </div>
      </aside>

      {/* ── Page content ────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
