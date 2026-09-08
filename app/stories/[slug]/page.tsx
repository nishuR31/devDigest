import { notFound } from "next/navigation";
import stories from "@/data/stories.json";
import ContentHighlight from "@/components/ContentHighlight";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  const story = stories.find((s) => s.slug === params.slug);
  if (!story) notFound();

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur-md">
        <div className="flex h-14 items-center gap-4 px-4 max-w-5xl mx-auto">
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

      <main className="max-w-3xl mx-auto px-5 py-12 md:py-16">
        <article>
          {/* Header */}
          <div className="mb-14 text-center">
            <div className="font-label text-[10px] uppercase tracking-[0.25em] text-ink-dim mb-6 flex items-center justify-center gap-4">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {story.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {story.readTime} min read</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight text-ink leading-[1.1] mb-6">
              {story.title}
            </h1>
            <p className="font-body text-xl md:text-2xl text-ink-muted italic max-w-xl mx-auto leading-relaxed">
              &ldquo;{story.description}&rdquo;
            </p>
          </div>

          {/* Top ad */}
          <div className="my-10 rounded-lg overflow-hidden border border-line">
            <ContentHighlight slotId="inline-leaderboard" />
          </div>

          {/* Story body */}
          <div className="story-content" dangerouslySetInnerHTML={{ __html: story.content }} />

          {/* Bottom ad */}
          <div className="my-14 rounded-lg overflow-hidden border border-line">
            <ContentHighlight slotId="footer-banner" />
          </div>

          {/* Author */}
          <div className="mt-10 p-8 bg-surface border border-line rounded-xl flex items-center gap-6">
            <div className="h-14 w-14 rounded-full bg-accent-soft flex items-center justify-center text-accent font-display font-bold text-2xl shrink-0">
              {story.author.charAt(0)}
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-ink">{story.author}</h3>
              <p className="font-body text-sm text-ink-muted italic">Veteran software engineer sharing tales from the trenches.</p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
