# Monetization Guide: How to Earn

To start earning money from your website traffic, you need to replace the placeholder ad credentials with your own real accounts. Here is exactly where to log in and what data to change in the codebase.

## 1. Google AdSense (Display & Banner Ads)

This handles all the standard banner ads (rectangles, leaderboards, etc.) using the `<AdUnit />` component.

### Where to Log In
- **URL**: [Google AdSense](https://adsense.google.com/)
- **Setup**: Log in, add your website domain, and wait for Google to review and approve your site.

### Which Data to Change
Once approved, you will get a Publisher ID (looks like `ca-pub-1234567890`) and you can create individual Ad Units which will give you a numeric Slot ID (e.g., `8273645192`).

**1. Update the Publisher ID:**
Open `/data/metrics.json` and change the `"client"` value to your AdSense Publisher ID:
```json
{
  "provider": "internal",
  "client": "ca-pub-YOUR_ACTUAL_PUBLISHER_ID_HERE", 
  "slots": [...]
}
```

**2. Update the Slot IDs in your Code:**
Whenever you want to place a banner ad in your app, use the `AdUnit` component and pass the numeric Slot ID given to you by AdSense. For example, in `/app/apps/[slug]/page.tsx`:
```tsx
import AdUnit from '@/components/AdUnit';

// Change "top-banner" to your real 10-digit AdSense slot ID
<AdUnit slotId="8273645192" format="horizontal" />
```

---

## 2. Video Ads (VAST / Google IMA)

This handles high-paying pre-roll or mid-roll video advertisements using the `<VastPlayer />` component.

### Where to Log In
- **URL**: You need to sign up for a Video Ad Network. Popular choices are [Google Ad Manager](https://admanager.google.com/), [PropellerAds](https://propellerads.com/), or [Setupad](https://setupad.com/).

### Which Data to Change
Your ad network will generate a **VAST Ad Tag URL** (an XML link) for your video inventory.

**Update the Code:**
Wherever you use the `VastPlayer`, pass that URL into the `adTagUrl` property. For example, in `/app/apps/[slug]/page.tsx`:
```tsx
import VastPlayer from '@/components/VastPlayer';

<VastPlayer 
  adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?..." 
  videoUrl="/optional-content-video.mp4" 
/>
```

### 📈 How You Get Paid
Once your IDs are updated:
1. **Drive Traffic**: Share your links. Ads will only generate revenue if real humans see or click them.
2. **Payouts**: The ad networks (like Google) will track your impressions (CPM) and clicks (CPC) and send you a monthly payout directly to your linked bank account.
