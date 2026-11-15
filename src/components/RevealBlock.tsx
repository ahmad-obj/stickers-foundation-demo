'use client';

import { useRef, type ReactNode } from 'react';
import { useViewportReveal } from './useViewportReveal';

export function RevealBlock({ className = '', children }: { className?: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useViewportReveal(root);
  return <div ref={root} className={`reveal-block ${className}`}>{children}</div>;
}
