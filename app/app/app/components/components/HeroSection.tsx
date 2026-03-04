export default function HeroSection() {
      return (
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f0a1a]">
                {/* Spatial Aurora Background Orbs */}
                      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse" />
                            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#14b8a6] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />

                                        {/* Glassmorphic Content Card */}
                                              <div className="relative z-10 glass-panel-dark p-8 md:p-14 rounded-3xl max-w-3xl mx-4 text-center flex flex-col items-center">
                                                      <span className="text-[#14b8a6] font-bold tracking-widest uppercase text-sm mb-4">
                                                                The Perfect Look By Emily
                                                                        </span>
                                                                                <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
                                                                                          The Ultimate <span className="gradient-text">Tech-Beauty</span> Experience
                                                                                                  </h1>
                                                                                                          <p className="text-gray-300 text-lg mb-4 max-w-xl leading-relaxed">
                                                                                                                    Master Colourology &amp; Mixology using <strong className="text-[#8b5cf6]">Goldwell</strong> products. Elite mobile styling for Amherstview, Kingston &amp; Odessa, Ontario.
                                                                                                                            </p>
                                                                                                                                    <p className="text-gray-400 text-sm mb-10 max-w-xl">
                                                                                                                                              Retirement home visits · Premium Sunday &amp; Monday appointments · Balayage · Colour Correction · Cuts &amp; Styles
                                                                                                                                                      </p>

                                                                                                                                                              {/* Coming Soon Banner */}
                                                                                                                                                                      <div className="bg-gradient-to-r from-[#8b5cf6] to-[#14b8a6] p-[1px] rounded-full mb-8">
                                                                                                                                                                                <div className="bg-[#0f0a1a] px-8 py-3 rounded-full">
                                                                                                                                                                                            <span className="font-semibold text-white tracking-wide uppercase text-sm">
                                                                                                                                                                                                          Coming Soon: The Aurora Garage Studio
                                                                                                                                                                                                                      </span>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                        </div>

                                                                                                                                                                                                                                                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                                                                                                                                                                                                                                          <a href="#booking" className="btn-primary text-center">
                                                                                                                                                                                                                                                                      Book Amherstview or Mobile Visit
                                                                                                                                                                                                                                                                                </a>
                                                                                                                                                                                                                                                                                          <a href="tel:6135839977" className="btn-teal text-center">
                                                                                                                                                                                                                                                                                                      Call Now
                                                                                                                                                                                                                                                                                                                </a>
                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                  </section>
                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                    }
}