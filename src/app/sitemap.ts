import type { MetadataRoute } from 'next';
import { projectCatalog, serviceCatalog } from '@/lib/catalog';
import { blogPosts } from '@/lib/blog';
import { locationPages, industryPages } from '@/lib/landing-pages';
import { site } from '@/lib/site';

const baseUrl = site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Bilingual routes: EN url + en/ja/x-default hreflang alternates.
  const bilingualRoutes = [
    '',
    '/about',
    '/contact',
    '/hospitality',
    '/japan-market-entry',
    '/services',
    '/services/japan-creative-performance-audit', // bespoke route, not in serviceCatalog
    '/work',
    '/blog',
    ...serviceCatalog.map((s) => `/services/${s.slug}`),
    ...projectCatalog.map((p) => `/work/${p.slug}`),
    ...locationPages.map((p) => `/locations/${p.slug}`),
    ...industryPages.map((p) => `/industries/${p.slug}`),
  ];

  const priorityFor = (route: string) =>
    route === ''
      ? 1
      : route.startsWith('/work/') || route.startsWith('/services/') || route.startsWith('/blog/')
      ? 0.8
      : 0.7;

  const bilingualEntries: MetadataRoute.Sitemap = bilingualRoutes.map((route) => {
    const enUrl = `${baseUrl}${route}`;
    const jaUrl = `${baseUrl}/ja${route}`;
    return {
      url: enUrl,
      lastModified: now,
      changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: priorityFor(route),
      alternates: { languages: { en: enUrl, ja: jaUrl, 'x-default': enUrl } },
    };
  });

  // Blog posts: each post is listed under its own language track only.
  //  - bilingual (lang undefined): EN url, en+ja hreflang
  //  - en-only: EN url, no ja alternate
  //  - ja-only: JA url (/ja/blog/...), no en alternate
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const enUrl = `${baseUrl}/blog/${post.slug}`;
    const jaUrl = `${baseUrl}/ja/blog/${post.slug}`;
    if (post.lang === 'ja') {
      return {
        url: jaUrl,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: { languages: { ja: jaUrl, 'x-default': jaUrl } },
      };
    }
    if (post.lang === 'en') {
      return {
        url: enUrl,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: { languages: { en: enUrl, 'x-default': enUrl } },
      };
    }
    return {
      url: enUrl,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages: { en: enUrl, ja: jaUrl, 'x-default': enUrl } },
    };
  });

  return [...bilingualEntries, ...blogEntries];
}
