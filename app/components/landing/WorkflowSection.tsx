import { LayoutTemplate, PenLine, Share2, ArrowRight } from "lucide-react";

interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  icon: typeof LayoutTemplate;
  linkText?: string;
  linkHref?: string;
  isExternal?: boolean;
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
    title: "Isi data",
    description: "Isi data acaramu, seperti nama, tanggal, dan lokasi. Bisa langsung mulai tanpa login.",
    icon: PenLine,
    linkText: "Mulai bikin undangan",
    linkHref: "https://create.invitea.cards",
    isExternal: true,
  },
  {
    step: "Langkah 3 · Sebar",
    title: "Undangan siap disebar",
    description: "Link undangan tinggal kamu salin dan kirim lewat WhatsApp. Kamu yang pilih mau kirim ke siapa dan kapan.",
    icon: Share2,
  },
];

export function WorkflowSection() {
  return (
    <section id="alur" className="relative w-full py-16 sm:py-20 bg-[#FAF9F7] border-t border-black/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl p-7 sm:p-8 bg-white border border-black/10 hover:border-black/25 shadow-2xs transition-all duration-200"
              >
                {/* Top Bar: Step Eyebrow + Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono font-semibold tracking-tight px-3 py-1 rounded-full bg-berry/10 text-berry">
                    {item.step}
                  </span>

                  <div className="w-9 h-9 rounded-xl bg-black/4 border border-black/6 flex items-center justify-center text-ink/75">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl font-semibold text-ink tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-ink-soft leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Link Action */}
                {item.linkText && item.linkHref && (
                  <div className="mt-5">
                    <a
                      href={item.linkHref}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-berry hover:text-berry/80 group transition-colors"
                    >
                      <span>{item.linkText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
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
