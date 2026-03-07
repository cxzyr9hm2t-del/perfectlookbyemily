'use client';
import React, { useState } from 'react';

const features = [
  { icon: '🔆', label: 'Studio Lighting' },
  { icon: '🌬️', label: 'Pro Ventilation' },
  { icon: '🛋️', label: 'Private Luxury Setting' },
  { icon: '🎵', label: 'Curated Ambiance' },
  { icon: '📱', label: 'Smart Booking System' },
  { icon: '🌺', label: 'Exclusive Clientele' },
];

export default function ComingSoon() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  return React.createElement('section', {
    id: 'coming-soon',
    style: {
      padding: '6rem 1.5rem',
      position: 'relative',
      zIndex: 1,
    }
  },
    React.createElement('div', {
      style: {
        maxWidth: '900px',
        margin: '0 auto',
        background: 'rgba(15,10,26,0.8)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(168,85,247,0.3)',
        borderRadius: '28px',
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      // Classified badge
      React.createElement('span', {
        style: {
          display: 'inline-block', marginBottom: '1.5rem',
          padding: '0.4rem 1.2rem',
          background: 'rgba(168,85,247,0.15)',
          border: '1px solid rgba(168,85,247,0.5)',
          borderRadius: '50px', fontSize: '0.65rem', letterSpacing: '0.2em',
          color: '#a855f7', textTransform: 'uppercase',
        }
      }, '🔒 Classified — VIP Access Only'),
      // Title
      React.createElement('h2', {
        style: {
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #fff 30%, #a855f7 60%, #2dd4bf 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
          lineHeight: 1.15,
        }
      }, 'Something Extraordinary', React.createElement('br'), 'Is Being Built'),
      // Description
      React.createElement('p', {
        style: { color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2.5rem' }
      }, 'A full luxury home salon — custom built inside a double-car garage — is arriving in Amherstview. Think private studio lighting, salon-grade ventilation, and an experience unlike anything in the Kingston area.'),
      // Features grid
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem',
        }
      },
        ...features.map(f =>
          React.createElement('div', {
            key: f.label,
            style: {
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(168,85,247,0.18)',
              borderRadius: '12px', padding: '1rem',
              fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)',
            }
          },
            React.createElement('div', { style: { fontSize: '1.5rem', marginBottom: '0.4rem' } }, f.icon),
            f.label
          )
        )
      ),
      // CTA text
      React.createElement('p', {
        style: { color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '1.5rem' }
      },
        'Join the VIP waitlist to be the ',
        React.createElement('strong', { style: { color: '#a855f7' } }, 'first to book'),
        ' when Aurora Studio opens.'
      ),
      // Waitlist form
      !submitted
        ? React.createElement('form', { onSubmit: handleSubmit,
            style: { maxWidth: '500px', margin: '0 auto', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }
          },
            React.createElement('input', {
              type: 'email', required: true, value: email,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
              placeholder: 'your@email.com',
              style: {
                flex: 1, minWidth: '220px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(168,85,247,0.3)',
                borderRadius: '50px', padding: '0.85rem 1.5rem',
                color: '#fff', fontSize: '0.95rem', outline: 'none',
              }
            }),
            React.createElement('button', {
              type: 'submit',
              style: {
                background: 'linear-gradient(135deg, #a855f7, #2dd4bf)',
                color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                padding: '0.85rem 2rem', border: 'none', borderRadius: '50px',
                cursor: 'pointer', whiteSpace: 'nowrap',
              }
            }, 'Join VIP Waitlist ✦')
          )
        : React.createElement('p', {
            style: { color: '#2dd4bf', fontWeight: 600, fontSize: '1rem' }
          }, '✓ You're on the list! We'll be in touch.')
    )
  );
}
