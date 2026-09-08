"use client";

import type { LinkCategory } from "@/lib/types";
import ThemeToggle from "@/components/ThemeToggle";
import { Search } from "lucide-react";

export default function TopBar({
  categories,
  activeId,
  onSelect,
  searchQuery,
  setSearchQuery,
}: {
  categories: LinkCategory[];
  activeId: string;
  onSelect: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur-md">
      <div className="flex h-16 items-center gap-6 px-5 md:px-8 max-w-7xl mx-auto">

        {/* Masthead */}
        <div className="flex flex-col mr-auto">
          <span className="font-display text-xl font-bold tracking-tight text-ink leading-none">
            The Dev Digest
          </span>
          <span className="font-label text-[9px] uppercase tracking-[0.25em] text-ink-dim mt-0.5">
            Guides · Stories · Tools
          </span>
        </div>

        {/* Search */}
        <div className="hidden sm:block flex-1 max-w-md relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-dim" />
          <input
            type="text"
            placeholder="Search articles, tools, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface-soft border border-line rounded-lg text-sm font-ui focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all placeholder:text-ink-dim/60 text-ink"
          />
        </div>

        <ThemeToggle />
      </div>

      {/* Category pills */}
      <div className="flex gap-1 overflow-x-auto border-t border-line/60 px-4 py-2 hide-scrollbar max-w-7xl mx-auto">
        {[{ id: "all", label: "All" }, { id: "guides", label: "Guides" }, { id: "stories", label: "Stories" }, ...categories].map((cat) => {
          const active = cat.id === activeId;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-ui font-medium transition-all ${
                active
                  ? "bg-accent text-white shadow-sm"
                  : "text-ink-muted hover:bg-surface-soft hover:text-ink"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
