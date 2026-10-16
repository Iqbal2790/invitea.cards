import { useRef, useState, useEffect } from "react";
import { Eye, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface TemplateTheme {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  description: string;
  demoUrl: string;
}

const TEMPLATES: TemplateTheme[] = [
  {
    id: "folio-bloom",
    name: "Folio Bloom",
    category: "Floral Editorial",
    thumbnail: "/thumbnails/folio-bloom.png",
    description:
      "Sentuhan botanical editorial dengan tipografi klasik dan aksen dedaunan yang anggun untuk suasana resepsi yang hangat.",
    demoUrl: "https://create.invitea.cards",
  },
  {
    id: "memory-lane",
    name: "Memory Lane",
    category: "Film & Sinematik",
    thumbnail: "/thumbnails/memory-lane.png",
    description:
      "Nuansa rol film klasik dan kolase foto hangat untuk merangkai perjalanan cinta kalian berdua dalam alur cerita berkesan.",
    demoUrl: "https://create.invitea.cards",
  },
  {
    id: "vintage-chronicle",
    name: "Vintage Chronicle",
    category: "Editorial Heritage",
    thumbnail: "/thumbnails/vintage-chronicle.jpg",
    description:
      "Inspirasi tata letak surat kabar klasik nan berkelas, mengabarkan hari pernikahan kalian layaknya tajuk warta bersejarah.",
    demoUrl: "https://create.invitea.cards",
  },
  {
    id: "cosmic-hearts",
    name: "Cosmic Hearts",
    category: "Modern Romantic",
    thumbnail: "/thumbnails/cosmic-hearts.png",
    description:
      "Harmoni konstelasi malam bertabur bintang dengan tipografi modern yang syahdu untuk momen perayaan yang magis.",
    demoUrl: "https://create.invitea.cards",
  },
  {
    id: "sunny-slab",
    name: "Sunny Slab",
    category: "Minimalist Warmth",
    thumbnail: "/thumbnails/sunny-slab.jpg",
    description:
      "Desain minimalis berestetika hangat dengan komposisi tipografi tegas, menghadirkan kejelasan informasi bagi seluruh tamu.",
    demoUrl: "https://create.invitea.cards",
  },
  {
    id: "eternal-vows",
    name: "Eternal Vows",
    category: "Classic Monogram",
    thumbnail: "/thumbnails/instant-wedding.jpg",
    description:
      "Sentuhan monogram abadi dan tata letak simetris yang khidmat, mengabadikan momen janji suci pernikahan dengan sempurna.",
    demoUrl: "https://create.invitea.cards",
  },
];

export function ShowcaseSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate current item based on card width
    const firstCard = el.firstElementChild as HTMLElement | null;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 24; // width + gap
      const newIndex = Math.min(
        Math.round(scrollLeft / cardWidth),
        TEMPLATES.length - 1
      );
      setActiveIndex(newIndex);
    }
  };

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
  }, []);

  const scrollTo = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 380;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 380;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  return (
    <section id="katalog" className="scroll-mt-20 py-20 md:py-28 w-full overflow-hidden">
      {/* Anchor alias for navbar #portofolio */}
      <div id="portofolio" className="sr-only" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-[0.2em] uppercase text-berry mb-3">
              Katalog Tema Undangan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-ink leading-[1.12]">
              Koleksi Desain Pilihan untuk Momen Bersejarah
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-ink-soft leading-relaxed max-w-xl">
              Jelajahi berbagai tema undangan digital yang dirancang dengan ketelitian visual, tipografi anggun, dan responsif di setiap layar.
            </p>
          </div>

          {/* Desktop Navigation Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollTo("left")}
              disabled={!canScrollLeft}
              aria-label="Geser ke kiri"
              className="p-3 rounded-full border border-black/15 bg-white text-ink hover:bg-white hover:border-black/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 active:scale-95 shadow-2xs"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo("right")}
              disabled={!canScrollRight}
              aria-label="Geser ke kanan"
              className="p-3 rounded-full border border-black/15 bg-white text-ink hover:bg-white hover:border-black/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 active:scale-95 shadow-2xs"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Carousel Scroll Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-6 pt-1 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
        >
          {TEMPLATES.map((item) => (
            <div
              key={item.id}
              className="w-[85vw] max-w-[340px] sm:w-[380px] lg:w-[420px] flex-shrink-0 snap-start group flex flex-col rounded-2xl border border-[oklch(85%_0.03_25/0.8)] bg-white/70 backdrop-blur-xs overflow-hidden hover:border-berry/40 transition-all duration-300 shadow-2xs hover:shadow-md"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-berry-deep/10">
                <img
                  src={item.thumbnail}
                  alt={`Preview tema ${item.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="flex-1 flex flex-col justify-between p-6 sm:p-7">
                <div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-berry block mb-1.5">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-5 border-t border-[oklch(38%_0.14_15)]/10 flex items-center justify-between gap-3">
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-berry hover:text-berry-deep transition-colors"
                  >
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    <span>Live Demo</span>
                  </a>

                  <a
                    href={`https://create.invitea.cards?theme=${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-berry text-cream-text hover:bg-berry-deep transition-all duration-150 active:scale-95 shadow-2xs"
                  >
                    <span>Gunakan Tema</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots & Progress Indicator */}
        <div className="mt-8 flex items-center justify-between">
          {/* Indicator dots */}
          <div className="flex items-center gap-2">
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

        {/* Bottom Catalog Action */}
        <div className="mt-12 text-center">
          <a
            href="https://create.invitea.cards"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-sans font-medium text-sm tracking-wide border border-black bg-white hover:bg-berry hover:text-cream-text hover:border-berry transition-all duration-200 shadow-2xs"
          >
            <span>Jelajahi Semua Template di Creator</span>
            <ExternalLink className="w-4 h-4 opacity-75" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
