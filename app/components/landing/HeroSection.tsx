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
      <div className="relative z-10 flex flex-1 flex-col items-center justify-start px-4 sm:px-6 pt-8 sm:pt-10 md:pt-12 pb-12 text-center max-w-5xl mx-auto w-full">
        {/* Staggered Line-by-Line Serif Headline */}
        <h1 className="max-w-5xl font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[5.75rem] leading-[1.06] font-normal tracking-tight text-ink">
          <span className="block will-change-transform sm:whitespace-nowrap animate-hero-title-1">
            Sampaikan Kabar Bahagiamu
          </span>
          <span className="block will-change-transform italic font-serif text-berry mt-0.5 sm:mt-1 animate-hero-title-2">
            dengan Sepenuh Hati.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 max-w-lg sm:max-w-xl text-base sm:text-lg leading-relaxed text-ink-soft will-change-transform font-sans animate-hero-sub">
          Rayakan hari bahagiamu dengan undangan pernikahan digital yang indah dan bermakna. Setiap detail disiapkan untuk mengabadikan awal perjalanan cinta kalian berdua.
        </p>

        {/* Dual CTA Actions - Layanan Gratis */}
        <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto will-change-transform animate-hero-cta">
          <a
            href="https://create.invitea.cards"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-berry px-8 sm:px-9 py-3.5 text-sm sm:text-base font-medium text-cream-text shadow-md hover:bg-berry-deep transition-all duration-150 active:scale-[0.97]"
          >
            Mulai Buat Undangan Gratis
          </a>
          <a
            href="https://plan.invitea.cards"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-black bg-white/90 backdrop-blur-xs px-8 sm:px-9 py-3.5 text-sm sm:text-base font-medium text-black hover:bg-white transition-all duration-150 active:scale-[0.97]"
          >
            Akses Wedding Planner Gratis
          </a>
        </div>
      </div>
    </section>
  );
}