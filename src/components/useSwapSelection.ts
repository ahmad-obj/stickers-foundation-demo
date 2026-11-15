'use client';

import { useEffect, useRef, useState } from 'react';

// Keep copy and image on the same selection, including during fast reversals.
export function useSwapSelection<T>(initial: T) {
  const [current, setCurrent] = useState(initial);
  const [leaving, setLeaving] = useState(false);
  const currentRef = useRef(initial);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function select(next: T) {
    if (timer.current) clearTimeout(timer.current);
    if (next === currentRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      currentRef.current = next;
      setCurrent(next);
      setLeaving(false);
      return;
    }
    setLeaving(true);
    timer.current = setTimeout(() => {
      currentRef.current = next;
      setCurrent(next);
      setLeaving(false);
    }, 120);
  }

  return { current, select, leaving };
}
