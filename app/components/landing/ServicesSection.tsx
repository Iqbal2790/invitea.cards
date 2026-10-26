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
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(#DE7272_1.6px,transparent_1.6px)] dark:bg-[radial-gradient(#FFCED8_1.6px,transparent_1.6px)] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] bg-size-[14px_14px] opacity-25 dark:opacity-20 group-hover:opacity-40 transition-opacity duration-300"
    />
  );
}

interface FeatureCardProps {
  feature: Feature;
}

function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <article className="group relative w-full h-full overflow-hidden rounded-2xl border border-header-border bg-bg-alt/40 p-6 sm:p-7 backdrop-blur-sm shadow-2xs hover:border-hairline transition-all duration-300 flex flex-col justify-start">
      <DottedGlow />

      <div className="relative z-10 flex flex-col gap-2.5">
        <h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
          {feature.title}
        </h3>
        <p className="text-sm sm:text-base text-ink-soft dark:text-neutral-300 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </article>
  );
}

export function ServicesSection() {
  return (
    <section
      id="layanan"
      className="scroll-mt-20 py-16 sm:py-20 md:py-28 w-full bg-bg"
    >
      {/* Target anchors for navbar & footer links */}
      <div id="ekosistem" className="sr-only" aria-hidden="true" />
      <div id="fitur" className="sr-only" aria-hidden="true" />
      <div id="cara-kerja" className="sr-only" aria-hidden="true" />

      <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Headline + CTA (Top Aligned with Cards) */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6 sm:gap-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight leading-[1.15]">
              Habis undangan jadi, lanjut atur persiapan nikahmu.
            </h2>

            <a
              href="https://plan.invitea.cards"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#DE7272] dark:bg-[#FFCED8] text-white dark:text-black text-sm sm:text-base font-semibold hover:bg-[#C85E5E] dark:hover:bg-[#E8B4C0] transition-colors shadow-sm active:scale-95"
            >
              <span>Buka Wedding Planner</span>
              <ArrowUpRight className="w-4 h-4 opacity-80" aria-hidden="true" />
            </a>
          </div>

          {/* Right Column: 2x2 Grid with coordinated reveal */}
          <ScrollReveal
            transition={{ duration: 0.5, ease: "easeOut" }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            viewOptions={{ amount: 0.1 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            once
          >
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
