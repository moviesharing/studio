
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/site-header";
import Script from 'next/script';
import { CookieConsentPopup } from "@/components/cookie-consent-popup";
import { SiteFooter } from "@/components/site-footer";

// IMPORTANT: Ensure NEXT_PUBLIC_SITE_URL is set in your environment variables
// (e.g., in Cloudflare Pages settings) to your full production domain for metadataBase.
// Example: https://www.yourdomain.com
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002'; // Fallback for local dev

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "JPEGify - Smart Image Compression",
  description: "Compress JPEGs efficiently with JPEGify. Secure, client-side image optimization.",
  // Add Open Graph and other relevant metadata tags here for better sharing and SEO
  openGraph: {
    title: "JPEGify - Smart Image Compression",
    description: "Instantly compress JPEGs in your browser. Secure, private, and easy to use.",
    url: siteUrl,
    siteName: "JPEGify",
    images: [
      {
        url: `${siteUrl}/og-image.png`, // IMPORTANT: Create an og-image.png in your /public folder (e.g., 1200x630px)
        width: 1200,
        height: 630,
        alt: "JPEGify - Smart Image Compression",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "JPEGify - Smart Image Compression",
    description: "Compress JPEGs efficiently with JPEGify. Secure, client-side image optimization.",
    // images: [`${siteUrl}/twitter-image.png`], // IMPORTANT: Create a twitter-image.png in your /public folder
    // creator: '@yourtwitterhandle', // Optional: if you have a Twitter handle
  },
  // Optional: Add more specific metadata as needed
  // manifest: '/site.webmanifest', // If you add a web app manifest
  // icons: { // For favicons
  //   icon: '/favicon.ico',
  //   shortcut: '/favicon-16x16.png',
  //   apple: '/apple-touch-icon.png',
  // },
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
          strategy="afterInteractive" 
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
