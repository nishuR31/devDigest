"use client";

import { GitBranch, Zap } from "lucide-react";
import metricsData from "@/data/metrics.json";

const adsConfigured =
  metricsData.client && !metricsData.client.includes("0000000000000000");

export default function StatusBar() {
  return (
    <footer className="flex h-7 shrink-0 items-center gap-4 border-t border-line bg-surface-soft px-3 font-mono text-[11px] text-ink-dim overflow-x-auto">
      <span className="flex shrink-0 items-center gap-1">
        <GitBranch className="h-3 w-3" /> main
      </span>
      <span className="hidden shrink-0 sm:inline">TypeScript · Next.js 14</span>
      <span className="hidden shrink-0 sm:inline">UTF-8</span>
      <span className="ml-auto flex shrink-0 items-center gap-1.5">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            adsConfigured ? "bg-moss" : "bg-amber"
          }`}
        />
        ads: {adsConfigured ? "live" : "demo"}
      </span>
      <span className="hidden shrink-0 items-center gap-1 sm:flex">
        <Zap className="h-3 w-3 text-amber" /> fast refresh
      </span>
    </footer>
  );
}
