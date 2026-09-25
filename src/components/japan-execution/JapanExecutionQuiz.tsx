'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { questionSteps, contactStep, TOTAL_STEPS, type StepField } from '@/lib/japan-execution-form';
import { japanExecution } from '@/lib/japan-execution';
import { track } from '@/lib/analytics';

/**
 * Six qualifying questions, then contact. Extends the restaurant-quiz pattern with
 * the two things it does not have, both required here:
 *
 *  - Keyboard and screen reader support: every step is a fieldset with a legend,
 *    options are real radio/checkbox inputs (so arrow keys, space and tab behave
 *    the way assistive tech expects), the progress bar is a role="progressbar",
 *    step changes are announced through an aria-live region, and focus moves to
 *    the new legend on every transition.
 *  - Browser back survival: each step pushes a history entry, and popstate walks
 *    the form back rather than leaving the page. Answers live in component state,
 *    which survives because we never actually navigate.
 */

type Answers = {
  delivering: string;
  timing: string;
  size: string;
  region: string;
  budget: string;
  needs: string[];
  name: string;
  company: string;
  email: string;
  notes: string;
};

const EMPTY: Answers = {
  delivering: '',
  timing: '',
  size: '',
  region: '',
  budget: '',
  needs: [],
  name: '',
  company: '',
  email: '',
  notes: '',
};

const HISTORY_KEY = 'japanExecutionStep';

export function JapanExecutionQuiz() {
  const [stepIndex, setStepIndex] = useState(0); // 0..questionSteps.length (last = contact)
  const [answers, setAnswers] = useState<Answers>({ ...EMPTY });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [started, setStarted] = useState(false);

  const legendRef = useRef<HTMLElement | null>(null);
  const shouldFocus = useRef(false);

  const isContact = stepIndex === questionSteps.length;
  const current = isContact ? null : questionSteps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / TOTAL_STEPS) * 100);

  // Move focus to the new step's legend so a screen reader lands on the question
  // rather than being left where the previous control was.
  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    legendRef.current?.focus();
  }, [stepIndex]);

  // Browser back walks the form instead of leaving the page.
  useEffect(() => {
    function onPop(e: PopStateEvent) {
      const target = (e.state as Record<string, unknown> | null)?.[HISTORY_KEY];
      if (typeof target === 'number') {
        shouldFocus.current = true;
        setStepIndex(target);
      }
    }
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const goTo = useCallback((next: number, push: boolean) => {
    shouldFocus.current = true;
    setStepIndex(next);
    if (push && typeof window !== 'undefined') {
      window.history.pushState({ [HISTORY_KEY]: next }, '', window.location.href);
    }
  }, []);

  const advance = useCallback(
    (from: number) => {
      if (!started) {
        setStarted(true);
        track('japan_execution_form_start');
      }
      track('japan_execution_step_advance', { step: from + 1 });
      goTo(from + 1, true);
    },
    [goTo, started],
  );

  function selectSingle(field: StepField, value: string, index: number) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    advance(index);
  }

  function toggleMulti(value: string) {
    setAnswers((prev) => ({
      ...prev,
      needs: prev.needs.includes(value)
        ? prev.needs.filter((v) => v !== value)
        : [...prev.needs, value],
    }));
  }

  function goBack() {
    if (stepIndex === 0) return;
    // Let popstate drive it so the browser history and the form stay in step.
    if (typeof window !== 'undefined' && window.history.state?.[HISTORY_KEY] != null) {
      window.history.back();
      return;
    }
    goTo(stepIndex - 1, false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/japan-execution-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...answers, company_url: honeypot }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Submission failed.');
        return;
      }
      track('japan_execution_form_submit');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Network error, please try again.');
    }
  }

  const optionClass = (selected: boolean) =>
    `flex w-full cursor-pointer items-center gap-3 rounded-xl border px-5 py-4 text-left text-base transition-all ${
      selected
        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
        : 'border-white/10 bg-[#141414] text-body-text hover:border-[#D4AF37]/40 hover:text-white'
    }`;

  if (status === 'success') {
    return (
      <div className="mx-auto w-full max-w-xl text-center" role="status" aria-live="polite">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/10">
          <svg className="h-8 w-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg leading-relaxed text-body-text md:text-xl">
          {japanExecution.form.confirmation}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-muted-text">
          <span>{`Step ${stepIndex + 1} of ${TOTAL_STEPS}`}</span>
          <span>{progress}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={stepIndex + 1}
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-valuetext={`Step ${stepIndex + 1} of ${TOTAL_STEPS}`}
          className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10"
        >
          <div
            className="h-full rounded-full bg-[#D4AF37] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Announce step changes without moving visual focus away from the question. */}
      <p className="sr-only" aria-live="polite">
        {isContact ? contactStep.question : current?.question} . Step {stepIndex + 1} of {TOTAL_STEPS}
      </p>

      {/* Honeypot, hidden from real users. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="je_company_url">Company URL (leave blank)</label>
        <input
          id="je_company_url"
          name="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Question steps */}
      {current && (
        <fieldset className="border-0 p-0">
          <legend
            ref={legendRef as React.Ref<HTMLLegendElement>}
            tabIndex={-1}
            className="text-2xl font-bold text-heading outline-none md:text-3xl"
          >
            {current.question}
          </legend>
          {current.multi && (
            <p className="mt-2 text-sm text-muted-text">Select as many as apply.</p>
          )}

          <div className="mt-6 grid gap-3">
            {current.options.map((option) => {
              const selected = current.multi
                ? answers.needs.includes(option)
                : answers[current.field] === option;
              const id = `${current.field}-${option.replace(/\W+/g, '-').toLowerCase()}`;
              return (
                <label key={option} htmlFor={id} className={optionClass(selected)}>
                  <input
                    id={id}
                    type={current.multi ? 'checkbox' : 'radio'}
                    name={current.field}
                    value={option}
                    checked={selected}
                    onChange={() =>
                      current.multi
                        ? toggleMulti(option)
                        : selectSingle(current.field, option, stepIndex)
                    }
                    className="h-4 w-4 shrink-0 accent-[#D4AF37]"
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </div>

          <div className="mt-8 flex items-center gap-5">
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={goBack}
                className="cursor-pointer text-sm text-muted-text transition-colors hover:text-[#D4AF37]"
              >
                Back
              </button>
            )}
            {current.multi && (
              <button
                type="button"
                onClick={() => advance(stepIndex)}
                disabled={answers.needs.length === 0}
                className="inline-flex min-h-[52px] cursor-pointer items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
              </button>
            )}
          </div>
        </fieldset>
      )}

      {/* Contact step */}
      {isContact && (
        <form onSubmit={onSubmit} noValidate={false}>
          <fieldset className="border-0 p-0">
            <legend
              ref={legendRef as React.Ref<HTMLLegendElement>}
              tabIndex={-1}
              className="text-2xl font-bold text-heading outline-none md:text-3xl"
            >
              {contactStep.question}
            </legend>
            <p className="mt-2 text-sm text-muted-text">{contactStep.helper}</p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="je-name" className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                  {contactStep.fields.name}
                </label>
                <input
                  id="je-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={answers.name}
                  onChange={(e) => setAnswers((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#141414] px-4 py-3 text-white outline-none transition-colors focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label htmlFor="je-company" className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                  {contactStep.fields.company}
                </label>
                <input
                  id="je-company"
                  type="text"
                  required
                  autoComplete="organization"
                  value={answers.company}
                  onChange={(e) => setAnswers((p) => ({ ...p, company: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#141414] px-4 py-3 text-white outline-none transition-colors focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label htmlFor="je-email" className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                  {contactStep.fields.email}
                </label>
                <input
                  id="je-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={answers.email}
                  onChange={(e) => setAnswers((p) => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#141414] px-4 py-3 text-white outline-none transition-colors focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label htmlFor="je-notes" className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                  {contactStep.fields.notes}
                </label>
                <textarea
                  id="je-notes"
                  rows={4}
                  value={answers.notes}
                  onChange={(e) => setAnswers((p) => ({ ...p, notes: e.target.value }))}
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#141414] px-4 py-3 text-white outline-none transition-colors focus:border-[#D4AF37]/50"
                />
              </div>
            </div>

            {status === 'error' && errorMsg && (
              <p role="alert" className="mt-4 text-sm text-red-300">
                {errorMsg}
              </p>
            )}

            <div className="mt-8 flex items-center gap-5">
              <button
                type="button"
                onClick={goBack}
                className="cursor-pointer text-sm text-muted-text transition-colors hover:text-[#D4AF37]"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex min-h-[52px] cursor-pointer items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending...' : japanExecution.form.submitLabel}
              </button>
            </div>
          </fieldset>
        </form>
      )}
    </div>
  );
}
