"use client";

import { GitBranch, Zap, Layers, Sparkles } from "lucide-react";
import metricsData from "@/data/metrics.json";
import { CURRENT_BUILD_VERSION } from "@/lib/cache-cleaner";

const adsConfigured =
  metricsData.client && !metricsData.client.includes("0000000000000000");

export default function StatusBar() {
  return (
    <footer className="flex h-8 shrink-0 items-center gap-4 border-t border-line bg-surface/85 backdrop-blur-xl px-4 font-label text-[11px] text-ink-dim overflow-x-auto select-none transition-colors">
      <span className="flex shrink-0 items-center gap-1 hover:text-ink transition-colors cursor-default">
        <GitBranch className="h-3.5 w-3.5 text-accent" /> main
      </span>
      <span className="text-line">&bull;</span>
      <span className="hidden shrink-0 sm:flex items-center gap-1.5">
        <Layers className="h-3 w-3 text-accent" />
        <span>502+ Pages Indexed</span>
      </span>
      <span className="hidden md:inline text-line">&bull;</span>
      <span className="hidden md:inline">Next.js 14 App Router (SSG)</span>
      <span className="hidden lg:inline text-line">&bull;</span>
      <span className="hidden lg:inline text-ink-dim/80">Build: {CURRENT_BUILD_VERSION}</span>

      <div className="ml-auto flex shrink-0 items-center gap-3">
        <span className="flex items-center gap-1.5 font-semibold">
          <span
            className={`h-2 w-2 rounded-full shadow-sm ${
              adsConfigured ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
            }`}
          />
          <span className="text-[10px] uppercase tracking-wider">
            Ads: {adsConfigured ? "Live" : "Sandbox"}
          </span>
        </span>
        <span className="hidden sm:flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
          <Zap className="h-3 w-3" />
          <span>Edge Cached</span>
        </span>
      </div>
    </footer>
  );
}
