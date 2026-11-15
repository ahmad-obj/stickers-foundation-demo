import { ActionContent } from '@/components/ActionContent';
import { ArrowUpRightIcon, ArrowDownRightIcon, MapPinIcon, PhoneIcon, EnvelopeSimpleIcon, InstagramLogoIcon, FacebookLogoIcon } from '@phosphor-icons/react/dist/ssr';
import { Header } from '@/components/Header';
import { Portfolio } from '@/components/Portfolio';
import { Services } from '@/components/Services';
import { Materials } from '@/components/Materials';
import { QuoteForm } from '@/components/QuoteForm';
import { QuoteLink } from '@/components/QuoteLink';
import { HeroShowcase } from '@/components/HeroShowcase';
import { HeroMotion } from '@/components/HeroMotion';
import { RevealHeading } from '@/components/RevealHeading';
import { InkHighlight } from '@/components/InkHighlight';
import { RevealBlock } from '@/components/RevealBlock';
import { ButtonEffects } from '@/components/ButtonEffects';
import { business } from '@/lib/content';

function HeroLetters({ inverse = false }: { inverse?: boolean }) {
  return Array.from('WE CREATE.').map((letter, index) => <span className="hero-letter-enter" key={index} style={{ animationDelay: `${100 + index * 28}ms` }}><span className={inverse ? 'hero-ink-letter' : 'hero-letter'}>{letter === ' ' ? '\u00a0' : letter}</span></span>);
}

export default function Home() {
  const schema = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: business.name, description: 'Custom printing, vehicle wrapping, stickers, vinyl, wall graphics and commercial signage in Islamabad.', telephone: [business.phone, business.secondPhone, '+92 51 4441242'], email: business.email, address: { '@type': 'PostalAddress', streetAddress: 'Shop #1, Umair Plaza, Opposite PSO Pump Car Wash, I-10 Markaz', addressLocality: 'Islamabad', addressCountry: 'PK' }, sameAs: [business.instagram, business.facebook, 'https://sites.google.com/view/stickerzcorp/home'] };
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <ButtonEffects />
    <main id="main">
      <HeroMotion>
        <div className="hero-copy"><div className="hero-heading"><h1 id="hero-title"><span className="sr-only">YOU ONLY THINK. WE CREATE.</span><span className="hero-think" aria-hidden="true"><InkHighlight textOnly>YOU ONLY THINK.</InkHighlight></span><span className="hero-create" aria-hidden="true"><HeroLetters /><span className="hero-ink-layer"><HeroLetters inverse /></span></span></h1></div><p>Custom prints, bold signs, walls with personality.<br />Your ideas, made physical in Islamabad.</p><div className="hero-actions"><a href="#work" className="button"><ActionContent kind="fill">Explore our work<ArrowDownRightIcon size={23} /></ActionContent></a><a href="#quote" className="text-link"><ActionContent kind="roll">Request a quote<ArrowUpRightIcon size={20} /></ActionContent></a></div></div>
        <HeroShowcase />
      </HeroMotion>
      <div className="service-strip" aria-label="Explore our services"><QuoteLink className="service-action" service="vehicle">VEHICLE GRAPHICS<ArrowUpRightIcon size={21} /></QuoteLink><QuoteLink className="service-action" service="signage">SIGNAGE<ArrowUpRightIcon size={21} /></QuoteLink><QuoteLink className="service-action" service="interiors">WALL ART<ArrowUpRightIcon size={21} /></QuoteLink><QuoteLink className="service-action" service="stickers">CUSTOM PRINTING<ArrowUpRightIcon size={21} /></QuoteLink></div>
      <Portfolio />
      <Services />
      <Materials />
      <section className="about-section section-wrap" id="about" aria-labelledby="about-title"><div className="about-brand"><img src="/images/logo-480.webp" width="320" height="174" loading="lazy" alt="Stickers Corporation" /><span>I-10 Markaz, Islamabad</span></div><div><RevealHeading id="about-title" lines={["For the things", "you want to make yours."]} /><p>We’re Stickers Corporation, a printing and graphics business in Islamabad. From a custom sticker to a wall full of ideas, we work with prints, vinyl, signage and surfaces.</p><p>Bring a finished design or just a starting point. Let’s talk about what you want to create.</p><a className="text-link" href={business.maps} target="_blank" rel="noreferrer"><ActionContent kind="roll">Come by the shop<ArrowUpRightIcon size={20} /></ActionContent></a></div></section>
      <QuoteForm />
    </main>
    <footer className="contact-section section-wrap" id="contact" aria-labelledby="contact-title">
      <div className="closing-title"><RevealHeading id="contact-title" lines={["BIG IDEAS.", "LET’S PRINT THEM."]} ink /><a href="#quote" className="closing-arrow" aria-label="Request a quote"><ArrowUpRightIcon weight="light" /></a></div>
      <div className="contact-grid"><RevealBlock className="footer-column"><h3><MapPinIcon size={18} /><InkHighlight textOnly>Find the shop</InkHighlight></h3><address>Shop #1, Umair Plaza<br />Opposite PSO Pump Car Wash<br />I-10 Markaz, Islamabad, Pakistan</address><a className="text-link" href={business.maps} target="_blank" rel="noreferrer"><ActionContent kind="roll">Get directions<ArrowUpRightIcon size={18} /></ActionContent></a></RevealBlock><RevealBlock className="footer-column"><h3><PhoneIcon size={18} /><InkHighlight textOnly>Give us a call</InkHighlight></h3><a href="tel:+923455130004"><ActionContent kind="roll">{business.phone}</ActionContent></a><a href="tel:+923065130004"><ActionContent kind="roll">{business.secondPhone}</ActionContent></a><a href="tel:+92514441242"><ActionContent kind="roll">{business.landline}</ActionContent></a></RevealBlock><RevealBlock className="footer-column"><h3><EnvelopeSimpleIcon size={18} /><InkHighlight textOnly>Start a conversation</InkHighlight></h3><a href={`mailto:${business.email}`}><ActionContent kind="roll">{business.email}</ActionContent></a><a href="#quote"><ActionContent kind="roll">Build a WhatsApp inquiry<ArrowUpRightIcon size={16} /></ActionContent></a><div className="social-links"><a href={business.instagram} target="_blank" rel="noreferrer"><ActionContent kind="roll"><InstagramLogoIcon size={20} />Instagram</ActionContent></a><a href={business.facebook} target="_blank" rel="noreferrer"><ActionContent kind="roll"><FacebookLogoIcon size={20} />Facebook</ActionContent></a></div></RevealBlock></div>
      <RevealBlock className="footer-bottom"><span>© {new Date().getFullYear()} Stickers Corporation</span><span>Client acquisition concept by <strong>Weberaise</strong></span><a href="#home"><ActionContent kind="roll">Back to top<ArrowUpRightIcon size={15} /></ActionContent></a></RevealBlock>
    </footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
  </>;
}
