import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "~/components/ui/ScrollReveal";

interface Feature {
  title: string;
  description: string;
}

const FEATURES: readonly Feature[] = [
  {
    title: "Buku Tamu & RSVP",
    description:
      "Catat konfirmasi kehadiran dan ucapan doa dari tamu secara otomatis, tanpa perlu rekap manual.",
  },
  {
    title: "Checklist Persiapan",
    description:
      "Pantau hal-hal yang perlu disiapkan bertahap dari jauh hari sampai hari-H biar nggak ada yang kelupaan.",
  },
  {
    title: "Kontrol Anggaran",
    description:
      "Catat rencana biaya, uang muka (DP), dan pelunasan seluruh vendor dalam satu tempat rapi.",
  },
  {
    title: "Sinkronisasi Otomatis",
    description:
      "Data tamu dan ucapan dari website undangan terhubung langsung ke dashboard planner secara realtime.",
  },
];

function DottedGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(#9929EA_1.6px,transparent_1.6px)] dark:bg-[radial-gradient(#FF5FCF_1.6px,transparent_1.6px)] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] bg-size-[14px_14px] opacity-25 dark:opacity-20 group-hover:opacity-40 transition-opacity duration-300"
    />
  );
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <ScrollReveal
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      viewOptions={{ amount: 0.2 }}
      className="w-full"
      once
    >
      <article className="group relative w-full overflow-hidden rounded-2xl border border-header-border bg-bg-alt/25 p-6 sm:p-8 backdrop-blur-sm shadow-2xs hover:border-hairline transition-all duration-300">
        <DottedGlow />

        <div className="relative z-10 flex flex-col gap-2.5">
          <h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
            {feature.title}
          </h3>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            {feature.description}
          </p>
        </div>
      </article>
    </ScrollReveal>
  );
}

export function ServicesSection() {
  const half = Math.ceil(FEATURES.length / 2);
  const columns = [FEATURES.slice(0, half), FEATURES.slice(half)];

  return (
    <section
      id="layanan"
      className="scroll-mt-20 py-16 sm:py-20 md:py-24 w-full bg-bg"
    >
      {/* Target anchors for navbar & footer links */}
      <div id="ekosistem" className="sr-only" aria-hidden="true" />
      <div id="fitur" className="sr-only" aria-hidden="true" />
      <div id="cara-kerja" className="sr-only" aria-hidden="true" />

      <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-6">
        {/* Section Header: bold Google Sans, no small text, no subtitle */}
        <div className="max-w-3xl mb-12 sm:mb-14 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight leading-[1.15]">
            Habis undangan jadi, lanjut atur persiapan nikahmu.
          </h2>
        </div>

        {/* Offset 2-Column Grid (Hirael Feature 05 pattern with items-start and uniform cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl items-start">
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className={`flex flex-col gap-6 sm:gap-8 ${
                colIndex === 1 ? "md:mt-16" : ""
              }`}
            >
              {column.map((feature, itemIndex) => (
                <FeatureCard
                  key={feature.title}
                  feature={feature}
                  index={colIndex * half + itemIndex}
                />
              ))}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 sm:mt-16">
          <a
            href="https://plan.invitea.cards"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#9929EA] dark:bg-[#FF5FCF] text-white dark:text-black text-sm sm:text-base font-semibold hover:bg-[#851FD1] dark:hover:bg-[#F04BBF] transition-colors shadow-sm active:scale-95"
          >
            <span>Buka Wedding Planner</span>
            <ArrowUpRight className="w-4 h-4 opacity-80" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
