import type { Metadata } from "next";
import { Header, Footer } from "@/components/site-shell";
import { getSiteUrl } from "@/content/site-url";
import "./globals.css";
import "./improvements.css";
import "./hierarchy.css";
import "./animations.css";
import { AttentionMotion } from "@/components/attention-motion";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Usman Tariq — Software Engineer",
    template: "%s — Usman Tariq",
  },
  description:
    "Software engineer at Huawei, based in Islamabad. Explore Usman Tariq's work in AI, distributed systems, secure applications, and software quality.",
  openGraph: {
    title: "Usman Tariq — Software Engineer",
    description: "Useful software. Intelligent tools. Reliable systems.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <AttentionMotion />
        {children}
        <Footer />
      </body>
    </html>
  );
}
