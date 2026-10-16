import { useState, useRef, useEffect } from "react";
import {
  Check,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Sparkles,
  HelpCircle,
  Minus,
} from "lucide-react";

type FreeServiceOption = "undangan" | "planner";
type PremiumDomainOption = ".com" | ".net" | ".id";

interface DomainPackageDetail {
  ext: PremiumDomainOption;
  label: string;
  price: string;
  rawPrice: string;
  badge: string;
  description: string;
  note: string;
}

const DOMAIN_OPTIONS: Record<PremiumDomainOption, DomainPackageDetail> = {
  ".com": {
    ext: ".com",
    label: ".com (Standar Global)",
    price: "Rp 350.000",
    rawPrice: "Rp350.000",
    badge: "Paling Dikenal",
    description: "Domain internasional paling populer di dunia, mudah diingat oleh seluruh tamu.",
    note: "Taraf global tanpa batasan geografis",
  },
  ".net": {
    ext: ".net",
    label: ".net (Alternatif Global)",
    price: "Rp 400.000",
    rawPrice: "Rp400.000",
    badge: "Alternatif Global",
    description: "Pilihan ekstensi global terpercaya jika nama pasangan di .com sudah digunakan pihak lain.",
    note: "Pilihan tepat jika domain .com sudah terisi",
  },
  ".id": {
    ext: ".id",
    label: ".id (Prestisius Indonesia)",
    price: "Rp 450.000",
    rawPrice: "Rp450.000",
    badge: "Resmi Indonesia",
    description: "Domain resmi kebanggaan Indonesia dengan nama paling singkat, prestisius, dan eksklusif.",
    note: "Termasuk prioritas pengerjaan & revisi kilat",
  },
};

export function PricingSection() {
  // Card 1 State (Free Option Selector)
  const [freeService, setFreeService] = useState<FreeServiceOption>("undangan");
  const [isFreeDropdownOpen, setIsFreeDropdownOpen] = useState(false);
  const freeDropdownRef = useRef<HTMLDivElement>(null);

  // Card 3 State (Domain Selector)
  const [selectedDomain, setSelectedDomain] = useState<PremiumDomainOption>(".com");
  const [isDomainDropdownOpen, setIsDomainDropdownOpen] = useState(false);
  const domainDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside listener for dropdowns
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        freeDropdownRef.current &&
        !freeDropdownRef.current.contains(e.target as Node)
      ) {
        setIsFreeDropdownOpen(false);
      }
      if (
        domainDropdownRef.current &&
        !domainDropdownRef.current.contains(e.target as Node)
      ) {
        setIsDomainDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const domainDetail = DOMAIN_OPTIONS[selectedDomain];

  return (
    <section
      id="pricing"
      className="scroll-mt-20 py-16 sm:py-20 md:py-24 w-full border-t border-hairline/60 bg-bg"
    >
      <div className="w-full px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-berry mb-3">
            Paket &amp; Investasi
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink leading-[1.15]">
            Pilihan paket transparan tanpa biaya tersembunyi.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
            Mulai rencanakan pernikahan secara gratis, atau buat undangan digital eksklusif dengan domain web nama berdua aktif 1 tahun.
          </p>
        </div>

        {/* 3-Card Responsive Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* =========================================
              CARD 1: PAKET GRATIS (Rp 0)
              ========================================= */}
          <div className="rounded-3xl border border-header-border bg-bg-alt/25 p-7 sm:p-9 flex flex-col justify-between transition-all hover:border-hairline shadow-2xs">
            <div>
              {/* Eyebrow & Title */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-bg border border-header-border text-ink-soft">
                  Uji Coba Langsung
                </span>
                <span className="text-xs text-ink-soft font-medium">Bebas Akses</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
                Layanan Gratis
              </h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed min-h-[40px]">
                Pilih salah satu layanan untuk memulai persiapan hari bahagia tanpa biaya.
              </p>

              {/* Service Dropdown Switcher */}
              <div className="mt-5 pt-5 border-t border-hairline/60" ref={freeDropdownRef}>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                  Pilihan Layanan Gratis
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsFreeDropdownOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={isFreeDropdownOpen}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-header-border bg-bg text-ink text-sm font-medium hover:border-berry/40 transition-colors focus:outline-none"
                  >
                    <span>
                      {freeService === "undangan"
                        ? "Undangan Digital (7 Hari)"
                        : "Wedding Planner (Dasar)"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-ink-soft transition-transform ${
                        isFreeDropdownOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isFreeDropdownOpen && (
                    <div
                      role="listbox"
                      className="absolute top-full left-0 right-0 mt-1.5 z-30 bg-bg border border-header-border rounded-xl shadow-lg py-1.5 overflow-hidden"
                    >
                      <button
                        type="button"
                        role="option"
                        aria-selected={freeService === "undangan"}
                        onClick={() => {
                          setFreeService("undangan");
                          setIsFreeDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between transition-colors ${
                          freeService === "undangan"
                            ? "bg-pink-soft text-berry font-semibold"
                            : "text-ink hover:bg-bg-alt/50"
                        }`}
                      >
                        <div>
                          <p className="font-medium">Undangan Digital</p>
                          <p className="text-[11px] text-ink-soft">Template instan aktif 7 hari</p>
                        </div>
                        {freeService === "undangan" && (
                          <Check className="w-4 h-4 text-berry shrink-0" />
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
                        className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between transition-colors ${
                          freeService === "planner"
                            ? "bg-pink-soft text-berry font-semibold"
                            : "text-ink hover:bg-bg-alt/50"
                        }`}
                      >
                        <div>
                          <p className="font-medium">Wedding Planner</p>
                          <p className="text-[11px] text-ink-soft">Checklist &amp; kontrol anggaran</p>
                        </div>
                        {freeService === "planner" && (
                          <Check className="w-4 h-4 text-berry shrink-0" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Tag */}
              <div className="mt-6 pb-6 border-b border-hairline/60">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-3xl sm:text-4xl font-semibold text-ink">
                    Rp 0
                  </span>
                  <span className="text-xs text-ink-soft">/ layanan</span>
                </div>
                <p className="text-xs text-ink-soft mt-1">
                  Tanpa kartu kredit • Langsung gunakan tanpa biaya
                </p>
              </div>

              {/* Dynamic Feature List */}
              <div className="mt-6 space-y-3.5">
                <p className="text-xs uppercase tracking-wider font-semibold text-ink-soft">
                  Fitur yang didapatkan:
                </p>

                {freeService === "undangan" ? (
                  <ul className="space-y-3 text-sm text-ink-soft">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-ink">Pilihan template undangan instan siap pakai</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Masa aktif undangan 7 hari kalender</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Tanpa perlu login, langsung terbitkan undangan</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Tautan undangan publik: <code className="text-xs bg-bg px-1 py-0.5 rounded border border-header-border">invitea.cards/u/nama</code></span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs text-ink-soft/80 pt-1">
                      <Minus className="w-3.5 h-3.5 text-ink-soft/60 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Menampilkan watermark branding Invitea</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs text-ink-soft/80">
                      <Minus className="w-3.5 h-3.5 text-ink-soft/60 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Tanpa konfirmasi RSVP otomatis &amp; nama tamu khusus</span>
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-3 text-sm text-ink-soft">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-ink">Checklist persiapan pernikahan bertahap</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-ink">Alat pencatatan &amp; kontrol anggaran biaya</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Hitung mundur hari-H pernikahan otomatis</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Daftar kontak &amp; catatan vendor pernikahan</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Akses online di <code className="text-xs bg-bg px-1 py-0.5 rounded border border-header-border">plan.invitea.cards</code></span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs text-ink-soft/80 pt-1">
                      <Minus className="w-3.5 h-3.5 text-ink-soft/60 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Tanpa sinkronisasi otomatis ke website undangan</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-6 border-t border-hairline/60">
              {freeService === "undangan" ? (
                <a
                  href="https://create.invitea.cards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-ink/40 bg-bg text-ink text-sm font-semibold hover:bg-ink hover:text-cream-text transition-all duration-150 shadow-2xs"
                >
                  <span>Buat Undangan Gratis</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" aria-hidden="true" />
                </a>
              ) : (
                <a
                  href="https://plan.invitea.cards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-ink/40 bg-bg text-ink text-sm font-semibold hover:bg-ink hover:text-cream-text transition-all duration-150 shadow-2xs"
                >
                  <span>Buka Planner Gratis</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* =========================================
              CARD 2: DOMAIN FAVORIT (Rp 150.000) ⭐ HIGHLIGHTED
              ========================================= */}
          <div className="relative rounded-3xl border-2 border-berry bg-bg p-7 sm:p-9 flex flex-col justify-between shadow-md ring-1 ring-berry/20 mt-3 lg:mt-0">
            {/* Prominent High-Contrast Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-berry text-cream-text text-[11px] font-semibold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
              Paling Populer
            </div>

            <div>
              {/* Eyebrow & Title */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-pink-soft text-berry border border-pink-line/70">
                  Rekomendasi Utama
                </span>
                <span className="text-xs text-berry font-semibold">Nilai Terbaik</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
                Domain Favorit
              </h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed min-h-[40px]">
                Solusi terlengkap undangan pernikahan berdomain nama sendiri dengan kepraktisan maksimal.
              </p>

              {/* Supported Extensions Pills */}
              <div className="mt-5 pt-5 border-t border-hairline/60">
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                  Pilihan Ekstensi Termasuk:
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-pink-soft text-berry border border-pink-line/60">
                    .my.id
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-pink-soft text-berry border border-pink-line/60">
                    .web.id
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-pink-soft text-berry border border-pink-line/60">
                    .biz.id
                  </span>
                </div>
              </div>

              {/* Price Tag */}
              <div className="mt-6 pb-6 border-b border-hairline/60">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl sm:text-4xl font-semibold text-berry">
                    Rp 150.000
                  </span>
                  <span className="text-xs text-ink-soft">/ paket</span>
                </div>
                <p className="text-xs text-ink-soft mt-1">
                  Sekali bayar • Sudah termasuk domain web aktif 1 tahun penuh
                </p>
              </div>

              {/* Feature List */}
              <div className="mt-6 space-y-3.5">
                <p className="text-xs uppercase tracking-wider font-semibold text-ink-soft">
                  Fitur lengkap sudah termasuk:
                </p>

                <ul className="space-y-3 text-sm text-ink-soft">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">
                      Domain nama berdua aktif 1 tahun (cth: <code className="text-xs bg-bg-alt/60 px-1 py-0.5 rounded text-berry">sarah-dimas.my.id</code>)
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink">Desain kustom disesuaikan konsep &amp; tema acara</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">
                      Nama tamu personal tanpa batas (<code className="text-xs bg-bg-alt/60 px-1 py-0.5 rounded">?to=Budi</code>)
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink">Konfirmasi kehadiran RSVP &amp; buku ucapan doa terdata</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">
                      Akses penuh Wedding Planner (<code className="text-xs bg-bg-alt/60 px-1 py-0.5 rounded text-berry">plan.invitea.cards</code>)
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Sinkronisasi otomatis daftar tamu ke Wedding Planner</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">Bebas watermark Invitea (tampilan bersih &amp; profesional)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Rute peta presisi Google Maps &amp; Waze lokasi acara</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Galeri foto kenangan &amp; audio instrumen pernikahan</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-6 border-t border-hairline/60">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Invitea%2C%20saya%20tertarik%20dengan%20Paket%20Domain%20Favorit%20(Rp%20150.000)."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-berry text-cream-text text-sm font-semibold hover:bg-berry/90 transition-all duration-150 shadow-sm"
              >
                <span>Pesan Paket Favorit</span>
                <ArrowRight className="w-4 h-4 opacity-80" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* =========================================
              CARD 3: DOMAIN GLOBAL (.com, .net, .id)
              ========================================= */}
          <div className="rounded-3xl border border-header-border bg-bg-alt/25 p-7 sm:p-9 flex flex-col justify-between transition-all hover:border-hairline shadow-2xs">
            <div>
              {/* Eyebrow & Title */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-bg border border-header-border text-ink-soft">
                  Internasional &amp; Resmi
                </span>
                <span className="text-xs text-ink-soft font-medium">Pilihan TLD</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
                Domain Global
              </h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed min-h-[40px]">
                {domainDetail.description}
              </p>

              {/* Extension Dropdown Switcher */}
              <div className="mt-5 pt-5 border-t border-hairline/60" ref={domainDropdownRef}>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                  Pilihan Ekstensi Domain
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDomainDropdownOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={isDomainDropdownOpen}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-header-border bg-bg text-ink text-sm font-medium hover:border-berry/40 transition-colors focus:outline-none"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-berry">{domainDetail.ext}</span>
                      <span className="text-ink-soft text-xs">— {domainDetail.badge}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-ink-soft transition-transform ${
                        isDomainDropdownOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isDomainDropdownOpen && (
                    <div
                      role="listbox"
                      className="absolute top-full left-0 right-0 mt-1.5 z-30 bg-bg border border-header-border rounded-xl shadow-lg py-1.5 overflow-hidden"
                    >
                      {(Object.keys(DOMAIN_OPTIONS) as PremiumDomainOption[]).map((key) => {
                        const opt = DOMAIN_OPTIONS[key];
                        const isSelected = selectedDomain === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              setSelectedDomain(key);
                              setIsDomainDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-pink-soft text-berry font-semibold"
                                : "text-ink hover:bg-bg-alt/50"
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold">{opt.ext}</span>
                                <span className="text-[11px] text-ink-soft">({opt.badge})</span>
                              </div>
                              <p className="text-[11px] text-ink-soft mt-0.5">{opt.price}</p>
                            </div>
                            {isSelected && (
                              <Check className="w-4 h-4 text-berry shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Price Tag */}
              <div className="mt-6 pb-6 border-b border-hairline/60">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl sm:text-4xl font-semibold text-ink">
                    {domainDetail.price}
                  </span>
                  <span className="text-xs text-ink-soft">/ paket</span>
                </div>
                <p className="text-xs text-ink-soft mt-1">
                  Sekali bayar • Sudah termasuk registrasi domain {selectedDomain} aktif 1 tahun
                </p>
              </div>

              {/* Feature List */}
              <div className="mt-6 space-y-3.5">
                <p className="text-xs uppercase tracking-wider font-semibold text-ink-soft">
                  Fitur lengkap sudah termasuk:
                </p>

                <ul className="space-y-3 text-sm text-ink-soft">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">
                      Domain <strong className="text-berry">{selectedDomain}</strong> aktif 1 tahun (cth: <code className="text-xs bg-bg px-1 py-0.5 rounded border border-header-border">sarah-dimas{selectedDomain}</code>)
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink">Seluruh fitur dan benefit Paket Domain Favorit</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">
                      Mode Privat Tamu (Proteksi PIN &amp; Verifikasi Nomor)
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Efek interaktif animasi kustom &amp; musik latar khusus</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">
                      Akses penuh Wedding Planner terintegrasi
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{domainDetail.note}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Bebas watermark Invitea dengan branding eksklusif</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-6 border-t border-hairline/60">
              <a
                href={`https://wa.me/6281234567890?text=Halo%20Invitea%2C%20saya%20tertarik%20dengan%20Paket%20Domain%20${encodeURIComponent(selectedDomain)}%20(${encodeURIComponent(domainDetail.price)}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-ink text-cream-text text-sm font-semibold hover:bg-berry transition-colors shadow-sm"
              >
                <span>Pesan Domain {selectedDomain}</span>
                <ArrowRight className="w-4 h-4 opacity-80" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
