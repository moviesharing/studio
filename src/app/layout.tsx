
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/site-header";
import Script from 'next/script';
import { CookieConsentPopup } from "@/components/cookie-consent-popup";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "JPEGify - Smart Image Compression",
  description: "Compress JPEGs efficiently with JPEGify. Secure, client-side image optimization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000" // IMPORTANT: Replace ca-pub-0000000000000000 with your actual AdSense Publisher ID
          crossOrigin="anonymous"
          strategy="afterInteractive" // Consider 'beforeInteractive' if consent influences loading
        />
      </head>
      <body className="font-body antialiased">
        <div className="relative flex min-h-screen flex-col bg-background">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
        <Toaster />
        <CookieConsentPopup />
      </body>
    </html>
  );
}
