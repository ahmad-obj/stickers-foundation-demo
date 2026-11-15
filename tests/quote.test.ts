import test from 'node:test';
import assert from 'node:assert/strict';
import { buildQuoteMessage, buildWhatsAppUrl, validateQuote, type QuoteDetails } from '../src/lib/quote';

const quote: QuoteDetails = { service: 'Commercial signage', description: 'Café sign & logo + Urdu: خوش آمدید', dimensions: '6 × 3 ft', quantity: '2', material: 'Not sure yet', name: 'Ali', deadline: 'Next month' };

test('quote retains project information and Unicode without a false price or send claim', () => {
  const message = buildQuoteMessage(quote);
  for (const value of Object.values(quote)) assert.ok(message.includes(value));
  assert.match(message, /quotation/i);
  assert.doesNotMatch(message, /sent|Rs\.|PKR/);
});
test('WhatsApp URL round-trips punctuation, line breaks and Unicode', () => {
  const url = new URL(buildWhatsAppUrl('92 345 5130004', quote));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/923455130004');
  assert.equal(url.searchParams.get('text'), buildQuoteMessage(quote));
});
test('blank required descriptions are rejected and optional dimensions can remain unknown', () => {
  assert.ok(validateQuote({ ...quote, description: '   ' }));
  assert.equal(validateQuote({ ...quote, dimensions: '', quantity: '', name: '' }), null);
});
test('missing optional values produce an honest uncertainty rather than empty labels', () => {
  const message = buildQuoteMessage({ service: 'Vehicle wrapping & graphics', description: 'Partial wrap for my car', dimensions: '', quantity: '', material: '', name: '', deadline: '' });
  assert.match(message, /Dimensions: To discuss/);
  assert.match(message, /Quantity: To discuss/);
  assert.match(message, /Material\/finish: Please advise/);
});
test('invalid destination cannot generate a broken WhatsApp link', () => {
  assert.throws(() => buildWhatsAppUrl('', quote));
  assert.throws(() => buildWhatsAppUrl('hello', quote));
});
