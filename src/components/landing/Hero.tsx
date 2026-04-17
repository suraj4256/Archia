"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-36 pb-16"
      style={{ background: "#3a6ea5", fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
    >
      {/* Desktop pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px)",
        }}
        aria-hidden="true"
      />

      {/* ── Main Window ── */}
      <div className="win-window relative w-full max-w-3xl animate-fade-in-up">
        {/* Title bar */}
        <div className="win-titlebar">
          <div className="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="0" y="0" width="7" height="7" fill="#ff0000" />
              <rect x="9" y="0" width="7" height="7" fill="#00ff00" />
              <rect x="0" y="9" width="7" height="7" fill="#0000ff" />
              <rect x="9" y="9" width="7" height="7" fill="#ffff00" />
            </svg>
          </div>
          <span className="flex-1 text-xs font-bold text-white">
            Archia — AI System Design Copilot
          </span>
          {/* Window controls */}
          <div className="flex gap-1" role="group" aria-label="Window controls">
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
                aria-hidden="true"
              >
                {sym}
              </span>
            ))}
          </div>
        </div>

        {/* Menu bar */}
        <div
          style={{
            background: "#d4d0c8",
            borderBottom: "1px solid #808080",
            display: "flex",
            padding: "2px",
            fontSize: 11,
          }}
        >
          {["File", "Help"].map((item) => (
            <span
              key={item}
              className="win-menuitem"
              style={{ padding: "2px 8px", cursor: "default", fontSize: 11 }}
            >
              <span style={{ textDecoration: "underline" }}>{item[0]}</span>
              {item.slice(1)}
            </span>
          ))}
        </div>

        {/* Window body */}
        <div style={{ background: "#d4d0c8", padding: "16px 20px 20px" }}>
          {/* Beta badge */}
          <div
            className="mb-5 inline-flex items-center gap-2 px-3 py-1"
            style={{
              background: "#d4d0c8",
              border: "1px solid #808080",
              fontSize: 11,
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "#008000" }}
              aria-hidden="true"
            />
            <span style={{ color: "#000" }}>
              AI-Powered System Design — Now in Beta
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-1 text-2xl font-bold leading-tight tracking-tight" style={{ color: "#000000", fontSize: 28 }}>
            Design System Architectures
          </h1>
          <h2
            className="mb-4 font-bold"
            style={{
              fontSize: 24,
              color: "#0054e3",
            }}
          >
            with Artificial Intelligence
          </h2>

          {/* Separator */}
          <div style={{ borderTop: "1px solid #808080", borderBottom: "1px solid #ffffff", marginBottom: 12 }} />

          {/* Description */}
          <p className="mb-6 leading-relaxed" style={{ fontSize: 12, color: "#000", maxWidth: 500 }}>
            Turn ideas into production-grade architectures using natural language.
            Chat, iterate, and visualize — all in real time.
            <br />
            <strong>No diagramming tools required.</strong>
          </p>

          {/* Feature bullets */}
          <div className="mb-6 space-y-1" style={{ fontSize: 11 }}>
            {[
              "Generate architecture diagrams from plain English",
              "Iterate with AI chat — add caching, microservices, monitoring",
              "Export to Mermaid.js, share with your team",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <span style={{ color: "#008000", fontWeight: "bold" }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/copilot">
              <button className="win-btn-primary" style={{ minWidth: 140 }}>
                Try Now — It&apos;s Free
              </button>
            </Link>
            <button
              className="win-btn"
              style={{ minWidth: 120 }}
              onClick={() =>
                document
                  .getElementById("demo")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              ▶ View Demo
            </button>
            <button
              className="win-btn"
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div className="win-statusbar">
          <div className="win-statusbar-panel flex-1">
            <span style={{ color: "#0054e3" }}>http://archia.ai/copilot</span>
          </div>
          <div className="win-statusbar-panel">
            <span className="h-2 w-2 rounded-full inline-block mr-1" style={{ background: "#008000" }} />
            Online
          </div>
          <div className="win-statusbar-panel">Zone: Internet</div>
        </div>
      </div>

      {/* ── Mini App Preview Window ── */}
      <div
        className="win-window mt-6 w-full max-w-3xl animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        {/* Title bar */}
        <div className="win-titlebar">
          <div className="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
            </svg>
          </div>
          <span className="flex-1 text-xs font-bold text-white">Archia Copilot — Architecture Preview</span>
          <div className="flex gap-1" aria-hidden="true">
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

        <div style={{ background: "#d4d0c8" }}>
          <div className="flex" style={{ height: 320 }}>
            {/* Chat Panel */}
            <div
              className="flex flex-col"
              style={{
                width: "35%",
                borderRight: "1px solid #808080",
                borderRightStyle: "solid",
              }}
            >
              {/* Chat header */}
              <div
                style={{
                  borderBottom: "1px solid #808080",
                  padding: "4px 8px",
                  background: "#d4d0c8",
                  fontSize: 11,
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0054e3" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Archia Chat
              </div>

              <div className="flex-1 space-y-2 overflow-hidden p-2" style={{ background: "#ffffff" }}>
                {/* User message */}
                <div
                  className="ml-auto w-[90%] p-2"
                  style={{
                    background: "#0054e3",
                    color: "#ffffff",
                    fontSize: 11,
                    borderTop: "1px solid #1a6af5",
                    borderLeft: "1px solid #1a6af5",
                    borderRight: "1px solid #003b9e",
                    borderBottom: "1px solid #003b9e",
                  }}
                >
                  Design a scalable e-commerce backend with caching
                </div>
                {/* AI message */}
                <div
                  className="w-[90%] p-2"
                  style={{
                    background: "#d4d0c8",
                    fontSize: 11,
                    borderTop: "1px solid #ffffff",
                    borderLeft: "1px solid #ffffff",
                    borderRight: "1px solid #808080",
                    borderBottom: "1px solid #808080",
                  }}
                >
                  I&apos;ve designed a scalable architecture with load balancing, Redis caching, and async processing...
                </div>
                {/* User message 2 */}
                <div
                  className="ml-auto w-[80%] p-2"
                  style={{
                    background: "#0054e3",
                    color: "#ffffff",
                    fontSize: 11,
                    borderTop: "1px solid #1a6af5",
                    borderLeft: "1px solid #1a6af5",
                    borderRight: "1px solid #003b9e",
                    borderBottom: "1px solid #003b9e",
                  }}
                >
                  Add monitoring and observability
                </div>
                {/* Typing indicator */}
                <div
                  className="w-24 p-2"
                  style={{
                    background: "#d4d0c8",
                    fontSize: 11,
                    borderTop: "1px solid #ffffff",
                    borderLeft: "1px solid #ffffff",
                    borderRight: "1px solid #808080",
                    borderBottom: "1px solid #808080",
                  }}
                >
                  <div className="flex gap-1">
                    <div className="typing-dot h-1.5 w-1.5 rounded-full" style={{ background: "#0054e3" }} />
                    <div className="typing-dot h-1.5 w-1.5 rounded-full" style={{ background: "#0054e3" }} />
                    <div className="typing-dot h-1.5 w-1.5 rounded-full" style={{ background: "#0054e3" }} />
                  </div>
                </div>
              </div>

              {/* Input */}
              <div style={{ borderTop: "1px solid #808080", padding: 4, background: "#d4d0c8" }}>
                <div className="flex gap-1">
                  <div
                    className="win-inset flex-1 px-2"
                    style={{ height: 20, background: "#ffffff", fontSize: 11, color: "#808080" }}
                  >
                    Describe your architecture...
                  </div>
                  <button
                    className="win-btn"
                    style={{ padding: "0 6px", fontSize: 10, minWidth: 32 }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Diagram Panel */}
            <div className="relative flex flex-1 flex-col">
              {/* Diagram header */}
              <div
                style={{
                  borderBottom: "1px solid #808080",
                  padding: "4px 8px",
                  background: "#d4d0c8",
                  fontSize: 11,
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0054e3" strokeWidth="2">
                  <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
                </svg>
                Architecture Diagram
              </div>

              <div className="relative flex flex-1 items-center justify-center p-4" style={{ background: "#ffffff" }}>
                {/* Grid bg */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(#d4d0c8 1px, transparent 1px), linear-gradient(90deg, #d4d0c8 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                  aria-hidden="true"
                />
                <div className="relative w-full max-w-xs space-y-2">
                  <div className="mx-auto w-28 py-1.5 text-center text-[10px] font-bold" style={{ background: "#000080", color: "#ffffff", border: "2px outset #000080" }}>Client App</div>
                  <div className="mx-auto h-4 w-px" style={{ background: "#000" }} />
                  <div className="mx-auto w-28 py-1.5 text-center text-[10px] font-bold" style={{ background: "#800080", color: "#ffffff", border: "2px outset #800080" }}>Load Balancer</div>
                  <div className="mx-auto h-4 w-px" style={{ background: "#000" }} />
                  <div className="flex items-start justify-center gap-3">
                    <div className="w-24 py-1.5 text-center text-[10px] font-bold" style={{ background: "#000080", color: "#ffffff", border: "2px outset #000080" }}>API Server 1</div>
                    <div className="w-24 py-1.5 text-center text-[10px] font-bold" style={{ background: "#000080", color: "#ffffff", border: "2px outset #000080" }}>API Server 2</div>
                  </div>
                  <div className="mx-auto h-4 w-px" style={{ background: "#000" }} />
                  <div className="flex items-start justify-center gap-2">
                    <div className="w-20 py-1.5 text-center text-[10px] font-bold" style={{ background: "#808000", color: "#ffffff", border: "2px outset #808000" }}>Redis</div>
                    <div className="w-20 py-1.5 text-center text-[10px] font-bold" style={{ background: "#008000", color: "#ffffff", border: "2px outset #008000" }}>PostgreSQL</div>
                    <div className="w-20 py-1.5 text-center text-[10px] font-bold" style={{ background: "#800000", color: "#ffffff", border: "2px outset #800000" }}>Queue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="win-statusbar">
            <div className="win-statusbar-panel flex-1">Rendered via mermaid.js</div>
            <div className="win-statusbar-panel">100%</div>
          </div>
        </div>
      </div>
    </section>
  );
}
