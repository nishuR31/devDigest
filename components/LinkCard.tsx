import { ExternalLink, Megaphone } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import type { LinkItem } from "@/lib/types";

export default function LinkCard({
  item,
  extension,
}: {
  item: LinkItem;
  extension: string;
}) {
  const Icon = getIcon(item.icon);
  const isPremium = item.isPremiumPartner;

  return (
    <article
      className={`group relative rounded-xl border p-6 transition-all duration-300 hover:shadow-md ${
        isPremium
          ? "border-accent/20 bg-accent-soft"
          : "border-line bg-surface hover:border-accent/30"
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Icon */}
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
          isPremium ? "bg-accent/20 text-accent" : "bg-surface-soft text-accent border border-line"
        }`}>
          {isPremium ? <Megaphone className="h-6 w-6" /> : <Icon className="h-6 w-6" strokeWidth={1.5} />}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-display font-bold text-ink group-hover:text-accent transition-colors">
              {item.title}
            </h3>
            {isPremium && (
              <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[9px] font-label font-bold uppercase tracking-wider">
                Premium
              </span>
            )}
          </div>
          <p className="text-sm font-body leading-relaxed text-ink-muted line-clamp-4">
            {item.description}
          </p>
        </div>

        {/* CTA */}
        <div className="sm:self-center shrink-0">
          <a
            href={`/out?target=${encodeURIComponent(item.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-ui font-semibold text-sm transition-all ${
              isPremium
                ? "bg-accent hover:bg-accent-dim text-white shadow-sm hover:shadow-md"
                : "bg-surface-panel hover:bg-surface-soft text-ink border border-line hover:border-accent/40"
            }`}
          >
            {isPremium ? "Explore" : "Visit"}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
