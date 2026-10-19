import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface StepItem {
  id: string;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  isExternal?: boolean;
}

const STEPS: StepItem[] = [
  {
    id: "step-1",
    title: "Pilih template",
    description: "Lihat dulu semua template undangan, lalu pilih yang paling cocok buat acaramu.",
    linkText: "Lihat contoh undangan",
    linkHref: "#katalog",
    isExternal: false,
  },
  {
    id: "step-2",
    title: "Isi data",
    description: "Isi data acaramu, seperti nama, tanggal, dan lokasi. Langsung mulai tanpa perlu registrasi.",
    linkText: "Mulai bikin undangan",
    linkHref: "https://create.invitea.cards",
    isExternal: true,
  },
  {
    id: "step-3",
    title: "Undangan siap disebar",
    description: "Link undangan tinggal kamu salin dan kirim lewat WhatsApp. Kamu yang pilih mau kirim ke siapa dan kapan.",
  },
];

const STEP_IMAGES = [
  {
    src: "/thumbnails/instant-wedding.jpg",
    alt: "Pilih template undangan pernikahan",
  },
  {
    src: "/images/laptop-mockup.webp",
    alt: "Isi data mempelai dan acara pernikahan",
  },
  {
    src: "/thumbnails/wedding-rings.jpg",
    alt: "Undangan siap disebar ke WhatsApp",
  },
];

export function WorkflowSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="alur" className="relative w-full py-14 sm:py-20 md:py-24 bg-[#FAF9F7] border-t border-black/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (OpenDesign-style Kicker + Headline) */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-berry mb-2">
            Alur 3 Langkah · Mulai Gratis
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight leading-[1.15]">
            Dari pilih template, sampai undangan siap disebar.
          </h2>
        </div>

        {/* Two-Column Split Layout on Desktop, Vertical Stack on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Interactive Step Selector Tabs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-2 sm:gap-3">
            {STEPS.map((item, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveStep(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveStep(idx);
                    }
                  }}
                  className={`relative rounded-2xl transition-all duration-200 cursor-pointer select-none text-left ${
                    isActive
                      ? "bg-[#2D1E1E] text-white p-5 sm:p-6 shadow-md"
                      : "bg-transparent hover:bg-black/[0.03] text-ink/70 hover:text-ink px-4 py-3 sm:py-3.5"
                  }`}
                >
                  <h3
                    className={`text-lg sm:text-xl font-bold tracking-tight transition-colors duration-200 ${
                      isActive ? "text-white" : "text-ink/75 hover:text-ink font-semibold"
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Expanded description on active state only (Identical to OpenDesign) */}
                  {isActive && (
                    <div className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                      <p>{item.description}</p>

                      {item.linkText && item.linkHref && (
                        <div className="mt-3.5 pt-2.5 border-t border-white/15">
                          <a
                            href={item.linkHref}
                            target={item.isExternal ? "_blank" : undefined}
                            rel={item.isExternal ? "noopener noreferrer" : undefined}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-pink hover:text-white transition-colors"
                          >
                            <span>{item.linkText}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Preview Container with Stacking Card Animation (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden aspect-16/10 bg-black/5 shadow-sm">
              {STEP_IMAGES.map((img, idx) => {
                const isStacked = idx <= activeStep;

                return (
                  <div
                    key={img.src}
                    className="absolute inset-0 w-full h-full will-change-transform rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
                    style={{
                      zIndex: idx + 10,
                      transform: isStacked ? "translateY(0%)" : "translateY(100%)",
                      transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
