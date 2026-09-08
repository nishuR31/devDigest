"use client";

import { useEffect, useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import guides from "@/data/guides.json";

export default function ExitPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  const randomGuide = guides[Math.floor(Math.random() * guides.length)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
      <div className="relative w-full max-w-lg bg-surface border border-line rounded-2xl shadow-2xl p-8 animate-fade-up">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full hover:bg-surface-soft text-ink-muted hover:text-ink transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-accent-soft flex items-center justify-center text-accent">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="font-display text-2xl font-bold text-ink">Wait — one more thing</h2>
        </div>

        <p className="font-body text-ink-muted italic mb-6 leading-relaxed">
          We curated a premium deep-dive just for you. Thousands of readers have already unlocked this guide:
        </p>

        <div className="bg-surface-soft border border-line rounded-xl p-5 mb-8">
          <h3 className="font-display font-bold text-lg text-ink mb-2">{randomGuide.title}</h3>
          <p className="font-body text-sm text-ink-muted italic line-clamp-2">{randomGuide.description}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setIsVisible(false)}
            className="flex-1 px-4 py-3 rounded-xl font-ui font-medium text-ink-muted hover:bg-surface-soft transition-colors"
          >
            No thanks
          </button>
          <Link
            href={`/guides/${randomGuide.slug}`}
            onClick={() => setIsVisible(false)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-ui font-bold bg-accent text-white hover:bg-accent-dim shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Read Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
