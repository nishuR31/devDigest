"use client";

import React, { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import metricsData from "@/data/metrics.json";

interface AdUnitProps {
  slotId?: string;
  className?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

// Curated developer tools for fallback / native recommendations
const REAL_SPONSORS = [
  {
    id: "supabase",
    title: "Supabase — Open Source Firebase Alternative",
    desc: "PostgreSQL database, enterprise Auth, instant REST APIs, and Edge Functions.",
    cta: "Start Free",
    url: "https://supabase.com/",
    category: "Cloud Database",
    badge: "Developer Stack",
  },
  {
    id: "digitalocean",
    title: "DigitalOcean Droplets & Managed Cloud",
    desc: "Reliable SSD virtual machines and managed Kubernetes with 99.99% uptime SLA.",
    cta: "Claim $200 Credit",
    url: "https://www.digitalocean.com/",
    category: "Infrastructure",
    badge: "Cloud Platform",
  },
  {
    id: "cloudflare",
    title: "Cloudflare Workers & Zero-Trust WAF",
    desc: "Deploy serverless code in 300+ global edge locations with automated DDoS mitigation.",
    cta: "Deploy Free",
    url: "https://workers.cloudflare.com/",
    category: "Edge & Security",
    badge: "Edge Network",
  },
  {
    id: "bytebytego",
    title: "ByteByteGo System Design by Alex Xu",
    desc: "Master large-scale distributed architectures and FAANG technical interviews.",
    cta: "Explore Guides",
    url: "https://bytebytego.com/",
    category: "System Design",
    badge: "Architecture",
  },
  {
    id: "sentry",
    title: "Sentry Code-Level APM & Error Tracking",
    desc: "Pinpoint crashes, frontend bottlenecks, and slow database queries in production.",
    cta: "Monitor Free",
    url: "https://sentry.io/",
    category: "Observability",
    badge: "Developer Tool",
  },
  {
    id: "tailwindui",
    title: "Tailwind UI & Production Components",
    desc: "Over 500+ crafted, accessible, responsive components by the Tailwind team.",
    cta: "View Components",
    url: "https://tailwindui.com/",
    category: "Frontend Design",
    badge: "Design Stack",
  },
];

export default function AdUnit({
  slotId = "top-banner",
  className = "",
  format = "auto",
}: AdUnitProps) {
  const pushed = useRef(false);
  const [failed, setFailed] = useState(false);

  // Match slot configuration or numeric slot ID
  const matchedSlot = metricsData.slots.find((s) => s.id === slotId);
  const numericSlotId = matchedSlot
    ? matchedSlot.slotId
    : /^\d+$/.test(slotId)
    ? slotId
    : "5305326201";

  const isConfigured =
    Boolean(metricsData.client) && !metricsData.client.includes("0000000000000000");

  useEffect(() => {
    if (pushed.current || !isConfigured) return;
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      }
    } catch {
      setFailed(true);
    }
  }, [isConfigured]);

  // Deterministically select a sponsor based on slotId to avoid hydration mismatch
  const sponsorIndex =
    Math.abs(
      slotId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    ) % REAL_SPONSORS.length;
  const sponsor = REAL_SPONSORS[sponsorIndex];

  // If AdSense is unconfigured or blocked by ad-blockers / pending review, show low-height responsive card
  if (!isConfigured || failed) {
    return (
      <div
        className={`my-2 overflow-hidden rounded-xl border border-emerald-500/25 hover:border-emerald-500/45 bg-surface/90 glass-card p-2.5 sm:p-3 shadow-xs transition-all ${className}`}
      >
        <div className="flex items-center justify-between gap-2 pb-1 mb-1 border-b border-line/60 text-[8px] sm:text-[9px] font-label uppercase tracking-wider">
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            {sponsor.category}
          </span>
          <span className="text-ink-dim font-medium text-[8px] px-1.5 py-0.2 rounded bg-surface-soft">
            {sponsor.badge}
          </span>
        </div>
        <div
          className={`flex ${
            format === "rectangle"
              ? "flex-col gap-1.5"
              : "flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5"
          }`}
        >
          <div className="space-y-0.2 min-w-0 flex-1">
            <h4 className="text-xs sm:text-[13px] font-bold font-display text-ink truncate">
              {sponsor.title}
            </h4>
            <p className="text-[10px] sm:text-[11px] font-body text-ink-muted italic line-clamp-1">
              {sponsor.desc}
            </p>
          </div>
          <a
            href={`/out?target=${encodeURIComponent(sponsor.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center gap-1 h-7 px-2.5 sm:px-3 rounded-lg bg-accent text-xs font-semibold text-white shadow-xs hover:opacity-95 active:scale-95 transition-all w-full sm:w-auto"
          >
            <span>{sponsor.cta}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    );
  }

  // Google AdSense Unit
  return (
    <div
      className={`my-3 overflow-hidden rounded-xl border border-line bg-surface-panel/30 min-h-[70px] flex items-center justify-center ${className}`}
    >
      <ins
        className="adsbygoogle w-full"
        style={{
          display: "block",
          textAlign: "center",
          minHeight: format === "rectangle" ? "120px" : "70px",
        }}
        data-ad-client={metricsData.client}
        data-ad-slot={numericSlotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
