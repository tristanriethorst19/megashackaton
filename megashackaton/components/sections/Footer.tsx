const columns = [
  {
    heading: "Product",
    links: ["How It Works", "Partner Network", "Pricing", "Changelog"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Press"],
  },
  {
    heading: "Resources",
    links: ["Regulation Tracker", "Compliance Guides", "API Docs", "Status"],
  },
  {
    heading: "Social",
    links: ["Twitter / X", "LinkedIn", "GitHub", "YouTube"],
  },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container-narrow py-16">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center mb-3">
              <img src="/Vector-white.svg" alt="Complai" className="h-6 w-auto" />
            </a>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI &amp; automation compliance, simplified.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Complai. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
