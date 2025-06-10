
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/compress");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex flex-grow flex-col items-center justify-center text-center container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6">
          <ImageIcon className="h-16 w-16 text-primary sm:h-20 sm:w-20" />
          <h1 className="text-5xl font-extrabold tracking-tight text-primary sm:text-6xl md:text-7xl">
            JPEGify
          </h1>
        </div>
        <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground sm:text-xl md:mt-6 md:max-w-2xl">
          Instantly compress your JPEG images with lightning speed, right in your browser. Secure, private, and incredibly easy to use.
        </p>
        <div className="mt-10 mb-12">
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="w-full max-w-xs mx-auto text-xl py-7 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            Start Compressing <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>

        <section className="max-w-2xl w-full space-y-8 text-left bg-card p-6 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-card-foreground mb-6">
            Simple Steps to Lighter JPEGs
          </h2>
          <ul className="space-y-5">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-7 w-7 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">1. Upload Your JPEGs</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Start Compressing" and then drag &amp; drop or browse to select your JPEG files.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-7 w-7 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">2. Instant &amp; Secure Compression</h3>
                <p className="text-sm text-muted-foreground">
                  Images are compressed directly in your browser. <strong className="text-card-foreground">Your files never leave your device</strong>, ensuring 100% privacy and security.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-7 w-7 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">3. Download Optimized Images</h3>
                <p className="text-sm text-muted-foreground">
                  Preview the compressed images and download them individually or as a batch.
                </p>
              </div>
            </li>
          </ul>
        </section>
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground border-t">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-2">
          <span>JPEGify &amp;copy; {new Date().getFullYear()}. All rights reserved.</span>
          <nav className="flex gap-x-4 gap-y-2 flex-wrap justify-center">
            <Link href="/privacy-policy" className="hover:text-primary hover:underline">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-primary hover:underline">Terms &amp; Conditions</Link>
            <Link href="/contact" className="hover:text-primary hover:underline">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
