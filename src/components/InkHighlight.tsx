'use client';

import { useEffect, useRef } from 'react';

export function InkHighlight({ children, textOnly = false }: { children: string; textOnly?: boolean }) {
  const root = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let bounds = element.getBoundingClientRect();
    let raf = 0;
    let dirty = true;
    let x = 0;
    function reset() {
      cancelAnimationFrame(raf); raf = 0;
      element!.removeAttribute('data-ink-active');
      element!.style.removeProperty('--ink-left'); element!.style.removeProperty('--ink-right');
    }
    const measure = () => { bounds = element.getBoundingClientRect(); dirty = false; };
    const invalidate = () => { reset(); dirty = true; };
    function move(event: PointerEvent) {
      if (!media.matches || event.pointerType === 'touch') return;
      if (dirty) measure();
      x = event.clientX;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const half = Math.min(bounds.width * .42, 180);
        const clamp = (value: number) => Math.max(0, Math.min(bounds.width, value));
        element!.dataset.inkActive = 'true';
        element!.style.setProperty('--ink-left', `${clamp(x - bounds.left - half)}px`);
        element!.style.setProperty('--ink-right', `${clamp(bounds.right - x - half)}px`);
      });
    }
    element.addEventListener('pointerenter', measure);
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', reset);
    element.addEventListener('pointercancel', reset);
    media.addEventListener('change', reset);
    window.addEventListener('scroll', invalidate, { passive: true });
    window.addEventListener('blur', reset);
    window.addEventListener('resize', invalidate);
    return () => {
      reset();
      element.removeEventListener('pointerenter', measure); element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', reset); element.removeEventListener('pointercancel', reset);
      media.removeEventListener('change', reset); window.removeEventListener('scroll', invalidate); window.removeEventListener('blur', reset); window.removeEventListener('resize', invalidate);
    };
  }, [children]);
  return <span ref={root} className={textOnly ? 'ink-text' : 'ink-highlight'}>{children}<span className={textOnly ? 'ink-text-copy' : 'ink-highlight-copy'} aria-hidden="true" data-text={textOnly ? children : undefined}>{textOnly ? null : children}</span></span>;
}
