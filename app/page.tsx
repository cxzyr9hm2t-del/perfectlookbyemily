'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/* ─── Design Tokens ─────────────────────────────────────────────────── */
const C = {
  bg:      '#1e1e2e',
  bgCard:  'rgba(30,30,46,0.95)',
  purple:  '#8b3cf7',
  purpleD: '#7c3aed',
  teal:    '#0d9488',
  tealL:   '#2dd4bf',
  gold:    '#e5b869',
  white:   '#ffffff',
  gray:    'rgba(255,255,255,0.6)',
  grayD:   'rgba(255,255,255,0.15)',
  border:  'rgba(139,92,246,0.25)',
} as const;

const fenway: React.CSSProperties = { fontFamily: "'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" };
const inter:  React.CSSProperties = { fontFamily: "'Inter',system-ui,sans-serif" };

/* ─── Glass Card Style ───────────────────────────────────────────────── */
const glassCard: React.CSSProperties = {
  background: 'rgba(139,92,246,0.07)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(139,92,246,0.28)',
  borderRadius: 16,
};

/* ─── Portfolio Images ───────────────────────────────────────────────── */
const PORTFOLIO = [
  { file:'1000011101.jpg', label:'Balayage & Colour',   span:2 },
  { file:'1000022978.jpg', label:'Precision Cut',       span:1 },
  { file:'1000010835.jpg', label:'Vivid Colour',        span:1 },
  { file:'1000019345.jpg', label:'Highlights',          span:2 },
  { file:'1000010712.jpg', label:'Ombré Colour',        span:1 },
  { file:'1000009971.jpg', label:'Full Colour',         span:1 },
  { file:'1000010201.jpg', label:'Creative Colour',     span:2 },
  { file:'1000010413.jpg', label:'Bridal Updo',         span:1 },
  { file:'1000020389.jpg', label:'Extension Install',   span:1 },
];

/* ─── Particle Canvas ───────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '139,92,246' : '13,148,136',
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0 }} />;
}

/* ─── Scroll Reveal Hook ─────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).style.opacity='1'; (e.target as HTMLElement).style.transform='translateY(0)'; } });
    }, { threshold: 0.12 });
    els.forEach(el => { (el as HTMLElement).style.opacity='0'; (el as HTMLElement).style.transform='translateY(28px)'; (el as HTMLElement).style.transition='opacity 0.7s ease, transform 0.7s ease'; io.observe(el); });
    return () => io.disconnect();
  }, []);
}

/* ─── Navigation ─────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const links = ['Services','Gallery','About','Book Now'];
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav style={{ position:'sticky', top:0, zIndex:100, background: scrolled ? 'rgba(30,30,46,0.97)' : 'rgba(30,30,46,0.85)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderBottom:'1px solid rgba(139,92,246,0.25)', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:64, transition:'background 0.3s', ...inter }}>
      <a href="#hero" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
        <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#8b3cf7,#0d9488)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:16 }}>E</div>
        <span style={{ color:'#fff', fontWeight:700, fontSize:15, ...fenway, letterSpacing:'0.03em' }}>The Perfect Look By Emily</span>
      </a>
      <div style={{ display:'flex', gap:32, alignItems:'center' }}>
        {links.map(l => (
          <a key={l} href={'#'+l.toLowerCase().replace(' ','-')} style={{ color:'rgba(255,255,255,0.65)', textDecoration:'none', fontSize:14, fontWeight:500, transition:'color 0.2s' }}
            onMouseEnter={e=>(e.currentTarget.style.color='#2dd4bf')}
            onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.65)')}
          >{l}</a>
        ))}
        <a href="tel:6139298711" style={{ background:'linear-gradient(135deg,#8b3cf7,#7c3aed)', color:'#fff', padding:'8px 20px', borderRadius:999, textDecoration:'none', fontSize:13, fontWeight:600, boxShadow:'0 0 16px rgba(139,92,246,0.4)', transition:'all 0.3s' }}>(613) 929-8711</a>
      </div>
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" style={{ minHeight:'92vh', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'80px 24px', position:'relative', overflow:'hidden', background:'radial-gradient(ellipse at 20% 50%,rgba(139,92,246,0.18) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(13,148,136,0.12) 0%,transparent 50%),#1e1e2e' }}>
      <ParticleCanvas />
      <div style={{ maxWidth:720, position:'relative', zIndex:1 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.25)', borderRadius:999, padding:'6px 16px', marginBottom:24 }}>
          <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2dd4bf', ...inter }}>Amherstview · Kingston, Ontario</span>
        </div>
        <h1 style={{ fontSize:'clamp(2.6rem,6vw,4.5rem)', fontWeight:700, color:'#fff', lineHeight:1.1, margin:'0 0 8px', ...fenway }}>The Perfect Look</h1>
        <h2 style={{ fontSize:'clamp(1.1rem,3vw,1.6rem)', color:'#2dd4bf', margin:'0 0 24px', fontWeight:400, ...fenway, fontStyle:'italic' }}>By Emily</h2>
        <p style={{ fontSize:'clamp(1rem,2vw,1.15rem)', color:'rgba(255,255,255,0.65)', lineHeight:1.7, marginBottom:40, maxWidth:560, marginLeft:'auto', marginRight:'auto', ...inter }}>25+ years of Goldwell-certified colour mastery, bespoke cuts, and luxury extension installations. Private studio in Amherstview — and mobile care that comes to you.</p>
        <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', marginBottom:56 }}>
          <a href="#book-now" style={{ background:'linear-gradient(135deg,#0d9488,#0f766e)', color:'#fff', padding:'15px 36px', borderRadius:999, textDecoration:'none', fontWeight:700, fontSize:15, boxShadow:'0 8px 24px rgba(13,148,136,0.35)', transition:'all 0.3s', ...inter }}>Book Your Appointment</a>
          <a href="#gallery" style={{ background:'rgba(139,92,246,0.12)', border:'1px solid rgba(139,92,246,0.35)', color:'#fff', padding:'15px 36px', borderRadius:999, textDecoration:'none', fontWeight:600, fontSize:15, transition:'all 0.3s', ...inter }}>View Gallery</a>
        </div>
        <div style={{ display:'flex', justifyContent:'center', gap:40, flexWrap:'wrap' }}>
          {[['25+','Years Experience'],['★ 5.0','Client Rating'],['Goldwell','Certified Colourist'],['Mobile','Care Available']].map(([v,l])=>(
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontSize:'1.6rem', fontWeight:700, color:'#8b3cf7', ...fenway }}>{v}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.55)', marginTop:2, letterSpacing:'0.05em', textTransform:'uppercase', ...inter }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Coming Soon Banner ─────────────────────────────────────────────── */
function ComingSoon() {
  return (
    <section style={{ padding:'32px 24px 0' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', justifyContent:'center' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:16, background:'rgba(229,184,105,0.07)', border:'1px solid rgba(229,184,105,0.35)', borderRadius:16, padding:'18px 32px' }}>
          <span style={{ fontSize:24 }}>🏗️</span>
          <div>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#e5b869', margin:'0 0 4px', ...inter }}>Coming Soon</p>
            <p style={{ fontSize:16, fontWeight:600, color:'#fff', margin:0, ...fenway }}>Dedicated Garage Salon Transformation — Amherstview, Ontario</p>
          </div>
          <div style={{ background:'rgba(229,184,105,0.15)', border:'1px solid rgba(229,184,105,0.4)', borderRadius:999, padding:'4px 12px' }}>
            <span style={{ fontSize:12, fontWeight:700, color:'#e5b869', ...inter }}>2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────────────────── */
const SERVICES = [
  { icon:'✂',  title:'Precision Cuts',         desc:'Sculpted bobs, textured layers, and custom shapes tailored to your face and lifestyle.',           price:'From $60' },
  { icon:'🎨', title:'Balayage & Colour',       desc:'Hand-painted sun-kissed tones, rich glosses, and dimensional highlights.',                         price:'From $120' },
  { icon:'✨', title:'Vivid & Creative Colour', desc:'Bold fantasy colours — from pastel lavender to deep ocean teal — expertly formulated.',             price:'Custom Quote' },
  { icon:'💍', title:'Bridal & Special Occasion',desc:'Bespoke wedding hair and event styling with pearl pins, braids, and elegant updos.',              price:'From $150' },
  { icon:'🏠', title:'Mobile Concierge',        desc:'Emily comes to your home, retirement residence, or facility. Full service, zero travel stress.',    price:'Call for Quote' },
  { icon:'👨', title:"Men's Grooming",          desc:'Precision fades, textured crops, and classic barbershop-style cuts for all hair types.',            price:'From $35' },
];

function Services() {
  return (
    <section id="services" style={{ padding:'96px 24px', background:'#1e1e2e', borderTop:'1px solid rgba(139,92,246,0.12)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:64 }} data-reveal>
          <p style={{ fontSize:13, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2dd4bf', marginBottom:12, ...inter }}>What We Do</p>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#fff', margin:0, ...fenway }}>Services Menu</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:24 }}>
          {SERVICES.map((s,i)=>(
            <div key={s.title} data-reveal style={{ ...glassCard, padding:28, transition:'transform 0.3s, box-shadow 0.3s', cursor:'default' }}
              onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 16px 40px rgba(139,92,246,0.2)'; }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow='none'; }}>
              <div style={{ fontSize:28, marginBottom:12 }}>{s.icon}</div>
              <h3 style={{ fontSize:'1.1rem', fontWeight:700, color:'#fff', margin:'0 0 10px', ...fenway }}>{s.title}</h3>
              <p style={{ color:'rgba(255,255,255,0.6)', fontSize:14, lineHeight:1.6, margin:'0 0 16px', ...inter }}>{s.desc}</p>
              <span style={{ display:'inline-block', background:'rgba(229,184,105,0.12)', border:'1px solid rgba(229,184,105,0.35)', borderRadius:999, padding:'4px 14px', fontSize:12, fontWeight:700, color:'#e5b869', ...inter }}>{s.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Goldwell Suite ─────────────────────────────────────────────────── */
function GoldwellSuite() {
  return (
    <section id="goldwell" style={{ padding:'96px 24px', background:'linear-gradient(135deg,rgba(139,92,246,0.08) 0%,rgba(13,148,136,0.06) 100%),#1e1e2e', borderTop:'1px solid rgba(139,92,246,0.12)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:64 }} data-reveal>
          <p style={{ fontSize:12, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'#e5b869', marginBottom:8, ...inter }}>❖ Premium Offerings ❖</p>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#fff', margin:'0 0 16px', ...fenway }}>The Goldwell Suite</h2>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:16, maxWidth:560, margin:'0 auto', ...inter }}>Exclusive treatments reserved for clients who demand the absolute finest in colour science and hair engineering.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(440px,1fr))', gap:32 }}>
          <div data-reveal style={{ background:'rgba(229,184,105,0.05)', border:'1px solid rgba(229,184,105,0.3)', borderRadius:20, padding:40 }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24 }}>
              <div style={{ width:52, height:52, borderRadius:12, background:'rgba(229,184,105,0.15)', border:'1px solid rgba(229,184,105,0.4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>🏆</div>
              <div>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'#e5b869', margin:'0 0 4px', ...inter }}>Goldwell Certified</p>
                <h3 style={{ fontSize:'1.5rem', fontWeight:700, color:'#fff', margin:0, ...fenway }}>Colour Mastery</h3>
              </div>
            </div>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15, lineHeight:1.7, marginBottom:24, ...inter }}>Emily holds Goldwell Colour Mastery certification — the highest level of colour artistry training in the professional hair industry. Every formula is precision-mixed for your unique hair history, porosity, and goal.</p>
            <ul style={{ listStyle:'none', padding:0, margin:'0 0 28px', display:'flex', flexDirection:'column', gap:10 }}>
              {['Balayage & foil work','Full colour transformation','Vivid fashion shades','Grey blending & toning','Gloss treatments'].map(i=>(
                <li key={i} style={{ display:'flex', alignItems:'center', gap:10, color:'rgba(255,255,255,0.6)', fontSize:14, ...inter }}>
                  <span style={{ color:'#e5b869', flexShrink:0 }}>✓</span>{i}
                </li>
              ))}
            </ul>
            <a href="#book-now" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(229,184,105,0.1)', border:'1px solid rgba(229,184,105,0.4)', color:'#e5b869', padding:'12px 24px', borderRadius:999, textDecoration:'none', fontSize:14, fontWeight:600, ...inter }}>Book a Colour Consultation →</a>
          </div>
          <div data-reveal style={{ background:'rgba(139,92,246,0.05)', border:'1px solid rgba(139,92,246,0.25)', borderRadius:20, padding:40 }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24 }}>
              <div style={{ width:52, height:52, borderRadius:12, background:'rgba(139,92,246,0.15)', border:'1px solid rgba(139,92,246,0.4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>💎</div>
              <div>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'#8b3cf7', margin:'0 0 4px', ...inter }}>Goldwell Extensions</p>
                <h3 style={{ fontSize:'1.5rem', fontWeight:700, color:'#fff', margin:0, ...fenway }}>Luxury Installations</h3>
              </div>
            </div>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15, lineHeight:1.7, marginBottom:24, ...inter }}>Seamlessly blended, damage-free extension installations using premium Goldwell-aligned hair. From subtle length to dramatic volume — each strand is colour-matched and bonded with precision.</p>
            <ul style={{ listStyle:'none', padding:0, margin:'0 0 28px', display:'flex', flexDirection:'column', gap:10 }}>
              {['Tape-in extensions','Micro-link (I-tip) bonds','Clip-in custom sets','Halo extensions','Maintenance & removal'].map(i=>(
                <li key={i} style={{ display:'flex', alignItems:'center', gap:10, color:'rgba(255,255,255,0.6)', fontSize:14, ...inter }}>
                  <span style={{ color:'#8b3cf7', flexShrink:0 }}>✓</span>{i}
                </li>
              ))}
            </ul>
            <a href="#book-now" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.4)', color:'#8b3cf7', padding:'12px 24px', borderRadius:999, textDecoration:'none', fontSize:14, fontWeight:600, ...inter }}>Book Extension Consultation →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Portfolio / Gallery with Lightbox ─────────────────────────────── */
function Portfolio() {
  const [hovered, setHovered] = useState<number|null>(null);
  const [lightbox, setLightbox] = useState<number|null>(null);

  const close = () => setLightbox(null);
  const prev = () => setLightbox(i => i !== null ? (i - 1 + PORTFOLIO.length) % PORTFOLIO.length : null);
  const next = () => setLightbox(i => i !== null ? (i + 1) % PORTFOLIO.length : null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <section id="gallery" style={{ padding:'96px 24px', background:'#1e1e2e', borderTop:'1px solid rgba(139,92,246,0.12)' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:64 }} data-reveal>
          <p style={{ fontSize:13, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2dd4bf', marginBottom:12, ...inter }}>Our Work</p>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#fff', margin:0, ...fenway }}>❖ From Our Chair: Real Transformations ❖</h2>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:16, maxWidth:520, margin:'16px auto 0', ...inter }}>Precision colour, bespoke cuts, and transformations crafted with 25+ years of expertise.</p>
        </div>
        <div style={{ columns:'3 320px', columnGap:12, lineHeight:0 }}>
          {PORTFOLIO.map((img, i) => (
            <div key={img.file}
              style={{ display:'inline-block', width:'100%', marginBottom:12, position:'relative', overflow:'hidden', borderRadius:12, border:'1px solid rgba(139,92,246,0.25)', cursor:'pointer', breakInside:'avoid', transition:'transform .3s,box-shadow .3s' }}
              onMouseEnter={()=>setHovered(i)}
              onMouseLeave={()=>setHovered(null)}
              onClick={()=>setLightbox(i)}>
              <Image src={'/images/'+img.file} alt={img.label+' — by Emily Caird, Amherstview Ontario'} width={600} height={img.span===2 ? 900 : 600} style={{ width:'100%', height:'auto', display:'block', objectFit:'cover' }} loading="lazy" />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'20px 14px 14px', background:'linear-gradient(to top,rgba(30,30,46,0.92) 0%,transparent 100%)', opacity: hovered===i ? 1 : 0, transition:'opacity .3s', display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
                <span style={{ display:'inline-block', background:'rgba(13,148,136,0.18)', border:'1px solid rgba(13,148,136,0.4)', color:'#2dd4bf', fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', padding:'4px 10px', borderRadius:999, ...inter }}>{img.label}</span>
                <span style={{ color:'rgba(255,255,255,0.6)', fontSize:11, ...inter }}>Click to expand</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox !== null && (
          <div onClick={close} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.92)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div onClick={e=>e.stopPropagation()} style={{ position:'relative', maxWidth:'90vw', maxHeight:'90vh' }}>
              <Image src={'/images/'+PORTFOLIO[lightbox].file} alt={PORTFOLIO[lightbox].label} width={1200} height={900} style={{ maxWidth:'90vw', maxHeight:'85vh', objectFit:'contain', borderRadius:12 }} />
              <div style={{ position:'absolute', bottom:-40, left:0, right:0, textAlign:'center', color:'rgba(255,255,255,0.7)', fontSize:14, ...inter }}>{PORTFOLIO[lightbox].label}</div>
              <button onClick={prev} style={{ position:'absolute', left:-56, top:'50%', transform:'translateY(-50%)', background:'rgba(139,92,246,0.3)', border:'1px solid rgba(139,92,246,0.5)', color:'#fff', width:44, height:44, borderRadius:'50%', fontSize:18, cursor:'pointer' }}>‹</button>
              <button onClick={next} style={{ position:'absolute', right:-56, top:'50%', transform:'translateY(-50%)', background:'rgba(139,92,246,0.3)', border:'1px solid rgba(139,92,246,0.5)', color:'#fff', width:44, height:44, borderRadius:'50%', fontSize:18, cursor:'pointer' }}>›</button>
              <button onClick={close} style={{ position:'absolute', top:-44, right:0, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', color:'#fff', width:36, height:36, borderRadius:'50%', fontSize:18, cursor:'pointer' }}>×</button>
            </div>
          </div>
        )}

        {/* Instagram CTA */}
        <div style={{ marginTop:48, borderRadius:20, padding:2, background:'linear-gradient(135deg,#f09433,#dc2743,#bc1888)' }}>
          <div style={{ borderRadius:18, background:'#1e1e2e', padding:'32px 40px', display:'flex', alignItems:'center', gap:24, flexWrap:'wrap' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e6683c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width:40, height:40, flexShrink:0 }}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="#e6683c" stroke="none"/>
            </svg>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#e6683c', margin:'0 0 4px', ...inter }}>Follow Along</p>
              <h3 style={{ fontSize:'1.5rem', fontWeight:700, color:'#fff', margin:'0 0 4px', ...fenway }}>@theperfectlookbyemily</h3>
              <p style={{ color:'rgba(255,255,255,0.6)', fontSize:14, margin:0, ...inter }}>See the latest transformations as they happen.</p>
            </div>
            <a href="https://www.instagram.com/theperfectlookbyemily" target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 28px', borderRadius:999, background:'linear-gradient(135deg,#f09433,#dc2743,#bc1888)', color:'#fff', fontWeight:700, fontSize:14, textDecoration:'none', ...inter }}>Follow on Instagram</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── About Emily ────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" style={{ padding:'96px 24px', background:'linear-gradient(135deg,rgba(13,148,136,0.06) 0%,rgba(139,92,246,0.06) 100%),#1e1e2e', borderTop:'1px solid rgba(139,92,246,0.12)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
        <div data-reveal>
          <div style={{ width:'100%', aspectRatio:'4/5', background:'linear-gradient(135deg,rgba(139,92,246,0.15),rgba(13,148,136,0.1))', borderRadius:20, border:'1px solid rgba(139,92,246,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'6rem', position:'relative' }}>
            👩‍🎨
            <div style={{ position:'absolute', bottom:-16, right:-16, background:'linear-gradient(135deg,#8b3cf7,#7c3aed)', padding:'1.25rem', borderRadius:16, textAlign:'center' }}>
              <strong style={{ fontFamily:"'FenwayPark',Georgia,serif", fontSize:'1.8rem', color:'#fff', display:'block' }}>25+</strong>
              <span style={{ fontSize:'0.7rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.8)', ...inter }}>Years of Excellence</span>
            </div>
          </div>
        </div>
        <div data-reveal>
          <p style={{ fontSize:13, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2dd4bf', marginBottom:12, ...inter }}>Meet Your Stylist</p>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#fff', margin:'0 0 20px', ...fenway }}>Emily Caird</h2>
          <p style={{ color:'rgba(255,255,255,0.65)', fontSize:15, lineHeight:1.8, marginBottom:20, ...inter }}>With over 25 years of hands-on experience in colour artistry and hair design, Emily brings Goldwell-certified mastery to every client — whether in her private Amherstview studio or your own home.</p>
          <p style={{ color:'rgba(255,255,255,0.65)', fontSize:15, lineHeight:1.8, marginBottom:32, ...inter }}>Specialising in complex colour transformations, seamless extensions, and mobile bridal styling, Emily's work is guided by one belief: every person deserves to feel extraordinary.</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:32 }}>
            {[['✨','Private Studio'],['🎓','Goldwell Certified'],['🌿','25+ Years Expert'],['✦','Mobile Concierge'],['🎯','Precision Cuts'],['💜','Client-First Always']].map(([icon,label])=>(
              <div key={label} style={{ display:'flex', alignItems:'center', gap:10, ...inter, fontSize:14, color:'rgba(255,255,255,0.75)' }}>
                <span style={{ fontSize:'1.2rem' }}>{icon}</span>{label}
              </div>
            ))}
          </div>
          <a href="#book-now" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#8b3cf7,#7c3aed)', color:'#fff', padding:'14px 32px', borderRadius:999, textDecoration:'none', fontWeight:700, fontSize:14, boxShadow:'0 8px 24px rgba(139,92,246,0.35)', ...inter }}>Begin Your Journey →</a>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────────────────────────── */
const REVIEWS = [
  { text:"Emily is an absolute artist. My balayage looks like I stepped out of a high-end editorial shoot. The private studio experience is unlike anything else.", author:"Sarah M.", loc:"Kingston, ON" },
  { text:"I have been going to Emily for three years and my hair has never been healthier or more beautiful. She truly understands colour like no one else.", author:"Jennifer K.", loc:"Amherstview, ON" },
  { text:"The mobile service is a game-changer. Emily came to my home and delivered salon-quality results with full professionalism. Absolutely worth every penny.", author:"Michelle T.", loc:"Bath, ON" },
  { text:"Incredible attention to detail. Emily diagnosed scalp issues my previous stylist missed for years. Walking out every time feeling like a new person.", author:"Rachel L.", loc:"Napanee, ON" },
  { text:"My colour correction took years off the damage my hair had. Emily was honest, thorough, and delivered results beyond what I thought possible.", author:"Amanda P.", loc:"Kingston, ON" },
  { text:"Finally a stylist who truly listens. Emily took my whole lifestyle into account and created a look that is genuinely perfect for me.", author:"Caitlin B.", loc:"Amherstview, ON" },
];

function Testimonials() {
  return (
    <section id="testimonials" style={{ padding:'96px 24px', background:'#1e1e2e', borderTop:'1px solid rgba(139,92,246,0.12)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:64 }} data-reveal>
          <p style={{ fontSize:13, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2dd4bf', marginBottom:12, ...inter }}>Client Love</p>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#fff', margin:0, ...fenway }}>What They Say</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:24 }}>
          {REVIEWS.map((r,i)=>(
            <div key={i} data-reveal style={{ ...glassCard, padding:28, transition:'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 16px 40px rgba(139,92,246,0.2)'; }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow='none'; }}>
              <div style={{ color:'#e5b869', fontSize:'1.1rem', marginBottom:12 }}>★★★★★</div>
              <p style={{ ...fenway, fontSize:'1.05rem', fontStyle:'italic', color:'rgba(232,224,240,0.88)', marginBottom:16, lineHeight:1.65 }}>"{r.text}"</p>
              <div style={{ ...inter, fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#2dd4bf' }}>{r.author} — {r.loc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Mobile Concierge ───────────────────────────────────────────────── */
function MobileConcierge() {
  return (
    <section id="mobile-care" style={{ padding:'96px 24px', background:'linear-gradient(135deg,rgba(13,148,136,0.06) 0%,rgba(139,92,246,0.06) 100%),#1e1e2e', borderTop:'1px solid rgba(139,92,246,0.12)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
        <div data-reveal>
          <p style={{ fontSize:12, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2dd4bf', marginBottom:12, ...inter }}>We Come to You</p>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:700, color:'#fff', margin:'0 0 20px', ...fenway }}>Mobile Hair Concierge</h2>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15, lineHeight:1.7, marginBottom:28, ...inter }}>Emily's mobile studio brings salon-quality expertise to your home, workplace, or care facility across Amherstview and Greater Kingston.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:32 }}>
            {['Retirement & LTC home visits','In-home appointments','Accessible service for mobility challenges','All equipment brought on-site'].map(f=>(
              <div key={f} style={{ display:'flex', alignItems:'center', gap:10, color:'rgba(255,255,255,0.65)', fontSize:14, ...inter }}>
                <span style={{ color:'#2dd4bf' }}>✓</span>{f}
              </div>
            ))}
          </div>
          <a href="#book-now" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#0d9488,#0f766e)', color:'#fff', padding:'14px 28px', borderRadius:999, textDecoration:'none', fontWeight:700, fontSize:14, ...inter }}>Book Mobile Visit →</a>
        </div>
        <div data-reveal style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {[['📍','Amherstview & Kingston, ON'],['🚗','Mobile Service Available'],['🏥','Retirement Home Visits'],['📞','(613) 929-8711']].map(([ic,t])=>(
            <div key={t} style={{ ...glassCard, padding:20, textAlign:'center' }}>
              <div style={{ fontSize:28, marginBottom:8 }}>{ic}</div>
              <p style={{ color:'#fff', fontSize:13, fontWeight:500, margin:0, ...inter }}>{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Hours (with Today highlight) ──────────────────────────────────── */
function Hours() {
  const today = new Date().toLocaleDateString('en-CA', { weekday:'long' });
  const hours = [
    ['Monday',   '9:00 AM – 7:00 PM'],
    ['Tuesday',  '9:00 AM – 7:00 PM'],
    ['Wednesday','9:00 AM – 7:00 PM'],
    ['Thursday', '9:00 AM – 8:00 PM'],
    ['Friday',   '9:00 AM – 6:00 PM'],
    ['Saturday', '8:00 AM – 5:00 PM'],
    ['Sunday',   'Closed'],
  ];
  return (
    <section id="hours" style={{ padding:'96px 24px', background:'#1e1e2e', borderTop:'1px solid rgba(139,92,246,0.12)' }}>
      <div style={{ maxWidth:640, margin:'0 auto', textAlign:'center' }}>
        <p style={{ fontSize:13, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2dd4bf', marginBottom:12, ...inter }}>Studio Hours</p>
        <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:700, color:'#fff', margin:'0 0 40px', ...fenway }}>When We're Open</h2>
        <div style={{ background:'rgba(139,92,246,0.05)', border:'1px solid rgba(139,92,246,0.25)', borderRadius:20, overflow:'hidden' }}>
          {hours.map(([day,time])=>{
            const isToday = day === today;
            return (
              <div key={day} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 28px', borderBottom:'1px solid rgba(255,255,255,0.07)', background: isToday ? 'rgba(139,92,246,0.12)' : 'transparent', borderLeft: isToday ? '3px solid #8b3cf7' : '3px solid transparent' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontWeight:600, color: isToday ? '#fff' : '#fff', fontSize:14, ...inter }}>{day}</span>
                  {isToday && <span style={{ background:'linear-gradient(135deg,#8b3cf7,#2dd4bf)', color:'#fff', fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', padding:'2px 8px', borderRadius:999, ...inter }}>Today</span>}
                </div>
                <span style={{ color: time==='Closed' ? 'rgba(255,255,255,0.3)' : isToday ? '#2dd4bf' : 'rgba(255,255,255,0.6)', fontSize:14, fontWeight: isToday ? 600 : 400, ...inter }}>{time}</span>
              </div>
            );
          })}
        </div>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, marginTop:20, ...inter }}>❖ By appointment only. Walk-ins welcome when available.</p>
      </div>
    </section>
  );
}

/* ─── Booking ────────────────────────────────────────────────────────── */
function Booking() {
  return (
    <section id="book-now" style={{ padding:'96px 24px', background:'linear-gradient(135deg,rgba(139,92,246,0.1) 0%,rgba(13,148,136,0.08) 100%),#1e1e2e', borderTop:'1px solid rgba(139,92,246,0.12)' }}>
      <div style={{ maxWidth:680, margin:'0 auto', textAlign:'center' }}>
        <p style={{ fontSize:13, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2dd4bf', marginBottom:12, ...inter }}>Ready?</p>
        <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#fff', margin:'0 0 16px', ...fenway }}>Book Your Appointment</h2>
        <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15, lineHeight:1.7, marginBottom:40, ...inter }}>Call or text Emily directly to schedule your visit. A $25 deposit is required to secure your booking.</p>
        <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', marginBottom:32 }}>
          <a href="tel:6139298711" style={{ background:'linear-gradient(135deg,#0d9488,#0f766e)', color:'#fff', padding:'16px 40px', borderRadius:999, textDecoration:'none', fontWeight:700, fontSize:16, boxShadow:'0 8px 24px rgba(13,148,136,0.35)', ...inter }}>📞 Call (613) 929-8711</a>
          <a href="sms:6139298711" style={{ background:'rgba(139,92,246,0.12)', border:'1px solid rgba(139,92,246,0.35)', color:'#fff', padding:'16px 40px', borderRadius:999, textDecoration:'none', fontWeight:600, fontSize:16, ...inter }}>💬 Send a Text</a>
        </div>
        <p style={{ color:'rgba(255,255,255,0.35)', fontSize:13, ...inter }}>Serving Amherstview, Kingston, Bath & surrounding areas.</p>
      </div>
    </section>
  );
}

/* ─── Sticky Mobile CTA ──────────────────────────────────────────────── */
function StickyMobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600 && window.innerWidth < 768);
    window.addEventListener('scroll', h);
    window.addEventListener('resize', h);
    return () => { window.removeEventListener('scroll', h); window.removeEventListener('resize', h); };
  }, []);
  if (!show) return null;
  return (
    <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:200, padding:'12px 16px', background:'rgba(30,30,46,0.97)', borderTop:'1px solid rgba(139,92,246,0.3)', backdropFilter:'blur(16px)', display:'flex', gap:8 }}>
      <a href="tel:6139298711" style={{ flex:1, textAlign:'center', background:'linear-gradient(135deg,#0d9488,#0f766e)', color:'#fff', padding:'12px', borderRadius:999, textDecoration:'none', fontWeight:700, fontSize:14, ...inter }}>📞 Call Now</a>
      <a href="sms:6139298711" style={{ flex:1, textAlign:'center', background:'rgba(139,92,246,0.2)', border:'1px solid rgba(139,92,246,0.4)', color:'#fff', padding:'12px', borderRadius:999, textDecoration:'none', fontWeight:600, fontSize:14, ...inter }}>💬 Text Us</a>
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background:'#1e1e2e', borderTop:'1px solid rgba(139,92,246,0.25)', padding:'48px 24px 32px', textAlign:'center', ...inter }}>
      <div style={{ maxWidth:800, margin:'0 auto' }}>
        <p style={{ fontSize:'1.2rem', fontWeight:700, color:'#fff', marginBottom:4, ...fenway }}>The Perfect Look By Emily</p>
        <p style={{ color:'rgba(255,255,255,0.6)', fontSize:13, marginBottom:24 }}>Emily Caird · Amherstview / Kingston, Ontario · (613) 929-8711</p>
        <div style={{ display:'flex', justifyContent:'center', gap:24, marginBottom:24, flexWrap:'wrap' }}>
          {[['#services','Services'],['#gallery','Gallery'],['#about','About'],['#hours','Hours'],['#book-now','Book Now']].map(([h,l])=>(
            <a key={l} href={h} style={{ color:'rgba(255,255,255,0.45)', textDecoration:'none', fontSize:13 }}>{l}</a>
          ))}
        </div>
        <p style={{ color:'rgba(255,255,255,0.25)', fontSize:12 }}>© 2026 The Perfect Look By Emily. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ─── Schema.org JSON-LD ─────────────────────────────────────────────── */
/* ══════════════════════════════════════
   AI CONCIERGE CHAT WIDGET
══════════════════════════════════════ */
function AIConcierge() {
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState([
    { role:'ai', text:"Hi! I'm Emily's AI Concierge. Ask me about services, pricing, availability, or booking." }
  ]);
  const [input, setInput] = React.useState('');
  const msgsRef = React.useRef<HTMLDivElement>(null);

  const reply = (q: string) => {
    const lo = q.toLowerCase();
    if (lo.includes('price') || lo.includes('cost') || lo.includes('how much'))
      return "Cuts start from $60, Balayage from $120, Men's Grooming from $35. Use our Price Estimator below for a personalised quote!";
    if (lo.includes('book') || lo.includes('appointment') || lo.includes('schedule'))
      return "Call or text Emily at (613) 929-8711 to book. A $25 deposit secures your slot. Studio is open Tue–Sat!";
    if (lo.includes('colour') || lo.includes('color') || lo.includes('balayage'))
      return "Emily is a Goldwell Colour Mastery certified specialist. Balayage from $120, Vivid Colour from $80, Correction from $150+.";
    if (lo.includes('hour') || lo.includes('open') || lo.includes('time'))
      return "Studio hours: Mon–Wed 9am–7pm, Thu 9am–8pm, Fri 9am–6pm, Sat 8am–5pm. Closed Sunday. By appointment only.";
    if (lo.includes('mobile') || lo.includes('home') || lo.includes('retirement') || lo.includes('visit'))
      return "Emily offers mobile concierge visits to your home, retirement community, or workplace across Amherstview & Kingston!";
    if (lo.includes('extension'))
      return "Emily offers tape-in, micro-link, clip-in, and halo extensions. All colour-matched and damage-free. Book a consultation!";
    if (lo.includes('location') || lo.includes('address') || lo.includes('where'))
      return "The studio is in Amherstview, Ontario (exact address given on booking). Emily also does mobile visits across Kingston area!";
    return "Great question! For full details I recommend booking a free consultation with Emily. Call (613) 929-8711 or scroll to Book Now!";
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role:'user', text: input };
    const aiMsg  = { role:'ai',  text: reply(input) };
    setMsgs(prev => [...prev, userMsg, aiMsg]);
    setInput('');
    setTimeout(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight; }, 50);
  };

  return (
    <div style={{ position:'fixed', bottom:'2rem', right:'2rem', zIndex:999 }}>
      {/* Chat panel */}
      {open && (
        <div style={{ position:'absolute', bottom:'5rem', right:0, width:320,
          background:'#0d0d1a', border:'1px solid rgba(139,92,246,0.3)',
          borderRadius:20, overflow:'hidden',
          boxShadow:'0 20px 60px rgba(0,0,0,0.8)', fontFamily:"'Inter',system-ui,sans-serif" }}>
          {/* Header */}
          <div style={{ padding:'14px 18px', background:'linear-gradient(135deg,rgba(139,92,246,0.25),rgba(13,148,136,0.15))',
            borderBottom:'1px solid rgba(255,255,255,0.08)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontWeight:700, fontSize:13, color:'#fff' }}>AI Concierge</div>
              <div style={{ fontSize:11, color:'#2dd4bf' }}>● Online — Emily's Studio</div>
            </div>
            <button onClick={() => setOpen(false)}
              style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:18, lineHeight:1 }}>×</button>
          </div>
          {/* Messages */}
          <div ref={msgsRef} style={{ height:260, overflowY:'auto', padding:12, display:'flex', flexDirection:'column', gap:8 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ maxWidth:'85%', padding:'10px 13px', borderRadius:12, fontSize:13, lineHeight:1.5,
                alignSelf: m.role==='user' ? 'flex-end' : 'flex-start',
                background: m.role==='user' ? 'rgba(13,148,136,0.2)' : 'rgba(139,92,246,0.15)',
                border: m.role==='user' ? '1px solid rgba(13,148,136,0.3)' : '1px solid rgba(139,92,246,0.25)',
                color:'rgba(255,255,255,0.9)' }}>
                {m.text}
              </div>
            ))}
          </div>
          {/* Input */}
          <div style={{ display:'flex', gap:8, padding:'10px 12px', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key==='Enter' && send()}
              placeholder="Ask anything..."
              style={{ flex:1, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:999, padding:'8px 14px', color:'#fff', fontSize:13, outline:'none', fontFamily:"'Inter',system-ui,sans-serif" }} />
            <button onClick={send}
              style={{ padding:'8px 16px', background:'linear-gradient(135deg,#8b3cf7,#0d9488)',
                border:'none', borderRadius:999, color:'#fff', cursor:'pointer', fontSize:13, fontWeight:600 }}>Send</button>
          </div>
        </div>
      )}
      {/* Trigger button */}
      <button onClick={() => setOpen(o => !o)}
        style={{ width:56, height:56, borderRadius:'50%',
          background: open ? 'linear-gradient(135deg,#0d9488,#0f766e)' : 'linear-gradient(135deg,#8b3cf7,#7c3aed)',
          border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:24, boxShadow:'0 8px 32px rgba(139,92,246,0.5)', transition:'all .3s' }}
        title="AI Concierge">
        {open ? '×' : '🤖'}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════
   PRICE WIZARD (2-question estimator)
══════════════════════════════════════ */
function PriceWizard() {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<string[]>([]);

  const questions = [
    { q:"What is your colour history?",
      opts:["Virgin / no colour","Professional colour only","Box dye in the last 6 months","Not sure"] },
    { q:"What is your hair length?",
      opts:["Short (above chin)","Medium (chin to shoulder)","Long (below shoulder)","Extra Long (mid-back+)"] },
  ];

  const getResult = (ans: string[]) => {
    if (ans[0]==="Box dye in the last 6 months")
      return { price:"From $280+", time:"~4–5 hrs", label:"Colour Correction Required" };
    if (ans[1]==="Long (below shoulder)" || ans[1]==="Extra Long (mid-back+)")
      return { price:"From $160", time:"~3 hrs",   label:"Extended Service" };
    return { price:"From $120", time:"~2 hrs",    label:"Standard Colour Service" };
  };

  const pick = (opt: string) => {
    const next = [...answers, opt];
    setAnswers(next);
    if (next.length < questions.length) setStep(next.length);
    else setStep(questions.length);
  };

  const reset = () => { setStep(0); setAnswers([]); };
  const result = answers.length === questions.length ? getResult(answers) : null;

  return (
    <section style={{ padding:'80px 24px', background:'linear-gradient(135deg,rgba(139,92,246,0.06),rgba(13,148,136,0.04)),#0d0d1a',
      borderTop:'1px solid rgba(139,92,246,0.12)' }}>
      <div style={{ maxWidth:680, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <p style={{ fontSize:12, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase',
            color:'#2dd4bf', marginBottom:8, fontFamily:"'Inter',system-ui,sans-serif" }}>AI Pricing</p>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:700, color:'#fff',
            margin:'0 0 12px', fontFamily:"'FenwayPark','Playfair Display',Georgia,serif" }}>Smart Price Estimator</h2>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:15, fontFamily:"'Inter',system-ui,sans-serif" }}>
            Answer 2 quick questions — get an instant estimate
          </p>
        </div>
        <div style={{ background:'rgba(255,255,255,0.04)', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)',
          border:'1px solid rgba(139,92,246,0.25)', borderRadius:20, padding:'2.5rem' }}>
          {result ? (
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>✨</div>
              <h3 style={{ fontFamily:"'FenwayPark','Playfair Display',serif", fontSize:'1.2rem', color:'#fff', marginBottom:8 }}>Your Estimate</h3>
              <div style={{ fontFamily:"'FenwayPark','Playfair Display',serif", fontSize:'2.4rem', color:'#e5b869', margin:'12px 0 6px' }}>{result.price}</div>
              <div style={{ color:'#2dd4bf', fontSize:15, marginBottom:6, fontFamily:"'Inter',system-ui,sans-serif" }}>{result.time}</div>
              <div style={{ fontSize:12, letterSpacing:'0.12em', textTransform:'uppercase',
                color:'rgba(255,255,255,0.5)', marginBottom:'2rem', fontFamily:"'Inter',system-ui,sans-serif" }}>{result.label}</div>
              <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
                <a href="#book-now" style={{ background:'linear-gradient(135deg,#0d9488,#0f766e)', color:'#fff',
                  padding:'12px 28px', borderRadius:999, textDecoration:'none', fontWeight:700, fontFamily:"'Inter',system-ui,sans-serif" }}>Book This Service</a>
                <button onClick={reset} style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.15)',
                  color:'#fff', padding:'12px 28px', borderRadius:999, cursor:'pointer', fontFamily:"'Inter',system-ui,sans-serif" }}>Start Over</button>
              </div>
            </div>
          ) : (
            <div>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase',
                color:'#2dd4bf', textAlign:'center', marginBottom:16, fontFamily:"'Inter',system-ui,sans-serif" }}>
                Question {step + 1} of {questions.length}
              </p>
              <p style={{ fontFamily:"'FenwayPark','Playfair Display',serif", fontSize:'1.3rem', fontStyle:'italic',
                color:'rgba(255,255,255,0.9)', marginBottom:'1.5rem', textAlign:'center' }}>
                {questions[step].q}
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {questions[step].opts.map(opt => (
                  <button key={opt} onClick={() => pick(opt)}
                    style={{ padding:'14px 20px', background:'rgba(255,255,255,0.05)',
                      border:'1px solid rgba(139,92,246,0.2)', borderRadius:12,
                      cursor:'pointer', color:'rgba(255,255,255,0.85)', fontSize:15, textAlign:'left',
                      transition:'all .2s', fontFamily:"'Inter',system-ui,sans-serif" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(139,92,246,0.15)'; (e.currentTarget as HTMLButtonElement).style.borderColor='rgba(139,92,246,0.4)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(255,255,255,0.05)'; (e.currentTarget as HTMLButtonElement).style.borderColor='rgba(139,92,246,0.2)'; }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   VIBE SETTER (style discovery)
══════════════════════════════════════ */
function VibeSetter() {
  const [selected, setSelected] = React.useState<string|null>(null);
  const vibes = [
    { emoji:'🌿', name:'Natural & Effortless',   rec:'Lived-in Balayage + Scalp Treatment' },
    { emoji:'✨', name:'Polished & Refined',      rec:'Precision Cut + Keratin Smooth' },
    { emoji:'🔥', name:'Bold & Dramatic',         rec:'Full Colour Transformation + Cut' },
    { emoji:'🌸', name:'Soft & Romantic',         rec:'Soft Balayage + Wave Styling' },
    { emoji:'🖤', name:'Edgy & Modern',           rec:'Colour Correction + Geometric Cut' },
    { emoji:'👑', name:'Classic Luxury',          rec:'Signature Cut + Scalp Spa' },
  ];
  return (
    <section style={{ padding:'80px 24px', background:'#0d0d1a', borderTop:'1px solid rgba(229,184,105,0.1)' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <p style={{ fontSize:12, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase',
            color:'#e5b869', marginBottom:8, fontFamily:"'Inter',system-ui,sans-serif" }}>Style Discovery</p>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:700, color:'#fff',
            margin:'0 0 12px', fontFamily:"'FenwayPark','Playfair Display',Georgia,serif" }}>Find Your Vibe</h2>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:15, fontFamily:"'Inter',system-ui,sans-serif" }}>
            Pick your aesthetic — we'll curate the perfect service for you
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:16 }}>
          {vibes.map(v => (
            <div key={v.name} onClick={() => setSelected(v.name)}
              style={{ background: selected===v.name ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.04)',
                backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)',
                border: selected===v.name ? '2px solid #8b3cf7' : '1px solid rgba(139,92,246,0.2)',
                borderRadius:16, padding:'1.5rem 1rem', textAlign:'center', cursor:'pointer', transition:'all .25s' }}>
              <div style={{ fontSize:'2.4rem', marginBottom:10 }}>{v.emoji}</div>
              <div style={{ fontFamily:"'FenwayPark','Playfair Display',serif", fontSize:'.85rem',
                color:'#fff', fontWeight:600 }}>{v.name}</div>
            </div>
          ))}
        </div>
        {selected && (
          <div style={{ marginTop:'2rem', textAlign:'center', animation:'fadeUp .4s ease' }}>
            <div style={{ background:'rgba(255,255,255,0.04)', backdropFilter:'blur(14px)',
              border:'1px solid rgba(139,92,246,0.3)', borderRadius:16, padding:'2rem',
              maxWidth:480, margin:'0 auto' }}>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase',
                color:'#2dd4bf', marginBottom:10, fontFamily:"'Inter',system-ui,sans-serif" }}>Recommended for You</p>
              <p style={{ fontFamily:"'FenwayPark','Playfair Display',serif", fontSize:'1.15rem',
                color:'#fff', marginBottom:'1.5rem' }}>
                {vibes.find(v => v.name===selected)?.rec}
              </p>
              <a href="#book-now" style={{ background:'linear-gradient(135deg,#8b3cf7,#7c3aed)', color:'#fff',
                padding:'12px 28px', borderRadius:999, textDecoration:'none',
                fontWeight:700, fontFamily:"'Inter',system-ui,sans-serif" }}>Book This Look</a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════ */
function FAQ() {
  const [openIdx, setOpenIdx] = React.useState<number|null>(null);
  const faqs = [
    { q:"What areas do you serve?",
      a:"The private studio is in Amherstview, Ontario — exact address provided on booking. Emily also does mobile visits across Kingston, Bath, Napanee & surrounding areas." },
    { q:"How do I book an appointment?",
      a:"Call or text Emily at (613) 929-8711 to schedule. A $25 deposit is required to hold your slot. You can also use the Price Estimator on this page to get an estimate first." },
    { q:"Do you offer colour correction?",
      a:"Yes — Emily specialises in complex colour corrections. These require a paid consultation ($50) to assess the work and build a safe plan. Correction pricing starts from $80–100/hr." },
    { q:"What products do you use?",
      a:"Emily uses premium professional products including Goldwell, Olaplex, K18, Aveda, and Davines — selected for performance, quality, and clean beauty standards." },
    { q:"Is the studio truly private?",
      a:"100% private. You will never share the space with other clients. No distractions — just undivided attention from Emily start to finish." },
    { q:"Do you do mobile retirement home visits?",
      a:"Absolutely — this is one of Emily's specialties. She brings all equipment and provides the same quality service at retirement homes, LTC facilities, and private residences." },
    { q:"How do I prepare for a colour service?",
      a:"Come with day-old hair (not freshly washed). Bring inspiration photos if you have them. For colour corrections, avoid heavy products. Emily will guide you through everything." },
  ];
  return (
    <section id="faq" style={{ padding:'80px 24px',
      background:'linear-gradient(135deg,rgba(13,148,136,0.04),rgba(139,92,246,0.04)),#0d0d1a',
      borderTop:'1px solid rgba(13,148,136,0.1)' }}>
      <div style={{ maxWidth:760, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <p style={{ fontSize:12, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase',
            color:'#2dd4bf', marginBottom:8, fontFamily:"'Inter',system-ui,sans-serif" }}>FAQs</p>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:700, color:'#fff',
            margin:0, fontFamily:"'FenwayPark','Playfair Display',Georgia,serif" }}>Questions Answered</h2>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.04)', backdropFilter:'blur(14px)',
              border:'1px solid rgba(139,92,246,0.2)', borderRadius:12, overflow:'hidden' }}>
              <div onClick={() => setOpenIdx(openIdx===i ? null : i)}
                style={{ padding:'18px 22px', cursor:'pointer', display:'flex',
                  justifyContent:'space-between', alignItems:'center',
                  fontFamily:"'FenwayPark','Playfair Display',serif", fontSize:'.95rem', color:'#fff' }}>
                {faq.q}
                <span style={{ color:'#2dd4bf', fontSize:'1.3rem', lineHeight:1,
                  transform: openIdx===i ? 'rotate(45deg)' : 'none', transition:'transform .25s', flexShrink:0, marginLeft:12 }}>+</span>
              </div>
              {openIdx===i && (
                <div style={{ padding:'0 22px 18px', color:'rgba(255,255,255,0.65)',
                  fontSize:14, lineHeight:1.75, fontFamily:"'Inter',system-ui,sans-serif" }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════ */
function BackToTop() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const h = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
      title="Back to top"
      style={{ position:'fixed', bottom:'5.5rem', right:'2rem', zIndex:998,
        width:44, height:44, borderRadius:'50%',
        background:'rgba(139,92,246,0.25)', border:'1px solid rgba(139,92,246,0.4)',
        color:'#fff', cursor:'pointer', fontSize:'1.1rem',
        display:'flex', alignItems:'center', justifyContent:'center',
        backdropFilter:'blur(8px)', transition:'all .3s' }}>
      ↑
    </button>
  );
}

function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "The Perfect Look By Emily",
    "description": "Luxury private hair salon in Amherstview, Ontario. Goldwell-certified colour, precision cuts, extensions, and mobile concierge service.",
    "url": "https://theperfectlookbyemily.ca",
    "telephone": "+16139298711",
    "image": "https://theperfectlookbyemily.ca/images/1000011101.jpg",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Amherstview",
      "addressRegion": "ON",
      "addressCountry": "CA"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 44.2254, "longitude": -76.6714 },
    "openingHoursSpecification": [
      { "@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday"],"opens":"09:00","closes":"19:00" },
      { "@type":"OpeningHoursSpecification","dayOfWeek":["Thursday"],"opens":"09:00","closes":"20:00" },
      { "@type":"OpeningHoursSpecification","dayOfWeek":["Friday"],"opens":"09:00","closes":"18:00" },
      { "@type":"OpeningHoursSpecification","dayOfWeek":["Saturday"],"opens":"08:00","closes":"17:00" }
    ],
    "sameAs": ["https://www.instagram.com/theperfectlookbyemily"]
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/* ─── Scroll Reveal Provider ─────────────────────────────────────────── */
function ScrollRevealProvider() {
  useReveal();
  return null;
}

/* ─── App ────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <main style={{ background:'#0d0d1a', color:'#fff', minHeight:'100vh', fontFamily:"'Inter',system-ui,sans-serif" }}>
        <SchemaMarkup />
        <ScrollRevealProvider />
        <Nav />
        <Hero />
        <ComingSoon />
        <Services />
        <GoldwellSuite />
        <Portfolio />
        <About />
        <Testimonials />
        <MobileConcierge />
        <PriceWizard />
        <VibeSetter />
        <Hours />
        <FAQ />
        <Booking />
        <Footer />
        <StickyMobileCTA />
        <AIConcierge />
        <BackToTop />
      </main>
    </>
  );
}
