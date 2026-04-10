import { site } from '@/lib/site';

/**
 * Structured data helpers for Google rich results and AI citation
 * (ChatGPT, Perplexity, Claude, Gemini, Bing Copilot all read JSON-LD).
 */

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ----------------- Global schemas (used in root layout) -----------------

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: 'Streetshow Productions',
  alternateName: ['Streetshow', 'Streetshow Production', 'ストリートショープロダクション'],
  url: site.url,
  logo: `${site.url}/og-image.jpg`,
  image: `${site.url}/og-image.jpg`,
  description:
    'Strategy-first creative production studio in Japan. Specialists in Japan market entry, localization, luxury hospitality creative, video production, photography, CGI, 3D anamorphic billboards, and live commerce growth systems.',
  foundingDate: '2013',
  founder: {
    '@type': 'Person',
    name: 'Daxtel Jackson',
    jobTitle: 'Founder, Director & Strategist',
  },
  address: [
    {
      '@type': 'PostalAddress',
      addressLocality: 'Fukuoka',
      addressRegion: 'Fukuoka',
      addressCountry: 'JP',
    },
    {
      '@type': 'PostalAddress',
      addressLocality: 'Tokyo',
      addressRegion: 'Tokyo',
      addressCountry: 'JP',
    },
  ],
  areaServed: [
    { '@type': 'Country', name: 'Japan' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Place', name: 'Europe' },
  ],
  knowsLanguage: ['en', 'ja'],
  knowsAbout: [
    'Japan Market Entry',
    'Japan Localization',
    'Luxury Hospitality Creative',
    'Video Production Japan',
    'Photography Japan',
    'CGI Production Japan',
    '3D Anamorphic Billboards',
    'Shibuya Billboard Advertising',
    'Live Commerce',
    'Shopify DTC Growth',
    'Cross-border E-commerce Japan',
  ],
  sameAs: [
    'https://www.instagram.com/streetshowproductions',
    'https://www.linkedin.com/company/streetshow-productions',
  ],
  telephone: '+81-70-4801-1725',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+81-70-4801-1725',
    email: 'admin@streetshowproduction.com',
    availableLanguage: ['English', 'Japanese'],
    areaServed: ['JP', 'US', 'EU'],
  },
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#localbusiness`,
  name: 'Streetshow Productions',
  image: `${site.url}/og-image.jpg`,
  url: site.url,
  telephone: '+81-70-4801-1725',
  email: 'admin@streetshowproduction.com',
  priceRange: '¥¥¥',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Fukuoka',
    addressRegion: 'Fukuoka',
    addressCountry: 'JP',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 33.5904,
    longitude: 130.4017,
  },
  areaServed: [
    { '@type': 'Country', name: 'Japan' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Place', name: 'Europe' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: 'Streetshow Productions',
  description: site.description.en,
  publisher: { '@id': `${site.url}/#organization` },
  inLanguage: ['en', 'ja'],
};

// ----------------- Per-page helpers -----------------

export function buildBreadcrumbSchema(
  crumbs: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function buildServiceSchema(params: {
  name: string;
  description: string;
  url: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${params.url}#service`,
    name: params.name,
    description: params.description,
    url: params.url,
    serviceType: params.name,
    provider: { '@id': `${site.url}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Japan' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Place', name: 'Europe' },
    ],
    availableLanguage: ['English', 'Japanese'],
  };
}

export function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export function buildCaseStudySchema(params: {
  title: string;
  description: string;
  url: string;
  image: string;
  client: string;
  year: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${params.url}#casestudy`,
    headline: params.title,
    name: params.title,
    description: params.description,
    url: params.url,
    image: params.image,
    datePublished: `${params.year}-01-01`,
    inLanguage: 'en',
    creator: { '@id': `${site.url}/#organization` },
    publisher: { '@id': `${site.url}/#organization` },
    about: params.category,
    keywords: [params.client, params.category, 'Japan', 'case study'],
    mainEntityOfPage: params.url,
  };
}
