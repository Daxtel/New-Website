import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://streetshowproduction.com/sitemap.xml',
    host: 'https://streetshowproduction.com',
  };
}
