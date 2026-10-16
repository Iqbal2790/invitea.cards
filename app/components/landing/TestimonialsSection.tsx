import { Star } from "lucide-react";

interface TestimonialItem {
  id: string;
  couple: string;
  location: string;
  quote: string;
  theme: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "testi-1",
    couple: "Dimas & Saraswati",
    location: "Jakarta",
    theme: "Folio Bloom",
    quote:
      "Undangan digital Invitea sangat jelas dan rapi. Tamu-tamu kami banyak yang memuji betapa mudahnya mengisi RSVP dan membuka peta lokasi. Tim Invitea juga sangat sabar mendampingi kami sampai hari H.",
  },
  {
    id: "testi-2",
    couple: "Aditya & Nabila",
    location: "Bandung",
    theme: "Vintage Chronicle",
    quote:
      "Tampilannya hangat dan tidak pasaran. Fitur integrasi ke WhatsApp memudahkan kami mengirim undangan ke ratusan keluarga besar dalam satu sore saja tanpa ada yang terlewat.",
  },
  {
    id: "testi-3",
    couple: "Rian & Felicia",
    location: "Surabaya",
    theme: "Memory Lane",
    quote:
      "Desainnya anggun dan cepat diakses walau dari jaringan ponsel keluarga di luar kota. Tidak ada kendala loading sama sekali. Sangat bersyukur memilih Invitea untuk hari terpenting kami.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimoni" className="scroll-mt-20 py-20 md:py-28 w-full border-t border-hairline/60 bg-bg-alt/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 md:mb-18">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-berry mb-3">
            Testimoni Nyata
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink leading-[1.12]">
            Cerita Bahagia Bersama Invitea
          </h2>
          <p className="mt-4 text-base text-ink-soft leading-relaxed max-w-xl mx-auto text-balance">
            Menjadi bagian dari ribuan awal perjalanan cinta pasangan pengantin adalah kehormatan bagi kami.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-7 sm:p-8 rounded-2xl border border-[oklch(85%_0.03_25/0.8)] bg-white/70 backdrop-blur-xs flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Star rating strip */}
                <div className="flex items-center gap-1 text-berry mb-4" aria-label="Rating 5 bintang">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-berry text-berry"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <p className="font-serif text-base sm:text-lg text-ink leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-hairline/50 flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-semibold text-sm sm:text-base text-ink">
                    {item.couple}
                  </h3>
                  <p className="text-xs text-ink-soft">
                    {item.location}
                  </p>
                </div>
                <span className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-pink-soft text-berry">
                  {item.theme}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
