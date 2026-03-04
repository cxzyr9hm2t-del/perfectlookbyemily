import type { Metadata } from 'next';
import { Playfair_Display, Raleway } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const raleway = Raleway({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'The Perfect Look By Emily | Master Colourist | Amherstview & Kingston, ON',
    description: 'Master Colourology & Mixology using Goldwell products. Premium mobile salon services in Amherstview, Kingston & Odessa, Ontario. Book your appointment today.',
      keywords: 'hair salon, hair colourist, Goldwell, balayage, colour correction, mobile hair salon, Amherstview, Kingston, Ontario',
        openGraph: {
            title: 'The Perfect Look By Emily',
                description: 'Elite mobile styling & colourology services in Kingston & Amherstview, ON.',
                    url: 'https://perfectlookbyemily.ca',
                        siteName: 'The Perfect Look By Emily',
                            type: 'website',
                              },
                              };

                              const jsonLd = {
                                '@context': 'https://schema.org',
                                  '@type': 'HairSalon',
                                    name: 'The Perfect Look By Emily',
                                      image: 'https://perfectlookbyemily.ca/og-image.jpg',
                                        telephone: '(613) 583-9977',
                                          address: {
                                              '@type': 'PostalAddress',
                                                  addressLocality: 'Odessa',
                                                      addressRegion: 'ON',
                                                          addressCountry: 'CA',
                                                            },
                                                              geo: {
                                                                  '@type': 'GeoCoordinates',
                                                                      latitude: 44.2833,
                                                                          longitude: -76.7167,
                                                                            },
                                                                              openingHoursSpecification: [
                                                                                  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'] },
                                                                                    ],
                                                                                      priceRange: '$$',
                                                                                        servesCuisine: 'Hair Salon',
                                                                                        };

                                                                                        export default function RootLayout({ children }: { children: React.ReactNode }) {
                                                                                          return (
                                                                                              <html lang="en" className={`${playfair.variable} ${raleway.variable}`}>
                                                                                                    <head>
                                                                                                            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                                                                                                                  </head>
                                                                                                                        <body className="bg-[#0f0a1a] text-white antialiased">
                                                                                                                                {children}
                                                                                                                                      </body>
                                                                                                                                          </html>
                                                                                                                                            );
                                                                                                                                            }