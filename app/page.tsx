import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesCard from '@/components/ServicesCard';
import BookingSection from '@/components/BookingSection';

export default function Home() {
      const mainStyle: React.CSSProperties = {
              background: '#0f0a1a',
              color: '#fff',
              minHeight: '100vh',
              fontFamily: "'Inter', sans-serif",
      };

  const footerStyle: React.CSSProperties = {
          textAlign: 'center',
          padding: '32px',
          borderTop: '1px solid rgba(139,92,246,0.2)',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '14px',
  };

  return React.createElement('main', { style: mainStyle },
                                 React.createElement(Navigation, null),
                                 React.createElement(HeroSection, null),
                                 React.createElement(ServicesCard, null),
                                 React.createElement(BookingSection, null),
                                 React.createElement('footer', { style: footerStyle },
                                                           '2024 The Perfect Look By Emily. Odessa, Amherstview, Kingston, Ontario. (613) 583-9977'
                                                         )
                               );
}
