"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    number: "01",
    title: "Describe Your System",
    description:
      "Tell the AI what you're building in plain English. \"Design a scalable e-commerce backend\" is all it takes.",
    visual: (
      <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
          <span className="flex-1 text-xs text-zinc-400">Design a scalable e-commerce backend with caching...</span>
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-r from-accent-1 to-accent-2">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9z" /></svg>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Generate Architecture",
    description:
      "Watch as the AI creates a comprehensive system design with proper components, connections, and best practices.",
    visual: (
      <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
        <div className="mx-auto w-28 rounded-md bg-indigo-500/80 py-1.5 text-center text-[9px] font-medium text-white">Load Balancer</div>
        <div className="flex justify-center gap-2">
          <div className="w-20 rounded-md bg-blue-500/80 py-1.5 text-center text-[9px] font-medium text-white">API 1</div>
          <div className="w-20 rounded-md bg-blue-500/80 py-1.5 text-center text-[9px] font-medium text-white">API 2</div>
        </div>
        <div className="flex justify-center gap-2">
          <div className="w-16 rounded-md bg-amber-500/80 py-1.5 text-center text-[9px] font-medium text-black">Redis</div>
          <div className="w-16 rounded-md bg-emerald-500/80 py-1.5 text-center text-[9px] font-medium text-white">DB</div>
          <div className="w-16 rounded-md bg-pink-500/80 py-1.5 text-center text-[9px] font-medium text-white">Queue</div>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Iterate & Refine",
    description:
      "Chat naturally to evolve your design. Add monitoring, switch patterns, or scale specific components.",
    visual: (
      <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
        <div className="ml-auto w-[80%] rounded-lg rounded-tr-sm bg-gradient-to-r from-accent-1/80 to-accent-2/80 px-3 py-2">
          <p className="text-[9px] text-white">Add monitoring stack</p>
        </div>
        <div className="w-[80%] rounded-lg rounded-tl-sm border border-white/[0.06] bg-white/[0.03] px-3 py-2">
          <p className="text-[9px] text-zinc-300">Added Prometheus, ELK Stack, and Jaeger for full observability ✓</p>
        </div>
        <div className="ml-auto w-[70%] rounded-lg rounded-tr-sm bg-gradient-to-r from-accent-1/80 to-accent-2/80 px-3 py-2">
          <p className="text-[9px] text-white">Switch to microservices</p>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-32 px-6">
      {/* Background */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[600px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-1/[0.04] blur-[120px]" />

      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-20 reveal-on-scroll">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-accent-1" />
            <span className="text-xs font-medium uppercase tracking-widest text-accent-3">How it works</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-accent-1" />
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Three steps to{" "}
            <span className="gradient-text-accent">production-ready</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-zinc-500">
            Go from idea to architecture diagram in seconds. No diagramming tools, no templates — just describe what you need.
          </p>
        </div>

        {/* Steps */}
        <div className="relative space-y-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Connecting line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[60px] hidden h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent lg:block" />

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="reveal-on-scroll relative"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Step number */}
              <div className="mb-6 flex items-center gap-4 lg:flex-col lg:items-center lg:text-center">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] font-mono text-sm font-bold text-accent-3">
                    {step.number}
                  </div>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-2xl border border-accent-1/20 animate-pulse-ring" />
                </div>
                <div className="lg:mt-4">
                  <h3 className="text-base font-semibold text-zinc-100">{step.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-zinc-500 lg:mt-2">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Visual */}
              <div className="mt-4">{step.visual}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
