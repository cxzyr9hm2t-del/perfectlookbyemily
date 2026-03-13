import type { Metadata } from 'next';
import { Inter, Raleway } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets:['latin'], variable:'--font-inter', display:'swap' });
const raleway = Raleway({ subsets:['latin'], variable:'--font-raleway', weight:['300','400','500','600','700','800'], display:'swap' });

export const metadata: Metadata = {
  title: 'The Perfect Look By Emily | Hair Salon Amherstview, Ontario',
  description: 'Goldwell-certified colour artistry, bespoke cuts, balayage, vivid colour, and luxury extensions. Private studio in Amherstview, ON with mobile concierge service across Greater Kingston.',
  keywords: ['hair salon Amherstview','hair salon Kingston Ontario','balayage Kingston','colour correction Amherstview','Goldwell certified stylist','mobile hair stylist Kingston','hair extensions Amherstview'],
  authors: [{ name: 'Emily Caird' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'The Perfect Look By Emily | Amherstview Hair Salon',
    description: 'Goldwell-certified colour mastery, bespoke cuts and luxury extensions in Amherstview, ON.',
    url: 'https://theperfectlookbyemily.ca',
    siteName: 'The Perfect Look By Emily',
    images: [{ url: 'https://theperfectlookbyemily.ca/images/1000011101.jpg', width: 1200, height: 630, alt: 'The Perfect Look By Emily' }],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Perfect Look By Emily | Amherstview Hair Salon',
    description: 'Goldwell-certified colour artistry and luxury hair services in Amherstview, ON.',
    images: ['https://theperfectlookbyemily.ca/images/1000011101.jpg'],
  },
  alternates: { canonical: 'https://theperfectlookbyemily.ca' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${raleway.variable}`}>
      <head>
        <link rel="icon" href="/images/1000011101.jpg" />
        <link rel="apple-touch-icon" href="/images/1000011101.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Amherstview, Ontario, Canada" />
        <meta name="geo.position" content="44.2259;-76.5589" />
        <meta name="ICBM" content="44.2259, -76.5589" />
        <meta name="theme-color" content="#1e1e2e" />
      </head>
      <body style={{ margin:0, padding:0, fontFamily:"var(--font-raleway,'Inter',system-ui,sans-serif)", background:'#1e1e2e' }}>
        {children}
      </body>
    </html>
  );
}
