import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
      title: 'The Perfect Look By Emily | Hair Colourist - Odessa, Kingston Ontario',
      description: 'Master hair colourist Emily specializes in balayage, colour correction, and mobile salon services in Odessa, Amherstview and Kingston, Ontario.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
      const bodyStyle: React.CSSProperties = {
              margin: 0,
              padding: 0,
              background: '#0f0a1a',
      };

  return React.createElement('html', { lang: 'en' },
                                 React.createElement('head', null,
                                                           React.createElement('link', {
                                                                       href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
                                                                       rel: 'stylesheet',
                                                           })
                                                         ),
                                 React.createElement('body', { style: bodyStyle }, children)
                               );
}
