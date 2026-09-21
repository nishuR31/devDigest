"use client";

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface VastPlayerProps {
  videoUrl?: string;
  adTagUrl?: string;
  className?: string;
}

export default function VastPlayer({ videoUrl, adTagUrl, className = '' }: VastPlayerProps) {
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

      const adDisplayContainer = new google.ima.AdDisplayContainer(containerRef.current, videoRef.current);
      const adsLoader = new google.ima.AdsLoader(adDisplayContainer);

      adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, (adsManagerLoadedEvent: any) => {
        const adsManager = adsManagerLoadedEvent.getAdsManager(videoRef.current);
        
        try {
          adDisplayContainer.initialize();
          adsManager.init(640, 360, google.ima.ViewMode.NORMAL);
          adsManager.start();
          setIsPlaying(true);
        } catch (adError) {
          setAdError(true);
        }

        adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, () => {
          setAdError(true);
          setIsPlaying(false);
        });

        adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, () => {
          setIsPlaying(false);
          if (videoRef.current && videoUrl) {
            videoRef.current.play().catch(() => {});
          }
        });
      }, false);

      adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, () => {
        setAdError(true);
      }, false);

      const adsRequest = new google.ima.AdsRequest();
      adsRequest.adTagUrl = adTagUrl;
      adsRequest.linearAdSlotWidth = 640;
      adsRequest.linearAdSlotHeight = 360;
      adsRequest.nonLinearAdSlotWidth = 640;
      adsRequest.nonLinearAdSlotHeight = 150;

      adsLoader.requestAds(adsRequest);

      return () => {
        adsLoader.destroy();
      };
    } catch (e) {
      setAdError(true);
    }
  }, [sdkLoaded, adTagUrl, videoUrl, adError]);

  return (
    <div className={`my-4 relative bg-black rounded-lg overflow-hidden flex items-center justify-center text-white min-h-[300px] ${className}`}>
      <Script src="https://imasdk.googleapis.com/js/sdkloader/ima3.js" onReady={() => setSdkLoaded(true)} />
      
      {!adTagUrl || adError ? (
        <div className="text-center p-4 z-10 relative">
          <p className="font-semibold">{adError ? "Ad failed to load" : "Video Player"}</p>
          <p className="text-xs text-gray-400 mt-2">{adTagUrl ? 'Fallback to content' : 'No VAST tag provided'}</p>
          {videoUrl && (
            <video 
              ref={videoRef}
              src={videoUrl} 
              controls 
              className="mt-4 max-w-full rounded"
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
            style={{ display: isPlaying ? 'block' : 'none' }}
          />
          {!isPlaying && !sdkLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50">
               <p className="font-semibold">Loading Ad...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
