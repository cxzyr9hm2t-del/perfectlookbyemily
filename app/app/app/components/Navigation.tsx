'use client';
import { useState, useEffect } from 'react';
import { Scissors } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
            window.addEventListener('scroll', handleScroll);
                return () => window.removeEventListener('scroll', handleScroll);
                  }, []);

                    return (
                        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav' : 'bg-transparent'}`}>
                              <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                                <div className="p-2 bg-[#8b5cf6]/20 rounded-lg border border-[#8b5cf6]/30">
                                                            <Scissors className="w-5 h-5 text-[#8b5cf6]" />
                                                                      </div>
                                                                                <span className="font-serif text-white text-lg font-bold">The Perfect Look By Emily</span>
                                                                                        </div>
                                                                                                <div className="hidden md:flex items-center gap-8">
                                                                                                          <a href="#services" className="text-gray-300 hover:text-[#14b8a6] transition-colors text-sm font-medium tracking-wide">Services</a>
                                                                                                                    <a href="#booking" className="text-gray-300 hover:text-[#14b8a6] transition-colors text-sm font-medium tracking-wide">Book Now</a>
                                                                                                                              <a href="tel:6135839977" className="btn-teal text-sm py-2 px-5 rounded-lg">Call (613) 583-9977</a>
                                                                                                                                      </div>
                                                                                                                                            </div>
                                                                                                                                                </nav>
                                                                                                                                                  );
                                                                                                                                                  }