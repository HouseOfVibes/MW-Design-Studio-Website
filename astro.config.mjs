import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://mwdesignstudio.com', // Updated with your domain
  integrations: [
    sitemap({
      // Enhanced sitemap configuration
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Filter function to exclude certain pages if needed
      filter: (page) => !page.includes('/admin') && !page.includes('/test'),
    }),
    partytown({
      // Partytown configuration for analytics
      config: {
        forward: ["dataLayer.push", "gtag", "fbq", "_paq"],
        debug: false,
      },
    }),
  ],
  
  // SEO and Performance optimizations
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  
  // Image optimization settings
  image: {
    domains: ["mwdesignstudio.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mwdesignstudio.com",
      },
    ],
  },
  
  // Security headers
  server: {
    headers: {
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  },
});