import { ExternalLink } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import type { LinkItem } from "@/lib/types";

export default function LinkCard({
  item,
}: {
  item: LinkItem;
  extension: string;
}) {
  const Icon = getIcon(item.icon);
  const isPremium = item.isPremiumPartner;

  return (
    <article
      className={`group relative rounded-xl border transition-all duration-200 ${
        isPremium
          ? "py-2 px-3 sm:py-2.5 sm:px-4 border-emerald-500/30 dark:border-emerald-400/30 bg-surface/90 hover:border-emerald-500/50 hover:shadow-md shadow-xs"
          : "py-2 px-3 sm:py-2.5 sm:px-4 border-line bg-surface/80 glass-card hover:border-line-hover"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Icon & Text */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
          <div
            className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border shadow-inner ${
              isPremium
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                : "bg-surface-soft text-accent border-line/70"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h3 className="text-xs sm:text-sm font-display font-bold text-ink group-hover:text-accent transition-colors truncate">
                {item.title}
              </h3>
              {isPremium && (
                <span className="shrink-0 px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[8px] font-label font-bold uppercase tracking-wider">
                  Featured
                </span>
              )}
            </div>
            <p className="text-[11px] sm:text-xs font-body text-ink-muted truncate italic">
              {item.description}
            </p>
          </div>
        </div>

        {/* Right: CTA Button */}
        <div className="shrink-0">
          <a
            href={`/out?target=${encodeURIComponent(item.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-1 h-7 sm:h-8 px-2.5 sm:px-3 rounded-lg font-ui font-semibold text-[11px] sm:text-xs transition-all shadow-xs ${
              isPremium
                ? "bg-accent hover:bg-accent-dim text-white shadow-accent/20 hover:shadow active:scale-95"
                : "bg-surface-panel hover:bg-surface-soft text-ink border border-line hover:border-accent/40"
            }`}
          >
            <span>{isPremium ? "Explore" : "Visit"}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
}
