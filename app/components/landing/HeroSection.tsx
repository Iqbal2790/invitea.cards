import { ArrowRight, ExternalLink } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left Column: Copywriting & Actions */}
          <div className="flex flex-col items-start text-left">
            <span className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-berry mb-4 sm:mb-5 before:content-[''] before:w-6 before:h-[1.5px] before:bg-berry">
              Kini Hadir untuk Momen Spesialmu
            </span>

            <h1 className="font-serif text-[clamp(2.75rem,5.5vw,4.5rem)] font-medium leading-[1.08] tracking-tight text-ink">
              Sampaikan Kabar Bahagiamu dengan{" "}
              <em className="italic font-serif text-berry">Sepenuh Hati.</em>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-ink-soft max-w-[48ch] leading-relaxed">
              Rayakan hari bahagiamu dengan undangan pernikahan digital yang indah dan bermakna. Setiap detail disiapkan untuk mengabadikan awal perjalanan cinta kalian berdua.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-sans font-semibold text-sm tracking-wide bg-berry text-cream-text shadow-sm hover:bg-berry-deep hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Lihat Katalog Undangan</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="https://create.invitea.cards"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-sans font-semibold text-sm tracking-wide border border-berry text-berry hover:bg-berry hover:text-cream-text transition-all duration-200"
              >
                <span>Coba Template Instan</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame */}
          <div className="relative w-full flex justify-center lg:justify-end">
            {/* Soft decorative SVG ornament */}
            <svg
              className="hidden sm:block absolute -top-7 -left-4 sm:-top-8 sm:-left-6 w-36 h-36 opacity-75 pointer-events-none z-0"
              viewBox="0 0 150 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M75 140C75 140 20 120 20 75C20 45 45 30 65 40C80 47 80 65 68 70C58 74 48 65 55 55"
                stroke="oklch(72% 0.09 16)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle cx="75" cy="30" r="9" stroke="oklch(72% 0.09 16)" strokeWidth="1.4" />
              <path d="M75 39C75 39 68 55 75 65C82 55 75 39 75 39Z" stroke="oklch(72% 0.09 16)" strokeWidth="1.2" />
            </svg>

            {/* Asymmetrical Curved Photo Frame */}
            <div className="relative w-full max-w-[430px] rounded-[4px_120px_4px_4px] overflow-hidden shadow-2xl lg:rotate-[2deg] border-[6px] border-[oklch(91%_0.035_25)] bg-[oklch(91%_0.035_25)] z-10">
              <img
                src="/hero-wedding.jpg"
                alt="Momen romantis pernikahan Invitea"
                className="w-full h-[400px] sm:h-[480px] object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
