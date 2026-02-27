export function Testimonial() {
  return (
    <section className="section bg-slate-50">
      <div className="container-narrow">
        <div className="max-w-2xl mx-auto text-center">

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-xl font-medium text-slate-900 leading-relaxed mb-8">
            &ldquo;When the EU AI Act dropped, we had no idea which of our systems were
            in scope. Complio had a tailored impact summary in our inbox within the hour —
            and connected us to a specialist who had us audit-ready in two weeks.&rdquo;
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
              LC
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-900">Laura Chen</p>
              <p className="text-sm text-slate-500">Chief Compliance Officer at Siemens</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
