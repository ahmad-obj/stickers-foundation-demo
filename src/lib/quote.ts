export type QuoteDetails = {
  service: string;
  description: string;
  dimensions: string;
  quantity: string;
  material: string;
  name: string;
  deadline: string;
};

export function validateQuote(details: QuoteDetails): string | null {
  if (!details.service.trim()) return 'Choose a service so we can direct your inquiry.';
  if (!details.description.trim()) return 'Tell us a little about what you would like to create.';
  return null;
}

export function buildQuoteMessage(details: QuoteDetails): string {
  const value = (text: string, fallback: string) => text.trim() || fallback;
  return [
    'Hello Stickers Corporation! I would like a quotation.',
    '',
    `Service: ${details.service.trim()}`,
    `Project: ${details.description.trim()}`,
    `Dimensions: ${value(details.dimensions, 'To discuss')}`,
    `Quantity: ${value(details.quantity, 'To discuss')}`,
    `Material/finish: ${value(details.material, 'Please advise')}`,
    `Preferred timing: ${value(details.deadline, 'To discuss')}`,
    ...(details.name.trim() ? [`Name: ${details.name.trim()}`] : []),
    '',
    'Please advise on suitable materials, availability and pricing.',
  ].join('\n');
}

export function buildWhatsAppUrl(number: string, details: QuoteDetails): string {
  const digits = number.replace(/\D/g, '');
  if (!/^\d{10,15}$/.test(digits)) throw new Error('A valid international WhatsApp number is required.');
  return `https://wa.me/${digits}?text=${encodeURIComponent(buildQuoteMessage(details))}`;
}
