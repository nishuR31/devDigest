import { notFound } from "next/navigation";
import type { Metadata } from "next";
import stories from "@/data/stories.json";
import ContentHighlight from "@/components/ContentHighlight";
import AdUnit from "@/components/AdUnit";
import ReaderControls from "@/components/ReaderControls";
import { InlineEditorialAd } from "@/components/ReaderAds";
import { ArrowLeft, Clock, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const story = stories.find((s) => s.slug === params.slug);
  if (!story) return {};
  
  return {
    title: `${story.title} | The Dev Digest`,
    description: story.description,
    openGraph: {
      title: story.title,
      description: story.description,
      type: "article",
      url: `https://dev-digestion.vercel.app/stories/${story.slug}`,
      publishedTime: story.date,
      authors: [story.author || "The Dev Digest Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.description,
    },
  };
}

export async function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  const story = stories.find((s) => s.slug === params.slug);
  if (!story) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.description,
    datePublished: story.date,
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
        <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 max-w-5xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-ink-muted hover:text-ink transition-colors font-ui text-xs sm:text-sm">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Digest</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-label text-ink-dim truncate max-w-xs sm:max-w-md">
            <span>Tech Stories</span>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate text-ink">{story.title}</span>
          </div>
        </div>
      </header>

      <main id="article-container" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 transition-all">
        <article>
          {/* Reader Floating Toolbar */}
          <ReaderControls title={story.title} />

          {/* Header */}
          <div className="mb-10 text-center">
            <div className="font-label text-[11px] uppercase tracking-[0.2em] text-ink-dim mb-4 flex items-center justify-center gap-3">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-accent" /> {story.date}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-accent" /> {story.readTime} min read</span>
              <span>&bull;</span>
              <span className="px-2 py-0.5 rounded-full bg-accent-soft text-accent font-bold text-[9px]">
                Incident Log
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ink leading-[1.15] mb-4">
              {story.title}
            </h1>
            <p className="font-body text-lg sm:text-xl text-ink-muted italic max-w-2xl mx-auto leading-relaxed">
              &ldquo;{story.description}&rdquo;
            </p>
          </div>

          {/* Top Leaderboard Ad */}
          <AdUnit slotId="top-banner" format="horizontal" />

          {/* Story Body */}
          <div className="story-content my-8" dangerouslySetInnerHTML={{ __html: story.content }} />

          {/* Mid-Story Reader Ad */}
          <InlineEditorialAd
            slotId="inline-reading-ad"
            category="Observability & Incident Response"
            sponsorName="TelemetryOps Real-time APM"
            tagline="Pinpoint memory leaks, recursive call spikes, and un-indexed database queries in production with zero code changes."
            ctaText="Try TelemetryOps Free"
            ctaUrl="https://example.com/ad/telemetryops"
          />

          {/* Bottom Ad Grid */}
          <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdUnit slotId="bottom-left" format="rectangle" />
            <AdUnit slotId="bottom-right" format="rectangle" />
          </div>

          {/* Author Card */}
          <div className="mt-10 p-6 rounded-2xl bg-surface/80 border border-line glass-panel flex items-center gap-5">
            <div className="h-12 w-12 rounded-2xl bg-accent-soft flex items-center justify-center text-accent font-display font-black text-xl shrink-0">
              {(story.author || "S").charAt(0)}
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-ink">{story.author}</h3>
              <p className="font-body text-xs text-ink-muted italic mt-0.5">Senior on-call responder and distributed systems investigator recounting pivotal industry experiences.</p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
