'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  location: string;
  message: string;
};

const EMPTY_FORM: FormDataState = {
  name: '', email: '', company: '', website: '',
  projectType: '', budget: '', timeline: '', location: '', message: '',
};

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const fieldDefs: Array<{
  key: 'name' | 'email' | 'company' | 'website' | 'timeline' | 'location';
  label: { en: string; ja: string };
  type?: string;
  full?: boolean;
}> = [
  { key: 'name',     label: contactPageBilingual.fieldLabels.name },
  { key: 'email',    label: contactPageBilingual.fieldLabels.email, type: 'email' },
  { key: 'company',  label: contactPageBilingual.fieldLabels.company },
  { key: 'website',  label: contactPageBilingual.fieldLabels.website, type: 'url' },
  { key: 'timeline', label: contactPageBilingual.fieldLabels.timeline },
  { key: 'location', label: contactPageBilingual.fieldLabels.location },
];

// ── Floating-label input ──────────────────────────────────────────────────────
function FloatField({
  id, label, value, type = 'text', required = false, onChange,
}: {
  id: string; label: string; value: string; type?: string;
  required?: boolean; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative border border-[#D4AF37]/15 bg-[#141414] transition-colors duration-300 focus-within:border-[#D4AF37]/50">
      {/* Gold bottom-line slides in from left on focus */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-[#D4AF37]"
        animate={{ scaleX: focused ? 1 : 0 }}
        style={{ width: '100%', originX: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      />
      {/* Floating label */}
      <motion.label
        htmlFor={id}
        className="pointer-events-none absolute left-4 font-medium uppercase tracking-[0.12em] text-[#D4AF37]/60 select-none"
        animate={lifted
          ? { top: '6px', fontSize: '9px', opacity: 0.7 }
          : { top: '50%', fontSize: '12px', opacity: 1 }}
        style={lifted ? {} : { translateY: '-50%' }}
        transition={{ duration: 0.2, ease: EASE }}
      >
        {label}
      </motion.label>
      <input
        id={id} type={type} value={value} required={required}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent px-4 pb-3 pt-6 text-white outline-none"
      />
    </div>
  );
}

// ── Floating-label select ─────────────────────────────────────────────────────
function FloatSelect({
  id, label, value, options, placeholder, onChange,
}: {
  id: string; label: string; value: string; placeholder: string;
  options: string[]; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative border border-[#D4AF37]/15 bg-[#141414] transition-colors duration-300 focus-within:border-[#D4AF37]/50">
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-[#D4AF37]"
        animate={{ scaleX: focused ? 1 : 0 }}
        style={{ width: '100%', originX: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      />
      <motion.label
        htmlFor={id}
        className="pointer-events-none absolute left-4 z-10 font-medium uppercase tracking-[0.12em] text-[#D4AF37]/60 select-none"
        animate={lifted
          ? { top: '6px', fontSize: '9px', opacity: 0.7 }
          : { top: '50%', fontSize: '12px', opacity: 1 }}
        style={lifted ? {} : { translateY: '-50%' }}
        transition={{ duration: 0.2, ease: EASE }}
      >
        {label}
      </motion.label>
      <select
        id={id} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full cursor-pointer appearance-none bg-transparent px-4 pb-3 pt-6 text-white outline-none [&>option]:bg-[#141414] [&>option]:text-white"
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {/* Chevron */}
      <svg
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4AF37]/60"
        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
      >
        <path fillRule="evenodd" clipRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
      </svg>
    </div>
  );
}

// ── Floating-label textarea ───────────────────────────────────────────────────
function FloatTextarea({
  id, label, value, required = false, onChange,
}: {
  id: string; label: string; value: string; required?: boolean; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative border border-[#D4AF37]/15 bg-[#141414] transition-colors duration-300 focus-within:border-[#D4AF37]/50">
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-[#D4AF37]"
        animate={{ scaleX: focused ? 1 : 0 }}
        style={{ width: '100%', originX: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      />
      <motion.label
        htmlFor={id}
        className="pointer-events-none absolute left-4 font-medium uppercase tracking-[0.12em] text-[#D4AF37]/60 select-none"
        animate={lifted
          ? { top: '10px', fontSize: '9px', opacity: 0.7 }
          : { top: '18px', fontSize: '12px', opacity: 1 }}
        transition={{ duration: 0.2, ease: EASE }}
      >
        {label}
      </motion.label>
      <textarea
        id={id} value={value} required={required} rows={6}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent px-4 pb-4 pt-8 text-white outline-none resize-none"
      />
    </div>
  );
}

// ── Animated submit button ────────────────────────────────────────────────────
function SubmitButton({ status, locale }: { status: 'idle' | 'loading' | 'success' | 'error'; locale: 'en' | 'ja' }) {
  return (
    <button
      type="submit"
      disabled={status === 'loading' || status === 'success'}
      className="relative inline-flex min-h-[52px] min-w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] transition-all duration-300 disabled:opacity-80 hover:[box-shadow:0_0_20px_4px_rgba(212,175,55,0.35)]"
    >
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.span key="idle"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {locale === 'en' ? 'Send Inquiry' : '問い合わせを送る'}
          </motion.span>
        )}
        {status === 'loading' && (
          <motion.span key="loading"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            {locale === 'en' ? 'Sending...' : '送信中...'}
          </motion.span>
        )}
        {status === 'success' && (
          <motion.span key="success"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
            </svg>
            {locale === 'en' ? 'Sent!' : '送信完了！'}
          </motion.span>
        )}
        {status === 'error' && (
          <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {locale === 'en' ? 'Try Again' : '再試行'}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ── Main exported form ────────────────────────────────────────────────────────
export function ContactForm({ locale = 'en' }: Props) {
  const [formData, setFormData] = useState<FormDataState>({ ...EMPTY_FORM });
  const [status, setStatus]     = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState(''); // hidden anti-bot field

  function update(key: keyof FormDataState, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (status === 'error') setStatus('idle');
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, company_url: honeypot }),
      });
      const data = await res.json();
      if (!res.ok) { setStatus('error'); setErrorMsg(data.error || 'Submission failed'); return; }
      setStatus('success');
      setFormData({ ...EMPTY_FORM });
    } catch {
      setStatus('error');
      setErrorMsg(locale === 'en' ? 'Network error — please try again.' : 'ネットワークエラー。再度お試しください。');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 md:space-y-6">
      {/* Honeypot — hidden from real users; bots that fill it are rejected server-side. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_url">Company URL (leave blank)</label>
        <input
          id="company_url"
          name="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {fieldDefs.map(({ key, label, type }) => (
          <div key={key}>
            <FloatField
              id={key} label={pick(label, locale)} value={formData[key]}
              type={type} required={key === 'name' || key === 'email'}
              onChange={(v) => update(key, v)}
            />
          </div>
        ))}
        <FloatSelect
          id="projectType"
          label={pick(contactPageBilingual.fieldLabels.projectType, locale)}
          value={formData.projectType}
          placeholder={pick(contactPageBilingual.selectPlaceholder, locale)}
          options={contactPageBilingual.projectTypeOptions.map((o) => pick(o, locale))}
          onChange={(v) => update('projectType', v)}
        />
        <FloatSelect
          id="budget"
          label={pick(contactPageBilingual.fieldLabels.budget, locale)}
          value={formData.budget}
          placeholder={pick(contactPageBilingual.selectPlaceholder, locale)}
          options={contactPageBilingual.budgetOptions.map((o) => pick(o, locale))}
          onChange={(v) => update('budget', v)}
        />
      </div>

      <FloatTextarea
        id="message" label={pick(contactPageBilingual.fieldLabels.details, locale)}
        value={formData.message} required onChange={(v) => update('message', v)}
      />

      <AnimatePresence>
        {status === 'error' && errorMsg && (
          <motion.div key="err"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-sm text-red-300"
          >
            <p>{errorMsg}</p>
            <p className="mt-2 text-white/55">
              {locale === 'en' ? 'Or email us directly: ' : '直接メールでもご連絡いただけます：'}
              <a href={`mailto:admin@streetshowproduction.com?subject=${encodeURIComponent('Project Inquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\n${formData.message}`)}`} className="text-[#D4AF37] underline">
                admin@streetshowproduction.com
              </a>
            </p>
          </motion.div>
        )}
        {status === 'success' && (
          <motion.p key="ok"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-sm text-[#D4AF37]"
          >
            {locale === 'en' ? "Inquiry submitted — we'll be in touch shortly." : 'お問い合わせを受け付けました。近日中にご連絡します。'}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <SubmitButton status={status} locale={locale} />
        <a href="mailto:admin@streetshowproduction.com?subject=Project%20Inquiry"
          className="cursor-pointer text-sm text-white/55 underline-offset-4 hover:text-[#D4AF37] hover:underline">
          {locale === 'en' ? 'Or email us directly' : 'または直接メールで'}
        </a>
      </div>
    </form>
  );
}
