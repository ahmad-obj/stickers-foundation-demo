'use client';

import type { ReactNode } from 'react';
import { ActionContent } from './ActionContent';
import { quoteHref } from '@/lib/content';

export function QuoteLink({ service, material, children, className, onNavigate }: { service: string; material?: string; children: ReactNode; className?: string; onNavigate?: () => void }) {
  return <a href={quoteHref(service, material)} className={className} onClick={event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate?.();
    window.history.replaceState(null, '', quoteHref(service, material));
    window.dispatchEvent(new CustomEvent('quote:select', { detail: { service, material } }));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Wait for the selected service to commit, then hand keyboard focus to the form.
    // A viewer inquiry first closes its dialog, whose native focus restoration is
    // deliberately followed by this destination focus.
    window.requestAnimationFrame(() => {
      const field = document.getElementById('quote-service');
      field?.focus({ preventScroll: true });
      (field?.closest('form') ?? document.getElementById('quote'))?.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth' });
    });
  }}>{className?.split(' ').some(name => name === 'button' || name === 'service-action') ? <ActionContent kind="fill">{children}</ActionContent> : className?.split(' ').some(name => name === 'text-link' || name === 'action-roll') ? <ActionContent kind="roll">{children}</ActionContent> : children}</a>;
}
