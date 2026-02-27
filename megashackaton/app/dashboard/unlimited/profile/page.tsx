import { client } from "../../data";

export default function ProfilePage() {
    return (
        <>
            <header className="shrink-0 bg-white border-b border-slate-200 px-6 py-4">
                <h1 className="text-base font-semibold text-slate-900">{client.name} — Company profile</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                    Your company details and monitored jurisdictions.
                </p>
            </header>

            <main className="flex-1 overflow-y-auto px-6 py-5">
                <div className="max-w-2xl flex flex-col gap-4">

                    {/* Company info */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Company</h2>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-lg font-bold text-white shrink-0">
                                {client.name[0]}
                            </div>
                            <div>
                                <p className="text-base font-semibold text-slate-900">{client.name}</p>
                                <p className="text-sm text-slate-500">{client.industry} · {client.employees} employees</p>
                                <p className="text-sm text-slate-400">{client.hq}</p>
                            </div>
                        </div>
                        <button className="text-xs font-medium text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors">
                            Edit company details
                        </button>
                    </div>

                    {/* Jurisdictions */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Jurisdictions monitored</h2>
                        <p className="text-xs text-slate-400 mb-4">We track regulations in every jurisdiction your company operates in.</p>
                        <div className="flex flex-col gap-2">
                            {client.locations.map((loc) => (
                                <div key={loc} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200">
                                    <span className="text-sm font-medium text-slate-800">🇪🇺 {loc}</span>
                                    <span className="text-xs text-emerald-600 font-medium">Active</span>
                                </div>
                            ))}
                        </div>
                        <button className="mt-3 text-xs font-medium text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors">
                            + Add jurisdiction
                        </button>
                    </div>

                </div>
            </main>
        </>
    );
}
