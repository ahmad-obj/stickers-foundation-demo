'use client';

import { ActionContent } from './ActionContent';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { ArrowUpRightIcon, ListIcon, XIcon, MapPinIcon } from '@phosphor-icons/react';
import { business } from '@/lib/content';

const links = [['Our work', '#work'], ['Services', '#services'], ['About', '#about'], ['Contact', '#contact']];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const toggle = useRef<HTMLButtonElement>(null);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (navigationTimer.current) clearTimeout(navigationTimer.current); }, []);

  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setOpen(false);
    if (!open) return;
    event.preventDefault();
    const href = event.currentTarget.hash;
    toggle.current?.focus({ preventScroll: true });
    if (navigationTimer.current) clearTimeout(navigationTimer.current);
    // Resolve the native anchor against the settled in-flow menu geometry.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    navigationTimer.current = setTimeout(() => { window.location.hash = href; navigationTimer.current = null; }, reduce ? 0 : 180);
  }
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  useEffect(() => {
    const sections = ['home', 'work', 'services', 'about', 'quote', 'contact'].map(id => document.getElementById(id)).filter((element): element is HTMLElement => !!element);
    const observer = new IntersectionObserver(() => {
      const section = sections.findLast(element => element.getBoundingClientRect().top <= innerHeight * .45);
      setActive(section ? `#${section.id}` : '');
    }, { rootMargin: '-84px 0px -45% 0px', threshold: [0, .1, .5, 1] });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    media.addEventListener('change', closeOnDesktop);
    return () => media.removeEventListener('change', closeOnDesktop);
  }, []);
  return <header className="site-header">
    <div className="header-inner">
      <a className="brand" href="#home" aria-label="Stickers Corporation home" onClick={navigate}>
        <img src="/images/logo-240.webp" srcSet="/images/logo-240.webp 240w, /images/logo-480.webp 480w" sizes="140px" width="140" height="76" alt="Stickers Corporation" />
      </a>
      <a className="header-location" href={business.maps} target="_blank" rel="noreferrer"><MapPinIcon size={16} /> I-10 Markaz, Islamabad</a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([name, href]) => <a key={href} href={href} aria-current={active === href ? 'location' : undefined}><ActionContent kind="roll">{name}</ActionContent></a>)}
      </nav>
      <a className="nav-quote" href="#quote" onClick={navigate} aria-current={active === '#quote' ? 'location' : undefined}><ActionContent kind="roll">Request a quote <ArrowUpRightIcon size={19} /></ActionContent></a>
      <button ref={toggle} className="menu-toggle icon-button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => { if (navigationTimer.current) clearTimeout(navigationTimer.current); setOpen(!open); }}>{open ? <XIcon size={24} /> : <ListIcon size={24} />}</button>
    </div>
    <nav id="mobile-nav" className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label="Mobile navigation" inert={!open}>
      <div className="mobile-nav-inner"><div className="mobile-nav-links">
        {[['Our work', '#work'], ['Services', '#services'], ['About us', '#about'], ['Contact & directions', '#contact'], ['Request a quote', '#quote']].map(([name, href]) => <a key={href} href={href} aria-current={active === href ? 'location' : undefined} onClick={navigate}><ActionContent kind="roll">{name}<ArrowUpRightIcon size={22} /></ActionContent></a>)}
        <a className="mobile-phone" href="tel:+923455130004">{business.phone}</a>
      </div></div>
    </nav>
  </header>;
}
