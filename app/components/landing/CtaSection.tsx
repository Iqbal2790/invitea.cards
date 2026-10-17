import { MessageCircle, ArrowUpRight, Check, Heart } from "lucide-react";

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

          {/* Top 2-Column Grid: Left Content + Right Floating Mockup */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Left-aligned Content & Conversion Actions */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
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

            {/* Right Column: Floating Card Mockup (Option 1) */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:justify-end select-none">
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] h-[310px] sm:h-[330px]">
                {/* Back Card: Wedding Invitation Preview (Tilted -3deg) */}
                <div className="absolute left-0 sm:left-2 top-0 w-[230px] sm:w-[260px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-[#24060e] text-cream-text -rotate-3 transition-transform duration-300 hover:rotate-0">
                  <div className="relative h-28 sm:h-30 overflow-hidden">
                    <img
                      src="/thumbnails/wedding-portrait.jpg"
                      alt="Preview Undangan"
                      className="w-full h-full object-cover object-top filter brightness-[0.92]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#24060e] via-transparent to-black/20" />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-black/50 text-pink-soft backdrop-blur-md border border-white/10">
                      Editorial Theme
                    </span>
                  </div>
                  <div className="p-3 sm:p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-pink-soft/80 text-[10px] font-mono uppercase tracking-wider">
                      <Heart className="w-2.5 h-2.5 text-pink-soft fill-pink-soft" />
                      <span>The Wedding Of</span>
                    </div>
                    <h3 className="font-serif text-sm sm:text-base font-medium leading-tight text-cream-text">
                      Baskara &amp; Nadhira
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-cream-text/70 font-sans">
                      Sabtu, 24 Oktober 2026
                    </p>
                    <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-cream-text/60">
                      <span className="truncate">invitea.cards/baskara-nadhira</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 ml-1.5" />
                    </div>
                  </div>
                </div>

                {/* Front Card: Live Interactive RSVP Response (Tilted +3deg) */}
                <div className="absolute right-0 sm:right-2 bottom-0 w-[215px] sm:w-[245px] rounded-xl p-3 sm:p-3.5 shadow-2xl border border-black/10 bg-[#FAF7F2] text-[#1D1B1E] rotate-3 transition-transform duration-300 hover:rotate-0 z-20">
                  <div className="flex items-center justify-between pb-1.5 border-b border-black/10">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                      </span>
                      <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-emerald-800">
                        RSVP Terkonfirmasi
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-zinc-600">Baru saja</span>
                  </div>

                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-bold text-xs sm:text-sm text-zinc-900">
                        Dimas Prasetyo
                      </span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        <Check className="w-2.5 h-2.5" />
                        2 Tamu
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-zinc-600 italic leading-snug pt-1 border-t border-zinc-200">
                      &ldquo;Selamat ya Baskara &amp; Nadhira! Semoga lancar sampai hari H.&rdquo;
                    </p>
                  </div>
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
