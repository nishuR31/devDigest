import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Playfair_Display, Source_Serif_4, Public_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import metricsData from "@/data/metrics.json";
import ExitPopup from "@/components/ExitPopup";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const sans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "The Dev Digest — In-Depth Guides, Stories & Tools",
  description:
    "An editorial-grade digital publication covering software engineering, developer tools, startup strategy, and in-depth technical narratives.",
  keywords: ["dev tools", "programming guides", "system design", "tech stories", "editorial", "magazine"],
  openGraph: {
    title: "The Dev Digest — In-Depth Guides, Stories & Tools",
    description: "An editorial-grade digital publication for developers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dev Digest — In-Depth Guides, Stories & Tools",
    description: "An editorial-grade digital publication for developers.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#18181B" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
  ],
};

const metricsConfigured =
  metricsData.client && !metricsData.client.includes("0000000000000000");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${sans.variable} ${mono.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <ExitPopup />
        </ThemeProvider>

        {metricsConfigured && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${metricsData.client}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
