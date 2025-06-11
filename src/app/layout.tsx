
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/site-header";
import { CookieConsentPopup } from "@/components/cookie-consent-popup";
import { SiteFooter } from "@/components/site-footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jpegify.pages.dev/';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "JPEGify - Smart Image Compression",
  description: "Compress JPEGs efficiently with JPEGify. Secure, client-side image optimization.",
  icons: {
    icon: "/favicon.svg", 
  },
  openGraph: {
    title: "JPEGify - Smart Image Compression",
    description: "Instantly compress JPEGs in your browser. Secure, private, and easy to use.",
    url: siteUrl,
    siteName: "JPEGify",
    images: [
      {
        url: `${siteUrl}og-image.png`, 
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
  },
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
