import { LinkButton } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="section bg-slate-950">
      <div className="container-narrow text-center">
        <h2 className="heading-2 text-white max-w-xl mx-auto mb-4">
          Don&apos;t let a new law catch you off guard
        </h2>
        <p className="body-lg text-slate-400 max-w-lg mx-auto mb-10">
          Join forward-thinking companies already using Complai to stay compliant,
          protect their workforce, and move with confidence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <LinkButton href="/onboarding" variant="primary" size="lg" className="bg-white text-slate-900 border-white hover:bg-slate-100 hover:border-slate-100">
            Start your assessment
          </LinkButton>
          <LinkButton
            href="/demo"
            size="lg"
            className="btn btn-lg text-slate-300 border border-slate-700 hover:bg-slate-800 rounded-full"
          >
            Book a demo
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
