const services = [
  { name: 'Balayage', price: '$185+', desc: 'Custom hand-painted highlights for natural sun-kissed dimension', color: '#8b5cf6' },
  { name: 'Colour Correction', price: '$250+', desc: 'Expert correction using Goldwell Topchic and Colorance systems', color: '#14b8a6' },
  { name: 'Mobile Care', price: '$75+', desc: 'In-home and retirement residence visits - luxury at your door', color: '#8b5cf6' },
  { name: 'Cuts and Styles', price: '$65+', desc: 'Precision cuts tailored to your face shape and lifestyle', color: '#14b8a6' },
  { name: 'Colour Gloss', price: '$95+', desc: 'Glossing treatments with @Pure Pigments for vivid shine', color: '#8b5cf6' },
  { name: 'Premium Sun/Mon', price: '+$25', desc: 'Exclusive Sunday and Monday appointments at the private studio', color: '#14b8a6' },
  ];

export default function ServicesCard() {
    return (
          <section id="services" style={{ padding: '100px 32px', maxWidth: '1200px', margin: '0 auto' }}>
                  <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                            <div style={{ fontSize: '12px', letterSpacing: '4px', color: '#14b8a6', textTransform: 'uppercase', marginBottom: '16px' }}>SERVICES</div>div>
                            <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, color: '#fff' }}>Artistry Meets Science</h2>h2>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginTop: '16px' }}>Goldwell-certified colour expertise for every hair vision</p>p>
                  </div>div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    {services.map(svc => (
                      <div key={svc.name} style={{
                                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.2)',
                                    borderRadius: '20px', padding: '32px', backdropFilter: 'blur(20px)'
                      }}>
                                    <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{svc.name}</h3>h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.6, marginBottom: '16px' }}>{svc.desc}</p>p>
                                    <div style={{ fontSize: '20px', fontWeight: 700, color: svc.color }}>{svc.price}</div>div>
                      </div>div>
                    ))}
                  </div>div>
          </section>section>
        );
}
