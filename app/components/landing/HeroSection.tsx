export function HeroSection() {
  return (
    <section id="hero" className="relative w-full pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Copywriting & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[oklch(85%_0.03_25/0.8)] bg-[oklch(92%_0.02_75/0.4)] text-xs font-medium text-ink-soft mb-6 tracking-wide">
              Kini Hadir untuk Momen Spesialmu
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-ink font-medium">
              Sampaikan Kabar Bahagiamu dengan{" "}
              <em className="italic font-serif">Sepenuh Hati.</em>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-ink-soft max-w-xl leading-relaxed">
              Rayakan hari bahagiamu dengan undangan pernikahan digital yang indah dan bermakna. Setiap detail disiapkan untuk mengabadikan awal perjalanan cinta kalian berdua.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                href="#katalog"
                className="inline-flex items-center justify-center bg-berry text-cream-text hover:bg-berry-deep rounded-full px-7 py-3 text-sm font-medium transition-all"
              >
                Lihat Katalog Undangan
              </a>

              <a
                href="https://create.invitea.cards"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-black text-black hover:bg-black/5 rounded-full px-7 py-3 text-sm font-medium transition-all"
              >
                Coba Template Instan
              </a>
            </div>
          </div>

          {/* Right Column: Modern High-End Hero Visual */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px]">
              {/* Modern High-Resolution Portrait Photo */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[oklch(85%_0.03_25/0.8)] shadow-2xl shadow-ink/10 bg-[oklch(91%_0.035_25)]">
                <img
                  src="/hero-wedding.jpg"
                  alt="Undangan pernikahan digital Invitea"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Floating Minimalist Glass Badge */}
              <div className="absolute -bottom-5 sm:-bottom-6 -left-3 sm:-left-6 backdrop-blur-md bg-white/90 border border-[oklch(85%_0.03_25/0.8)] rounded-2xl p-4 sm:p-5 shadow-xl shadow-ink/10 max-w-[280px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span className="text-[11px] font-medium tracking-wider uppercase text-ink-soft">
                    RSVP Online Aktif
                  </span>
                </div>
                <div className="font-serif text-lg font-medium text-ink leading-tight">
                  Pranaditya &amp; Amanda
                </div>
                <div className="text-xs text-ink-soft mt-1">
                  12 Desember 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
