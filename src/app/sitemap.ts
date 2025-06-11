
import type { MetadataRoute } from 'next'

// IMPORTANT: Ensure NEXT_PUBLIC_SITE_URL is set in your environment variables
// (e.g., in Cloudflare Pages settings) to your full production domain.
// Example: https://www.yourdomain.com
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jpegify.pages.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '', // Home page
    '/compress',
    '/about',
    '/privacy-policy',
    '/terms-conditions',
    '/contact',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as 'monthly',
    priority: route === '' ? 1.0 : (route === '/compress' ? 0.9 : (route === '/about' ? 0.8 : 0.7)),
  }));

  return [
    ...staticPages,
    // If you add dynamic pages in the future (e.g., blog posts),
    // you would fetch their paths and add them here.
    // Example:
    // { url: `${SITE_URL}/blog/my-post`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.5 },
  ];
}
