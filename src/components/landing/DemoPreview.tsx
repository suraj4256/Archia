"use client";

import { useEffect, useRef } from "react";

export default function DemoPreview() {
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
      { threshold: 0.05 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="relative py-16 px-6"
      style={{ background: "#3a6ea5", fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="reveal-on-scroll mb-6">
          <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#ffffff" }}>
            &gt; Live Demo
          </div>
          <h2 className="text-xl font-bold" style={{ color: "#ffffff" }}>
            See It In Action
          </h2>
          <p style={{ fontSize: 11, color: "#c0d8f0", marginTop: 4 }}>
            A real conversation with Archia — from prompt to production-grade architecture in seconds.
          </p>
        </div>

        {/* ── Main demo window ── */}
        <div className="win-window reveal-on-scroll">
          {/* Title bar */}
          <div className="win-titlebar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
              <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
            </svg>
            <span className="text-xs font-bold text-white">Archia Copilot — Live Demo</span>
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
            {["File", "Edit", "View", "Help"].map((item) => (
              <span key={item} className="win-menuitem" style={{ padding: "2px 8px", cursor: "default", fontSize: 11 }}>
                {item}
              </span>
            ))}
          </div>

          {/* App body */}
          <div style={{ background: "#d4d0c8", display: "flex", height: 540 }}>
            {/* Chat Panel */}
            <div
              className="flex flex-col"
              style={{ width: "35%", borderRight: "2px solid #808080" }}
            >
              {/* Chat title bar (inner) */}
              <div
                style={{
                  background: "#000080",
                  color: "#ffffff",
                  fontSize: 11,
                  fontWeight: "bold",
                  padding: "3px 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Archia Chat
                <span
                  className="ml-auto flex items-center gap-1 font-normal"
                  style={{ fontSize: 9, color: "#aac0ff" }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "#00ff00" }}
                    aria-hidden="true"
                  />
                  Online
                </span>
              </div>

              {/* Messages area */}
              <div
                className="flex-1 space-y-2 overflow-hidden p-2"
                style={{ background: "#ffffff" }}
              >
                {/* User msg 1 */}
                <div
                  className="ml-auto w-[88%] px-2 py-1.5"
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
                  Design a microservices architecture for a food delivery platform
                </div>

                {/* AI msg 1 */}
                <div
                  className="flex gap-2"
                >
                  <div
                    className="shrink-0 flex items-center justify-center"
                    style={{
                      width: 20,
                      height: 20,
                      background: "#d4d0c8",
                      borderTop: "1px solid #ffffff",
                      borderLeft: "1px solid #ffffff",
                      borderRight: "1px solid #808080",
                      borderBottom: "1px solid #808080",
                      fontSize: 9,
                    }}
                    aria-hidden="true"
                  >
                    AI
                  </div>
                  <div
                    className="px-2 py-1.5"
                    style={{
                      background: "#d4d0c8",
                      fontSize: 11,
                      borderTop: "1px solid #ffffff",
                      borderLeft: "1px solid #ffffff",
                      borderRight: "1px solid #808080",
                      borderBottom: "1px solid #808080",
                      flex: 1,
                    }}
                  >
                    {"Here's a microservices architecture with an API Gateway, dedicated services for Auth, Orders, Restaurants, Delivery, and Payments — each with their own database."}
                  </div>
                </div>

                {/* User msg 2 */}
                <div
                  className="ml-auto w-[72%] px-2 py-1.5"
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
                  Add real-time tracking with WebSockets
                </div>

                {/* AI msg 2 */}
                <div className="flex gap-2">
                  <div
                    className="shrink-0 flex items-center justify-center"
                    style={{
                      width: 20,
                      height: 20,
                      background: "#d4d0c8",
                      borderTop: "1px solid #ffffff",
                      borderLeft: "1px solid #ffffff",
                      borderRight: "1px solid #808080",
                      borderBottom: "1px solid #808080",
                      fontSize: 9,
                    }}
                    aria-hidden="true"
                  >
                    AI
                  </div>
                  <div
                    className="px-2 py-1.5"
                    style={{
                      background: "#d4d0c8",
                      fontSize: 11,
                      borderTop: "1px solid #ffffff",
                      borderLeft: "1px solid #ffffff",
                      borderRight: "1px solid #808080",
                      borderBottom: "1px solid #808080",
                      flex: 1,
                    }}
                  >
                    Added WebSocket Gateway with Tracking Service and Redis Pub/Sub for real-time driver location updates ✓
                  </div>
                </div>

                {/* User msg 3 */}
                <div
                  className="ml-auto w-[65%] px-2 py-1.5"
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
                  Scale the order service
                </div>

                {/* Typing indicator */}
                <div className="flex gap-2">
                  <div
                    className="shrink-0 flex items-center justify-center"
                    style={{
                      width: 20,
                      height: 20,
                      background: "#d4d0c8",
                      borderTop: "1px solid #ffffff",
                      borderLeft: "1px solid #ffffff",
                      borderRight: "1px solid #808080",
                      borderBottom: "1px solid #808080",
                      fontSize: 9,
                    }}
                    aria-hidden="true"
                  >
                    AI
                  </div>
                  <div
                    className="px-3 py-2"
                    style={{
                      background: "#d4d0c8",
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
              </div>

              {/* Chat input */}
              <div
                style={{
                  borderTop: "2px solid #808080",
                  padding: 4,
                  background: "#d4d0c8",
                }}
              >
                <div className="flex gap-1">
                  <div
                    className="win-inset flex-1 px-2"
                    style={{ height: 22, background: "#ffffff", fontSize: 11, color: "#808080" }}
                  >
                    Describe your system architecture...
                  </div>
                  <button className="win-btn-primary" style={{ fontSize: 10, padding: "0 8px" }}>
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Diagram Panel */}
            <div className="relative flex flex-1 flex-col">
              {/* Diagram header bar */}
              <div
                style={{
                  background: "#000080",
                  color: "#ffffff",
                  fontSize: 11,
                  fontWeight: "bold",
                  padding: "3px 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
                    <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
                  </svg>
                  Architecture Diagram
                </div>
                <span style={{ fontSize: 9, color: "#aac0ff", fontWeight: "normal" }}>mermaid.js</span>
              </div>

              {/* Toolbar */}
              <div
                style={{
                  background: "#d4d0c8",
                  borderBottom: "1px solid #808080",
                  padding: "2px 4px",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                {["Zoom In", "Zoom Out", "Fit", "Export"].map((lbl) => (
                  <button key={lbl} className="win-btn" style={{ fontSize: 10, padding: "1px 8px" }}>
                    {lbl}
                  </button>
                ))}
                <div
                  className="ml-auto win-inset flex items-center px-2"
                  style={{ height: 18, background: "#ffffff", fontSize: 10, color: "#444", minWidth: 40 }}
                >
                  100%
                </div>
              </div>

              {/* Diagram canvas */}
              <div
                className="relative flex flex-1 items-center justify-center p-6"
                style={{ background: "#ffffff" }}
              >
                {/* Grid */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(#d4d0c8 1px, transparent 1px), linear-gradient(90deg, #d4d0c8 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                  aria-hidden="true"
                />
                <div className="relative w-full max-w-sm space-y-2">
                  {/* Gateway */}
                  <div className="mx-auto w-32 py-2 text-center text-[10px] font-bold" style={{ background: "#000080", color: "#fff", border: "2px outset #000080" }}>
                    API Gateway
                  </div>
                  <div className="mx-auto h-3 w-px" style={{ background: "#000" }} />

                  {/* Service row 1 */}
                  <div className="flex justify-center gap-2">
                    <div className="w-20 py-1.5 text-center text-[10px] font-bold" style={{ background: "#800000", color: "#fff", border: "2px outset #800000" }}>Auth</div>
                    <div className="w-20 py-1.5 text-center text-[10px] font-bold" style={{ background: "#000080", color: "#fff", border: "2px outset #000080" }}>Orders</div>
                    <div className="w-20 py-1.5 text-center text-[10px] font-bold" style={{ background: "#000080", color: "#fff", border: "2px outset #000080" }}>Restaurants</div>
                  </div>
                  <div className="mx-auto h-3 w-px" style={{ background: "#000" }} />

                  {/* Service row 2 */}
                  <div className="flex justify-center gap-2">
                    <div className="w-20 py-1.5 text-center text-[10px] font-bold" style={{ background: "#000080", color: "#fff", border: "2px outset #000080" }}>Delivery</div>
                    <div className="w-20 py-1.5 text-center text-[10px] font-bold" style={{ background: "#000080", color: "#fff", border: "2px outset #000080" }}>Payments</div>
                    <div className="w-20 py-1.5 text-center text-[10px] font-bold" style={{ background: "#006060", color: "#fff", border: "2px outset #006060" }}>Tracking</div>
                  </div>
                  <div className="mx-auto h-3 w-px" style={{ background: "#000" }} />

                  {/* Infrastructure */}
                  <div className="flex justify-center gap-2">
                    <div className="w-16 py-1.5 text-center text-[10px] font-bold" style={{ background: "#808000", color: "#fff", border: "2px outset #808000" }}>Redis</div>
                    <div className="w-16 py-1.5 text-center text-[10px] font-bold" style={{ background: "#800080", color: "#fff", border: "2px outset #800080" }}>Pub/Sub</div>
                    <div className="w-16 py-1.5 text-center text-[10px] font-bold" style={{ background: "#008000", color: "#fff", border: "2px outset #008000" }}>MongoDB</div>
                    <div className="w-16 py-1.5 text-center text-[10px] font-bold" style={{ background: "#006060", color: "#fff", border: "2px outset #006060" }}>WS</div>
                  </div>
                </div>
              </div>

              {/* Bottom status bar inside diagram panel */}
              <div className="win-statusbar">
                <span className="h-2 w-2 rounded-full" style={{ background: "#008000" }} aria-hidden="true" />
                <div className="win-statusbar-panel flex-1">Rendered</div>
                <div className="win-statusbar-panel">10 nodes · 9 connections</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
