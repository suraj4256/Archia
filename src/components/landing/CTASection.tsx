import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="relative py-16 px-6"
      style={{ background: "#3a6ea5", fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}
    >
      <div className="mx-auto max-w-2xl">
        {/* ── Dialog box ── */}
        <div className="win-window">
          {/* Title bar */}
          <div className="win-titlebar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="text-xs font-bold text-white">Archia — Get Started</span>
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

          {/* Dialog body */}
          <div style={{ background: "#d4d0c8", padding: "24px 24px 16px" }}>
            {/* Icon + message row */}
            <div className="flex items-start gap-4 mb-5">
              {/* Classic info icon */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "#000080",
                  border: "3px solid #ffffff",
                  outline: "2px solid #808080",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 24,
                  fontWeight: "bold",
                  flexShrink: 0,
                  fontFamily: "Times New Roman, serif",
                }}
                aria-hidden="true"
              >
                i
              </div>

              <div>
                <h2 className="text-lg font-bold mb-1" style={{ color: "#000000" }}>
                  Start Designing Smarter Systems Today
                </h2>
                <div style={{ borderTop: "1px solid #808080", borderBottom: "1px solid #ffffff", marginBottom: 8 }} />
                <p style={{ fontSize: 11, color: "#333", lineHeight: 1.6, maxWidth: 480 }}>
                  Join engineers who use Archia to design scalable, production-grade architectures in minutes instead of hours.
                  <br /><br />
                  <strong>Free to use · No signup required · Results in seconds</strong>
                </p>
              </div>
            </div>

            {/* Social proof panel */}
            <div
              style={{
                borderTop: "1px solid #808080",
                borderLeft: "1px solid #808080",
                borderRight: "1px solid #ffffff",
                borderBottom: "1px solid #ffffff",
                background: "#ffffff",
                padding: "8px 12px",
                marginBottom: 20,
              }}
            >
              <div className="flex flex-wrap gap-x-8 gap-y-1">
                {[
                  { icon: "★", text: "4.9/5 from 200+ engineers" },
                  { icon: "✓", text: "No credit card required" },
                  { icon: "⚡", text: "Results in seconds" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-1.5" style={{ fontSize: 11 }}>
                    <span style={{ color: "#0054e3" }}>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Separator */}
            <div style={{ borderTop: "1px solid #808080", borderBottom: "1px solid #ffffff", marginBottom: 16 }} />

            {/* Dialog buttons */}
            <div className="flex justify-center gap-3">
              <Link href="/copilot">
                <button className="win-btn-primary" style={{ minWidth: 140, fontSize: 12 }}>
                  Launch Copilot →
                </button>
              </Link>
              <button className="win-btn" style={{ minWidth: 80 }}>
                Cancel
              </button>
              <button className="win-btn" style={{ minWidth: 80 }}>
                Help
              </button>
            </div>

            {/* "Don't show again" checkbox style */}
            <div className="mt-4 flex items-center gap-2" style={{ fontSize: 11 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  background: "#ffffff",
                  borderTop: "1px solid #808080",
                  borderLeft: "1px solid #808080",
                  borderRight: "1px solid #ffffff",
                  borderBottom: "1px solid #ffffff",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <span style={{ color: "#444" }}>
                Do not show this message again
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
