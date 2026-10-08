"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface VastPlayerProps {
  videoUrl?: string;
  adTagUrl?: string;
  className?: string;
}

const DEFAULT_VAST_TAG =
  "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=";

const DEFAULT_VIDEO_URL =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function VastPlayer({
  videoUrl = DEFAULT_VIDEO_URL,
  adTagUrl = DEFAULT_VAST_TAG,
  className = "",
}: VastPlayerProps) {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!sdkLoaded || !adTagUrl || !containerRef.current || !videoRef.current || adError) return;

    try {
      // @ts-ignore - google is loaded from script
      const google = window.google;
      if (!google || !google.ima) return;

      const adDisplayContainer = new google.ima.AdDisplayContainer(
        containerRef.current,
        videoRef.current
      );
      const adsLoader = new google.ima.AdsLoader(adDisplayContainer);

      adsLoader.addEventListener(
        google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        (adsManagerLoadedEvent: any) => {
          const adsManager = adsManagerLoadedEvent.getAdsManager(videoRef.current);

          try {
            adDisplayContainer.initialize();
            adsManager.init(640, 360, google.ima.ViewMode.NORMAL);
            adsManager.start();
            setIsPlaying(true);
          } catch {
            setAdError(true);
          }

          adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, () => {
            setAdError(true);
            setIsPlaying(false);
          });

          adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
            () => {
              setIsPlaying(false);
              if (videoRef.current && videoUrl) {
                videoRef.current.play().catch(() => {});
              }
            }
          );
        },
        false
      );

      adsLoader.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR,
        () => {
          setAdError(true);
        },
        false
      );

      const adsRequest = new google.ima.AdsRequest();
      adsRequest.adTagUrl = adTagUrl;
      adsRequest.linearAdSlotWidth = 640;
      adsRequest.linearAdSlotHeight = 360;
      adsRequest.nonLinearAdSlotWidth = 640;
      adsRequest.nonLinearAdSlotHeight = 150;

      adsLoader.requestAds(adsRequest);

      return () => {
        try {
          adsLoader.destroy();
        } catch {}
      };
    } catch {
      setAdError(true);
    }
  }, [sdkLoaded, adTagUrl, videoUrl, adError]);

  return (
    <div
      className={`my-4 relative bg-black/90 rounded-2xl border border-line overflow-hidden flex items-center justify-center text-white min-h-[300px] shadow-lg ${className}`}
    >
      <Script
        src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"
        onReady={() => setSdkLoaded(true)}
      />

      {adError ? (
        <div className="text-center p-6 z-10 relative max-w-md">
          <p className="font-display font-bold text-base text-white">Video Showcase Stream</p>
          <p className="text-xs text-ink-dim mt-1 font-body">Streaming content preview</p>
          {videoUrl && (
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              playsInline
              className="mt-4 max-w-full rounded-xl border border-white/10 shadow"
            />
          )}
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={videoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
          />
          <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full z-10"
            style={{ display: isPlaying ? "block" : "none" }}
          />
          {!isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/60 p-4">
              <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-3" />
              <p className="font-ui font-semibold text-sm text-white">Loading Video Showcase...</p>
              <p className="text-xs text-ink-dim font-body mt-1">Google IMA Video Integration</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
