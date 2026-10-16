export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden antialiased flex flex-col justify-between"
      style={{
        backgroundColor: "#faf9f7",
      }}
    >
      {/* Background Wildflower Meadow Illustration (Hero-36 Signature) */}
      <div className="pointer-events-none absolute inset-0 z-0 will-change-transform select-none animate-hero-bg">
        <img
          src="/bg-hero-36.avif"
          alt="Wildflower meadow illustration"
          className="h-full w-full object-cover object-bottom"
        />
      </div>

      {/* Hero Content Stack */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-start px-4 sm:px-6 pt-6 sm:pt-8 md:pt-10 pb-12 text-center max-w-5xl mx-auto w-full">
        {/* Kicker Pill Badge */}
        <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[oklch(85%_0.03_25/0.8)] bg-white/85 backdrop-blur-xs text-xs font-medium text-ink-soft tracking-wide shadow-2xs will-change-transform animate-hero-badge">
          <span>Kini Hadir untuk Momen Spesialmu</span>
        </div>

        {/* Staggered Line-by-Line Serif Headline */}
        <h1 className="max-w-4xl font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] leading-[1.1] font-normal tracking-tight text-ink">
          <span className="block will-change-transform sm:whitespace-nowrap animate-hero-title-1">
            Sampaikan Kabar Bahagiamu
          </span>
          <span className="block will-change-transform italic font-serif text-berry mt-0.5 sm:mt-1 animate-hero-title-2">
            dengan Sepenuh Hati.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3.5 sm:mt-4.5 max-w-md sm:max-w-lg text-sm sm:text-base leading-relaxed text-ink-soft will-change-transform font-sans animate-hero-sub">
          Rayakan hari bahagiamu dengan undangan pernikahan digital yang indah dan bermakna. Setiap detail disiapkan untuk mengabadikan awal perjalanan cinta kalian berdua.
        </p>

        {/* Dual CTA Actions */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto will-change-transform animate-hero-cta">
          <a
            href="#katalog"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-berry px-8 sm:px-9 py-3 sm:py-3.5 text-sm font-medium text-cream-text shadow-md hover:bg-berry-deep transition-all duration-150 active:scale-[0.97]"
          >
            Lihat Katalog Undangan
          </a>
          <a
            href="https://create.invitea.cards"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-black bg-white/90 backdrop-blur-xs px-7 sm:px-8 py-3 sm:py-3.5 text-sm font-medium text-black hover:bg-white transition-all duration-150 active:scale-[0.97]"
          >
            Coba Template Instan
          </a>
        </div>
      </div>
    </section>
  );
}