'use client';

import { InkHighlight } from './InkHighlight';
import { RevealHeading } from './RevealHeading';
import { ActionContent } from './ActionContent';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRightIcon, WhatsappLogoIcon, EnvelopeSimpleIcon, CheckIcon } from '@phosphor-icons/react';
import { business, services, serviceTitle } from '@/lib/content';
import { buildQuoteMessage, buildWhatsAppUrl, validateQuote, type QuoteDetails } from '@/lib/quote';

const initial: QuoteDetails = { service: 'Help me choose', description: '', dimensions: '', quantity: '', material: '', name: '', deadline: '' };

export function QuoteForm() {
  const [details, setDetails] = useState<QuoteDetails>(initial);
  const [error, setError] = useState('');
  const [draftUrl, setDraftUrl] = useState('');
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    function applyParams() {
      const params = new URLSearchParams(window.location.search);
      const service = params.get('service');
      const material = params.get('material');
      if (service || material) setDetails(previous => ({ ...previous, ...(service ? { service: serviceTitle(service) } : {}), ...(material ? { material } : {}) }));
      setDraftUrl('');
    }
    applyParams();
    window.addEventListener('quote:select', applyParams);
    window.addEventListener('popstate', applyParams);
    return () => { window.removeEventListener('quote:select', applyParams); window.removeEventListener('popstate', applyParams); };
  }, []);

  function update(key: keyof QuoteDetails, value: string) {
    setDetails(previous => ({ ...previous, [key]: value }));
    setDraftUrl('');
    if (key === 'description' && value.trim()) setError('');
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problem = validateQuote(details);
    if (problem) { setError(problem); descriptionRef.current?.focus(); return; }
    const url = buildWhatsAppUrl(business.whatsapp, details);
    setError('');
    setDraftUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const emailHref = `mailto:${business.email}?subject=${encodeURIComponent(`Quotation inquiry: ${details.service}`)}&body=${encodeURIComponent(buildQuoteMessage(details))}`;

  return <section className="quote-section section-wrap" id="quote" aria-labelledby="quote-title">
    <div className="quote-intro"><RevealHeading id="quote-title" lines={["Let’s make", "your idea", "happen."]} highlightLast /><p>A shopfront, a car, a wall or something entirely your own. Tell us what you’re thinking.</p><div className="quote-note"><WhatsappLogoIcon size={26} /><p>Your idea goes straight into a WhatsApp draft. Review it, add your artwork, then send it to start the conversation.</p></div><a className="text-link" href="tel:+923455130004"><ActionContent kind="roll">Prefer a call? {business.phone}<ArrowUpRightIcon size={18} /></ActionContent></a></div>
    <form className="quote-form" onSubmit={submit} noValidate>
      <div className="form-heading"><h3><InkHighlight textOnly>Tell us about your project.</InkHighlight></h3><span>Only the project description is required.</span></div>
      <label className="field"><span>What are we creating?</span><select id="quote-service" name="service" value={details.service} onChange={event => update('service', event.target.value)}><option>Help me choose</option>{services.map(service => <option key={service.id}>{service.title}</option>)}</select></label>
      <label className="field"><span>Your project <span className="required-label">(required)</span></span><textarea ref={descriptionRef} name="description" required maxLength={2000} rows={3} placeholder="For example, a signboard for my café with our logo…" value={details.description} onChange={event => update('description', event.target.value)} aria-invalid={!!error} aria-describedby={error ? 'quote-error' : undefined} /></label>
      {error && <p className="form-error" id="quote-error" role="alert">{error}</p>}
      <div className="field-pair"><label className="field"><span>Approximate size <small>(optional)</small></span><input name="dimensions" maxLength={100} placeholder="e.g. 6 × 3 ft, or vehicle model" value={details.dimensions} onChange={event => update('dimensions', event.target.value)} /></label><label className="field"><span>Quantity <small>(optional)</small></span><input name="quantity" maxLength={80} placeholder="e.g. 1 sign or 100 stickers" value={details.quantity} onChange={event => update('quantity', event.target.value)} /></label></div>
      <div className="field-pair"><label className="field"><span>Material / finish <small>(optional)</small></span><input name="material" maxLength={120} placeholder="A colour, pattern, matte…" value={details.material} onChange={event => update('material', event.target.value)} /></label><label className="field"><span>When do you need it? <small>(optional)</small></span><input name="deadline" maxLength={100} placeholder="A date, or just exploring" value={details.deadline} onChange={event => update('deadline', event.target.value)} /></label></div>
      <label className="field"><span>Your name <small>(optional)</small></span><input name="name" autoComplete="name" maxLength={100} placeholder="What should we call you?" value={details.name} onChange={event => update('name', event.target.value)} /></label>
      <details className="quote-preview"><summary>Preview your inquiry</summary><pre>{buildQuoteMessage(details)}</pre></details>
      <button className="button quote-submit" type="submit"><ActionContent kind="fill"><WhatsappLogoIcon size={23} />Continue in WhatsApp<ArrowUpRightIcon size={21} /></ActionContent></button>
      <p className="submission-note">Opens a draft for +92 {business.whatsapp.slice(2)}. Nothing is sent automatically. Attach artwork in the WhatsApp conversation.</p>
      {draftUrl && <p className="draft-status" role="status"><CheckIcon size={20} /><span>Your draft is ready. Review and send it in WhatsApp. <a href={draftUrl} target="_blank" rel="noreferrer">Open the draft again</a></span></p>}
      <a className="email-alternative action-roll" href={emailHref}><ActionContent kind="roll"><EnvelopeSimpleIcon size={18} />Prefer email? Use the same project details<ArrowUpRightIcon size={16} /></ActionContent></a>
    </form>
  </section>;
}
