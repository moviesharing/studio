
"use client";

import React from 'react';

interface AAdsUnitProps {
  adUnitId: string;
  style?: React.CSSProperties;
  className?: string;
}

const AAdsUnit: React.FC<AAdsUnitProps> = ({
  adUnitId,
  style = { width: '100%', minHeight: '90px' }, // Provide a default minHeight
  className,
}) => {
  const iframeSrc = `//acceptable.a-ads.com/${adUnitId}`;
  const advertiseLink = `https://aads.com/campaigns/new/?source_id=${adUnitId}&source_type=ad_unit&partner=${adUnitId}`;

  return (
    <div id={`aads-frame-${adUnitId}`} style={style} className={className}>
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
      <a
        style={{
          display: 'block',
          textAlign: 'right',
          fontSize: '12px',
          color: 'hsl(var(--muted-foreground))',
          textDecoration: 'none',
          paddingTop: '4px'
        }}
        id="preview-link"
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
