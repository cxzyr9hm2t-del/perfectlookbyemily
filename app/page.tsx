'use client';

import React, { useState } from 'react';
import Image from 'next/image';

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

const fenway: React.CSSProperties = { fontFamily: "'FenwayPark', 'Mrs Saint Delafield', 'Playfair Display', Georgia, serif" };
const inter:  React.CSSProperties = { fontFamily: "'Inter', system-ui, sans-serif" };

const PORTFOLIO = [
  { file: '1000011101.jpg', label: 'Balayage & Colour',   span: 2 },
  { file: '1000022978.jpg', label: 'Precision Cut',       span: 1 },
  { file: '1000010835.jpg', label: 'Vivid Colour',        span: 1 },
  { file: '1000019345.jpg', label: 'Highlights',          span: 2 },
  { file: '1000010712.jpg', label: 'Ombré Colour',        span: 1 },
  { file: '1000009971.jpg', label: 'Full Colour',         span: 1 },
  { file: '1000010201.jpg', label: 'Creative Colour',     span: 2 },
  { file: '1000010413.jpg', label: 'Bridal Updo',         span: 1 },
  { file: '1000020389.jpg', label: 'Extension Install',   span: 1 },
  { file: '1000009868.jpg', label: 'Ocean Blue Vivid',    span: 2 },
];

function Nav() {
  const links = ['Services','Gallery','About','Book Now'];
  return (
    <nav style={{ position:'sticky', top:0, zIndex:100, background:'rgba(30,30,46,0.92)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(139,92,246,0.25)', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:64, fontFamily:"'Inter',system-ui,sans-serif" }}>
      <a href="#hero" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
        <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#8b3cf7,#0d9488)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:16 }}>E</div>
        <span style={{ color:'#fff', fontWeight:700, fontSize:15, fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif", letterSpacing:'0.03em' }}>The Perfect Look By Emily</span>
      </a>
      <div style={{ display:'flex', gap:32, alignItems:'center' }}>
        {links.map(l => (
          <a key={l} href={'#'+l.toLowerCase().replace(' ','-')} style={{ color:'rgba(255,255,255,0.6)', textDecoration:'none', fontSize:14, fontWeight:500 }}>{l}</a>
        ))}
        <a href="tel:6139298711" style={{ background:'linear-gradient(135deg,#8b3cf7,#7c3aed)', color:'#fff', padding:'8px 20px', borderRadius:999, textDecoration:'none', fontSize:13, fontWeight:600 }}>(613) 929-8711</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" style={{ minHeight:'92vh', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'80px 24px', background:'radial-gradient(ellipse at 20% 50%,rgba(139,92,246,0.18) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(13,148,136,0.12) 0%,transparent 50%),#1e1e2e' }}>
      <div style={{ maxWidth:720 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.25)', borderRadius:999, padding:'6px 16px', marginBottom:24 }}>
          <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2dd4bf', fontFamily:"'Inter',system-ui,sans-serif" }}>Amherstview · Kingston, Ontario</span>
        </div>
        <h1 style={{ fontSize:'clamp(2.6rem,6vw,4.5rem)', fontWeight:700, color:'#fff', lineHeight:1.1, margin:'0 0 8px', fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" }}>The Perfect Look</h1>
        <h2 style={{ fontSize:'clamp(1.1rem,3vw,1.6rem)', color:'#2dd4bf', margin:'0 0 24px', fontWeight:400, fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif", fontStyle:'italic' }}>By Emily</h2>
        <p style={{ fontSize:'clamp(1rem,2vw,1.15rem)', color:'rgba(255,255,255,0.6)', lineHeight:1.7, marginBottom:40, maxWidth:560, marginLeft:'auto', marginRight:'auto', fontFamily:"'Inter',system-ui,sans-serif" }}>25+ years of Goldwell-certified colour mastery, bespoke cuts, and luxury extension installations. Private studio in Amherstview — and mobile care that comes to you.</p>
        <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
          <a href="#book-now" style={{ background:'linear-gradient(135deg,#0d9488,#0f766e)', color:'#fff', padding:'15px 36px', borderRadius:999, textDecoration:'none', fontWeight:700, fontSize:15, fontFamily:"'Inter',system-ui,sans-serif" }}>Book Your Appointment</a>
          <a href="#gallery" style={{ background:'rgba(139,92,246,0.12)', border:'1px solid rgba(139,92,246,0.25)', color:'#fff', padding:'15px 36px', borderRadius:999, textDecoration:'none', fontWeight:600, fontSize:15, fontFamily:"'Inter',system-ui,sans-serif" }}>View Gallery</a>
        </div>
        <div style={{ marginTop:56, display:'flex', justifyContent:'center', gap:40, flexWrap:'wrap' }}>
          {[['25+','Years Experience'],['\u2605 5.0','Client Rating'],['Goldwell','Certified Colourist'],['Mobile','Care Available']].map(([v,l])=>(
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontSize:'1.6rem', fontWeight:700, color:'#8b3cf7', fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" }}>{v}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.6)', marginTop:2, letterSpacing:'0.05em', textTransform:'uppercase', fontFamily:"'Inter',system-ui,sans-serif" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon:'\u2702', title:'Precision Cuts', desc:'Sculpted bobs, textured layers, and custom shapes tailored to your face and lifestyle.' },
  { icon:'\uD83C\uDFA8', title:'Balayage & Colour', desc:'Hand-painted sun-kissed tones, rich glosses, and dimensional highlights.' },
  { icon:'\u2728', title:'Vivid & Creative Colour', desc:'Bold fantasy colours \u2014 from pastel lavender to deep ocean teal \u2014 expertly formulated.' },
  { icon:'\uD83D\uDC8D', title:'Bridal & Special Occasion', desc:'Bespoke wedding hair and event styling with pearl pins, braids, and elegant updos.' },
  { icon:'\uD83C\uDFE0', title:'Mobile Concierge', desc:'Emily comes to your home, retirement residence, or facility. Full service, zero travel stress.' },
  { icon:'\uD83D\uDC68', title:"Men's Grooming", desc:'Precision fades, textured crops, and classic barbershop-style cuts for all hair types.' },
];

function Services() {
  return (
    <section id="services" style={{ padding:'96px 24px', background:'#1e1e2e' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <p style={{ fontSize:13, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2dd4bf', marginBottom:12, fontFamily:"'Inter',system-ui,sans-serif" }}>What We Do</p>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#fff', margin:0, fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" }}>Services Menu</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:24 }}>
          {SERVICES.map(s=>(
            <div key={s.title} style={{ background:'rgba(139,92,246,0.05)', border:'1px solid rgba(139,92,246,0.25)', borderRadius:16, padding:28 }}>
              <div style={{ fontSize:28, marginBottom:12 }}>{s.icon}</div>
              <h3 style={{ fontSize:'1.1rem', fontWeight:700, color:'#fff', margin:'0 0 10px', fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" }}>{s.title}</h3>
              <p style={{ color:'rgba(255,255,255,0.6)', fontSize:14, lineHeight:1.6, margin:0, fontFamily:"'Inter',system-ui,sans-serif" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoldwellSuite() {
  return (
    <section id="goldwell" style={{ padding:'96px 24px', background:'linear-gradient(135deg,rgba(139,92,246,0.08) 0%,rgba(13,148,136,0.06) 100%),#1e1e2e' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <p style={{ fontSize:12, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'#e5b869', marginBottom:8, fontFamily:"'Inter',system-ui,sans-serif" }}>❖ Premium Offerings ❖</p>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#fff', margin:'0 0 16px', fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" }}>The Goldwell Suite</h2>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:16, maxWidth:560, margin:'0 auto', fontFamily:"'Inter',system-ui,sans-serif" }}>Exclusive treatments reserved for clients who demand the absolute finest in colour science and hair engineering.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(440px,1fr))', gap:32 }}>
          <div style={{ background:'rgba(229,184,105,0.05)', border:'1px solid rgba(229,184,105,0.3)', borderRadius:20, padding:40 }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24 }}>
              <div style={{ width:52, height:52, borderRadius:12, background:'rgba(229,184,105,0.15)', border:'1px solid rgba(229,184,105,0.4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>🏆</div>
              <div>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'#e5b869', margin:'0 0 4px', fontFamily:"'Inter',system-ui,sans-serif" }}>Goldwell Certified</p>
                <h3 style={{ fontSize:'1.5rem', fontWeight:700, color:'#fff', margin:0, fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" }}>Color Mastery</h3>
              </div>
            </div>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15, lineHeight:1.7, marginBottom:24, fontFamily:"'Inter',system-ui,sans-serif" }}>Emily holds Goldwell Color Mastery certification — the highest level of colour artistry training in the professional hair industry. Every formula is precision-mixed for your unique hair history, porosity, and goal.</p>
            <ul style={{ listStyle:'none', padding:0, margin:'0 0 28px', display:'flex', flexDirection:'column', gap:10 }}>
              {['Balayage & foil work','Full colour transformation','Vivid fashion shades','Grey blending & toning','Gloss treatments'].map(i=>(
                <li key={i} style={{ display:'flex', alignItems:'center', gap:10, color:'rgba(255,255,255,0.6)', fontSize:14, fontFamily:"'Inter',system-ui,sans-serif" }}>
                  <span style={{ color:'#e5b869', flexShrink:0 }}>✓</span>{i}
                </li>
              ))}
            </ul>
            <a href="#book-now" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(229,184,105,0.1)', border:'1px solid rgba(229,184,105,0.4)', color:'#e5b869', padding:'12px 24px', borderRadius:999, textDecoration:'none', fontSize:14, fontWeight:600, fontFamily:"'Inter',system-ui,sans-serif" }}>Book a Colour Consultation →</a>
          </div>
          <div style={{ background:'rgba(139,92,246,0.05)', border:'1px solid rgba(139,92,246,0.25)', borderRadius:20, padding:40 }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24 }}>
              <div style={{ width:52, height:52, borderRadius:12, background:'rgba(139,92,246,0.15)', border:'1px solid rgba(139,92,246,0.4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>💎</div>
              <div>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'#8b3cf7', margin:'0 0 4px', fontFamily:"'Inter',system-ui,sans-serif" }}>Goldwell Extensions</p>
                <h3 style={{ fontSize:'1.5rem', fontWeight:700, color:'#fff', margin:0, fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" }}>Luxury Installations</h3>
              </div>
            </div>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15, lineHeight:1.7, marginBottom:24, fontFamily:"'Inter',system-ui,sans-serif" }}>Seamlessly blended, damage-free extension installations using premium Goldwell-aligned hair. From subtle length to dramatic volume — each strand is colour-matched and bonded with precision.</p>
            <ul style={{ listStyle:'none', padding:0, margin:'0 0 28px', display:'flex', flexDirection:'column', gap:10 }}>
              {['Tape-in extensions','Micro-link (I-tip) bonds','Clip-in custom sets','Halo extensions','Maintenance & removal'].map(i=>(
                <li key={i} style={{ display:'flex', alignItems:'center', gap:10, color:'rgba(255,255,255,0.6)', fontSize:14, fontFamily:"'Inter',system-ui,sans-serif" }}>
                  <span style={{ color:'#8b3cf7', flexShrink:0 }}>✓</span>{i}
                </li>
              ))}
            </ul>
            <a href="#book-now" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.4)', color:'#8b3cf7', padding:'12px 24px', borderRadius:999, textDecoration:'none', fontSize:14, fontWeight:600, fontFamily:"'Inter',system-ui,sans-serif" }}>Book Extension Consultation →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [hovered, setHovered] = useState<number|null>(null);
  return (
    <section id="gallery" style={{ padding:'96px 24px', background:'#1e1e2e' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <p style={{ fontSize:13, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2dd4bf', marginBottom:12, fontFamily:"'Inter',system-ui,sans-serif" }}>Our Work</p>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#fff', margin:0, fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" }}>❖ From Our Chair: Real Transformations ❖</h2>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:16, maxWidth:520, margin:'16px auto 0', fontFamily:"'Inter',system-ui,sans-serif" }}>Precision colour, bespoke cuts, and transformations crafted with 25+ years of expertise.</p>
        </div>
        <div style={{ columns:'3 320px', columnGap:12, lineHeight:0 }}>
          {PORTFOLIO.map((img, i) => (
            <div key={img.file}
              style={{ display:'inline-block', width:'100%', marginBottom:12, position:'relative', overflow:'hidden', borderRadius:12, border:'1px solid rgba(139,92,246,0.25)', cursor:'pointer', breakInside:'avoid', transition:'transform .3s,box-shadow .3s' }}
              onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)}>
              <Image
                src={'/images/'+img.file}
                alt={img.label+' — by Emily Caird, Amherstview Ontario'}
                width={600}
                height={img.span===2 ? 900 : 600}
                style={{ width:'100%', height:'auto', display:'block' }}
                loading="lazy"
              />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'20px 14px 14px', background:'linear-gradient(to top,rgba(30,30,46,0.9) 0%,transparent 100%)', opacity: hovered===i ? 1 : 0, transition:'opacity .3s' }}>
                <span style={{ display:'inline-block', background:'rgba(13,148,136,0.18)', border:'1px solid rgba(13,148,136,0.4)', color:'#2dd4bf', fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', padding:'4px 10px', borderRadius:999, fontFamily:"'Inter',system-ui,sans-serif" }}>{img.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:48, borderRadius:20, padding:2, background:'linear-gradient(135deg,#f09433,#dc2743,#bc1888)' }}>
          <div style={{ borderRadius:18, background:'#1e1e2e', padding:'32px 40px', display:'flex', alignItems:'center', gap:24, flexWrap:'wrap' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e6683c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width:40, height:40, flexShrink:0 }}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="#e6683c" stroke="none"/>
            </svg>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#e6683c', margin:'0 0 4px', fontFamily:"'Inter',system-ui,sans-serif" }}>Follow Along</p>
              <h3 style={{ fontSize:'1.5rem', fontWeight:700, color:'#fff', margin:'0 0 4px', fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" }}>@theperfectlookbyemily</h3>
              <p style={{ color:'rgba(255,255,255,0.6)', fontSize:14, margin:0, fontFamily:"'Inter',system-ui,sans-serif" }}>See the latest transformations as they happen.</p>
            </div>
            <a href="https://www.instagram.com/theperfectlookbyemily" target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 28px', borderRadius:999, background:'linear-gradient(135deg,#f09433,#dc2743,#bc1888)', color:'#fff', fontWeight:700, fontSize:14, textDecoration:'none', fontFamily:"'Inter',system-ui,sans-serif" }}>Follow on Instagram</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComingSoon() {
  return (
    <section style={{ padding:'32px 24px 0' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', justifyContent:'center' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:16, background:'rgba(229,184,105,0.07)', border:'1px solid rgba(229,184,105,0.35)', borderRadius:16, padding:'18px 32px' }}>
          <span style={{ fontSize:24 }}>🏗️</span>
          <div>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#e5b869', margin:'0 0 4px', fontFamily:"'Inter',system-ui,sans-serif" }}>Coming Soon</p>
            <p style={{ fontSize:16, fontWeight:600, color:'#fff', margin:0, fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" }}>Dedicated Garage Salon Transformation — Amherstview, Ontario</p>
          </div>
          <div style={{ background:'rgba(229,184,105,0.15)', border:'1px solid rgba(229,184,105,0.4)', borderRadius:999, padding:'4px 12px' }}>
            <span style={{ fontSize:12, fontWeight:700, color:'#e5b869', fontFamily:"'Inter',system-ui,sans-serif" }}>2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileConcierge() {
  return (
    <section id="mobile-care" style={{ padding:'96px 24px', background:'linear-gradient(135deg,rgba(13,148,136,0.06) 0%,rgba(139,92,246,0.06) 100%),#1e1e2e' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
        <div>
          <p style={{ fontSize:12, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2dd4bf', marginBottom:12, fontFamily:"'Inter',system-ui,sans-serif" }}>We Come to You</p>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:700, color:'#fff', margin:'0 0 20px', fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" }}>Mobile Hair Concierge</h2>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15, lineHeight:1.7, marginBottom:28, fontFamily:"'Inter',system-ui,sans-serif" }}>Emily's mobile studio brings salon-quality expertise to your home, workplace, or care facility across Amherstview and Greater Kingston.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:32 }}>
            {['Retirement & LTC home visits','In-home appointments','Accessible service for mobility challenges','All equipment brought on-site'].map(f=>(
              <div key={f} style={{ display:'flex', alignItems:'center', gap:10, color:'rgba(255,255,255,0.6)', fontSize:14, fontFamily:"'Inter',system-ui,sans-serif" }}>
                <span style={{ color:'#2dd4bf' }}>✓</span>{f}
              </div>
            ))}
          </div>
          <a href="#book-now" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#0d9488,#0f766e)', color:'#fff', padding:'14px 28px', borderRadius:999, textDecoration:'none', fontWeight:700, fontSize:14, fontFamily:"'Inter',system-ui,sans-serif" }}>Book Mobile Visit →</a>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {[['\uD83D\uDCCD','Amherstview & Kingston, ON'],['🚗','Mobile Service Available'],['🏥','Retirement Home Visits'],['📞','(613) 929-8711']].map(([ic,t])=>(
            <div key={t} style={{ background:'rgba(13,148,136,0.06)', border:'1px solid rgba(13,148,136,0.2)', borderRadius:14, padding:20, textAlign:'center' }}>
              <div style={{ fontSize:28, marginBottom:8 }}>{ic}</div>
              <p style={{ color:'#fff', fontSize:13, fontWeight:500, margin:0, fontFamily:"'Inter',system-ui,sans-serif" }}>{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hours() {
  const hours = [['Monday','9:00 AM – 7:00 PM'],['Tuesday','9:00 AM – 7:00 PM'],['Wednesday','9:00 AM – 7:00 PM'],['Thursday','9:00 AM – 8:00 PM'],['Friday','9:00 AM – 6:00 PM'],['Saturday','8:00 AM – 5:00 PM'],['Sunday','Closed']];
  return (
    <section id="hours" style={{ padding:'96px 24px', background:'#1e1e2e' }}>
      <div style={{ maxWidth:640, margin:'0 auto', textAlign:'center' }}>
        <p style={{ fontSize:13, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2dd4bf', marginBottom:12, fontFamily:"'Inter',system-ui,sans-serif" }}>Studio Hours</p>
        <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:700, color:'#fff', margin:'0 0 40px', fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" }}>When We're Open</h2>
        <div style={{ background:'rgba(139,92,246,0.05)', border:'1px solid rgba(139,92,246,0.25)', borderRadius:20, overflow:'hidden' }}>
          {hours.map(([day,time])=>(
            <div key={day} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 28px', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
              <span style={{ fontWeight:600, color:'#fff', fontSize:14, fontFamily:"'Inter',system-ui,sans-serif" }}>{day}</span>
              <span style={{ color: time==='Closed' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.6)', fontSize:14, fontFamily:"'Inter',system-ui,sans-serif" }}>{time}</span>
            </div>
          ))}
        </div>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, marginTop:20, fontFamily:"'Inter',system-ui,sans-serif" }}>❖ By appointment only. Walk-ins welcome when available.</p>
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section id="book-now" style={{ padding:'96px 24px', background:'linear-gradient(135deg,rgba(139,92,246,0.1) 0%,rgba(13,148,136,0.08) 100%),#1e1e2e' }}>
      <div style={{ maxWidth:680, margin:'0 auto', textAlign:'center' }}>
        <p style={{ fontSize:13, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2dd4bf', marginBottom:12, fontFamily:"'Inter',system-ui,sans-serif" }}>Ready?</p>
        <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#fff', margin:'0 0 16px', fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" }}>Book Your Appointment</h2>
        <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15, lineHeight:1.7, marginBottom:40, fontFamily:"'Inter',system-ui,sans-serif" }}>Call or text Emily directly to schedule your visit. A $25 deposit is required to secure your booking.</p>
        <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', marginBottom:32 }}>
          <a href="tel:6139298711" style={{ background:'linear-gradient(135deg,#0d9488,#0f766e)', color:'#fff', padding:'16px 40px', borderRadius:999, textDecoration:'none', fontWeight:700, fontSize:16, fontFamily:"'Inter',system-ui,sans-serif" }}>📞 Call (613) 929-8711</a>
          <a href="sms:6139298711" style={{ background:'rgba(139,92,246,0.12)', border:'1px solid rgba(139,92,246,0.25)', color:'#fff', padding:'16px 40px', borderRadius:999, textDecoration:'none', fontWeight:600, fontSize:16, fontFamily:"'Inter',system-ui,sans-serif" }}>💬 Send a Text</a>
        </div>
        <p style={{ color:'rgba(255,255,255,0.35)', fontSize:13, fontFamily:"'Inter',system-ui,sans-serif" }}>Serving Amherstview, Kingston, Bath & surrounding areas.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:'#1e1e2e', borderTop:'1px solid rgba(139,92,246,0.25)', padding:'48px 24px 32px', textAlign:'center', fontFamily:"'Inter',system-ui,sans-serif" }}>
      <div style={{ maxWidth:800, margin:'0 auto' }}>
        <p style={{ fontSize:'1.2rem', fontWeight:700, color:'#fff', marginBottom:4, fontFamily:"'FenwayPark','Mrs Saint Delafield','Playfair Display',Georgia,serif" }}>The Perfect Look By Emily</p>
        <p style={{ color:'rgba(255,255,255,0.6)', fontSize:13, marginBottom:24 }}>Emily Caird · Amherstview / Kingston, Ontario · (613) 929-8711</p>
        <div style={{ display:'flex', justifyContent:'center', gap:24, marginBottom:24, flexWrap:'wrap' }}>
          {[['#services','Services'],['#gallery','Gallery'],['#hours','Hours'],['#book-now','Book Now']].map(([h,l])=>(
            <a key={l} href={h} style={{ color:'rgba(255,255,255,0.45)', textDecoration:'none', fontSize:13 }}>{l}</a>
          ))}
          <a href="/privacy" style={{ color:'rgba(255,255,255,0.45)', textDecoration:'none', fontSize:13 }}>Privacy</a>
          <a href="/terms" style={{ color:'rgba(255,255,255,0.45)', textDecoration:'none', fontSize:13 }}>Terms</a>
        </div>
        <p style={{ color:'rgba(255,255,255,0.25)', fontSize:12 }}>© 2026 The Perfect Look By Emily. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main style={{ background:'#1e1e2e', color:'#fff', minHeight:'100vh', fontFamily:"'Inter',system-ui,sans-serif" }}>
      <Nav />
      <Hero />
      <ComingSoon />
      <Services />
      <GoldwellSuite />
      <Portfolio />
      <MobileConcierge />
      <Hours />
      <Booking />
      <Footer />
    </main>
  );
}
