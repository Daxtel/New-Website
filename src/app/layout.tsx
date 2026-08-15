import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import type { Metadata } from 'next';
import './globals.css';
import { pick } from '@/lib/i18n';
import { site } from '@/lib/site';
import { getLocale } from '@/lib/locale';
import { LayoutShell } from '@/components/layout-shell';
import { GlobalProviders } from '@/components/motion/GlobalProviders';
import {
  JsonLd,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from '@/components/json-ld';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isJa = locale === 'ja';
  return {
  metadataBase: new URL(site.url),
  // Explicit icons at STABLE public URLs (no build hash) so Google's home-page
  // favicon crawl always resolves. Mark-only on solid #0A0A0A; sizes are
  // multiples of 48 per Google's favicon requirements.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon-96.png', type: 'image/png', sizes: '96x96' },
      { url: '/icon-144.png', type: 'image/png', sizes: '144x144' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  title: {
    default: `${site.name} | Japan Market Entry & Premium Creative Execution`,
    template: `%s | ${site.name}`,
  },
  description: pick(site.description, locale),
  keywords: [
    'Japan market entry',
    'Japan localization',
    'luxury hospitality marketing Japan',
    'premium creative production Japan',
    'Streetshow Productions',
  ],
  openGraph: {
    title: site.name,
    description: pick(site.description, locale),
    url: isJa ? `${site.url}/ja` : site.url,
    siteName: site.name,
    locale: isJa ? 'ja_JP' : 'en_JP',
    alternateLocale: isJa ? 'en_JP' : 'ja_JP',
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
    description: pick(site.description, locale),
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      ja: '/ja',
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
}

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
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+JP:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" type="application/rss+xml" title="Streetshow Productions: Insights" href="/feed.xml" />
        <JsonLd data={[organizationSchema, localBusinessSchema, websiteSchema]} />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        <GlobalProviders>
          <LayoutShell locale={locale}>
            {children}
          </LayoutShell>
        </GlobalProviders>
      </body>
    </html>
  );
}
