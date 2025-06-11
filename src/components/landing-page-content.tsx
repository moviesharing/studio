
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, ArrowRight, CheckCircle, Zap, ShieldCheck, DownloadCloud } from "lucide-react";
import AAdsUnit from "@/components/a-ads-unit";
import { ShareButton } from "@/components/share-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LandingPageContent() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/compress");
  };

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Upload Your JPEGs",
      description: "Click \"Start Compressing\" then drag & drop or browse to select your JPEG files. Simple and quick.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Instant & Secure Compression",
      description: "Images are compressed directly in your browser. Your files never leave your device, ensuring 100% privacy.",
    },
    {
      icon: <DownloadCloud className="h-8 w-8 text-primary" />,
      title: "Download Optimized Images",
      description: "Preview the compressed images and download them individually or as a convenient batch ZIP file.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex flex-grow flex-col items-center justify-center text-center container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6">
          <ImageIcon className="h-20 w-20 text-primary sm:h-24 sm:w-24" />
          <h1 className="text-6xl font-extrabold tracking-tight text-primary sm:text-7xl md:text-8xl font-headline">
            JPEGify
          </h1>
        </div>
        <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground sm:text-xl md:mt-6 md:max-w-2xl font-body">
          Instantly compress your JPEG images with lightning speed, right in your browser. Secure, private, and incredibly easy to use.
        </p>
        <div className="mt-12">
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="w-full max-w-md mx-auto text-xl py-8 rounded-lg shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Start Compressing <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>

        <div className="mt-8">
          <ShareButton />
        </div>

        <div className="my-12 w-full max-w-2xl">
          <AAdsUnit adUnitId="2398113" />
        </div>

        <section className="w-full max-w-4xl space-y-10 text-left mt-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground font-headline mb-10">
            Simple Steps to Lighter JPEGs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                <CardHeader className="items-center text-center pt-6">
                  {feature.icon}
                  <CardTitle className="mt-4 text-xl font-semibold text-card-foreground font-headline">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground text-center pb-6 font-body">
                  {feature.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="mt-12 w-full max-w-2xl">
          <AAdsUnit adUnitId="2398113" />
        </div>
      </main>
    </div>
  );
}
