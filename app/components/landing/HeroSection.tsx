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
        {/* Eyebrow / Kicker */}
        <p className="text-xs sm:text-sm font-medium tracking-wide text-ink/75 font-sans mb-3 sm:mb-4 will-change-transform animate-hero-badge">
          Undangan nikah digital · Mulai gratis
        </p>

        {/* Staggered Line-by-Line Serif Headline */}
        <h1 className="max-w-4xl font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4.25rem] leading-[1.12] font-normal tracking-tight text-ink">
          <span className="block will-change-transform animate-hero-title-1">
            Bikin undangan nikah digital sendiri.
          </span>
          <span className="block will-change-transform italic font-serif text-berry mt-0.5 sm:mt-1 animate-hero-title-2">
            Gratis, tanpa login.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 max-w-lg sm:max-w-xl text-base sm:text-lg leading-relaxed text-ink-soft will-change-transform font-sans animate-hero-sub">
          Nggak perlu bisa desain, nggak perlu login buat mulai. Pilih template, isi datamu, sebar ke WhatsApp, lalu lanjut ke RSVP dan Wedding Planner kalau kamu butuh.
        </p>

        {/* Dual CTA Actions */}
        <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto will-change-transform animate-hero-cta">
          <a
            href="https://create.invitea.cards"
            target="_blank"
            rel="noopener noreferrer"
            data-ink-btn
            style={{
              "--ink-bg": "var(--color-ink)",
              "--ink-text": "var(--color-cream-text)",
            } as React.CSSProperties}
            className="ink-btn w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-berry px-8 sm:px-9 py-3.5 text-sm sm:text-base font-medium text-cream-text shadow-md active:scale-[0.97]"
          >
            <span>Mulai bikin undangan gratis</span>
          </a>
          <a
            href="#katalog"
            data-ink-btn
            style={{
              "--ink-bg": "var(--color-berry)",
              "--ink-text": "var(--color-cream-text)",
              "--ink-border": "var(--color-berry)",
            } as React.CSSProperties}
            className="ink-btn w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-black/20 bg-white/90 backdrop-blur-xs px-8 sm:px-9 py-3.5 text-sm sm:text-base font-medium text-ink hover:border-black/40 active:scale-[0.97]"
          >
            <span>Lihat contoh undangan</span>
          </a>
        </div>
      </div>
    </section>
  );
}