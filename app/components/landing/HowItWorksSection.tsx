interface StepItem {
  number: string;
  title: string;
  description: string;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Pilih Desain",
    description:
      "Temukan tema undangan menawan dari katalog yang paling selaras dengan nuansa dan karakter perayaan kalian.",
  },
  {
    number: "02",
    title: "Isi Data Acara",
    description:
      "Lengkapi detail kedua mempelai, jadwal akad dan resepsi, panduan peta lokasi digital, serta galeri foto pre-wedding.",
  },
  {
    number: "03",
    title: "Aktivasi Kilat",
    description:
      "Konfirmasi pembuatan undangan dengan proses instan untuk menerbitkan website undangan berdomain rapi.",
  },
  {
    number: "04",
    title: "Bagikan ke Kerabat",
    description:
      "Kirimkan tautan undangan personal langsung kepada para tamu terkasih melalui pesan WhatsApp dan media sosial.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="scroll-mt-20 py-20 md:py-28 w-full border-t border-hairline/60 bg-bg-alt/30">
      <div id="panduan" className="sr-only" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-14 md:mb-18">
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-berry block mb-2 font-mono">
            Cara Kerja
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink leading-tight">
            Sesederhana Itu
          </h2>
          <p className="mt-4 text-base text-ink-soft leading-relaxed">
            Tidak perlu keahlian teknis. Hanya dengan 4 langkah mudah, undangan indah Anda siap dibagikan ke seluruh tamu undangan.
          </p>
        </div>

        {/* Steps List */}
        <div className="flex flex-col">
          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              className={`grid grid-cols-[64px_1fr] sm:grid-cols-[96px_1fr] md:grid-cols-[120px_1fr] gap-4 sm:gap-8 lg:gap-12 py-8 sm:py-10 border-t border-hairline/60 items-start ${
                idx === STEPS.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-berry/80 font-medium leading-none select-none">
                {step.number}
              </span>
              <div>
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-ink-soft max-w-[56ch] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
