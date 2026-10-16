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

export function ServicesSection() {
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
        {/* Section Header: Full Width matching Navbar & Footer (no margin) */}
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

        {/* Services Showcase Cards */}
        <div className="flex flex-col gap-10 sm:gap-12 lg:gap-14">
          {/* Card 1: Wedding Planner */}
          <div className="w-full rounded-3xl border border-header-border bg-bg-alt/25 p-6 sm:p-8 md:p-10 lg:p-12 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Copy & Sub-features */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-soft text-berry border border-pink-line/70 mb-4">
                    Gratis Digunakan
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-ink tracking-tight">
                    Wedding Planner
                  </h3>

                  <p className="mt-3 sm:mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
                    Checklist, anggaran, vendor, jadwal, dan hari-H. Kelola seluruh
                    persiapan pernikahan dengan rapi dalam satu tempat tanpa
                    spreadsheet manual.
                  </p>

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
                </div>

                {/* Sub-features 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-8 sm:mt-10 pt-8 border-t border-hairline/60">
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
                </div>
              </div>

              {/* Right Column: Planner UI Mockup */}
              <div className="lg:col-span-5 flex justify-center mt-6 lg:mt-0">
                <div className="w-full max-w-md rounded-2xl border border-header-border bg-bg p-5 sm:p-6 shadow-sm flex flex-col gap-5">
                  {/* Mockup Header */}
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

                  {/* Budget Widget */}
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

                  {/* Checklist Widget */}
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

                  {/* Vendor Status Pill */}
                  <div className="flex items-center justify-between pt-3 border-t border-hairline/60 text-xs">
                    <span className="text-ink-soft">Vendor Deal: 6 dari 8</span>
                    <span className="text-berry font-semibold">Terkontrol</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Undangan Digital */}
          <div className="w-full rounded-3xl border border-header-border bg-bg-alt/25 p-6 sm:p-8 md:p-10 lg:p-12 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Copy & Sub-features */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-soft text-berry border border-pink-line/70 mb-4">
                    Coba Gratis
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-ink tracking-tight">
                    Undangan Digital
                  </h3>

                  <p className="mt-3 sm:mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
                    Website undangan pernikahan berdomain nama sendiri. Bagikan
                    momen berharga dengan RSVP otomatis, rute peta presisi, dan buku
                    ucapan doa dalam tampilan mobile yang ringan dan responsif.
                  </p>

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
                </div>

                {/* Sub-features 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-8 sm:mt-10 pt-8 border-t border-hairline/60">
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
                </div>
              </div>

              {/* Right Column: Invitation Phone Mockup */}
              <div className="lg:col-span-5 flex justify-center mt-6 lg:mt-0">
                <div className="relative w-[230px] sm:w-[250px] aspect-[9/18.5] select-none">
                  {/* Screen Content Wrapper matching Showcase bezel curve */}
                  <div className="absolute top-[1.2%] bottom-[1.2%] left-[3.5%] right-[3.5%] rounded-[32px] sm:rounded-[36px] overflow-hidden bg-stone-900 shadow-xl">
                    <img
                      src="/thumbnails/wedding-portrait.jpg"
                      alt="Pratinjau Undangan Digital"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35" />

                    {/* Top Tag: Domain (placed below Dynamic Island hardware cutout) */}
                    <div className="absolute top-9 inset-x-4 flex justify-center z-10">
                      <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] text-white/90 font-medium">
                        invitea.cards/sarah-dimas
                      </div>
                    </div>

                    {/* Bottom Card: Invitation Details (no artificial 'The Wedding of' overlay) */}
                    <div className="absolute bottom-4 inset-x-3 p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 text-white flex flex-col gap-2">
                      <div className="text-center">
                        <h5 className="font-serif text-xl font-medium tracking-tight text-white leading-tight">
                          Sarah &amp; Dimas
                        </h5>
                        <p className="text-[10px] text-white/70 mt-1">
                          Sabtu, 14 November 2026
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/15 text-center">
                        <span className="text-[9px] text-white/60 block">
                          Kepada Yth. Tamu Undangan
                        </span>
                        <div className="mt-1.5 py-1.5 px-3 rounded-full bg-white text-ink text-[11px] font-semibold">
                          Buka Undangan
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Realistic Phone Bezel Mockup Frame */}
                  <img
                    src="/images/phone-mockup.webp"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full pointer-events-none object-fill z-10 drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
