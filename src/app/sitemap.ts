import type { MetadataRoute } from 'next';
import { projectCatalog, serviceCatalog } from '@/lib/catalog';
import { blogPosts } from '@/lib/blog';

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

  const allRoutes = [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];

  const now = new Date();

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority:
      route === ''
        ? 1
        : route.startsWith('/work/') || route.startsWith('/services/') || route.startsWith('/blog/')
        ? 0.8
        : 0.7,
  }));
}
