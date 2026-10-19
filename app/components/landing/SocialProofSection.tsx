import { useEffect, useRef, useState } from "react";

interface StatItem {
  target: number;
  format: (value: number) => string;
  label: string;
}

const STATS: StatItem[] = [
  {
    target: 3500,
    format: (v) => `${Math.round(v).toLocaleString("id-ID")}+`,
    label: "Pasangan Mempercayakan Undangan Pernikahan",
  },
  {
    target: 250000,
    format: (v) => `${Math.round(v).toLocaleString("id-ID")}+`,
    label: "Tamu & RSVP Terkirim Tanpa Hambatan",
  },
  {
    target: 4.9,
    format: (v) => `${v.toFixed(1)} / 5.0`,
    label: "Rating Kepuasan dari Ulasan Pasangan",
  },
  {
    target: 100,
    format: (v) => `${Math.round(v)}%`,
    label: "Bantuan Ramah hingga Undangan Siap Sebar",
  },
];

export function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const duration = 1800;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic: 1 - (1 - t)^3
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCounts(STATS.map((s) => s.target * easeProgress));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(STATS.map((s) => s.target));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full border-y border-black/8 dark:border-white/10 bg-white dark:bg-black py-12 sm:py-16"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Eyebrow Label */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-black/60 dark:text-white/60 font-medium">
            Dipercaya oleh Ribuan Pasangan di Seluruh Indonesia
          </p>
        </div>

        {/* 4-Column Stat Strip with Scroll Counting */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-2 sm:gap-x-6">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center px-2 sm:px-4 ${
                idx % 2 === 0
                  ? "border-r border-black/8 dark:border-white/10 lg:border-r"
                  : "lg:border-r dark:border-white/10"
              } ${idx === STATS.length - 1 ? "lg:border-r-0" : ""}`}
            >
              <span className="font-sans font-bold tabular-nums text-3xl sm:text-4xl lg:text-[2.75rem] text-black dark:text-white tracking-tight leading-none">
                {stat.format(counts[idx])}
              </span>
              <p className="mt-3 text-xs sm:text-sm font-medium text-black/65 dark:text-white/70 max-w-[22ch] leading-relaxed [text-wrap:balance]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
