import { LayoutTemplate, PenLine, Share2, FolderKanban, ArrowRight } from "lucide-react";

interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  icon: typeof LayoutTemplate;
  linkText?: string;
  linkHref?: string;
  isExternal?: boolean;
  isOptional?: boolean;
}

const STEPS: WorkflowStep[] = [
  {
    step: "Langkah 1 · Pilih",
    title: "Pilih template",
    description: "Lihat dulu semua template undangan, lalu pilih yang paling cocok buat acaramu.",
    icon: LayoutTemplate,
    linkText: "Lihat contoh undangan",
    linkHref: "#katalog",
    isExternal: false,
  },
  {
    step: "Langkah 2 · Isi",
    title: "Isi datamu",
    description: "Isi data acaramu, seperti nama, tanggal, dan lokasi. Bisa langsung mulai tanpa login.",
    icon: PenLine,
    linkText: "Mulai bikin undangan",
    linkHref: "https://create.invitea.cards",
    isExternal: true,
  },
  {
    step: "Langkah 3 · Sebar",
    title: "Salin link, sebar sendiri",
    description: "Link undangan tinggal kamu salin dan kirim lewat WhatsApp. Kamu yang pilih mau kirim ke siapa dan kapan.",
    icon: Share2,
  },
  {
    step: "Opsional · Atur persiapan",
    title: "RSVP dan Wedding Planner",
    description: "Mau catat tamu yang hadir dan atur persiapan nikah? Login dulu, lalu pakai RSVP dan Wedding Planner.",
    icon: FolderKanban,
    linkText: "Buka Wedding Planner",
    linkHref: "https://plan.invitea.cards",
    isExternal: true,
    isOptional: true,
  },
];

export function WorkflowSection() {
  return (
    <section id="alur" className="relative w-full py-14 sm:py-18 md:py-20 bg-[#FAF9F7] border-t border-black/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 ${
                  item.isOptional
                    ? "bg-[#FAF5E9]/50 border border-dashed border-black/15 hover:border-black/30"
                    : "bg-white border border-black/10 hover:border-black/25 shadow-2xs"
                }`}
              >
                <div>
                  {/* Top Bar: Step Eyebrow + Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-mono font-medium tracking-tight px-2.5 py-1 rounded-full ${
                        item.isOptional
                          ? "bg-black/5 text-ink/70 border border-black/8"
                          : "bg-berry/10 text-berry font-semibold"
                      }`}
                    >
                      {item.step}
                    </span>

                    <div className="w-8 h-8 rounded-lg bg-black/4 border border-black/6 flex items-center justify-center text-ink/70">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink tracking-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-sm text-ink-soft leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Link Action (if present) */}
                {item.linkText && item.linkHref && (
                  <div className="mt-6 pt-4 border-t border-black/6">
                    <a
                      href={item.linkHref}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-berry hover:text-berry/80 group transition-colors"
                    >
                      <span>{item.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
