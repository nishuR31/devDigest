"use client";

import { useEffect, useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { clearStaleBuildCache, verifyBuildFreshness } from "@/lib/cache-cleaner";

export default function CacheCleanup() {
  const [cleared, setCleared] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check freshness on client mount
    verifyBuildFreshness();
  }, []);

  const handleClean = async () => {
    setLoading(true);
    await clearStaleBuildCache(false);
    setLoading(false);
    setCleared(true);
    setTimeout(() => setCleared(false), 3000);
  };

  return (
    <button
      onClick={handleClean}
      disabled={loading}
      title="Flush stale cache & verify latest build assets"
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-label text-ink-dim hover:text-ink hover:bg-surface-soft border border-transparent hover:border-line transition-all active:scale-95"
    >
      {cleared ? (
        <>
          <Check className="h-3 w-3 text-emerald-500" />
          <span className="text-emerald-500">Cache Fresh</span>
        </>
      ) : (
        <>
          <Sparkles className={`h-3 w-3 text-accent ${loading ? "animate-spin" : ""}`} />
          <span>{loading ? "Cleaning..." : "Purge Cache"}</span>
        </>
      )}
    </button>
  );
}
