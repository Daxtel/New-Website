'use client';

import { useState } from 'react';
import { pick } from '@/lib/i18n';
import { contactPageBilingual } from '@/lib/secondary-pages-bilingual';

type Props = { locale?: 'en' | 'ja' };

type FormDataState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const fieldDefs: Array<{ key: keyof Omit<FormDataState, 'message'>; label: { en: string; ja: string } }> = [
  { key: 'name', label: contactPageBilingual.fieldLabels.name },
  { key: 'email', label: contactPageBilingual.fieldLabels.email },
  { key: 'company', label: contactPageBilingual.fieldLabels.company },
];

export function ContactForm({ locale = 'en' }: Props) {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    company: '',
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
    setFormData({ name: '', email: '', company: '', message: '' });
  }

  function update(name: keyof FormDataState, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 md:space-y-6">
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {fieldDefs.map(({ key, label }) => (
          <div key={key} className={key === 'company' ? 'md:col-span-2' : ''}>
            <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-[#D4AF37]">{pick(label, locale)}</label>
            <input
              value={formData[key]}
              onChange={(e) => update(key, e.target.value)}
              type={key === 'email' ? 'email' : 'text'}
              required={key === 'name' || key === 'email'}
              className="w-full border border-[#D4AF37]/10 bg-[#141414] px-4 py-4 text-white outline-none focus:border-[#D4AF37]/40"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-[#D4AF37]">{pick(contactPageBilingual.fieldLabels.details, locale)}</label>
        <textarea
          value={formData.message}
          onChange={(e) => update('message', e.target.value)}
          required
          rows={6}
          className="w-full border border-[#D4AF37]/10 bg-[#141414] px-4 py-4 text-white outline-none focus:border-[#D4AF37]/40"
        />
      </div>

      {message ? <p className={`text-sm ${status === 'success' ? 'text-[#D4AF37]' : 'text-red-300'}`}>{message}</p> : null}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] disabled:opacity-60"
      >
        {status === 'loading' ? (locale === 'en' ? 'Sending...' : '送信中...') : pick({ en: 'Send Inquiry', ja: '問い合わせを送る' }, locale)}
      </button>
    </form>
  );
}
