'use client';

import { useEffect, type RefObject } from 'react';

export function useViewportReveal<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) { element.dataset.revealed = 'true'; return; }
    element.dataset.motionReady = 'true';
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) show();
    }, { threshold: .12, rootMargin: '0px 0px -32px 0px' });
    function show() { element!.dataset.revealed = 'true'; observer.disconnect(); }
    observer.observe(element);
    const preference = () => { if (media.matches) show(); };
    media.addEventListener('change', preference);
    return () => { observer.disconnect(); media.removeEventListener('change', preference); };
  }, [ref]);
}
