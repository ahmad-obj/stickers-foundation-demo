'use client';

import { useRef } from 'react';
import { useViewportReveal } from './useViewportReveal';
import { InkHighlight } from './InkHighlight';

export function RevealHeading({ id, lines, highlightLast = false, ink = false }: { id: string; lines: string[]; highlightLast?: boolean; ink?: boolean }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useViewportReveal(heading);
  return <h2 ref={heading} id={id} className="reveal-heading"><span className="sr-only">{lines.join(' ')}</span>{lines.map((line, index) => <span className="heading-mask" aria-hidden="true" key={line}><span style={{ animationDelay: `${Math.min(index * 100, 250)}ms` }}>{ink || (highlightLast && index === lines.length - 1) ? <InkHighlight>{line}</InkHighlight> : <InkHighlight textOnly>{line}</InkHighlight>}</span></span>)}</h2>;
}
