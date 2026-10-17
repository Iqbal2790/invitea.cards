import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "~/components/ui/ScrollReveal";

type FreeServiceOption = "undangan" | "planner";

export function PricingSection() {
  const [freeService, setFreeService] = useState<FreeServiceOption>("undangan");
  const [isFreeDropdownOpen, setIsFreeDropdownOpen] = useState(false);
  const freeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        freeDropdownRef.current &&
        !freeDropdownRef.current.contains(e.target as Node)
      ) {
        setIsFreeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section
      id="pricing"
      className="scroll-mt-20 py-16 sm:py-20 md:py-24 w-full border-t border-hairline/60 bg-bg"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-berry block mb-2 font-mono">
            Paket &amp; Investasi
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink leading-tight">
            Pilihan paket transparan untuk momen spesial kalian.
          </h2>
        </div>

        {/* 3-Card Proportional Grid (Slightly Chunky, Max-W-6XL) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {/* =========================================
              CARD 1: FREE (Rp 0)
              ========================================= */}
          <ScrollReveal
            transition={{ delay: 0, duration: 0.5, ease: "easeOut" }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            viewOptions={{ amount: 0.2 }}
            className="h-full"
            once
          >
            <div className="h-full rounded-3xl border border-header-border bg-bg-alt/20 p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-hairline transition-all">
            <div>
              {/* Top Row: Package Name + Badge */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-sans text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  Free
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bg border border-header-border text-ink-soft uppercase tracking-wider">
                  Uji Coba
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed h-[40px] mb-5 line-clamp-2">
                Akses dasar tanpa biaya untuk memulai persiapan hari bahagia.
              </p>

              {/* Action: Split Button with Dropdown */}
              <div className="relative mb-6" ref={freeDropdownRef}>
                <div className="flex items-stretch w-full rounded-full border border-ink/30 bg-bg hover:border-ink transition-all shadow-2xs">
                  {freeService === "undangan" ? (
                    <a
                      href="https://create.invitea.cards"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 pl-4 pr-2 text-ink text-xs sm:text-sm font-semibold hover:bg-ink hover:text-cream-text transition-colors rounded-l-full"
                    >
                      <span className="truncate">Mulai Buat Undangan</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-70 shrink-0" aria-hidden="true" />
                    </a>
                  ) : (
                    <a
                      href="https://plan.invitea.cards"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 pl-4 pr-2 text-ink text-xs sm:text-sm font-semibold hover:bg-ink hover:text-cream-text transition-colors rounded-l-full"
                    >
                      <span className="truncate">Buka Wedding Planner</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-70 shrink-0" aria-hidden="true" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsFreeDropdownOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={isFreeDropdownOpen}
                    aria-label="Pilih jenis layanan gratis"
                    className="px-3 border-l border-ink/20 text-ink hover:bg-ink hover:text-cream-text transition-colors rounded-r-full flex items-center justify-center focus:outline-none"
                  >
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isFreeDropdownOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* Popover Dropdown below the split button */}
                {isFreeDropdownOpen && (
                  <div
                    role="listbox"
                    className="absolute top-full left-0 right-0 mt-2 z-30 bg-ink text-cream-text rounded-2xl shadow-xl p-1.5 overflow-hidden text-xs border border-ink/80"
                  >
                    <div className="px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-cream-text/50">
                      PILIHAN LAYANAN
                    </div>
                    <button
                      type="button"
                      role="option"
                      aria-selected={freeService === "undangan"}
                      onClick={() => {
                        setFreeService("undangan");
                        setIsFreeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                        freeService === "undangan"
                          ? "bg-cream-text/15 text-cream-text font-semibold"
                          : "text-cream-text/80 hover:bg-cream-text/10"
                      }`}
                    >
                      <span>Undangan Digital</span>
                      {freeService === "undangan" && (
                        <Check className="w-3.5 h-3.5 text-berry shrink-0" />
                      )}
                    </button>

                    <button
                      type="button"
                      role="option"
                      aria-selected={freeService === "planner"}
                      onClick={() => {
                        setFreeService("planner");
                        setIsFreeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                        freeService === "planner"
                          ? "bg-cream-text/15 text-cream-text font-semibold"
                          : "text-cream-text/80 hover:bg-cream-text/10"
                      }`}
                    >
                      <span>Wedding Planner</span>
                      {freeService === "planner" && (
                        <Check className="w-3.5 h-3.5 text-berry shrink-0" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Price Block (Sans-Serif Bold Large) */}
              <div className="pt-2 pb-5 border-b border-hairline/60">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-sans text-3xl sm:text-4xl font-bold text-ink tracking-tight">
                    Rp 0
                  </span>
                  <span className="text-xs text-ink-soft">/ layanan</span>
                </div>
                <p className="text-[11px] text-ink-soft mt-1.5">
                  Tanpa biaya • Langsung terbitkan
                </p>
              </div>

              {/* Capabilities List (Consistent Font Weight & Color) */}
              <div className="mt-5 space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                  Fitur yang didapatkan:
                </p>
                {freeService === "undangan" ? (
                  <ul className="space-y-2.5 text-xs sm:text-sm">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-ink font-normal leading-snug">Pilihan template undangan siap pakai</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-ink font-normal leading-snug">Terbitkan instan tanpa antre</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-ink font-normal leading-snug">Hitung mundur hari-H &amp; audio player</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-ink font-normal leading-snug">Tautan publik langsung dibagikan</span>
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-2.5 text-xs sm:text-sm">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-ink font-normal leading-snug">Checklist persiapan pernikahan terstruktur</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-ink font-normal leading-snug">Kalkulator &amp; kontrol anggaran biaya</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-ink font-normal leading-snug">Pencatatan kontak vendor pernikahan</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-ink font-normal leading-snug">Akses online praktis kapan saja</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* =========================================
            CARD 2: PLUS (Rp 150.000) ⭐ RECOMMENDED
            ========================================= */}
        <ScrollReveal
          transition={{ delay: 0.12, duration: 0.5, ease: "easeOut" }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0 },
          }}
          viewOptions={{ amount: 0.2 }}
          className="h-full"
          once
        >
          <div className="h-full relative rounded-3xl border-2 border-berry bg-bg p-6 sm:p-7 flex flex-col justify-between shadow-md ring-1 ring-berry/20">
            <div>
              {/* Top Row: Package Name + Recommended Badge */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-sans text-2xl sm:text-3xl font-bold text-berry tracking-tight">
                  Plus
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-berry text-cream-text uppercase tracking-wider shadow-2xs">
                  Direkomendasikan
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed h-[40px] mb-5 line-clamp-2">
                Pilihan utama pasangan untuk undangan praktis dengan domain web nama berdua.
              </p>

              {/* Action Button */}
              <div className="mb-6">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Invitea%2C%20saya%20tertarik%20pesan%20Paket%20Plus%20(Rp%20150.000)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-berry text-cream-text text-xs sm:text-sm font-semibold hover:bg-berry/90 transition-all duration-150 shadow-sm"
                >
                  <span>Pesan Paket Plus</span>
                  <ArrowRight className="w-4 h-4 opacity-80" aria-hidden="true" />
                </a>
              </div>

              {/* Price Block (Sans-Serif Bold Large) */}
              <div className="pt-2 pb-5 border-b border-hairline/60">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-sans text-3xl sm:text-4xl font-bold text-berry tracking-tight">
                    Rp 150.000
                  </span>
                  <span className="text-xs text-ink-soft">/ paket</span>
                </div>
                <p className="text-[11px] text-ink-soft mt-1.5">
                  Sekali bayar • Termasuk domain nama berdua 1 tahun
                </p>
              </div>

              {/* Capabilities List (Consistent Font Weight & Color) */}
              <div className="mt-5 space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                  Fitur lengkap sudah termasuk:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-normal leading-snug">Domain web nama berdua aktif 1 tahun</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-normal leading-snug">Desain disesuaikan tema pernikahan</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-normal leading-snug">Nama tamu personal tanpa batas kirim</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-normal leading-snug">Konfirmasi RSVP &amp; buku doa terdata</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-normal leading-snug">Petunjuk rute Google Maps &amp; Waze</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-normal leading-snug">Akses penuh Wedding Planner</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* =========================================
            CARD 3: PRO (Rp 350.000)
            ========================================= */}
        <ScrollReveal
          transition={{ delay: 0.24, duration: 0.5, ease: "easeOut" }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0 },
          }}
          viewOptions={{ amount: 0.2 }}
          className="h-full"
          once
        >
          <div className="h-full rounded-3xl border border-header-border bg-bg-alt/20 p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-hairline transition-all">
            <div>
              {/* Top Row: Package Name + Badge */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-sans text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  Pro
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bg border border-header-border text-ink-soft uppercase tracking-wider">
                  Prioritas Penuh
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed h-[40px] mb-5 line-clamp-2">
                Pengalaman tertinggi dengan domain global, proteksi anti-sebar, dan auto-blast.
              </p>

              {/* Action Button */}
              <div className="mb-6">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Invitea%2C%20saya%20tertarik%20konsultasi%20Paket%20Pro%20(Rp%20350.000)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-ink text-cream-text text-xs sm:text-sm font-semibold hover:bg-berry transition-colors shadow-sm"
                >
                  <span>Konsultasi &amp; Pesan Pro</span>
                  <ArrowRight className="w-4 h-4 opacity-80" aria-hidden="true" />
                </a>
              </div>

              {/* Price Block (Sans-Serif Bold Large) */}
              <div className="pt-2 pb-5 border-b border-hairline/60">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-sans text-3xl sm:text-4xl font-bold text-ink tracking-tight">
                    Rp 350.000
                  </span>
                  <span className="text-xs text-ink-soft">/ paket</span>
                </div>
                <p className="text-[11px] text-ink-soft mt-1.5">
                  Sekali bayar • Termasuk domain global (.com/.net/.id) 1 tahun
                </p>
              </div>

              {/* Capabilities List (Consistent Font Weight & Color) */}
              <div className="mt-5 space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                  Fasilitas terlengkap sudah termasuk:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-normal leading-snug">Domain global (.com / .net / .id) 1 tahun</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-normal leading-snug">Semua fitur lengkap Paket Plus</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-normal leading-snug">Jalur prioritas pengerjaan &amp; revisi kilat</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-normal leading-snug">Bantuan setup hingga undangan siap disebar</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-normal leading-snug">Proteksi Anti-Sebar (Exclusive Gatekeeper)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-normal leading-snug">Layanan Auto-Blast WhatsApp ke semua tamu</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-normal leading-snug">Animasi interaktif kustom &amp; musik pilihan</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-normal leading-snug">Integrasi amplop digital &amp; QR check-in</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-normal leading-snug">Sinkronisasi penuh ke Wedding Planner</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);
}
