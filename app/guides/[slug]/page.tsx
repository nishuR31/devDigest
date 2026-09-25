import { notFound } from "next/navigation";
import type { Metadata } from "next";
import guides from "@/data/guides.json";
import ContentHighlight from "@/components/ContentHighlight";
import AdUnit from "@/components/AdUnit";
import ReaderControls from "@/components/ReaderControls";
import { InlineEditorialAd } from "@/components/ReaderAds";
import { ArrowLeft, Clock, Calendar, ExternalLink, Megaphone, Wrench, ChevronRight } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = guides.find((g) => g.slug === params.slug) as any;
  if (!guide) return {};

  return {
    title: `${guide.title} | The Dev Digest`,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      url: `https://dev-digestion.vercel.app/guides/${guide.slug}`,
      publishedTime: guide.date,
      authors: [guide.author || "The Dev Digest Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guides.find((g) => g.slug === params.slug) as any;
  if (!guide) notFound();

  const relatedTools = guide.relatedTools || [];
  const relatedAds = guide.relatedAds || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date,
    author: {
      "@type": "Organization",
      name: "The Dev Digest",
    },
  };

  return (
    <div className="min-h-screen bg-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Top Glass Header */}
      <header className="sticky top-0 z-30 border-b border-line bg-surface/85 backdrop-blur-xl transition-colors">
        <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-ink-muted hover:text-ink transition-colors font-ui text-xs sm:text-sm">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Digest</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-label text-ink-dim truncate max-w-xs sm:max-w-md">
            <span>Guides</span>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate text-ink">{guide.title}</span>
          </div>
        </div>
      </header>

      <main id="article-container" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-12 flex flex-col lg:flex-row gap-10 transition-all">
        {/* Sidebar TOC + Sticky Ad */}
        <aside className="hidden lg:block w-60 shrink-0 space-y-6">
          <div className="sticky top-20 rounded-2xl border border-line bg-surface/80 p-5 glass-panel">
            <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-ink-dim mb-4">Guide Outline</h4>
            <ul className="space-y-2.5 text-xs font-ui text-ink-muted">
              <li className="hover:text-accent cursor-pointer transition-colors">&bull; Architectural Foundation</li>
              <li className="hover:text-accent cursor-pointer transition-colors">&bull; Core Design Principles</li>
              <li className="hover:text-accent cursor-pointer transition-colors">&bull; Step-by-Step Walkthrough</li>
              <li className="hover:text-accent cursor-pointer transition-colors">&bull; Resilient Hardening</li>
              <li className="hover:text-accent cursor-pointer transition-colors">&bull; Incident Recovery</li>
            </ul>

            <div className="mt-6 pt-5 border-t border-line/60">
              <span className="font-label text-[9px] uppercase tracking-wider text-ink-dim block mb-2 text-center">
                Sponsored
              </span>
              <div className="rounded-xl overflow-hidden border border-line bg-surface-soft/80">
                <ContentHighlight slotId="sidebar-rect" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Article Container */}
        <article className="flex-1 min-w-0">
          {/* Reader Floating Utility Toolbar */}
          <ReaderControls title={guide.title} />

          {/* Article Header */}
          <div className="mb-8">
            <div className="font-label text-[11px] uppercase tracking-[0.2em] text-ink-dim mb-3 flex items-center gap-3">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-accent" /> {guide.date}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-accent" /> {guide.readTime} min read</span>
              {guide.category && (
                <>
                  <span>&bull;</span>
                  <span className="px-2 py-0.5 rounded-full bg-accent-soft text-accent font-bold text-[9px]">
                    {guide.category}
                  </span>
                </>
              )}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ink leading-[1.15] mb-4">
              {guide.title}
            </h1>
            <p className="font-body text-lg sm:text-xl text-ink-muted italic leading-relaxed">
              {guide.description}
            </p>
          </div>

          {/* Top Leaderboard Ad */}
          <AdUnit slotId="top-banner" format="horizontal" />

          {/* Article Body */}
          <div className="story-content my-8" dangerouslySetInnerHTML={{ __html: guide.content }} />

          {/* Mid-Article Reader Ad (TOI Editorial Style) */}
          <InlineEditorialAd
            slotId="inline-reading-ad"
            category={guide.category || "Architecture"}
            sponsorName="Distributed Systems Masterclass"
            tagline="Master high-concurrency systems, fault tolerance, and consensus protocols with real-world failure drills."
            ctaText="Explore Curriculum"
            ctaUrl="https://example.com/ad/masterclass"
          />

          {/* ====== RELATED TOOLS ====== */}
          {relatedTools.length > 0 && (
            <section className="mt-12">
              <div className="section-divider mb-6">
                <span>Production Tools Mentioned</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedTools.map((tool: any, i: number) => (
                  <a
                    key={i}
                    href={`/out?target=${encodeURIComponent(tool.url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3.5 p-4 rounded-2xl border border-line bg-surface/80 glass-card"
                  >
                    <div className="h-9 w-9 rounded-xl bg-accent-soft flex items-center justify-center text-accent shrink-0">
                      <Wrench className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-ui text-sm font-semibold text-ink group-hover:text-accent transition-colors flex items-center justify-between">
                        <span>{tool.title}</span>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="font-body text-xs text-ink-muted mt-1 line-clamp-2 italic">{tool.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* ====== PREMIUM AD LINKS ====== */}
          {relatedAds.length > 0 && (
            <section className="mt-8">
              <div className="section-divider mb-6">
                <span>Featured Sponsor Solutions</span>
              </div>
              <div className="flex flex-col gap-3">
                {relatedAds.map((ad: any, i: number) => (
                  <a
                    key={i}
                    href={`/out?target=${encodeURIComponent(ad.url)}`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="group flex items-start gap-4 p-5 rounded-2xl border border-accent/20 bg-accent-soft/60 hover:bg-accent-soft transition-all shadow-sm"
                  >
                    <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent shrink-0">
                      <Megaphone className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-ui text-sm font-bold text-ink group-hover:text-accent transition-colors">
                          {ad.title}
                        </h4>
                        <span className="font-label text-[8px] uppercase tracking-wider bg-accent/20 text-accent px-1.5 py-0.5 rounded-full font-bold">
                          Partner
                        </span>
                      </div>
                      <p className="font-body text-xs text-ink-muted italic">{ad.desc}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-accent shrink-0 self-center opacity-60 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Bottom Ad Grid */}
          <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdUnit slotId="bottom-left" format="rectangle" />
            <AdUnit slotId="bottom-right" format="rectangle" />
          </div>

          {/* Author Card */}
          <div className="mt-10 p-6 rounded-2xl bg-surface/80 border border-line glass-panel flex items-center gap-5">
            <div className="h-12 w-12 rounded-2xl bg-accent-soft flex items-center justify-center text-accent font-display font-black text-xl shrink-0">
              {(guide.author || "N").charAt(0)}
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-ink">{guide.author || "Editorial Engineering Lead"}</h3>
              <p className="font-body text-xs text-ink-muted italic mt-0.5">Specializing in high-throughput distributed systems, edge runtimes, and developer infrastructure.</p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
