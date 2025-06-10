
"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface AAdsUnitProps {
  adUnitId: string;
  style?: React.CSSProperties;
  className?: string;
}

const AAdsUnit: React.FC<AAdsUnitProps> = ({
  adUnitId,
  style = { width: '100%', minHeight: '90px' }, // Default for the iframe container
  className,
}) => {
  const isDev = process.env.NODE_ENV === 'development';
  const iframeSrc = `//acceptable.a-ads.com/${adUnitId}`;
  const advertiseLink = `https://aads.com/campaigns/new/?source_id=${adUnitId}&source_type=ad_unit&partner=${adUnitId}`;

  if (isDev) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center",
          "rounded-lg border border-border bg-muted p-6 text-center", // Styled placeholder
          className // User-provided className for the wrapper
        )}
        style={{
          minHeight: typeof style.minHeight === 'string' ? style.minHeight : '90px',
          width: typeof style.width === 'string' ? style.width : '100%',
          // any other relevant styles from the 'style' prop meant for the wrapper could be spread here
        }}
      >
        <p className="font-semibold text-foreground">Ad Placeholder (A-ADS)</p>
        <p className="text-xs text-muted-foreground mt-1">
          Unit ID: {adUnitId}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          (Ads will appear here in production)
        </p>
      </div>
    );
  }

  // Production: Render the actual A-ADS iframe and link
  return (
    <div className={className}> {/* Main container for the ad unit, takes user's className */}
      <div id={`aads-frame-${adUnitId}`} style={style}> {/* This is the box for the iframe itself */}
        <iframe
          data-aa={adUnitId}
          src={iframeSrc}
          style={{
            border: '0px',
            padding: '0',
            width: '100%',
            height: '100%', // Takes height of parent div
            overflow: 'hidden',
            backgroundColor: 'transparent',
          }}
          title={`A-ADS Ad Unit ${adUnitId}`}
          loading="lazy"
        ></iframe>
      </div>
      <a
        style={{
          display: 'block',
          textAlign: 'right',
          fontSize: '12px',
          color: 'hsl(var(--muted-foreground))', // Uses theme variable
          textDecoration: 'none',
          paddingTop: '4px'
        }}
        id={`preview-link-${adUnitId}`}
        href={advertiseLink}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        Advertise here
      </a>
    </div>
  );
};

export default AAdsUnit;
