const frameworks = [
  "EU AI Act",
  "GDPR",
  "CCPA",
  "NLRA",
  "ISO 42001",
  "UK AI White Paper",
  "OSHA",
];

export function LogoBar() {
  return (
    <section className="section-sm border-y border-slate-200 bg-slate-50">
      <div className="container-narrow text-center">
        <p className="label text-slate-400 mb-8">Covering regulations across every major jurisdiction</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {frameworks.map((name) => (
            <span
              key={name}
              className="text-slate-400 font-semibold text-lg tracking-tight select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
