
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

const PLACEHOLDER_AD_CLIENT = "ca-pub-0000000000000000";
const PLACEHOLDER_AD_SLOT = "0000000000";

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

  const isUsingPlaceholderClient = adClient === PLACEHOLDER_AD_CLIENT;
  const isUsingPlaceholderSlot = adSlot === PLACEHOLDER_AD_SLOT;

  if (!adClient || !adSlot || isUsingPlaceholderClient || isUsingPlaceholderSlot) {
    let message = "AdSense Ad Unit Error:";
    if (!adClient || isUsingPlaceholderClient) {
      message += " 'adClient' prop is missing or is a placeholder. Please provide your actual AdSense Publisher ID.";
    }
    if (!adSlot || isUsingPlaceholderSlot) {
      message += " 'adSlot' prop is missing or is a placeholder. Please provide your actual Ad Slot ID.";
    }
    console.warn("AdSenseAdUnit:", message);
    return (
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: '#fff0f0', 
          color: '#a00', 
          padding: '20px', 
          border: '2px dashed #d00', 
          borderRadius: '8px',
          textAlign: 'center',
          margin: '20px 0',
          fontSize: '14px',
          lineHeight: '1.5'
        }}
        className="adsense-warning-placeholder"
      >
        {message}
        <br />
        Also, ensure you've updated the AdSense Publisher ID in the script tag in `src/app/layout.tsx`.
      </div>
    );
  }
  
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }} className="adsense-ad-unit-wrapper">
      {isDev && (
        <div style={{padding: '10px', background: '#f0f0f0', color: '#333', fontSize: '12px', border: '1px dashed #ccc', borderRadius: '4px', marginBottom: '5px'}}>
          AdSense Ad Slot ({adSlot}) - Ads may not show in DEV or if account is not approved/configured. This message is for DEV environment.
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
