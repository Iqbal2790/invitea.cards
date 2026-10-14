import type { Route } from "./+types/home";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import {
  Globe,
  Users,
  ShieldCheck,
  Calendar,
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
  Check,
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Invitea.cards — Bespoke Wedding Invitation & Digital Experience" },
    {
      name: "description",
      content:
        "Merancang undangan pernikahan kustom eksklusif dengan domain pribadi dan integrasi ekosistem wedding planner modern.",
    },
  ];
}

export function loader() {
  return {};
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#18181B] selection:bg-[#C5A880]/30 selection:text-[#18181B]">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section
          id="hero"
          className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 border-b border-[#EADBCE]/50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              {/* Subtle Luxury Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#EADBCE] bg-[#FAF8F5]/80 text-[#52525B] text-xs font-medium tracking-widest uppercase">
                <span>Bespoke Studio &amp; Wedding Ecosystem</span>
              </div>

              {/* Editorial Title */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#18181B] leading-[1.12]">
                Bespoke Wedding Invitation &amp; Digital Experience
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl text-[#52525B] max-w-2xl mx-auto leading-relaxed">
                Merancang undangan pernikahan kustom eksklusif dengan domain pribadi dan integrasi
                ekosistem wedding planner modern.
              </p>

              {/* CTA Group */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href="#inquiry"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-[#18181B] text-[#FAF8F5] hover:bg-[#A3835B] transition-colors rounded-full px-8 py-3.5 text-sm font-medium tracking-wide shadow-sm"
                >
                  Konsultasi Desain
                </a>
                <a
                  href="#portofolio"
                  className="w-full sm:w-auto inline-flex items-center justify-center border border-[#EADBCE] bg-white/70 hover:bg-white text-[#18181B] transition-colors rounded-full px-8 py-3.5 text-sm font-medium tracking-wide shadow-2xs"
                >
                  Lihat Portofolio
                </a>
              </div>
            </div>

            {/* Visual Editorial Preview Frame */}
            <div className="mt-16 md:mt-20 max-w-3xl mx-auto">
              <div className="rounded-2xl border border-[#EADBCE] bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden">
                <div className="border border-[#EADBCE]/70 rounded-xl p-8 sm:p-12 text-center space-y-6 bg-[#FAF8F5]/40">
                  <div className="flex items-center justify-center gap-2 text-xs tracking-widest text-[#A3835B] uppercase font-medium">
                    <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>arya-dian.com</span>
                  </div>

                  <div className="space-y-2">
                    <p className="font-serif italic text-[#52525B] text-sm">
                      The Wedding Celebration of
                    </p>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#18181B] tracking-tight">
                      Arya &amp; Dian
                    </h2>
                  </div>

                  <div className="w-16 h-px bg-[#C5A880] mx-auto" />

                  <p className="text-xs sm:text-sm text-[#52525B] tracking-widest uppercase">
                    Sabtu, 24 Oktober 2026 • Plataran Borobudur
                  </p>

                  <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-[#52525B]">
                    <span className="px-3 py-1 rounded-full bg-[#EADBCE]/30 border border-[#EADBCE]/60">
                      Private PIN Gatekeeper
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#EADBCE]/30 border border-[#EADBCE]/60">
                      Live RSVP &amp; Guest Sync
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#EADBCE]/30 border border-[#EADBCE]/60">
                      Dedicated Domain
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PORTOFOLIO SECTION */}
        <section id="portofolio" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#18181B]">
              Portofolio Bespoke
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
              Kurasi karya undangan kustom eksklusif yang dirancang unik mencerminkan keanggunan dan
              esensi cerita setiap pasangan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="rounded-xl border border-[#EADBCE] bg-white p-7 space-y-5 hover:border-[#C5A880] transition-colors shadow-2xs">
              <div className="h-44 rounded-lg bg-[#FAF8F5] border border-[#EADBCE]/60 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-xs tracking-widest uppercase text-[#A3835B] font-semibold mb-1">
                  Bespoke Royal
                </span>
                <p className="font-serif text-2xl font-bold text-[#18181B]">Danendra &amp; Laras</p>
                <p className="text-xs text-[#52525B] mt-2">danendra-laras.com</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#18181B] mb-1">
                  The Royal Heritage
                </h3>
                <p className="text-sm text-[#52525B] leading-relaxed">
                  Integrasi visual kultur Jawa klasik dengan tipografi modern, multi-acara, dan
                  manajemen tamu VIP terenkripsi.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-[#EADBCE] bg-white p-7 space-y-5 hover:border-[#C5A880] transition-colors shadow-2xs">
              <div className="h-44 rounded-lg bg-[#FAF8F5] border border-[#EADBCE]/60 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-xs tracking-widest uppercase text-[#A3835B] font-semibold mb-1">
                  Signature Domain
                </span>
                <p className="font-serif text-2xl font-bold text-[#18181B]">Jonathan &amp; Claire</p>
                <p className="text-xs text-[#52525B] mt-2">jonathanclaire.wedding</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#18181B] mb-1">
                  Monochrome Minimalist
                </h3>
                <p className="text-sm text-[#52525B] leading-relaxed">
                  Estetika editorial kontemporer hitam-putih dengan galeri sinematik, RSVP digital,
                  dan integrasi kalender otomatis.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-[#EADBCE] bg-white p-7 space-y-5 hover:border-[#C5A880] transition-colors shadow-2xs">
              <div className="h-44 rounded-lg bg-[#FAF8F5] border border-[#EADBCE]/60 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-xs tracking-widest uppercase text-[#A3835B] font-semibold mb-1">
                  Intimate Bespoke
                </span>
                <p className="font-serif text-2xl font-bold text-[#18181B]">Rian &amp; Michelle</p>
                <p className="text-xs text-[#52525B] mt-2">rianmichelle.my.id</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#18181B] mb-1">
                  Botanical Serenity
                </h3>
                <p className="text-sm text-[#52525B] leading-relaxed">
                  Sentuhan hangat palet bumi alami untuk resepsi intim luar ruangan dengan proteksi
                  PIN tamu dan wish generator.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section
          id="pricing"
          className="py-20 md:py-28 bg-[#FAF8F5] border-y border-[#EADBCE]/60"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#18181B]">
                Paket &amp; Harga
              </h2>
              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
                Pilihan paket bespoke transparan. Sudah mencakup kepemilikan domain pribadi, sistem
                RSVP cerdas, dan sinkronisasi wedding planner.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tier 1: Intimate */}
              <div className="rounded-2xl border border-[#EADBCE] bg-white p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-[#18181B]">Intimate Bespoke</h3>
                  <p className="text-sm text-[#52525B]">
                    Ideal untuk perayaan hangat keluarga dan sahabat terdekat.
                  </p>
                  <div className="pt-2 pb-4 border-b border-[#EADBCE]/50">
                    <span className="text-xs text-[#52525B]">Mulai dari</span>
                    <p className="font-serif text-3xl font-bold text-[#18181B]">Rp 499.000</p>
                  </div>
                  <ul className="space-y-3 text-sm text-[#52525B]">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#A3835B] shrink-0" />
                      <span>Custom domain (.my.id / .web.id 1 tahun)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#A3835B] shrink-0" />
                      <span>Desain kustom eksklusif 1 revisi mayor</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#A3835B] shrink-0" />
                      <span>Manajemen RSVP &amp; Buku Tamu Digital</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#A3835B] shrink-0" />
                      <span>Masa aktif undangan selamanya</span>
                    </li>
                  </ul>
                </div>
                <a
                  href="#inquiry"
                  className="w-full text-center border border-[#18181B] text-[#18181B] hover:bg-[#18181B] hover:text-[#FAF8F5] transition-colors rounded-full py-3 text-sm font-medium tracking-wide"
                >
                  Pilih Paket Intimate
                </a>
              </div>

              {/* Tier 2: Signature (Featured) */}
              <div className="rounded-2xl border-2 border-[#C5A880] bg-white p-8 space-y-6 flex flex-col justify-between relative shadow-md">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#18181B] text-[#FAF8F5] text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wider border border-[#C5A880]">
                  Paling Populer
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-[#18181B]">
                    Signature Bespoke
                  </h3>
                  <p className="text-sm text-[#52525B]">
                    Standar kemewahan digital lengkap dengan domain internasional dan wedding planner.
                  </p>
                  <div className="pt-2 pb-4 border-b border-[#EADBCE]/50">
                    <span className="text-xs text-[#52525B]">Mulai dari</span>
                    <p className="font-serif text-3xl font-bold text-[#18181B]">Rp 999.000</p>
                  </div>
                  <ul className="space-y-3 text-sm text-[#52525B]">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#A3835B] shrink-0" />
                      <span className="font-medium text-[#18181B]">
                        Domain kustom .com pribadi (1 tahun)
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#A3835B] shrink-0" />
                      <span>Desain personal bespoke 3 revisi</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#A3835B] shrink-0" />
                      <span>Akses penuh Wedding Planner Hub</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#A3835B] shrink-0" />
                      <span>Private Gatekeeper (Akses PIN Tamu VIP)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#A3835B] shrink-0" />
                      <span>WhatsApp Personal Link Generator</span>
                    </li>
                  </ul>
                </div>
                <a
                  href="#inquiry"
                  className="w-full text-center bg-[#18181B] text-[#FAF8F5] hover:bg-[#A3835B] transition-colors rounded-full py-3 text-sm font-medium tracking-wide shadow-xs"
                >
                  Pilih Paket Signature
                </a>
              </div>

              {/* Tier 3: Royal */}
              <div className="rounded-2xl border border-[#EADBCE] bg-white p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-[#18181B]">Royal Bespoke</h3>
                  <p className="text-sm text-[#52525B]">
                    Pengalaman haute couture paripurna dengan asistensi desainer privat dedicated.
                  </p>
                  <div className="pt-2 pb-4 border-b border-[#EADBCE]/50">
                    <span className="text-xs text-[#52525B]">Mulai dari</span>
                    <p className="font-serif text-3xl font-bold text-[#18181B]">Rp 1.899.000</p>
                  </div>
                  <ul className="space-y-3 text-sm text-[#52525B]">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#A3835B] shrink-0" />
                      <span>Domain kustom premium (.com / .wedding)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#A3835B] shrink-0" />
                      <span>Full Custom Artwork &amp; Animasi Eksklusif</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#A3835B] shrink-0" />
                      <span>Asistensi Concierge Desainer Dedicated</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#A3835B] shrink-0" />
                      <span>Sistem Check-in QR Code Resepsi</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#A3835B] shrink-0" />
                      <span>Prioritas Support 24/7 hingga Hari H</span>
                    </li>
                  </ul>
                </div>
                <a
                  href="#inquiry"
                  className="w-full text-center border border-[#18181B] text-[#18181B] hover:bg-[#18181B] hover:text-[#FAF8F5] transition-colors rounded-full py-3 text-sm font-medium tracking-wide"
                >
                  Pilih Paket Royal
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* EKOSISTEM SECTION */}
        <section id="ekosistem" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#18181B]">
              Fitur Ekosistem Invitea
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
              Lebih dari sekadar undangan digital. Seluruh instrumen terintegrasi mulus dari masa
              persiapan bersama wedding planner hingga hari bahagia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-xl border border-[#EADBCE] bg-white p-7 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#EADBCE] flex items-center justify-center text-[#A3835B]">
                <Globe className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18181B]">
                Dedicated Personal Domain
              </h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Tampilkan nama kedua mempelai langsung pada tautan domain pribadi (contoh:
                arya-dian.com) tanpa embel-embel subdomain pihak ketiga.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border border-[#EADBCE] bg-white p-7 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#EADBCE] flex items-center justify-center text-[#A3835B]">
                <Calendar className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18181B]">
                Wedding Planner Hub
              </h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Kelola checklist persiapan, budget tracker, rundown acara, dan koordinasi vendor
                secara terpusat di{" "}
                <a
                  href="https://plan.invitea.cards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#18181B] font-medium underline underline-offset-4 hover:text-[#A3835B]"
                >
                  plan.invitea.cards
                </a>
                .
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border border-[#EADBCE] bg-white p-7 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#EADBCE] flex items-center justify-center text-[#A3835B]">
                <Users className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18181B]">
                Smart Guest List &amp; RSVP Sync
              </h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Sinkronisasi data kehadiran tamu secara real-time ke spreadsheet dan wedding planner
                hub untuk alokasi katering dan tempat duduk yang presisi.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl border border-[#EADBCE] bg-white p-7 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#EADBCE] flex items-center justify-center text-[#A3835B]">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18181B]">Private Gatekeeper</h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Jaga kerahasiaan acara intim Anda dengan proteksi PIN khusus tamu, pembatasan kuota
                plus-one, dan QR Code access card.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-xl border border-[#EADBCE] bg-white p-7 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#EADBCE] flex items-center justify-center text-[#A3835B]">
                <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18181B]">
                Instant Template Builder
              </h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Pilihan instan untuk pasangan praktis. Buat undangan digital dalam hitungan menit di{" "}
                <a
                  href="https://create.invitea.cards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#18181B] font-medium underline underline-offset-4 hover:text-[#A3835B]"
                >
                  create.invitea.cards
                </a>
                .
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-xl border border-[#EADBCE] bg-white p-7 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#EADBCE] flex items-center justify-center text-[#A3835B]">
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18181B]">
                WhatsApp Distribution
              </h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Generator link personalisasi instan untuk pengiriman pesan undangan melalui WhatsApp
                dengan nama tamu otomatis tanpa ketik berulang.
              </p>
            </div>
          </div>
        </section>

        {/* INQUIRY / CONSULTATION SECTION */}
        <section
          id="inquiry"
          className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EADBCE]/70"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#18181B]">
                Konsultasi Desain Bespoke
              </h2>
              <p className="text-base sm:text-lg text-[#52525B] max-w-2xl mx-auto leading-relaxed">
                Ceritakan konsep pernikahan impian Anda. Tim desainer Invitea siap membantu merancang
                undangan digital yang sepenuhnya disesuaikan dengan visi estetika Anda.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EADBCE] bg-white p-8 sm:p-12 shadow-sm space-y-6">
              <div className="space-y-2">
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#18181B]">
                  Mulai Konsultasi Eksklusif Bebas Biaya
                </p>
                <p className="text-sm text-[#52525B]">
                  Diskusikan tema warna, tipografi, domain kustom, serta kebutuhan fitur khusus
                  bersama lead designer kami.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Invitea%2C%20saya%20ingin%20konsultasi%20desain%20undangan%20bespoke."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#18181B] text-[#FAF8F5] hover:bg-[#A3835B] transition-colors rounded-full px-8 py-3.5 text-sm font-medium tracking-wide shadow-xs"
                >
                  <span>Chat WhatsApp Official</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="https://create.invitea.cards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#EADBCE] bg-white text-[#18181B] hover:bg-[#FAF8F5] transition-colors rounded-full px-8 py-3.5 text-sm font-medium tracking-wide"
                >
                  <span>Eksplor Template Instan</span>
                  <ArrowUpRight className="w-4 h-4 opacity-60" aria-hidden="true" />
                </a>
              </div>

              <div className="pt-6 border-t border-[#EADBCE]/50 flex flex-wrap items-center justify-center gap-6 text-xs text-[#52525B]">
                <span>✓ Konsultasi Awal Gratis</span>
                <span>✓ Dedicated Custom Domain</span>
                <span>✓ Wedding Planner Included</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
