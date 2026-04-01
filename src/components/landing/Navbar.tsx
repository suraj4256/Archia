"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-background/70 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-1 to-accent-2 shadow-lg shadow-accent-1/20 transition-shadow group-hover:shadow-accent-1/40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight text-zinc-100">
            Archia
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => scrollTo("features")}
            className="text-[13px] text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo("how-it-works")}
            className="text-[13px] text-zinc-400 transition-colors hover:text-zinc-100"
          >
            How it works
          </button>
          <button
            onClick={() => scrollTo("demo")}
            className="text-[13px] text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Demo
          </button>
        </div>

        {/* CTA */}
        <Link
          href="/copilot"
          className="group flex h-9 items-center gap-2 rounded-full bg-gradient-to-r from-accent-1 to-accent-2 px-5 text-[13px] font-medium text-white shadow-lg shadow-accent-1/20 transition-all duration-200 hover:shadow-accent-1/40 hover:brightness-110"
        >
          Open App
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}
