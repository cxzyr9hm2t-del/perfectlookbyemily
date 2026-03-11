import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '700', '900'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'The Perfect Look By Emily | Hair Salon Amherstview, Ontario',
  description:
    'Precision artistry and Goldwell-certified colour expertise in Amherstview, Ontario. Mobile hair services, retirement home visits, and studio appointments. Call (613) 929-8711.',
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
    description: 'Luxury hair artistry in Amherstview, Ontario.',
    url: 'https://theperfectlookbyemily.ca',
    siteName: 'The Perfect Look By Emily',
    locale: 'en_CA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable}`}
    >
      <body style={{ background: '#1e1e2e', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
