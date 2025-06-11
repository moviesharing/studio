
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Smile, Zap, ShieldCheck, UserCircle, Gift, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About JPEGify - Free Online JPEG Compressor",
  description: "Learn more about JPEGify, a free, secure, and fast client-side JPEG image compression tool created by Jphabs Khalifa.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-4xl">
      <header className="mb-12 text-center">
        <Info className="mx-auto h-16 w-16 text-primary mb-4 sm:h-20 sm:w-20" />
        <h1 className="text-4xl font-bold font-headline text-primary sm:text-5xl md:text-6xl">
          About JPEGify
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl font-body">
          Compress JPEGs lightning-fast, securely, and right in your browser.
        </p>
      </header>

      <Card className="shadow-xl mb-10 bg-card rounded-xl">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-2xl sm:text-3xl font-semibold font-headline text-card-foreground">What is JPEGify?</CardTitle>
          <CardDescription className="font-body pt-1">
            Your go-to tool for quick, private, and effective image optimization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-card-foreground pt-6 font-body">
          <p>
            JPEGify is a free online tool meticulously designed to help you significantly reduce the file size of your JPEG images without a drastic compromise on quality. Whether you&apos;re a web developer aiming for faster load times, a blogger enhancing user experience, a photographer managing large portfolios, or simply someone looking to save storage space and speed up image sharing, JPEGify offers a straightforward and potent solution.
          </p>
          <p>
            The core principle of JPEGify is privacy and efficiency: all image processing happens <strong className="font-semibold text-primary/90">directly within your web browser</strong>. Your precious images are never uploaded to any external server, ensuring your privacy and data security remain paramount throughout the process.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 pt-6">
            <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
              <ShieldCheck className="h-10 w-10 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">Privacy First & Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Your images are processed locally on your device. No uploads, no servers, complete confidentiality.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
              <Zap className="h-10 w-10 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Leverages your browser&apos;s power for rapid client-side compression. Get results in seconds.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
              <Smile className="h-10 w-10 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">User-Friendly Interface</h3>
                <p className="text-sm text-muted-foreground">
                  Simple drag &amp; drop functionality. Intuitive controls with advanced options available.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
              <Gift className="h-10 w-10 text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">Completely Free</h3>
                <p className="text-sm text-muted-foreground">
                  JPEGify is free to use for everyone, supported by non-intrusive, privacy-respecting ads.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl bg-card rounded-xl">
        <CardHeader className="border-b pb-4">
          <div className="flex items-center gap-4">
            <UserCircle className="h-10 w-10 text-primary sm:h-12 sm:w-12" />
            <CardTitle className="text-2xl sm:text-3xl font-semibold font-headline text-card-foreground">Meet the Developer</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-card-foreground pt-6 font-body">
          <p>
            Hi there! I&apos;m <strong className="font-semibold text-primary/90">Jphabs Khalifa</strong>, the person behind JPEGify.
          </p>
          <p>
            I wouldn&apos;t call myself a code expert or anything like that. My way of creating things is what I like to call <strong className="font-semibold text-primary/90">&quot;Vibe Coding.&quot;</strong> It&apos;s all about intuition, feeling out what works, and aiming to build something genuinely useful and simple for people. I just love bringing ideas to life and then sharing them with the world, hoping they help someone out!
          </p>
          <p>
            JPEGify came from that same place – wanting to create a straightforward, private, and efficient tool for a common need. My focus is always on making apps that are a pleasure to use and respect your privacy.
          </p>
           <p>
            Thank you for choosing JPEGify! I really hope you find it useful. If it helps you, please consider sharing it with others who might benefit.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow">
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
