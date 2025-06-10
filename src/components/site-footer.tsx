
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button"; // Import Button
import { Coffee } from "lucide-react"; // Import Coffee

export function SiteFooter() {
  const userPayPalEmail = "akosijphabs@gmail.com";
  const donationItemName = "Support JPEGify";
  const currencyCode = "USD";

  // Construct the PayPal donation URL
  // The business email and item_name should be URL encoded.
  const payPalDonateUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${encodeURIComponent(userPayPalEmail)}&item_name=${encodeURIComponent(donationItemName)}&currency_code=${currencyCode}`;

  return (
    <footer className="py-8 text-center text-sm text-muted-foreground border-t bg-background">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-4"> {/* Increased gap-y for potential wrapping */}
        <span className="whitespace-nowrap">JPEGify {'\u00A9'} {new Date().getFullYear()}. All rights reserved.</span>
        <nav className="flex gap-x-4 gap-y-2 flex-wrap justify-center items-center"> {/* Added items-center */}
          <Link href="/privacy-policy" className="hover:text-primary hover:underline">Privacy Policy</Link>
          <Link href="/terms-conditions" className="hover:text-primary hover:underline">Terms & Conditions</Link>
          <Link href="/contact" className="hover:text-primary hover:underline">Contact</Link>
          <Button asChild variant="outline" size="sm">
            <a
              href={payPalDonateUrl}
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
