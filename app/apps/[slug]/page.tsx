import fs from "fs";
import path from "path";
import { Metadata } from "next";
import AdUnit from "@/components/AdUnit";
import VastPlayer from "@/components/VastPlayer";
import { InlineEditorialAd } from "@/components/ReaderAds";
import Link from "next/link";
import { ArrowLeft, Play, CheckCircle2, ShieldCheck, Zap, Download, RefreshCw, ChevronRight } from "lucide-react";

// Read the data file
function getApps() {
  const filePath = path.join(process.cwd(), "data", "apps.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export async function generateStaticParams() {
  const apps = getApps();
  return apps.map((app: any) => ({
    slug: app.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const apps = getApps();
  const app = apps.find((a: any) => a.slug === params.slug);

  if (!app) {
    return { title: "App Not Found | The Dev Digest" };
  }

  return {
    title: `${app.metaTitle} | The Dev Digest`,
    description: app.metaDescription,
    openGraph: {
      title: app.metaTitle,
      description: app.metaDescription,
      type: "website",
    },
  };
}

export default function AppDetailsPage({ params }: { params: { slug: string } }) {
  const apps = getApps();
  const app = apps.find((a: any) => a.slug === params.slug);

  if (!app) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6 text-center">
        <div className="max-w-md p-8 rounded-2xl glass-card">
          <h2 className="text-xl font-bold font-display text-ink mb-2">Application Not Found</h2>
          <p className="text-sm font-ui text-ink-muted mb-4">The requested web application could not be located in our registry.</p>
          <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Digest
          </Link>
        </div>
      </div>
    );
  }

  const features = app.features || [
    "Zero installation required — runs directly in your modern web browser",
    "High-speed client-side execution with memory sandboxing",
    "Exportable output formats including JSON, CSV, and plain text",
    "Responsive fluid design optimized for desktop and mobile workstations",
  ];

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
            <span>Web Apps</span>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate text-ink">{app.title}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-label text-ink-dim">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span>/</span>
          <span className="text-accent">{app.category}</span>
          <span>/</span>
          <span className="text-ink truncate">{app.title}</span>
        </nav>

        {/* Top Leaderboard Ad */}
        <AdUnit slotId="top-banner" format="horizontal" />

        {/* Main App Hero & Runner Sandbox */}
        <div className="rounded-3xl border border-line bg-surface/90 p-6 sm:p-8 shadow-sm glass-panel">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-line">
            <div>
              <span className="inline-block px-2.5 py-1 rounded-full bg-accent-soft text-accent text-[11px] font-label font-bold uppercase tracking-wider mb-2">
                {app.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-ink tracking-tight">
                {app.title}
              </h1>
              <p className="text-sm font-ui text-ink-muted mt-2 max-w-2xl leading-relaxed">
                {app.description}
              </p>
            </div>
            
            <div className="shrink-0 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold font-label">
                <Zap className="h-3.5 w-3.5" />
                Live Tool
              </span>
            </div>
          </div>

          {/* Interactive Utility Workbench Sandbox */}
          <div className="my-8 rounded-2xl border border-line bg-surface-soft/80 p-5 sm:p-6 shadow-inner">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-line text-xs font-label text-ink-dim">
              <span className="flex items-center gap-1.5">
                <Play className="h-3.5 w-3.5 text-accent" />
                Online Console & Workbench
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">Ready</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold font-ui text-ink mb-1.5">
                  Input Parameters & Source Text
                </label>
                <textarea
                  rows={3}
                  defaultValue="Sample input string for instant analysis and computation..."
                  placeholder="Enter values or paste data here..."
                  className="w-full rounded-xl border border-line bg-surface/80 p-3 text-xs sm:text-sm font-label text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:opacity-90 active:scale-95 transition-all"
                >
                  <Play className="h-3.5 w-3.5" />
                  Execute Calculation
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-4 py-2.5 text-xs font-medium text-ink-muted hover:text-ink transition-all"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Reset
                </button>
                <button
                  type="button"
                  className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-2.5 text-xs font-medium text-ink-muted hover:text-ink transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export Output
                </button>
              </div>
            </div>
          </div>

          {/* VAST Video Ad Integration */}
          <div className="my-8">
            <span className="text-[10px] font-label text-ink-dim uppercase tracking-wider block mb-2 text-center">
              Video Showcase & Sponsor Broadcast
            </span>
            <VastPlayer adTagUrl="https://example.com/vast.xml" />
          </div>

          {/* Key Features List */}
          <div className="pt-6 border-t border-line space-y-4">
            <h2 className="text-lg font-bold font-display text-ink">
              Core Capabilities & Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feat: string, i: number) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-ui text-ink-muted">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step by Step Usage */}
          <div className="mt-8 pt-6 border-t border-line">
            <h2 className="text-lg font-bold font-display text-ink mb-3">
              How to use {app.title}
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm font-ui text-ink-muted">
              <li>Input your raw parameters, numerical values, or text payload into the workbench console above.</li>
              <li>Select your preferred conversion precision or evaluation options.</li>
              <li>Click <strong className="text-ink">&quot;Execute Calculation&quot;</strong> to receive instant client-side computed results.</li>
              <li>Export or copy your transformed dataset directly to your clipboard.</li>
            </ol>
          </div>
        </div>

        {/* Editorial Mid Ad */}
        <InlineEditorialAd
          slotId="inline-reading-ad"
          category={app.category}
          sponsorName={`${app.category} Pro Suite`}
          tagline="Upgrade your workflow with enterprise integrations, API automation, and team collaboration."
          ctaText="Learn More"
          ctaUrl="https://example.com/ad/pro-suite"
        />

        {/* Bottom Ad Units */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AdUnit slotId="bottom-left" format="rectangle" />
          <AdUnit slotId="bottom-right" format="rectangle" />
        </div>
      </main>
    </div>
  );
}
