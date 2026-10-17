import { MessageCircle, ExternalLink } from "lucide-react";

export function CtaSection() {
  return (
    <section id="inquiry" className="scroll-mt-20 py-20 md:py-28 w-full">
      <div id="pricing" className="sr-only" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative rounded-3xl bg-berry-deep text-cream-text px-8 py-14 sm:px-12 sm:py-20 lg:p-20 overflow-hidden shadow-xl">
          {/* Subtle curved background ornament */}
          <svg
            className="absolute -right-16 -bottom-16 w-80 h-80 opacity-15 pointer-events-none select-none"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M75 140C75 140 20 120 20 75C20 45 45 30 65 40C80 47 80 65 68 70C58 74 48 65 55 55"
              stroke="oklch(94% 0.02 70)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="75" cy="30" r="9" stroke="oklch(94% 0.02 70)" strokeWidth="1.4" />
          </svg>

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-pink-soft block mb-2 font-mono">
              Mulai Perjalanan Anda
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-cream-text leading-tight">
              Sampaikan Kabar Bahagiamu Mulai Hari Ini
            </h2>
            <p className="mt-5 text-base sm:text-lg text-cream-text/80 max-w-[48ch] leading-relaxed">
              Konsultasikan konsep undangan pernikahan bersama tim pendamping kami melalui WhatsApp, atau rangkai sendiri secara praktis menggunakan template instan.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Invitea%2C%20saya%20tertarik%20konsultasi%20undangan%20pernikahan."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-sans font-semibold text-sm tracking-wide bg-cream-text text-berry-deep hover:bg-cream-text/90 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Konsultasi via WhatsApp</span>
              </a>

              <a
                href="https://create.invitea.cards"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-sans font-semibold text-sm tracking-wide border border-cream-text/30 text-cream-text hover:bg-cream-text/10 transition-all duration-200"
              >
                <span>Buat Mandiri Sekarang</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
