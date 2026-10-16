import {
  Users,
  CalendarHeart,
  Smartphone,
  Globe2,
  MapPin,
  MessageSquareHeart,
} from "lucide-react";

interface FeatureItem {
  icon: typeof Users;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: Users,
    title: "RSVP & Manajemen Tamu Real-Time",
    description:
      "Rekap konfirmasi kehadiran tamu secara otomatis tanpa pencatatan manual. Ketahui jumlah porsi dan kehadiran dengan data terpusat.",
  },
  {
    icon: CalendarHeart,
    title: "Wedding Planner Terpadu",
    description:
      "Terhubung langsung dengan ekosistem aplikasi perencana pernikahan kami untuk memantau susunan jadwal hari H dan rincian persiapan.",
  },
  {
    icon: Smartphone,
    title: "Tampilan Mobile-First Sempurna",
    description:
      "Dioptimalkan untuk kecepatan buka kilat di semua ponsel tamu, ringan dimuat, serta nyaman dibaca di layar sentuh.",
  },
  {
    icon: Globe2,
    title: "Domain Nama Pengantin Sendiri",
    description:
      "Gunakan alamat tautan eksklusif beratasnamakan kalian berdua untuk memberikan kesan personal sejak tautan pertama diklik.",
  },
  {
    icon: MapPin,
    title: "Peta & Penunjuk Arah Presisi",
    description:
      "Integrasi navigasi langsung ke Google Maps dan Waze memastikan seluruh kerabat tiba di lokasi akad dan resepsi tanpa kebingungan.",
  },
  {
    icon: MessageSquareHeart,
    title: "Buku Tamu & Ucapan Doa Digital",
    description:
      "Wadah interaktif bagi sahabat dan keluarga untuk menitipkan ucapan selamat dan doa restu yang tersimpan abadi.",
  },
];

export function ValueSection() {
  return (
    <section id="ekosistem" className="scroll-mt-20 py-20 md:py-28 w-full">
      <div id="fitur" className="sr-only" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-14 md:mb-18">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-berry mb-3">
            Keunggulan &amp; Fitur
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink leading-[1.12]">
            Didesain untuk Ketenangan Pasangan &amp; Kenyamanan Tamu
          </h2>
          <p className="mt-4 text-base text-ink-soft leading-relaxed">
            Fondasi teknologi andal di balik setiap undangan, dirancang agar Anda bisa fokus merayakan hari bahagia tanpa rasa cemas.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-7 sm:p-8 rounded-2xl border border-header-border bg-bg-alt/25 flex flex-col justify-between hover:border-berry/40 transition-colors duration-200"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-pink-soft flex items-center justify-center text-berry mb-6">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif font-semibold text-xl text-ink">
                    {feat.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
