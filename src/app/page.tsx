
import type { Metadata } from "next";
import { LandingPageContent } from "@/components/landing-page-content";

export const metadata: Metadata = {
  title: "JPEGify - Instant & Secure JPEG Image Compression",
  description: "Compress your JPEG images online with JPEGify. Fast, secure, and private client-side compression. No uploads required.",
};

export default function LandingPage() {
  return <LandingPageContent />;
}
