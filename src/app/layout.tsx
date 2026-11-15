import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const display = localFont({ src: '../../public/fonts/barlow-condensed-800.woff2', variable: '--font-display', display: 'swap', weight: '800' });
const body = localFont({ src: '../../public/fonts/manrope-latin-variable.woff2', variable: '--font-body', display: 'swap', weight: '400 700' });
const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: 'Stickers Corporation | Custom Printing, Wraps & Signage in Islamabad',
  description: 'You only think. We create. Explore vehicle wrapping, custom stickers, signage, wall graphics and vinyl materials at Stickers Corporation, I-10 Markaz, Islamabad.',
  robots: { index: process.env.NEXT_PUBLIC_INDEXABLE === 'true', follow: process.env.NEXT_PUBLIC_INDEXABLE === 'true' },
  openGraph: { title: 'You only think. We create. | Stickers Corporation', description: 'Custom printing, vehicle graphics, wall art and signage. Made physical in Islamabad.', type: 'website', locale: 'en_PK', images: [{ url: '/images/og-stickers.jpg', width: 1200, height: 630, alt: 'Stickers Corporation: You only think. We create. Islamabad.' }] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.svg' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f3f2ec' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
