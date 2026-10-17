import { Star, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "~/components/ui/ScrollReveal";

interface TestimonialItem {
  id: string;
  couple: string;
  location: string;
  theme: string;
  plan: string;
  quote: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "testi-1",
    couple: "Dimas & Saraswati",
    location: "Jakarta • Okt 2026",
    theme: "Folio Bloom",
    plan: "Paket Plus",
    quote:
      "Undangan digital Invitea sangat jelas dan rapi. Tamu-tamu kami banyak yang memuji betapa mudahnya mengisi RSVP dan membuka rute peta. Proses aktivasi domain nama kami berdua juga selesai dalam hitungan jam.",
  },
  {
    id: "testi-2",
    couple: "Aditya & Nabila",
    location: "Bandung • Sep 2026",
    theme: "Vintage Chronicle",
    plan: "Paket Pro",
    quote:
      "Fitur proteksi anti-sebar dan auto-blast WhatsApp sangat membantu. Kami bisa mengirim tautan personal ke ratusan tamu tanpa cemas data resepsi bocor ke publik. Benar-benar memberi ketenangan.",
  },
  {
    id: "testi-3",
    couple: "Rian & Felicia",
    location: "Surabaya • Agu 2026",
    theme: "Memory Lane",
    plan: "Paket Plus",
    quote:
      "Tampilannya elegan dan cepat diakses walau dari jaringan ponsel keluarga di luar kota. Integrasi langsung dengan Wedding Planner membuat kontrol anggaran dan rekap buku tamu jadi sangat praktis.",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimoni"
      className="scroll-mt-20 py-16 sm:py-20 md:py-24 w-full border-t border-hairline/60 bg-bg-alt/30"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-berry block mb-2 font-mono">
            Testimoni Pasangan
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink leading-tight">
            Cerita Bahagia Bersama Invitea
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl mx-auto text-balance">
            Menjadi bagian dari ribuan awal perjalanan cinta pasangan pengantin di seluruh Indonesia.
          </p>
        </div>

        {/* Testimonials Grid with Staggered ScrollReveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {TESTIMONIALS.map((item, index) => (
            <ScrollReveal
              key={item.id}
              transition={{ delay: index * 0.12, duration: 0.5, ease: "easeOut" }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              viewOptions={{ amount: 0.2 }}
              className="h-full"
              once
            >
              <div className="h-full rounded-3xl border border-header-border bg-bg p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-hairline transition-all duration-200">
                <div>
                  {/* Top: Star rating & Verified badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="flex items-center gap-1 text-berry"
                      aria-label="Rating 5 bintang"
                    >
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-berry text-berry"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-ink-soft bg-bg-alt px-2 py-0.5 rounded-full border border-header-border uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3 text-berry" aria-hidden="true" />
                      <span>Terverifikasi</span>
                    </span>
                  </div>

                  {/* Quote text */}
                  <p className="font-serif text-base sm:text-lg text-ink leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Footer: Couple info & Plan tag */}
                <div className="mt-8 pt-5 border-t border-hairline/60 flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className="font-sans font-bold text-sm sm:text-base text-ink tracking-tight">
                      {item.couple}
                    </h3>
                    <p className="text-xs text-ink-soft mt-0.5">
                      {item.location}
                    </p>
                  </div>
                  <span className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-pink-soft text-berry border border-berry/10 shrink-0">
                    {item.theme}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
