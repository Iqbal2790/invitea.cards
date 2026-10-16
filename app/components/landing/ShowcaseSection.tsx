import { useRef, useState, useEffect, useCallback } from "react";
import { Eye, ExternalLink, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

interface TemplateTheme {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  demoUrl: string;
}

const TEMPLATES: TemplateTheme[] = [
  {
    id: "folio-bloom",
    name: "Folio Bloom",
    category: "Floral Editorial",
    thumbnail: "/thumbnails/folio-bloom.png",
    demoUrl: "https://create.invitea.cards",
  },
  {
    id: "memory-lane",
    name: "Memory Lane",
    category: "Film & Sinematik",
    thumbnail: "/thumbnails/memory-lane.png",
    demoUrl: "https://create.invitea.cards",
  },
  {
    id: "vintage-chronicle",
    name: "Vintage Chronicle",
    category: "Editorial Heritage",
    thumbnail: "/thumbnails/vintage-chronicle.jpg",
    demoUrl: "https://create.invitea.cards",
  },
  {
    id: "cosmic-hearts",
    name: "Cosmic Hearts",
    category: "Modern Romantic",
    thumbnail: "/thumbnails/cosmic-hearts.png",
    demoUrl: "https://create.invitea.cards",
  },
  {
    id: "sunny-slab",
    name: "Sunny Slab",
    category: "Minimalist Warmth",
    thumbnail: "/thumbnails/sunny-slab.jpg",
    demoUrl: "https://create.invitea.cards",
  },
  {
    id: "eternal-vows",
    name: "Eternal Vows",
    category: "Classic Monogram",
    thumbnail: "/thumbnails/instant-wedding.jpg",
    demoUrl: "https://create.invitea.cards",
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    category: "Warm Silhouette",
    thumbnail: "/thumbnails/wedding-portrait.jpg",
    demoUrl: "https://create.invitea.cards",
  },
  {
    id: "timeless-grace",
    name: "Timeless Grace",
    category: "Fine Art",
    thumbnail: "/thumbnails/wedding-rings.jpg",
    demoUrl: "https://create.invitea.cards",
  },
];

export function ShowcaseSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const firstCard = el.firstElementChild as HTMLElement | null;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 24; // width + gap
      const newIndex = Math.min(
        Math.max(0, Math.round(scrollLeft / cardWidth)),
        TEMPLATES.length - 1
      );
      setActiveIndex(newIndex);
    }
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 295;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  }, []);

  const scrollTo = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 295;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Autoplay carousel scroll every 3.5s when not hovered
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;

      const nextIndex = (activeIndex + 1) % TEMPLATES.length;
      scrollToIndex(nextIndex);
    }, 3500);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, scrollToIndex]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  return (
    <section id="katalog" className="scroll-mt-20 py-16 sm:py-20 md:py-28 w-full overflow-hidden">
      {/* Anchor alias for navbar #portofolio */}
      <div id="portofolio" className="sr-only" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Controls & "Lihat Lainnya" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10 md:mb-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-[0.2em] uppercase text-berry mb-2 sm:mb-3">
              Katalog Tema Undangan
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-ink leading-[1.15] sm:leading-[1.12]">
              Koleksi Desain Pilihan untuk Momen Bersejarah
            </h2>
          </div>

          {/* Controls: "Lihat Lainnya" Link + Navigation Arrows */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full md:w-auto">
            <a
              href="https://create.invitea.cards"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-full border border-black/20 bg-white/90 hover:bg-berry hover:text-cream-text hover:border-berry text-xs font-medium text-ink transition-all duration-150 shadow-2xs active:scale-95"
            >
              <span>Lihat Lainnya</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTo("left")}
                disabled={!canScrollLeft}
                aria-label="Geser ke kiri"
                className="p-2.5 rounded-full border border-black/15 bg-white text-ink hover:bg-white hover:border-black/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 active:scale-95 shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo("right")}
                disabled={!canScrollRight}
                aria-label="Geser ke kanan"
                className="p-2.5 rounded-full border border-black/15 bg-white text-ink hover:bg-white hover:border-black/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 active:scale-95 shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Scroll Track - Realistic Smartphone Mockups */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-6 sm:gap-7 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-6 pt-2 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 items-stretch"
        >
          {TEMPLATES.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center flex-shrink-0 w-[240px] sm:w-[265px] lg:w-[285px] snap-center group select-none"
            >
              {/* Smartphone Container */}
              <div className="relative w-full aspect-[389/800] transition-transform duration-300 group-hover:-translate-y-1">
                {/* Screen Content Underneath Phone Frame */}
                <div className="absolute top-[2%] bottom-[2%] left-[5%] right-[5%] rounded-[30px] sm:rounded-[34px] overflow-hidden bg-stone-900 z-10 flex flex-col justify-between">
                  {/* Wallpaper / Template Artwork */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Gradient Scrim for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25 pointer-events-none" />
                  </div>

                  {/* Header inside Screen */}
                  <div className="relative z-10 pt-8 px-3 text-center pointer-events-none">
                    <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/70 drop-shadow-xs">
                      The Wedding of
                    </p>
                  </div>

                  {/* Floating Dock Card inside Screen */}
                  <div className="relative z-10 p-2.5 sm:p-3 m-2.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/15 text-white shadow-md pointer-events-none">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-white/70 block mb-0.5">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Smartphone Mockup Frame Overlay (Provided Asset) */}
                <img
                  src="/images/phone-mockup.webp"
                  alt="Smartphone Frame"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
                  aria-hidden="true"
                />
              </div>

              {/* Action Buttons Below Smartphone */}
              <div className="w-full mt-3.5 flex items-center gap-2">
                <a
                  href={item.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-full border border-black/20 bg-white/90 backdrop-blur-xs text-xs font-semibold text-ink hover:bg-white hover:border-black/50 transition-all duration-150 inline-flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                  <span>Live Demo</span>
                </a>
                <a
                  href={`https://create.invitea.cards?theme=${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-full bg-berry text-cream-text text-xs font-semibold hover:bg-berry-deep transition-all duration-150 inline-flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
                >
                  <span>Gunakan Tema</span>
                  <ExternalLink className="w-3 h-3 opacity-80" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}

          {/* End Card: "Lihat Semua Tema" Discovery Card */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 w-[220px] sm:w-[245px] snap-center select-none">
            <a
              href="https://create.invitea.cards"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full aspect-[389/800] rounded-[36px] sm:rounded-[40px] border-2 border-dashed border-berry/30 hover:border-berry bg-white/50 hover:bg-white/80 transition-all duration-300 p-6 flex flex-col items-center justify-center text-center shadow-2xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-berry/10 text-berry flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-berry group-hover:text-cream-text transition-all duration-200">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold text-ink mb-2">
                Lihat Semua Tema
              </span>
              <p className="text-xs text-ink-soft leading-relaxed max-w-[18ch]">
                Jelajahi seluruh koleksi desain di Creator Studio
              </p>
              <span className="mt-5 inline-flex items-center gap-1 px-4 py-2 rounded-full bg-berry text-cream-text text-xs font-medium">
                Buka Creator
              </span>
            </a>
            {/* Spacer matching bottom buttons height */}
            <div className="w-full mt-3.5 h-[38px]" />
          </div>
        </div>

        {/* Progress Indicator Dots & Counter */}
        <div className="mt-8 flex items-center justify-between">
          {/* Indicator dots */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {TEMPLATES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Lihat tema nomor ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-200 ${
                  activeIndex === idx
                    ? "w-7 bg-berry"
                    : "w-2 bg-berry/20 hover:bg-berry/40"
                }`}
              />
            ))}
          </div>

          {/* Counter text */}
          <span className="text-xs font-mono text-ink-soft font-medium">
            0{activeIndex + 1} / 0{TEMPLATES.length}
          </span>
        </div>
      </div>
    </section>
  );
}
