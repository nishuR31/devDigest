import { notFound } from "next/navigation";
import guides from "@/data/guides.json";
import ContentHighlight from "@/components/ContentHighlight";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, ExternalLink, Megaphone, Wrench } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guides.find((g) => g.slug === params.slug) as any;
  if (!guide) notFound();

  const relatedTools = guide.relatedTools || [];
  const relatedAds = guide.relatedAds || [];

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur-md">
        <div className="flex h-14 items-center gap-4 px-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-ink-muted hover:text-ink transition-colors font-ui text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Digest
          </Link>
          <div className="ml-auto flex gap-2">
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-surface-soft text-ink-dim hover:text-ink transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-surface-soft text-ink-dim hover:text-ink transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-10 lg:py-14 flex flex-col lg:flex-row gap-12">
        {/* Sidebar TOC + Sticky Ad */}
        <aside className="hidden lg:block w-56 shrink-0 space-y-6">
          <div className="sticky top-24">
            <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-ink-dim mb-5">Contents</h4>
            <ul className="space-y-3 text-sm font-ui text-ink-muted">
              <li className="hover:text-accent cursor-pointer transition-colors">Introduction</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Core Concepts</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Step-by-Step</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Advanced Patterns</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Operations</li>
            </ul>
            <div className="mt-10 rounded-lg overflow-hidden border border-line bg-surface-soft">
              <ContentHighlight slotId="sidebar-rect" />
            </div>
          </div>
        </aside>

        {/* Main Article */}
        <article className="flex-1 min-w-0 max-w-3xl">
          {/* Header */}
          <div className="mb-12">
            <div className="font-label text-[10px] uppercase tracking-[0.25em] text-ink-dim mb-4 flex items-center gap-4">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {guide.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {guide.readTime} min read</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight text-ink leading-[1.1] mb-6">
              {guide.title}
            </h1>
            <p className="font-body text-xl text-ink-muted italic leading-relaxed">
              {guide.description}
            </p>
          </div>

          {/* Top Ad */}
          <div className="my-10 rounded-lg overflow-hidden border border-line">
            <ContentHighlight slotId="inline-leaderboard" />
          </div>

          {/* Article Body — 5 full chapters */}
          <div className="story-content" dangerouslySetInnerHTML={{ __html: guide.content }} />

          {/* Mid-Article Ad */}
          <div className="my-14 rounded-lg overflow-hidden border border-line">
            <ContentHighlight slotId="inline-leaderboard" />
          </div>

          {/* ====== RELATED TOOLS ====== */}
          {relatedTools.length > 0 && (
            <section className="mt-16">
              <div className="section-divider mb-8">
                <span>Related Tools</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedTools.map((tool: any, i: number) => (
                  <a
                    key={i}
                    href={`/out?target=${encodeURIComponent(tool.url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 rounded-xl border border-line bg-surface hover:border-accent/40 hover:shadow-sm transition-all"
                  >
                    <div className="h-9 w-9 rounded-lg bg-surface-soft border border-line flex items-center justify-center text-accent shrink-0">
                      <Wrench className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-ui text-sm font-semibold text-ink group-hover:text-accent transition-colors flex items-center gap-1.5">
                        {tool.title}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="font-body text-xs text-ink-muted mt-1 line-clamp-2 italic">{tool.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* ====== PREMIUM / AD LINKS ====== */}
          {relatedAds.length > 0 && (
            <section className="mt-10">
              <div className="section-divider mb-8">
                <span>Premium Resources</span>
              </div>
              <div className="flex flex-col gap-4">
                {relatedAds.map((ad: any, i: number) => (
                  <a
                    key={i}
                    href={`/out?target=${encodeURIComponent(ad.url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-5 rounded-xl border border-accent/20 bg-accent-soft hover:shadow-md transition-all"
                  >
                    <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent shrink-0">
                      <Megaphone className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-ui text-sm font-bold text-ink group-hover:text-accent transition-colors">
                          {ad.title}
                        </h4>
                        <span className="font-label text-[8px] uppercase tracking-wider bg-accent/20 text-accent px-1.5 py-0.5 rounded-full">
                          Premium
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

          {/* Footer Ad */}
          <div className="my-14 rounded-lg overflow-hidden border border-line">
            <ContentHighlight slotId="footer-banner" />
          </div>

          {/* Author */}
          <div className="mt-8 p-8 bg-surface border border-line rounded-xl flex items-center gap-6">
            <div className="h-14 w-14 rounded-full bg-accent-soft flex items-center justify-center text-accent font-display font-bold text-2xl shrink-0">
              {guide.author.charAt(0)}
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-ink">{guide.author}</h3>
              <p className="font-body text-sm text-ink-muted italic">Senior Software Engineer specializing in scalable web architectures and developer tooling.</p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
