"use client";

import { useEffect, useRef } from "react";

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
      </svg>
    ),
    title: "AI-Powered Architecture",
    description:
      "Describe your system in plain English. Our AI generates production-grade architectures with best practices baked in.",
    color: "from-indigo-500 to-violet-500",
    glow: "group-hover:shadow-indigo-500/20",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
        <path d="M2 12l8.58 3.91a2 2 0 0 0 1.66 0L21 12" />
        <path d="M2 17l8.58 3.91a2 2 0 0 0 1.66 0L21 17" />
      </svg>
    ),
    title: "Real-Time Diagrams",
    description:
      "Watch your architecture come alive instantly with beautiful Mermaid.js diagrams that update as you iterate.",
    color: "from-cyan-500 to-blue-500",
    glow: "group-hover:shadow-cyan-500/20",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01" />
        <path d="M12 10h.01" />
        <path d="M16 10h.01" />
      </svg>
    ),
    title: "Interactive Iteration",
    description:
      "Chat naturally to refine your design. Add caching, switch to microservices, or add monitoring — all through conversation.",
    color: "from-emerald-500 to-teal-500",
    glow: "group-hover:shadow-emerald-500/20",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
    title: "Explainable Decisions",
    description:
      "Every architectural choice comes with a clear explanation. Understand why each component exists in your system.",
    color: "from-amber-500 to-orange-500",
    glow: "group-hover:shadow-amber-500/20",
  },
];

export default function Features() {
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
    <section id="features" ref={sectionRef} className="relative py-32 px-6">
      {/* Background accent */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-accent-2/[0.04] blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 reveal-on-scroll">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-accent-1" />
            <span className="text-xs font-medium uppercase tracking-widest text-accent-3">
              Features
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-accent-1" />
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to{" "}
            <span className="gradient-text-accent">design at scale</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-zinc-500">
            From initial concept to production-ready blueprint — our AI copilot handles the complexity so you can focus on building.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={`reveal-on-scroll group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:shadow-xl ${feature.glow}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="mb-2 text-sm font-semibold text-zinc-100">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors">
                {feature.description}
              </p>

              {/* Corner glow on hover */}
              <div className={`pointer-events-none absolute -right-2 -top-2 h-24 w-24 rounded-full bg-gradient-to-br ${feature.color} opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-10`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
