"use client";

import { useState, useEffect } from "react";
import { X, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import AdUnit from "@/components/AdUnit";
import metricsData from "@/data/metrics.json";

interface InlineAdProps {
  slotId?: string;
  category?: string;
  sponsorName?: string;
  tagline?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export function InlineEditorialAd({
  slotId = "inline-reading-ad",
  category = "Development",
  sponsorName = "Supabase Platform",
  tagline = "Deploy zero-cold-start PostgreSQL databases, Authentication, and Edge Functions with automated global failover.",
  ctaText = "Start Building Free",
  ctaUrl = "https://supabase.com/",
}: InlineAdProps) {
  const isConfigured =
    Boolean(metricsData.client) && !metricsData.client.includes("0000000000000000");

  return (
    <div className="my-5 sm:my-6 overflow-hidden rounded-xl border border-line bg-surface/90 p-3.5 sm:p-4 shadow-sm backdrop-blur-xl transition-all hover:border-accent/40">
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-line/60">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-accent/10 px-2 py-0.5 text-[9px] font-bold font-label uppercase tracking-widest text-accent">
            Featured Resource
          </span>
          <span className="text-[11px] text-ink-dim font-ui">in {category}</span>
        </div>
        <span className="text-[9px] font-label text-ink-dim uppercase tracking-wider">
          Curated Tool
        </span>
      </div>

      {isConfigured ? (
        <AdUnit slotId={slotId} format="horizontal" />
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-1">
          <div className="space-y-0.5 min-w-0 flex-1">
            <h4 className="text-sm sm:text-base font-bold font-display text-ink truncate">
              {sponsorName}
            </h4>
            <p className="text-xs font-body text-ink-muted leading-relaxed line-clamp-2 max-w-xl italic">
              {tagline}
            </p>
          </div>
          <a
            href={`/out?target=${encodeURIComponent(ctaUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center gap-1.5 w-full sm:w-auto rounded-lg bg-accent px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95 active:scale-95 transition-all"
          >
            <span>{ctaText}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}
    </div>
  );
}

export function StickyBottomAd() {
  const [closed, setClosed] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (closed || !scrolled) return null;

  const realSecurityUrl = "https://www.cloudflare.com/application-services/products/waf/";

  return (
    <aside aria-label="Featured recommendation" className="fixed bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl animate-fade-up">
      <div className="overflow-hidden rounded-xl border border-line bg-surface/95 shadow-2xl backdrop-blur-2xl transition-all">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-3 py-1 bg-surface-soft/80 border-b border-line text-[10px] font-label text-ink-dim">
          <div className="flex items-center gap-2">
            <span className="font-bold text-accent tracking-wider uppercase">Featured</span>
            <span className="hidden sm:inline text-ink-dim">&bull; Recommended Developer Tool</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setMinimized(!minimized)}
              title={minimized ? "Expand" : "Minimize"}
              className="p-1 rounded hover:bg-surface-panel text-ink-dim hover:text-ink transition-colors"
            >
              {minimized ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            <button
              onClick={() => setClosed(true)}
              title="Close"
              className="p-1 rounded hover:bg-surface-panel text-ink-dim hover:text-ink transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Body */}
        {!minimized && (
          <div className="p-2.5 sm:p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="text-left w-full sm:w-auto flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-bold text-ink font-display truncate">
                Cloudflare Zero-Trust & API Security WAF
              </p>
              <p className="text-[11px] text-ink-muted font-body line-clamp-1 italic">
                Defend APIs and stop automated bot attacks in real-time.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
              <a
                href={`/out?target=${encodeURIComponent(realSecurityUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-95 active:scale-95 transition-all w-full sm:w-auto"
              >
                <span>Learn More</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
