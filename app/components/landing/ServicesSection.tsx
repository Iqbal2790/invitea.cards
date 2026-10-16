import { useRef } from "react";
import { useScroll } from "framer-motion";
import {
  CheckCircle2,
  CalendarDays,
  Wallet,
  Users2,
  Clock,
  Globe2,
  MapPin,
  MessageSquareHeart,
  UserCheck,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import {
  BlurRevealItem,
  BlurRevealCardItem,
  BlurRevealContainer,
} from "~/components/ui/ScrollText";

export function ServicesSection() {
  const card1Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: card1Progress } = useScroll({
    target: card1Ref,
    offset: ["start 92%", "center 55%"],
  });

  const card2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: card2Progress } = useScroll({
    target: card2Ref,
    offset: ["start 92%", "center 55%"],
  });

  return (
    <section
      id="layanan"
      className="scroll-mt-20 py-16 sm:py-20 md:py-24 w-full border-t border-hairline/60 bg-bg"
    >
      {/* Target anchors for navbar & footer links */}
      <div id="ekosistem" className="sr-only" aria-hidden="true" />
      <div id="fitur" className="sr-only" aria-hidden="true" />
      <div id="cara-kerja" className="sr-only" aria-hidden="true" />

      <div className="w-full px-6 sm:px-8 lg:px-12">
        {/* Section Header: Static crisp typography (no blur reveal on section header) */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-berry mb-3">
            Ekosistem Layanan
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink leading-[1.15]">
            Mulai dari yang kalian butuhkan.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
            Dua solusi terpadu untuk merencanakan pernikahan impian dan
            membagikan momen bahagia tanpa rasa cemas.
          </p>
        </div>

        {/* Services Showcase Cards: All inner elements with Framer Blur Reveal */}
        <div className="flex flex-col gap-10 sm:gap-12 lg:gap-16">
          {/* Card 1: Wedding Planner */}
          <div
            ref={card1Ref}
            className="w-full rounded-3xl border border-header-border bg-bg-alt/25 p-6 sm:p-8 md:p-10 lg:p-12 transition-all shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Copy & Sub-features */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <BlurRevealItem staggerIndex={0}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-soft text-berry border border-pink-line/70 mb-4">
                      Gratis Digunakan
                    </div>
                  </BlurRevealItem>

                  <BlurRevealItem staggerIndex={1}>
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-ink tracking-tight">
                      Wedding Planner
                    </h3>
                  </BlurRevealItem>

                  <BlurRevealItem staggerIndex={2}>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
                      Checklist, anggaran, vendor, jadwal, dan hari-H. Kelola seluruh
                      persiapan pernikahan dengan rapi dalam satu tempat tanpa
                      spreadsheet manual.
                    </p>
                  </BlurRevealItem>

                  <BlurRevealItem staggerIndex={3}>
                    <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4">
                      <a
                        href="https://plan.invitea.cards"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-cream-text text-sm sm:text-base font-medium hover:bg-berry transition-colors shadow-sm"
                      >
                        <span>Buka Planner</span>
                        <ArrowUpRight className="w-4 h-4 opacity-80" aria-hidden="true" />
                      </a>
                    </div>
                  </BlurRevealItem>
                </div>

                {/* Sub-features 2x2 Grid with Blur Reveal Animation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-8 sm:mt-10 pt-8 border-t border-hairline/60">
                  <BlurRevealCardItem index={0} scrollYProgress={card1Progress}>
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-pink-soft flex items-center justify-center text-berry shrink-0">
                        <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base text-ink">
                          Checklist Persiapan
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-ink-soft leading-relaxed">
                          Tugas terstruktur bertahap, pantau dan centang satu per satu.
                        </p>
                      </div>
                    </div>
                  </BlurRevealCardItem>

                  <BlurRevealCardItem index={1} scrollYProgress={card1Progress}>
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-pink-soft flex items-center justify-center text-berry shrink-0">
                        <Wallet className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base text-ink">
                          Kontrol Anggaran
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-ink-soft leading-relaxed">
                          Rencana alokasi dana dan rekap pengeluaran riil per kategori.
                        </p>
                      </div>
                    </div>
                  </BlurRevealCardItem>

                  <BlurRevealCardItem index={2} scrollYProgress={card1Progress}>
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-pink-soft flex items-center justify-center text-berry shrink-0">
                        <Users2 className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base text-ink">
                          Manajemen Vendor
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-ink-soft leading-relaxed">
                          Kandidat, harga kesepakatan, DP, dan histori pembayaran.
                        </p>
                      </div>
                    </div>
                  </BlurRevealCardItem>

                  <BlurRevealCardItem index={3} scrollYProgress={card1Progress}>
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-pink-soft flex items-center justify-center text-berry shrink-0">
                        <CalendarDays className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base text-ink">
                          Jadwal &amp; Rundown
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-ink-soft leading-relaxed">
                          Hitung mundur hari-H dan susunan waktu acara terkoordinasi.
                        </p>
                      </div>
                    </div>
                  </BlurRevealCardItem>
                </div>
              </div>

              {/* Right Column: Planner UI Mockup with Inner Elements Blur Reveal */}
              <div className="lg:col-span-5 flex justify-center mt-6 lg:mt-0">
                <BlurRevealContainer
                  scrollYProgress={card1Progress}
                  initialBlur={10}
                  className="w-full max-w-md"
                >
                  <div className="w-full rounded-2xl border border-header-border bg-bg p-5 sm:p-6 shadow-sm flex flex-col gap-5">
                    {/* Mockup Header */}
                    <BlurRevealItem staggerIndex={1}>
                      <div className="flex items-center justify-between pb-4 border-b border-hairline/60">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-ink-soft font-semibold">
                            Dashboard Persiapan
                          </p>
                          <h5 className="font-serif font-semibold text-lg text-ink">
                            Sarah &amp; Dimas
                          </h5>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-soft text-berry">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          H-30
                        </span>
                      </div>
                    </BlurRevealItem>

                    {/* Budget Widget */}
                    <BlurRevealItem staggerIndex={2}>
                      <div className="p-4 rounded-xl bg-bg-alt/40 border border-header-border">
                        <div className="flex items-center justify-between text-xs text-ink-soft mb-1.5">
                          <span>Total Anggaran</span>
                          <span className="font-medium text-ink">Rp85.000.000</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-pink-soft/80 overflow-hidden">
                          <div className="h-full bg-berry rounded-full w-[62%]" />
                        </div>
                        <div className="flex items-center justify-between mt-2.5 text-xs">
                          <span className="text-berry font-medium">Terpakai: Rp52.700.000</span>
                          <span className="text-ink-soft">Sisa: Rp32.300.000</span>
                        </div>
                      </div>
                    </BlurRevealItem>

                    {/* Checklist Widget */}
                    <BlurRevealItem staggerIndex={3}>
                      <div>
                        <div className="flex items-center justify-between text-xs text-ink-soft mb-3">
                          <span className="font-semibold uppercase tracking-wider text-ink">
                            Checklist Prioritas
                          </span>
                          <span>18 / 24 Selesai (75%)</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-ink p-2 rounded-lg bg-bg-alt/25">
                            <CheckCircle2 className="w-4 h-4 text-berry shrink-0" />
                            <span className="line-through text-ink-soft">
                              Konfirmasi Venue &amp; Katering
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-ink p-2 rounded-lg bg-bg-alt/25">
                            <CheckCircle2 className="w-4 h-4 text-berry shrink-0" />
                            <span className="line-through text-ink-soft">
                              Pilih Desain Undangan Digital
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-ink p-2 rounded-lg bg-bg-alt/25">
                            <CheckCircle2 className="w-4 h-4 text-berry shrink-0" />
                            <span className="line-through text-ink-soft">
                              Fitting Busana Pengantin
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-ink p-2 rounded-lg bg-bg-alt/50 font-medium">
                            <div className="w-4 h-4 rounded-full border border-berry/60 shrink-0" />
                            <span>Finalisasi Daftar Nama Tamu VIP</span>
                          </div>
                        </div>
                      </div>
                    </BlurRevealItem>

                    {/* Vendor Status Pill */}
                    <BlurRevealItem staggerIndex={4}>
                      <div className="flex items-center justify-between pt-3 border-t border-hairline/60 text-xs">
                        <span className="text-ink-soft">Vendor Deal: 6 dari 8</span>
                        <span className="text-berry font-semibold">Terkontrol</span>
                      </div>
                    </BlurRevealItem>
                  </div>
                </BlurRevealContainer>
              </div>
            </div>
          </div>

          {/* Card 2: Undangan Digital */}
          <div
            ref={card2Ref}
            className="w-full rounded-3xl border border-header-border bg-bg-alt/25 p-6 sm:p-8 md:p-10 lg:p-12 pb-12 sm:pb-14 lg:pb-16 transition-all shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Copy & Sub-features */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <BlurRevealItem staggerIndex={0}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-soft text-berry border border-pink-line/70 mb-4">
                      Coba Gratis
                    </div>
                  </BlurRevealItem>

                  <BlurRevealItem staggerIndex={1}>
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-ink tracking-tight">
                      Undangan Digital
                    </h3>
                  </BlurRevealItem>

                  <BlurRevealItem staggerIndex={2}>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
                      Website undangan pernikahan berdomain nama sendiri. Bagikan
                      momen berharga dengan RSVP otomatis, rute peta presisi, dan buku
                      ucapan doa dalam tampilan responsif yang anggun di laptop maupun
                      smartphone.
                    </p>
                  </BlurRevealItem>

                  <BlurRevealItem staggerIndex={3}>
                    <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5">
                      <a
                        href="https://create.invitea.cards"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-cream-text text-sm sm:text-base font-medium hover:bg-berry transition-colors shadow-sm"
                      >
                        <span>Buat Undangan Gratis</span>
                        <ArrowRight className="w-4 h-4 opacity-80" aria-hidden="true" />
                      </a>
                      <a
                        href="#katalog"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-header-border bg-bg text-ink text-sm sm:text-base font-medium hover:border-berry/40 transition-colors"
                      >
                        <span>Lihat Katalog Tema</span>
                      </a>
                    </div>
                  </BlurRevealItem>
                </div>

                {/* Sub-features 2x2 Grid with Blur Reveal Animation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-8 sm:mt-10 pt-8 border-t border-hairline/60">
                  <BlurRevealCardItem index={0} scrollYProgress={card2Progress}>
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-pink-soft flex items-center justify-center text-berry shrink-0">
                        <UserCheck className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base text-ink">
                          Tamu Personal
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-ink-soft leading-relaxed">
                          Nama tamu tertera khusus pada cover dan tautan undangan personal.
                        </p>
                      </div>
                    </div>
                  </BlurRevealCardItem>

                  <BlurRevealCardItem index={1} scrollYProgress={card2Progress}>
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-pink-soft flex items-center justify-center text-berry shrink-0">
                        <MessageSquareHeart className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base text-ink">
                          RSVP &amp; Buku Ucapan
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-ink-soft leading-relaxed">
                          Konfirmasi kehadiran otomatis terdata tanpa rekap manual.
                        </p>
                      </div>
                    </div>
                  </BlurRevealCardItem>

                  <BlurRevealCardItem index={2} scrollYProgress={card2Progress}>
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-pink-soft flex items-center justify-center text-berry shrink-0">
                        <Globe2 className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base text-ink">
                          Domain Nama Sendiri
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-ink-soft leading-relaxed">
                          Tautan eksklusif nama berdua untuk kesan personal sejak awal.
                        </p>
                      </div>
                    </div>
                  </BlurRevealCardItem>

                  <BlurRevealCardItem index={3} scrollYProgress={card2Progress}>
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-pink-soft flex items-center justify-center text-berry shrink-0">
                        <MapPin className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base text-ink">
                          Navigasi Peta Presisi
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-ink-soft leading-relaxed">
                          Arah rute langsung menuju Google Maps &amp; Waze lokasi acara.
                        </p>
                      </div>
                    </div>
                  </BlurRevealCardItem>
                </div>
              </div>

              {/* Right Column: Composite Laptop Mockup + Phone Mockup with Blur Reveal */}
              <div className="lg:col-span-6 flex justify-center items-center mt-6 lg:mt-0">
                <BlurRevealContainer
                  scrollYProgress={card2Progress}
                  initialBlur={10}
                  className="w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[500px]"
                >
                  <div className="relative w-full aspect-[800/489] select-none">
                    {/* Laptop Screen Content (Behind bezel, visible through transparent screen cutout) */}
                    <div className="absolute top-[4.3%] bottom-[10.6%] left-[9.6%] right-[9.6%] overflow-hidden bg-bg rounded-t-[5px]">
                      {/* Browser Mockup Chrome */}
                      <div className="sticky top-0 z-20 w-full px-2 sm:px-2.5 py-1 bg-stone-100/95 backdrop-blur-sm border-b border-stone-200/80 flex items-center gap-1.5">
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        </div>
                        <div className="flex-1 max-w-[150px] sm:max-w-[180px] mx-auto px-2 py-0.5 rounded bg-white border border-stone-200/80 text-[7px] sm:text-[8px] text-stone-600 text-center truncate">
                          invitea.cards/sarah-dimas
                        </div>
                      </div>

                      {/* Auto-scrolling Page Content */}
                      <div className="w-full animate-mockup-scroll will-change-transform">
                        {/* Section 1: Hero Cover */}
                        <div className="w-full relative h-[180px] sm:h-[200px] p-3 sm:p-4 flex flex-col justify-between text-white">
                          <img
                            src="/thumbnails/wedding-rings.jpg"
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/45" />

                          <div className="relative z-10 flex items-center justify-between text-[7px] sm:text-[8px] uppercase tracking-wider text-pink-200">
                            <span>Wedding Celebration</span>
                            <span className="px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm border border-white/20">
                              Save The Date
                            </span>
                          </div>

                          <div className="relative z-10 text-center my-auto py-2">
                            <h6 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-white leading-tight">
                              Sarah &amp; Dimas
                            </h6>
                            <p className="text-[8px] sm:text-[9px] text-white/80 mt-1">
                              Sabtu, 14 November 2026 · Jakarta
                            </p>
                          </div>

                          <div className="relative z-10 flex justify-center">
                            <span className="text-[7px] sm:text-[8px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white/90">
                              Scroll untuk melihat rangkaian acara
                            </span>
                          </div>
                        </div>

                        {/* Section 2: Event Schedule & Map */}
                        <div className="w-full p-3 sm:p-4 bg-bg text-ink flex flex-col gap-2 sm:gap-2.5">
                          <div className="text-center">
                            <span className="text-[7px] sm:text-[8px] uppercase tracking-wider text-berry font-semibold">
                              Rangkaian Acara
                            </span>
                            <h6 className="font-serif text-xs sm:text-sm font-semibold text-ink mt-0.5">
                              Akad &amp; Resepsi Pernikahan
                            </h6>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 text-[7px] sm:text-[8px]">
                            <div className="p-2 rounded-lg bg-bg-alt/40 border border-header-border">
                              <span className="font-semibold text-berry block">Akad Nikah</span>
                              <span className="text-ink-soft block mt-0.5">08.00 - 10.00 WIB</span>
                              <span className="text-ink block mt-0.5 font-medium">Masjid Al-Barkah</span>
                            </div>
                            <div className="p-2 rounded-lg bg-bg-alt/40 border border-header-border">
                              <span className="font-semibold text-berry block">Resepsi</span>
                              <span className="text-ink-soft block mt-0.5">11.00 - 14.00 WIB</span>
                              <span className="text-ink block mt-0.5 font-medium">Grand Ballroom</span>
                            </div>
                          </div>

                          {/* Location Hook */}
                          <div className="p-1.5 sm:p-2 rounded-lg bg-bg-alt/30 border border-header-border flex items-center justify-between text-[7px] sm:text-[8px]">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5 text-berry shrink-0" />
                              <span className="text-ink font-medium">Jl. Sudirman No. 12, Jakarta</span>
                            </div>
                            <span className="text-berry font-semibold">Buka Maps</span>
                          </div>

                          {/* RSVP Hook */}
                          <div className="p-2 rounded-lg bg-pink-soft/50 border border-pink-line/60 flex items-center justify-between text-[7px] sm:text-[8px]">
                            <span className="text-ink font-medium">Konfirmasi Kehadiran Tamu</span>
                            <span className="px-2 py-0.5 rounded bg-berry text-white font-semibold">
                              Isi RSVP
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Laptop Mockup Bezel & Aluminum Base */}
                    <img
                      src="/images/laptop-mockup.webp"
                      alt="Mockup Laptop Undangan Digital"
                      className="absolute inset-0 w-full h-full pointer-events-none object-fill z-10 drop-shadow-xl"
                    />

                    {/* Overlapping Phone Mockup (Bottom-Right) */}
                    <BlurRevealItem
                      staggerIndex={3}
                      className="absolute -bottom-1 -right-0.5 sm:-bottom-3 sm:-right-2 md:-right-3 w-[64px] sm:w-[95px] lg:w-[130px] aspect-[9/18.5] z-20 drop-shadow-2xl"
                    >
                      <div className="relative w-full h-full">
                        {/* Screen Content */}
                        <div className="absolute top-[1.2%] bottom-[1.2%] left-[3.5%] right-[3.5%] rounded-[10px] sm:rounded-[16px] lg:rounded-[20px] overflow-hidden bg-stone-900 shadow-xl">
                          <img
                            src="/thumbnails/wedding-portrait.jpg"
                            alt="Mobile Preview"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35" />

                          <div className="absolute top-2 sm:top-3.5 inset-x-1 flex justify-center z-10">
                            <div className="px-1 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[4.5px] sm:text-[6.5px] text-white/90 font-medium leading-none">
                              invitea.cards
                            </div>
                          </div>

                          <div className="absolute bottom-1.5 inset-x-1 p-1 sm:p-1.5 rounded sm:rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-white flex flex-col gap-0.5 text-center">
                            <h6 className="font-serif text-[7px] sm:text-[10px] font-medium tracking-tight text-white leading-tight">
                              Sarah &amp; Dimas
                            </h6>
                            <span className="text-[4.5px] sm:text-[6.5px] text-white/70 leading-none">
                              14 Nov 2026
                            </span>
                            <div className="mt-0.5 py-0.5 px-1 rounded-full bg-white text-ink text-[5.5px] sm:text-[7.5px] font-semibold leading-none">
                              Buka
                            </div>
                          </div>
                        </div>

                        {/* Realistic Phone Bezel */}
                        <img
                          src="/images/phone-mockup.webp"
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full pointer-events-none object-fill z-10"
                        />
                      </div>
                    </BlurRevealItem>
                  </div>
                </BlurRevealContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
