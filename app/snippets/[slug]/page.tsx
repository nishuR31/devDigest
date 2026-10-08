import fs from "fs";
import path from "path";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";
import SnippetViewer from "@/components/SnippetViewer";
import ReaderControls from "@/components/ReaderControls";
import { InlineEditorialAd } from "@/components/ReaderAds";
import { ArrowLeft, Code, ChevronRight, Terminal, Sparkles, BookOpen } from "lucide-react";

function getSnippets() {
  const filePath = path.join(process.cwd(), "data", "snippets.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export async function generateStaticParams() {
  const snippets = getSnippets();
  return snippets.map((snip: any) => ({
    slug: snip.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const snippets = getSnippets();
  const snip = snippets.find((s: any) => s.slug === params.slug);

  if (!snip) {
    return { title: "Snippet Not Found | The Dev Digest" };
  }

  return {
    title: `${snip.title} — Code Snippet & Recipe | The Dev Digest`,
    description: snip.description,
    openGraph: {
      title: `${snip.title} — Production Code Snippet`,
      description: snip.description,
      type: "article",
    },
  };
}

export default function SnippetDetailsPage({ params }: { params: { slug: string } }) {
  const snippets = getSnippets();
  const snip = snippets.find((s: any) => s.slug === params.slug);

  if (!snip) notFound();

  const relatedSnippets = snippets
    .filter((s: any) => s.slug !== snip.slug && (s.language === snip.language || s.category === snip.category))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-bg">
      {/* Top Glass Header */}
      <header className="sticky top-0 z-30 border-b border-line bg-surface/85 backdrop-blur-xl transition-colors">
        <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 max-w-5xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-ink-muted hover:text-ink transition-colors font-ui text-xs sm:text-sm">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Digest</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-label text-ink-dim truncate max-w-xs sm:max-w-md">
            <span>Snippets</span>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate text-ink">{snip.title}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-label text-ink-dim">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span>/</span>
          <span className="text-accent">{snip.category}</span>
          <span>/</span>
          <span className="text-ink truncate">{snip.title}</span>
        </nav>

        {/* Reader Floating Controls */}
        <ReaderControls title={snip.title} />

        {/* Top Leaderboard Ad */}
        <AdUnit slotId="top-banner" format="horizontal" />

        {/* Snippet Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-accent-soft text-accent text-[11px] font-label font-bold uppercase tracking-wider">
              {snip.language}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-soft border border-line text-ink-dim text-[11px] font-label font-bold uppercase tracking-wider">
              {snip.complexity}
            </span>
            <span className="text-xs font-label text-ink-dim ml-auto">
              Copied {snip.copyCount} times
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-ink tracking-tight">
            {snip.title}
          </h1>

          <p className="font-body text-base sm:text-lg text-ink-muted italic leading-relaxed">
            {snip.description}
          </p>
        </div>

        {/* Interactive Code Viewer Component */}
        <SnippetViewer
          title={snip.title}
          code={snip.code}
          language={snip.language}
          category={snip.category}
          copyCount={snip.copyCount}
        />

        {/* Usage Walkthrough & Architectural Rationale */}
        <div className="rounded-3xl border border-line bg-surface/90 p-6 sm:p-8 space-y-5 glass-panel">
          <div className="flex items-center gap-2 pb-3 border-b border-line">
            <BookOpen className="h-4 w-4 text-accent" />
            <h2 className="text-lg font-bold font-display text-ink">
              Usage & Production Best Practices
            </h2>
          </div>

          <div className="space-y-4 text-sm font-ui text-ink-muted leading-relaxed">
            <p>
              This implementation is specifically optimized for high-throughput production environments. When integrating this pattern into your codebase:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm pl-2">
              <li>Ensure all asynchronous handles or listeners are cleaned up within the parent lifecycle.</li>
              <li>Avoid unbounded memory allocation by pinning cache buffers and queue capacities.</li>
              <li>Pair with automated unit tests to guarantee zero regressions under edge-case concurrency.</li>
            </ul>
          </div>
        </div>

        {/* Editorial Mid Ad */}
        <InlineEditorialAd
          slotId="inline-reading-ad"
          category={snip.category}
          sponsorName="Railway Cloud Infrastructure"
          tagline="Deploy containerized microservices, serverless functions, and distributed worker queues in 60 seconds."
          ctaText="Deploy on Railway"
          ctaUrl="https://railway.app/"
        />

        {/* Related Snippets Grid */}
        {relatedSnippets.length > 0 && (
          <div className="space-y-4 pt-4">
            <div className="section-divider mb-4">
              <span>Related Developer Snippets</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedSnippets.map((rel: any) => (
                <Link
                  key={rel.slug}
                  href={`/snippets/${rel.slug}`}
                  className="group flex flex-col p-4 rounded-2xl border border-line bg-surface/85 glass-card"
                >
                  <div className="flex items-center justify-between text-[10px] font-label text-ink-dim mb-2">
                    <span className="text-accent font-bold uppercase">{rel.language}</span>
                    <span>{rel.complexity}</span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-ink group-hover:text-accent transition-colors line-clamp-1">
                    {rel.title}
                  </h3>
                  <p className="font-body text-xs text-ink-muted mt-1 line-clamp-2 italic">
                    {rel.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Ad Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <AdUnit slotId="bottom-left" format="rectangle" />
          <AdUnit slotId="bottom-right" format="rectangle" />
        </div>
      </main>
    </div>
  );
}
