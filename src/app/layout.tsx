import type { Metadata } from 'next';
import './globals.css';
import { pick } from '@/lib/i18n';
import { site } from '@/lib/site';
import { getLocale } from '@/lib/locale';
import { LayoutShell } from '@/components/layout-shell';
import {
  JsonLd,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from '@/components/json-ld';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Japan Market Entry & Premium Creative Execution`,
    template: `%s | ${site.name}`,
  },
  description: pick(site.description, 'en'),
  keywords: [
    'Japan market entry',
    'Japan localization',
    'luxury hospitality marketing Japan',
    'premium creative production Japan',
    'Streetshow Productions',
  ],
  openGraph: {
    title: site.name,
    description: pick(site.description, 'en'),
    url: site.url,
    siteName: site.name,
    locale: 'en_JP',
    alternateLocale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Streetshow Productions: Japan Market Entry & Premium Creative Execution',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: pick(site.description, 'en'),
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      ja: '/',
      'x-default': '/',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'Streetshow Productions' }],
  creator: 'Streetshow Productions',
  publisher: 'Streetshow Productions',
  category: 'Creative Production',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} translate="no">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={[organizationSchema, localBusinessSchema, websiteSchema]} />
      </head>
      <body className="antialiased">
        <LayoutShell locale={locale}>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
