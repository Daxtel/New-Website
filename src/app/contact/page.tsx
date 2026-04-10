import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { pick } from '@/lib/i18n';
import { contactPage } from '@/lib/secondary-pages';
import { contactPageBilingual } from '@/lib/secondary-pages-bilingual';
import { getLocale } from '@/lib/locale';

export const metadata: Metadata = {
  title: 'Discuss Your Project',
  description:
    'Contact Streetshow Productions about Japan market entry, hospitality repositioning, premium campaign execution, and localization-led brand work.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const locale = await getLocale();

  return (
    <main className="bg-[#0A0A0A] text-white">
      <section className="px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
              {pick(contactPageBilingual.title, locale)}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg lg:text-xl">
              {pick(contactPageBilingual.subtitle, locale)}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#D4AF37]/80 md:text-base">
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
              <div className="bg-[#141414] p-8 md:p-10">
                <h2 className="text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{pick(contactPageBilingual.contactInfoLabel, locale)}</h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.15em] text-white/45">{pick(contactPageBilingual.emailLabel, locale)}</p>
                    <a href={`mailto:${contactPage.contact.email}`} className="mt-2 block break-all text-base font-medium text-[#D4AF37] md:text-lg">
                      {contactPage.contact.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.15em] text-white/45">
                      {pick({ en: 'Phone', ja: '電話' }, locale)}
                    </p>
                    <a href={`tel:${contactPage.contact.phoneHref}`} className="mt-2 block text-base font-medium text-[#D4AF37] md:text-lg">
                      {contactPage.contact.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.15em] text-white/45">{pick(contactPageBilingual.locationLabel, locale)}</p>
                    <p className="mt-2 text-base font-medium text-[#D4AF37] md:text-lg">{contactPage.contact.location}</p>
                  </div>
                </div>

                <div className="mt-10 border-t border-[#D4AF37]/10 pt-8">
                  <p className="mb-4 text-base leading-relaxed text-white/65">
                    {pick(contactPageBilingual.directLabel, locale)}
                  </p>
                  <a
                    href={`tel:${contactPage.contact.phoneHref}`}
                    className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#D4AF37] px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] transition-opacity hover:opacity-90"
                  >
                    {pick({ en: `Call ${contactPage.contact.phone}`, ja: `電話する ${contactPage.contact.phone}` }, locale)}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
