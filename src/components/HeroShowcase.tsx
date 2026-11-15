'use client';

import { useState } from 'react';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { projects } from '@/lib/content';
import { Photo } from './Photo';
import { ActionContent } from './ActionContent';
import { QuoteLink } from './QuoteLink';
import { useSwapSelection } from './useSwapSelection';

const features = [
  { project: projects[3], label: 'Signage', name: 'Show signage', action: 'Make your business stand out' },
  { project: projects[1], label: 'Vehicles', name: 'Show vehicle graphics', action: 'Give your vehicle a new look' },
  { project: projects[0], label: 'Interiors', name: 'Show walls & interiors', action: 'Make a space your own' },
];

export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const { current, select, leaving } = useSwapSelection(0);
  const feature = features[current];
  return <figure className="hero-image hero-interactive">
    <div className="hero-print"><div className="hero-image-inner"><div className={`hero-photo-sheet swap-content ${leaving ? 'is-leaving' : ''}`}>
      <Photo slug={feature.project.slug} width={feature.project.width} height={feature.project.height} alt={feature.project.alt} sizes="(max-width: 767px) 90vw, 450px" priority />
    </div></div></div>
    <figcaption className={`swap-content ${leaving ? 'is-leaving' : ''}`}><span aria-live="polite">{feature.project.label}</span><QuoteLink className="action-roll" service={features[active].project.category}>{feature.action}<ArrowUpRightIcon size={17} /></QuoteLink></figcaption>
    <div className="hero-contact-sheet" role="group" aria-label="Choose a surface to explore">
      {features.map((item, index) => <button key={item.name} aria-label={item.name} aria-pressed={active === index} onClick={() => { setActive(index); select(index); }}>
        <img src={`/images/${item.project.slug}-160.webp`} width="56" height="56" alt="" />
        <span><ActionContent kind="roll">{item.label}</ActionContent></span><ArrowUpRightIcon size={14} aria-hidden="true" />
      </button>)}
    </div>
  </figure>;
}
