
"use client";

import * as React from "react"; 
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Share2, Twitter, Facebook, Linkedin, Smartphone, Mail, Copy, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; 

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jpegify.pages.dev/";
const siteTitle = "JPEGify - Instant & Secure JPEG Image Compression";
const siteDescription = "Compress your JPEG images online with JPEGify. Fast, secure, and private client-side compression. No uploads required.";

interface SocialShareButtonProps {
  href: string;
  platformName: string;
  icon: React.ReactNode;
  text: string;
}

const SocialShareButtonInternal: React.FC<SocialShareButtonProps> = ({ href, platformName, icon, text }) => {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start px-3 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground"
      asChild
      aria-label={`Share on ${platformName}`}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
        {icon}
        {text}
      </a>
    </Button>
  );
};

export function ShareButton() {
  const { toast } = useToast(); 

  const encodedUrl = encodeURIComponent(siteUrl);
  const encodedTitle = encodeURIComponent(siteTitle);
  const encodedDescription = encodeURIComponent(siteDescription);

  const commonIconClass = "h-5 w-5 text-muted-foreground"; 

  const shareLinks = [
    {
      platformName: "Facebook",
      icon: <Facebook className={commonIconClass} />,
      text: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      platformName: "X (Twitter)",
      icon: <Twitter className={commonIconClass} />,
      text: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      platformName: "LinkedIn",
      icon: <Linkedin className={commonIconClass} />,
      text: "LinkedIn",
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    },
    {
      platformName: "WhatsApp",
      icon: <Smartphone className={commonIconClass} />,
      text: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(siteTitle + " " + siteUrl)}`,
    },
    {
      platformName: "Reddit",
      icon: <Globe className={commonIconClass} />, 
      text: "Reddit",
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      platformName: "Email",
      icon: <Mail className={commonIconClass} />,
      text: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(siteDescription + "\n\n" + siteUrl)}`, 
    },
  ];

  const handleCopyLink = async () => {
    if (!navigator.clipboard) {
       toast({
        title: "Clipboard API Not Available",
        description: "Your browser does not support copying to clipboard. Please copy the link manually.",
        variant: "destructive",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(siteUrl);
      toast({
        title: "Link Copied!",
        description: "The website link has been copied to your clipboard.",
      });
    } catch (err) {
      console.error("Failed to copy link: ", err);
      toast({
        title: "Copy Failed",
        description: "Could not copy the link to your clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="lg" className="w-full max-w-xs mx-auto rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <Share2 className="mr-2 h-5 w-5" />
          Share JPEGify
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 bg-popover border shadow-lg rounded-md" style={{minWidth: '200px'}}>
        <div className="space-y-1">
          <p className="px-3 py-2 text-sm font-semibold text-popover-foreground">Share via</p>
          {shareLinks.map((link) => (
            <SocialShareButtonInternal
              key={link.platformName}
              href={link.href}
              platformName={link.platformName}
              icon={link.icon}
              text={link.text}
            />
          ))}
          <Button
            variant="ghost"
            className="w-full justify-start px-3 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2"
            onClick={handleCopyLink}
            aria-label="Copy link to clipboard"
          >
            <Copy className={commonIconClass} />
            Copy Link
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
