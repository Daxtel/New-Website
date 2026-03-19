import type { MetadataRoute } from 'next';

const baseUrl = 'https://streetshowproduction.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/contact',
    '/hospitality',
    '/japan-market-entry',
    '/services',
    '/services/japan-market-localization',
    '/services/hospitality-creative-strategy-japan',
    '/services/video-production-japan',
    '/services/photography-cgi-japan',
    '/services/3d-anamorphic-billboards-japan',
    '/work',
    '/work/shibuya-3d-anamorphic-billboard',
    '/work/tokyo-luxury-brand-video-campaign',
    '/work/japan-market-localization-campaign',
    '/work/tokyo-editorial-photography',
    '/work/japan-electronics-cgi-visualization',
    '/work/japan-luxury-resort-video-campaign',
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
