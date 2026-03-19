import type { Metadata } from 'next';
import './globals.css';
import { pick } from '@/lib/i18n';
import { site } from '@/lib/site';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const locale = 'en';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Japan Market Entry & Premium Creative Execution`,
    template: `%s | ${site.name}`,
  },
  description: pick(site.description, locale),
  openGraph: {
    title: site.name,
    description: pick(site.description, locale),
    url: site.url,
    siteName: site.name,
    locale: 'en_JP',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
