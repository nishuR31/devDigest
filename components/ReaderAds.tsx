"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
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
  sponsorName = "ScaleOps Cloud",
  tagline = "Deploy zero-cold-start edge microservices with automated failover and 99.999% SLA.",
  ctaText = "Claim $200 Developer Credit",
  ctaUrl = "https://example.com/ad/scaleops",
}: InlineAdProps) {
  const isConfigured = metricsData.client && !metricsData.client.includes("0000000000000000");

  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-line bg-surface/80 p-6 shadow-sm backdrop-blur-xl transition-all hover:border-accent/30">
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-line">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-[10px] font-bold font-label uppercase tracking-widest text-accent">
            <Sparkles className="h-3 w-3" />
            Sponsored Perspective
          </span>
          <span className="text-xs text-ink-dim font-ui">in {category}</span>
        </div>
        <span className="text-[10px] font-label text-ink-dim uppercase tracking-wider">
          Advertisement
        </span>
      </div>

      {isConfigured ? (
        <AdUnit slotId={slotId} format="horizontal" />
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
          <div className="space-y-1">
            <h4 className="text-base font-bold font-display text-ink flex items-center gap-1.5">
              {sponsorName}
            </h4>
            <p className="text-sm font-body text-ink-muted leading-relaxed max-w-xl">
              {tagline}
            </p>
          </div>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95 active:scale-95 transition-all"
          >
            {ctaText}
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

  return (
    <aside aria-label="Sponsored announcement" className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl animate-fade-up">
      <div className="overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-2xl backdrop-blur-2xl transition-all">
        {/* Ad Header Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-surface-soft/80 border-b border-line text-[11px] font-label text-ink-dim">
          <div className="flex items-center gap-2">
            <span className="font-bold text-accent tracking-wider uppercase">Sponsored</span>
            <span className="hidden sm:inline text-ink-dim">&bull; Recommended for Readers</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setMinimized(!minimized)}
              title={minimized ? "Expand Ad" : "Minimize Ad"}
              className="p-1 rounded-md hover:bg-surface-panel text-ink-dim hover:text-ink transition-colors"
            >
              {minimized ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={() => setClosed(true)}
              title="Close Ad"
              className="p-1 rounded-md hover:bg-surface-panel text-ink-dim hover:text-ink transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Ad Body */}
        {!minimized && (
          <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left w-full sm:w-auto">
              <p className="text-sm font-bold text-ink font-display line-clamp-1">
                Enterprise Cloud Security & Zero-Trust WAF
              </p>
              <p className="text-xs text-ink-muted font-body line-clamp-1 sm:line-clamp-2">
                Defend APIs, stop automated bot attacks, and protect user sessions in real-time.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
              <a
                href="https://example.com/ad/security"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90 active:scale-95 transition-all w-full sm:w-auto"
              >
                Learn More
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
