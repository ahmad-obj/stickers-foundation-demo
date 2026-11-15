'use client';

import { useEffect } from 'react';

export function ButtonEffects() {
  useEffect(() => {
    const media = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const moved = new Set<HTMLElement>();
    let active: HTMLElement | null = null;
    let bounds: DOMRect | null = null;
    let raf = 0;
    let x = 0;
    let y = 0;
    const target = (event: PointerEvent) => event.target instanceof Element ? event.target.closest<HTMLElement>('.button, .service-action, .project-inquire, .closing-arrow') : null;
    function reset(element?: HTMLElement | null) {
      if (element) { element.style.removeProperty('--magnet-x'); element.style.removeProperty('--magnet-y'); moved.delete(element); }
      else { moved.forEach(el => { el.style.removeProperty('--magnet-x'); el.style.removeProperty('--magnet-y'); }); moved.clear(); }
      cancelAnimationFrame(raf); raf = 0; active = null; bounds = null;
    }
    function enter(event: PointerEvent) {
      const element = target(event);
      if (!element || !media.matches || event.pointerType === 'touch' || (event.relatedTarget instanceof Node && element.contains(event.relatedTarget))) return;
      const rect = element.getBoundingClientRect();
      if ((element.classList.contains('button') || element.classList.contains('service-action'))) {
        const distances = [Math.abs(event.clientX - rect.left), Math.abs(event.clientX - rect.right), Math.abs(event.clientY - rect.top), Math.abs(event.clientY - rect.bottom)];
        element.dataset.fillFrom = ['left', 'right', 'top', 'bottom'][distances.indexOf(Math.min(...distances))];
      } else { active = element; bounds = rect; }
    }
    function move(event: PointerEvent) {
      const element = target(event);
      if (!element || (element.classList.contains('button') || element.classList.contains('service-action')) || !media.matches || event.pointerType === 'touch') return;
      if (active !== element || !bounds) { active = element; bounds = element.getBoundingClientRect(); }
      x = event.clientX; y = event.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!active || !bounds) return;
        const clamp = (value: number) => Math.max(-1, Math.min(1, value));
        active.style.setProperty('--magnet-x', `${clamp((x - bounds.left) / bounds.width * 2 - 1) * 8}px`);
        active.style.setProperty('--magnet-y', `${clamp((y - bounds.top) / bounds.height * 2 - 1) * 8}px`);
        moved.add(active);
      });
    }
    function leave(event: PointerEvent) {
      const element = target(event);
      if (element && !(event.relatedTarget instanceof Node && element.contains(event.relatedTarget))) reset(element);
    }
    const clear = () => reset();
    document.addEventListener('pointerover', enter);
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerout', leave);
    document.addEventListener('pointercancel', clear);
    window.addEventListener('blur', clear);
    window.addEventListener('scroll', clear, { passive: true });
    media.addEventListener('change', clear);
    return () => {
      clear();
      document.removeEventListener('pointerover', enter);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', leave);
      document.removeEventListener('pointercancel', clear);
      window.removeEventListener('blur', clear);
      window.removeEventListener('scroll', clear);
      media.removeEventListener('change', clear);
    };
  }, []);
  return null;
}
