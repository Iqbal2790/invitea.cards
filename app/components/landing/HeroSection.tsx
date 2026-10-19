export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen -mt-20 pt-20 w-full overflow-hidden antialiased flex flex-col justify-between bg-white dark:bg-black"
    >
      {/* Background Wildflower Meadow Illustration (Hero-36 Signature) */}
      <div className="pointer-events-none absolute inset-0 z-0 will-change-transform select-none animate-hero-bg">
        {/* Light Mode Hero Background */}
        <img
          src="/bg-hero-36.avif"
          alt="Wildflower meadow illustration"
          className="h-full w-full object-cover object-bottom dark:hidden"
        />
        {/* Dark Mode Hero Background (Dedicated) */}
        <img
          src="/bg-hero-36-dark.avif"
          alt="Wildflower meadow dark illustration"
          className="hidden h-full w-full object-cover object-bottom dark:block"
        />
      </div>

      {/* Hero Content Stack */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-start px-4 sm:px-6 pt-20 sm:pt-28 md:pt-36 pb-12 text-center max-w-5xl mx-auto w-full">
        {/* Headline Utama Bold Tanpa Italic */}
        <h1 className="max-w-6xl text-4xl sm:text-5xl md:text-6xl lg:text-[3.85rem] xl:text-[4.35rem] leading-[1.1] font-bold tracking-tight text-ink">
          <span className="block will-change-transform md:whitespace-nowrap animate-hero-title-1">
            Bikin undangan nikah digital sendiri.
          </span>
          <span className="block will-change-transform text-berry mt-0.5 sm:mt-1 animate-hero-title-2">
            Gratis, tanpa login.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 max-w-lg sm:max-w-xl text-base sm:text-lg leading-relaxed text-ink-soft dark:text-white/85 will-change-transform font-sans animate-hero-sub">
          Nggak perlu bisa desain, nggak perlu login buat mulai. Pilih template, isi datamu, sebar ke WhatsApp, lalu lanjut ke RSVP dan Wedding Planner kalau kamu butuh.
        </p>

        {/* Dual CTA Actions */}
        <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto will-change-transform animate-hero-cta">
          <a
            href="https://create.invitea.cards"
            target="_blank"
            rel="noopener noreferrer"
            data-ink-btn
            className="ink-btn w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#9929EA] dark:bg-[#FF5FCF] px-8 sm:px-9 py-3.5 text-sm sm:text-base font-medium text-white dark:text-black shadow-md active:scale-[0.97]"
          >
            <span>Mulai bikin undangan gratis</span>
          </a>
          <a
            href="https://plan.invitea.cards"
            target="_blank"
            rel="noopener noreferrer"
            data-ink-btn
            className="ink-btn w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-black/15 dark:border-white/35 bg-white dark:bg-black/50 backdrop-blur-md px-8 sm:px-9 py-3.5 text-sm sm:text-base font-medium text-black dark:text-white hover:border-black/35 dark:hover:border-white/60 dark:hover:bg-black/70 active:scale-[0.97] transition-all"
          >
            <span>Buka Wedding Planner</span>
          </a>
        </div>
      </div>
    </section>
  );
}