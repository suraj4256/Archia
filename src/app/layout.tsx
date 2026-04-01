import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Archia — AI System Design Copilot",
  description:
    "Design production-grade system architectures with AI. Chat, iterate, and visualize your architecture in real-time with Archia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className="min-h-full"
        style={{
          background: "#3a6ea5",
          fontFamily: "Tahoma, 'MS Sans Serif', system-ui, sans-serif",
          fontSize: 11,
          color: "#000000",
        }}
      >
        {children}
      </body>
    </html>
  );
}
