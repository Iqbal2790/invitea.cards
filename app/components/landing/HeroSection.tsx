import { ArrowRight } from "lucide-react";

interface HeroFeatureCard {
  id: string;
  badge: string;
  title: string;
  description: string;
  thumbnail: string;
  href: string;
  actionText: string;
  isExternal?: boolean;
  isAccent?: boolean;
}

const HERO_CARDS: HeroFeatureCard[] = [
  {
    id: "catalog",
    badge: "Koleksi Pilihan",
    title: "Katalog Desain Eksklusif",
    description:
      "Pilihan tema pernikahan artistik yang disiapkan penuh keanggunan untuk mengabadikan momen kalian.",
    thumbnail: "/thumbnails/instant-wedding.jpg",
    href: "#katalog",
    actionText: "Jelajahi Katalog",
  },
  {
    id: "instant-builder",
    badge: "Praktis & Mandiri",
    title: "Instant Template Builder",
    description:
      "Buat dan terbitkan undangan pernikahan digital siap pakai dalam hitungan menit secara mandiri.",
    thumbnail: "/thumbnails/wedding-portrait.jpg",
    href: "https://create.invitea.cards",
    actionText: "Coba Template Instan",
    isExternal: true,
    isAccent: true,
  },
  {
    id: "guest-management",
    badge: "Sinkronisasi Otomatis",
    title: "RSVP & Buku Tamu Digital",
    description:
      "Kelola konfirmasi kehadiran dan ucapan doa restu tamu secara real-time tanpa repot rekap manual.",
    thumbnail: "/thumbnails/wedding-rings.jpg",
    href: "#fitur",
    actionText: "Pelajari Fitur Tamu",
  },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full pt-4 sm:pt-6 md:pt-8 pb-10 sm:pb-14 lg:pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header Stack (Hero-36 Pattern) */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10">
          {/* Kicker Outline Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[oklch(85%_0.03_25/0.8)] bg-white/70 backdrop-blur-xs text-xs font-medium text-ink-soft mb-3 sm:mb-4 tracking-wide shadow-2xs">
            <span>Kini Hadir untuk Momen Spesialmu</span>
          </div>

          {/* H1 Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.12] text-ink font-normal max-w-3xl mx-auto">
            Sampaikan Kabar Bahagiamu dengan{" "}
            <em className="italic font-serif text-berry">Sepenuh Hati.</em>
          </h1>

          {/* Supporting Paragraph */}
          <p className="text-ink-soft text-sm sm:text-base max-w-xl mx-auto mt-2.5 sm:mt-3 leading-relaxed font-sans">
            Rayakan hari bahagiamu dengan undangan pernikahan digital yang indah dan bermakna. Setiap detail disiapkan untuk mengabadikan awal perjalanan cinta kalian berdua.
          </p>
        </div>

        {/* 3 Linked Cards Grid with Staggered Middle Offset (Hero-36 Signature) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-start max-w-5xl mx-auto">
          {HERO_CARDS.map((card, index) => {
            const isMiddle = index === 1;
            return (
              <a
                key={card.id}
                href={card.href}
                target={card.isExternal ? "_blank" : undefined}
                rel={card.isExternal ? "noopener noreferrer" : undefined}
                className={`relative flex flex-col rounded-2xl border transition-all duration-300 block text-left group ${
                  isMiddle
                    ? "md:translate-y-5 lg:translate-y-6 bg-white border-berry/30 shadow-xl shadow-ink/10 ring-1 ring-berry/20"
                    : "bg-white/85 backdrop-blur-xs border-[oklch(87%_0.025_30/0.85)] shadow-sm hover:shadow-lg shadow-ink/5"
                } p-4 sm:p-5`}
              >
                {/* Visual Thumbnail Container */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[oklch(93%_0.02_75)] border border-black/5 mb-4 sm:mb-5">
                  <img
                    src={card.thumbnail}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading={isMiddle ? "eager" : "lazy"}
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase rounded-full shadow-2xs backdrop-blur-md ${
                        card.isAccent
                          ? "bg-berry text-cream-text"
                          : "bg-white/95 text-ink-soft border border-black/5"
                      }`}
                    >
                      {card.badge}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex-1 flex flex-col">
                  <h2 className="font-serif text-lg sm:text-xl font-medium text-ink tracking-tight group-hover:text-berry transition-colors">
                    {card.title}
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-ink-soft leading-relaxed flex-1">
                    {card.description}
                  </p>

                  {/* Card Action Link Row ending with Arrow */}
                  <div className="mt-4 pt-3.5 border-t border-[oklch(90%_0.02_75/0.7)] flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-berry group-hover:text-berry-deep group-hover:gap-2 transition-all">
                      <span>{card.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}