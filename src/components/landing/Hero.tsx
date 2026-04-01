"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16">
      {/* ── Ambient blurs ───────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent-1/[0.08] blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 rounded-full bg-accent-2/[0.06] blur-[100px]" />
      </div>

      {/* ── Badge ───────────────────────────────────── */}
      <div className="relative z-10 mb-8 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs text-zinc-400 animate-fade-in-up backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-[breathe_3s_ease-in-out_infinite]" />
        AI-Powered System Design — Now in Beta
      </div>

      {/* ── Headline ────────────────────────────────── */}
      <h1
        className="relative z-10 max-w-4xl text-center text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        Design System{" "}
        <br className="hidden sm:block" />
        Architectures{" "}
        <span className="gradient-text">with AI</span>
      </h1>

      {/* ── Sub-headline ────────────────────────────── */}
      <p
        className="relative z-10 mt-6 max-w-xl text-center text-lg leading-relaxed text-zinc-400 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        Turn ideas into production-grade architectures using natural language.
        Chat, iterate, and visualize — all in real time.
      </p>

      {/* ── CTA Buttons ─────────────────────────────── */}
      <div
        className="relative z-10 mt-10 flex flex-col items-center gap-4 sm:flex-row animate-fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        <Link
          href="/copilot"
          className="group flex h-12 items-center gap-2.5 rounded-full bg-gradient-to-r from-accent-1 to-accent-2 px-8 text-sm font-medium text-white shadow-xl shadow-accent-1/25 transition-all duration-300 hover:shadow-accent-1/40 hover:brightness-110"
        >
          Try Now — It&apos;s Free
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
        <button
          onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
          className="flex h-12 items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-8 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-white/[0.2] hover:bg-white/[0.06]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
          View Demo
        </button>
      </div>

      {/* ── Hero Visual — Mock App Preview ──────────── */}
      <div
        className="relative z-10 mt-20 w-full max-w-5xl animate-fade-in-up"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="gradient-border rounded-2xl overflow-hidden">
          {/* Glow behind */}
          <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-accent-1/[0.06] blur-[40px]" />
          <div className="relative rounded-2xl border border-white/[0.08] bg-[#0c0c0e] shadow-2xl shadow-black/50 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              </div>
              <div className="mx-auto flex items-center gap-2 rounded-md bg-white/[0.04] px-3 py-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-[10px] text-zinc-500">archia.ai/copilot</span>
              </div>
            </div>

            {/* Mock App UI */}
            <div className="flex h-[400px] sm:h-[480px]">
              {/* Chat Panel Mock */}
              <div className="w-[35%] border-r border-white/[0.06] p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-accent-1 to-accent-2" />
                  <span className="text-xs font-medium text-zinc-300">Archia</span>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[9px] text-zinc-600">Online</span>
                  </div>
                </div>

                <div className="flex-1 space-y-3 overflow-hidden">
                  {/* User msg */}
                  <div className="ml-auto w-[85%] rounded-xl rounded-tr-sm bg-gradient-to-r from-accent-1 to-accent-2 p-3">
                    <p className="text-[11px] leading-relaxed text-white">Design a scalable e-commerce backend with caching and message queues</p>
                  </div>
                  {/* AI msg */}
                  <div className="flex gap-2">
                    <div className="mt-1 h-5 w-5 shrink-0 rounded-md bg-accent-1/20" />
                    <div className="w-[85%] rounded-xl rounded-tl-sm border border-white/[0.06] bg-white/[0.03] p-3">
                      <p className="text-[11px] leading-relaxed text-zinc-300">I&apos;ve designed a scalable architecture with load balancing, Redis caching, and async processing via message queues...</p>
                    </div>
                  </div>
                  {/* User msg 2 */}
                  <div className="ml-auto w-[75%] rounded-xl rounded-tr-sm bg-gradient-to-r from-accent-1 to-accent-2 p-3">
                    <p className="text-[11px] leading-relaxed text-white">Add monitoring and observability</p>
                  </div>
                  {/* AI typing */}
                  <div className="flex gap-2">
                    <div className="mt-1 h-5 w-5 shrink-0 rounded-md bg-accent-1/20" />
                    <div className="rounded-xl rounded-tl-sm border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                      <div className="flex gap-1">
                        <div className="typing-dot h-1.5 w-1.5 rounded-full bg-accent-3" />
                        <div className="typing-dot h-1.5 w-1.5 rounded-full bg-accent-3" />
                        <div className="typing-dot h-1.5 w-1.5 rounded-full bg-accent-3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                  <span className="flex-1 text-[10px] text-zinc-600">Describe your architecture...</span>
                  <div className="h-6 w-6 rounded-lg bg-gradient-to-r from-accent-1 to-accent-2 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9z" /></svg>
                  </div>
                </div>
              </div>

              {/* Diagram Panel Mock */}
              <div className="flex-1 relative p-6 flex items-center justify-center">
                {/* Grid bg */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-[300px] w-[300px] rounded-full bg-accent-1/[0.06] blur-[80px]" />
                </div>

                {/* Mock diagram nodes */}
                <div className="relative w-full max-w-md">
                  {/* Client */}
                  <div className="mx-auto w-32 rounded-lg bg-indigo-500/90 px-3 py-2 text-center text-[10px] font-medium text-white shadow-lg shadow-indigo-500/20">Client App</div>
                  <div className="mx-auto h-6 w-px bg-zinc-600" />
                  {/* LB */}
                  <div className="mx-auto w-32 rounded-lg bg-purple-500/90 px-3 py-2 text-center text-[10px] font-medium text-white shadow-lg shadow-purple-500/20">Load Balancer</div>
                  <div className="mx-auto h-6 w-px bg-zinc-600" />
                  {/* API row */}
                  <div className="flex items-start justify-center gap-4">
                    <div>
                      <div className="w-28 rounded-lg bg-blue-500/90 px-3 py-2 text-center text-[10px] font-medium text-white shadow-lg shadow-blue-500/20">API Server 1</div>
                      <div className="mx-auto h-5 w-px bg-zinc-600" />
                    </div>
                    <div>
                      <div className="w-28 rounded-lg bg-blue-500/90 px-3 py-2 text-center text-[10px] font-medium text-white shadow-lg shadow-blue-500/20">API Server 2</div>
                      <div className="mx-auto h-5 w-px bg-zinc-600" />
                    </div>
                  </div>
                  {/* Bottom row */}
                  <div className="flex items-start justify-center gap-3">
                    <div className="w-24 rounded-lg bg-amber-500/90 px-2 py-2 text-center text-[10px] font-medium text-black shadow-lg shadow-amber-500/20">Redis</div>
                    <div className="w-24 rounded-lg bg-emerald-500/90 px-2 py-2 text-center text-[10px] font-medium text-white shadow-lg shadow-emerald-500/20">PostgreSQL</div>
                    <div className="w-24 rounded-lg bg-pink-500/90 px-2 py-2 text-center text-[10px] font-medium text-white shadow-lg shadow-pink-500/20">Queue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────── */}
      <div className="relative z-10 mt-16 mb-8 flex flex-col items-center gap-2 animate-[breathe_3s_ease-in-out_infinite]">
        <span className="text-[10px] uppercase tracking-widest text-zinc-600">Scroll to explore</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
