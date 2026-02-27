import { LinkButton } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="section bg-slate-950">
      <div className="container-narrow text-center">
        <h2 className="heading-2 text-white max-w-xl mx-auto mb-4">
          Don&apos;t let a regulator catch you off guard
        </h2>
        <p className="body-lg text-slate-400 max-w-lg mx-auto mb-10">
          FinTech companies that react to regulation after the fact pay the price —
          in fines, lost licences, and investor confidence. Start your compliance
          assessment today and stay ahead of every obligation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <LinkButton href="/onboarding" variant="primary" size="lg" className="bg-white text-slate-900 border-white hover:bg-slate-100 hover:border-slate-100">
            Start onboarding
          </LinkButton>
          <LinkButton
            href="/dashboard"
            size="lg"
            className="btn btn-lg text-slate-300 border border-slate-700 hover:bg-slate-800 rounded-full"
          >
            Go to Dashboard →
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
