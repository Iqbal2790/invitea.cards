interface StatItem {
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    value: "3.500+",
    label: "Pasangan Mempercayakan Undangan Mereka",
  },
  {
    value: "250.000+",
    label: "Tamu & RSVP Terkirim Tanpa Hambatan",
  },
  {
    value: "4.9 / 5.0",
    label: "Tingkat Kepuasan Pasangan Pengantin",
  },
  {
    value: "100%",
    label: "Pendampingan hingga Hari Pernikahan",
  },
];

export function SocialProofSection() {
  return (
    <section className="w-full border-y border-hairline/60 bg-bg-alt/50 py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center px-3"
            >
              <span className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-berry tracking-tight leading-none">
                {stat.value}
              </span>
              <p className="mt-3 text-xs sm:text-sm font-medium text-ink-soft max-w-[24ch] leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
