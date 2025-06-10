
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth-context";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "JPEGify - Smart Image Compression",
  description: "Compress JPEGs efficiently with JPEGify. Secure, client-side image optimization. Sign in to start compressing!",
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
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <div className="flex-1">{children}</div>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
