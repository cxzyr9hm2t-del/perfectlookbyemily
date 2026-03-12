import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesMatrix from '@/components/ServicesMatrix';
import MobileConcierge from '@/components/MobileConcierge';
import HoursSection from '@/components/HoursSection';
import BookingSection from '@/components/BookingSection';
import ContactSection from '@/components/ContactSection';
import NewsletterSection from '@/components/NewsletterSection';
import ComingSoon from '@/components/ComingSoon';
import AIChatWidget from '@/components/AIChatWidget';

export default function Home() {
  return (
      <main style={{ background: '#0f0a1a', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Navigation />
                  <HeroSection />
                        <ServicesMatrix />
                              <MobileConcierge />
                                    <HoursSection />
                                          <ComingSoon />
                                                <ContactSection />
                                                      <NewsletterSection />
                                                            <BookingSection />
                                                                  <footer style={{ textAlign: 'center', padding: '32px', borderTop: '1px solid rgba(139,92,246,0.2)', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                                                                          © 2026 The Perfect Look By Emily — Emily Caird, Amherstview / Kingston, Ontario.{' '}
                                                                                  <a href="/privacy" style={{ color: 'rgba(139,92,246,0.6)' }}>Privacy</a>
                                                                                          {' · '}
                                                                                                  <a href="/terms" style={{ color: 'rgba(139,92,246,0.6)' }}>Terms</a>
                                                                                                        </footer>
                                                                                                              <AIChatWidget />
                                                                                                                  </main>
                                                                                                                    );
                                                                                                                    }