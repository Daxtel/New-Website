import { site } from '@/lib/site';

/**
 * Structured data helpers for Google rich results and AI citation
 * (ChatGPT, Perplexity, Claude, Gemini, Bing Copilot all read JSON-LD).
 */

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  // Escape `<` so a `</script>` sequence in any schema value cannot break out
  // of the script tag (defense-in-depth against JSON-LD XSS).
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
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
  logo: `${site.url}/icon-512.png`,
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
  telephone: '+81-70-4802-1725',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+81-70-4802-1725',
    email: 'admin@streetshowproduction.com',
    availableLanguage: ['English', 'Japanese'],
    areaServed: ['JP', 'US', 'EU'],
  },
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${site.url}/#localbusiness`,
  name: 'Streetshow Productions',
  description:
    'Market Perception Intelligence Studio. Video production, 3D anamorphic billboards, and Japan market localization for foreign brands entering Japan.',
  image: `${site.url}/og-image.jpg`,
  url: site.url,
  telephone: '+81-70-4802-1725',
  email: 'admin@streetshowproduction.com',
  priceRange: '¥¥¥',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Fukuoka',
    addressCountry: 'JP',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '33.5904',
    longitude: '130.4017',
  },
  areaServed: ['Fukuoka', 'Tokyo', 'Osaka', 'Japan'],
  sameAs: [
    'https://www.instagram.com/jackson.streetshow',
    'https://www.linkedin.com/company/streetshow-productions',
  ],
  founder: {
    '@type': 'Person',
    name: 'Daxtel Jackson',
    jobTitle: 'Director & Strategist',
  },
  knowsLanguage: ['en', 'fr', 'ja'],
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
  offer?: { price: string; priceCurrency: string };
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
    ...(params.offer && {
      offers: {
        '@type': 'Offer',
        price: params.offer.price,
        priceCurrency: params.offer.priceCurrency,
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: params.offer.price,
          priceCurrency: params.offer.priceCurrency,
          valueAddedTaxIncluded: false,
        },
      },
    }),
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

export function buildItemListSchema(params: {
  name: string;
  items: { name: string; url: string; description?: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: params.name,
    numberOfItems: params.items.length,
    itemListElement: params.items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

// Homepage FAQ — tuned for AI citation (ChatGPT, Perplexity, Claude, Gemini)
// and Google rich snippets. Every answer is a direct, self-contained sentence.
export const homeFaqSchema = buildFaqSchema([
  {
    q: 'What does Streetshow Productions do?',
    a: 'Streetshow Productions is a strategy-first creative production studio based in Fukuoka and Tokyo, Japan. We help international premium brands enter and perform in the Japanese market through cultural localization, video production, photography, CGI, 3D anamorphic billboards, and live commerce growth systems.',
  },
  {
    q: 'Where is Streetshow Productions based?',
    a: 'Streetshow Productions is headquartered in Fukuoka, Japan, with a secondary office in Tokyo. The team operates bilingually in English and Japanese and serves clients across Japan, the United States, and Europe.',
  },
  {
    q: 'When was Streetshow Productions founded?',
    a: 'Streetshow Productions was founded in 2013 by Daxtel Jackson, who serves as Director, Strategist, and Videographer.',
  },
  {
    q: 'Who are Streetshow Productions clients?',
    a: 'Streetshow Productions has worked with New Balance Japan, SHEIN Japan, The Ritz-Carlton Kyoto, The Ritz-Carlton Osaka, Charles & Keith, KUOE Kyoto, SOUMEI Champagne, QC Running, FUDITALYCO, and JTL Kabushiki Gaisha, among others.',
  },
  {
    q: 'What is Japan market entry and how does Streetshow approach it?',
    a: 'Japan market entry is the process of launching a foreign brand into the Japanese consumer market. Streetshow approaches it strategy-first: brand positioning, cultural adaptation (not translation), pricing logic for Japanese buyers, creative transcreation, and locally-calibrated launch production. We work with luxury hospitality, fashion, automotive, F&B, and e-commerce brands.',
  },
  {
    q: 'Does Streetshow produce 3D anamorphic billboards in Shibuya?',
    a: 'Yes. Streetshow Productions produces naked-eye 3D anamorphic billboard content for Shibuya, Shinjuku, and other high-visibility LED locations across Japan. Scope includes concept, 3D animation, and screen-specific calibration.',
  },
  {
    q: 'Does Streetshow work bilingually in English and Japanese?',
    a: 'Yes. All production, strategy, and client communication can be delivered in English or Japanese. Every deliverable is built to perform in the Japanese market while remaining legible to international stakeholders.',
  },
  {
    q: 'How do I contact Streetshow Productions?',
    a: 'Email admin@streetshowproduction.com or call +81-70-4802-1725. Project inquiries can also be submitted via https://streetshowproduction.com/contact.',
  },
]);

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

export function buildVideoObjectSchema(params: {
  name: string;
  description: string;
  contentUrl: string;
  thumbnailUrl: string;
  uploadDate: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${params.url}#video`,
    name: params.name,
    description: params.description,
    contentUrl: params.contentUrl,
    thumbnailUrl: params.thumbnailUrl,
    uploadDate: params.uploadDate,
    publisher: { '@id': `${site.url}/#organization` },
    inLanguage: 'en',
  };
}
