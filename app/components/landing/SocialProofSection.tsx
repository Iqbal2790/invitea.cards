interface StatItem {
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    value: "3.500+",
    label: "Pasangan Mempercayakan Undangan Pernikahan",
  },
  {
    value: "250.000+",
    label: "Tamu & RSVP Terkirim Tanpa Hambatan",
  },
  {
    value: "4.9 / 5.0",
    label: "Rating Kepuasan dari Ulasan Pasangan",
  },
  {
    value: "100%",
    label: "Pendampingan Ramah hingga Hari Bahagia",
  },
];

export function SocialProofSection() {
  return (
    <section className="w-full border-y border-[oklch(38%_0.14_15)]/15 bg-[oklch(94%_0.025_45/0.45)] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Eyebrow Label */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-berry/90 font-medium">
            Dipercaya oleh Ribuan Pasangan di Seluruh Indonesia
          </p>
        </div>

        {/* 4-Column Stat Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-2 sm:gap-x-6">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center px-2 sm:px-4 ${
                idx % 2 === 0 ? "border-r border-[oklch(38%_0.14_15)]/12 lg:border-r" : "lg:border-r"
              } ${idx === STATS.length - 1 ? "lg:border-r-0" : ""}`}
            >
              <span className="font-serif text-3xl sm:text-4xl lg:text-[2.85rem] font-semibold text-berry tracking-tight leading-none">
                {stat.value}
              </span>
              <p className="mt-3 text-xs sm:text-sm font-medium text-ink-soft max-w-[22ch] leading-relaxed [text-wrap:balance]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
