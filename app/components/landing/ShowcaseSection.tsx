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

// 3x clone for seamless endless conveyor belt
const EXTENDED_TEMPLATES = [...TEMPLATES, ...TEMPLATES, ...TEMPLATES];
const BASE_OFFSET = TEMPLATES.length; // index 8

export function ShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(BASE_OFFSET);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1440);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const isSlidingRef = useRef(false);

  // Measure viewport width
  useEffect(() => {
    const updateWidth = () => {
      setViewportWidth(window.innerWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Card & conveyor belt geometry
  const cardWidth = viewportWidth >= 1024 ? 260 : viewportWidth >= 640 ? 230 : 195;
  const gap = viewportWidth >= 1024 ? 32 : viewportWidth >= 640 ? 24 : 16;
  const stride = cardWidth + gap;

  // Center active card horizontally
  const translateX = viewportWidth / 2 - (activeIndex * stride + cardWidth / 2);

  const handleNext = useCallback(() => {
    if (isSlidingRef.current) return;
    isSlidingRef.current = true;
    setIsTransitioning(true);
    setActiveIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    if (isSlidingRef.current) return;
    isSlidingRef.current = true;
    setIsTransitioning(true);
    setActiveIndex((prev) => prev - 1);
  }, []);

  // Endless loop wrap-around without visual jump
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // Only respond to the track's own transform transition, ignore bubbling child events
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;

    if (activeIndex >= BASE_OFFSET + TEMPLATES.length) {
      setIsTransitioning(false);
      setActiveIndex(activeIndex - TEMPLATES.length);
    } else if (activeIndex < BASE_OFFSET) {
      setIsTransitioning(false);
      setActiveIndex(activeIndex + TEMPLATES.length);
    } else {
      isSlidingRef.current = false;
    }
  };

  // Re-enable smooth transition after silent loop jump via double rAF + reflow
  useEffect(() => {
    if (!isTransitioning) {
      if (trackRef.current) {
        void trackRef.current.offsetHeight;
      }
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsTransitioning(true);
          isSlidingRef.current = false;
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [isTransitioning]);

  // Autoplay conveyor belt every 3.5s when not hovered/paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartXRef.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    if (diff > 40) {
      handlePrev();
    } else if (diff < -40) {
      handleNext();
    }
    touchStartXRef.current = null;
  };

  const currentDisplayIndex = activeIndex % TEMPLATES.length;

  return (
    <section
      id="katalog"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="scroll-mt-20 py-6 sm:py-9 md:py-12 w-full overflow-hidden"
    >
      {/* Anchor alias for navbar #portofolio */}
      <div id="portofolio" className="sr-only" aria-hidden="true" />

      {/* Section Header: Full Width matching Navbar & Footer (no margin) */}
      <div className="w-full px-6 sm:px-8 lg:px-12 mb-4 sm:mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div className="max-w-3xl">
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-berry block mb-2 font-mono">
              Katalog Tema Undangan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink leading-tight">
              Koleksi Desain Pilihan untuk Momen Bersejarah
            </h2>
          </div>

          {/* Controls: "Lihat Lainnya" Link + Conveyor Navigation Arrows */}
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

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Geser ke kiri"
                className="p-2 sm:p-2.5 rounded-full border border-black/15 bg-white text-ink hover:bg-white hover:border-black/40 transition-all duration-150 active:scale-95 shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Geser ke kanan"
                className="p-2 sm:p-2.5 rounded-full border border-black/15 bg-white text-ink hover:bg-white hover:border-black/40 transition-all duration-150 active:scale-95 shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Endless Conveyor Belt Track: Full Viewport Width */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full overflow-visible py-3 sm:py-5 md:py-6 select-none relative"
      >
        <div
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isTransitioning ? "transform 650ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
            gap: `${gap}px`,
          }}
          className="flex items-center will-change-transform"
        >
          {EXTENDED_TEMPLATES.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => {
                  if (!isActive) {
                    setIsTransitioning(true);
                    setActiveIndex(idx);
                  }
                }}
                style={{ width: `${cardWidth}px` }}
                className={`flex-shrink-0 flex flex-col items-center origin-center ${
                  isTransitioning ? "transition-all duration-500 ease-out" : ""
                } ${
                  isActive
                    ? "scale-105 sm:scale-110 lg:scale-[1.12] z-30 opacity-100"
                    : "scale-90 sm:scale-92 z-10 opacity-45 hover:opacity-80 cursor-pointer"
                }`}
              >
                {/* Smartphone Container */}
                <div
                  className={`relative w-full aspect-[389/800] transition-shadow duration-500 ${
                    isActive ? "drop-shadow-2xl" : "drop-shadow-md"
                  }`}
                >
                  {/* Screen Content Underneath Phone Frame: Flush placement without any gap */}
                  <div className="absolute top-[1.2%] bottom-[1.2%] left-[3.5%] right-[3.5%] rounded-[36px] sm:rounded-[40px] overflow-hidden z-10 flex flex-col justify-end">
                    {/* Wallpaper / Template Artwork */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                      />
                      {/* Gradient Scrim for Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25 pointer-events-none" />
                    </div>

                    {/* Floating Dock Card inside Screen */}
                    <div className="relative z-10 p-2 sm:p-2.5 m-2 sm:m-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-white shadow-md pointer-events-none">
                      <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-white/70 block mb-0.5">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Smartphone Mockup Frame Overlay (Provided Asset) */}
                  <img
                    src="/images/phone-mockup.webp"
                    alt="Smartphone Frame"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
                    aria-hidden="true"
                  />
                </div>

                {/* Action Buttons Below Smartphone: Only visible on active center card */}
                <div
                  className={`w-full mt-3.5 flex flex-col sm:flex-row items-center gap-2 transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                  }`}
                >
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-2 sm:py-2.5 px-3 rounded-full border border-black/20 bg-white/95 backdrop-blur-xs text-xs font-semibold text-ink hover:bg-white hover:border-black/50 transition-all duration-150 inline-flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={`https://create.invitea.cards?theme=${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-2 sm:py-2.5 px-3 rounded-full bg-berry text-cream-text text-xs font-semibold hover:bg-berry-deep transition-all duration-150 inline-flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
                  >
                    <span>Gunakan Tema</span>
                    <ExternalLink className="w-3 h-3 opacity-80" aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Dots: Centered under conveyor belt */}
      <div className="w-full px-6 sm:px-8 lg:px-12 mt-4 sm:mt-5 flex items-center justify-center">
        {/* Indicator dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {TEMPLATES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setIsTransitioning(true);
                setActiveIndex(BASE_OFFSET + idx);
              }}
              aria-label={`Lihat tema nomor ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentDisplayIndex === idx
                  ? "w-7 bg-berry"
                  : "w-2 bg-berry/20 hover:bg-berry/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
