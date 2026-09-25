"use client";

import { LayoutGrid, BookOpen, FileText, Layers, Wrench } from "lucide-react";
import type { LinkCategory } from "@/lib/types";
import ContentHighlight from "@/components/ContentHighlight";

export default function Sidebar({
  categories,
  activeId,
  onSelect,
}: {
  categories: LinkCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const navItems = [
    { id: "all", label: "All Hub", icon: LayoutGrid, count: null },
    { id: "apps", label: "Web Apps & Tools", icon: Wrench, count: 250 },
    { id: "guides", label: "In-Depth Guides", icon: FileText, count: 135 },
    { id: "stories", label: "Tech Stories", icon: BookOpen, count: 50 },
  ];
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-surface/75 backdrop-blur-xl md:flex">
      {/* Sidebar header */}
      <div className="px-6 py-5 border-b border-line flex items-center justify-between">
        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-ink-dim">
          Explorer
        </span>
        <span className="font-label text-[10px] text-accent font-bold">435+ Pages</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {/* Special pages */}
        {navItems.map((item) => {
          const active = item.id === activeId;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-ui font-medium transition-all ${
                active
                  ? "bg-accent text-white shadow-sm font-semibold"
                  : "text-ink-muted hover:bg-surface-soft hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
              <span className="truncate">{item.label}</span>
              {item.count && (
                <span className={`ml-auto text-[10px] font-bold font-label px-2 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-surface-panel text-ink-dim"}`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}

        <div className="section-divider !my-4">
          <span>Categories</span>
        </div>

        {/* Category filters */}
        {categories.map((cat) => {
          const active = cat.id === activeId;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-ui font-medium transition-all ${
                active
                  ? "bg-accent-soft text-accent border border-accent/20"
                  : "text-ink-muted hover:bg-surface-soft hover:text-ink"
              }`}
            >
              <Layers className="h-4 w-4 shrink-0 opacity-70" strokeWidth={2} />
              <span className="truncate">{cat.label}</span>
              <span className={`ml-auto text-[10px] font-bold font-label px-2 py-0.5 rounded-full ${active ? "bg-accent/20 text-accent" : "bg-surface-panel text-ink-dim"}`}>
                {cat.items.length}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar ad */}
      <div className="p-4 mt-auto border-t border-line">
        <div className="font-label text-[9px] text-ink-dim uppercase tracking-[0.15em] mb-3 text-center">
          Featured Partner
        </div>
        <div className="rounded-xl overflow-hidden border border-line bg-surface-soft/80 shadow-inner">
          <ContentHighlight slotId="sidebar-rect" />
        </div>
      </div>
    </aside>
  );
}
