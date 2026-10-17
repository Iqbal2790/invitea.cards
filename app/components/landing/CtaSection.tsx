import { MessageCircle, ArrowUpRight, Check } from "lucide-react";

export function CtaSection() {
  return (
    <section id="inquiry" className="scroll-mt-20 py-14 sm:py-20 md:py-24 w-full">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="relative rounded-3xl sm:rounded-4xl bg-berry-deep text-cream-text px-6 py-12 sm:px-12 sm:py-16 lg:p-20 overflow-hidden border border-white/10 shadow-xl">
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

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-pink-soft block mb-3 font-mono">
              Mulai Hari Bahagiamu
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-cream-text leading-tight text-balance">
              Sampaikan Kabar Bahagiamu Mulai Hari Ini
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-cream-text/85 max-w-xl mx-auto leading-relaxed font-sans text-balance">
              Mulai buat undangan pernikahan digital Anda secara mandiri dalam hitungan menit, atau konsultasikan konsep desain kustom bersama kami melalui WhatsApp.
            </p>

            {/* Dual CTAs: Primary & Secondary */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="https://create.invitea.cards"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-sans font-semibold text-sm sm:text-base tracking-wide bg-cream-text text-berry-deep hover:bg-white transition-all duration-150 shadow-sm active:scale-95 whitespace-nowrap"
              >
                <span>Mulai Buat Undangan Gratis</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="https://wa.me/6281234567890?text=Halo%20Invitea%2C%20saya%20tertarik%20konsultasi%20undangan%20pernikahan."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-sans font-semibold text-sm sm:text-base tracking-wide border border-cream-text/60 text-cream-text hover:bg-cream-text/10 hover:border-cream-text transition-all duration-150 active:scale-95 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Konsultasi via WhatsApp</span>
              </a>
            </div>

            {/* Trust Micro-Guarantees */}
            <div className="mt-10 sm:mt-12 pt-8 border-t border-cream-text/20 w-full flex flex-wrap items-center justify-center gap-y-3 gap-x-6 sm:gap-x-10 text-xs sm:text-sm text-cream-text/90 font-sans">
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
      </div>
    </section>
  );
}
