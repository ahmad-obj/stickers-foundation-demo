'use client';

import { useState, useRef } from 'react';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { materialFamilies } from '@/lib/content';
import { Photo } from './Photo';
import { ActionContent } from './ActionContent';
import { InkHighlight } from './InkHighlight';
import { QuoteLink } from './QuoteLink';
import { useSwapSelection } from './useSwapSelection';
import { RevealHeading } from './RevealHeading';

export function Materials() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { current, select, leaving } = useSwapSelection(0);
  const material = materialFamilies[current];
  function choose(index: number) { setActive(index); select(index); }
  return <section className="materials-section section-wrap" id="materials" aria-labelledby="materials-title">
    <div className="material-heading"><RevealHeading id="materials-title" lines={["Good ideas start", "with good materials."]} /><p>Colour, pattern, texture. Find a starting point for your next project.</p></div>
    <div className="material-tabs" role="tablist" aria-label="Explore vinyl materials">{materialFamilies.map((family, index) => <button ref={element => { tabRefs.current[index] = element; }} id={`material-tab-${family.id}`} role="tab" type="button" key={family.id} aria-selected={active === index} aria-controls="material-panel" tabIndex={active === index ? 0 : -1} onClick={() => choose(index)} onKeyDown={event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % materialFamilies.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + materialFamilies.length) % materialFamilies.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = materialFamilies.length - 1;
      else return;
      event.preventDefault(); choose(next); tabRefs.current[next]?.focus();
    }}><span className={`material-swatch swatch-${family.id}`} aria-hidden="true" /><ActionContent kind="roll">{family.name}</ActionContent></button>)}</div>
    <div className={`material-panel swap-content ${leaving ? 'is-leaving' : ''}`} id="material-panel" role="tabpanel" aria-labelledby={`material-tab-${material.id}`} tabIndex={0}>
      <div className="material-photo"><Photo key={material.id} slug={material.image} alt={material.alt} width={material.id === 'pattern' ? 640 : material.id === 'solid' ? 1200 : 1600} height={material.id === 'pattern' ? 640 : material.id === 'solid' ? 795 : 1200} sizes="(max-width: 767px) 90vw, 55vw" /></div>
      <div className="material-copy"><h3><InkHighlight textOnly>{material.title}</InkHighlight></h3><p>{material.text}</p><p className="material-detail">{material.detail}</p><QuoteLink service="stickers" material={materialFamilies[active].name} className="text-link">Ask about this material<ArrowUpRightIcon size={20} /></QuoteLink><small>Photographed samples. Colours and stock may vary; confirm the exact material with the shop.</small></div>
    </div>
  </section>;
}
