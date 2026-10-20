import { X, Check } from "lucide-react";

interface ComparisonItem {
  id: string;
  title: string;
  before: {
    tag: string;
    text: string;
  };
  after: {
    tag: string;
    text: string;
  };
}

const COMPARISON_ITEMS: ComparisonItem[] = [
  {
    id: "typo",
    title: "Salah Ketik & Perubahan Data",
    before: {
      tag: "Cara lama",
      text: "Ada salah ketik nama atau perubahan jam acara, harus antre chat vendor dan tunggu berjam-jam untuk revisi.",
    },
    after: {
      tag: "Di Invitea",
      text: "Buka editor, edit sendiri, langsung ter-update detik itu juga tanpa perlu nunggu siapa pun.",
    },
  },
  {
    id: "trial",
    title: "Coba Desain & Bikin Undangan",
    before: {
      tag: "Cara lama",
      text: "Mau lihat jadinya saja wajib registrasi akun, verifikasi nomor HP, atau bayar DP di awal.",
    },
    after: {
      tag: "Di Invitea",
      text: "Bebas pilih template dan isi data tanpa login. Puas lihat jadinya, baru putuskan lanjut.",
    },
  },
  {
    id: "rsvp",
    title: "Rekap Tamu & RSVP Katering",
    before: {
      tag: "Cara lama",
      text: "Konfirmasi kehadiran tercecer di chat WhatsApp dan spreadsheet manual. Rawan salah hitung porsi.",
    },
    after: {
      tag: "Di Invitea",
      text: "Tamu konfirmasi langsung di undangan, jumlah kehadiran dan ucapan otomatis terekap rapi di Wedding Planner.",
    },
  },
  {
    id: "personalization",
    title: "Sebar Undangan Personal",
    before: {
      tag: "Cara lama",
      text: "Ketik dan ganti nama tamu satu per satu secara manual di pesan broadcast, rawan salah nama atau salah kirim.",
    },
    after: {
      tag: "Di Invitea",
      text: "Generator nama tamu otomatis, satu klik langsung kirim link personal ke WhatsApp masing-masing.",
    },
  },
];

export function ComparisonSection() {
  return (
    <section
      id="perbandingan"
      className="scroll-mt-20 py-12 sm:py-16 md:py-20 w-full"
    >
      {/* Anchor alias */}
      <div id="skenario" className="sr-only" aria-hidden="true" />

      {/* Section Header: Aligned with Section 2 & 3 Margin (1580px max-w, px-4 sm:px-6) */}
      <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-6 mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight leading-[1.15]">
          Bikin undangan nggak harus seribet itu.
        </h2>
      </div>

      {/* Comparison Grid: 2x2 on desktop, 1 col on mobile */}
      <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {COMPARISON_ITEMS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xs p-5 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-black/20 dark:hover:border-white/20 transition-colors"
            >
              {/* Card Title */}
              <h3 className="text-lg sm:text-xl font-bold text-ink tracking-tight mb-4 sm:mb-5">
                {item.title}
              </h3>

              {/* Juxtaposed Comparison Sub-cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1">
                {/* Sebelum / Cara Lama */}
                <div className="rounded-xl p-4 bg-stone-100/70 dark:bg-neutral-950/70 border border-black/5 dark:border-white/5 flex flex-col">
                  <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    <X
                      className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item.before.tag}</span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans flex-1">
                    {item.before.text}
                  </p>
                </div>

                {/* Sesudah / Di Invitea */}
                <div className="rounded-xl p-4 bg-white dark:bg-neutral-950 border border-black/15 dark:border-white/20 shadow-2xs flex flex-col">
                  <div className="flex items-center gap-1.5 text-black dark:text-white text-xs font-bold uppercase tracking-wider mb-2">
                    <Check
                      className="w-3.5 h-3.5 text-[#9929EA] dark:text-[#FF5FCF] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item.after.tag}</span>
                  </div>
                  <p className="text-sm text-black dark:text-white font-medium leading-relaxed font-sans flex-1">
                    {item.after.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
