import { MessageCircle, ArrowUpRight, Check, Lock } from "lucide-react";

export function CtaSection() {
  return (
    <section id="inquiry" className="scroll-mt-20 py-14 sm:py-20 md:py-24 w-full">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="relative rounded-3xl sm:rounded-4xl bg-berry-deep text-cream-text px-6 py-10 sm:px-10 sm:py-14 lg:p-14 overflow-hidden border border-white/10 shadow-xl">
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
              stroke="oklch(94% 0.02 70)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="75" cy="30" r="9" stroke="oklch(94% 0.02 70)" strokeWidth="1.5" />
          </svg>

          {/* Main 2-Column Grid: Left Content + Right Live Device Showcase */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            {/* Left Column: Left-aligned Content & Conversion Actions */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left">
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-pink-soft block mb-3 font-mono">
                Mulai Hari Bahagiamu
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium tracking-tight text-cream-text leading-[1.15] text-balance">
                Sampaikan Kabar Bahagiamu Mulai Hari Ini
              </h2>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-cream-text/85 max-w-xl leading-relaxed font-sans text-balance">
                Mulai buat undangan pernikahan digital Anda secara mandiri dalam hitungan menit, atau konsultasikan konsep desain kustom bersama kami melalui WhatsApp.
              </p>

              {/* Dual CTAs: Primary & Secondary */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href="https://create.invitea.cards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-sans font-semibold text-sm sm:text-base tracking-wide bg-cream-text text-berry-deep hover:bg-white transition-all duration-150 shadow-sm active:scale-95 whitespace-nowrap"
                >
                  <span>Mulai Buat Undangan Gratis</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href="https://wa.me/6281234567890?text=Halo%20Invitea%2C%20saya%20tertarik%20konsultasi%20undangan%20pernikahan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-sans font-semibold text-sm sm:text-base tracking-wide border border-cream-text/60 text-cream-text hover:bg-cream-text/10 hover:border-cream-text transition-all duration-150 active:scale-95 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Konsultasi via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: High-Impact Device Mockups (Laptop + Phone) - Hidden on Mobile */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 relative w-full items-center justify-center xl:justify-end select-none">
              <div className="relative w-full max-w-[460px] xl:max-w-[510px]">
                {/* Floating Top Badge: Live Website & SSL Status */}
                <div className="absolute -top-3 left-6 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-lg text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Domain Aktif &bull; SSL Aman</span>
                </div>

                {/* Laptop Mockup: Live Published Invitation Page */}
                <div className="relative w-full aspect-[16/10]">
                  {/* Laptop Screen Content Container */}
                  <div className="absolute top-[3.2%] bottom-[13%] left-[11.8%] right-[11.8%] rounded-t-[5px] overflow-hidden bg-[#1F070C] text-cream-text flex flex-col border border-black/20 shadow-inner">
                    {/* Sleek Browser Bar with URL */}
                    <div className="h-5 sm:h-6 bg-[#2D0912] text-cream-text flex items-center px-2.5 gap-1.5 border-b border-white/10 shrink-0">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                      </div>
                      <div className="px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-[7px] sm:text-[8px] font-mono text-cream-text/80 flex items-center gap-1 mx-auto">
                        <Lock className="w-2 h-2 text-emerald-400 shrink-0" />
                        <span>invitea.cards/baskara-nadhira</span>
                      </div>
                    </div>

                    {/* Live Website Screen Body */}
                    <div className="relative flex-1 overflow-hidden flex flex-col justify-between p-2.5 sm:p-3">
                      <img
                        src="/thumbnails/wedding-rings.jpg"
                        alt="Wedding Background"
                        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.6] scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1F070C] via-[#1F070C]/50 to-transparent" />

                      <div className="relative z-10 text-center space-y-0.5">
                        <span className="text-[7px] sm:text-[8px] font-mono uppercase tracking-widest text-pink-soft block">
                          The Wedding Celebration
                        </span>
                        <h4 className="font-serif text-sm sm:text-base xl:text-lg font-medium text-white leading-tight">
                          Baskara &amp; Nadhira
                        </h4>
                        <p className="text-[7px] sm:text-[8px] text-cream-text/75 font-sans">
                          Sabtu, 24 Oktober 2026 &bull; Jakarta
                        </p>
                      </div>

                      {/* Live Countdown & Interactive Actions */}
                      <div className="relative z-10 flex flex-col items-center gap-1.5 pb-1">
                        <div className="flex items-center gap-1 text-[6.5px] sm:text-[7.5px] font-mono text-white/90">
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
                          <span className="px-2 py-0.5 rounded-full bg-white text-ink text-[6.5px] sm:text-[7.5px] font-semibold shadow-sm">
                            Kirim Hadiah
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-berry text-white text-[6.5px] sm:text-[7.5px] font-semibold border border-white/20">
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
                  <div className="absolute -bottom-2 -right-1 xl:-right-3 w-[100px] sm:w-[120px] xl:w-[135px] aspect-[9/18.5] z-20 drop-shadow-2xl">
                    <div className="relative w-full h-full">
                      {/* Screen Content: Mobile Invitation View */}
                      <div className="absolute top-[1.2%] bottom-[1.2%] left-[3.5%] right-[3.5%] rounded-[12px] sm:rounded-[18px] overflow-hidden bg-stone-900 shadow-xl">
                        <img
                          src="/thumbnails/folio-bloom.png"
                          alt="Mobile Preview"
                          className="w-full h-full object-cover object-top filter brightness-[0.92]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                        {/* Interactive Mobile RSVP Toast */}
                        <div className="absolute bottom-1.5 inset-x-1 p-1 sm:p-1.5 rounded sm:rounded-lg bg-black/85 backdrop-blur-md border border-white/20 text-white flex flex-col gap-0.5 text-center">
                          <div className="flex items-center justify-between text-[5.5px] sm:text-[7px] font-mono text-emerald-400 font-bold">
                            <span>✓ RSVP HADIR</span>
                            <span>2 Tamu</span>
                          </div>
                          <span className="text-[5px] sm:text-[6.5px] text-white/80 truncate">
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

                {/* Floating Bottom Badge: Verified RSVP Rate */}
                <div className="absolute -bottom-2 left-6 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-ink shadow-xl text-[10px] font-sans font-semibold border border-black/10">
                  <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  <span>99.8% Tamu Terkonfirmasi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width Divider & Trust Micro-Guarantees spanning bottom */}
          <div className="relative z-10 mt-10 pt-6 border-t border-cream-text/20 w-full flex flex-wrap items-center justify-start sm:justify-between gap-y-3 gap-x-6 text-xs sm:text-sm text-cream-text/90 font-sans">
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
