import React from 'react';

export default function HeroSection() {
      return React.createElement('div', {
              id: 'about',
              style: {
                        minHeight: '100vh', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                        padding: '120px 32px 80px',
                        background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.15) 0%, rgba(20,184,166,0.05) 50%, transparent 70%)'
              }
      },
                                     React.createElement('p', {
                                               style: { fontSize: '12px', letterSpacing: '4px', color: '#14b8a6', textTransform: 'uppercase', marginBottom: '24px' }
                                     }, 'ODESSA, ONTARIO — PRIVATE STUDIO'),
                                     React.createElement('h1', {
                                               style: {
                                                           fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 800, lineHeight: 1.05,
                                                           background: 'linear-gradient(135deg, #fff 30%, #8b5cf6 60%, #14b8a6 100%)',
                                                           WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                                           backgroundClip: 'text', marginBottom: '24px', marginTop: 0
                                               }
                                     }, 'The Perfect Look By Emily'),
                                     React.createElement('p', {
                                               style: { fontSize: '20px', color: 'rgba(255,255,255,0.65)', maxWidth: '560px', lineHeight: 1.7, marginBottom: '48px' }
                                     }, 'Where precision artistry meets luxury wellness — your private sanctuary for hair transformation'),
                                     React.createElement('div', {
                                               style: { display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }
                                     },
                                                               React.createElement('a', {
                                                                           href: 'https://square.site/book/EMLYSALON',
                                                                           target: '_blank',
                                                                           rel: 'noopener noreferrer',
                                                                           style: { padding: '16px 40px', borderRadius: '50px', background: 'linear-gradient(135deg, #8b5cf6, #14b8a6)', color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '16px' }
                                                               }, 'BOOK YOUR EXPERIENCE'),
                                                               React.createElement('a', {
                                                                           href: '#services',
                                                                           style: { padding: '16px 40px', borderRadius: '50px', border: '2px solid rgba(139,92,246,0.5)', color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '16px' }
                                                               }, 'EXPLORE SERVICES')
                                                             )
                                   );
}
