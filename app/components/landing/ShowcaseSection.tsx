import { Eye, ExternalLink } from "lucide-react";

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
      "Sentuhan botanical editorial dengan tipografi klasik dan ornamen dedaunan yang anggun untuk suasana resepsi yang hangat.",
    demoUrl: "https://create.invitea.cards",
  },
  {
    id: "memory-lane",
    name: "Memory Lane",
    category: "Film & Sinematik",
    thumbnail: "/thumbnails/memory-lane.png",
    description:
      "Nuansa rol film klasik dan kolase foto hangat untuk merangkai perjalanan cinta kalian berdua dalam alur cerita yang berkesan.",
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
];

export function ShowcaseSection() {
  return (
    <section id="katalog" className="scroll-mt-20 py-20 md:py-28 w-full">
      {/* Anchor alias for navbar #portofolio */}
      <div id="portofolio" className="sr-only" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-berry mb-3">
            Katalog Undangan
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink leading-[1.12]">
            Koleksi Desain Pilihan untuk Momen Bersejarah
          </h2>
          <p className="mt-4 text-base text-ink-soft leading-relaxed">
            Pilih ragam tema undangan digital yang dirancang dengan ketelitian visual, tipografi anggun, dan responsif sempurna di semua layar.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {TEMPLATES.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col rounded-2xl border border-header-border bg-bg-alt/30 overflow-hidden hover:border-berry/40 transition-all duration-300 shadow-sm hover:shadow-md"
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
                  <span className="text-xs font-semibold uppercase tracking-wider text-berry block mb-1.5">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-ink-soft leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-5 border-t border-hairline/40 flex items-center justify-between gap-4">
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-berry hover:text-berry-deep transition-colors"
                  >
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    <span>Live Demo</span>
                  </a>

                  <a
                    href={`https://create.invitea.cards?theme=${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-berry text-cream-text hover:bg-berry-deep transition-all duration-200"
                  >
                    <span>Gunakan Tema</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Catalog Action */}
        <div className="mt-14 text-center">
          <a
            href="https://create.invitea.cards"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-sans font-semibold text-sm tracking-wide border border-berry text-berry hover:bg-berry hover:text-cream-text transition-all duration-200"
          >
            <span>Jelajahi Semua Template di Creator</span>
            <ExternalLink className="w-4 h-4 opacity-75" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
