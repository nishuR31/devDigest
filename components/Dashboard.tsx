"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import LinkCard from "@/components/LinkCard";
import ContentHighlight from "@/components/ContentHighlight";
import { extensionFor } from "@/lib/extensions";
import type { LinksData } from "@/lib/types";
import guidesData from "@/data/guides.json";
import storiesData from "@/data/stories.json";
import Link from "next/link";
import { FileText, ArrowRight, BookOpen, Clock } from "lucide-react";

export default function Dashboard({ data }: { data: LinksData }) {
  const [activeId, setActiveId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    return data.categories.map((cat) => {
      const items = cat.items.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        );
      }).sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
      return { ...cat, items };
    });
  }, [searchQuery, data.categories]);

  const activeCategories = useMemo(() => {
    if (activeId === "all" || activeId === "guides" || activeId === "stories") return filteredCategories;
    const cat = filteredCategories.find((c) => c.id === activeId);
    return cat ? [cat] : [];
  }, [activeId, filteredCategories]);

  const showTools = activeId !== "guides" && activeId !== "stories";
  const showGuides = activeId === "all" || activeId === "guides";
  const showStories = activeId === "all" || activeId === "stories";

  return (
    <div className="flex h-dvh min-h-dvh flex-col bg-bg">
      <TopBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={data.categories}
        activeId={activeId}
        onSelect={setActiveId}
      />

      <div className="flex min-h-0 flex-1">
        <Sidebar
          categories={data.categories}
          activeId={activeId}
          onSelect={setActiveId}
        />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 animate-fade-up space-y-16">

            {/* Hero area on "all" */}
            {activeId === "all" && !searchQuery && (
              <section className="text-center py-8">
                <h1 className="font-display text-5xl md:text-6xl font-black tracking-tight text-ink leading-[1.1] mb-4">
                  The Dev Digest
                </h1>
                <p className="font-body text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed italic">
                  An editorial-grade publication covering software engineering tools, in-depth architectural guides, and captivating stories from the trenches.
                </p>
                <div className="section-divider mt-10">
                  <span>Latest</span>
                </div>
              </section>
            )}

            {/* ---- TOOLS SECTIONS ---- */}
            {showTools && activeCategories.map((cat, catIndex) => {
              if (cat.items.length === 0) return null;
              const extension = extensionFor(cat.id);

              return (
                <section key={cat.id} className="space-y-6">
                  <div>
                    <h2 className="font-display text-3xl font-bold tracking-tight text-ink">{cat.label}</h2>
                    <p className="font-body text-ink-muted text-base mt-1 italic">{cat.description}</p>
                  </div>

                  {catIndex === 0 && (
                      <ContentHighlight slotId="inline-leaderboard" />
                  )}

                  <div className="flex flex-col gap-5">
                    {cat.items.map((item, i) => (
                      <LinkCard key={item.url + i} item={item} extension={extension} />
                    ))}
                  </div>
                </section>
              );
            })}

            {/* ---- GUIDES SECTION ---- */}
            {showGuides && (
              <section className="space-y-8">
                <div>
                  <h2 className="font-display text-3xl font-bold tracking-tight text-ink">In-Depth Guides</h2>
                  <p className="font-body text-ink-muted text-base mt-1 italic">
                    Master modern software engineering with comprehensive, long-form tutorials.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {guidesData.filter(g =>
                    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    g.description.toLowerCase().includes(searchQuery.toLowerCase())
                  ).slice(0, activeId === "guides" ? 80 : 6).map((guide, idx) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className={`group flex flex-col bg-surface border border-line rounded-xl p-6 hover:border-accent/40 hover:shadow-md transition-none ${idx === 0 ? 'md:col-span-2' : ''}`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-9 w-9 rounded-lg bg-accent-soft flex items-center justify-center text-accent">
                          <FileText className="h-4 w-4" />
                        </div>
                        <span className="font-label text-[10px] uppercase tracking-widest text-ink-dim">
                          <Clock className="inline h-3 w-3 mr-1" />{guide.readTime} min
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {guide.title}
                      </h3>
                      <p className="font-body text-sm text-ink-muted line-clamp-3 mb-5 flex-1 italic">
                        {guide.description}
                      </p>
                      <div className="flex items-center text-sm font-ui font-semibold text-accent mt-auto">
                        Read Guide <ArrowRight className="h-3.5 w-3.5 ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* ---- STORIES SECTION ---- */}
            {showStories && (
              <section className="space-y-8">
                <div>
                  <h2 className="font-display text-3xl font-bold tracking-tight text-ink italic">Tech Stories</h2>
                  <p className="font-body text-ink-muted text-base mt-1">
                    Tales, disasters, and triumphs from the trenches of software engineering.
                  </p>
                </div>

                <div className="flex flex-col gap-8">
                  {storiesData.filter(s =>
                    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.description.toLowerCase().includes(searchQuery.toLowerCase())
                  ).slice(0, activeId === "stories" ? 20 : 4).map((story, i) => (
                    <Link
                      key={story.slug}
                      href={`/stories/${story.slug}`}
                      className="group flex flex-col sm:flex-row gap-6 bg-surface border border-line rounded-xl p-6 hover:border-accent/40 hover:shadow-md transition-all duration-300"
                    >
                      {/* Story Number */}
                      <div className="font-display text-6xl font-black text-accent/20 group-hover:text-accent/40 transition-colors leading-none shrink-0 hidden sm:block">
                        {String(i + 1).padStart(2, "0")}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="font-label text-[10px] uppercase tracking-widest text-ink-dim mb-2 block">
                          {story.date} · {story.readTime} min read
                        </span>
                        <h3 className="font-display text-2xl font-bold text-ink mb-3 group-hover:text-accent transition-colors">
                          {story.title}
                        </h3>
                        <p className="font-body text-sm text-ink-muted line-clamp-2 italic">
                          {story.description}
                        </p>
                      </div>

                      <div className="sm:self-center shrink-0">
                        <span className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-accent">
                          Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* No results */}
            {activeCategories.every(c => c.items.length === 0) && activeId !== "guides" && activeId !== "stories" && activeId !== "all" && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-xl font-display font-bold text-ink">No results found</p>
                <p className="text-ink-muted mt-2 font-body italic">Try adjusting your search query.</p>
              </div>
            )}

            {/* Footer ad */}
            <ContentHighlight slotId="footer-banner" />
          </div>
        </main>
      </div>
    </div>
  );
}
