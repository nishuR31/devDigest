"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import metricsData from "@/data/metrics.json";
import type { ContentSlotConfig } from "@/lib/types";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const FORMAT_STYLE: Record<ContentSlotConfig["format"], string> = {
  rectangle: "min-h-[250px] w-full max-w-[336px] mx-auto",
  horizontal: "min-h-[90px] w-full",
  vertical: "min-h-[400px] w-full max-w-[300px] mx-auto",
};

const isConfigured =
  Boolean(metricsData.client) && !metricsData.client.includes("0000000000000000");

export default function ContentHighlight({ slotId }: { slotId: string }) {
  const config = metricsData.slots.find((s) => s.id === slotId);
  const pushed = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!isConfigured || !config || pushed.current) return;
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      }
    } catch {
      setFailed(true);
    }
  }, [config]);

  if (!config) return null;

  const containerClass = `my-4 ${
    FORMAT_STYLE[config.format as ContentSlotConfig["format"]]
  } rounded-xl bg-surface-panel/60 flex flex-col border border-line overflow-hidden`;

  // Fallback to real partner card if AdSense is pending/unfilled
  if (!isConfigured || failed) {
    return (
      <div className="p-3.5 space-y-2 text-left">
        <div className="flex items-center justify-between text-[9px] font-label text-accent font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Sparkles className="h-2.5 w-2.5" />
            Supabase Platform
          </span>
          <span className="text-ink-dim">Sponsor</span>
        </div>
        <p className="text-xs font-display font-bold text-ink leading-snug">
          PostgreSQL Database & Enterprise Auth
        </p>
        <p className="text-[11px] font-body text-ink-muted italic leading-relaxed">
          Open-source Firebase alternative with real-time replication and Edge Functions.
        </p>
        <a
          href={`/out?target=${encodeURIComponent("https://supabase.com/")}`}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg bg-accent text-[11px] font-ui font-semibold text-white shadow-sm hover:opacity-90 active:scale-95 transition-all mt-1"
        >
          <span>Explore Supabase</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <ins
        className="adsbygoogle flex-1"
        style={{ display: "block" }}
        data-ad-client={metricsData.client}
        data-ad-slot={config.slotId}
        data-ad-format={config.format === "horizontal" ? "horizontal" : "auto"}
        data-full-width-responsive="true"
      />
    </div>
  );
}
