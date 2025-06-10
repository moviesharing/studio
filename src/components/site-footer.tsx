
"use client";

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="py-8 text-center text-sm text-muted-foreground border-t bg-background">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-2">
        <span>JPEGify {'\u00A9'} {new Date().getFullYear()}. All rights reserved.</span>
        <nav className="flex gap-x-4 gap-y-2 flex-wrap justify-center">
          <Link href="/privacy-policy" className="hover:text-primary hover:underline">Privacy Policy</Link>
          <Link href="/terms-conditions" className="hover:text-primary hover:underline">Terms & Conditions</Link>
          <Link href="/contact" className="hover:text-primary hover:underline">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
