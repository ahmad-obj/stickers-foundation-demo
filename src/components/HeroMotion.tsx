'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useViewportReveal } from './useViewportReveal';

export function HeroMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  useViewportReveal(root);

  useEffect(() => {
    const hero = root.current;
    if (!hero) return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const headline = hero.querySelector<HTMLElement>('.hero-create');
    if (!headline) return;
    const frame = hero.querySelector<HTMLElement>('.hero-print');
    let bounds = hero.getBoundingClientRect();
    let lineBounds = headline.getBoundingClientRect();
    let raf = 0;
    let geometryDirty = true;
    let point = { x: 0, y: 0 };

    function measure() {
      geometryDirty = false;
      bounds = hero!.getBoundingClientRect();
      lineBounds = headline!.getBoundingClientRect();
    }
    function reset() {
      cancelAnimationFrame(raf);
      raf = 0;
      hero!.removeAttribute('data-pointer-active');
      headline!.style.removeProperty('--ink-left');
      headline!.style.removeProperty('--ink-right');
      frame?.style.removeProperty('--frame-x');
      frame?.style.removeProperty('--frame-y');
    }
    function scroll() { reset(); geometryDirty = true; }
    function move(event: PointerEvent) {
      if (!media.matches || event.pointerType === 'touch') return;
      if (geometryDirty) measure();
      point = { x: event.clientX, y: event.clientY };
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        hero!.setAttribute('data-pointer-active', '');
        const distanceY = Math.abs(point.y - (lineBounds.top + lineBounds.height / 2));
        const strength = Math.max(0, 1 - Math.max(0, distanceY - lineBounds.height * .55) / 80);
        const halfWidth = Math.min(lineBounds.width * .42, 180) * strength;
        const localX = point.x - lineBounds.left;
        const clamp = (value: number) => Math.max(0, Math.min(lineBounds.width, value));
        headline!.style.setProperty('--ink-left', `${clamp(localX - halfWidth)}px`);
        headline!.style.setProperty('--ink-right', `${clamp(lineBounds.width - localX - halfWidth)}px`);
        const x = Math.max(-1, Math.min(1, (point.x - bounds.left) / bounds.width * 2 - 1));
        const y = Math.max(-1, Math.min(1, (point.y - bounds.top) / bounds.height * 2 - 1));
        frame?.style.setProperty('--frame-x', `${-y * 3}deg`);
        frame?.style.setProperty('--frame-y', `${x * 3}deg`);
      });
    }
    hero.addEventListener('pointerenter', measure);
    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerleave', reset);
    hero.addEventListener('pointercancel', reset);
    media.addEventListener('change', reset);
    window.addEventListener('blur', reset);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      reset();
      hero.removeEventListener('pointerenter', measure);
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', reset);
      hero.removeEventListener('pointercancel', reset);
      media.removeEventListener('change', reset);
      window.removeEventListener('blur', reset);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', scroll);
    };
  }, []);

  return <section ref={root} id="home" className="hero section-wrap" aria-labelledby="hero-title">{children}</section>;
}
