"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    number: "1",
    title: "Describe Your System",
    description:
      'Tell the AI what you\'re building in plain English. "Design a scalable e-commerce backend" is all it takes.',
    visual: (
      <div
        style={{
          border: "1px solid #808080",
          borderTop: "1px solid #ffffff",
          background: "#ffffff",
          padding: 8,
        }}
      >
        <div
          style={{
            borderTop: "1px solid #808080",
            borderLeft: "1px solid #808080",
            borderRight: "1px solid #ffffff",
            borderBottom: "1px solid #ffffff",
            background: "#ffffff",
            padding: "3px 6px",
            fontSize: 11,
            color: "#444",
          }}
        >
          Design a scalable e-commerce backend with caching...
          <span
            className="animate-blink ml-0.5 inline-block h-3 w-0.5 align-middle"
            style={{ background: "#000" }}
          />
        </div>
        <div className="mt-2 flex justify-end">
          <button
            className="win-btn-primary"
            style={{ fontSize: 11, padding: "2px 12px" }}
          >
            Send
          </button>
        </div>
      </div>
    ),
  },
  {
    number: "2",
    title: "Generate Architecture",
    description:
      "Watch as the AI creates a comprehensive system design with proper components, connections, and best practices.",
    visual: (
      <div
        style={{
          border: "1px solid #808080",
          borderTop: "1px solid #ffffff",
          background: "#ffffff",
          padding: 8,
        }}
      >
        <div className="space-y-1.5">
          <div
            className="mx-auto w-24 py-1 text-center text-[10px] font-bold"
            style={{ background: "#000080", color: "#fff", border: "2px outset #000080" }}
          >
            Load Balancer
          </div>
          <div className="mx-auto h-3 w-px" style={{ background: "#000" }} />
          <div className="flex justify-center gap-2">
            <div
              className="w-16 py-1 text-center text-[10px] font-bold"
              style={{ background: "#000080", color: "#fff", border: "2px outset #000080" }}
            >
              API 1
            </div>
            <div
              className="w-16 py-1 text-center text-[10px] font-bold"
              style={{ background: "#000080", color: "#fff", border: "2px outset #000080" }}
            >
              API 2
            </div>
          </div>
          <div className="mx-auto h-3 w-px" style={{ background: "#000" }} />
          <div className="flex justify-center gap-2">
            <div
              className="w-14 py-1 text-center text-[10px] font-bold"
              style={{ background: "#808000", color: "#fff", border: "2px outset #808000" }}
            >
              Redis
            </div>
            <div
              className="w-14 py-1 text-center text-[10px] font-bold"
              style={{ background: "#008000", color: "#fff", border: "2px outset #008000" }}
            >
              DB
            </div>
            <div
              className="w-14 py-1 text-center text-[10px] font-bold"
              style={{ background: "#800000", color: "#fff", border: "2px outset #800000" }}
            >
              Queue
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "3",
    title: "Iterate & Refine",
    description:
      "Chat naturally to evolve your design. Add monitoring, switch patterns, or scale specific components.",
    visual: (
      <div
        style={{
          border: "1px solid #808080",
          borderTop: "1px solid #ffffff",
          background: "#ffffff",
          padding: 8,
          fontSize: 11,
        }}
      >
        <div className="space-y-1.5">
          <div
            className="ml-auto w-[80%] px-2 py-1.5"
            style={{
              background: "#0054e3",
              color: "#fff",
              borderTop: "1px solid #1a6af5",
              borderLeft: "1px solid #1a6af5",
              borderRight: "1px solid #003b9e",
              borderBottom: "1px solid #003b9e",
            }}
          >
            Add monitoring stack
          </div>
          <div
            className="w-[85%] px-2 py-1.5"
            style={{
              background: "#d4d0c8",
              color: "#000",
              borderTop: "1px solid #ffffff",
              borderLeft: "1px solid #ffffff",
              borderRight: "1px solid #808080",
              borderBottom: "1px solid #808080",
            }}
          >
            Added Prometheus, ELK Stack, and Jaeger ✓
          </div>
          <div
            className="ml-auto w-[70%] px-2 py-1.5"
            style={{
              background: "#0054e3",
              color: "#fff",
              borderTop: "1px solid #1a6af5",
              borderLeft: "1px solid #1a6af5",
              borderRight: "1px solid #003b9e",
              borderBottom: "1px solid #003b9e",
            }}
          >
            Switch to microservices
          </div>
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
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-16 px-6"
      style={{ background: "#3a6ea5", fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="win-window reveal-on-scroll">
          {/* Title bar */}
          <div className="win-titlebar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className="text-xs font-bold text-white">Setup Wizard — How It Works</span>
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

          {/* Wizard body */}
          <div style={{ background: "#d4d0c8", display: "flex", minHeight: 480 }}>
            {/* Left sidebar with wizard graphic */}
            <div
              style={{
                width: 140,
                background: "linear-gradient(to bottom, #000080, #1a3a8f)",
                padding: "20px 12px",
                flexShrink: 0,
                borderRight: "2px solid #808080",
              }}
            >
              <div style={{ color: "#ffffff", fontSize: 18, fontWeight: "bold", lineHeight: 1.2, marginBottom: 16 }}>
                Archia
                <br />
                <span style={{ fontSize: 11, fontWeight: "normal", color: "#aac0ff" }}>
                  AI Copilot
                  <br />
                  Setup Wizard
                </span>
              </div>
              {/* Steps sidebar list */}
              {STEPS.map((step, i) => (
                <div
                  key={step.number}
                  className="reveal-on-scroll"
                  style={{
                    transitionDelay: `${i * 0.1}s`,
                    padding: "4px 8px",
                    marginBottom: 4,
                    background: i === 0 ? "#ffffff" : "transparent",
                    color: i === 0 ? "#000080" : "#aac0ff",
                    fontSize: 11,
                    fontWeight: i === 0 ? "bold" : "normal",
                    cursor: "default",
                  }}
                >
                  Step {step.number}
                </div>
              ))}

              <div
                style={{
                  marginTop: "auto",
                  color: "#aac0ff",
                  fontSize: 9,
                  position: "absolute",
                  bottom: 60,
                  left: 12,
                  width: 116,
                }}
              >
                Windows 2000 Edition
                <br />
                v2.00.0 (Build 2195)
              </div>
            </div>

            {/* Right content area */}
            <div style={{ flex: 1, padding: "20px" }}>
              <h2 className="mb-1 text-lg font-bold" style={{ color: "#000000" }}>
                Three Steps to Production-Ready
              </h2>
              <div
                style={{ borderTop: "1px solid #808080", borderBottom: "1px solid #ffffff", marginBottom: 16 }}
              />
              <p style={{ fontSize: 11, color: "#333", marginBottom: 20 }}>
                Go from idea to architecture diagram in seconds. No diagramming tools, no templates — just describe what you need.
              </p>

              {/* Steps */}
              <div className="space-y-6">
                {STEPS.map((step, i) => (
                  <div
                    key={step.number}
                    className="reveal-on-scroll"
                    style={{
                      transitionDelay: `${i * 0.12}s`,
                      border: "1px solid #808080",
                      borderTop: "1px solid #ffffff",
                      background: "#d4d0c8",
                      position: "relative",
                      padding: "16px 12px 12px",
                    }}
                  >
                    {/* Group box label */}
                    <div
                      style={{
                        position: "absolute",
                        top: -9,
                        left: 12,
                        background: "#d4d0c8",
                        padding: "0 4px",
                        fontSize: 11,
                        fontWeight: "bold",
                        color: "#0054e3",
                      }}
                    >
                      Step {step.number}: {step.title}
                    </div>

                    <div className="flex gap-4 pt-1">
                      {/* Step number badge */}
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          background: "#000080",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 16,
                          fontWeight: "bold",
                          flexShrink: 0,
                          border: "2px outset #000080",
                        }}
                      >
                        {step.number}
                      </div>

                      <div className="flex-1">
                        <p style={{ fontSize: 11, color: "#333", marginBottom: 10 }}>
                          {step.description}
                        </p>
                        {step.visual}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Wizard navigation buttons */}
              <div
                style={{
                  marginTop: 20,
                  borderTop: "1px solid #808080",
                  paddingTop: 12,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                }}
              >
                <button className="win-btn" style={{ minWidth: 75 }}>
                  &lt; Back
                </button>
                <button className="win-btn-primary" style={{ minWidth: 75 }}>
                  Next &gt;
                </button>
                <button className="win-btn" style={{ minWidth: 75 }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
