'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, PlusIcon, XIcon } from '@phosphor-icons/react';
import { projects, type Project } from '@/lib/content';
import sources from '@/lib/image-sources.json';
import { Photo } from './Photo';
import { ActionContent } from './ActionContent';
import { InkHighlight } from './InkHighlight';
import { QuoteLink } from './QuoteLink';
import { RevealHeading } from './RevealHeading';

const categories = [{ id: 'all', label: 'All work' }, { id: 'vehicle', label: 'Vehicle graphics' }, { id: 'signage', label: 'Signage' }, { id: 'interiors', label: 'Walls & interiors' }];

export function Portfolio() {
  const [filter, setFilter] = useState('all');
  const requestedFilter = useRef('all');
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipe = useRef<{ id: number; x: number; y: number } | null>(null);
  const transition = useRef<ViewTransition | null>(null);
  const filtered = projects.filter(project => filter === 'all' || project.category === filter);
  const visible = filter === 'all' && !expanded ? filtered.slice(0, 4) : filtered;

  useEffect(() => () => {
    transition.current?.skipTransition();
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  function closeViewer(immediate = false) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (immediate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dialog.current?.close();
      setClosing(false);
      return;
    }
    setClosing(true);
    closeTimer.current = setTimeout(() => { dialog.current?.close(); setClosing(false); }, 180);
  }

  function animateGallery(update: () => void) {
    transition.current?.skipTransition();
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { update(); return; }
    transition.current = document.startViewTransition(() => flushSync(update));
    // Skipping a transition is normal when a visitor changes categories quickly.
    void transition.current.ready.catch(() => {});
    void transition.current.finished.catch(() => {});
  }

  useEffect(() => {
    if (!selected) return;
    if (!dialog.current?.open) dialog.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selected]);

  function changePhoto(direction: number) {
    if (!selected || closing || visible.length < 2) return;
    const index = visible.findIndex(item => item.slug === selected.slug);
    setSelected(visible[(index + direction + visible.length) % visible.length]);
  }

  return <section id="work" className="work-section section-wrap" aria-labelledby="work-title">
    <div className="section-title-row"><RevealHeading id="work-title" lines={["See what’s possible."]} /><span className="small-label">Real surfaces. Real possibilities.</span></div>
    <div className="work-toolbar"><div className="filters" role="group" aria-label="Filter work by service">{categories.map(category => <button key={category.id} aria-pressed={filter === category.id} onClick={() => { if (requestedFilter.current !== category.id) { requestedFilter.current = category.id; animateGallery(() => { setFilter(category.id); setExpanded(false); }); } }}><ActionContent kind="roll">{category.label}</ActionContent></button>)}</div><span className="result-count" role="status">{visible.length} {visible.length === 1 ? 'photograph' : 'photographs'}</span></div>
    <div className={`project-grid ${filter !== 'all' ? 'is-filtered' : ''}`}>
      {visible.map(project => <article className={`project-card project-${project.category}`} key={project.slug} style={{ viewTransitionName: `work-${project.slug}` }}>
        <button className="project-photo" onClick={() => setSelected(project)} aria-label={`Enlarge ${project.title}`}>
          <Photo slug={project.slug} alt={project.alt} width={project.width} height={project.height} sizes="(max-width: 767px) 92vw, 46vw" />
          <span className="photo-open" aria-hidden="true"><PlusIcon size={24} /></span>
        </button>
        <div className="project-caption"><div><span className="small-label">{project.label}</span><h3><button onClick={() => setSelected(project)}><InkHighlight textOnly>{project.title}</InkHighlight></button></h3></div><QuoteLink service={project.category} className="project-inquire" ><ArrowUpRightIcon size={26} /><span className="sr-only">Inquire about {project.label.toLowerCase()}</span></QuoteLink></div>
      </article>)}
    </div>
    <div className="gallery-bottom">{filter === 'all' && <button className="text-button" onClick={() => animateGallery(() => setExpanded(!expanded))}><ActionContent kind="roll">{expanded ? 'Show selected photographs' : 'Explore the full gallery'}<ArrowDownIcon size={20} className={expanded ? 'rotated' : ''} /></ActionContent></button>}<p>Photographs from the Stickers Corporation Google Maps collection. <button className="inline-link" onClick={() => setSelected(visible[0])}>View photos & sources</button></p></div>
    <dialog ref={dialog} className={`photo-dialog ${closing ? 'is-closing' : ''}`} aria-labelledby="photo-title" onCancel={event => { event.preventDefault(); closeViewer(); }} onClose={() => { setSelected(null); setClosing(false); swipe.current = null; }} onClick={event => { if (event.target === event.currentTarget) closeViewer(); }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); changePhoto(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); changePhoto(-1); } }}>
      {selected && <div className="photo-dialog-inner">
        <div className="dialog-toolbar"><span>{selected.label}</span><div><button className="icon-button" aria-label="Previous photo" disabled={visible.length < 2 || closing} onClick={() => changePhoto(-1)}><ArrowLeftIcon size={22} /></button><button className="icon-button" aria-label="Next photo" disabled={visible.length < 2 || closing} onClick={() => changePhoto(1)}><ArrowRightIcon size={22} /></button><button autoFocus className="icon-button" aria-label="Close photo viewer" onClick={() => closeViewer()}><XIcon size={24} /></button></div></div>
        <div className="viewer-photo" onPointerDown={event => {
          if (event.pointerType !== 'touch' || !event.isPrimary || closing) return;
          swipe.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
        }} onPointerUp={event => {
          const start = swipe.current;
          swipe.current = null;
          if (!start || start.id !== event.pointerId) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.5) changePhoto(dx < 0 ? 1 : -1);
        }} onPointerCancel={() => { swipe.current = null; }}>
          <Photo slug={selected.slug} width={selected.width} height={selected.height} alt={selected.alt} sizes="(max-width: 767px) 95vw, 80vw" priority />
        </div>
        <div className="dialog-caption"><div><h3 id="photo-title"><InkHighlight textOnly>{selected.title}</InkHighlight></h3><p>{selected.note}</p><a className="inline-link" href={sources[selected.slug as keyof typeof sources].url} target="_blank" rel="noreferrer">Source: Stickers Corporation on Google Maps <ArrowUpRightIcon size={14} /></a></div><QuoteLink className="button" service={selected.category} onNavigate={() => closeViewer(true)}>Ask about this service<ArrowUpRightIcon size={20} /></QuoteLink></div>
      </div>}
    </dialog>
  </section>;
}
