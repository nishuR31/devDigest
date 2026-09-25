"use client";

import { useEffect, useState } from "react";
import { Type, Share2, Bookmark, Check, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";

export default function ReaderControls({ title }: { title: string }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [wideMode, setWideMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeFontSize = (size: "sm" | "base" | "lg") => {
    setFontSize(size);
    const content = document.querySelector(".story-content") as HTMLElement | null;
    if (content) {
      if (size === "sm") {
        content.style.fontSize = "1.05rem";
        content.style.lineHeight = "1.75";
      } else if (size === "base") {
        content.style.fontSize = "1.18rem";
        content.style.lineHeight = "1.85";
      } else {
        content.style.fontSize = "1.32rem";
        content.style.lineHeight = "1.95";
      }
    }
  };

  const toggleWideMode = () => {
    const next = !wideMode;
    setWideMode(next);
    const articleContainer = document.querySelector("#article-container") as HTMLElement | null;
    if (articleContainer) {
      if (next) {
        articleContainer.classList.add("max-w-6xl");
        articleContainer.classList.remove("max-w-4xl", "max-w-5xl");
      } else {
        articleContainer.classList.remove("max-w-6xl");
        articleContainer.classList.add("max-w-5xl");
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: window.location.href,
        });
      } catch {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Top Liquid Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-line/20">
        <div
          className="h-full bg-gradient-to-r from-accent via-rose-400 to-indigo-500 transition-all duration-100 ease-out shadow-sm"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Liquid Glass Reader Floating Controls Bar */}
      <div className="sticky top-16 z-30 flex items-center justify-between gap-3 py-2 px-4 my-4 rounded-2xl glass-panel shadow-sm border border-line">
        <div className="flex items-center gap-2">
          <span className="font-label text-[11px] uppercase tracking-wider text-ink-dim hidden sm:inline">
            Typography
          </span>
          <div className="inline-flex rounded-xl p-0.5 bg-surface-soft border border-line">
            <button
              onClick={() => changeFontSize("sm")}
              title="Compact text"
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                fontSize === "sm"
                  ? "bg-accent text-white shadow-sm"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              A-
            </button>
            <button
              onClick={() => changeFontSize("base")}
              title="Default text"
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                fontSize === "base"
                  ? "bg-accent text-white shadow-sm"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              A
            </button>
            <button
              onClick={() => changeFontSize("lg")}
              title="Large reading text"
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                fontSize === "lg"
                  ? "bg-accent text-white shadow-sm"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              A+
            </button>
          </div>

          <button
            onClick={toggleWideMode}
            title={wideMode ? "Standard View" : "Focus Wide View"}
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-line bg-surface-soft text-xs text-ink-muted hover:text-ink transition-all"
          >
            {wideMode ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            <span>{wideMode ? "Standard" : "Wide Focus"}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs font-label text-ink-dim hidden sm:inline">
            {Math.round(scrollProgress)}% read
          </div>

          <button
            onClick={() => setSaved(!saved)}
            title={saved ? "Saved" : "Save for later"}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-ui transition-all ${
              saved
                ? "border-accent bg-accent-soft text-accent"
                : "border-line bg-surface-soft text-ink-muted hover:text-ink"
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-accent" : ""}`} />
            <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
          </button>

          <button
            onClick={handleShare}
            title="Share article link"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line bg-surface-soft text-xs font-ui text-ink-muted hover:text-ink transition-all"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-emerald-500 hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
