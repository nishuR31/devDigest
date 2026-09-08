"use client";

import { useEffect, useRef, useState } from "react";
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

const isConfigured = metricsData.client && !metricsData.client.includes("0000000000000000");

export default function ContentHighlight({ slotId }: { slotId: string }) {
  const config = metricsData.slots.find((s) => s.id === slotId);
  const pushed = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!isConfigured || !config || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      setFailed(true);
    }
  }, [config]);

  if (!config) return null;

  const containerClass = `my-8 ${FORMAT_STYLE[config.format]} rounded-lg bg-surface-panel/60 flex flex-col border border-line overflow-hidden`;

  if (!isConfigured || failed) {
    return null;
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
