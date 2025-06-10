
"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Image as ImageIcon } from "lucide-react";

export default function LandingPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/compress");
    }
  }, [user, loading, router]);

  if (loading || (!loading && user)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

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
              onClick={signInWithGoogle}
              className="w-full max-w-xs mx-auto text-lg"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Sign In with Google to Get Started"
              )}
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
