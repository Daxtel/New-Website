import type { MetadataRoute } from 'next';
import { projectCatalog, serviceCatalog } from '@/lib/catalog';
import { blogPosts } from '@/lib/blog';
import { locationPages, industryPages } from '@/lib/landing-pages';

const baseUrl = 'https://streetshowproduction.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/hospitality',
    '/japan-market-entry',
    '/services',
    '/work',
    '/blog',
  ];

  const serviceRoutes = serviceCatalog.map((service) => `/services/${service.slug}`);
  const projectRoutes = projectCatalog.map((project) => `/work/${project.slug}`);
  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
  const locationRoutes = locationPages.map((page) => `/locations/${page.slug}`);
  const industryRoutes = industryPages.map((page) => `/industries/${page.slug}`);

  const allRoutes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...blogRoutes,
    ...locationRoutes,
    ...industryRoutes,
  ];

  const now = new Date();

  return allRoutes.map((route) => {
    const enUrl = `${baseUrl}${route}`;
    const jaUrl = `${baseUrl}/ja${route}`; // route '' -> /ja, '/services' -> /ja/services
    return {
      url: enUrl,
      lastModified: now,
      changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority:
        route === ''
          ? 1
          : route.startsWith('/work/') || route.startsWith('/services/') || route.startsWith('/blog/')
          ? 0.8
          : 0.7,
      // hreflang alternates so Google indexes the Japanese version separately.
      alternates: {
        languages: {
          en: enUrl,
          ja: jaUrl,
          'x-default': enUrl,
        },
      },
    };
  });
}
