'use client';
import React, { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

      const submit = async (e: React.FormEvent) => {
            e.preventDefault();
                setStatus('sending');
                    try {
                              const res = await fetch('/api/subscribe', {
                                        method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ email }),
                              });
                                    setStatus(res.ok ? 'done' : 'error');
                    } catch {
                              setStatus('error');
                    }
      };

        return (
                <section className="py-16 px-6">
                          <div className="max-w-xl mx-auto text-center glass-purple rounded-2xl p-10">
                                    <span className="text-3xl mb-4 block">✨</span>
                                            <h2
                                                      className="font-black mb-3"
                                                                style={{ fontSize: 'clamp(22px,3vw,32px)', color: '#f0eaf8' }}
                                                                        >
                                                                                      Join the Inner Circle
                                                                                              </h2>
                                                                                                      <p className="text-base leading-relaxed mb-6" style={{ color: '#a9a3b8' }}>
                                                                                                                  Be first to know about new services, seasonal promotions, and Emily&apos;s private home salon opening.
                                                                                                                          </p>
                                                                                                                                  {status === 'done' ? (
                                                                                                                                              <p style={{ color: '#14b8a6', fontWeight: 700 }}>
                                                                                                                                                            You&apos;re in! 💜 Welcome to the Inner Circle.
                                                                                                                                                                      </p>
                                                                                                                                  ) : (
                                                                                                                                              <form
                                                                                                                                                          onSubmit={submit}
                                                                                                                                                                      style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}
                                                                                                                                                                                >
                                                                                                                                                                                                <input
                                                                                                                                                                                                              type="email"
                                                                                                                                                                                                                            required
                                                                                                                                                                                                                                          value={email}
                                                                                                                                                                                                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                                                                                                                                                                                                                      placeholder="your@email.com"
                                                                                                                                                                                                                                                                                    style={{
                                                                                                                                                                                                                                                                                                        flex: '1 1 220px',
                                                                                                                                                                                                                                                                                                                        background: '#1e1e2e',
                                                                                                                                                                                                                                                                                                                                        border: '1px solid rgba(139,60,247,0.4)',
                                                                                                                                                                                                                                                                                                                                                        borderRadius: '10px',
                                                                                                                                                                                                                                                                                                                                                                        padding: '12px 16px',
                                                                                                                                                                                                                                                                                                                                                                                        color: '#f0eaf8',
                                                                                                                                                                                                                                                                                                                                                                                                        fontSize: '14px',
                                                                                                                                                                                                                                                                                                                                                                                                                        outline: 'none',
                                                                                                                                                                                                                                                                                    }}
                                                                                                                                                                                                                                                                                                />
                                                                                                                                                                                                                                                                                                            <button
                                                                                                                                                                                                                                                                                                                          type="submit"
                                                                                                                                                                                                                                                                                                                                        disabled={status === 'sending'}
                                                                                                                                                                                                                                                                                                                                                      className="btn-brand"
                                                                                                                                                                                                                                                                                                                                                                    style={{ opacity: status === 'sending' ? 0.6 : 1 }}
                                                                                                                                                                                                                                                                                                                                                                                >
                                                                                                                                                                                                                                                                                                                                                                                                  {status === 'sending' ? '…' : 'Subscribe'}
                                                                                                                                                                                                                                                                                                                                                                                                              </button>
                                                                                                                                                                                                                                                                                                                                                                                                                        </form>
                                                                                                                                  )}
                                                                                                                                          {status === 'error' && (
                                                                                                                                                      <p style={{ color: '#f87171', fontSize: '13px', marginTop: '8px' }}>
                                                                                                                                                                    Something went wrong. Please try again.
                                                                                                                                                                              </p>
                                                                                                                                          )}
                                                                                                                                                </div>
                                                                                                                                                    </section>  );
                                                                                                                                                    }
                                                                                                                                          )
                                                                                                                                                                                                                                                                                    }}
                                                                                                                                  )
                                                                                                                                  )}
        )
                    }
                              })
                    }
      }