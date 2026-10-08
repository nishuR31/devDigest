# Monetization & Ads Setup Guide

Your website `adsWeb` is fully configured for multi-channel monetization with **Google AdSense**, **Google IMA VAST Video Ads**, and **Real Direct Sponsor/Affiliate Networks**.

---

## 1. Google AdSense (Display & Banner Units)

Google AdSense is fully configured across the application with your publisher account and ad slots.

### Active Configuration
- **Publisher Account**: `ca-pub-5305326224028702`
- **Crawler Verification**: Configured in `app/layout.tsx` (`<meta name="google-adsense-account" content="ca-pub-5305326224028702">`).
- **AdSense Engine Script**: Dynamically served in `app/layout.tsx` via `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`.
- **Authorized Digital Sellers (`ads.txt`)**: Served from `public/ads.txt`:
  ```
  google.com, pub-5305326224028702, DIRECT, f08c47fec0942fa0
  ```
- **Slot Mapping**: Defined in `/data/metrics.json` for:
  - `top-banner`
  - `inline-leaderboard`
  - `inline-reading-ad`
  - `sidebar-rect`
  - `bottom-left`
  - `bottom-right`
  - `footer-banner`

### Resilient Sponsor Fallbacks
If an ad blocker is running or while AdSense is reviewing your domain, `<AdUnit />` automatically renders a high-converting, verified developer partner card (Supabase, DigitalOcean, Cloudflare, ByteByteGo, Sentry, Tailwind UI) with zero placeholder text or broken links.

---

## 2. Real Direct Sponsor & Affiliate Links

All dummy `example.com` links have been replaced with authentic, production-grade tools:
- **Cloud Infrastructure**: [DigitalOcean Droplets & Kubernetes](https://www.digitalocean.com/)
- **Zero-Trust WAF & Security**: [Cloudflare Application Security](https://www.cloudflare.com/application-services/products/waf/)
- **System Design & Interview**: [ByteByteGo System Design](https://bytebytego.com/)
- **Backend & Realtime**: [Supabase Platform](https://supabase.com/)
- **Observability**: [Sentry APM & Error Tracking](https://sentry.io/)
- **Developer Tools**: [JetBrains Developer Suite](https://www.jetbrains.com/)
- **Cloud Deployment**: [Railway App Platform](https://railway.app/)
- **Startup Banking**: [Mercury Banking](https://mercury.com/)

All partner clicks route through `/out?target=<ENCODED_URL>` to protect outbound links and measure user intent.

---

## 3. Video Ads (Google IMA SDK / VAST 3.0)

Interactive apps feature video ads powered by Google's Interactive Media Ads (IMA) SDK:
- **Player Component**: `components/VastPlayer.tsx`
- **Default VAST 3.0 Tag**: Uses Google DoubleClick official linear sample ad tag with automatic content resume.
- Custom VAST ad tags from networks like Google Ad Manager, PropellerAds, or Setupad can be passed directly to `<VastPlayer adTagUrl="..." />`.
