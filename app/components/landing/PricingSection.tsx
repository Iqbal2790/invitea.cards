import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";

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
      <div className="w-full px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-berry block mb-2 font-mono">
            Paket &amp; Investasi
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink leading-tight">
            Pilihan paket transparan untuk momen spesial kalian.
          </h2>
        </div>

        {/* 3-Card Responsive Grid - ChatGPT Anatomy */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {/* =========================================
              CARD 1: FREE (Rp 0)
              ========================================= */}
          <div className="rounded-3xl border border-header-border bg-bg-alt/20 p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-hairline transition-all">
            <div>
              {/* Top Row: Tier Name */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-semibold tracking-tight text-ink font-sans">
                  Free
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bg border border-header-border text-ink-soft uppercase tracking-wider">
                  Uji Coba
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-2xl font-semibold text-ink tracking-tight mb-2">
                Coba Invitea
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed h-[36px] mb-4 line-clamp-2">
                Akses dasar tanpa biaya untuk memulai persiapan hari bahagia tanpa syarat.
              </p>

              {/* Service Dropdown Selector */}
              <div className="mb-4 h-[36px]" ref={freeDropdownRef}>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsFreeDropdownOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={isFreeDropdownOpen}
                    className="w-full h-[36px] flex items-center justify-between px-3 rounded-xl border border-header-border bg-bg text-ink text-xs font-semibold hover:border-berry/40 transition-colors focus:outline-none"
                  >
                    <span>
                      {freeService === "undangan"
                        ? "Pilihan: Undangan Digital"
                        : "Pilihan: Wedding Planner"}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-ink-soft transition-transform ${
                        isFreeDropdownOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isFreeDropdownOpen && (
                    <div
                      role="listbox"
                      className="absolute top-full left-0 right-0 mt-1 z-30 bg-bg border border-header-border rounded-xl shadow-lg py-1 overflow-hidden text-xs"
                    >
                      <button
                        type="button"
                        role="option"
                        aria-selected={freeService === "undangan"}
                        onClick={() => {
                          setFreeService("undangan");
                          setIsFreeDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors ${
                          freeService === "undangan"
                            ? "bg-pink-soft text-berry font-semibold"
                            : "text-ink hover:bg-bg-alt/50"
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
                        className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors ${
                          freeService === "planner"
                            ? "bg-pink-soft text-berry font-semibold"
                            : "text-ink hover:bg-bg-alt/50"
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
              </div>

              {/* Action Button (ChatGPT Style: Top Placement) */}
              <div className="mb-6">
                {freeService === "undangan" ? (
                  <a
                    href="https://create.invitea.cards"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-ink/30 bg-bg text-ink text-sm font-semibold hover:bg-ink hover:text-cream-text transition-all duration-150 shadow-2xs"
                  >
                    <span>Mulai Buat Undangan</span>
                    <ArrowUpRight className="w-4 h-4 opacity-70" aria-hidden="true" />
                  </a>
                ) : (
                  <a
                    href="https://plan.invitea.cards"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-ink/30 bg-bg text-ink text-sm font-semibold hover:bg-ink hover:text-cream-text transition-all duration-150 shadow-2xs"
                  >
                    <span>Buka Wedding Planner</span>
                    <ArrowUpRight className="w-4 h-4 opacity-70" aria-hidden="true" />
                  </a>
                )}
              </div>

              {/* Price Block */}
              <div className="pt-2 pb-5 border-b border-hairline/60">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-3xl sm:text-4xl font-semibold text-ink">
                    Rp 0
                  </span>
                  <span className="text-xs text-ink-soft">/ layanan</span>
                </div>
                <p className="text-[11px] text-ink-soft mt-1">
                  Tanpa kartu kredit • Langsung terbitkan
                </p>
              </div>

              {/* Capabilities List */}
              <div className="mt-5 space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                  Fitur yang didapatkan:
                </p>
                {freeService === "undangan" ? (
                  <ul className="space-y-2.5 text-sm text-ink-soft">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-ink">Pilihan template undangan siap pakai</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Terbitkan instan tanpa antre</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Hitung mundur hari-H &amp; audio player</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Tautan publik langsung dibagikan</span>
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-2.5 text-sm text-ink-soft">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-ink">Checklist persiapan pernikahan terstruktur</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Kalkulator &amp; kontrol anggaran biaya</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Pencatatan kontak vendor pernikahan</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Akses online praktis kapan saja</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* =========================================
              CARD 2: PLUS (Rp 150.000) ⭐ RECOMMENDED
              ========================================= */}
          <div className="relative rounded-3xl border-2 border-berry bg-bg p-6 sm:p-7 flex flex-col justify-between shadow-md ring-1 ring-berry/20">
            <div>
              {/* Top Row: Tier Name + Recommended Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-semibold tracking-tight text-berry font-sans">
                  Plus
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-berry text-cream-text uppercase tracking-wider shadow-2xs">
                  Direkomendasikan
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-2xl font-semibold text-ink tracking-tight mb-2">
                Domain Favorit
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed h-[36px] mb-4 line-clamp-2">
                Pilihan utama pasangan untuk undangan praktis dengan domain web nama berdua.
              </p>

              {/* Spacer matching Card 1 dropdown height */}
              <div className="mb-4 flex items-center h-[36px]">
                <span className="text-xs font-medium text-berry bg-pink-soft px-2.5 py-1.5 rounded-xl border border-pink-line/60">
                  Domain Pilihan Termasuk
                </span>
              </div>

              {/* Action Button (ChatGPT Style: Top Placement) */}
              <div className="mb-6">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Invitea%2C%20saya%20tertarik%20pesan%20Paket%20Plus%20(Rp%20150.000)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-berry text-cream-text text-sm font-semibold hover:bg-berry/90 transition-all duration-150 shadow-sm"
                >
                  <span>Pesan Paket Plus</span>
                  <ArrowRight className="w-4 h-4 opacity-80" aria-hidden="true" />
                </a>
              </div>

              {/* Price Block */}
              <div className="pt-2 pb-5 border-b border-hairline/60">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl sm:text-4xl font-semibold text-berry">
                    Rp 150.000
                  </span>
                  <span className="text-xs text-ink-soft">/ paket</span>
                </div>
                <p className="text-[11px] text-ink-soft mt-1">
                  Sekali bayar • Sudah termasuk domain web aktif 1 tahun
                </p>
              </div>

              {/* Capabilities List (6 items) */}
              <div className="mt-5 space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                  Fitur lengkap sudah termasuk:
                </p>
                <ul className="space-y-2.5 text-sm text-ink-soft">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">Domain web nama berdua aktif 1 tahun</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink">Desain elegan disesuaikan tema pernikahan</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">Nama tamu personal tanpa batas kirim</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink">Konfirmasi RSVP &amp; buku ucapan doa terdata</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Petunjuk rute Google Maps &amp; Waze presisi</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">Akses penuh Wedding Planner terintegrasi</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* =========================================
              CARD 3: PRO (Rp 350.000)
              ========================================= */}
          <div className="rounded-3xl border border-header-border bg-bg-alt/20 p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-hairline transition-all">
            <div>
              {/* Top Row: Tier Name */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-semibold tracking-tight text-ink font-sans">
                  Pro
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bg border border-header-border text-ink-soft uppercase tracking-wider">
                  Prioritas Penuh
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-2xl font-semibold text-ink tracking-tight mb-2">
                Layanan Paripurna
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed h-[36px] mb-4 line-clamp-2">
                Pengalaman tertinggi dengan domain global, proteksi anti-sebar, dan auto-blast.
              </p>

              {/* Spacer matching Card 1 dropdown height */}
              <div className="mb-4 flex items-center h-[36px]">
                <span className="text-xs font-medium text-ink bg-bg px-2.5 py-1.5 rounded-xl border border-header-border">
                  Domain Global (.com / .net / .id)
                </span>
              </div>

              {/* Action Button (ChatGPT Style: Top Placement) */}
              <div className="mb-6">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Invitea%2C%20saya%20tertarik%20konsultasi%20Paket%20Pro%20(Rp%20350.000)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-ink text-cream-text text-sm font-semibold hover:bg-berry transition-colors shadow-sm"
                >
                  <span>Konsultasi &amp; Pesan Pro</span>
                  <ArrowRight className="w-4 h-4 opacity-80" aria-hidden="true" />
                </a>
              </div>

              {/* Price Block */}
              <div className="pt-2 pb-5 border-b border-hairline/60">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl sm:text-4xl font-semibold text-ink">
                    Rp 350.000
                  </span>
                  <span className="text-xs text-ink-soft">/ paket</span>
                </div>
                <p className="text-[11px] text-ink-soft mt-1">
                  Sekali bayar • Sudah termasuk registrasi domain global 1 tahun
                </p>
              </div>

              {/* Capabilities List (9 items - Most Value) */}
              <div className="mt-5 space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                  Fasilitas terlengkap sudah termasuk:
                </p>
                <ul className="space-y-2.5 text-sm text-ink-soft">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">Pilihan domain global prestisius aktif 1 tahun</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink">Semua fitur lengkap Paket Plus</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">Jalur prioritas pengerjaan &amp; revisi kilat</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink">Bantuan setup hingga undangan siap disebar</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">Proteksi Anti-Sebar (Cegah tautan dibuka orang luar)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">Layanan Auto-Blast WhatsApp (Kirim otomatis ke semua tamu)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Animasi interaktif kustom &amp; musik pilihan</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Integrasi amplop digital &amp; QR code check-in</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">Sinkronisasi penuh ke Wedding Planner</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
