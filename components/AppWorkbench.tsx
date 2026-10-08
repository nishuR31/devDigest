"use client";

import { useState } from "react";
import { Play, Copy, Check, RefreshCw, Zap, Sparkles } from "lucide-react";

interface AppWorkbenchProps {
  appTitle: string;
  category: string;
}

export default function AppWorkbench({ appTitle, category }: AppWorkbenchProps) {
  const [input, setInput] = useState(`{"name": "DevDigest", "version": "2.4.0", "status": "active", "metrics": [10, 25, 42]}`);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [executing, setExecuting] = useState(false);
  const [mode, setMode] = useState<"auto" | "json" | "base64" | "stats" | "hash">("auto");

  const runEvaluation = () => {
    setExecuting(true);
    const start = performance.now();

    try {
      const lower = appTitle.toLowerCase();
      let res = "";

      if (mode === "json" || lower.includes("format") || lower.includes("valid") || lower.includes("json")) {
        const parsed = JSON.parse(input);
        res = JSON.stringify(parsed, null, 2);
      } else if (mode === "base64" || lower.includes("convert")) {
        try {
          res = btoa(input);
        } catch {
          res = atob(input);
        }
      } else if (mode === "stats" || lower.includes("analyz") || lower.includes("track")) {
        const words = input.trim().split(/\s+/).filter(Boolean).length;
        const chars = input.length;
        const lines = input.split("\n").length;
        const readingTimeSec = Math.ceil((words / 200) * 60);
        res = JSON.stringify(
          {
            words,
            characters: chars,
            lines,
            estimatedReadingTime: `${readingTimeSec}s`,
            characterDensity: `${(chars / Math.max(1, words)).toFixed(1)} chars/word`,
          },
          null,
          2
        );
      } else if (lower.includes("calc")) {
        try {
          // Safe arithmetic evaluation
          const sanitized = input.replace(/[^0-9+\-*/().%^ ]/g, "");
          // eslint-disable-next-line no-new-func
          const mathRes = Function(`'use strict'; return (${sanitized || "0"})`)();
          res = `Calculation Result: ${mathRes}`;
        } catch {
          res = `Calculated Hash: ${Math.abs(input.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0))}`;
        }
      } else {
        // General text transformation / processor
        res = `[Output: ${appTitle}]\nProcessed Payload: ${input.toUpperCase()}\nLength: ${input.length} bytes\nTimestamp: ${new Date().toISOString()}`;
      }

      const elapsed = Math.round((performance.now() - start) * 100) / 100;
      setOutput(res);
      setLatency(elapsed);
    } catch (err: any) {
      setOutput(`Syntax / Validation Notice: ${err?.message || "Invalid input format"}`);
      setLatency(0.5);
    } finally {
      setExecuting(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setLatency(null);
  };

  return (
    <div className="my-8 rounded-2xl border border-line bg-surface-soft/80 p-5 sm:p-6 shadow-inner glass-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-line gap-2">
        <div className="flex items-center gap-2 text-xs font-label text-ink-dim">
          <Zap className="h-4 w-4 text-accent" />
          <span className="font-bold text-ink">Interactive Live Console</span>
          <span className="text-ink-dim/40">&bull;</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">Ready</span>
        </div>

        {/* Quick Transform Presets */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMode("auto")}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-label font-bold uppercase transition-all ${
              mode === "auto" ? "bg-accent text-white" : "bg-surface text-ink-muted hover:text-ink"
            }`}
          >
            Auto
          </button>
          <button
            onClick={() => setMode("json")}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-label font-bold uppercase transition-all ${
              mode === "json" ? "bg-accent text-white" : "bg-surface text-ink-muted hover:text-ink"
            }`}
          >
            JSON
          </button>
          <button
            onClick={() => setMode("stats")}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-label font-bold uppercase transition-all ${
              mode === "stats" ? "bg-accent text-white" : "bg-surface text-ink-muted hover:text-ink"
            }`}
          >
            Metrics
          </button>
          <button
            onClick={() => setMode("base64")}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-label font-bold uppercase transition-all ${
              mode === "base64" ? "bg-accent text-white" : "bg-surface text-ink-muted hover:text-ink"
            }`}
          >
            Base64
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold font-ui text-ink mb-1.5">
            Input Payload & Source Parameters
          </label>
          <textarea
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste payload here..."
            className="w-full rounded-xl border border-line bg-surface p-3 text-xs sm:text-sm font-label text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all shadow-inner"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={runEvaluation}
            disabled={executing}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
          >
            <Play className={`h-3.5 w-3.5 ${executing ? "animate-spin" : ""}`} />
            <span>Execute Computation</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3.5 py-2 text-xs font-medium text-ink-muted hover:text-ink transition-all active:scale-95"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Clear</span>
          </button>

          {latency !== null && (
            <span className="font-label text-[11px] text-ink-dim flex items-center gap-1 ml-auto">
              <Sparkles className="h-3 w-3 text-accent" />
              Latency: <strong className="text-ink">{latency} ms</strong>
            </span>
          )}
        </div>

        {output && (
          <div className="mt-4 pt-4 border-t border-line/70 animate-fade-up">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold font-ui text-ink">
                Execution Output
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs font-ui font-medium text-accent hover:underline"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-500" />
                    <span className="text-emerald-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy Output</span>
                  </>
                )}
              </button>
            </div>
            <pre className="w-full max-h-56 overflow-auto rounded-xl border border-line bg-surface p-3 font-label text-xs sm:text-sm text-ink leading-relaxed shadow-inner">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
