import { client } from "../data";

export default function SystemsPage() {
  return (
    <>
      <header className="shrink-0 bg-white border-b border-slate-200 px-6 py-4">
        <h1 className="text-base font-semibold text-slate-900">AI Systems in use</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          These systems drive what appears in {client.name}'s compliance feed.
        </p>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-5">
        <div className="max-w-2xl flex flex-col gap-4">

          {/* Explanation */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-blue-800 mb-1">Why this list matters</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              Every regulation in your feed was matched because of one or more of these systems.
              Keeping this list accurate ensures you never miss a relevant update — and never see noise that doesn't apply to you.
            </p>
          </div>

          {/* Systems list */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Active systems</h2>
            <div className="flex flex-col gap-2">
              {client.aiSystems.map((sys) => (
                <div key={sys} className="flex items-center justify-between px-3 py-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-sm text-slate-800">{sys}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-slate-400 hover:text-slate-700 transition-colors">Edit</button>
                    <button className="text-xs text-red-400 hover:text-red-600 transition-colors">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-xs font-medium text-blue-700 border border-blue-200 rounded-lg px-3 py-1.5 hover:bg-blue-50 transition-colors bg-white">
              + Add AI system
            </button>
          </div>

        </div>
      </main>
    </>
  );
}
