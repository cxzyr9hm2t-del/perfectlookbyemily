import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

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
  ],
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
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#1e1e2e" />
        <link rel="canonical" href="https://theperfectlookbyemily.ca/" />
      </head>
      <body style={{ background: '#1e1e2e', margin: 0 }}>{children}</body>
    </html>
  );
}
