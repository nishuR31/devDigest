# devhub

A fast, IDE-themed link hub built with **Next.js 14 (App Router) + TypeScript + Tailwind**.
Frontend only — no backend, no database. It's a file-explorer-styled directory of
links (tools / sites / socials) with a few sponsored ad slots wired in for AdSense.

## Why it's fast
- No client-side data fetching — links live in a local JSON file and render at build time.
- `next/font` self-hosts fonts (no external font requests, no layout shift).
- Only one small client "island" (`Dashboard`) holds interactive state; everything else
  can stay server-rendered.
- No UI framework beyond Tailwind — no runtime CSS-in-JS.
- Ad scripts load with `strategy="afterInteractive"` so they never block first paint,
  and are skipped entirely until you configure real ad IDs.

## Getting started
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Add your own links
Edit `data/links.json`. Each category becomes a sidebar folder / mobile tab:

```json
{
  "id": "tools",
  "label": "tools/",
  "description": "Shown as a code comment above the grid.",
  "items": [
    {
      "title": "Postman",
      "description": "One line about it.",
      "url": "https://www.postman.com/",
      "icon": "send",
      "featured": true
    }
  ]
}
```
Available `icon` values are defined in `lib/icon-map.tsx` — add more there
(any icon exported by [lucide-react](https://lucide.dev/icons/)) if you need one.

## Turn on real ads (Google AdSense)
1. Get approved for AdSense and grab your publisher ID (`ca-pub-...`) and slot IDs.
2. Open `data/ads.json` and replace the placeholder `client` id and each slot's
   `adSlot` id.
3. That's it — `AdSlot` automatically switches from the dashed placeholder panel
   to a live `<ins class="adsbygoogle">` unit once a real client id is present,
   and the loader script in `app/layout.tsx` starts loading.

You can add, remove, or reposition slots by editing the `slots` array — each
slot has a `placement` (`sidebar` / `content` / `footer`) purely for your own
reference; where it actually renders is controlled by the `<AdSlot slotId="..." />`
calls in `components/Sidebar.tsx` and `components/Dashboard.tsx`.

## Theme
- Dark/light toggle in the top bar (persisted to `localStorage`, respects OS
  preference on first visit).
- Color tokens live in `tailwind.config.ts` under `colors.base` (dark) and
  `colors.light` (light) — change the hex values there to re-skin the whole site.
- Fonts: JetBrains Mono for labels/code bits, Manrope for body text — both
  swappable in `app/layout.tsx`.

## Deploy
**Vercel (recommended, zero config):**
```bash
npm i -g vercel
vercel
```

**Any static host** (Netlify, GitHub Pages, S3, Cloudflare Pages, etc.):
Uncomment the `output: "export"` and `images: { unoptimized: true }` lines in
`next.config.mjs`, then:
```bash
npm run build
```
Your static site will be in `/out`.

## Project structure
```
app/                 Routes, layout, global styles
  layout.tsx         Fonts, metadata, theme provider, AdSense loader
  page.tsx           Home route — passes link data into <Dashboard />
components/
  Dashboard.tsx       Client component: active category state, grid + ad placement
  Sidebar.tsx         Desktop file-explorer nav + sidebar ad
  TopBar.tsx          Window chrome, mobile category chips, theme toggle
  StatusBar.tsx       Bottom status strip (build/ads status)
  LinkCard.tsx        Single "file" card for a link
  AdSlot.tsx          Ad unit / demo placeholder switcher
  ThemeToggle.tsx
data/
  links.json          Your links, grouped by category
  ads.json            AdSense client + slot config
lib/
  types.ts, icon-map.tsx, extensions.ts, theme-provider.tsx
```

## Notes
- Update `metadataBase` in `app/layout.tsx` to your real domain before deploying —
  it's used to generate absolute Open Graph URLs.
- Add a real `favicon.ico` / `app/icon.png` before going live.
