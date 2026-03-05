import type { Metadata } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
        title: 'The Perfect Look By Emily | Hair Colourist - Odessa, Kingston Ontario',
        description: 'Master hair colourist Emily specializes in balayage, colour correction, and mobile salon services in Odessa, Amherstview and Kingston, Ontario.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
        return React.createElement('html', { lang: 'en', className: 'scroll-smooth' },
                                       React.createElement('body', { className: 'bg-midnight text-white antialiased' },
                                                                 children
                                                               )
                                     );
}
