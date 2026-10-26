import {
  ArrowRight,
  Check,
  CircleAlert,
  CircleCheck,
  Minus,
} from "lucide-react";

const BEFORE = [
  "Typo nama orang tua atau gelar, harus antre chat dan tunggu berjam-jam untuk revisi vendor",
  "Mau lihat preview jadinya saja wajib registrasi akun, isi formulir, atau transfer DP di muka",
  "Konfirmasi kehadiran tercecer di chat WhatsApp dan spreadsheet manual, rawan salah porsi katering",
  "Salin-tempel dan ganti nama tamu satu per satu secara manual, rawan salah sapa tamu penting",
] as const;

const AFTER = [
  "Buka editor dari HP, ralat sendiri dalam hitungan detik, langsung live tanpa nunggu siapa pun",
  "Bebas pilih template dan isi detail acaramu tanpa login. Puas dengan hasilnya, baru lanjut",
  "Tamu konfirmasi di undangan, data RSVP dan ucapan otomatis terekap rapi di Wedding Planner",
  "Generator link personal otomatis per tamu, satu klik langsung siap kirim ke WhatsApp",
] as const;

const OUTCOMES = [
  { value: "10 detik", label: "revisi mandiri langsung live" },
  { value: "0 login", label: "bebas coba template tanpa akun" },
  { value: "1 klik", label: "generator link personal WhatsApp" },
] as const;

export function ComparisonSection() {
  return (
    <section
      id="perbandingan"
      className="scroll-mt-20 py-16 sm:py-20 lg:py-24 w-full bg-transparent"
      aria-labelledby="comparison-heading"
    >
      {/* Anchor alias */}
      <div id="skenario" className="sr-only" aria-hidden="true" />

      <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-6">
        {/* Section Header: Aligned with Section 2 & 3 Margin, bold Google Sans, no subtitle */}
        <div className="max-w-3xl mb-8 sm:mb-10 lg:mb-12">
          <h2
            id="comparison-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight leading-[1.15]"
          >
            Bikin undangan nggak harus seribet itu.
          </h2>
        </div>

        {/* Juxtaposed Comparison Grid (Hirael Comparison 03 Pattern) */}
        <div className="grid gap-px overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-black/10 dark:bg-white/10 md:grid-cols-2 shadow-2xs">
          {/* Sisi Kiri: Cara Lama / Vendor Konvensional */}
          <div className="bg-white/90 dark:bg-neutral-950 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <CircleAlert
                  aria-hidden="true"
                  className="w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0"
                />
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-600 dark:text-neutral-400">
                  Cara lama / Vendor konvensional
                </h3>
              </div>
              <ul className="flex flex-col gap-4 sm:gap-5">
                {BEFORE.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans"
                  >
                    <Minus
                      aria-hidden="true"
                      className="mt-1 w-4 h-4 shrink-0 text-neutral-400 dark:text-neutral-500"
                    />
                    <span className="line-through decoration-neutral-400/60 dark:decoration-neutral-500/60">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sisi Kanan: Bikin di Invitea */}
          <div className="bg-stone-50/70 dark:bg-neutral-900/70 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <CircleCheck
                  aria-hidden="true"
                  className="w-4 h-4 text-[#DE7272] dark:text-[#FFCED8] shrink-0"
                />
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-black dark:text-white">
                  Bikin di Invitea
                </h3>
              </div>
              <ul className="flex flex-col gap-4 sm:gap-5">
                {AFTER.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm sm:text-base text-black dark:text-white font-medium leading-relaxed font-sans"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-1 w-4 h-4 shrink-0 text-[#DE7272] dark:text-[#FFCED8]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Outcomes & CTA Row */}
        <div className="mt-8 sm:mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <dl className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {OUTCOMES.map((outcome) => (
              <div key={outcome.value} className="flex items-baseline gap-2">
                <dt className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-sans">
                  {outcome.label}
                </dt>
                <dd className="order-first text-sm sm:text-base font-bold tracking-tight text-black dark:text-white">
                  {outcome.value}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="https://create.invitea.cards"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-black dark:bg-white px-6 py-3 text-sm font-medium text-white dark:text-black shadow-xs hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all cursor-pointer active:scale-[0.98]"
          >
            <span>Mulai buat undangan</span>
            <ArrowRight
              aria-hidden="true"
              className="w-3.5 h-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
