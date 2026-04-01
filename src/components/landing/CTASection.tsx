import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
          {/* Background effects */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-accent-1/[0.12] blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-accent-2/[0.10] blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent-1/[0.03] via-transparent to-accent-2/[0.03]" />

          {/* Grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative px-8 py-20 text-center sm:px-16">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-1/20 bg-accent-1/5 px-4 py-1.5 text-xs font-medium text-accent-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Free to use · No signup required
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Start Designing Smarter{" "}
              <br className="hidden sm:block" />
              <span className="gradient-text">Systems Today</span>
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-zinc-400">
              Join engineers who use AI to design scalable, production-grade architectures in minutes instead of hours.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/copilot"
                className="group flex h-13 items-center gap-2.5 rounded-full bg-gradient-to-r from-accent-1 to-accent-2 px-10 text-sm font-semibold text-white shadow-xl shadow-accent-1/25 transition-all duration-300 hover:shadow-accent-1/40 hover:brightness-110"
              >
                Launch Copilot
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center justify-center gap-6 text-[11px] text-zinc-600">
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                <span>4.9/5 from 200+ engineers</span>
              </div>
              <div className="hidden items-center gap-1.5 sm:flex">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                <span>No credit card required</span>
              </div>
              <div className="hidden items-center gap-1.5 md:flex">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                <span>Results in seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
