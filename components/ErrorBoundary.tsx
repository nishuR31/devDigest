"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw, Trash2, ArrowLeft } from "lucide-react";
import { clearStaleBuildCache } from "@/lib/cache-cleaner";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  isChunkError: boolean;
  clearing: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    isChunkError: false,
    clearing: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    const msg = error?.message || "";
    const isChunkError =
      msg.includes("Loading chunk") ||
      msg.includes("Failed to fetch dynamically imported module") ||
      msg.includes("CSS chunk") ||
      msg.includes("ChunkLoadError");

    return {
      hasError: true,
      error,
      isChunkError,
      clearing: false,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an exception:", error, errorInfo);

    // Auto-clean cache and reload on chunk loading failures
    if (this.state.isChunkError) {
      clearStaleBuildCache(true).then(() => {
        window.location.reload();
      });
    }
  }

  private handlePurgeAndReload = async () => {
    this.setState({ clearing: true });
    await clearStaleBuildCache(true);
    window.location.reload();
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 bg-gradient-to-b from-surface/50 to-bg">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-surface/80 p-8 shadow-xl backdrop-blur-xl transition-all">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <div className="rounded-xl bg-red-500/10 p-3 border border-red-500/20">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-ink">
                  {this.state.isChunkError
                    ? "Outdated Build Detected"
                    : this.props.fallbackTitle || "Application Exception"}
                </h3>
                <p className="text-xs font-label text-ink-dim">
                  {this.state.isChunkError
                    ? "New version deployed. Stale chunks detected in browser."
                    : "An unhandled UI error was safely intercepted."}
                </p>
              </div>
            </div>

            <p className="text-sm text-ink-muted mb-6 font-ui leading-relaxed">
              {this.state.isChunkError
                ? "Your browser is holding an older cached bundle that does not match the live production build. Purging the build cache will load the fresh bundle instantly."
                : this.state.error?.message || "An unexpected error occurred while rendering this view."}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={this.handlePurgeAndReload}
                disabled={this.state.clearing}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                <Trash2 className={`h-4 w-4 ${this.state.clearing ? "animate-spin" : ""}`} />
                {this.state.clearing ? "Flushing Cache..." : "Purge Stale Cache & Reload"}
              </button>

              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-soft px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface-panel transition-all"
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </button>

              <a
                href="/"
                className="ml-auto inline-flex items-center gap-1.5 text-xs text-ink-dim hover:text-ink font-ui transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
