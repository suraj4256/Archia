"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface DiagramPanelProps {
  diagram: string;
}

/* ── Icons ────────────────────────────────────────── */

function LayersIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
      <path d="M2 12l8.58 3.91a2 2 0 0 0 1.66 0L21 12" />
      <path d="M2 17l8.58 3.91a2 2 0 0 0 1.66 0L21 17" />
    </svg>
  );
}

function ZoomInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 8v6" />
      <path d="M8 11h6" />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M8 11h6" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* ── Empty State ──────────────────────────────────── */

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center animate-fade-in">
      <div className="relative mb-6">
        <div className="absolute inset-0 -m-4 rounded-full border border-dashed border-white/[0.06] animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-0 -m-8 rounded-full border border-dashed border-white/[0.04] animate-[spin_30s_linear_infinite_reverse]" />
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-1/20 to-accent-2/20 text-accent-3">
          <LayersIcon />
        </div>
      </div>
      <h3 className="mb-2 text-sm font-medium text-zinc-300">
        No Architecture Yet
      </h3>
      <p className="max-w-[260px] text-center text-xs leading-relaxed text-zinc-600">
        Start a conversation to generate your first system architecture diagram.
      </p>
      <div className="mt-6 flex gap-2">
        {["Client", "Server", "Database"].map((label) => (
          <span
            key={label}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[10px] text-zinc-500"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Diagram Error ────────────────────────────────── */

function DiagramError({ error, code }: { error: string; code: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 animate-fade-in">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      </div>
      <h3 className="mb-2 text-sm font-medium text-zinc-300">
        Diagram Rendering Error
      </h3>
      <p className="max-w-[300px] text-center text-xs text-zinc-500 mb-4">
        The diagram syntax couldn&apos;t be rendered. The AI will fix this on the next message.
      </p>
      <div className="max-w-lg w-full space-y-2">
        <pre className="overflow-x-auto rounded-xl border border-red-500/10 bg-red-500/5 p-3 text-[11px] text-red-300/70 max-h-20 overflow-y-auto">
          {error}
        </pre>
        <details className="text-[11px] text-zinc-500">
          <summary className="cursor-pointer hover:text-zinc-400">Show diagram code</summary>
          <pre className="mt-2 overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-zinc-400 max-h-40 overflow-y-auto">
            {code}
          </pre>
        </details>
      </div>
    </div>
  );
}

/* ── Main Diagram Panel ───────────────────────────── */

export default function DiagramPanel({ diagram }: DiagramPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [svgContent, setSvgContent] = useState<string>("");

  const renderDiagram = useCallback(async () => {
    if (!diagram) {
      setSvgContent("");
      return;
    }

    setError(null);

    try {
      // Dynamic import of mermaid to avoid SSR issues
      const mermaid = (await import("mermaid")).default;

      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        darkMode: true,
        themeVariables: {
          primaryColor: "#6366f1",
          primaryTextColor: "#fafafa",
          primaryBorderColor: "#818cf8",
          lineColor: "#71717a",
          secondaryColor: "#1e1b4b",
          tertiaryColor: "#27272a",
          background: "#18181b",
          mainBkg: "#27272a",
          nodeBorder: "#52525b",
          clusterBkg: "#1e1b4b",
          clusterBorder: "#3730a3",
          titleColor: "#fafafa",
          edgeLabelBackground: "#27272a",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "14px",
          noteBkgColor: "#27272a",
          noteTextColor: "#e4e4e7",
          noteBorderColor: "#3f3f46",
        },
        flowchart: {
          htmlLabels: true,
          curve: "basis",
          padding: 20,
          nodeSpacing: 50,
          rankSpacing: 60,
          useMaxWidth: false,
        },
        securityLevel: "loose",
      });

      const id = `mermaid-${Date.now()}`;
      const { svg } = await mermaid.render(id, diagram);
      setSvgContent(svg);
    } catch (err) {
      console.error("Mermaid render error:", err);
      setError(err instanceof Error ? err.message : "Failed to render diagram");
    }
  }, [diagram]);

  useEffect(() => {
    renderDiagram();
  }, [renderDiagram]);

  // Set SVG innerHTML when content changes
  useEffect(() => {
    if (containerRef.current && svgContent) {
      containerRef.current.innerHTML = svgContent;
      // Ensure the SVG is visible and properly sized
      const svgEl = containerRef.current.querySelector("svg");
      if (svgEl) {
        svgEl.style.maxWidth = "100%";
        svgEl.style.height = "auto";
        svgEl.style.minHeight = "200px";
        svgEl.removeAttribute("width");
      }
    }
  }, [svgContent]);

  // Reset zoom/pan on new diagram
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [diagram]);

  /* ── Zoom / Pan handlers ─────────────────────── */

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => Math.min(Math.max(0.3, z + delta), 3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStart.current = { ...pan };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: panStart.current.x + (e.clientX - dragStart.current.x),
      y: panStart.current.y + (e.clientY - dragStart.current.y),
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(diagram);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const isEmpty = !diagram;
  const hasRendered = !!svgContent && !error;

  return (
    <div className="flex h-full flex-col">
      {/* ── Header ─────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-1/10 text-accent-3">
            <LayersIcon />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">
              Architecture Diagram
            </h2>
            <p className="text-[11px] text-zinc-500">
              {isEmpty
                ? "Waiting for input…"
                : "Live preview · Drag to pan"}
            </p>
          </div>
        </div>

        {!isEmpty && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(z + 0.2, 3))}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
              title="Zoom in"
            >
              <ZoomInIcon />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(z - 0.2, 0.3))}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
              title="Zoom out"
            >
              <ZoomOutIcon />
            </button>
            <button
              type="button"
              onClick={resetView}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
              title="Reset view"
            >
              <ResetIcon />
            </button>
            <div className="mx-1 h-4 w-px bg-white/[0.06]" />
            <button
              type="button"
              onClick={handleCopy}
              className="flex h-7 items-center gap-1.5 rounded-lg px-2 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
              title="Copy Mermaid code"
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
              <span className="text-[11px]">
                {copied ? "Copied" : "Copy"}
              </span>
            </button>
            <span className="ml-2 rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] tabular-nums text-zinc-500">
              {Math.round(zoom * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* ── Diagram canvas ─────────────────────────── */}
      <div
        className="relative flex-1 overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? "grabbing" : diagram ? "grab" : "default" }}
      >
        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Radial glow behind diagram */}
        {hasRendered && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[500px] w-[500px] rounded-full bg-accent-1/[0.04] blur-[100px]" />
          </div>
        )}

        {isEmpty ? (
          <EmptyState />
        ) : error ? (
          <DiagramError error={error} code={diagram} />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center animate-fade-in p-8"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.2s ease-out",
            }}
          >
            <div
              ref={containerRef}
              className="mermaid-container"
              style={{ minWidth: "200px", minHeight: "200px" }}
            />
          </div>
        )}
      </div>

      {/* ── Footer status bar ──────────────────────── */}
      <div className="flex items-center justify-between border-t border-white/[0.06] px-6 py-2">
        <div className="flex items-center gap-2">
          {hasRendered && (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-zinc-600">Rendered</span>
            </>
          )}
          {error && (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              <span className="text-[10px] text-red-400">Error</span>
            </>
          )}
        </div>
        <span className="text-[10px] text-zinc-600 font-mono">
          mermaid.js
        </span>
      </div>
    </div>
  );
}
