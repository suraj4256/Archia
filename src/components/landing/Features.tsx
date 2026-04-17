"use client";

import { useEffect, useRef } from "react";

const FEATURES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="28" height="28" fill="#000080" />
        <rect x="4" y="4" width="24" height="4" fill="#0000ff" />
        <path d="M16 10 L18 14 L22 15 L18 16 L16 20 L14 16 L10 15 L14 14Z" fill="#ffff00" />
      </svg>
    ),
    title: "AI-Powered Architecture",
    description:
      "Describe your system in plain English. Our AI generates production-grade architectures with best practices baked in.",
    accent: "#000080",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="6" width="28" height="20" fill="#008080" stroke="#004040" strokeWidth="1" />
        <rect x="4" y="8" width="10" height="2" fill="#00ffff" />
        <rect x="4" y="12" width="24" height="2" fill="#80ffff" opacity="0.5" />
        <rect x="4" y="16" width="18" height="2" fill="#80ffff" opacity="0.5" />
        <rect x="4" y="20" width="20" height="2" fill="#80ffff" opacity="0.5" />
        <rect x="16" y="2" width="10" height="6" fill="#00ffff" opacity="0.3" />
      </svg>
    ),
    title: "Real-Time Diagrams",
    description:
      "Watch your architecture come alive instantly with beautiful Mermaid.js diagrams that update as you iterate.",
    accent: "#006060",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="2" fill="#008000" />
        <rect x="6" y="8" width="10" height="3" rx="1" fill="#00ff00" opacity="0.6" />
        <rect x="6" y="14" width="16" height="3" rx="1" fill="#00ff00" opacity="0.8" />
        <rect x="6" y="20" width="12" height="3" rx="1" fill="#00ff00" opacity="0.6" />
        <circle cx="22" cy="10" r="4" fill="#80ff80" opacity="0.4" />
      </svg>
    ),
    title: "Interactive Iteration",
    description:
      "Chat naturally to refine your design. Add caching, switch to microservices, or add monitoring — all through conversation.",
    accent: "#005000",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" fill="#800000" />
        <circle cx="16" cy="11" r="3" fill="#ffffff" />
        <rect x="14" y="15" width="4" height="8" rx="1" fill="#ffffff" />
      </svg>
    ),
    title: "Explainable Decisions",
    description:
      "Every architectural choice comes with a clear explanation. Understand why each component exists in your system.",
    accent: "#600000",
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
    <section
      id="features"
      ref={sectionRef}
      className="relative py-16 px-6"
      style={{ background: "#3a6ea5", fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
    >
      <div className="mx-auto max-w-5xl">

        {/* ── Section wrapper as a Win2K window ── */}
        <div className="win-window reveal-on-scroll">
          {/* Title bar */}
          <div className="win-titlebar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="shrink-0" aria-hidden="true">
              <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
            </svg>
            <span className="text-xs font-bold text-white">Features — Archia AI Design Copilot</span>
            <div className="ml-auto flex gap-1" aria-hidden="true">
              {["_", "□", "✕"].map((sym) => (
                <span
                  key={sym}
                  className="flex h-[18px] w-[18px] cursor-default items-center justify-center text-[10px] font-bold text-black select-none"
                  style={{
                    background: "#d4d0c8",
                    borderTop: "1px solid #ffffff",
                    borderLeft: "1px solid #ffffff",
                    borderRight: "1px solid #424242",
                    borderBottom: "1px solid #424242",
                  }}
                >
                  {sym}
                </span>
              ))}
            </div>
          </div>

          {/* Window body */}
          <div style={{ background: "#d4d0c8", padding: "20px" }}>
            {/* Section heading */}
            <div className="mb-5">
              <div className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: "#0054e3" }}>
                &gt; Features
              </div>
              <h2 className="text-xl font-bold" style={{ color: "#000000" }}>
                Everything you need to design at scale
              </h2>
              <div style={{ borderTop: "1px solid #808080", borderBottom: "1px solid #ffffff", marginTop: 8, marginBottom: 12 }} />
              <p style={{ fontSize: 12, color: "#444", maxWidth: 480 }}>
                From initial concept to production-ready blueprint — our AI copilot handles the complexity so you can focus on building.
              </p>
            </div>

            {/* Feature cards as Win2K group boxes */}
            <div className="grid gap-4 sm:grid-cols-2">
              {FEATURES.map((feature, i) => (
                <div
                  key={feature.title}
                  className="reveal-on-scroll"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  {/* Group box */}
                  <div
                    style={{
                      border: "1px solid #808080",
                      borderTop: "1px solid #ffffff",
                      background: "#d4d0c8",
                      position: "relative",
                      padding: "12px 12px 12px 12px",
                    }}
                  >
                    {/* Group box legend */}
                    <div
                      style={{
                        position: "absolute",
                        top: -9,
                        left: 12,
                        background: "#d4d0c8",
                        padding: "0 4px",
                        fontSize: 11,
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      {feature.title}
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                      {/* Icon in raised box */}
                      <div
                        style={{
                          background: "#d4d0c8",
                          borderTop: "1px solid #ffffff",
                          borderLeft: "1px solid #ffffff",
                          borderRight: "1px solid #808080",
                          borderBottom: "1px solid #808080",
                          padding: 4,
                          flexShrink: 0,
                        }}
                      >
                        {feature.icon}
                      </div>

                      <div style={{ fontSize: 11, color: "#333", lineHeight: 1.5 }}>
                        {feature.description}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="win-progress mt-3">
                      <div
                        className="win-progress-bar"
                        style={{ width: `${65 + i * 8}%` }}
                      >
                        {Array.from({ length: Math.floor((65 + i * 8) / 8) }).map((_, j) => (
                          <div
                            key={j}
                            style={{
                              width: 6,
                              height: 12,
                              background: "#ffffff",
                              opacity: 0.4,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div style={{ fontSize: 9, color: "#444", marginTop: 2 }}>
                      Capability rating: {65 + i * 8}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status bar */}
          <div className="win-statusbar">
            <div className="win-statusbar-panel flex-1">4 features available</div>
            <div className="win-statusbar-panel">Ready</div>
          </div>
        </div>
      </div>
    </section>
  );
}
