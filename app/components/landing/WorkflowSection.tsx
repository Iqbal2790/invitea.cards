import { useState } from "react";
import { LayoutTemplate, PenLine, Share2, ArrowRight } from "lucide-react";

interface StepItem {
  id: string;
  title: string;
  description: string;
  icon: typeof LayoutTemplate;
  linkText?: string;
  linkHref?: string;
  isExternal?: boolean;
}

const STEPS: StepItem[] = [
  {
    id: "step-1",
    title: "Pilih template",
    description: "Lihat dulu semua template undangan, lalu pilih yang paling cocok buat acaramu.",
    icon: LayoutTemplate,
    linkText: "Lihat contoh undangan",
    linkHref: "#katalog",
    isExternal: false,
  },
  {
    id: "step-2",
    title: "Isi data",
    description: "Isi data acaramu, seperti nama, tanggal, dan lokasi. Bisa langsung mulai tanpa login.",
    icon: PenLine,
    linkText: "Mulai bikin undangan",
    linkHref: "https://create.invitea.cards",
    isExternal: true,
  },
  {
    id: "step-3",
    title: "Undangan siap disebar",
    description: "Link undangan tinggal kamu salin dan kirim lewat WhatsApp. Kamu yang pilih mau kirim ke siapa dan kapan.",
    icon: Share2,
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
    <section id="alur" className="relative w-full py-16 sm:py-20 md:py-24 bg-[#FAF9F7] border-t border-black/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (OpenDesign-style Kicker + Headline) */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-berry mb-2">
            Alur 3 Langkah · Mulai Gratis
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-ink tracking-tight leading-[1.15]">
            Dari pilih template, sampai undangan siap disebar.
          </h2>
        </div>

        {/* Two-Column Split Layout (OpenDesign Architecture) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive Step Selector Tabs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {STEPS.map((item, idx) => {
              const isActive = activeStep === idx;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveStep(idx)}
                  className={`relative rounded-2xl transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#2D1E1E] text-white p-6 sm:p-7 shadow-lg shadow-black/10"
                      : "bg-transparent hover:bg-black/[0.03] text-ink p-5 sm:p-6"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className={`font-serif text-xl sm:text-2xl font-semibold tracking-tight ${
                        isActive ? "text-white" : "text-ink"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? "bg-white/10 text-white" : "bg-black/4 text-ink/60"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Expanded description on active state */}
                  {isActive && (
                    <div className="mt-3 text-sm text-white/80 leading-relaxed font-sans">
                      <p>{item.description}</p>

                      {item.linkText && item.linkHref && (
                        <div className="mt-4 pt-3 border-t border-white/15">
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

                  {/* Inactive collapsed subtle hint */}
                  {!isActive && (
                    <p className="mt-1 text-xs sm:text-sm text-ink-soft line-clamp-1 font-sans">
                      {item.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Preview Container with Dummy Images (7 cols) - Borderless OpenDesign Style */}
          <div className="lg:col-span-7">
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden aspect-16/10 sm:aspect-4/3 lg:aspect-16/10">
              <img
                key={activeStep}
                src={STEP_IMAGES[activeStep].src}
                alt={STEP_IMAGES[activeStep].alt}
                className="w-full h-full object-cover rounded-2xl sm:rounded-3xl transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
