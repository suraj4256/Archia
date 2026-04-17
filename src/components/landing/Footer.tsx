import Link from "next/link";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Demo", href: "#demo" },
    { label: "Open App", href: "/copilot" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#3a6ea5", fontFamily: "Tahoma, 'MS Sans Serif', sans-serif", paddingBottom: 8 }}>
      {/* ── Footer window ── */}
      <div
        style={{
          background: "#d4d0c8",
          borderTop: "2px solid #ffffff",
          borderLeft: "2px solid #ffffff",
          borderRight: "2px solid #424242",
          outline: "1px solid #808080",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: "linear-gradient(to right, #0054e3, #1084d0)",
            color: "#ffffff",
            fontSize: 11,
            fontWeight: "bold",
            padding: "3px 6px",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          Archia — Site Map
        </div>

        {/* Footer content */}
        <div style={{ padding: "20px 24px 16px" }}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div
                  style={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#d4d0c8",
                    borderTop: "1px solid #ffffff",
                    borderLeft: "1px solid #ffffff",
                    borderRight: "1px solid #808080",
                    borderBottom: "1px solid #808080",
                  }}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="0" y="0" width="7" height="7" fill="#ff0000" />
                    <rect x="9" y="0" width="7" height="7" fill="#00ff00" />
                    <rect x="0" y="9" width="7" height="7" fill="#0000ff" />
                    <rect x="9" y="9" width="7" height="7" fill="#ffff00" />
                  </svg>
                </div>
                <span style={{ fontSize: 12, fontWeight: "bold", color: "#000" }}>Archia</span>
              </div>
              <p style={{ fontSize: 11, color: "#444", lineHeight: 1.5, maxWidth: 180 }}>
                Design production-grade system architectures with AI-powered intelligence.
              </p>
              {/* Version info */}
              <div
                className="mt-3"
                style={{
                  border: "1px solid #808080",
                  borderTop: "1px solid #ffffff",
                  background: "#d4d0c8",
                  padding: "4px 8px",
                  fontSize: 9,
                  color: "#666",
                }}
              >
                Version 1.0.0 (Build 2195)
                <br />
                &copy; 2000 Archia Corp.
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                {/* Group box */}
                <div
                  style={{
                    border: "1px solid #808080",
                    borderTop: "0",
                    background: "#d4d0c8",
                    position: "relative",
                    padding: "16px 10px 10px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -9,
                      left: 8,
                      background: "#d4d0c8",
                      padding: "0 4px",
                      fontSize: 11,
                      fontWeight: "bold",
                      color: "#000",
                    }}
                  >
                    {category}
                  </div>
                  <ul className="space-y-1">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          style={{
                            fontSize: 11,
                            color: "#0000ff",
                            textDecoration: "underline",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              background: "#0000ff",
                              display: "inline-block",
                              flexShrink: 0,
                            }}
                            aria-hidden="true"
                          />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── System taskbar / status bar ── */}
        <div
          style={{
            background: "#d4d0c8",
            borderTop: "2px solid #ffffff",
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "2px 4px",
          }}
        >
          {/* Start button */}
          <button
            className="win-btn-primary flex items-center gap-1"
            style={{ padding: "2px 8px", fontWeight: "bold", fontSize: 11, minWidth: 70 }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="0" y="0" width="7" height="7" fill="#ff0000" />
              <rect x="9" y="0" width="7" height="7" fill="#00ff00" />
              <rect x="0" y="9" width="7" height="7" fill="#0000ff" />
              <rect x="9" y="9" width="7" height="7" fill="#ffff00" />
            </svg>
            Start
          </button>

          <div style={{ width: 1, height: 20, background: "#808080", borderRight: "1px solid #ffffff" }} aria-hidden="true" />

          {/* Quick launch */}
          <button className="win-btn" style={{ fontSize: 10, padding: "2px 6px" }}>
            Archia
          </button>
          <button className="win-btn" style={{ fontSize: 10, padding: "2px 6px" }}>
            Copilot
          </button>

          <div style={{ flex: 1 }} />

          {/* System tray */}
          <div
            style={{
              borderTop: "1px solid #808080",
              borderLeft: "1px solid #808080",
              borderRight: "1px solid #ffffff",
              borderBottom: "1px solid #ffffff",
              padding: "2px 8px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "#008000" }}
              aria-hidden="true"
            />
            <span style={{ color: "#444" }}>
              &copy; {new Date().getFullYear()} Archia. All rights reserved.
            </span>
            <span style={{ fontFamily: "monospace", fontSize: 10, color: "#000" }}>
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
