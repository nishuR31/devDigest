"use client";

import { useMemo, useState, Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import LinkCard from "@/components/LinkCard";
import ContentHighlight from "@/components/ContentHighlight";
import { InlineEditorialAd } from "@/components/ReaderAds";
import { extensionFor } from "@/lib/extensions";
import type { LinksData } from "@/lib/types";
import guidesData from "@/data/guides.json";
import storiesData from "@/data/stories.json";
import appsData from "@/data/apps.json";
import Link from "next/link";
import { FileText, ArrowRight, BookOpen, Clock, Wrench, Sparkles, Compass } from "lucide-react";

export default function Dashboard({ data }: { data: LinksData }) {
  const [activeId, setActiveId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [appsLimit, setAppsLimit] = useState(24);
  const [guidesLimit, setGuidesLimit] = useState(24);
  const [storiesLimit, setStoriesLimit] = useState(20);

  const query = searchQuery.toLowerCase().trim();

  const filteredCategories = useMemo(() => {
    return data.categories.map((cat) => {
      const items = cat.items.filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        );
      }).sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
      return { ...cat, items };
    });
  }, [query, data.categories]);

  const activeCategories = useMemo(() => {
    if (["all", "apps", "guides", "stories"].includes(activeId)) return filteredCategories;
    const cat = filteredCategories.find((c) => c.id === activeId);
    return cat ? [cat] : [];
  }, [activeId, filteredCategories]);

  // Filtered Apps
  const filteredApps = useMemo(() => {
    return appsData.filter((app) => {
      if (!query) return true;
      return (
        app.title.toLowerCase().includes(query) ||
        app.category.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query)
      );
    });
  }, [query]);

  // Filtered Guides
  const filteredGuides = useMemo(() => {
    return guidesData.filter((g) => {
      if (!query) return true;
      return (
        g.title.toLowerCase().includes(query) ||
        g.description.toLowerCase().includes(query) ||
        (g.category && g.category.toLowerCase().includes(query))
      );
    });
  }, [query]);

  // Filtered Stories
  const filteredStories = useMemo(() => {
    return storiesData.filter((s) => {
      if (!query) return true;
      return (
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
      );
    });
  }, [query]);

  const showTools = activeId === "all" || (!["apps", "guides", "stories"].includes(activeId));
  const showApps = activeId === "all" || activeId === "apps";
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
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 animate-fade-up space-y-16">

            {/* Hero area on "all" */}
            {activeId === "all" && !query && (
              <section className="text-center py-6 sm:py-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-soft px-3 py-1 text-xs font-label text-ink-dim mb-4 glass-pill">
                  <Compass className="h-3.5 w-3.5 text-accent" />
                  <span>435+ Live Online Resources & Editorial Articles</span>
                </div>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-ink leading-[1.1] mb-4">
                  The Dev Digest
                </h1>
                <p className="font-body text-lg sm:text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed italic">
                  An editorial-grade publication delivering software engineering tools, in-depth architectural guides, and captivating stories from the tech trenches.
                </p>

                {/* Quick Hub Navigation Pills */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                  <button
                    onClick={() => setActiveId("apps")}
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/80 px-4 py-2 text-xs font-semibold font-ui text-ink hover:border-accent/40 hover:bg-surface-soft transition-all shadow-sm"
                  >
                    <Wrench className="h-3.5 w-3.5 text-accent" />
                    Web Apps & Tools ({appsData.length})
                  </button>
                  <button
                    onClick={() => setActiveId("guides")}
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/80 px-4 py-2 text-xs font-semibold font-ui text-ink hover:border-accent/40 hover:bg-surface-soft transition-all shadow-sm"
                  >
                    <FileText className="h-3.5 w-3.5 text-accent" />
                    In-Depth Guides ({guidesData.length})
                  </button>
                  <button
                    onClick={() => setActiveId("stories")}
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/80 px-4 py-2 text-xs font-semibold font-ui text-ink hover:border-accent/40 hover:bg-surface-soft transition-all shadow-sm"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-accent" />
                    Tech Stories ({storiesData.length})
                  </button>
                </div>

                <div className="section-divider mt-10">
                  <span>Featured Editorial Collection</span>
                </div>
              </section>
            )}

            {/* ---- WEB APPS & TOOLS SECTION ---- */}
            {showApps && (
              <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-accent-soft text-accent">
                        <Wrench className="h-4 w-4" />
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                        Web Apps & Online Tools
                      </h2>
                    </div>
                    <p className="font-body text-ink-muted text-sm sm:text-base mt-1 italic">
                      Zero-install, client-side developer utilities, converters, and calculators.
                    </p>
                  </div>
                  {activeId !== "apps" && (
                    <button
                      onClick={() => setActiveId("apps")}
                      className="inline-flex items-center text-xs font-ui font-semibold text-accent hover:underline shrink-0"
                    >
                      View all {appsData.length} apps <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredApps.slice(0, activeId === "apps" ? appsLimit : 6).map((app) => (
                    <Link
                      key={app.slug}
                      href={`/apps/${app.slug}`}
                      className="group flex flex-col rounded-2xl border border-line bg-surface/85 p-5 glass-card"
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-label text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-accent-soft text-accent">
                          {app.category}
                        </span>
                        <span className="text-[10px] font-label text-ink-dim">Free</span>
                      </div>

                      <h3 className="font-display text-base font-bold text-ink mb-1.5 group-hover:text-accent transition-colors line-clamp-1">
                        {app.title}
                      </h3>

                      <p className="font-body text-xs text-ink-muted line-clamp-2 mb-4 flex-1">
                        {app.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-line/60 text-xs font-ui font-medium text-accent">
                        <span>Launch Utility</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>

                {activeId === "apps" && filteredApps.length > appsLimit && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => setAppsLimit((prev) => prev + 24)}
                      className="rounded-xl border border-line bg-surface-soft px-6 py-2.5 text-xs font-semibold font-ui text-ink hover:bg-surface-panel transition-all"
                    >
                      Load More Tools ({filteredApps.length - appsLimit} remaining)
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* Mid-content Editorial Reading Ad */}
            <InlineEditorialAd
              slotId="inline-leaderboard"
              category="Infrastructure & Security"
              sponsorName="ApexCloud Edge Engine"
              tagline="Global low-latency serverless edge computing with built-in KV, caching, and automated DDoS mitigation."
              ctaText="Start Free Trial"
              ctaUrl="https://example.com/ad/apexcloud"
            />

            {/* ---- IN-DEPTH GUIDES SECTION ---- */}
            {showGuides && (
              <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-accent-soft text-accent">
                        <FileText className="h-4 w-4" />
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                        In-Depth Technical Guides
                      </h2>
                    </div>
                    <p className="font-body text-ink-muted text-sm sm:text-base mt-1 italic">
                      Master modern software architecture, scaling, and systems with hands-on walkthroughs.
                    </p>
                  </div>
                  {activeId !== "guides" && (
                    <button
                      onClick={() => setActiveId("guides")}
                      className="inline-flex items-center text-xs font-ui font-semibold text-accent hover:underline shrink-0"
                    >
                      View all {guidesData.length} guides <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredGuides.slice(0, activeId === "guides" ? guidesLimit : 6).map((guide, idx) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className={`group flex flex-col rounded-2xl border border-line bg-surface/85 p-6 glass-card ${
                        idx === 0 && activeId === "all" ? "md:col-span-2" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="h-8 w-8 rounded-xl bg-accent-soft flex items-center justify-center text-accent">
                          <FileText className="h-4 w-4" />
                        </div>
                        <span className="font-label text-[10px] uppercase tracking-widest text-ink-dim flex items-center">
                          <Clock className="inline h-3 w-3 mr-1 text-accent" />
                          {guide.readTime} min read
                        </span>
                      </div>

                      <h3 className="font-display text-base sm:text-lg font-bold text-ink mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {guide.title}
                      </h3>

                      <p className="font-body text-xs sm:text-sm text-ink-muted line-clamp-3 mb-5 flex-1 italic">
                        {guide.description}
                      </p>

                      <div className="flex items-center text-xs font-ui font-semibold text-accent mt-auto pt-3 border-t border-line/60">
                        Read Full Guide <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>

                {activeId === "guides" && filteredGuides.length > guidesLimit && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => setGuidesLimit((prev) => prev + 24)}
                      className="rounded-xl border border-line bg-surface-soft px-6 py-2.5 text-xs font-semibold font-ui text-ink hover:bg-surface-panel transition-all"
                    >
                      Load More Guides ({filteredGuides.length - guidesLimit} remaining)
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* ---- TECH STORIES SECTION ---- */}
            {showStories && (
              <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-accent-soft text-accent">
                        <BookOpen className="h-4 w-4" />
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                        Tech Stories & Incident Logs
                      </h2>
                    </div>
                    <p className="font-body text-ink-muted text-sm sm:text-base mt-1 italic">
                      Dramatized true accounts, outage retrospectives, and confessions from production.
                    </p>
                  </div>
                  {activeId !== "stories" && (
                    <button
                      onClick={() => setActiveId("stories")}
                      className="inline-flex items-center text-xs font-ui font-semibold text-accent hover:underline shrink-0"
                    >
                      View all {storiesData.length} stories <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredStories.slice(0, activeId === "stories" ? storiesLimit : 4).map((story) => (
                    <Link
                      key={story.slug}
                      href={`/stories/${story.slug}`}
                      className="group flex flex-col rounded-2xl border border-line bg-surface/85 p-6 glass-card"
                    >
                      <div className="flex items-center justify-between text-xs font-label text-ink-dim mb-3">
                        <span className="text-accent font-semibold">Incident Narrative</span>
                        <span>{story.readTime} min read</span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-ink mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {story.title}
                      </h3>

                      <p className="font-body text-xs sm:text-sm text-ink-muted line-clamp-3 mb-4 flex-1 italic">
                        {story.description}
                      </p>

                      <div className="flex items-center text-xs font-ui font-semibold text-accent mt-auto pt-3 border-t border-line/60">
                        Read Story <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>

                {activeId === "stories" && filteredStories.length > storiesLimit && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => setStoriesLimit((prev) => prev + 20)}
                      className="rounded-xl border border-line bg-surface-soft px-6 py-2.5 text-xs font-semibold font-ui text-ink hover:bg-surface-panel transition-all"
                    >
                      Load More Stories ({filteredStories.length - storiesLimit} remaining)
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* ---- CURATED TOOLS / LINKS SECTIONS ---- */}
            {showTools && activeCategories.map((cat, catIndex) => {
              if (cat.items.length === 0) return null;
              const extension = extensionFor(cat.id);

              return (
                <section key={cat.id} className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">{cat.label}</h2>
                    <p className="font-body text-ink-muted text-sm sm:text-base mt-1 italic">{cat.description}</p>
                  </div>

                  {catIndex === 0 && (
                    <ContentHighlight slotId="inline-leaderboard" />
                  )}

                  <div className="flex flex-col gap-4">
                    {cat.items.map((item, i) => (
                      <LinkCard key={item.url + i} item={item} extension={extension} />
                    ))}
                  </div>
                </section>
              );
            })}

          </div>
        </main>
      </div>
    </div>
  );
}
