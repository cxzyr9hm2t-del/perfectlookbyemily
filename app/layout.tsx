import type { Metadata } from 'next';
import { Inter, Raleway } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway', display: 'swap', weight: ['300','400','500','600','700'] });

export const metadata: Metadata = {
  title: 'The Perfect Look By Emily | Hair Salon Amherstview, Ontario',
  description: 'Precision artistry and Goldwell-certified colour expertise in Amherstview, Ontario. Mobile hair services, retirement home visits, and studio appointments. Call (613) 929-8711.',
  keywords: [
    'hair salon Amherstview',
    'hair stylist Amherstview Ontario',
    'mobile hair stylist',
    'Goldwell colour',
    'balayage Kingston Ontario',
    'retirement home hair visits',
    'Emily Caird hair',
    'hair colour Amherstview',
    'private hair studio Ontario',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'The Perfect Look By Emily',
    description: 'Luxury hair artistry in Amherstview, Ontario. Goldwell-certified colour, mobile concierge, and private studio experience.',
    url: 'https://theperfectlookbyemily.ca',
    siteName: 'The Perfect Look By Emily',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: 'https://theperfectlookbyemily.ca/images/1000011101.jpg',
        width: 1200,
        height: 900,
        alt: 'The Perfect Look By Emily - Hair Salon Amherstview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Perfect Look By Emily',
    description: 'Luxury hair artistry in Amherstview, Ontario.',
    images: ['https://theperfectlookbyemily.ca/images/1000011101.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${raleway.variable}`}>
      <head>
        <meta name="theme-color" content="#1e1e2e" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://theperfectlookbyemily.ca/" />
        <link rel="icon" href="/images/1000011101.jpg" type="image/jpeg" sizes="any" />
        <link rel="apple-touch-icon" href="/images/1000011101.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ background: '#1e1e2e', margin: 0 }}>{children}</body>
    </html>
  );
}
