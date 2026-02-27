const frameworks = [
  "EU AI Act",
  "MiCA",
  "DORA",
  "PSD3",
  "Basel IV AI",
  "FCA AI Guidelines",
  "GDPR",
];

export function LogoBar() {
  return (
    <section className="section-sm border-y border-slate-200 bg-slate-50">
      <div className="container-narrow text-center">
        <p className="label text-slate-400 mb-8">Covering every regulation that affects FinTech AI systems</p>
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
