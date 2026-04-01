"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface DiagramPanelProps {
  diagram: string;
}

interface Point {
  x: number;
  y: number;
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

/* ── Node dragging utilities ──────────────────────── */

function getTranslate(el: SVGGElement): Point {
  const transform = el.getAttribute("transform") || "";
  const match = transform.match(
    /translate\(\s*([-\d.e+]+)\s*[,\s]\s*([-\d.e+]+)\s*\)/
  );
  return match
    ? { x: parseFloat(match[1]), y: parseFloat(match[2]) }
    : { x: 0, y: 0 };
}

/** Approximate the center of a Mermaid node in SVG-space. */
function getNodeCenter(node: SVGGElement): Point {
  const t = getTranslate(node);
  // Mermaid flowchart nodes have their origin at center, so translate IS the center
  // getBBox would give the local shape offset, but with htmlLabels it can be unreliable
  // The translate alone is the best robust approximation
  return t;
}

function dist(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** Extract the first x,y and last x,y from an SVG path d-string. */
function getPathEndpoints(d: string): { start: Point; end: Point } | null {
  const nums: number[] = [];
  const re = /-?[\d.]+(?:e[+-]?\d+)?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(d)) !== null) {
    nums.push(parseFloat(m[0]));
  }
  if (nums.length < 4) return null;
  return {
    start: { x: nums[0], y: nums[1] },
    end: { x: nums[nums.length - 2], y: nums[nums.length - 1] },
  };
}

/**
 * Shift all coordinate-pairs in an SVG path d-string.
 * The first pair shifts by sourceDelta, the last by targetDelta,
 * and intermediate pairs interpolate linearly between the two.
 */
function shiftPathCoords(
  d: string,
  sourceDelta: Point,
  targetDelta: Point
): string {
  // 1. Collect every number
  const extractRe = /-?[\d.]+(?:e[+-]?\d+)?/g;
  const numbers: number[] = [];
  let em: RegExpExecArray | null;
  while ((em = extractRe.exec(d)) !== null) {
    numbers.push(parseFloat(em[0]));
  }

  const numPairs = Math.floor(numbers.length / 2);
  if (numPairs < 2) return d;

  // 2. Apply gradient interpolation on x,y pairs
  const modified = [...numbers];
  for (let i = 0; i < numPairs; i++) {
    const t = i / (numPairs - 1); // 0 at start → 1 at end
    modified[i * 2] += sourceDelta.x * (1 - t) + targetDelta.x * t;
    modified[i * 2 + 1] += sourceDelta.y * (1 - t) + targetDelta.y * t;
  }

  // 3. Replace numbers in-place (use a NEW regex to avoid shared state)
  let idx = 0;
  const replaceRe = /-?[\d.]+(?:e[+-]?\d+)?/g;
  return d.replace(replaceRe, () => modified[idx++].toFixed(2));
}

interface EdgeInfo {
  pathEl: SVGPathElement;
  sourceId: string;
  targetId: string;
  originalD: string;
}

/**
 * Wire up per-node drag handlers on the rendered Mermaid SVG.
 * Nodes can be grabbed and repositioned; connected edges follow smoothly.
 * Returns a cleanup function.
 */
function setupNodeDragging(
  svgEl: SVGSVGElement,
  zoomRef: React.RefObject<number>
): () => void {
  const cleanups: (() => void)[] = [];

  // ── Collect nodes ─────────────────────────────────
  const nodeEls = Array.from(svgEl.querySelectorAll("g.node")) as SVGGElement[];
  if (nodeEls.length === 0) return () => {};

  const nodeMap = new Map<string, { el: SVGGElement; center: Point }>();
  nodeEls.forEach((el) => {
    nodeMap.set(el.id, { el, center: getNodeCenter(el) });
  });

  // ── Collect ALL <path> elements inside .edgePaths ──
  const allEdgePaths = Array.from(
    svgEl.querySelectorAll(".edgePaths path, .edgePath path")
  ) as SVGPathElement[];

  // ── Map each edge-path to source & target node ────
  const edges: EdgeInfo[] = [];

  for (const pathEl of allEdgePaths) {
    const d = pathEl.getAttribute("d");
    if (!d) continue;

    const ep = getPathEndpoints(d);
    if (!ep) continue;

    // Find the closest node to each endpoint
    let sourceId = "";
    let targetId = "";
    let bestSD = Infinity;
    let bestTD = Infinity;

    nodeMap.forEach(({ center }, id) => {
      const ds = dist(ep.start, center);
      const dt = dist(ep.end, center);
      if (ds < bestSD) { bestSD = ds; sourceId = id; }
      if (dt < bestTD) { bestTD = dt; targetId = id; }
    });

    if (sourceId && targetId) {
      edges.push({ pathEl, sourceId, targetId, originalD: d });
    }
  }

  // ── Collect edge labels ───────────────────────────
  const edgeLabelEls = Array.from(
    svgEl.querySelectorAll(".edgeLabel")
  ) as SVGGElement[];
  const edgeLabelOrigT = edgeLabelEls.map((el) => getTranslate(el));

  // ── Track per-node displacement ───────────────────
  const nodeDeltas = new Map<string, Point>();
  nodeMap.forEach((_, id) => nodeDeltas.set(id, { x: 0, y: 0 }));

  /** Update all edge paths & labels after any node moves. */
  function updateEdges() {
    for (const edge of edges) {
      const sd = nodeDeltas.get(edge.sourceId) || { x: 0, y: 0 };
      const td = nodeDeltas.get(edge.targetId) || { x: 0, y: 0 };

      // Skip update if both deltas are zero
      if (sd.x === 0 && sd.y === 0 && td.x === 0 && td.y === 0) continue;

      const newD = shiftPathCoords(edge.originalD, sd, td);
      edge.pathEl.setAttribute("d", newD);
    }

    // Move edge labels by the avg delta of their adjacent nodes
    // (best-effort: labels are ordered same as edgePaths in most Mermaid versions)
    for (let i = 0; i < edgeLabelEls.length && i < edges.length; i++) {
      const sd = nodeDeltas.get(edges[i].sourceId) || { x: 0, y: 0 };
      const td = nodeDeltas.get(edges[i].targetId) || { x: 0, y: 0 };
      const orig = edgeLabelOrigT[i];
      edgeLabelEls[i].setAttribute(
        "transform",
        `translate(${orig.x + (sd.x + td.x) / 2},${orig.y + (sd.y + td.y) / 2})`
      );
    }
  }

  // ── Wire each node for dragging ───────────────────
  nodeEls.forEach((nodeEl) => {
    nodeEl.style.cursor = "grab";

    let dragging = false;
    let startMouse: Point = { x: 0, y: 0 };
    let startTranslate: Point = { x: 0, y: 0 };
    const origTranslate = getTranslate(nodeEl);

    const onDown = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      dragging = true;
      startMouse = { x: e.clientX, y: e.clientY };
      startTranslate = getTranslate(nodeEl);
      nodeEl.style.cursor = "grabbing";
      nodeEl.style.filter = "drop-shadow(0 0 8px rgba(99,102,241,0.5))";
      nodeEl.parentElement?.appendChild(nodeEl); // bring to front
    };

    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      e.stopPropagation();
      e.preventDefault();

      const z = zoomRef.current ?? 1;
      const dx = (e.clientX - startMouse.x) / z;
      const dy = (e.clientY - startMouse.y) / z;
      const nx = startTranslate.x + dx;
      const ny = startTranslate.y + dy;
      nodeEl.setAttribute("transform", `translate(${nx},${ny})`);

      // Delta from original position (translate IS the center for Mermaid nodes)
      nodeDeltas.set(nodeEl.id, {
        x: nx - origTranslate.x,
        y: ny - origTranslate.y,
      });

      updateEdges();
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      nodeEl.style.cursor = "grab";
      nodeEl.style.filter = "none";
    };

    nodeEl.addEventListener("mousedown", onDown);
    svgEl.addEventListener("mousemove", onMove);
    svgEl.addEventListener("mouseup", onUp);
    svgEl.addEventListener("mouseleave", onUp);

    cleanups.push(() => {
      nodeEl.removeEventListener("mousedown", onDown);
      svgEl.removeEventListener("mousemove", onMove);
      svgEl.removeEventListener("mouseup", onUp);
      svgEl.removeEventListener("mouseleave", onUp);
    });
  });

  return () => cleanups.forEach((fn) => fn());
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

  // Keep a ref so imperative SVG handlers always read current zoom
  const zoomRef = useRef(zoom);
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  const renderDiagram = useCallback(async () => {
    if (!diagram) {
      setSvgContent("");
      return;
    }

    setError(null);

    try {
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

  // Set SVG innerHTML and wire up node dragging
  useEffect(() => {
    if (!containerRef.current || !svgContent) return;

    containerRef.current.innerHTML = svgContent;
    const svgEl = containerRef.current.querySelector("svg");
    if (!svgEl) return;

    svgEl.style.maxWidth = "100%";
    svgEl.style.height = "auto";
    svgEl.style.minHeight = "200px";
    svgEl.style.overflow = "visible";
    svgEl.removeAttribute("width");

    // Prevent clipping when nodes are dragged outside the original viewBox
    svgEl.querySelectorAll("g").forEach((g) => {
      (g as SVGGElement).style.overflow = "visible";
    });

    // Setup individual node dragging — returns a cleanup function
    const cleanup = setupNodeDragging(svgEl, zoomRef);
    return cleanup;
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
    // If the click is on a diagram node, let node-drag handle it
    const target = e.target as Element;
    if (target.closest(".node")) return;
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
                : "Drag nodes to rearrange · Scroll to zoom"}
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
          mermaid.js · interactive
        </span>
      </div>
    </div>
  );
}
