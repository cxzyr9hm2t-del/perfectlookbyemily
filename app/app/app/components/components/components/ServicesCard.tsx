const services = [
      {
          title: 'Signature Balayage',
              price: 'From $185',
                  desc: 'Multidimensional, sun-kissed colour using Goldwell Topchic & @Pure Pigments for breathtaking reflects.',
                      badge: 'Most Popular',
                          badgeColor: '#8b5cf6',
                            },
                              {
                                  title: 'Advanced Colour Correction',
                                      price: 'From $250',
                                          desc: 'Complete architectural precision colour correction. Full consultation required. Goldwell ColorSystems expertise.',
                                              badge: 'Premium',
                                                  badgeColor: '#14b8a6',
                                                    },
                                                      {
                                                          title: 'Mobile & Retirement Care',
                                                              price: 'From $75',
                                                                  desc: 'Full salon experience brought to your home or retirement community. Cuts, colour, sets & blowouts on-site.',
                                                                      badge: 'Mobile',
                                                                          badgeColor: '#8b5cf6',
                                                                            },
                                                                              {
                                                                                  title: 'Precision Cut & Style',
                                                                                      price: 'From $65',
                                                                                          desc: 'Tailored cuts incorporating trending 2026 styles. Includes consultation, wash, cut, blowdry & style.',
                                                                                              badge: null,
                                                                                                  badgeColor: null,
                                                                                                    },
                                                                                                      {
                                                                                                          title: 'Goldwell Colour Gloss',
                                                                                                              price: 'From $95',
                                                                                                                  desc: 'Ammonia-free Colorance demi-permanent treatment for intense shine, colour refresh & tonal perfection.',
                                                                                                                      badge: null,
                                                                                                                          badgeColor: null,
                                                                                                                            },
                                                                                                                              {
                                                                                                                                  title: 'Premium Sunday/Monday',
                                                                                                                                      price: '+$25 Surcharge',
                                                                                                                                          desc: 'Exclusive after-hours availability for busy professionals. Full service menu available on premium days.',
                                                                                                                                              badge: 'After Hours',
                                                                                                                                                  badgeColor: '#14b8a6',
                                                                                                                                                    },
                                                                                                                                                    ];

                                                                                                                                                    export default function ServicesCard() {
                                                                                                                                                      return (
                                                                                                                                                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                                                                                                                                {services.map((service, idx) => (
                                                                                                                                                                        <div key={idx} className="glass-panel-dark rounded-2xl p-6 flex flex-col gap-4 hover:border-[#8b5cf6]/40 transition-all duration-300 hover:scale-[1.02] group">
                                                                                                                                                                                  <div className="flex items-start justify-between">
                                                                                                                                                                                              <div>
                                                                                                                                                                                                            {service.badge && (
                                                                                                                                                                                                                            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 inline-block"
                                                                                                                                                                                                                                              style={{ backgroundColor: `${service.badgeColor}20`, color: service.badgeColor!, border: `1px solid ${service.badgeColor}40` }}>
                                                                                                                                                                                                                                                                {service.badge}
                                                                                                                                                                                                                                                                                </span>
                                                                                                                                                                                                                                                                                              )}
                                                                                                                                                                                                                                                                                                            <h3 className="text-xl font-serif text-white mt-1">{service.title}</h3>
                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                    <span className="text-[#14b8a6] font-bold text-sm whitespace-nowrap">{service.price}</span>
                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                        <p className="text-gray-400 text-sm leading-relaxed flex-grow">{service.desc}</p>
                                                                                                                                                                                                                                                                                                                                                                  <a href="#booking" className="text-[#8b5cf6] text-sm font-semibold hover:text-[#14b8a6] transition-colors">
                                                                                                                                                                                                                                                                                                                                                                              Book this service &rarr;
                                                                                                                                                                                                                                                                                                                                                                                        </a>
                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                      ))}
                                                                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                                                                                            }
]