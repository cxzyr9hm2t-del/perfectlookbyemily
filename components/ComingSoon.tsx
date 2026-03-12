import React from 'react';

export default function ComingSoon() {
  return (
      <section className="py-16 px-6 text-center" style={{ background: 'radial-gradient(ellipse at center, rgba(139,60,247,0.07) 0%, transparent 70%)' }}>
            <div className="max-w-xl mx-auto glass-purple rounded-2xl p-10 animate-pulse-glow">
                    <div
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
                                        style={{ background: 'rgba(139,60,247,0.15)', border: '1px solid rgba(139,60,247,0.30)' }}
                                                >
                                                          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#8b3cf7' }} />
                                                                    <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: '#a855f7' }}>
                                                                                Coming Soon
                                                                                          </span>
                                                                                                  </div>
                                                                                                          <h3 className="text-2xl font-bold mb-3" style={{ color: '#f0eaf8' }}>
                                                                                                                    Dedicated Home Salon
                                                                                                                            </h3>
                                                                                                                                    <p className="text-base leading-relaxed mb-2" style={{ color: '#a9a3b8' }}>
                                                                                                                                              Emily is crafting a bespoke private home salon — an intimate, beautifully designed space built exclusively for the elevated hair-care experience you deserve.
                                                                                                                                                      </p>
                                                                                                                                                              <p className="text-xs tracking-widest uppercase mt-4 font-semibold" style={{ color: '#8b3cf7' }}>
                                                                                                                                                                        Subscribe below to be notified first
                                                                                                                                                                                </p>
                                                                                                                                                                                      </div>
                                                                                                                                                                                          </section>
                                                                                                                                                                                            );
                                                                                                                                                                                            }