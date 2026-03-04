'use client';
import { useState, useEffect } from 'react';

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['About', 'Services', 'Technology', 'Membership', 'Reviews', 'Book'];

  return (
        <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                background: scrolled ? 'rgba(15,10,26,0.95)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(139,92,246,0.3)' : 'none',
                padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.3s ease'
        }}>
                <a href="#" style={{ fontSize: '18px', fontWeight: 700, color: '#fff', textDecoration: 'none' }}>
                          THE PERFECT LOOK <span style={{ color: '#8b5cf6' }}>BY EMILY</span>span>
                </a>a>
                <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                  {navLinks.map(link => (
                    link === 'Book' ? (
                                  <a key={link} href="https://square.site/book/EMLYSALON" target="_blank" rel="noopener noreferrer"
                                                  style={{
                                                                    padding: '10px 24px', borderRadius: '25px',
                                                                    background: 'linear-gradient(135deg, #8b5cf6, #14b8a6)',
                                                                    color: '#fff', fontWeight: 600, textDecoration: 'none', fontSize: '14px'
                                                  }}>BOOK NOW</a>a>
                                ) : (
                                  <a key={link} href={`#${link.toLowerCase()}`}
                                                  style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}
                                                >{link}</a>a>
                                )
                  ))}
                </div>div>
        </nav>nav>
      );
}</a>
