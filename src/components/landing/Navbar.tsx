"use client";

import { useState } from "react";
import Link from "next/link";

const MENU_ITEMS = ["File", "Edit", "View", "Favorites", "Tools", "Help"];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}>
      {/* ── Title bar ── */}
      <div className="win-titlebar flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          {/* App icon */}
          <div className="flex h-4 w-4 items-center justify-center" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="0" y="0" width="7" height="7" fill="#ff0000" />
              <rect x="9" y="0" width="7" height="7" fill="#00ff00" />
              <rect x="0" y="9" width="7" height="7" fill="#0000ff" />
              <rect x="9" y="9" width="7" height="7" fill="#ffff00" />
            </svg>
          </div>
          <span className="text-xs font-bold text-white tracking-wide">
            Archia — AI System Design Copilot
          </span>
        </div>

        {/* Window control buttons */}
        <div className="flex gap-1" role="group" aria-label="Window controls">
          {["_", "□", "✕"].map((sym) => (
            <button
              key={sym}
              aria-label={sym === "_" ? "Minimize" : sym === "□" ? "Maximize" : "Close"}
              className="flex h-[18px] w-[18px] items-center justify-center text-[10px] font-bold text-black"
              style={{
                background: "#d4d0c8",
                borderTop: "1px solid #ffffff",
                borderLeft: "1px solid #ffffff",
                borderRight: "1px solid #424242",
                borderBottom: "1px solid #424242",
              }}
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      {/* ── Menu bar ── */}
      <nav
        className="win-menubar flex items-center"
        style={{ borderBottom: "1px solid #808080" }}
        role="menubar"
      >
        {MENU_ITEMS.map((item) => (
          <button
            key={item}
            role="menuitem"
            className="win-menuitem text-xs"
            onMouseEnter={() => setActiveMenu(item)}
            onMouseLeave={() => setActiveMenu(null)}
            style={
              activeMenu === item
                ? { background: "#0054e3", color: "#ffffff" }
                : {}
            }
          >
            <span style={{ textDecoration: "underline" }}>
              {item[0]}
            </span>
            {item.slice(1)}
          </button>
        ))}
        <div className="flex-1" />
      </nav>

      {/* ── Toolbar / Address bar ── */}
      <div
        className="win-toolbar"
        style={{ borderBottom: "1px solid #808080", padding: "2px 4px" }}
      >
        {/* Toolbar buttons */}
        <div className="flex items-center gap-1">
          {[
            { label: "Back", icon: "←" },
            { label: "Forward", icon: "→" },
            { label: "Stop", icon: "✕" },
            { label: "Refresh", icon: "↻" },
            { label: "Home", icon: "⌂" },
          ].map((btn) => (
            <button
              key={btn.label}
              aria-label={btn.label}
              title={btn.label}
              className="win-btn flex flex-col items-center justify-center gap-0 text-[9px]"
              style={{ minWidth: 40, padding: "2px 4px", fontSize: 10 }}
            >
              <span className="text-sm leading-none">{btn.icon}</span>
              <span>{btn.label}</span>
            </button>
          ))}

          <div
            className="mx-1 h-6 w-px"
            style={{ background: "#808080", borderRight: "1px solid #fff" }}
          />

          {/* Nav links as toolbar buttons */}
          <button
            onClick={() => scrollTo("features")}
            className="win-btn text-xs"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo("how-it-works")}
            className="win-btn text-xs"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo("demo")}
            className="win-btn text-xs"
          >
            Demo
          </button>

          <div
            className="mx-1 h-6 w-px"
            style={{ background: "#808080", borderRight: "1px solid #fff" }}
          />

          {/* Address bar */}
          <div className="flex flex-1 items-center gap-1">
            <span className="text-xs text-black font-bold">Address</span>
            <div
              className="win-inset flex flex-1 items-center px-2"
              style={{ height: 20 }}
            >
              <span className="text-[11px] text-black">
                http://archia.ai/
              </span>
            </div>
            <Link href="/copilot">
              <button className="win-btn-primary text-xs font-bold ml-1">
                Open App →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
