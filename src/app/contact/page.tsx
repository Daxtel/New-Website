import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';
import { pick } from '@/lib/i18n';
import { contactPage } from '@/lib/secondary-pages';
import { contactPageBilingual } from '@/lib/secondary-pages-bilingual';

export const metadata: Metadata = {
  title: 'Discuss Your Project',
  description:
    'Contact Streetshow Productions about Japan market entry, hospitality repositioning, premium campaign execution, and localization-led brand work.',
};

export default function ContactPage() {
  const locale = 'en';

  return (
    <main className="bg-[#1a1c1b] text-white">
      <section className="px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.85] tracking-tight text-lime-300">
              {pick(contactPageBilingual.title, locale)}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg lg:text-xl">
              {pick(contactPageBilingual.subtitle, locale)}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-lime-300/80 md:text-base">
              {pick(contactPageBilingual.qualification, locale)}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/55 md:text-base">
              {pick(contactPageBilingual.reassurance, locale)}
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-5 lg:gap-20">
            <div className="lg:col-span-3">
              <ContactForm locale={locale} />
            </div>

            <div className="lg:col-span-2">
              <div className="bg-[#302f2c] p-8 md:p-10">
                <h2 className="text-xl font-bold uppercase tracking-[0.15em] text-lime-300">{pick(contactPageBilingual.contactInfoLabel, locale)}</h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.15em] text-white/45">{pick(contactPageBilingual.emailLabel, locale)}</p>
                    <a href={`mailto:${contactPage.contact.email}`} className="mt-2 block text-base font-medium text-lime-300 md:text-lg">
                      {contactPage.contact.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.15em] text-white/45">{pick(contactPageBilingual.locationLabel, locale)}</p>
                    <p className="mt-2 text-base font-medium text-lime-300 md:text-lg">{contactPage.contact.location}</p>
                  </div>
                </div>

                <div className="mt-10 border-t border-lime-300/10 pt-8">
                  <p className="mb-4 text-base leading-relaxed text-white/65">
                    {pick(contactPageBilingual.directLabel, locale)}
                  </p>
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-full text-sm font-medium text-lime-300 transition-opacity hover:opacity-80">
                    {pick({ en: 'Book a Strategic Call', ja: '戦略コールを予約する' }, locale)}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
