import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesCard from '@/components/ServicesCard';
import BookingSection from '@/components/BookingSection';

export default function Home() {
    return (
          <main style={{ background: '#0f0a1a', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
                  <Navigation />
                  <HeroSection />
                  <ServicesCard />
                  <BookingSection />
                  <footer style={{
                    textAlign: 'center', padding: '32px', borderTop: '1px solid rgba(139,92,246,0.2)',
                    color: 'rgba(255,255,255,0.4)', fontSize: '14px'
          }}>
                            2024 The Perfect Look By Emily. Odessa, Amherstview, Kingston, Ontario. (613) 583-9977
                  </footer>footer>
          </main>main>
        );
}
