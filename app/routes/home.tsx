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
    <div className="min-h-screen flex flex-col bg-[oklch(96%_0.02_75)] text-[oklch(23%_0.03_40)] selection:bg-[oklch(72%_0.09_16)]/30 selection:text-[oklch(23%_0.03_40)]">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section
          id="hero"
          className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 border-b border-[oklch(84%_0.05_18)]/60"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              {/* Subtle Luxury Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[oklch(84%_0.05_18)] bg-[oklch(91%_0.03_20)] text-[oklch(38%_0.14_15)] text-xs font-medium tracking-widest uppercase">
                <span>Bespoke Studio &amp; Wedding Ecosystem</span>
              </div>

              {/* Editorial Title */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[oklch(23%_0.03_40)] leading-[1.12]">
                Bespoke Wedding Invitation &amp; Digital Experience
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl text-[oklch(40%_0.03_35)] max-w-2xl mx-auto leading-relaxed">
                Merancang undangan pernikahan kustom eksklusif dengan domain pribadi dan integrasi
                ekosistem wedding planner modern.
              </p>

              {/* CTA Group */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href="#inquiry"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-[oklch(58%_0.13_15)] text-[oklch(94%_0.02_70)] hover:bg-[oklch(38%_0.14_15)] transition-colors rounded-full px-8 py-3.5 text-sm font-medium tracking-wide shadow-[0_10px_25px_-10px_oklch(58%_0.13_15/0.4)]"
                >
                  Konsultasi Desain
                </a>
                <a
                  href="#portofolio"
                  className="w-full sm:w-auto inline-flex items-center justify-center border border-[oklch(84%_0.05_18)] bg-white/70 hover:bg-white text-[oklch(23%_0.03_40)] transition-colors rounded-full px-8 py-3.5 text-sm font-medium tracking-wide shadow-2xs"
                >
                  Lihat Portofolio
                </a>
              </div>
            </div>

            {/* Visual Editorial Preview Frame */}
            <div className="mt-16 md:mt-20 max-w-3xl mx-auto">
              <div className="rounded-2xl border border-[oklch(84%_0.05_18)] bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden">
                <div className="border border-[oklch(84%_0.05_18)]/70 rounded-xl p-8 sm:p-12 text-center space-y-6 bg-[oklch(96%_0.02_75)]/50">
                  <div className="flex items-center justify-center gap-2 text-xs tracking-widest text-[oklch(38%_0.14_15)] uppercase font-medium">
                    <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>arya-dian.com</span>
                  </div>

                  <div className="space-y-2">
                    <p className="font-serif italic text-[oklch(40%_0.03_35)] text-sm">
                      The Wedding Celebration of
                    </p>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[oklch(23%_0.03_40)] tracking-tight">
                      Arya &amp; Dian
                    </h2>
                  </div>

                  <div className="w-16 h-px bg-[oklch(72%_0.09_16)] mx-auto" />

                  <p className="text-xs sm:text-sm text-[oklch(40%_0.03_35)] tracking-widest uppercase">
                    Sabtu, 24 Oktober 2026 • Plataran Borobudur
                  </p>

                  <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-[oklch(38%_0.14_15)]">
                    <span className="px-3 py-1 rounded-full bg-[oklch(91%_0.03_20)] border border-[oklch(84%_0.05_18)]">
                      Private PIN Gatekeeper
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[oklch(91%_0.03_20)] border border-[oklch(84%_0.05_18)]">
                      Live RSVP &amp; Guest Sync
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[oklch(91%_0.03_20)] border border-[oklch(84%_0.05_18)]">
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
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[oklch(23%_0.03_40)]">
              Portofolio Bespoke
            </h2>
            <p className="text-sm sm:text-base text-[oklch(40%_0.03_35)] leading-relaxed">
              Kurasi karya undangan kustom eksklusif yang dirancang unik mencerminkan keanggunan dan
              esensi cerita setiap pasangan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="rounded-xl border border-[oklch(84%_0.05_18)] bg-white p-7 space-y-5 hover:border-[oklch(58%_0.13_15)] transition-colors shadow-2xs">
              <div className="h-44 rounded-lg bg-[oklch(96%_0.02_75)] border border-[oklch(84%_0.05_18)]/60 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-xs tracking-widest uppercase text-[oklch(38%_0.14_15)] font-semibold mb-1">
                  Bespoke Royal
                </span>
                <p className="font-serif text-2xl font-bold text-[oklch(23%_0.03_40)]">Danendra &amp; Laras</p>
                <p className="text-xs text-[oklch(40%_0.03_35)] mt-2">danendra-laras.com</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[oklch(23%_0.03_40)] mb-1">
                  The Royal Heritage
                </h3>
                <p className="text-sm text-[oklch(40%_0.03_35)] leading-relaxed">
                  Integrasi visual kultur Jawa klasik dengan tipografi modern, multi-acara, dan
                  manajemen tamu VIP terenkripsi.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-[oklch(84%_0.05_18)] bg-white p-7 space-y-5 hover:border-[oklch(58%_0.13_15)] transition-colors shadow-2xs">
              <div className="h-44 rounded-lg bg-[oklch(96%_0.02_75)] border border-[oklch(84%_0.05_18)]/60 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-xs tracking-widest uppercase text-[oklch(38%_0.14_15)] font-semibold mb-1">
                  Signature Domain
                </span>
                <p className="font-serif text-2xl font-bold text-[oklch(23%_0.03_40)]">Jonathan &amp; Claire</p>
                <p className="text-xs text-[oklch(40%_0.03_35)] mt-2">jonathanclaire.wedding</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[oklch(23%_0.03_40)] mb-1">
                  Monochrome Minimalist
                </h3>
                <p className="text-sm text-[oklch(40%_0.03_35)] leading-relaxed">
                  Estetika editorial kontemporer hitam-putih dengan galeri sinematik, RSVP digital,
                  dan integrasi kalender otomatis.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-[oklch(84%_0.05_18)] bg-white p-7 space-y-5 hover:border-[oklch(58%_0.13_15)] transition-colors shadow-2xs">
              <div className="h-44 rounded-lg bg-[oklch(96%_0.02_75)] border border-[oklch(84%_0.05_18)]/60 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-xs tracking-widest uppercase text-[oklch(38%_0.14_15)] font-semibold mb-1">
                  Intimate Bespoke
                </span>
                <p className="font-serif text-2xl font-bold text-[oklch(23%_0.03_40)]">Rian &amp; Michelle</p>
                <p className="text-xs text-[oklch(40%_0.03_35)] mt-2">rianmichelle.my.id</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[oklch(23%_0.03_40)] mb-1">
                  Botanical Serenity
                </h3>
                <p className="text-sm text-[oklch(40%_0.03_35)] leading-relaxed">
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
          className="py-20 md:py-28 bg-[oklch(91%_0.035_25)] border-y border-[oklch(84%_0.05_18)]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[oklch(23%_0.03_40)]">
                Paket &amp; Harga
              </h2>
              <p className="text-sm sm:text-base text-[oklch(40%_0.03_35)] leading-relaxed">
                Pilihan paket bespoke transparan. Sudah mencakup kepemilikan domain pribadi, sistem
                RSVP cerdas, dan sinkronisasi wedding planner.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tier 1: Intimate */}
              <div className="rounded-2xl border border-[oklch(84%_0.05_18)] bg-white p-8 space-y-6 flex flex-col justify-between hover:border-[oklch(58%_0.13_15)] transition-colors">
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-[oklch(23%_0.03_40)]">Intimate Bespoke</h3>
                  <p className="text-sm text-[oklch(40%_0.03_35)]">
                    Ideal untuk perayaan hangat keluarga dan sahabat terdekat.
                  </p>
                  <div className="pt-2 pb-4 border-b border-[oklch(84%_0.05_18)]/50">
                    <span className="text-xs text-[oklch(40%_0.03_35)]">Mulai dari</span>
                    <p className="font-serif text-3xl font-bold text-[oklch(23%_0.03_40)]">Rp 499.000</p>
                  </div>
                  <ul className="space-y-3 text-sm text-[oklch(40%_0.03_35)]">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[oklch(38%_0.14_15)] shrink-0" />
                      <span>Custom domain (.my.id / .web.id 1 tahun)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[oklch(38%_0.14_15)] shrink-0" />
                      <span>Desain kustom eksklusif 1 revisi mayor</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[oklch(38%_0.14_15)] shrink-0" />
                      <span>Manajemen RSVP &amp; Buku Tamu Digital</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[oklch(38%_0.14_15)] shrink-0" />
                      <span>Masa aktif undangan selamanya</span>
                    </li>
                  </ul>
                </div>
                <a
                  href="#inquiry"
                  className="w-full text-center border border-[oklch(84%_0.05_18)] bg-white text-[oklch(23%_0.03_40)] hover:bg-[oklch(38%_0.14_15)] hover:text-[oklch(94%_0.02_70)] hover:border-[oklch(38%_0.14_15)] transition-colors rounded-full py-3 text-sm font-medium tracking-wide"
                >
                  Pilih Paket Intimate
                </a>
              </div>

              {/* Tier 2: Signature (Featured) */}
              <div className="rounded-2xl border-2 border-[oklch(58%_0.13_15)] bg-white p-8 space-y-6 flex flex-col justify-between relative shadow-md">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[oklch(38%_0.14_15)] text-[oklch(94%_0.02_70)] text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wider border border-[oklch(72%_0.09_16)]">
                  Paling Populer
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-[oklch(23%_0.03_40)]">
                    Signature Bespoke
                  </h3>
                  <p className="text-sm text-[oklch(40%_0.03_35)]">
                    Standar kemewahan digital lengkap dengan domain internasional dan wedding planner.
                  </p>
                  <div className="pt-2 pb-4 border-b border-[oklch(84%_0.05_18)]/50">
                    <span className="text-xs text-[oklch(40%_0.03_35)]">Mulai dari</span>
                    <p className="font-serif text-3xl font-bold text-[oklch(23%_0.03_40)]">Rp 999.000</p>
                  </div>
                  <ul className="space-y-3 text-sm text-[oklch(40%_0.03_35)]">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[oklch(38%_0.14_15)] shrink-0" />
                      <span className="font-medium text-[oklch(23%_0.03_40)]">
                        Domain kustom .com pribadi (1 tahun)
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[oklch(38%_0.14_15)] shrink-0" />
                      <span>Desain personal bespoke 3 revisi</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[oklch(38%_0.14_15)] shrink-0" />
                      <span>Akses penuh Wedding Planner Hub</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[oklch(38%_0.14_15)] shrink-0" />
                      <span>Private Gatekeeper (Akses PIN Tamu VIP)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[oklch(38%_0.14_15)] shrink-0" />
                      <span>WhatsApp Personal Link Generator</span>
                    </li>
                  </ul>
                </div>
                <a
                  href="#inquiry"
                  className="w-full text-center bg-[oklch(58%_0.13_15)] text-[oklch(94%_0.02_70)] hover:bg-[oklch(38%_0.14_15)] transition-colors rounded-full py-3 text-sm font-medium tracking-wide shadow-[0_10px_25px_-10px_oklch(58%_0.13_15/0.4)]"
                >
                  Pilih Paket Signature
                </a>
              </div>

              {/* Tier 3: Royal */}
              <div className="rounded-2xl border border-[oklch(84%_0.05_18)] bg-white p-8 space-y-6 flex flex-col justify-between hover:border-[oklch(58%_0.13_15)] transition-colors">
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-[oklch(23%_0.03_40)]">Royal Bespoke</h3>
                  <p className="text-sm text-[oklch(40%_0.03_35)]">
                    Pengalaman haute couture paripurna dengan asistensi desainer privat dedicated.
                  </p>
                  <div className="pt-2 pb-4 border-b border-[oklch(84%_0.05_18)]/50">
                    <span className="text-xs text-[oklch(40%_0.03_35)]">Mulai dari</span>
                    <p className="font-serif text-3xl font-bold text-[oklch(23%_0.03_40)]">Rp 1.899.000</p>
                  </div>
                  <ul className="space-y-3 text-sm text-[oklch(40%_0.03_35)]">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[oklch(38%_0.14_15)] shrink-0" />
                      <span>Domain kustom premium (.com / .wedding)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[oklch(38%_0.14_15)] shrink-0" />
                      <span>Full Custom Artwork &amp; Animasi Eksklusif</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[oklch(38%_0.14_15)] shrink-0" />
                      <span>Asistensi Concierge Desainer Dedicated</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[oklch(38%_0.14_15)] shrink-0" />
                      <span>Sistem Check-in QR Code Resepsi</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[oklch(38%_0.14_15)] shrink-0" />
                      <span>Prioritas Support 24/7 hingga Hari H</span>
                    </li>
                  </ul>
                </div>
                <a
                  href="#inquiry"
                  className="w-full text-center border border-[oklch(84%_0.05_18)] bg-white text-[oklch(23%_0.03_40)] hover:bg-[oklch(38%_0.14_15)] hover:text-[oklch(94%_0.02_70)] hover:border-[oklch(38%_0.14_15)] transition-colors rounded-full py-3 text-sm font-medium tracking-wide"
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
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[oklch(23%_0.03_40)]">
              Fitur Ekosistem Invitea
            </h2>
            <p className="text-sm sm:text-base text-[oklch(40%_0.03_35)] leading-relaxed">
              Lebih dari sekadar undangan digital. Seluruh instrumen terintegrasi mulus dari masa
              persiapan bersama wedding planner hingga hari bahagia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-xl border border-[oklch(84%_0.05_18)] bg-white p-7 space-y-3 hover:border-[oklch(58%_0.13_15)] transition-colors shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[oklch(91%_0.03_20)] border border-[oklch(84%_0.05_18)] flex items-center justify-center text-[oklch(38%_0.14_15)]">
                <Globe className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[oklch(23%_0.03_40)]">
                Dedicated Personal Domain
              </h3>
              <p className="text-sm text-[oklch(40%_0.03_35)] leading-relaxed">
                Tampilkan nama kedua mempelai langsung pada tautan domain pribadi (contoh:
                arya-dian.com) tanpa embel-embel subdomain pihak ketiga.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border border-[oklch(84%_0.05_18)] bg-white p-7 space-y-3 hover:border-[oklch(58%_0.13_15)] transition-colors shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[oklch(91%_0.03_20)] border border-[oklch(84%_0.05_18)] flex items-center justify-center text-[oklch(38%_0.14_15)]">
                <Calendar className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[oklch(23%_0.03_40)]">
                Wedding Planner Hub
              </h3>
              <p className="text-sm text-[oklch(40%_0.03_35)] leading-relaxed">
                Kelola checklist persiapan, budget tracker, rundown acara, dan koordinasi vendor
                secara terpusat di{" "}
                <a
                  href="https://plan.invitea.cards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[oklch(38%_0.14_15)] font-medium underline underline-offset-4 hover:text-[oklch(58%_0.13_15)]"
                >
                  plan.invitea.cards
                </a>
                .
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border border-[oklch(84%_0.05_18)] bg-white p-7 space-y-3 hover:border-[oklch(58%_0.13_15)] transition-colors shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[oklch(91%_0.03_20)] border border-[oklch(84%_0.05_18)] flex items-center justify-center text-[oklch(38%_0.14_15)]">
                <Users className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[oklch(23%_0.03_40)]">
                Smart Guest List &amp; RSVP Sync
              </h3>
              <p className="text-sm text-[oklch(40%_0.03_35)] leading-relaxed">
                Sinkronisasi data kehadiran tamu secara real-time ke spreadsheet dan wedding planner
                hub untuk alokasi katering dan tempat duduk yang presisi.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl border border-[oklch(84%_0.05_18)] bg-white p-7 space-y-3 hover:border-[oklch(58%_0.13_15)] transition-colors shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[oklch(91%_0.03_20)] border border-[oklch(84%_0.05_18)] flex items-center justify-center text-[oklch(38%_0.14_15)]">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[oklch(23%_0.03_40)]">Private Gatekeeper</h3>
              <p className="text-sm text-[oklch(40%_0.03_35)] leading-relaxed">
                Jaga kerahasiaan acara intim Anda dengan proteksi PIN khusus tamu, pembatasan kuota
                plus-one, dan QR Code access card.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-xl border border-[oklch(84%_0.05_18)] bg-white p-7 space-y-3 hover:border-[oklch(58%_0.13_15)] transition-colors shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[oklch(91%_0.03_20)] border border-[oklch(84%_0.05_18)] flex items-center justify-center text-[oklch(38%_0.14_15)]">
                <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[oklch(23%_0.03_40)]">
                Instant Template Builder
              </h3>
              <p className="text-sm text-[oklch(40%_0.03_35)] leading-relaxed">
                Pilihan instan untuk pasangan praktis. Buat undangan digital dalam hitungan menit di{" "}
                <a
                  href="https://create.invitea.cards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[oklch(38%_0.14_15)] font-medium underline underline-offset-4 hover:text-[oklch(58%_0.13_15)]"
                >
                  create.invitea.cards
                </a>
                .
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-xl border border-[oklch(84%_0.05_18)] bg-white p-7 space-y-3 hover:border-[oklch(58%_0.13_15)] transition-colors shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[oklch(91%_0.03_20)] border border-[oklch(84%_0.05_18)] flex items-center justify-center text-[oklch(38%_0.14_15)]">
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[oklch(23%_0.03_40)]">
                WhatsApp Distribution
              </h3>
              <p className="text-sm text-[oklch(40%_0.03_35)] leading-relaxed">
                Generator link personalisasi instan untuk pengiriman pesan undangan melalui WhatsApp
                dengan nama tamu otomatis tanpa ketik berulang.
              </p>
            </div>
          </div>
        </section>

        {/* INQUIRY / CONSULTATION SECTION */}
        <section
          id="inquiry"
          className="py-20 md:py-28 bg-[oklch(91%_0.035_25)] border-t border-[oklch(84%_0.05_18)]"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[oklch(23%_0.03_40)]">
                Konsultasi Desain Bespoke
              </h2>
              <p className="text-base sm:text-lg text-[oklch(40%_0.03_35)] max-w-2xl mx-auto leading-relaxed">
                Ceritakan konsep pernikahan impian Anda. Tim desainer Invitea siap membantu merancang
                undangan digital yang sepenuhnya disesuaikan dengan visi estetika Anda.
              </p>
            </div>

            <div className="rounded-2xl border border-[oklch(84%_0.05_18)] bg-white p-8 sm:p-12 shadow-sm space-y-6">
              <div className="space-y-2">
                <p className="font-serif text-xl sm:text-2xl font-bold text-[oklch(23%_0.03_40)]">
                  Mulai Konsultasi Eksklusif Bebas Biaya
                </p>
                <p className="text-sm text-[oklch(40%_0.03_35)]">
                  Diskusikan tema warna, tipografi, domain kustom, serta kebutuhan fitur khusus
                  bersama lead designer kami.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Invitea%2C%20saya%20ingin%20konsultasi%20desain%20undangan%20bespoke."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[oklch(58%_0.13_15)] text-[oklch(94%_0.02_70)] hover:bg-[oklch(38%_0.14_15)] transition-colors rounded-full px-8 py-3.5 text-sm font-medium tracking-wide shadow-[0_10px_25px_-10px_oklch(58%_0.13_15/0.4)]"
                >
                  <span>Chat WhatsApp Official</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="https://create.invitea.cards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[oklch(84%_0.05_18)] bg-white text-[oklch(23%_0.03_40)] hover:bg-[oklch(91%_0.03_20)] transition-colors rounded-full px-8 py-3.5 text-sm font-medium tracking-wide"
                >
                  <span>Eksplor Template Instan</span>
                  <ArrowUpRight className="w-4 h-4 opacity-60" aria-hidden="true" />
                </a>
              </div>

              <div className="pt-6 border-t border-[oklch(84%_0.05_18)]/50 flex flex-wrap items-center justify-center gap-6 text-xs text-[oklch(40%_0.03_35)]">
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
