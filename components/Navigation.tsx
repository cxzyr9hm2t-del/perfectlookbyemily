'use client';
import React from 'react';
import { useState, useEffect } from 'react';

export default function Navigation() {
      const [scrolled, setScrolled] = useState(false);
      const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
          const handleScroll = () => setScrolled(window.scrollY > 50);
          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['About', 'Services', 'Gallery', 'Book'];

  const navStyle: React.CSSProperties = {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(15,10,26,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(139,92,246,0.3)' : 'none',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease',
  };

  const logoStyle: React.CSSProperties = {
          fontSize: '18px',
          fontWeight: 700,
          color: '#fff',
          textDecoration: 'none',
  };

  const accentStyle: React.CSSProperties = { color: '#8b5cf6' };

  const linksWrapStyle: React.CSSProperties = {
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
  };

  const linkStyle: React.CSSProperties = {
          color: '#ccc',
          textDecoration: 'none',
          fontSize: '14px',
          transition: 'color 0.2s',
  };

  const bookBtnStyle: React.CSSProperties = {
          padding: '10px 24px',
          borderRadius: '25px',
          background: 'linear-gradient(135deg, #8b5cf6, #14b8a6)',
          color: '#fff',
          fontWeight: 600,
          textDecoration: 'none',
          fontSize: '14px',
  };

  return React.createElement('nav', { style: navStyle },
                                 React.createElement('a', { href: '#', style: logoStyle },
                                                           'THE PERFECT LOOK ',
                                                           React.createElement('span', { style: accentStyle }, 'BY EMILY')
                                                         ),
                                 React.createElement('div', { style: linksWrapStyle },
                                                           navLinks.map(link =>
                                                                       link === 'Book'
                                                                                  ? React.createElement('a', {
                                                                                                    key: link,
                                                                                                    href: 'https://square.site/book/EMLYSALON',
                                                                                                    target: '_blank',
                                                                                                    rel: 'noopener noreferrer',
                                                                                                    style: bookBtnStyle,
                                                                                  }, 'BOOK NOW')
                                                                         : React.createElement('a', {
                                                                                           key: link,
                                                                                           href: '#' + link.toLowerCase(),
                                                                                           style: linkStyle,
                                                                         }, link)
                                                                              )
                                                         )
                               );
}
