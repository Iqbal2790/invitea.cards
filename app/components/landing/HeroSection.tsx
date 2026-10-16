import { ArrowRight } from "lucide-react";

interface ThemeCard {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  isHero?: boolean;
  demoUrl: string;
}

const THEME_CARDS: ThemeCard[] = [
  {
    id: "vintage-chronicle",
    name: "Vintage Chronicle",
    category: "Classic Typographic",
    thumbnail: "/thumbnails/vintage-chronicle.jpg",
    demoUrl: "https://create.invitea.cards?theme=vintage-chronicle",
  },
  {
    id: "folio-bloom",
    name: "Folio Bloom",
    category: "Floral & Editorial",
    thumbnail: "/thumbnails/folio-bloom.png",
    isHero: true,
    demoUrl: "https://create.invitea.cards?theme=folio-bloom",
  },
  {
    id: "memory-lane",
    name: "Memory Lane",
    category: "Modern Film & Monogram",
    thumbnail: "/thumbnails/memory-lane.png",
    demoUrl: "https://create.invitea.cards?theme=memory-lane",
  },
];

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Center Content */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Subtle Monochromatic Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[oklch(85%_0.03_25/0.8)] bg-[oklch(92%_0.02_75/0.4)] text-xs font-medium text-ink-soft mb-3 sm:mb-3.5 tracking-wide">
            Kini Hadir untuk Momen Spesialmu
          </div>

          {/* H1 Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-ink font-normal max-w-3xl mx-auto">
            Sampaikan Kabar Bahagiamu dengan{" "}
            <em className="italic font-serif">Sepenuh Hati.</em>
          </h1>

          {/* Description */}
          <p className="text-ink-soft text-sm sm:text-base max-w-xl mx-auto mt-2.5 sm:mt-3 leading-relaxed">
            Rayakan hari bahagiamu dengan undangan pernikahan digital yang indah dan bermakna. Setiap detail disiapkan untuk mengabadikan awal perjalanan cinta kalian berdua.
          </p>

          {/* Center Dual CTAs */}
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#katalog"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-berry text-cream-text hover:bg-berry-deep rounded-full px-8 py-3.5 text-sm font-medium transition-all shadow-sm"
            >
              Lihat Katalog Undangan
            </a>

            <a
              href="https://create.invitea.cards"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-black text-black hover:bg-black/5 rounded-full px-8 py-3.5 text-sm font-medium transition-all"
            >
              Coba Template Instan
            </a>
          </div>
        </div>

        {/* Bottom: Panoramic Theme Ribbon / Showcase Dock */}
        <div className="mt-7 sm:mt-8 md:mt-9 w-full max-w-[860px] mx-auto">
          <div className="flex md:grid md:grid-cols-3 items-center justify-start md:justify-center gap-4 sm:gap-5 lg:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-4 sm:px-6 md:px-0 pb-4 pt-2 no-scrollbar">
            {THEME_CARDS.map((card) => {
              const isHero = card.isHero;
              return (
                <div
                  key={card.id}
                  className={`flex-shrink-0 w-[260px] sm:w-[275px] md:w-auto snap-center transition-all duration-300 ${
                    isHero
                      ? "md:scale-105 md:-translate-y-2.5 z-10"
                      : "md:scale-95 md:opacity-90 hover:md:opacity-100 hover:md:scale-100"
                  }`}
                >
                  <a
                    href={card.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block group rounded-2xl overflow-hidden border border-[oklch(85%_0.03_25/0.8)] bg-white/80 backdrop-blur-xs p-3 sm:p-3.5 shadow-md hover:shadow-xl shadow-ink/5 transition-all duration-300 ${
                      isHero ? "ring-1 ring-black/5 shadow-2xl shadow-ink/10" : ""
                    }`}
                  >
                    {/* Frame image with proportional portrait ratio */}
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[oklch(91%_0.035_25)]">
                      <img
                        src={card.thumbnail}
                        alt={`Tema Undangan ${card.name}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading={isHero ? "eager" : "lazy"}
                      />

                      {/* Spotlight badge for center card */}
                      {isHero && (
                        <div className="absolute top-2.5 right-2.5 pointer-events-none">
                          <span className="backdrop-blur-md bg-berry text-cream-text text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
                            Favorit
                          </span>
                        </div>
                      )}

                      {/* Subtle hover overlay hint */}
                      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-ink text-xs font-medium shadow-sm backdrop-blur-xs">
                          Lihat Desain <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Micro-badge / Card Footer */}
                    <div className="pt-3 pb-1 px-1 flex items-center justify-center gap-1.5 text-xs">
                      <span className="font-serif font-medium text-ink text-sm sm:text-base tracking-tight whitespace-nowrap">
                        {card.name}
                      </span>
                      <span className="text-[oklch(85%_0.03_25)] text-xs" aria-hidden="true">
                        •
                      </span>
                      <span className="text-[11px] sm:text-xs text-ink-soft tracking-wide whitespace-nowrap">
                        {card.category}
                      </span>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
