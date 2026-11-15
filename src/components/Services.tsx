'use client';

import { useState } from 'react';
import { ArrowUpRightIcon, PlusIcon, MinusIcon } from '@phosphor-icons/react';
import { services } from '@/lib/content';
import { Photo } from './Photo';
import { InkHighlight } from './InkHighlight';
import { QuoteLink } from './QuoteLink';
import { RevealHeading } from './RevealHeading';
import { useSwapSelection } from './useSwapSelection';

type Service = typeof services[number];

function ServiceVisual({ service }: { service: Service }) {
  return <>
    {service.image ? <Photo slug={service.image} alt={service.id === 'vehicle' ? 'Pop-art vinyl wrap on a scooter, photographed inside the shop' : service.id === 'signage' ? 'Cheezy Burger and Shake cutout commercial sign' : service.id === 'interiors' ? 'Colourful world map interior wall graphic' : 'Solid colour vinyl sheets available to explore'} sizes="(max-width: 767px) 90vw, 38vw" /> : <div className="service-type-panel"><span><InkHighlight textOnly>{service.id === 'glass' ? 'GLASS.' : 'WOOD. METAL. PAPER.'}</InkHighlight></span><span><InkHighlight textOnly>YOUR</InkHighlight><br /><InkHighlight textOnly>GRAPHICS.</InkHighlight></span><p>Let’s talk about your surface.</p></div>}
    <span className="service-image-caption">{service.image ? 'From the business photo collection' : 'Custom printing inquiries'}</span>
  </>;
}

export function Services() {
  const [active, setActive] = useState<number | null>(0);
  const { current, select, leaving } = useSwapSelection(0);
  return <section id="services" className="services-section section-wrap" aria-labelledby="services-title">
    <RevealHeading id="services-title" lines={["Your idea.", "Made for your surface."]} />
    <div className="services-layout">
      <div className={`service-visual swap-content ${leaving ? 'is-leaving' : ''}`}><ServiceVisual service={services[current]} /></div>
      <div className="service-list">{services.map((item, index) => <div className={`service-item ${active === index ? 'is-active' : ''}`} key={item.id}>
        <h3><button aria-expanded={active === index} aria-controls={`service-panel-${item.id}`} onClick={event => {
          const opening = active !== index;
          setActive(opening ? index : null); select(index);
          if (opening && window.matchMedia('(max-width: 767px) and (prefers-reduced-motion: reduce)').matches) {
            const item = event.currentTarget.closest('.service-item');
            requestAnimationFrame(() => item?.scrollIntoView({ block: 'start', behavior: 'instant' }));
          }
        }}><InkHighlight textOnly>{item.title}</InkHighlight>{active === index ? <MinusIcon size={22} /> : <PlusIcon size={22} />}</button></h3>
        <div id={`service-panel-${item.id}`} className="service-panel" onTransitionEnd={event => {
          if (event.target === event.currentTarget && event.propertyName === 'grid-template-rows' && active === index && window.matchMedia('(max-width: 767px)').matches) {
            event.currentTarget.closest('.service-item')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
        }} inert={active !== index} aria-hidden={active !== index}><div className="service-panel-inner"><div className="service-panel-content">
          <div className="service-mobile-visual"><ServiceVisual service={item} /></div>
          <p>{item.text}</p><div className="service-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div><p className="service-detail">{item.detail}</p><QuoteLink service={item.id} className="text-link">Discuss {item.short.toLowerCase()}<ArrowUpRightIcon size={19} /></QuoteLink>
        </div></div></div>
      </div>)}</div>
    </div>
  </section>;
}
