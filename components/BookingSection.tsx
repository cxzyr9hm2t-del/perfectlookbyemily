import React from 'react';

export default function BookingSection() {
      const sectionStyle: React.CSSProperties = {
              padding: '100px 32px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(20,184,166,0.05))',
      };

  const innerStyle: React.CSSProperties = {
          maxWidth: '800px',
          margin: '0 auto',
  };

  const labelStyle: React.CSSProperties = {
          fontSize: '12px',
          letterSpacing: '4px',
          color: '#14b8a6',
          textTransform: 'uppercase',
          marginBottom: '16px',
  };

  const titleStyle: React.CSSProperties = {
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 800,
          color: '#fff',
          marginBottom: '24px',
  };

  const descStyle: React.CSSProperties = {
          color: 'rgba(255,255,255,0.6)',
          fontSize: '18px',
          lineHeight: 1.7,
          marginBottom: '48px',
  };

  const btnRowStyle: React.CSSProperties = {
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '48px',
  };

  const primaryBtnStyle: React.CSSProperties = {
          padding: '20px 48px',
          borderRadius: '50px',
          background: 'linear-gradient(135deg, #8b5cf6, #14b8a6)',
          color: '#fff',
          fontWeight: 700,
          textDecoration: 'none',
          fontSize: '18px',
  };

  const secondaryBtnStyle: React.CSSProperties = {
          padding: '20px 48px',
          borderRadius: '50px',
          border: '2px solid rgba(139,92,246,0.5)',
          color: '#fff',
          fontWeight: 700,
          textDecoration: 'none',
          fontSize: '18px',
  };

  const auroraCardStyle: React.CSSProperties = {
          background: 'rgba(139,92,246,0.1)',
          border: '1px solid rgba(139,92,246,0.3)',
          borderRadius: '24px',
          padding: '32px',
          backdropFilter: 'blur(20px)',
  };

  const auroraTitleStyle: React.CSSProperties = {
          fontSize: '24px',
          fontWeight: 700,
          color: '#8b5cf6',
          marginBottom: '16px',
  };

  const auroraDescStyle: React.CSSProperties = {
          color: 'rgba(255,255,255,0.7)',
          fontSize: '16px',
          lineHeight: 1.7,
  };

  const comingSoonStyle: React.CSSProperties = {
          marginTop: '16px',
          display: 'inline-block',
          padding: '8px 24px',
          borderRadius: '20px',
          background: 'rgba(139,92,246,0.2)',
          color: '#8b5cf6',
          fontSize: '14px',
          fontWeight: 700,
  };

  return React.createElement('section', { id: 'book', style: sectionStyle },
                                 React.createElement('div', { style: innerStyle },
                                                           React.createElement('div', { style: labelStyle }, 'BOOK NOW'),
                                                           React.createElement('h2', { style: titleStyle }, 'Begin Your Transformation'),
                                                           React.createElement('p', { style: descStyle },
                                                                                       'Book your private consultation at the Amherstview studio. Tue-Sat regular hours. Premium Sun and Mon available.'
                                                                                     ),
                                                           React.createElement('div', { style: btnRowStyle },
                                                                                       React.createElement('a', {
                                                                                                     href: 'https://square.site/book/EMLYSALON',
                                                                                                     target: '_blank',
                                                                                                     rel: 'noopener noreferrer',
                                                                                                     style: primaryBtnStyle,
                                                                                       }, 'BOOK ONLINE'),
                                                                                       React.createElement('a', {
                                                                                                     href: 'tel:6135839977',
                                                                                                     style: secondaryBtnStyle,
                                                                                       }, '(613) 583-9977')
                                                                                     ),
                                                           React.createElement('div', { style: auroraCardStyle },
                                                                                       React.createElement('h3', { style: auroraTitleStyle }, 'The Aurora Garage Studio'),
                                                                                       React.createElement('p', { style: auroraDescStyle },
                                                                                                                     'Coming Soon: A dedicated luxury private studio for the ultimate experience.'
                                                                                                                   ),
                                                                                       React.createElement('div', { style: comingSoonStyle }, 'COMING SOON 2025')
                                                                                     )
                                                         )
                               );
}
