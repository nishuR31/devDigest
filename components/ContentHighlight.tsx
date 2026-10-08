"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import metricsData from "@/data/metrics.json";
import type { ContentSlotConfig } from "@/lib/types";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const FORMAT_STYLE: Record<ContentSlotConfig["format"], string> = {
  rectangle: "min-h-[50px] w-full",
  horizontal: "min-h-[50px] w-full",
  vertical: "min-h-[80px] w-full",
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

  // Fallback to real partner card if AdSense is pending/unfilled
  if (!isConfigured || failed) {
    return (
      <a
        href={`/out?target=${encodeURIComponent("https://supabase.com/")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-2 p-2 rounded-xl bg-surface/90 hover:bg-surface border border-emerald-500/25 hover:border-emerald-500/50 transition-all shadow-xs"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold font-mono text-xs shadow-inner">
            S
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-ui text-xs font-bold text-ink group-hover:text-accent transition-colors truncate">
                Supabase
              </span>
              <span className="text-[7px] font-label font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20">
                DB
              </span>
            </div>
            <p className="text-[10px] font-body text-ink-muted truncate italic">
              Postgres & Auth platform
            </p>
          </div>
        </div>
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent text-white shadow-xs group-hover:scale-105 transition-transform">
          <ExternalLink className="h-3 w-3" />
        </div>
      </a>
    );
  }

  const containerClass = `my-1 ${
    FORMAT_STYLE[config.format as ContentSlotConfig["format"]]
  } rounded-xl bg-surface-panel/40 flex flex-col border border-line overflow-hidden`;

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
