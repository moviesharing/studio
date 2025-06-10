
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/compress");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
            <ImageIcon className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">JPEGify</h1>
        </div>
      </header>
      <main className="flex flex-grow flex-col items-center justify-center text-center container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-card p-8 sm:p-12 rounded-xl shadow-2xl max-w-2xl w-full">
          <h2 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Effortless Image Compression
          </h2>
          <p className="mt-6 max-w-md mx-auto text-lg text-muted-foreground sm:text-xl md:mt-8 md:max-w-xl">
            Securely compress your JPEG images directly in your browser. Fast, private, and easy to use.
          </p>
          <div className="mt-8 sm:mt-10">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="w-full max-w-xs mx-auto text-lg"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Your images are processed locally and never leave your device.
          </p>
        </div>
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground border-t">
        JPEGify &copy; {new Date().getFullYear()}. All rights reserved.
      </footer>
    </div>
  );
}
