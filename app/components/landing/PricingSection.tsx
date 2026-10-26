import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { ScrollReveal } from "~/components/ui/ScrollReveal";

const TIERS = [
  {
    name: "Free",
    description:
      "Akses dasar tanpa biaya untuk mencoba buat undangan atau pakai Wedding Planner tanpa perlu login.",
    cta: "Mulai Gratis",
    href: "https://create.invitea.cards",
    isExternal: true,
    isPrimary: true,
  },
  {
    name: "Plus",
    description:
      "Pilihan utama pasangan untuk undangan praktis dengan alamat web domain nama berdua aktif 1 tahun.",
    cta: "Lihat Paket Plus",
    href: "/pricing",
    isExternal: false,
    isPrimary: false,
  },
  {
    name: "Pro",
    description:
      "Fasilitas terlengkap dengan domain global (.com/.id), proteksi anti-sebar, dan jalur prioritas.",
    cta: "Bandingkan Paket",
    href: "/pricing",
    isExternal: false,
    isPrimary: false,
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 py-16 sm:py-20 lg:py-24 w-full border-t border-hairline/60 bg-bg transition-colors"
    >
      <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink leading-[1.15]">
            Mulai gratis dulu, pilih paket kalau sudah cocok.
          </h2>
        </div>

        {/* 3-Card Minimal Grid (OpenDesign Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {TIERS.map((tier, idx) => (
            <ScrollReveal
              key={tier.name}
              transition={{ delay: idx * 0.08, duration: 0.4, ease: "easeOut" }}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              className="h-full"
              once
            >
              <div className="h-full rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-bg-alt/40 dark:bg-neutral-900/40 p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-black/20 dark:hover:border-white/20 transition-all">
                {/* Content */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
                    {tier.name}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-ink-soft dark:text-neutral-400 leading-relaxed font-sans">
                    {tier.description}
                  </p>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-8 pt-2">
                  {tier.isExternal ? (
                    <a
                      href={tier.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ink-btn
                      className="ink-btn w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold text-sm active:scale-[0.97] shadow-xs"
                    >
                      <span>{tier.cta}</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      to={tier.href}
                      data-ink-btn
                      className="ink-btn w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-black/20 dark:border-white/20 bg-transparent text-ink hover:border-black/35 dark:hover:border-white/60 active:scale-[0.97] font-semibold text-sm transition-all"
                    >
                      <span>{tier.cta}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
