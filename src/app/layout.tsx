import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConductOS | Market Visibility Operating System",
  description: "AI Business Conductor & Market Visibility Operating System for Nisol AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#0b0f17] text-slate-100">
        {children}
      </body>
    </html>
  );
}
