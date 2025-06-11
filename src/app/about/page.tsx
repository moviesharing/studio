
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Smile, Zap, ShieldCheck, UserCircle, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About JPEGify - Free Online JPEG Compressor",
  description: "Learn more about JPEGify, a free, secure, and fast client-side JPEG image compression tool created by Jphabs Khalifa.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-3xl">
      <header className="mb-10 text-center">
        <Info className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary sm:text-5xl">
          About JPEGify
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Compress JPEGs, lightning-fast and right in your browser.
        </p>
      </header>

      <Card className="shadow-xl mb-8 bg-card">
        <CardHeader>
          <CardTitle className="text-2xl text-card-foreground">What is JPEGify?</CardTitle>
          <CardDescription>
            Your go-to tool for quick and secure image optimization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-card-foreground">
          <p>
            JPEGify is a free online tool designed to help you reduce the file size of your JPEG images without compromising significantly on quality. Whether you&apos;re a web developer, blogger, photographer, or just someone looking to save storage space or speed up image sharing, JPEGify offers a simple and effective solution.
          </p>
          <p>
            The best part? All image processing happens <strong className="font-semibold text-primary/90">directly in your web browser</strong>. Your images are never uploaded to any server, ensuring your privacy and data security remain paramount.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 pt-4">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  Your images are processed locally. No uploads, no servers, full confidentiality.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="h-8 w-8 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Leverage your browser&apos;s power for quick client-side compression.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Smile className="h-8 w-8 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">User-Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Simple drag &amp; drop interface. No complicated settings unless you want them.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Gift className="h-8 w-8 text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">Completely Free</h3>
                <p className="text-sm text-muted-foreground">
                  JPEGify is free to use, for everyone. Supported by non-intrusive ads.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <UserCircle className="h-10 w-10 text-primary" />
            <CardTitle className="text-2xl text-card-foreground">Meet the Developer</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-card-foreground">
          <p>
            JPEGify was created and is maintained by <strong className="font-semibold">Jphabs Khalifa</strong>.
          </p>
          <p>
            As a passionate web developer, Jphabs built JPEGify with the goal of providing a simple, private, and efficient tool for a common need. The focus is on creating useful applications that respect user privacy and offer a great experience.
          </p>
           <p>
            Thank you for using JPEGify! We hope you find it useful. If you do, consider sharing it with others.
          </p>
          <div className="pt-2">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/compress">
                Compress Your Images Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
