
"use client";

import React, { useEffect } from 'react';

interface AdSenseAdUnitProps {
  adClient: string; // e.g., "ca-pub-XXXXXXXXXXXXXXXX"
  adSlot: string;   // e.g., "YYYYYYYYYY"
  adFormat?: string; // e.g., "auto", "rectangle", "vertical", etc.
  style?: React.CSSProperties;
  className?: string;
  fullWidthResponsive?: boolean;
  adLayoutKey?: string; // For in-article ads, etc.
}

const AdSenseAdUnit: React.FC<AdSenseAdUnitProps> = ({
  adClient,
  adSlot,
  adFormat = "auto",
  style = { display: 'block' }, // Default AdSense style
  className = "adsbygoogle",
  fullWidthResponsive = true,
  adLayoutKey,
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense push error:", e);
    }
  }, [adSlot, adClient, adFormat]); // Re-run if critical ad parameters change

  // Ensure adClient and adSlot are provided
  if (!adClient || !adSlot) {
    console.warn("AdSenseAdUnit: adClient and adSlot props are required.");
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0', color: '#777', padding: '20px', border: '1px dashed #ccc', borderRadius: '8px' }}>Ad unit requires adClient and adSlot.</div>;
  }
  
  // Check if running in a development environment where ads might not load
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }} className="adsense-ad-unit-wrapper">
      {isDev && (
        <div style={{padding: '10px', background: '#f0f0f0', color: '#333', fontSize: '12px', border: '1px dashed #ccc', borderRadius: '4px', marginBottom: '5px'}}>
          AdSense Ad Slot ({adSlot}) - Ads may not show in DEV or if account is not approved/configured.
        </div>
      )}
      <ins
        className={className}
        style={style}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        data-ad-layout-key={adLayoutKey}
        aria-hidden="true" // To hide from screen readers if it's an empty container before ad loads
      />
    </div>
  );
};

export default AdSenseAdUnit;
