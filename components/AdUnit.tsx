"use client";

import React, { useEffect, useRef, useState } from 'react';
import metricsData from '@/data/metrics.json';

interface AdUnitProps {
  slotId?: string;
  className?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({ slotId = 'placeholder', className = '', format = 'auto' }: AdUnitProps) {
  const pushed = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      setFailed(true);
    }
  }, []);

  const isConfigured = metricsData.client && !metricsData.client.includes("0000000000000000");

  if (!isConfigured || failed) {
    return (
      <div className={`my-4 p-4 border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-500 rounded-lg min-h-[100px] ${className}`}>
        <div className="text-center">
          <p className="font-semibold text-sm">Advertisement (Placeholder)</p>
          <p className="text-xs">Slot: {slotId}</p>
          <p className="text-xs">Format: {format}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`my-4 overflow-hidden rounded-lg min-h-[100px] flex items-center justify-center bg-surface-panel/30 border border-line ${className}`}>
      <ins
        className="adsbygoogle w-full"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={metricsData.client}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
