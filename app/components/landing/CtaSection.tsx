import { MessageCircle, ArrowUpRight, Check } from "lucide-react";

export function CtaSection() {
  return (
    <section id="inquiry" className="scroll-mt-20 py-14 sm:py-20 md:py-24 w-full">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="relative rounded-3xl sm:rounded-4xl bg-[#000000] text-white px-6 py-10 sm:px-10 sm:py-14 lg:p-14 overflow-hidden border border-white/10 shadow-xl">
          {/* Subtle curved background ornament matching Invitea brand mark */}
          <svg
            className="absolute -right-12 -bottom-12 sm:-right-16 sm:-bottom-16 w-72 h-72 sm:w-96 sm:h-96 opacity-10 pointer-events-none select-none"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M75 140C75 140 20 120 20 75C20 45 45 30 65 40C80 47 80 65 68 70C58 74 48 65 55 55"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="75" cy="30" r="9" stroke="white" strokeWidth="1.5" />
          </svg>

          {/* Main 2-Column Grid: Left Content + Right Clean Device Showcase */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Left Column: Left-aligned Content & Conversion Actions */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAEB92] text-black text-xs font-semibold tracking-wide font-sans mb-4 shadow-2xs">
                <span>Mulai Hari Bahagiamu</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium tracking-tight text-white leading-[1.15] text-balance">
                Sampaikan Kabar Bahagiamu Mulai Hari Ini
              </h2>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/80 max-w-xl leading-relaxed font-sans text-balance">
                Mulai buat undangan pernikahan digital Anda secara mandiri dalam hitungan menit, atau konsultasikan konsep desain kustom bersama kami melalui WhatsApp.
              </p>

              {/* Dual CTAs: Primary & Secondary */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href="https://create.invitea.cards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-sans font-semibold text-sm sm:text-base tracking-wide bg-[#9929EA] text-white hover:bg-[#851FD1] transition-all duration-150 shadow-sm active:scale-95 whitespace-nowrap"
                >
                  <span>Mulai Buat Undangan Gratis</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href="https://wa.me/6282255667944?text=Halo%20Invitea%2C%20saya%20tertarik%20konsultasi%20undangan%20pernikahan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-sans font-semibold text-sm sm:text-base tracking-wide border border-white/30 text-white hover:bg-white/10 hover:border-white transition-all duration-150 active:scale-95 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Konsultasi via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Clean Device Mockups (Laptop + Phone) - Hidden on Mobile */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 relative w-full items-center justify-center xl:justify-end select-none">
              <div className="relative w-full max-w-[450px] xl:max-w-[480px]">
                {/* Laptop Mockup: Exactly 800/489 matching hardware asset */}
                <div className="relative w-full aspect-[800/489]">
                  {/* Laptop Screen Content: Exact screen cutout (4.3% top, 10.6% bottom, 9.6% sides) */}
                  <div className="absolute top-[4.3%] bottom-[10.6%] left-[9.6%] right-[9.6%] overflow-hidden bg-[#1F070C] rounded-t-[4px] flex flex-col">
                    {/* Clean Browser Chrome */}
                    <div className="h-5 bg-[#2D0912] text-cream-text/80 flex items-center px-2.5 gap-1.5 border-b border-white/10 shrink-0">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                      </div>
                      <div className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[7px] font-mono text-cream-text/75 mx-auto">
                        invitea.cards/baskara-nadhira
                      </div>
                    </div>

                    {/* Wedding Invitation Screen Body */}
                    <div className="relative flex-1 overflow-hidden flex flex-col justify-between p-2.5 text-white">
                      <img
                        src="/thumbnails/wedding-rings.jpg"
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.62]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1F070C] via-[#1F070C]/40 to-transparent" />

                      <div className="relative z-10 text-center space-y-0.5">
                        <span className="text-[6.5px] font-mono uppercase tracking-widest text-pink-soft block">
                          The Wedding Celebration
                        </span>
                        <h4 className="font-serif text-sm sm:text-base font-medium text-white leading-tight">
                          Baskara &amp; Nadhira
                        </h4>
                        <p className="text-[7px] text-cream-text/80 font-sans">
                          Sabtu, 24 Oktober 2026 &bull; Jakarta
                        </p>
                      </div>

                      {/* Couple Countdown & Direct Actions */}
                      <div className="relative z-10 flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1 text-[6.5px] font-mono text-white/90">
                          <span className="px-1.5 py-0.5 rounded bg-white/20 backdrop-blur-sm border border-white/20">
                            14 Hari
                          </span>
                          <span>:</span>
                          <span className="px-1.5 py-0.5 rounded bg-white/20 backdrop-blur-sm border border-white/20">
                            08 Jam
                          </span>
                          <span>:</span>
                          <span className="px-1.5 py-0.5 rounded bg-white/20 backdrop-blur-sm border border-white/20">
                            45 Mnt
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-white text-ink text-[6.5px] font-semibold">
                            Kirim Hadiah
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-berry text-white text-[6.5px] font-semibold border border-white/20">
                            Isi RSVP
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Laptop Mockup Bezel */}
                  <img
                    src="/images/laptop-mockup.webp"
                    alt="Mockup Laptop"
                    className="absolute inset-0 w-full h-full pointer-events-none object-fill z-10 drop-shadow-2xl"
                  />

                  {/* Overlapping Phone Mockup (Bottom-Right) */}
                  <div className="absolute -bottom-1.5 right-0 w-[95px] sm:w-[110px] xl:w-[120px] aspect-[9/18.5] z-20 drop-shadow-2xl">
                    <div className="relative w-full h-full">
                      {/* Screen Content: Mobile Invitation View */}
                      <div className="absolute top-[1.2%] bottom-[1.2%] left-[3.5%] right-[3.5%] rounded-[12px] sm:rounded-[16px] overflow-hidden bg-stone-900 shadow-xl">
                        <img
                          src="/thumbnails/folio-bloom.png"
                          alt="Mobile Preview"
                          className="w-full h-full object-cover object-top filter brightness-[0.92]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                        {/* Mobile RSVP Indicator */}
                        <div className="absolute bottom-1.5 inset-x-1 p-1 rounded bg-black/85 backdrop-blur-md border border-white/20 text-white flex flex-col gap-0.5 text-center">
                          <div className="flex items-center justify-between text-[5.5px] font-mono text-emerald-400 font-bold">
                            <span>✓ RSVP HADIR</span>
                            <span>2 Tamu</span>
                          </div>
                          <span className="text-[5px] text-white/80 truncate">
                            Dimas Prasetyo
                          </span>
                        </div>
                      </div>

                      {/* Phone Bezel */}
                      <img
                        src="/images/phone-mockup.webp"
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full pointer-events-none object-fill z-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width Divider & Trust Micro-Guarantees spanning bottom */}
          <div className="relative z-10 mt-10 pt-6 border-t border-cream-text/20 w-full flex flex-wrap items-center justify-start gap-y-3 gap-x-8 sm:gap-x-10 text-xs sm:text-sm text-cream-text/90 font-sans">
            <div className="inline-flex items-center gap-2">
              <Check className="w-4 h-4 text-pink-soft shrink-0" aria-hidden="true" />
              <span>Tanpa Biaya di Awal</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Check className="w-4 h-4 text-pink-soft shrink-0" aria-hidden="true" />
              <span>Siap dalam Hitungan Menit</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Check className="w-4 h-4 text-pink-soft shrink-0" aria-hidden="true" />
              <span>Akses Selamanya</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
