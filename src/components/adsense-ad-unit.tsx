
"use client";

import React, { useEffect, useRef } from 'react';

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
  const insRef = useRef<HTMLModElement>(null);
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    const isUsingPlaceholders = adClient === PLACEHOLDER_AD_CLIENT || adSlot === PLACEHOLDER_AD_SLOT;
    if (isDev || isUsingPlaceholders || !adClient || !adSlot) {
      return;
    }

    if (insRef.current && insRef.current.innerHTML.trim() === '' && !insRef.current.dataset.adStatus) {
      try {
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    }
  }, [adSlot, adClient, adFormat, isDev]); // Dependencies updated

  const isUsingPlaceholderClient = adClient === PLACEHOLDER_AD_CLIENT;
  const isUsingPlaceholderSlot = adSlot === PLACEHOLDER_AD_SLOT;

  if (!adClient || !adSlot || isUsingPlaceholderClient || isUsingPlaceholderSlot) {
    let message = "";
    if (!adClient || isUsingPlaceholderClient) {
      message += " 'adClient' prop is missing or uses a placeholder. Please provide your actual AdSense Publisher ID (ca-pub-XXXXXXXXXXXXXXXX). ";
    }
    if (!adSlot || isUsingPlaceholderSlot) {
      message += " 'adSlot' prop is missing or uses a placeholder. Please provide your actual Ad Slot ID (e.g., 1234567890). ";
    }
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'hsl(var(--destructive) / 0.05)', // Lighter destructive background
          color: 'hsl(var(--destructive))', // Destructive text color
          padding: '20px',
          border: '1px solid hsl(var(--destructive) / 0.7)', // Destructive border
          borderRadius: 'var(--radius)',
          textAlign: 'center',
          margin: '20px 0',
          fontSize: '14px',
          lineHeight: '1.5'
        }}
        className="adsense-warning-placeholder"
      >
        <p style={{fontWeight: 'bold', fontSize: '16px', marginBottom: '10px'}}>AdSense Configuration Needed</p>
        <p>{message.trim()}</p>
        <p style={{marginTop: '10px', fontSize: '12px', opacity: 0.8}}>
          Ensure you've also updated the AdSense Publisher ID in the main script tag in `src/app/layout.tsx`.
          This ad unit will not display correctly until configured.
        </p>
      </div>
    );
  }

  if (isDev) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'hsl(var(--muted) / 0.7)', // Using muted for background
          color: 'hsl(var(--muted-foreground))',    // Muted foreground for text
          border: '1px solid hsl(var(--border))',      // Using theme border color
          borderRadius: 'var(--radius)',            // Using theme radius
          textAlign: 'center',
          padding: '20px',
          minHeight: '90px', 
          width: '100%',
          margin: '20px 0',
          fontSize: '14px',
          boxSizing: 'border-box'
        }}
        className="adsense-dummy-placeholder"
      >
        <p style={{fontWeight: '600', color: 'hsl(var(--foreground))'}}>Ad Placeholder</p> {/* Slightly bolder and foreground color */}
        <p style={{fontSize: '12px', marginTop: '5px'}}>
          (AdSense ads would appear here in production)
        </p>
      </div>
    );
  }

  // Production: Render the actual AdSense <ins> tag
  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }} className="adsense-ad-unit-wrapper">
      <ins
        ref={insRef}
        className={className}
        style={style}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        data-ad-layout-key={adLayoutKey}
        aria-hidden="true"
      />
    </div>
  );
};

export default AdSenseAdUnit;
