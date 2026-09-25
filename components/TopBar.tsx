"use client";

import type { LinkCategory } from "@/lib/types";
import ThemeToggle from "@/components/ThemeToggle";
import CacheCleanup from "@/components/CacheCleanup";
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
    <header className="sticky top-0 z-30 border-b border-line bg-surface/85 backdrop-blur-xl transition-colors">
      <div className="flex h-16 items-center gap-4 sm:gap-6 px-4 md:px-8 max-w-7xl mx-auto">

        {/* Masthead */}
        <div className="flex flex-col mr-auto cursor-pointer" onClick={() => onSelect("all")}>
          <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink leading-none">
            The Dev Digest
          </span>
          <span className="font-label text-[9px] uppercase tracking-[0.25em] text-ink-dim mt-1">
            Guides · Stories · Apps · Tools
          </span>
        </div>

        {/* Search */}
        <div className="hidden sm:block flex-1 max-w-md relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-dim" />
          <input
            type="text"
            placeholder="Search 400+ articles, tools, guides, stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-soft/80 border border-line rounded-xl text-sm font-ui focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all placeholder:text-ink-dim/70 text-ink shadow-inner"
          />
        </div>

        <div className="flex items-center gap-2">
          <CacheCleanup />
          <ThemeToggle />
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-1.5 overflow-x-auto border-t border-line/50 px-4 py-2 hide-scrollbar max-w-7xl mx-auto">
        {[
          { id: "all", label: "All Content" },
          { id: "apps", label: "Web Apps & Tools (250)" },
          { id: "guides", label: "In-Depth Guides (135)" },
          { id: "stories", label: "Tech Stories (50)" },
          ...categories
        ].map((cat) => {
          const active = cat.id === activeId;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-ui font-medium transition-all ${
                active
                  ? "bg-accent text-white shadow-sm font-semibold"
                  : "text-ink-muted hover:bg-surface-soft hover:text-ink border border-transparent hover:border-line"
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
