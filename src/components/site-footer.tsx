
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

export function SiteFooter() {
  const userPayPalEmail = "akosijphabs@gmail.com";
  const donationItemName = "Support JPEGify";
  const currencyCode = "USD";

  // Using _xclick for broader compatibility than _donations
  // This constructs a link for a single "buy now" type payment.
  const payPalSupportUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(userPayPalEmail)}&item_name=${encodeURIComponent(donationItemName)}&currency_code=${currencyCode}&no_shipping=1&no_note=1`;

  return (
    <footer className="py-8 text-center text-sm text-muted-foreground border-t bg-background">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-4">
        <span className="whitespace-nowrap">JPEGify {'\u00A9'} {new Date().getFullYear()}. All rights reserved.</span>
        <nav className="flex gap-x-4 gap-y-2 flex-wrap justify-center items-center">
          <Link href="/privacy-policy" className="hover:text-primary hover:underline">Privacy Policy</Link>
          <Link href="/terms-conditions" className="hover:text-primary hover:underline">Terms & Conditions</Link>
          <Link href="/contact" className="hover:text-primary hover:underline">Contact</Link>
          <Button asChild variant="outline" size="sm">
            <a
              href={payPalSupportUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Coffee className="mr-1.5 h-4 w-4 text-primary" />
              Support Us
            </a>
          </Button>
        </nav>
      </div>
    </footer>
  );
}
