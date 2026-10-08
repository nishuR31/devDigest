"use client";

import { useState } from "react";
import { Copy, Check, Terminal, Download } from "lucide-react";

interface SnippetViewerProps {
  title: string;
  code: string;
  language: string;
  category: string;
  copyCount: number;
}

export default function SnippetViewer({
  title,
  code,
  language,
  category,
  copyCount: initialCopies,
}: SnippetViewerProps) {
  const [copied, setCopied] = useState(false);
  const [copies, setCopies] = useState(initialCopies);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setCopies((c) => c + 1);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.${language === "typescript" ? "ts" : language === "python" ? "py" : language === "rust" ? "rs" : language === "go" ? "go" : language === "sql" ? "sql" : "txt"}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const lines = code.trim().split("\n");

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface/90 glass-card">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between border-b border-line bg-surface-soft/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-accent" />
          <span className="font-label text-xs uppercase font-bold tracking-wider text-ink-dim">
            {language}
          </span>
          <span className="text-ink-dim/40">&bull;</span>
          <span className="text-xs font-ui text-ink-dim hidden sm:inline">{category}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            title="Download source file"
            className="inline-flex items-center gap-1 rounded-xl border border-line bg-surface px-2.5 py-1 text-xs font-label text-ink-dim hover:text-ink transition-all active:scale-95"
          >
            <Download className="h-3 w-3" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-semibold font-ui transition-all active:scale-95 shadow-sm ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-accent text-white hover:opacity-90"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body with Line Numbers */}
      <div className="overflow-x-auto p-4 sm:p-5 font-label text-xs sm:text-sm leading-relaxed bg-surface-panel/30">
        <pre className="flex">
          <div className="select-none pr-4 text-right text-ink-dim/40 border-r border-line/60">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <code className="pl-4 flex-1 text-ink">{code}</code>
        </pre>
      </div>

      {/* Code Footer */}
      <div className="flex items-center justify-between border-t border-line/60 px-4 py-2 text-[11px] font-label text-ink-dim bg-surface-soft/40">
        <span>{lines.length} lines &bull; {code.length} characters</span>
        <span>Used by {copies} developers</span>
      </div>
    </div>
  );
}
