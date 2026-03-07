import React from 'react';

const cards = [
  {
    icon: '🏠',
    title: 'In-Home Visits',
    desc: 'Full salon experience in the comfort of your own space. Cuts, colour, treatments — professionally executed at your home.',
    tags: ['📅 Flexible scheduling'],
    featured: false,
    cta: 'Book a Home Visit',
  },
  {
    icon: '💝',
    title: 'Retirement Community Visits',
    desc: 'Dedicated, caring mobile visits to retirement homes and care facilities across the Kingston area. Patient, gentle, and fully equipped.',
    tags: ['💚 Serving Kingston-area communities', '🤍 Gentle, specialized care'],
    featured: true,
    cta: 'Schedule a Visit',
  },
  {
    icon: '🏢',
    title: 'Corporate & Events',
    desc: 'On-site styling for special events, corporate gatherings, bridal parties, and milestone celebrations. Elevate every occasion.',
    tags: ['🎉 Events & occasions'],
    featured: false,
    cta: 'Enquire Now',
  },
];

export default function MobileConcierge() {
  const sectionStyle: React.CSSProperties = {
    padding: '6rem 1.5rem',
    position: 'relative',
    zIndex: 1,
    background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.06) 0%, transparent 70%)',
  };
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    maxWidth: '1100px',
    margin: '3rem auto 0',
  };
  const cardStyle = (featured: boolean): React.CSSProperties => ({
    background: 'rgba(15,10,26,0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: featured ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(168,85,247,0.22)',
    borderRadius: '20px',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s',
  });
  const pillStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '0.3rem 1rem',
    border: '1px solid rgba(168,85,247,0.4)',
    borderRadius: '50px',
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#a855f7',
    background: 'rgba(168,85,247,0.08)',
    marginBottom: '1rem',
  };

  return React.createElement('section', { style: sectionStyle },
    React.createElement('div', { style: { textAlign: 'center', maxWidth: '1100px', margin: '0 auto' } },
      React.createElement('span', { style: pillStyle }, 'Mobile Concierge'),
      React.createElement('h2', {
        style: {
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 900,
          color: '#fff',
          marginBottom: '1rem',
        }
      },
        'The Salon Comes ',
        React.createElement('span', {
          style: {
            background: 'linear-gradient(135deg, #a855f7, #2dd4bf)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }
        }, 'To You')
      ),
      React.createElement('p', {
        style: { color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }
      }, 'Luxury hair services delivered to your home, office, or care facility — with no compromise on quality or comfort.')
    ),
    React.createElement('div', { style: gridStyle },
      ...cards.map(card =>
        React.createElement('div', { key: card.title, style: cardStyle(card.featured) },
          card.featured && React.createElement('span', {
            style: {
              position: 'absolute', top: '1rem', right: '1rem',
              background: 'linear-gradient(135deg, #a855f7, #2dd4bf)',
              color: '#fff', fontSize: '0.65rem', letterSpacing: '0.1em',
              padding: '0.3rem 0.8rem', borderRadius: '50px', textTransform: 'uppercase',
            }
          }, 'Specialized Care ✦'),
          React.createElement('div', { style: { fontSize: '2.5rem', marginBottom: '1rem' } }, card.icon),
          React.createElement('h3', { style: { fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' } }, card.title),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.6 } }, card.desc),
          ...card.tags.map(tag =>
            React.createElement('span', {
              key: tag,
              style: {
                display: 'inline-block', marginTop: '1rem', marginRight: '0.5rem',
                padding: '0.25rem 0.75rem',
                background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.3)',
                borderRadius: '50px', fontSize: '0.75rem', color: '#2dd4bf',
              }
            }, tag)
          ),
          React.createElement('a', {
            href: '#booking',
            style: {
              display: 'inline-block', marginTop: '1.25rem',
              padding: '0.75rem 2rem', borderRadius: '50px',
              color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
              background: card.featured ? 'linear-gradient(135deg, #a855f7, #2dd4bf)' : 'transparent',
              border: card.featured ? 'none' : '1px solid #a855f7',
            }
          }, card.cta)
        )
      )
    )
  );
}
