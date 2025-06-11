
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cookie } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const COOKIE_CONSENT_KEY = 'jpegify_cookie_consent_given';

export function CookieConsentPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if running on client-side
    if (typeof window !== 'undefined') {
      const consentGiven = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consentGiven) {
        setIsVisible(true);
      }
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 transition-transform duration-500 ease-out",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <Card className="bg-background/95 backdrop-blur-md shadow-2xl border-border max-w-3xl mx-auto">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Cookie className="h-7 w-7 text-primary" />
            <CardTitle id="cookie-consent-title" className="text-xl font-semibold text-foreground">
              Our Commitment to Your Privacy
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p id="cookie-consent-description" className="text-sm text-muted-foreground leading-relaxed">
            JPEGify processes images directly in your browser—your files stay private and are never uploaded.
            To keep our service free, we show ads from A-ADS, a privacy-respecting network that doesn&apos;t use tracking cookies.
            By clicking &quot;Accept All,&quot; you acknowledge our use of A-ADS for advertising.
            You can learn more by reading our{" "}
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button onClick={handleAccept} className="w-full sm:w-auto" size="lg">
              Accept All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
