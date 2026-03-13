'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/* ─── Design Tokens ──────────────────────────────────────────────────────── */
const C = {
  bg:       '#1e1e2e',
  bgCard:   'rgba(30,30,46,0.95)',
  purple:   '#8b3cf7',
  purpleD:  '#7c3aed',
  teal:     '#0d9488',
  tealL:    '#2dd4bf',
  gold:     '#e5b869',
  white:    '#ffffff',
  gray:     'rgba(255,255,255,0.6)',
  grayD:    'rgba(255,255,255,0.15)',
  border:   'rgba(139,92,246,0.25)',
} as const;

const fenway: React.CSSProperties = { fontFamily: "'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" };
const raleway: React.CSSProperties = { fontFamily: "'Raleway','Inter',system-ui,sans-serif" };
const inter: React.CSSProperties = { fontFamily: "'Inter',system-ui,sans-serif" };

/* ─── Glass Card Style ──────────────────────────────────────────────────── */
const glassCard: React.CSSProperties = {
  background: 'rgba(139,92,246,0.07)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(139,92,246,0.28)',
  borderRadius: 16,
};

const goldCard: React.CSSProperties = {
  background: 'rgba(229,184,105,0.06)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(229,184,105,0.30)',
  borderRadius: 16,
};

/* ─── Portfolio Images ───────────────────────────────────────────────────── */
const PORTFOLIO = [
  { file:'1000011101.jpg', label:'Balayage & Colour',  span:2 },
  { file:'1000022978.jpg', label:'Precision Cut',      span:1 },
  { file:'1000010835.jpg', label:'Vivid Colour',       span:1 },
  { file:'1000019345.jpg', label:'Highlights',         span:2 },
  { file:'1000010712.jpg', label:'Ombré Colour',       span:1 },
  { file:'1000009971.jpg', label:'Full Colour',        span:1 },
  { file:'1000010201.jpg', label:'Creative Colour',    span:1 },
  { file:'1000010413.jpg', label:'Bridal Updo',        span:1 },
  { file:'1000010575.jpg', label:'Colour Correction',  span:2 },
];

/* ─── Particle Canvas ────────────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let rafId: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const N = 55;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      a: Math.random() * 0.5 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(rafId); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0 }} />;
}

/* ─── Nav ────────────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const navStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: 64,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 2rem',
    background: scrolled ? 'rgba(30,30,46,0.90)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(139,92,246,0.20)' : 'none',
    transition: 'all 0.35s ease',
  };
  return (
    <nav style={navStyle} role="navigation" aria-label="Main navigation">
      <a href="#hero" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
        <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#8b3cf7,#0d9488)', display:'flex', alignItems:'center', justifyContent:'center', ...fenway, fontSize:18, color:'#fff', flexShrink:0 }}>E</div>
        <span style={{ ...raleway, fontWeight:600, fontSize:'1rem', color:'#f0eaf8', letterSpacing:'0.02em' }}>The Perfect Look By Emily</span>
      </a>
      <div style={{ display:'flex', alignItems:'center', gap:'1.5rem' }}>
        {([['Services','#services'],['Gallery','#gallery'],['Lookbook','#lookbook'],['About','#about'],['Membership','#membership'],['Book Now','#book-now']]).map(([label, href]: string[]) => (
          <a key={label} href={href} style={{ ...raleway, color:'rgba(240,234,248,0.80)', fontSize:'0.875rem', fontWeight:500, textDecoration:'none', letterSpacing:'0.03em', transition:'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#a855f7')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,234,248,0.80)')}>{label}</a>
        ))}
        <a href="tel:6139298711" style={{ ...raleway, background:'#8b3cf7', color:'#fff', padding:'0.45rem 1.1rem', borderRadius:20, fontSize:'0.85rem', fontWeight:600, textDecoration:'none', letterSpacing:'0.03em', transition:'background 0.2s, box-shadow 0.2s', boxShadow:'0 0 0 0 rgba(139,92,246,0)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#7c3aed'; (e.currentTarget as HTMLElement).style.boxShadow='0 0 16px 4px rgba(139,92,246,0.4)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#8b3cf7'; (e.currentTarget as HTMLElement).style.boxShadow='0 0 0 0 rgba(139,92,246,0)'; }}>(613) 929-8711</a>
      </div>
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */

/* ═══ HERO (with count-up) ════════════════════════════════════ */
function Hero() {
  const [statsVis, setStatsVis] = React.useState(false);
  const statsRef = React.useRef<HTMLDivElement>(null);
  const yrs  = useCountUp(25, 1600, statsVis);
  const revs = useCountUp(47, 1600, statsVis);

  React.useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVis(true); }, { threshold:0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="hero" style={{ position:'relative',minHeight:'92vh',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',background:C.bg }}>
      <ParticleCanvas />
      <div style={{ position:'absolute',inset:0,background:`radial-gradient(ellipse 80% 60% at 50% 40%,${C.purple}18 0%,transparent 70%)`,pointerEvents:'none' }} />
      <div style={{ position:'relative',zIndex:1,textAlign:'center',padding:'120px 24px 80px',maxWidth:860,margin:'0 auto' }}>
        <div style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'8px 20px',borderRadius:100,border:`1px solid ${C.purple}40`,background:`${C.purple}12`,marginBottom:28 }}>
          <span style={{ ...raleway,color:C.gray,fontSize:12,letterSpacing:3,textTransform:'uppercase' }}>Amherstview · Kingston, Ontario</span>
        </div>
        <h1 style={{ ...fenway,fontSize:'clamp(3.2rem,9vw,6.5rem)',color:C.white,lineHeight:1.05,marginBottom:12 }}>The Perfect Look</h1>
        <p style={{ ...fenway,fontSize:'clamp(1.4rem,3.5vw,2.2rem)',color:C.teal,fontStyle:'italic',marginBottom:28 }}>By Emily</p>
        <p style={{ ...raleway,color:'rgba(240,234,248,0.75)',maxWidth:560,margin:'0 auto 2.5rem',lineHeight:1.7 }}>
          25+ years of Goldwell-certified colour mastery, bespoke cuts, and luxury extension installations. Private studio in Amherstview — and mobile care that comes to you.
        </p>
        <div style={{ display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap',marginBottom:'3rem' }}>
          <a href="#book-now" style={{ display:'inline-block',padding:'16px 36px',borderRadius:100,background:`linear-gradient(135deg,${C.purple},${C.teal})`,color:C.white,fontWeight:700,fontSize:16,textDecoration:'none',boxShadow:`0 8px 32px ${C.purple}40`,...raleway }}>Book Your Appointment</a>
          <a href="#gallery" style={{ display:'inline-block',padding:'16px 32px',borderRadius:100,...glassCard,color:C.white,fontWeight:600,fontSize:16,textDecoration:'none',...raleway }}>View Gallery</a>
        </div>
        <div ref={statsRef} style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',maxWidth:600,margin:'0 auto',...glassCard,borderRadius:20,overflow:'hidden' }}>
          {[
            { val: yrs + '+',           label:'YEARS EXPERIENCE', col:C.purple },
            { val: '⭐ 5.0',             label:`${revs} REVIEWS`,  col:C.gold },
            { val: 'Goldwell',          label:'CERTIFIED',         col:C.teal },
            { val: 'Mobile',            label:'CARE AVAILABLE',    col:C.tealL },
          ].map((st,i) => (
            <div key={st.label} style={{ padding:'20px 8px',textAlign:'center',borderRight:i<3?`1px solid ${C.border}`:'none' }}>
              <div style={{ ...raleway,color:st.col,fontWeight:800,fontSize:'clamp(0.9rem,2.5vw,1.3rem)',marginBottom:4 }}>{st.val}</div>
              <div style={{ ...raleway,color:C.gray,fontSize:9,letterSpacing:1.5,textTransform:'uppercase' }}>{st.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComingSoon() {
  return (
    <div style={{ background:'linear-gradient(90deg,rgba(229,184,105,0.08),rgba(229,184,105,0.14),rgba(229,184,105,0.08))', borderTop:'1px solid rgba(229,184,105,0.20)', borderBottom:'1px solid rgba(229,184,105,0.20)', padding:'1rem 2rem', display:'flex', justifyContent:'center', alignItems:'center', gap:'1rem', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)' }}>
      <span style={{ fontSize:'1.3rem' }}>🏗️</span>
      <div>
        <span style={{ ...raleway, fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.15em', color:C.gold, textTransform:'uppercase' }}>Coming Soon</span>
        <span style={{ ...raleway, fontSize:'0.95rem', color:C.white, fontWeight:500, marginLeft:12 }}>Dedicated Garage Salon Transformation — Amherstview, Ontario</span>
      </div>
      <span style={{ ...raleway, fontSize:'0.75rem', fontWeight:700, background:'rgba(229,184,105,0.15)', border:'1px solid rgba(229,184,105,0.35)', color:C.gold, padding:'0.25rem 0.65rem', borderRadius:12, backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)' }}>2026</span>
    </div>
  );
}

/* ─── Services ───────────────────────────────────────────────────────────── */
const SERVICES = [
  { icon:'✂️',  title:'Precision Cuts',           desc:'Sculpted bobs, textured layers, and custom shapes tailored to your face and lifestyle.', price:'From $60', style:glassCard },
  { icon:'🎨',  title:'Balayage & Colour',         desc:'Hand-painted sun-kissed tones, rich glosses, and dimensional highlights.', price:'From $120', style:glassCard },
  { icon:'✨',  title:'Vivid & Creative Colour',   desc:'Bold fantasy colours — from pastel lavender to deep ocean teal — expertly formulated.', price:'Custom Quote', style:glassCard },
  { icon:'💍',  title:'Bridal & Special Occasion', desc:'Bespoke wedding hair and event styling with pearl pins, braids, and elegant updos.', price:'From $150', style:glassCard },
  { icon:'🏠',  title:'Mobile Concierge',          desc:'Emily comes to your home, retirement residence, or facility. Full service, zero travel stress.', price:'Call for Quote', style:glassCard },
  { icon:'🧔',  title:"Men\'s Grooming",           desc:'Precision fades, textured crops, and classic barbershop-style cuts for all hair types.', price:'From $35', style:glassCard },
];


/* ═══ SERVICES (with hover lift) ═════════════════════════════ */
function Services() {
  const [hov, setHov] = React.useState<number|null>(null);
  return (
    <section id="services" style={{ background:C.bg, padding:'100px 24px' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <p style={{ ...raleway,color:C.teal,letterSpacing:4,fontSize:12,textTransform:'uppercase',textAlign:'center',marginBottom:12 }}>WHAT WE DO</p>
        <h2 style={{ ...fenway,fontSize:'clamp(2rem,5vw,3.2rem)',color:C.white,textAlign:'center',marginBottom:52 }}>Services Menu</h2>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:20 }}>
          {SERVICES.map((sv,i) => (
            <div key={sv.title}
              onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
              style={{
                ...glassCard, padding:'32px 28px', borderRadius:20,
                border:`1px solid ${hov===i?C.purple+'60':C.border}`,
                transform:hov===i?'translateY(-7px) scale(1.015)':'translateY(0) scale(1)',
                boxShadow:hov===i?`0 24px 60px ${C.purple}28`:glassCard.boxShadow,
                backdropFilter:hov===i?'blur(22px)':'blur(14px)',
                transition:'all 0.28s cubic-bezier(0.34,1.56,0.64,1)',
              }}>
              <div style={{ fontSize:28,marginBottom:16 }}>{sv.icon}</div>
              <h3 style={{ ...raleway,color:C.white,fontWeight:700,fontSize:'1.1rem',marginBottom:10 }}>{sv.title}</h3>
              <p style={{ ...raleway,color:C.gray,fontSize:14,lineHeight:1.65,marginBottom:20 }}>{sv.desc}</p>
              <span style={{
                display:'inline-block',padding:'6px 16px',borderRadius:100,
                background:hov===i?`${C.purple}30`:`${C.gold}18`,
                border:`1px solid ${hov===i?C.purple+'50':C.gold+'40'}`,
                color:hov===i?C.tealL:C.gold, fontSize:13, fontWeight:700, ...raleway,
                transition:'all 0.25s',
              }}>{sv.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoldwellSuite() {
  return (
    <section id="goldwell" style={{ padding:'5rem 1.5rem', background:'#1e1e2e', borderTop:'1px solid rgba(229,184,105,0.12)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <p style={{ ...raleway, textAlign:'center', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.15em', color:C.gold, textTransform:'uppercase', marginBottom:'0.75rem' }}>✦ Premium Offerings ✦</p>
        <h2 style={{ ...fenway, textAlign:'center', fontSize:'clamp(2rem,5vw,3rem)', color:C.white, marginBottom:'0.75rem', fontWeight:700 }}>The Goldwell Suite</h2>
        <p style={{ ...raleway, textAlign:'center', color:C.gray, fontSize:'1rem', marginBottom:'3.5rem', maxWidth:560, margin:'0 auto 3.5rem' }}>Exclusive treatments reserved for clients who demand the absolute finest in colour science and hair engineering.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(380px,1fr))', gap:'2rem' }}>
          <div style={{ ...goldCard, padding:'2.5rem', transition:'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 16px 48px rgba(229,184,105,0.18)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=''; (e.currentTarget as HTMLElement).style.boxShadow=''; }}>
            <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
              <div style={{ width:56, height:56, borderRadius:14, background:'rgba(229,184,105,0.15)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', border:'1px solid rgba(229,184,105,0.30)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem' }}>🏆</div>
              <div>
                <p style={{ ...raleway, fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.12em', color:C.gold, textTransform:'uppercase', margin:0 }}>Goldwell Certified</p>
                <h3 style={{ ...raleway, fontSize:'1.4rem', fontWeight:800, color:C.white, margin:0 }}>Colour Mastery</h3>
              </div>
            </div>
            <p style={{ ...raleway, color:C.gray, lineHeight:1.75, marginBottom:'1.5rem' }}>Emily holds Goldwell Colour Mastery certification — the highest level of colour artistry training in the professional hair industry. Every formula is precision-mixed for your unique hair history, porosity, and goal.</p>
            <ul style={{ listStyle:'none', padding:0, margin:'0 0 1.8rem', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
              {['Balayage & foil work','Full colour transformation','Vivid fashion shades','Grey blending & toning','Gloss treatments'].map(item => (
                <li key={item} style={{ ...raleway, color:C.gray, fontSize:'0.9rem', display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ color:C.tealL, fontSize:'0.85rem' }}>✓</span> {item}
                </li>
              ))}
            </ul>
            <a href="#book-now" style={{ ...raleway, display:'inline-block', background:'transparent', border:'1px solid rgba(229,184,105,0.50)', color:C.gold, padding:'0.65rem 1.4rem', borderRadius:20, fontSize:'0.875rem', fontWeight:600, textDecoration:'none', transition:'background 0.2s, box-shadow 0.2s', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(229,184,105,0.12)'; (e.currentTarget as HTMLElement).style.boxShadow='0 0 16px rgba(229,184,105,0.25)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.boxShadow='none'; }}>
              Book a Colour Consultation →
            </a>
          </div>
          <div style={{ ...goldCard, padding:'2.5rem', transition:'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 16px 48px rgba(229,184,105,0.18)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=''; (e.currentTarget as HTMLElement).style.boxShadow=''; }}>
            <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
              <div style={{ width:56, height:56, borderRadius:14, background:'rgba(139,92,246,0.15)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', border:'1px solid rgba(139,92,246,0.30)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem' }}>💎</div>
              <div>
                <p style={{ ...raleway, fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.12em', color:C.gold, textTransform:'uppercase', margin:0 }}>Goldwell Extensions</p>
                <h3 style={{ ...raleway, fontSize:'1.4rem', fontWeight:800, color:C.white, margin:0 }}>Luxury Installations</h3>
              </div>
            </div>
            <p style={{ ...raleway, color:C.gray, lineHeight:1.75, marginBottom:'1.5rem' }}>Seamlessly blended, damage-free extension installations using premium Goldwell-aligned hair. From subtle length to dramatic volume — each strand is colour-matched and bonded with precision.</p>
            <ul style={{ listStyle:'none', padding:0, margin:'0 0 1.8rem', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
              {['Tape-in extensions','Micro-link (I-tip) bonds','Clip-in custom sets','Halo extensions','Maintenance & removal'].map(item => (
                <li key={item} style={{ ...raleway, color:C.gray, fontSize:'0.9rem', display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ color:C.tealL, fontSize:'0.85rem' }}>✓</span> {item}
                </li>
              ))}
            </ul>
            <a href="#book-now" style={{ ...raleway, display:'inline-block', background:'transparent', border:'1px solid rgba(139,92,246,0.50)', color:'#a855f7', padding:'0.65rem 1.4rem', borderRadius:20, fontSize:'0.875rem', fontWeight:600, textDecoration:'none', transition:'background 0.2s, box-shadow 0.2s', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(139,92,246,0.12)'; (e.currentTarget as HTMLElement).style.boxShadow='0 0 16px rgba(139,92,246,0.25)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.boxShadow='none'; }}>
              Book Extension Consultation →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Portfolio ──────────────────────────────────────────────────────────── */
function Portfolio() {
  const [lightbox, setLightbox] = useState<number|null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight' && lightbox !== null) setLightbox((lightbox + 1) % PORTFOLIO.length);
      if (e.key === 'ArrowLeft'  && lightbox !== null) setLightbox((lightbox - 1 + PORTFOLIO.length) % PORTFOLIO.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <section id="gallery" style={{ padding:'5rem 1.5rem', background:'linear-gradient(180deg,rgba(30,30,46,1) 0%,rgba(20,20,35,1) 100%)' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <p style={{ ...raleway, textAlign:'center', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.15em', color:C.tealL, textTransform:'uppercase', marginBottom:'0.75rem' }}>Our Work</p>
        <h2 style={{ ...fenway, textAlign:'center', fontSize:'clamp(2rem,5vw,3rem)', color:C.white, marginBottom:'0.75rem', fontWeight:700 }}>❖ From Our Chair: Real Transformations ❖</h2>
        <p style={{ ...raleway, textAlign:'center', color:C.gray, fontSize:'1rem', marginBottom:'3rem', maxWidth:500, margin:'0 auto 3rem' }}>Precision colour, bespoke cuts, and transformations crafted with 25+ years of expertise.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem' }}>
          {PORTFOLIO.map((img, i) => (
            <div key={img.file} style={{ gridColumn: img.span === 2 ? 'span 2' : 'span 1', borderRadius:16, overflow:'hidden', cursor:'pointer', position:'relative', aspectRatio:'16/10', transition:'transform 0.2s, box-shadow 0.2s' }}
              onClick={() => setLightbox(i)}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='scale(1.02)'; (e.currentTarget as HTMLElement).style.boxShadow='0 16px 48px rgba(0,0,0,0.6)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=''; (e.currentTarget as HTMLElement).style.boxShadow=''; }}>
              <Image src={"/images/" + img.file} alt={img.label + " — by Emily Caird, Amherstview Ontario"} fill style={{ objectFit:'cover' }} sizes="(max-width:768px) 100vw, 40vw" />
              <div style={{ position:'absolute', bottom:8, left:8, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', padding:'0.2rem 0.6rem', borderRadius:8, ...raleway, fontSize:'0.7rem', fontWeight:600, color:C.tealL, letterSpacing:'0.08em', textTransform:'uppercase' }}>{img.label}</div>
              <div style={{ position:'absolute', bottom:8, right:8, background:'rgba(0,0,0,0.40)', backdropFilter:'blur(4px)', WebkitBackdropFilter:'blur(4px)', padding:'0.2rem 0.6rem', borderRadius:8, ...raleway, fontSize:'0.65rem', color:'rgba(255,255,255,0.7)' }}>Click to expand</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:'2.5rem', display:'flex', justifyContent:'center' }}>
          <div style={{ ...goldCard, padding:'0.9rem 2rem 0.9rem 1.2rem', display:'flex', alignItems:'center', gap:'1rem', maxWidth:520, width:'100%' }}>
            <span style={{ fontSize:'1.5rem' }}>📸</span>
            <div style={{ flex:1 }}>
              <p style={{ ...raleway, margin:0, fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', color:C.gold, textTransform:'uppercase' }}>Follow Along</p>
              <p style={{ ...raleway, margin:0, fontSize:'1rem', fontWeight:700, color:C.white }}>@theperfectlookbyemily</p>
              <p style={{ ...raleway, margin:0, fontSize:'0.8rem', color:C.gray }}>See the latest transformations as they happen.</p>
            </div>
            <a href="https://www.instagram.com/theperfectlookbyemily" target="_blank" rel="noopener noreferrer" style={{ ...raleway, background:'linear-gradient(135deg,#f97316,#ec4899)', color:'#fff', padding:'0.65rem 1.3rem', borderRadius:20, fontSize:'0.85rem', fontWeight:700, textDecoration:'none', whiteSpace:'nowrap', flexShrink:0 }}>Follow on Instagram</a>
          </div>
        </div>
      </div>
      {lightbox !== null && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.92)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)' }} onClick={() => setLightbox(null)}>
          <button onClick={e => { e.stopPropagation(); setLightbox((lightbox-1+PORTFOLIO.length)%PORTFOLIO.length); }} style={{ position:'absolute', left:16, background:'rgba(255,255,255,0.12)', border:'none', color:'#fff', fontSize:'2rem', cursor:'pointer', padding:'0.5rem 1rem', borderRadius:12, backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)' }}>←</button>
          <div style={{ position:'relative', width:'min(90vw,900px)', height:'min(80vh,650px)', borderRadius:20, overflow:'hidden' }} onClick={e => e.stopPropagation()}>
            <Image src={"/images/" + PORTFOLIO[lightbox].file} alt={PORTFOLIO[lightbox].label} fill style={{ objectFit:'contain' }} sizes="90vw" />
          </div>
          <button onClick={e => { e.stopPropagation(); setLightbox((lightbox+1)%PORTFOLIO.length); }} style={{ position:'absolute', right:16, background:'rgba(255,255,255,0.12)', border:'none', color:'#fff', fontSize:'2rem', cursor:'pointer', padding:'0.5rem 1rem', borderRadius:12, backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)' }}>→</button>
          <button onClick={() => setLightbox(null)} style={{ position:'absolute', top:16, right:16, background:'rgba(255,255,255,0.12)', border:'none', color:'#fff', fontSize:'1.5rem', cursor:'pointer', padding:'0.4rem 0.8rem', borderRadius:10, backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)' }}>✕</button>
          <div style={{ position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)', ...raleway, color:'rgba(255,255,255,0.6)', fontSize:'0.8rem' }}>{lightbox+1} / {PORTFOLIO.length} — {PORTFOLIO[lightbox].label}</div>
        </div>
      )}
    </section>
  );
}

/* ─── About Emily ────────────────────────────────────────────────────────── */
/* ─── About Emily ────────────────────────────────────────────────────────── */
function AboutEmily() {
  return (
    <section id="about" style={{ padding:'5rem 1.5rem', background:'linear-gradient(135deg,rgba(139,92,246,0.06) 0%,rgba(13,148,136,0.04) 50%,rgba(30,30,46,1) 100%)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }}>
        <div style={{ position:'relative' }}>
          <div style={{ borderRadius:24, overflow:'hidden', position:'relative', boxShadow:'0 24px 80px rgba(139,92,246,0.25)', aspectRatio:'4/5' }}>
            <img src="/images/1000011101.jpg" alt="Emily Caird — Master Colourist, Amherstview Ontario" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(30,30,46,0.5) 0%, transparent 50%)' }} />
          </div>
          <div style={{ ...glassCard, position:'absolute', bottom:-20, right:-20, padding:'1.2rem 1.6rem', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)' }}>
            <div style={{ ...fenway, fontSize:'2.5rem', fontWeight:800, color:C.purple, lineHeight:1 }}>25+</div>
            <div style={{ ...raleway, fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', color:C.gray, textTransform:'uppercase', marginTop:4 }}>Years of Excellence</div>
          </div>
        </div>
        <div>
          <p style={{ ...raleway, fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.15em', color:C.tealL, textTransform:'uppercase', marginBottom:'0.75rem', margin:'0 0 0.75rem' }}>Meet Your Stylist</p>
          <h2 style={{ ...fenway, fontSize:'clamp(2rem,4vw,3rem)', color:C.white, marginBottom:'1.5rem', fontWeight:700, margin:'0 0 1.5rem', lineHeight:1.1 }}>Emily Caird</h2>
          <p style={{ ...raleway, color:C.gray, lineHeight:1.8, marginBottom:'1rem' }}>With over 25 years of hands-on experience in colour artistry and hair design, Emily brings Goldwell-certified mastery to every client — whether in her private Amherstview studio or your own home.</p>
          <p style={{ ...raleway, color:C.gray, lineHeight:1.8, marginBottom:'2rem' }}>Specialising in complex colour transformations, seamless extensions, and mobile bridal styling, every person deserves to feel extraordinary.</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginBottom:'2rem' }}>
            {[['✨','Private Studio'],['🏆','Goldwell Certified'],['🌿','25+ Years Expert'],['✦','Mobile Concierge'],['✂️','Precision Cuts'],['💜','Client-First Always']].map(([icon,label]) => (
              <div key={label} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:'1.1rem' }}>{icon}</span>
                <span style={{ ...raleway, color:C.gray, fontSize:'0.9rem' }}>{label}</span>
              </div>
            ))}
          </div>
          <a href="#book-now" style={{ ...raleway, display:'inline-block', background:'linear-gradient(135deg,#8b3cf7,#7c3aed)', color:'#fff', padding:'0.85rem 2rem', borderRadius:24, fontSize:'0.95rem', fontWeight:700, textDecoration:'none', letterSpacing:'0.03em', boxShadow:'0 4px 24px rgba(139,92,246,0.40)', transition:'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 8px 32px rgba(139,92,246,0.55)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=''; (e.currentTarget as HTMLElement).style.boxShadow='0 4px 24px rgba(139,92,246,0.40)'; }}>
            Begin Your Journey &#x2192;
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  { stars:5, text:'"Emily is an absolute artist. My balayage looks like I stepped out of a high-end editorial shoot. The private studio experience is unlike anything else."', name:'Sarah M.', location:'Kingston, ON' },
  { stars:5, text:'"I have been going to Emily for three years and my hair has never been healthier or more beautiful. She truly understands colour like no one else."', name:'Jennifer K.', location:'Amherstview, ON' },
  { stars:5, text:'"The mobile service is a game-changer. Emily came to my home and delivered salon-quality results with full professionalism. Absolutely worth every penny."', name:'Michelle T.', location:'Bath, ON' },
  { stars:5, text:'"Incredible attention to detail. Emily diagnosed scalp issues my previous stylist missed for years. Walking out every time feeling like a new person."', name:'Rachel L.', location:'Napanee, ON' },
  { stars:5, text:'"My colour correction took years off the damage my hair had. Emily was honest, thorough, and delivered results beyond what I thought possible."', name:'Amanda P.', location:'Kingston, ON' },
  { stars:5, text:'"Finally a stylist who truly listens. Emily took my whole lifestyle into account and created a look that is genuinely perfect for me."', name:'Caitlin B.', location:'Amherstview, ON' },
];


function MobileConcierge() {
  return (
    <section id="mobile-care" style={{ padding:'5rem 1.5rem', background:'linear-gradient(135deg,rgba(13,148,136,0.06) 0%,rgba(30,30,46,1) 100%)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'center' }}>
        <div>
          <p style={{ ...raleway, fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.15em', color:C.tealL, textTransform:'uppercase', marginBottom:'0.75rem', margin:'0 0 0.75rem' }}>We Come to You</p>
          <h2 style={{ ...fenway, fontSize:'clamp(2rem,4vw,2.8rem)', color:C.white, marginBottom:'1.2rem', fontWeight:700, margin:'0 0 1.2rem', lineHeight:1.15 }}>Mobile Hair Concierge</h2>
          <p style={{ ...raleway, color:C.gray, lineHeight:1.75, marginBottom:'1.5rem' }}>Emily's mobile studio brings salon-quality expertise to your home, workplace, or care facility across Amherstview and Greater Kingston.</p>
          <ul style={{ listStyle:'none', padding:0, margin:'0 0 2rem', display:'flex', flexDirection:'column', gap:'0.6rem' }}>
            {['Retirement & LTC home visits','In-home appointments','Accessible service for mobility challenges','All equipment brought on-site'].map(item => (
              <li key={item} style={{ ...raleway, color:C.gray, fontSize:'0.95rem', display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ color:C.tealL }}>✓</span> {item}
              </li>
            ))}
          </ul>
          <a href="#book-now" style={{ ...raleway, display:'inline-block', background:'linear-gradient(135deg,#0d9488,#14b8a6)', color:'#fff', padding:'0.85rem 2rem', borderRadius:24, fontSize:'0.95rem', fontWeight:700, textDecoration:'none', boxShadow:'0 4px 24px rgba(13,148,136,0.40)', transition:'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=''; }}>
            Book Mobile Visit →
          </a>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
          {[['📍','Amherstview & Kingston, ON'],['🚗','Mobile Service Available'],['🏥','Retirement Home Visits'],['📞','(613) 929-8711']].map(([icon,label]) => (
            <div key={label} style={{ ...glassCard, padding:'1.5rem', textAlign:'center', transition:'transform 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=''; }}>
              <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>{icon}</div>
              <p style={{ ...raleway, color:C.gray, fontSize:'0.85rem', margin:0, fontWeight:500 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Smart Price Estimator (fixed: always starts at Q1) ─────────────────── */
const PW_STEPS = [
  { q:'What is your colour history?', opts:['Virgin / no colour','Professional colour only','Box dye in the last 6 months','Not sure'] },
  { q:'What service interests you?', opts:['Balayage / highlights','Full colour change','Vivid / fashion colour','Cut only'] },
];
const PW_RESULTS: Record<string, { price:string; time:string; note:string }> = {
  '0-0':{ price:'From $120', time:'2–3 hrs', note:'Fresh canvas — ideal for balayage' },
  '0-1':{ price:'From $130', time:'2.5–3.5 hrs', note:'Beautiful full transformation' },
  '0-2':{ price:'From $160', time:'3–4 hrs', note:'Vivid on virgin hair is stunning' },
  '0-3':{ price:'From $60',  time:'1–1.5 hrs', note:'Precision cut with consultation' },
  '1-0':{ price:'From $120', time:'2–3 hrs', note:'Healthy hair takes colour beautifully' },
  '1-1':{ price:'From $130', time:'2.5–3.5 hrs', note:'Professional history makes this seamless' },
  '1-2':{ price:'From $150', time:'3–4 hrs', note:'Colour removal may be needed' },
  '1-3':{ price:'From $60',  time:'1–1.5 hrs', note:'Great cut, fresh start' },
  '2-0':{ price:'From $180', time:'3.5–5 hrs', note:'Box dye removal adds time & cost' },
  '2-1':{ price:'From $200', time:'4–5 hrs', note:'Full correction before new colour' },
  '2-2':{ price:'From $280', time:'4–5 hrs', note:'Colour correction required' },
  '2-3':{ price:'From $60',  time:'1–1.5 hrs', note:'Cut is always a great starting point' },
  '3-0':{ price:'From $140', time:'2.5–4 hrs', note:'Consultation included to assess' },
  '3-1':{ price:'From $150', time:'3–4 hrs', note:'Consultation included to assess' },
  '3-2':{ price:'From $170', time:'3.5–5 hrs', note:'Consultation to determine approach' },
  '3-3':{ price:'From $60',  time:'1–1.5 hrs', note:'Easy starting point — just a cut' },
};

function PriceWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const result = answers.length === 2 ? PW_RESULTS[`${answers[0]}-${answers[1]}`] : null;

  const reset = () => { setStep(0); setAnswers([]); };
  const pick = (idx: number) => {
    const next = [...answers, idx];
    setAnswers(next);
    if (step < PW_STEPS.length - 1) setStep(step + 1);
  };

  return (
    <section style={{ padding:'5rem 1.5rem', background:'linear-gradient(135deg,rgba(139,92,246,0.06) 0%,rgba(30,30,46,1) 100%)' }}>
      <div style={{ maxWidth:700, margin:'0 auto' }}>
        <p style={{ ...raleway, textAlign:'center', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.15em', color:C.tealL, textTransform:'uppercase', marginBottom:'0.75rem' }}>AI Pricing</p>
        <h2 style={{ ...fenway, textAlign:'center', fontSize:'clamp(2rem,5vw,3rem)', color:C.white, marginBottom:'0.75rem', fontWeight:700 }}>Smart Price Estimator</h2>
        <p style={{ ...raleway, textAlign:'center', color:C.gray, marginBottom:'3rem' }}>Answer 2 quick questions — get an instant estimate</p>
        <div style={{ ...glassCard, padding:'2.5rem' }}>
          {result ? (
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>✨</div>
              <p style={{ ...raleway, fontSize:'0.9rem', fontWeight:600, color:C.gray, marginBottom:'0.5rem' }}>Your Estimate</p>
              <p style={{ ...fenway, fontSize:'3rem', color:C.gold, fontWeight:800, margin:'0 0 0.5rem' }}>{result.price}</p>
              <p style={{ ...raleway, color:C.tealL, fontSize:'0.9rem', marginBottom:'0.3rem' }}>~{result.time}</p>
              <p style={{ ...raleway, color:C.gray, fontSize:'0.8rem', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'2rem' }}>{result.note}</p>
              <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
                <a href="#book-now" style={{ ...raleway, background:'linear-gradient(135deg,#0d9488,#14b8a6)', color:'#fff', padding:'0.75rem 1.8rem', borderRadius:24, fontWeight:700, fontSize:'0.95rem', textDecoration:'none', boxShadow:'0 4px 16px rgba(13,148,136,0.40)' }}>Book This Service</a>
                <button onClick={reset} style={{ ...raleway, background:'transparent', border:'1px solid rgba(255,255,255,0.20)', color:C.gray, padding:'0.75rem 1.8rem', borderRadius:24, fontWeight:600, fontSize:'0.95rem', cursor:'pointer', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)' }}>Start Over</button>
              </div>
            </div>
          ) : (
            <div>
              <p style={{ ...raleway, color:C.gray, fontSize:'0.8rem', marginBottom:'0.5rem', textAlign:'center' }}>Question {step + 1} of {PW_STEPS.length}</p>
              <h3 style={{ ...raleway, color:C.white, fontSize:'1.3rem', fontWeight:700, textAlign:'center', marginBottom:'2rem' }}>{PW_STEPS[step].q}</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {PW_STEPS[step].opts.map((opt, i) => (
                  <button key={opt} onClick={() => pick(i)} style={{ ...raleway, background:'rgba(139,92,246,0.08)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', border:'1px solid rgba(139,92,246,0.25)', color:C.white, padding:'1rem 1.5rem', borderRadius:12, fontSize:'1rem', fontWeight:500, cursor:'pointer', textAlign:'left', transition:'background 0.2s, border-color 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(139,92,246,0.18)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(139,92,246,0.50)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(139,92,246,0.08)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(139,92,246,0.25)'; }}>
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

/* ─── Vibe Setter ─────────────────────────────────────────────────────────── */
const VIBES = [
  { icon:'🌿', label:'Natural & Effortless', rec:'Balayage with a lived-in finish and a soft trim' },
  { icon:'✨', label:'Polished & Refined',   rec:'Precision cut and glossy single-process colour' },
  { icon:'🔥', label:'Bold & Dramatic',      rec:'Vivid colour transformation + creative cut' },
  { icon:'🌸', label:'Soft & Romantic',      rec:'Pastel tones, face-framing highlights, waves' },
  { icon:'🖤', label:'Edgy & Modern',        rec:'Geometric cut, fashion colour, bold contrast' },
  { icon:'👑', label:'Classic Luxury',       rec:'Goldwell Suite: Colour Mastery or Extensions' },
];

function VibeSetter() {
  const [selected, setSelected] = useState<number|null>(null);
  return (
    <section style={{ padding:'5rem 1.5rem', background:'#1e1e2e', borderTop:'1px solid rgba(139,92,246,0.10)' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <p style={{ ...raleway, textAlign:'center', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.15em', color:C.gold, textTransform:'uppercase', marginBottom:'0.75rem' }}>Style Discovery</p>
        <h2 style={{ ...fenway, textAlign:'center', fontSize:'clamp(2rem,5vw,3rem)', color:C.white, marginBottom:'0.75rem', fontWeight:700 }}>Find Your Vibe</h2>
        <p style={{ ...raleway, textAlign:'center', color:C.gray, marginBottom:'3rem' }}>Pick your aesthetic — we'll curate the perfect service for you</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem', marginBottom:'2rem' }}>
          {VIBES.map((v,i) => (
            <div key={v.label} onClick={() => setSelected(selected === i ? null : i)} style={{ ...glassCard, padding:'1.5rem', textAlign:'center', cursor:'pointer', transition:'all 0.2s', borderColor: selected===i ? 'rgba(139,92,246,0.70)' : 'rgba(139,92,246,0.28)', background: selected===i ? 'rgba(139,92,246,0.20)' : 'rgba(139,92,246,0.07)', boxShadow: selected===i ? '0 0 24px rgba(139,92,246,0.30)' : 'none' }}>
              <div style={{ fontSize:'2.2rem', marginBottom:'0.75rem' }}>{v.icon}</div>
              <p style={{ ...raleway, color:C.white, fontWeight:600, fontSize:'0.9rem', margin:0 }}>{v.label}</p>
            </div>
          ))}
        </div>
        {selected !== null && (
          <div style={{ ...glassCard, padding:'2rem', textAlign:'center', borderColor:'rgba(139,92,246,0.50)', background:'rgba(139,92,246,0.10)' }}>
            <p style={{ ...raleway, color:C.tealL, fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'0.5rem' }}>Perfect match for {VIBES[selected].label}</p>
            <p style={{ ...raleway, color:C.white, fontSize:'1.15rem', fontWeight:600, marginBottom:'1.5rem' }}>✨ {VIBES[selected].rec}</p>
            <a href="#book-now" style={{ ...raleway, background:'linear-gradient(135deg,#8b3cf7,#7c3aed)', color:'#fff', padding:'0.75rem 2rem', borderRadius:24, fontWeight:700, fontSize:'0.95rem', textDecoration:'none', boxShadow:'0 4px 16px rgba(139,92,246,0.40)', display:'inline-block' }}>Book This Look</a>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Hours ──────────────────────────────────────────────────────────────── */
const HOURS = [
  { day:'Monday',    open:'9:00 AM – 7:00 PM', idx:1 },
  { day:'Tuesday',   open:'9:00 AM – 7:00 PM', idx:2 },
  { day:'Wednesday', open:'9:00 AM – 7:00 PM', idx:3 },
  { day:'Thursday',  open:'9:00 AM – 8:00 PM', idx:4 },
  { day:'Friday',    open:'9:00 AM – 6:00 PM', idx:5 },
  { day:'Saturday',  open:'8:00 AM – 5:00 PM', idx:6 },
  { day:'Sunday',    open:'Closed',             idx:0 },
];

function HoursSection() {
  const today = new Date().getDay();
  return (
    <section id="hours" style={{ padding:'5rem 1.5rem', background:'linear-gradient(180deg,rgba(13,148,136,0.05) 0%,#1e1e2e 100%)' }}>
      <div style={{ maxWidth:700, margin:'0 auto' }}>
        <p style={{ ...raleway, textAlign:'center', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.15em', color:C.tealL, textTransform:'uppercase', marginBottom:'0.75rem' }}>Studio Hours</p>
        <h2 style={{ ...fenway, textAlign:'center', fontSize:'clamp(2rem,5vw,3rem)', color:C.white, marginBottom:'3rem', fontWeight:700 }}>When We're Open</h2>
        <div style={{ ...glassCard, overflow:'hidden' }}>
          {HOURS.map(({ day, open, idx }) => {
            const isToday = idx === today;
            return (
              <div key={day} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem 1.5rem', borderBottom:'1px solid rgba(139,92,246,0.10)', background: isToday ? 'rgba(139,92,246,0.08)' : 'transparent', borderLeft: isToday ? '3px solid #8b3cf7' : '3px solid transparent', transition:'background 0.2s' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ ...raleway, fontWeight: isToday ? 700 : 500, color: isToday ? C.white : 'rgba(240,234,248,0.70)', fontSize:'0.95rem' }}>{day}</span>
                  {isToday && <span style={{ ...raleway, background:'linear-gradient(135deg,#8b3cf7,#0d9488)', color:'#fff', fontSize:'0.65rem', fontWeight:700, padding:'0.15rem 0.5rem', borderRadius:8, letterSpacing:'0.08em', textTransform:'uppercase' }}>TODAY</span>}
                </div>
                <span style={{ ...raleway, fontWeight: isToday ? 700 : 400, color: isToday ? C.tealL : open === 'Closed' ? 'rgba(240,234,248,0.30)' : 'rgba(240,234,248,0.65)', fontSize:'0.95rem' }}>{open}</span>
              </div>
            );
          })}
        </div>
        <p style={{ ...raleway, textAlign:'center', color:C.gray, fontSize:'0.85rem', marginTop:'1.5rem' }}>✦ By appointment only. Walk-ins welcome when available.</p>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────────────────────── */
const FAQS = [
  { q:`What areas do you serve?`, a:`Emily serves Amherstview, Kingston, Bath, Napanee, and surrounding areas. Mobile services are available throughout Greater Kingston and Lennox and Addington County.` },
  { q:`How do I book an appointment?`, a:`Call or text Emily directly at (613) 929-8711. A $25 deposit is required to secure your booking. Online booking coming soon.` },
  { q:`Do you offer colour correction?`, a:`Yes. Emily specialises in complex colour correction including box dye removal, tonal corrections, and restoring hair health after over-processing. A consultation is required.` },
  { q:`What products do you use?`, a:`Emily exclusively uses Goldwell professional products — the same line used in top editorial and fashion settings. All formulas are custom-mixed for your unique hair.` },
  { q:`Is the studio truly private?`, a:`Yes. The studio is a dedicated private space — no other clients during your appointment. You get undivided attention for your full service.` },
  { q:`Do you do mobile retirement home visits?`, a:`Absolutely. Emily regularly visits retirement homes and long-term care facilities. All equipment is brought on-site. Call to arrange a group booking or regular schedule.` },
  { q:`How do I prepare for a colour service?`, a:`Come with clean, dry hair (no heavy oils or serums). Avoid washing the day-of if possible. Bring inspiration photos. Emily will walk you through everything at your consultation.` },
];

function FAQ() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <section id="faq" style={{ padding:'5rem 1.5rem', background:'linear-gradient(135deg,rgba(139,92,246,0.04) 0%,rgba(30,30,46,1) 100%)' }}>
      <div style={{ maxWidth:800, margin:'0 auto' }}>
        <p style={{ ...raleway, textAlign:'center', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.15em', color:C.tealL, textTransform:'uppercase', marginBottom:'0.75rem' }}>FAQs</p>
        <h2 style={{ ...fenway, textAlign:'center', fontSize:'clamp(2rem,5vw,3rem)', color:C.white, marginBottom:'3rem', fontWeight:700 }}>Questions Answered</h2>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ ...glassCard, overflow:'hidden', transition:'box-shadow 0.2s' }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1.25rem 1.5rem', background:'transparent', border:'none', cursor:'pointer', gap:'1rem' }}>
                <span style={{ ...raleway, color:C.white, fontWeight:600, fontSize:'0.95rem', textAlign:'left' }}>{faq.q}</span>
                <span style={{ color:C.tealL, fontSize:'1.3rem', flexShrink:0, transition:'transform 0.3s', transform: open===i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding:'0 1.5rem 1.25rem' }}>
                  <p style={{ ...raleway, color:C.gray, lineHeight:1.75, margin:0, fontSize:'0.92rem' }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Booking CTA ─────────────────────────────────────────────────────────── */

/* ——— Membership / Loyalty Tiers ——————————————————————— */
const TIERS = [
  {
    name: 'Essential',
    price: 99,
    colour: C.teal,
    icon: '✦',
    badge: 'STARTER',
    features: [
      '1 haircut per month included',
      'Priority booking window',
      '10% off all colour services',
      'Monthly style consultation (15 min)',
      'Free blow-dry add-on',
    ],
  },
  {
    name: 'Signature',
    price: 199,
    colour: C.purple,
    icon: '✦✦',
    badge: 'MOST POPULAR',
    features: [
      'Everything in Essential',
      '1 full colour treatment per month',
      '20% off all additional services',
      'Monthly deep conditioning treatment',
      'Exclusive member appointment slots',
      'Birthday month surprise service',
    ],
  },
  {
    name: 'Elite',
    price: 349,
    colour: C.gold,
    icon: '✦✦✦',
    badge: 'ULTIMATE',
    features: [
      'Everything in Signature',
      'Unlimited cuts & trims',
      '1 Goldwell luxury treatment/month',
      '30% off retail products',
      'Mobile concierge priority (home visits)',
      'Quarterly wardrobe-colour consultation',
      'VIP early-access to new services',
    ],
  },
];

function Membership() {
  return (
    <section id="membership" style={{ background: C.bg, padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative glow */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${C.purple}18 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <p style={{ ...raleway, color: C.teal, letterSpacing: 4, fontSize: 12, textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>MONTHLY MEMBERSHIPS</p>
        <h2 style={{ ...fenway, fontSize: 'clamp(2rem,5vw,3.2rem)', color: C.white, textAlign: 'center', marginBottom: 16 }}>Loyalty Rewarded</h2>
        <p style={{ ...raleway, color: C.gray, textAlign: 'center', maxWidth: 560, margin: '0 auto 60px', lineHeight: 1.7 }}>
          Commit to looking your best — every month. All memberships include concierge-level service with zero waiting.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 28 }}>
          {TIERS.map(tier => (
            <div key={tier.name} style={{
              ...glassCard,
              padding: '36px 28px',
              position: 'relative',
              border: `1px solid ${tier.colour}50`,
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 24px 60px ${tier.colour}30`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}
            >
              {/* Badge */}
              <div style={{ position: 'absolute', top: -1, right: 24, background: tier.colour, color: '#0d0d1a', fontSize: 10, fontWeight: 800, letterSpacing: 2, padding: '4px 12px', borderRadius: '0 0 8px 8px', ...raleway }}>
                {tier.badge}
              </div>
              <div style={{ fontSize: 28, color: tier.colour, marginBottom: 12 }}>{tier.icon}</div>
              <h3 style={{ ...fenway, fontSize: '1.6rem', color: C.white, marginBottom: 4 }}>{tier.name}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 28 }}>
                <span style={{ ...raleway, fontSize: '2.4rem', fontWeight: 800, color: tier.colour }}>${tier.price}</span>
                <span style={{ ...raleway, color: C.gray, fontSize: 14 }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {tier.features.map(f => (
                  <li key={f} style={{ ...raleway, color: C.gray, fontSize: 14, display: 'flex', gap: 10, lineHeight: 1.5 }}>
                    <span style={{ color: tier.colour, flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="tel:6139298711" style={{
                display: 'block', textAlign: 'center', padding: '14px 0',
                background: `linear-gradient(135deg, ${tier.colour}CC, ${tier.colour})`,
                borderRadius: 12, color: '#0d0d1a', fontWeight: 700, textDecoration: 'none', fontSize: 15, ...raleway,
              }}>
                Enquire About {tier.name}
              </a>
            </div>
          ))}
        </div>
        <p style={{ ...raleway, color: C.gray, textAlign: 'center', fontSize: 13, marginTop: 32, opacity: 0.7 }}>
          Memberships billed monthly · Cancel anytime · Call (613) 929-8711 to enrol
        </p>
      </div>
    </section>
  );
}


/* ——— Gift Cards ——————————————————————————————————————— */
function GiftCards() {
  const amounts = [50, 100, 150, 200];
  return (
    <section id="gift-cards" style={{ background: `linear-gradient(160deg, ${C.bg} 0%, #1a1030 50%, ${C.bg} 100%)`, padding: '100px 24px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <p style={{ ...raleway, color: C.gold, letterSpacing: 4, fontSize: 12, textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>THE PERFECT GIFT</p>
        <h2 style={{ ...fenway, fontSize: 'clamp(2rem,5vw,3.2rem)', color: C.white, textAlign: 'center', marginBottom: 16 }}>Gift the Glow</h2>
        <p style={{ ...raleway, color: C.gray, textAlign: 'center', maxWidth: 520, margin: '0 auto 52px', lineHeight: 1.7 }}>
          Treat someone you love to an extraordinary hair experience. Gift cards are available in any amount and never expire.
        </p>
        <div style={{ ...goldCard, borderRadius: 24, padding: '48px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          {/* Left — Card visual */}
          <div>
            <div style={{
              background: `linear-gradient(135deg, ${C.gold}30, ${C.purple}30)`,
              border: `1px solid ${C.gold}40`,
              borderRadius: 20,
              padding: '32px 28px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: `${C.gold}12` }} />
              <div style={{ position: 'absolute', bottom: -40, left: -20, width: 160, height: 160, borderRadius: '50%', background: `${C.purple}12` }} />
              <p style={{ ...fenway, fontSize: '1.1rem', color: C.gold, marginBottom: 8, position: 'relative' }}>The Perfect Look By Emily</p>
              <p style={{ ...raleway, fontSize: 13, color: C.gray, marginBottom: 32, position: 'relative' }}>Gift Certificate</p>
              <p style={{ ...fenway, fontSize: '2.5rem', color: C.white, position: 'relative' }}>$100</p>
              <p style={{ ...raleway, fontSize: 12, color: C.gray, marginTop: 8, position: 'relative' }}>Valid for any service · Never expires</p>
            </div>
            <p style={{ ...raleway, fontSize: 12, color: C.gray, marginTop: 16, textAlign: 'center', opacity: 0.7 }}>Design for illustration — printed or emailed on purchase</p>
          </div>
          {/* Right — Purchase options */}
          <div>
            <h3 style={{ ...fenway, color: C.white, fontSize: '1.4rem', marginBottom: 8 }}>Choose an Amount</h3>
            <p style={{ ...raleway, color: C.gray, fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
              Popular amounts — or call Emily to arrange a custom value gift card for any occasion.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
              {amounts.map(amt => (
                <a key={amt} href="tel:6139298711" style={{
                  display: 'block', textAlign: 'center', padding: '16px',
                  ...glassCard, borderRadius: 12,
                  color: C.gold, fontSize: '1.2rem', fontWeight: 800, textDecoration: 'none',
                  border: `1px solid ${C.gold}40`,
                  transition: 'all 0.2s',
                  ...fenway,
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${C.gold}20`; (e.currentTarget as HTMLAnchorElement).style.borderColor = C.gold; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; (e.currentTarget as HTMLAnchorElement).style.borderColor = `${C.gold}40`; }}
                >
                  ${amt}
                </a>
              ))}
            </div>
            <a href="tel:6139298711" style={{
              display: 'block', textAlign: 'center', padding: '16px 24px',
              background: `linear-gradient(135deg, ${C.gold}CC, ${C.gold})`,
              borderRadius: 14, color: '#0d0d1a', fontWeight: 700, textDecoration: 'none', fontSize: 16, ...raleway,
            }}>
              📞 Call to Purchase a Gift Card
            </a>
            <p style={{ ...raleway, fontSize: 12, color: C.gray, marginTop: 12, textAlign: 'center' }}>
              Custom amounts available · Printed or digital delivery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ——— Lookbook / Before & After ——————————————————————— */
const TRANSFORMATIONS = [
  {
    id: 1,
    label: 'COLOUR CORRECTION',
    title: 'Box Dye to Butter Blonde',
    desc: 'Damaged box-dye removed over two sessions. Result: seamless multi-tonal blonde with zero breakage.',
    after: '/images/1000011101.jpg',
    accent: C.gold,
  },
  {
    id: 2,
    label: 'BALAYAGE',
    title: 'Natural Brunette to Lived-In Balayage',
    desc: 'Hand-painted sun-kissed tones through naturally dark hair for a low-maintenance, high-impact result.',
    after: '/images/1000010835.jpg',
    accent: C.teal,
  },
  {
    id: 3,
    label: 'VIVID COLOUR',
    title: 'Platinum to Pastel Purple Dreamscape',
    desc: 'Custom-formulated pastel violet over a lifted platinum base. Toned to last with Goldwell care.',
    after: '/images/1000019345.jpg',
    accent: C.purple,
  },
  {
    id: 4,
    label: 'EXTENSIONS',
    title: 'Fine Hair to Full Luxury Volume',
    desc: 'Tape-in extensions added length and density while maintaining a perfectly natural blend at the root.',
    after: '/images/1000022978.jpg',
    accent: C.tealL,
  },
];

function Lookbook() {
  const [active, setActive] = React.useState(0);
  const t = TRANSFORMATIONS[active];
  return (
    <section id="lookbook" style={{ background: C.bg, padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ ...raleway, color: C.purple, letterSpacing: 4, fontSize: 12, textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>TRANSFORMATIONS</p>
        <h2 style={{ ...fenway, fontSize: 'clamp(2rem,5vw,3.2rem)', color: C.white, textAlign: 'center', marginBottom: 16 }}>The Lookbook</h2>
        <p style={{ ...raleway, color: C.gray, textAlign: 'center', maxWidth: 520, margin: '0 auto 52px', lineHeight: 1.7 }}>
          Real results from real clients. Every transformation is a collaboration — your vision, Emily's expertise.
        </p>

        {/* Tab selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
          {TRANSFORMATIONS.map((tr, i) => (
            <button key={tr.id} onClick={() => setActive(i)} style={{
              padding: '10px 20px', borderRadius: 100,
              background: active === i ? `linear-gradient(135deg, ${tr.accent}CC, ${tr.accent})` : 'transparent',
              border: `1px solid ${active === i ? tr.accent : C.border}`,
              color: active === i ? '#0d0d1a' : C.gray,
              fontWeight: active === i ? 700 : 400,
              fontSize: 13, cursor: 'pointer', transition: 'all 0.2s', ...raleway,
            }}>
              {tr.label}
            </button>
          ))}
        </div>

        {/* Featured transformation */}
        <div style={{ ...glassCard, borderRadius: 24, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 480 }}>
          {/* Photo side */}
          <div style={{ position: 'relative', minHeight: 400 }}>
            <img
              src={t.after}
              alt={t.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(13,13,26,0.9) 0%, transparent 60%)',
              padding: '24px 20px 16px',
            }}>
              <span style={{ ...raleway, fontSize: 11, fontWeight: 800, letterSpacing: 3, color: t.accent }}>{t.label}</span>
            </div>
          </div>
          {/* Info side */}
          <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ width: 40, height: 3, background: t.accent, borderRadius: 2, marginBottom: 24 }} />
            <h3 style={{ ...fenway, fontSize: '1.8rem', color: C.white, marginBottom: 16, lineHeight: 1.3 }}>{t.title}</h3>
            <p style={{ ...raleway, color: C.gray, lineHeight: 1.75, fontSize: 15, marginBottom: 40 }}>{t.desc}</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <a href="tel:6139298711" style={{
                padding: '14px 28px',
                background: `linear-gradient(135deg, ${t.accent}CC, ${t.accent})`,
                borderRadius: 12, color: '#0d0d1a', fontWeight: 700, textDecoration: 'none', fontSize: 15, ...raleway,
              }}>Book This Look</a>
              <a href="#gallery" style={{
                padding: '14px 28px',
                ...glassCard, borderRadius: 12, color: C.white, textDecoration: 'none', fontSize: 15, ...raleway,
              }}>View Gallery</a>
            </div>
          </div>
        </div>

        {/* Thumbnail row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: 20 }}>
          {TRANSFORMATIONS.map((tr, i) => (
            <button key={tr.id} onClick={() => setActive(i)} style={{
              padding: 0, border: `2px solid ${active === i ? tr.accent : 'transparent'}`,
              borderRadius: 14, overflow: 'hidden', cursor: 'pointer', background: 'none',
              transition: 'border-color 0.2s', height: 140,
            }}>
              <img src={tr.after} alt={tr.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}




/* ═══ FOOTER (expanded with socials + WhatsApp) ══════════════ */
function Footer() {
  const socials = [
    { icon:'📸', label:'Instagram', href:'https://www.instagram.com/theperfectlookbyemily', col:'#E1306C' },
    { icon:'👍', label:'Facebook',  href:'https://www.facebook.com/theperfectlookbyemily', col:'#1877F2' },
    { icon:'🎵', label:'TikTok',    href:'https://www.tiktok.com/@theperfectlookbyemily', col:'#69C9D0' },
  ];
  return (
    <footer style={{ background:'#0a0714', padding:'60px 24px 40px', borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:40, marginBottom:48 }}>
          <div>
            <div style={{ ...fenway,color:C.white,fontSize:'1.3rem',marginBottom:8 }}>The Perfect Look By Emily</div>
            <p style={{ ...raleway,color:C.gray,fontSize:13,lineHeight:1.7,marginBottom:16 }}>Goldwell-certified colour artistry, bespoke cuts, and luxury extensions. Private studio in Amherstview with mobile service across Greater Kingston.</p>
            <div style={{ display:'flex',gap:12 }}>
              {socials.map(sc=>(
                <a key={sc.label} href={sc.href} target="_blank" rel="noopener noreferrer" title={sc.label}
                  style={{ width:38,height:38,borderRadius:'50%',background:`${sc.col}20`,border:`1px solid ${sc.col}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,textDecoration:'none',transition:'background 0.2s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.background=sc.col+'40';}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.background=sc.col+'20';}}
                >{sc.icon}</a>
              ))}
            </div>
          </div>
          <div>
            <p style={{ ...raleway,color:C.white,fontWeight:700,fontSize:13,letterSpacing:2,textTransform:'uppercase',marginBottom:16 }}>Quick Links</p>
            {[['Services','#services'],['Gallery','#gallery'],['Lookbook','#lookbook'],['About','#about'],['Hours','#hours'],['Membership','#membership'],['Book Now','#book-now']].map(([lbl,href])=>(
              <a key={lbl} href={href} style={{ ...raleway,display:'block',color:C.gray,fontSize:14,marginBottom:10,textDecoration:'none',transition:'color 0.2s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color=C.teal;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color=C.gray as string;}}
              >{lbl}</a>
            ))}
          </div>
          <div>
            <p style={{ ...raleway,color:C.white,fontWeight:700,fontSize:13,letterSpacing:2,textTransform:'uppercase',marginBottom:16 }}>Contact</p>
            <p style={{ ...raleway,color:C.gray,fontSize:14,marginBottom:10 }}>📍 Amherstview / Kingston, Ontario</p>
            <a href="tel:6139298711" style={{ ...raleway,display:'block',color:C.teal,fontSize:14,marginBottom:10,textDecoration:'none' }}>📞 (613) 929-8711</a>
            <a href="sms:6139298711" style={{ ...raleway,display:'block',color:C.gray,fontSize:14,marginBottom:10,textDecoration:'none' }}>💬 Text Us</a>
            <a href="https://wa.me/16139298711" target="_blank" rel="noopener noreferrer" style={{ ...raleway,display:'block',color:'#25D366',fontSize:14,textDecoration:'none' }}>🟢 WhatsApp</a>
          </div>
          <div style={{ display:'flex',flexDirection:'column',justifyContent:'center' }}>
            <p style={{ ...fenway,color:C.white,fontSize:'1.3rem',marginBottom:16,lineHeight:1.3 }}>Ready for your next transformation?</p>
            <a href="#book-now" style={{ display:'block',textAlign:'center',padding:'16px 24px',background:`linear-gradient(135deg,${C.purple},${C.teal})`,borderRadius:14,color:C.white,fontWeight:700,textDecoration:'none',fontSize:15,...raleway,marginBottom:12 }}>Book Your Appointment</a>
            <a href="tel:6139298711" style={{ display:'block',textAlign:'center',padding:'14px 24px',...glassCard,borderRadius:14,color:C.white,textDecoration:'none',fontSize:15,...raleway }}>Call (613) 929-8711</a>
          </div>
        </div>
        <div style={{ borderTop:`1px solid ${C.border}`,paddingTop:24,display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:12 }}>
          <p style={{ ...raleway,color:C.gray,fontSize:12 }}>© {new Date().getFullYear()} The Perfect Look By Emily · Emily Caird · Amherstview, Ontario</p>
          <p style={{ ...raleway,color:C.gray,fontSize:12 }}>Serving Amherstview, Kingston, Bath, Napanee & surrounding areas</p>
        </div>
      </div>
    </footer>
  );
}

const AI_REPLIES: Record<string, string> = {
  balayage: "Balayage starts from $120 and takes 2–3 hours. It's Emily's signature speciality — hand-painted for a natural, sun-kissed effect that grows out beautifully.",
  colour:   "Emily offers full colour transformations from $130, vivid/fashion colour from $160, and colour correction from $180. Every formula is precision-mixed with Goldwell products.",
  cut:      "Precision cuts start at $60 for 1–1.5 hrs. Emily specialises in bobs, layers, textured cuts, and anything that works with your unique face shape.",
  extension:"Extension installations are custom-quoted. Emily uses tape-in, micro-link (I-tip), and halo methods — all colour-matched and damage-free.",
  mobile:   "Emily's mobile service covers Amherstview, Kingston, Bath, Napanee, and surrounding areas. She visits retirement homes and private residences. Call (613) 929-8711 to arrange.",
  book:     "To book, call or text Emily at (613) 929-8711. A $25 deposit secures your appointment. She's open Mon–Wed 9–7, Thu 9–8, Fri 9–6, Sat 8–5.",
  price:    "Services range from $35 (men's cuts) to $280+ (complex colour correction). Use the Smart Price Estimator on this page for a personalised estimate!",
  default:  "Hi! I'm Emily's AI assistant. I can answer questions about services, pricing, booking, or mobile visits. What would you like to know?",
};

function getReply(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes('balay') || m.includes('highlight') || m.includes('foil')) return AI_REPLIES.balayage;
  if (m.includes('colour') || m.includes('color') || m.includes('tint') || m.includes('vivid') || m.includes('fashion')) return AI_REPLIES.colour;
  if (m.includes('cut') || m.includes('trim') || m.includes('bob') || m.includes('layer')) return AI_REPLIES.cut;
  if (m.includes('extension') || m.includes('tape') || m.includes('halo') || m.includes('length')) return AI_REPLIES.extension;
  if (m.includes('mobile') || m.includes('home') || m.includes('retire') || m.includes('visit') || m.includes('travel')) return AI_REPLIES.mobile;
  if (m.includes('book') || m.includes('appoint') || m.includes('schedul') || m.includes('avail')) return AI_REPLIES.book;
  if (m.includes('price') || m.includes('cost') || m.includes('how much') || m.includes('rate')) return AI_REPLIES.price;
  return AI_REPLIES.default;
}

type ChatMsg = { role: 'ai' | 'user'; text: string };

function AIConcierge() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([{ role:'ai', text:"Hi! I'm Emily's AI assistant 👋 Ask me about services, pricing, booking, or mobile visits." }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [msgs]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMsgs(prev => [...prev, { role:'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMsgs(prev => [...prev, { role:'ai', text: getReply(text) }]);
      setTyping(false);
    }, 700);
  };

  return (
    <>
      <div style={{ position:'fixed', bottom:'2rem', right:'2rem', zIndex:999 }}>
        {open && (
          <div style={{ position:'absolute', bottom:'calc(100% + 12px)', right:0, width:360, background:'rgba(20,20,36,0.96)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', border:'1px solid rgba(139,92,246,0.35)', borderRadius:20, boxShadow:'0 24px 80px rgba(0,0,0,0.5)', overflow:'hidden' }}>
            <div style={{ background:'linear-gradient(135deg,#8b3cf7,#0d9488)', padding:'1rem 1.2rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:'1.3rem' }}>🤖</span>
                <div>
                  <p style={{ ...raleway, margin:0, fontWeight:700, color:'#fff', fontSize:'0.9rem' }}>Emily's AI Concierge</p>
                  <p style={{ ...raleway, margin:0, color:'rgba(255,255,255,0.75)', fontSize:'0.7rem' }}>Ask me anything about our services</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background:'rgba(255,255,255,0.15)', border:'none', color:'#fff', cursor:'pointer', borderRadius:8, padding:'0.3rem 0.6rem', fontSize:'1rem' }}>✕</button>
            </div>
            <div style={{ height:280, overflowY:'auto', padding:'1rem', display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ display:'flex', justifyContent: m.role==='user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth:'82%', background: m.role==='user' ? 'linear-gradient(135deg,#8b3cf7,#7c3aed)' : 'rgba(139,92,246,0.12)', border: m.role==='user' ? 'none' : '1px solid rgba(139,92,246,0.25)', borderRadius: m.role==='user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', padding:'0.65rem 0.9rem', ...raleway, fontSize:'0.85rem', color:'rgba(240,234,248,0.9)', lineHeight:1.6 }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div style={{ display:'flex', justifyContent:'flex-start' }}>
                  <div style={{ background:'rgba(139,92,246,0.12)', border:'1px solid rgba(139,92,246,0.25)', borderRadius:'16px 16px 16px 4px', padding:'0.65rem 1rem', ...raleway, fontSize:'0.85rem', color:C.gray }}>Typing…</div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div style={{ padding:'0.75rem', borderTop:'1px solid rgba(139,92,246,0.15)', display:'flex', gap:'0.5rem' }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask about services, pricing, booking…" style={{ flex:1, background:'rgba(139,92,246,0.08)', border:'1px solid rgba(139,92,246,0.25)', borderRadius:12, padding:'0.65rem 0.9rem', ...raleway, color:C.white, fontSize:'0.875rem', outline:'none' }} />
              <button onClick={send} style={{ background:'linear-gradient(135deg,#8b3cf7,#7c3aed)', border:'none', borderRadius:12, padding:'0.65rem 1rem', color:'#fff', cursor:'pointer', fontSize:'1rem', flexShrink:0 }}>↑</button>
            </div>
          </div>
        )}
        <button onClick={() => setOpen(!open)} aria-label="Open AI Concierge" style={{ width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg,#8b3cf7,#0d9488)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem', boxShadow:'0 4px 24px rgba(139,92,246,0.50)', transition:'transform 0.2s, box-shadow 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='scale(1.1)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='scale(1)'; }}>
          {open ? '✕' : '🤖'}
        </button>
      </div>
    </>
  );
}

/* ─── Back to Top ────────────────────────────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} aria-label="Back to top" style={{ position:'fixed', bottom:'5.5rem', right:'2rem', zIndex:998, width:44, height:44, borderRadius:'50%', background:'rgba(139,92,246,0.80)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', border:'1px solid rgba(139,92,246,0.50)', color:'#fff', fontSize:'1.1rem', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px rgba(139,92,246,0.40)', transition:'transform 0.2s, box-shadow 0.2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=''; }}>↑</button>
  );
}

/* ─── Sticky Mobile CTA ──────────────────────────────────────────────────── */
function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:997, background:'rgba(20,20,36,0.95)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', borderTop:'1px solid rgba(139,92,246,0.25)', padding:'0.75rem 1.5rem', display:'flex', gap:'0.75rem', transform: visible ? 'translateY(0)' : 'translateY(100%)', transition:'transform 0.35s ease', pointerEvents: visible ? 'auto' : 'none' }}
      className="sticky-mobile-cta">
      <a href="tel:6139298711" style={{ flex:1, background:'linear-gradient(135deg,#0d9488,#14b8a6)', color:'#fff', padding:'0.85rem', borderRadius:20, fontSize:'0.9rem', fontWeight:700, textDecoration:'none', textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>📞 Call Now</a>
      <a href="sms:6139298711" style={{ flex:1, background:'rgba(139,92,246,0.80)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', color:'#fff', padding:'0.85rem', borderRadius:20, fontSize:'0.9rem', fontWeight:700, textDecoration:'none', textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center', gap:6, border:'1px solid rgba(139,92,246,0.50)' }}>💬 Text Us</a>
    </div>
  );
}

/* ─── Scroll Reveal ──────────────────────────────────────────────────────── */
function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const targets = document.querySelectorAll('section');
    targets.forEach(el => { (el as HTMLElement).style.opacity = '0'; (el as HTMLElement).style.transform = 'translateY(20px)'; (el as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease'; });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).style.opacity = '1'; (e.target as HTMLElement).style.transform = 'translateY(0)'; io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    targets.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return <>{children}</>;
}

/* ─── Schema Markup ──────────────────────────────────────────────────────── */

/* ═══ TRUST BAR ══════════════════════════════════════════════ */
function TrustBar() {
  const badges = [
    { icon: '🏅', label: 'Goldwell Certified', sub: 'Colour Mastery' },
    { icon: '⭐', label: '5.0 Google Rating', sub: '47 Reviews' },
    { icon: '📅', label: '25+ Years', sub: 'Expert Stylist' },
    { icon: '🏠', label: 'Mobile Service', sub: 'We Come to You' },
    { icon: '💎', label: 'Private Studio', sub: 'Amherstview, ON' },
    { icon: '🛡️', label: 'Insured & Licensed', sub: 'Professional Grade' },
  ];
  return (
    <div style={{
      background: `linear-gradient(90deg, ${C.bg} 0%, rgba(139,60,247,0.08) 50%, ${C.bg} 100%)`,
      borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
      padding: '20px 24px',
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:0 }}>
        {badges.map((b, i) => (
          <div key={b.label} style={{
            display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'12px 8px',
            borderRight: i < badges.length-1 ? `1px solid ${C.border}` : 'none',
          }}>
            <span style={{ fontSize:22 }}>{b.icon}</span>
            <span style={{ ...raleway, color:C.white, fontWeight:700, fontSize:13, textAlign:'center' }}>{b.label}</span>
            <span style={{ ...raleway, color:C.teal, fontSize:11, letterSpacing:1, textTransform:'uppercase', textAlign:'center' }}>{b.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ COUNT-UP HOOK ══════════════════════════════════════════ */
function useCountUp(target: number, duration = 1800, trigger = false) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!trigger) return;
    let cur = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [trigger, target, duration]);
  return count;
}

/* ═══ TESTIMONIAL CAROUSEL ═══════════════════════════════════ */
function TestimonialCarousel() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(a => (a+1) % TESTIMONIALS.length), 4200);
    return () => clearInterval(t);
  }, [paused]);
  const t = TESTIMONIALS[active];
  return (
    <section id="testimonials" style={{ background:C.bg, padding:'100px 24px' }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <p style={{ ...raleway, color:C.teal, letterSpacing:4, fontSize:12, textTransform:'uppercase', textAlign:'center', marginBottom:12 }}>CLIENT LOVE</p>
        <h2 style={{ ...fenway, fontSize:'clamp(2rem,5vw,3.2rem)', color:C.white, textAlign:'center', marginBottom:52 }}>What They Say</h2>
        <div onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} style={{ ...glassCard, borderRadius:24, padding:'48px 48px 40px', textAlign:'center', minHeight:260, border:`1px solid ${C.purple}30` }}>
          <div style={{ display:'flex', justifyContent:'center', gap:4, marginBottom:24 }}>
            {[...Array(t.stars)].map((_,i)=><span key={i} style={{ color:C.gold, fontSize:20 }}>★</span>)}
          </div>
          <p style={{ ...raleway, color:'rgba(240,234,248,0.9)', fontSize:17, lineHeight:1.8, fontStyle:'italic', marginBottom:28, maxWidth:640, margin:'0 auto 28px' }}>"{t.text}"</p>
          <p style={{ ...raleway, color:C.teal, fontWeight:700, fontSize:14, letterSpacing:2, textTransform:'uppercase', marginBottom:2 }}>{t.name}</p>
          <p style={{ ...raleway, color:C.gray, fontSize:12, letterSpacing:1 }}>{t.location}</p>
        </div>
        <div style={{ display:'flex', justifyContent:'center', gap:10, marginTop:28 }}>
          {TESTIMONIALS.map((_,i) => (
            <button key={i} onClick={()=>{ setActive(i); setPaused(true); setTimeout(()=>setPaused(false),6000); }}
              style={{ width:active===i?28:10, height:10, borderRadius:5, border:'none', cursor:'pointer', background:active===i?C.purple:C.border, transition:'all 0.3s', padding:0 }} />
          ))}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16, marginTop:44 }}>
          {TESTIMONIALS.map((tr, i) => (
            <div key={i} onClick={()=>setActive(i)} style={{ ...glassCard, borderRadius:16, padding:'20px 22px', cursor:'pointer', border:`1px solid ${active===i?C.purple+'60':C.border}`, opacity:active===i?1:0.65, transition:'all 0.2s' }}>
              <div style={{ display:'flex', gap:2, marginBottom:8 }}>{[...Array(tr.stars)].map((_,j)=><span key={j} style={{ color:C.gold, fontSize:12 }}>★</span>)}</div>
              <p style={{ ...raleway, color:'rgba(240,234,248,0.8)', fontSize:13, lineHeight:1.6, fontStyle:'italic', marginBottom:10 }}>"{tr.text.slice(0,90)}{tr.text.length>90?'...':''}"</p>
              <p style={{ ...raleway, color:C.teal, fontSize:12, fontWeight:700 }}>{tr.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ BOOKING FORM ═══════════════════════════════════════════ */
function BookingForm() {
  const SVCS = ['Precision Cut','Balayage & Colour','Vivid Creative Colour','Hair Extensions','Bridal & Special Occasion','Mobile Concierge Visit','Colour Correction','Deep Conditioning Treatment','Mens Grooming','Membership Enquiry','Gift Card Purchase','Other / Consultation'];
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({ name:'', phone:'', email:'', service:'', date:'', note:'' });
  const handle = (f: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => setForm(prev => ({...prev, [f]: e.target.value}));
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      await fetch('https://formspree.io/f/xdoqzrjq', { method:'POST', headers:{ 'Content-Type':'application/json', Accept:'application/json' }, body: JSON.stringify({...form, _subject: `New Booking — ${form.service||'General'}` }) });
    } catch {}
    setSent(true); setLoading(false);
  };
  const inp: React.CSSProperties = { width:'100%', padding:'14px 18px', borderRadius:12, background:'rgba(139,92,246,0.08)', border:`1px solid ${C.border}`, color:C.white, fontSize:15, outline:'none', boxSizing:'border-box', fontFamily:"'Raleway','Inter',system-ui,sans-serif", transition:'border-color 0.2s' };
  const fo = (e: React.FocusEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>, clr: string) => { e.target.style.borderColor = clr; };
  return (
    <section id="book-now" style={{ background:`linear-gradient(160deg, #0f0a1e 0%, ${C.bg} 60%)`, padding:'100px 24px' }}>
      <div style={{ maxWidth:860, margin:'0 auto' }}>
        <p style={{ ...raleway, color:C.teal, letterSpacing:4, fontSize:12, textTransform:'uppercase', textAlign:'center', marginBottom:12 }}>READY?</p>
        <h2 style={{ ...fenway, fontSize:'clamp(2rem,5vw,3.4rem)', color:C.white, textAlign:'center', marginBottom:16 }}>Book Your Appointment</h2>
        <p style={{ ...raleway, color:C.gray, textAlign:'center', marginBottom:44, lineHeight:1.7 }}>Fill in your details and Emily will confirm within a few hours. A $25 deposit secures your booking.</p>
        {sent ? (
          <div style={{ ...glassCard, borderRadius:24, padding:'56px 40px', textAlign:'center' }}>
            <div style={{ fontSize:56, marginBottom:20 }}>✅</div>
            <h3 style={{ ...fenway, color:C.white, fontSize:'1.8rem', marginBottom:12 }}>Request Received!</h3>
            <p style={{ ...raleway, color:C.gray, lineHeight:1.7, maxWidth:440, margin:'0 auto 28px' }}>Emily will be in touch shortly. For urgent bookings call or text directly.</p>
            <a href="tel:6139298711" style={{ display:'inline-block', padding:'14px 32px', background:`linear-gradient(135deg,${C.teal},${C.tealL})`, borderRadius:12, color:'#0d0d1a', fontWeight:700, textDecoration:'none', ...raleway }}>📞 Call (613) 929-8711</a>
          </div>
        ) : (
          <form onSubmit={submit} style={{ ...glassCard, borderRadius:24, padding:'48px 40px', display:'grid', gap:20 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div>
                <label style={{ ...raleway, color:C.gray, fontSize:12, letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:8 }}>Full Name *</label>
                <input required value={form.name} onChange={handle('name')} placeholder="Your name" style={inp} onFocus={e=>fo(e,C.purple)} onBlur={e=>fo(e,C.border as string)} />
              </div>
              <div>
                <label style={{ ...raleway, color:C.gray, fontSize:12, letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:8 }}>Phone / Text *</label>
                <input required value={form.phone} onChange={handle('phone')} placeholder="(613) 000-0000" type="tel" style={inp} onFocus={e=>fo(e,C.purple)} onBlur={e=>fo(e,C.border as string)} />
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div>
                <label style={{ ...raleway, color:C.gray, fontSize:12, letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:8 }}>Email</label>
                <input value={form.email} onChange={handle('email')} placeholder="your@email.com" type="email" style={inp} onFocus={e=>fo(e,C.purple)} onBlur={e=>fo(e,C.border as string)} />
              </div>
              <div>
                <label style={{ ...raleway, color:C.gray, fontSize:12, letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:8 }}>Service *</label>
                <select required value={form.service} onChange={handle('service')} style={{ ...inp, appearance:'none' } as React.CSSProperties} onFocus={e=>fo(e,C.purple)} onBlur={e=>fo(e,C.border as string)}>
                  <option value="" disabled>Select a service…</option>
                  {SVCS.map(sv=><option key={sv} value={sv} style={{ background:'#1e1e2e' }}>{sv}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={{ ...raleway, color:C.gray, fontSize:12, letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:8 }}>Preferred Date / Time</label>
              <input value={form.date} onChange={handle('date')} placeholder="e.g. Any Tuesday afternoon, March 20th…" style={inp} onFocus={e=>fo(e,C.teal)} onBlur={e=>fo(e,C.border as string)} />
            </div>
            <div>
              <label style={{ ...raleway, color:C.gray, fontSize:12, letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:8 }}>Notes / Hair History</label>
              <textarea value={form.note} onChange={handle('note')} rows={4} placeholder="Share your hair history, inspiration, or any questions…" style={{ ...inp, resize:'vertical', lineHeight:1.6 } as React.CSSProperties} onFocus={e=>fo(e,C.teal)} onBlur={e=>fo(e,C.border as string)} />
            </div>
            <button type="submit" disabled={loading} style={{ padding:'18px 0', borderRadius:14, border:'none', cursor:loading?'not-allowed':'pointer', background:loading?C.border:`linear-gradient(135deg,${C.purple},${C.teal})`, color:C.white, fontWeight:700, fontSize:17, ...raleway, transition:'opacity 0.2s' }}>
              {loading ? 'Sending…' : 'Request My Appointment →'}
            </button>
            <p style={{ ...raleway, color:C.gray, fontSize:13, textAlign:'center', marginTop:-8 }}>
              Or call Emily directly: <a href="tel:6139298711" style={{ color:C.teal }}>(613) 929-8711</a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

/* ═══ CUSTOM CURSOR GLOW ════════════════════════════════════ */
function CustomCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    let mx=0,my=0,gx=0,gy=0;
    const onMove = (e: MouseEvent) => { mx=e.clientX; my=e.clientY; };
    const loop = () => {
      gx += (mx-gx)*0.12; gy += (my-gy)*0.12;
      if (dotRef.current) { dotRef.current.style.left=mx+'px'; dotRef.current.style.top=my+'px'; }
      if (ringRef.current) { ringRef.current.style.left=gx+'px'; ringRef.current.style.top=gy+'px'; }
      requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    requestAnimationFrame(loop);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  if (typeof window!=='undefined' && window.matchMedia('(pointer:coarse)').matches) return null;
  return (
    <>
      <div ref={dotRef} style={{ position:'fixed',width:7,height:7,borderRadius:'50%',background:C.purple,pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',mixBlendMode:'screen' as React.CSSProperties['mixBlendMode'] }} />
      <div ref={ringRef} style={{ position:'fixed',width:36,height:36,borderRadius:'50%',border:`1.5px solid ${C.teal}80`,pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',background:`radial-gradient(circle,${C.purple}18 0%,transparent 70%)` }} />
    </>
  );
}

/* ═══ PAGE LOADER ═════════════════════════════════════════════ */
function PageLoader() {
  const [vis, setVis] = React.useState(true);
  React.useEffect(() => { const t=setTimeout(()=>setVis(false),800); return ()=>clearTimeout(t); }, []);
  if (!vis) return null;
  return (
    <div style={{ position:'fixed',inset:0,background:C.bg,zIndex:99997,display:'flex',alignItems:'center',justifyContent:'center',animation:'loaderFade 0.5s ease 0.6s forwards',pointerEvents:'none' }}>
      <style>{`@keyframes loaderFade{from{opacity:1}to{opacity:0}} @keyframes loaderDot{0%,80%,100%{transform:scale(0.5);opacity:0.3}40%{transform:scale(1);opacity:1}}`}</style>
      <div style={{ textAlign:'center' }}>
        <div style={{ ...fenway, color:C.white, fontSize:'2rem', letterSpacing:3, marginBottom:6 }}>The Perfect Look</div>
        <div style={{ ...fenway, color:C.teal, fontSize:'1.1rem', fontStyle:'italic', marginBottom:20 }}>By Emily</div>
        <div style={{ display:'flex',gap:6,justifyContent:'center' }}>
          {[0,1,2].map(i=><div key={i} style={{ width:7,height:7,borderRadius:'50%',background:C.purple,animation:`loaderDot 1.2s ease ${i*0.2}s infinite` }} />)}
        </div>
      </div>
    </div>
  );
}

function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "The Perfect Look By Emily",
    "description": "Goldwell-certified hair salon offering precision cuts, colour mastery, extensions, and mobile concierge services in Amherstview and Kingston, Ontario.",
    "url": "https://theperfectlookbyemily.ca",
    "telephone": "+16139298711",
    "email": "theperfectlookbyemily@gmail.com",
    "priceRange": "$$",
    "image": "https://theperfectlookbyemily.ca/images/1000011101.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Amherstview",
      "addressRegion": "Ontario",
      "addressCountry": "CA",
      "postalCode": "K7N"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 44.2329,
      "longitude": -76.7243
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "47",
      "bestRating": "5"
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday"], "opens": "09:00", "closes": "19:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Thursday"], "opens": "09:00", "closes": "20:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday"], "opens": "09:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "08:00", "closes": "17:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Sunday"], "opens": "00:00", "closes": "00:00" }
    ],
    "hasMap": "https://maps.google.com/?q=Amherstview,Ontario",
    "sameAs": ["https://www.instagram.com/theperfectlookbyemily"],
    "knowsAbout": ["Balayage","Hair Colour","Goldwell","Hair Extensions","Bridal Hair","Mobile Hair Styling","Colour Correction"]
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/* ─── Home (Main Page) ───────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <SchemaMarkup />
      <Nav />
      <ScrollRevealProvider>
        <main>
          <Hero />
          <TrustBar />
          <ComingSoon />
          <Services />
          <GoldwellSuite />
          <Portfolio />
          <Lookbook />
          <AboutEmily />
          <TestimonialCarousel />
          <Membership />
          <MobileConcierge />
          <PriceWizard />
          <VibeSetter />
          <HoursSection />
          <FAQ />
          <GiftCards />
          <BookingForm />
        </main>
      </ScrollRevealProvider>
      <Footer />
      <AIConcierge />
      <BackToTop />
      <StickyMobileCTA />
    </>
  );
}
