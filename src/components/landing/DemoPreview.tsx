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
    <section id="demo" ref={sectionRef} className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 reveal-on-scroll">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-accent-1" />
            <span className="text-xs font-medium uppercase tracking-widest text-accent-3">Live Demo</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-accent-1" />
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            See it in{" "}
            <span className="gradient-text-accent">action</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-zinc-500">
            A real conversation with Archia — from prompt to production-grade architecture in seconds.
          </p>
        </div>

        {/* Demo container */}
        <div className="reveal-on-scroll relative">
          {/* Outer glow */}
          <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-gradient-to-br from-accent-1/[0.08] via-transparent to-accent-2/[0.08] blur-[60px]" />

          <div className="gradient-border relative rounded-2xl overflow-hidden">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a0c] shadow-2xl shadow-black/60 overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3 bg-[#0e0e10]">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="mx-auto flex items-center gap-2 rounded-md bg-white/[0.04] px-4 py-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2"><rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  <span className="text-[11px] text-zinc-500">archia.ai/copilot</span>
                </div>
                <div className="flex gap-2">
                  <div className="h-4 w-4 rounded bg-white/[0.04]" />
                  <div className="h-4 w-4 rounded bg-white/[0.04]" />
                </div>
              </div>

              {/* App mock */}
              <div className="flex" style={{ height: "520px" }}>
                {/* Chat side */}
                <div className="w-[35%] border-r border-white/[0.06] flex flex-col">
                  {/* Chat header */}
                  <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                    <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-accent-1 to-accent-2 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" /></svg>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-zinc-200">Archia</span>
                      <p className="text-[9px] text-zinc-500">AI Design Copilot</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[9px] text-zinc-500">Online</span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 space-y-3 overflow-hidden p-4">
                    <div className="ml-auto w-[88%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-accent-1 to-accent-2 px-3 py-2.5">
                      <p className="text-[11px] leading-relaxed text-white">Design a microservices architecture for a food delivery platform</p>
                    </div>

                    <div className="flex gap-2">
                      <div className="mt-0.5 h-5 w-5 shrink-0 rounded-md bg-accent-1/20 flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /></svg>
                      </div>
                      <div className="rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                        <p className="text-[11px] leading-relaxed text-zinc-300">Here&apos;s a microservices architecture with an API Gateway, dedicated services for Auth, Orders, Restaurants, Delivery, and Payments — each with their own database following the database-per-service pattern.</p>
                      </div>
                    </div>

                    <div className="ml-auto w-[72%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-accent-1 to-accent-2 px-3 py-2.5">
                      <p className="text-[11px] leading-relaxed text-white">Add real-time tracking with WebSockets</p>
                    </div>

                    <div className="flex gap-2">
                      <div className="mt-0.5 h-5 w-5 shrink-0 rounded-md bg-accent-1/20 flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /></svg>
                      </div>
                      <div className="rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                        <p className="text-[11px] leading-relaxed text-zinc-300">Added a WebSocket Gateway with a dedicated Tracking Service and Redis Pub/Sub for real-time driver location updates ✓</p>
                      </div>
                    </div>

                    <div className="ml-auto w-[65%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-accent-1 to-accent-2 px-3 py-2.5">
                      <p className="text-[11px] leading-relaxed text-white">Scale the order service</p>
                    </div>

                    <div className="flex gap-2">
                      <div className="mt-0.5 h-5 w-5 shrink-0 rounded-md bg-accent-1/20" />
                      <div className="rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                        <div className="flex gap-1">
                          <div className="typing-dot h-1.5 w-1.5 rounded-full bg-accent-3" />
                          <div className="typing-dot h-1.5 w-1.5 rounded-full bg-accent-3" />
                          <div className="typing-dot h-1.5 w-1.5 rounded-full bg-accent-3" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="border-t border-white/[0.06] p-3">
                    <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                      <span className="flex-1 text-[10px] text-zinc-600">Describe your system architecture...</span>
                      <div className="h-7 w-7 rounded-lg bg-gradient-to-r from-accent-1 to-accent-2 flex items-center justify-center shadow-lg shadow-accent-1/20">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diagram side */}
                <div className="flex-1 relative">
                  {/* Diagram header */}
                  <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-lg bg-accent-1/10 flex items-center justify-center text-accent-3">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" /><path d="M2 12l8.58 3.91a2 2 0 0 0 1.66 0L21 12" /></svg>
                      </div>
                      <span className="text-[11px] font-medium text-zinc-300">Architecture Diagram</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-5 w-5 rounded bg-white/[0.04]" />
                      <div className="h-5 w-5 rounded bg-white/[0.04]" />
                      <div className="h-5 w-5 rounded bg-white/[0.04]" />
                      <span className="ml-1 rounded bg-white/[0.04] px-2 py-0.5 text-[9px] text-zinc-500">100%</span>
                    </div>
                  </div>

                  {/* Grid background */}
                  <div className="pointer-events-none absolute inset-0 top-[42px] opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "18px 18px" }} />

                  {/* Radial glow */}
                  <div className="pointer-events-none absolute inset-0 top-[42px] flex items-center justify-center">
                    <div className="h-[350px] w-[350px] rounded-full bg-accent-1/[0.05] blur-[80px]" />
                  </div>

                  {/* Diagram nodes */}
                  <div className="relative flex h-full items-center justify-center p-8 pt-12">
                    <div className="w-full max-w-sm space-y-3">
                      {/* Gateway */}
                      <div className="mx-auto w-36 rounded-lg bg-indigo-500 px-3 py-2.5 text-center text-[11px] font-medium text-white shadow-lg shadow-indigo-500/25">API Gateway</div>
                      <div className="mx-auto h-4 w-px bg-zinc-600/70" />

                      {/* Services row 1 */}
                      <div className="flex justify-center gap-2">
                        <div className="w-24 rounded-lg bg-red-500 px-2 py-2 text-center text-[10px] font-medium text-white shadow-lg shadow-red-500/20">Auth</div>
                        <div className="w-24 rounded-lg bg-blue-500 px-2 py-2 text-center text-[10px] font-medium text-white shadow-lg shadow-blue-500/20">Orders</div>
                        <div className="w-24 rounded-lg bg-blue-500 px-2 py-2 text-center text-[10px] font-medium text-white shadow-lg shadow-blue-500/20">Restaurants</div>
                      </div>
                      <div className="mx-auto h-3 w-px bg-zinc-600/70" />

                      {/* Services row 2 */}
                      <div className="flex justify-center gap-2">
                        <div className="w-24 rounded-lg bg-blue-500 px-2 py-2 text-center text-[10px] font-medium text-white shadow-lg shadow-blue-500/20">Delivery</div>
                        <div className="w-24 rounded-lg bg-blue-500 px-2 py-2 text-center text-[10px] font-medium text-white shadow-lg shadow-blue-500/20">Payments</div>
                        <div className="w-24 rounded-lg bg-teal-500 px-2 py-2 text-center text-[10px] font-medium text-white shadow-lg shadow-teal-500/20">Tracking</div>
                      </div>
                      <div className="mx-auto h-3 w-px bg-zinc-600/70" />

                      {/* Infrastructure */}
                      <div className="flex justify-center gap-2">
                        <div className="w-20 rounded-lg bg-amber-500 px-2 py-2 text-center text-[10px] font-medium text-black shadow-lg shadow-amber-500/20">Redis</div>
                        <div className="w-20 rounded-lg bg-purple-500 px-2 py-2 text-center text-[10px] font-medium text-white shadow-lg shadow-purple-500/20">Pub/Sub</div>
                        <div className="w-20 rounded-lg bg-emerald-500 px-2 py-2 text-center text-[10px] font-medium text-white shadow-lg shadow-emerald-500/20">MongoDB</div>
                        <div className="w-20 rounded-lg bg-pink-500 px-2 py-2 text-center text-[10px] font-medium text-white shadow-lg shadow-pink-500/20">WebSocket</div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-white/[0.06] px-5 py-1.5 bg-[#0a0a0c]">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[9px] text-zinc-600">Rendered</span>
                    </div>
                    <span className="text-[9px] text-zinc-600 font-mono">mermaid.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
