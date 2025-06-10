
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  // Do not render the site header on the landing page
  if (pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href={"/"} className="flex items-center space-x-2">
          <ImageIcon className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-primary">JPEGify</span>
        </Link>
        {/* Navigation items can be added here if needed in the future */}
        {/* For example:
        <nav className="flex items-center space-x-1">
          <Button variant="ghost" asChild>
            <Link href="/some-other-page">Features</Link>
          </Button>
        </nav>
        */}
      </div>
    </header>
  );
}
