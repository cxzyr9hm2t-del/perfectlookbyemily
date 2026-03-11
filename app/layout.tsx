import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesMatrix from '@/components/ServicesMatrix';
import MobileConcierge from '@/components/MobileConcierge';
import HoursSection from '@/components/HoursSection';
import BookingSection from '@/components/BookingSection';

export default function Home() {
  return (
      <main className="bg-charcoal text-off-white min-h-screen overflow-x-hidden">
            <Navigation />
                  <HeroSection />
                        <ServicesMatrix />
                              <MobileConcierge />
                                    <HoursSection />
                                          <BookingSection />
                                                <footer className="text-center py-8 border-t border-border text-muted text-sm tracking-widest">
                                                        © 2026 The Perfect Look By Emily — Emily Caird, Amherstview, Ontario.
                                                              </footer>
                                                                  </main>
                                                                    );
                                                                    }