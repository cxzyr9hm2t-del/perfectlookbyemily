export default function BookingSection() {
    return (
          <section id="book" style={{
                  padding: '100px 32px', textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(20,184,166,0.05))'
          }}>
                  <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <div style={{ fontSize: '12px', letterSpacing: '4px', color: '#14b8a6', textTransform: 'uppercase', marginBottom: '16px' }}>BOOK NOW</div>div>
                            <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, color: '#fff', marginBottom: '24px' }}>
                                        Begin Your Transformation
                            </h2>h2>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', lineHeight: 1.7, marginBottom: '48px' }}>
                                        Book your private consultation at the Amherstview studio. Tue-Sat regular hours. Premium Sun and Mon available.
                            </p>p>
                            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
                                        <a href="https://square.site/book/EMLYSALON" target="_blank" rel="noopener noreferrer" style={{
                        padding: '20px 48px', borderRadius: '50px',
                        background: 'linear-gradient(135deg, #8b5cf6, #14b8a6)',
                        color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '18px'
          }}>BOOK ONLINE</a>a>
                                        <a href="tel:6135839977" style={{
                        padding: '20px 48px', borderRadius: '50px',
                        border: '2px solid rgba(139,92,246,0.5)',
                        color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '18px'
          }}>(613) 583-9977</a>a>
                            </div>div>
                            <div style={{
                      background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)',
                      borderRadius: '24px', padding: '32px'
          }}>
                                        <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#8b5cf6', marginBottom: '16px' }}>The Aurora Garage Studio</h3>h3>
                                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.7 }}>
                                                      Coming Soon: A dedicated luxury private studio for the ultimate experience.
                                        </p>p>
                                        <div style={{ marginTop: '16px', display: 'inline-block', padding: '8px 24px', borderRadius: '20px', background: 'rgba(139,92,246,0.2)', color: '#8b5cf6', fontSize: '14px', fontWeight: 600 }}>
                                                      COMING SOON 2025
                                        </div>div>
                            </div>div>
                            <div style={{ marginTop: '48px', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                                        Odessa, Amherstview, Kingston Ontario | (613) 583-9977
                            </div>div>
                  </div>div>
          </section>section>
        );
}
