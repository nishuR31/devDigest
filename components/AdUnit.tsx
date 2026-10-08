"use client";

import React, { useEffect, useRef, useState } from "react";
import { ExternalLink, Sparkles, ShieldCheck } from "lucide-react";
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

// Production developer sponsor showcases for fallback / filler ads
const REAL_SPONSORS = [
  {
    id: "supabase",
    title: "Supabase — Open Source Firebase Alternative",
    desc: "PostgreSQL database, enterprise Auth, instant REST & GraphQL APIs, and Edge Functions with global replication.",
    cta: "Start Free Project",
    url: "https://supabase.com/",
    category: "Cloud Database & Auth",
    badge: "Featured Partner",
  },
  {
    id: "digitalocean",
    title: "DigitalOcean Droplets & Managed Cloud",
    desc: "Reliable SSD virtual machines, managed Kubernetes clusters, and NVMe databases with 99.99% uptime SLA.",
    cta: "Claim $200 Credit",
    url: "https://www.digitalocean.com/",
    category: "Infrastructure",
    badge: "Official Sponsor",
  },
  {
    id: "cloudflare",
    title: "Cloudflare Workers & Zero-Trust WAF",
    desc: "Deploy serverless code in 300+ global edge locations with automated DDoS mitigation and millisecond cold starts.",
    cta: "Deploy for Free",
    url: "https://workers.cloudflare.com/",
    category: "Edge & Security",
    badge: "Verified Partner",
  },
  {
    id: "bytebytego",
    title: "ByteByteGo System Design by Alex Xu",
    desc: "Master large-scale distributed architectures, database sharding, and FAANG technical interviews with visual guides.",
    cta: "Explore Curriculum",
    url: "https://bytebytego.com/",
    category: "System Design",
    badge: "Recommended",
  },
  {
    id: "sentry",
    title: "Sentry Code-Level APM & Error Tracking",
    desc: "Pinpoint crashes, frontend performance bottlenecks, and slow database queries before users encounter them.",
    cta: "Monitor Free",
    url: "https://sentry.io/",
    category: "Observability",
    badge: "Developer Tool",
  },
  {
    id: "tailwindui",
    title: "Tailwind UI & Production Components",
    desc: "Over 500+ crafted, accessible, and responsive application UI components built by the Tailwind CSS team.",
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

  // If AdSense is unconfigured or blocked by ad-blockers / pending review, show real sponsor card
  if (!isConfigured || failed) {
    return (
      <div
        className={`my-4 overflow-hidden rounded-2xl border border-line bg-surface/85 glass-card p-4 sm:p-5 shadow-sm transition-all hover:border-accent/30 ${className}`}
      >
        <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-line text-[10px] font-label text-ink-dim uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-accent font-bold">
            <Sparkles className="h-3 w-3" />
            Sponsored Perspective
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-emerald-500" />
            {sponsor.badge}
          </span>
        </div>
        <div
          className={`flex ${
            format === "rectangle"
              ? "flex-col gap-3"
              : "flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          }`}
        >
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-ui font-semibold text-accent uppercase tracking-wider">
              {sponsor.category}
            </span>
            <h4 className="text-sm sm:text-base font-bold font-display text-ink truncate sm:whitespace-normal">
              {sponsor.title}
            </h4>
            <p className="text-xs font-body text-ink-muted italic line-clamp-2">
              {sponsor.desc}
            </p>
          </div>
          <a
            href={`/out?target=${encodeURIComponent(sponsor.url)}`}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90 active:scale-95 transition-all w-full sm:w-auto"
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
      className={`my-4 overflow-hidden rounded-2xl border border-line bg-surface-panel/30 min-h-[90px] flex items-center justify-center ${className}`}
    >
      <ins
        className="adsbygoogle w-full"
        style={{
          display: "block",
          textAlign: "center",
          minHeight: format === "rectangle" ? "250px" : "90px",
        }}
        data-ad-client={metricsData.client}
        data-ad-slot={numericSlotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
