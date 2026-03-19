'use client';

import { useState } from 'react';
import { pick } from '@/lib/i18n';
import { contactPageBilingual } from '@/lib/secondary-pages-bilingual';

type Props = { locale?: 'en' | 'ja' };

type FormDataState = {
  name: string;
  email: string;
  company: string;
  website: string;
  projectType: string;
  budget: string;
  timeline: string;
  scope: string;
  message: string;
};

const fieldDefs: Array<{ key: keyof FormDataState; label: { en: string; ja: string } }> = [
  { key: 'name', label: contactPageBilingual.fieldLabels.name },
  { key: 'email', label: contactPageBilingual.fieldLabels.email },
  { key: 'company', label: contactPageBilingual.fieldLabels.company },
  { key: 'website', label: contactPageBilingual.fieldLabels.website },
  { key: 'projectType', label: contactPageBilingual.fieldLabels.projectType },
  { key: 'budget', label: contactPageBilingual.fieldLabels.budget },
  { key: 'timeline', label: contactPageBilingual.fieldLabels.timeline },
  { key: 'scope', label: contactPageBilingual.fieldLabels.scope },
];

export function ContactForm({ locale = 'en' }: Props) {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    company: '',
    website: '',
    projectType: '',
    budget: '',
    timeline: '',
    scope: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      setStatus('error');
      setMessage(data.error || 'Submission failed');
      return;
    }

    setStatus('success');
    setMessage(locale === 'en' ? 'Inquiry submitted successfully.' : 'お問い合わせを送信しました。');
    setFormData({ name: '', email: '', company: '', website: '', projectType: '', budget: '', timeline: '', scope: '', message: '' });
  }

  function update(name: keyof FormDataState, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 md:space-y-6">
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {fieldDefs.map(({ key, label }) => (
          <div key={key}>
            <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-lime-300">{pick(label, locale)}</label>
            <input
              value={formData[key]}
              onChange={(e) => update(key, e.target.value)}
              type={key === 'email' ? 'email' : key === 'website' ? 'url' : 'text'}
              required={key === 'name' || key === 'email'}
              className="w-full border border-lime-300/10 bg-[#302f2c] px-4 py-4 text-white outline-none focus:border-lime-300/40"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-lime-300">{pick(contactPageBilingual.fieldLabels.details, locale)}</label>
        <textarea
          value={formData.message}
          onChange={(e) => update('message', e.target.value)}
          required
          rows={6}
          className="w-full border border-lime-300/10 bg-[#302f2c] px-4 py-4 text-white outline-none focus:border-lime-300/40"
        />
      </div>

      <p className="text-sm leading-relaxed text-white/55 md:text-base">{pick(contactPageBilingual.processNote, locale)}</p>

      {message ? <p className={`text-sm ${status === 'success' ? 'text-lime-300' : 'text-red-300'}`}>{message}</p> : null}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center rounded-full bg-lime-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#1a1c1b] disabled:opacity-60"
      >
        {status === 'loading' ? (locale === 'en' ? 'Sending...' : '送信中...') : pick({ en: 'Send Inquiry', ja: '問い合わせを送る' }, locale)}
      </button>
    </form>
  );
}
