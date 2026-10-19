import { useState } from "react";
import { Star } from "lucide-react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap,
} from "framer-motion";

interface TestimonialItem {
  id: string;
  couple: string;
  location: string;
  quote: string;
}

const ROW_1_ITEMS: TestimonialItem[] = [
  {
    id: "r1-1",
    couple: "Dimas & Saraswati",
    location: "Jakarta • Okt 2026",
    quote:
      "Undangan digital Invitea sangat jelas dan rapi. Tamu-tamu kami banyak yang memuji betapa mudahnya mengisi RSVP dan membuka rute peta. Proses aktivasi domain nama kami berdua juga selesai dalam hitungan jam.",
  },
  {
    id: "r1-2",
    couple: "Aditya & Nabila",
    location: "Bandung • Sep 2026",
    quote:
      "Fitur proteksi anti-sebar dan auto-blast WhatsApp sangat membantu. Kami bisa mengirim tautan personal ke ratusan tamu tanpa cemas data resepsi bocor ke publik. Benar-benar memberi ketenangan.",
  },
  {
    id: "r1-3",
    couple: "Rian & Felicia",
    location: "Surabaya • Agu 2026",
    quote:
      "Tampilannya elegan dan cepat diakses walau dari jaringan ponsel keluarga di luar kota. Integrasi langsung dengan Wedding Planner membuat kontrol anggaran dan rekap buku tamu jadi sangat praktis.",
  },
  {
    id: "r1-4",
    couple: "Bagus & Anindita",
    location: "Yogyakarta • Jul 2026",
    quote:
      "Format undangannya modern tanpa mengurangi kesopanan adat keluarga kami. Fitur amplop digital dan ucapan doa langsung terdata rapi tanpa perlu rekap manual.",
  },
  {
    id: "r1-5",
    couple: "Farhan & Clarissa",
    location: "Tangerang • Jun 2026",
    quote:
      "Tamu lansia keluarga kami pun tidak kesulitan membuka undangannya. Tampilan bersih, navigasi rute ke venue akurat, dan audio lagu menyala lembut saat dibuka.",
  },
];

const ROW_2_ITEMS: TestimonialItem[] = [
  {
    id: "r2-1",
    couple: "Kevin & Jessica",
    location: "Medan • Mei 2026",
    quote:
      "Paket domain global .com berdua benar-benar jadi kenang-kenangan yang berharga. Sampai sekarang website undangannya masih sering kami buka bersama keluarga.",
  },
  {
    id: "r2-2",
    couple: "Rangga & Alika",
    location: "Semarang • Apr 2026",
    quote:
      "Kalkulator anggaran dan checklist vendor di Wedding Planner Invitea sangat menyelamatkan persiapan kami. Semua pengeluaran tercatat jelas dan tidak ada yang overbudget.",
  },
  {
    id: "r2-3",
    couple: "Gilang & Safira",
    location: "Bekasi • Mar 2026",
    quote:
      "Paling suka karena tidak ada watermark sama sekali di paket kami. Desainnya terasa sangat eksklusif dan privat untuk momen sekali seumur hidup.",
  },
  {
    id: "r2-4",
    couple: "Putra & Ni Made",
    location: "Bali • Feb 2026",
    quote:
      "Buku tamu otomatis dan konfirmasi kehadiran memudahkan pihak catering menghitung porsi dengan presisi. Sangat menghemat biaya resepsi kami di Bali.",
  },
  {
    id: "r2-5",
    couple: "Danang & Monica",
    location: "Malang • Jan 2026",
    quote:
      "Pelayanan dan asistensi teknisnya luar biasa sigap. Saat kami butuh penyesuaian rute maps mendadak H-2, perubahannya langsung terupdate seketika di tautan undangan.",
  },
];

interface ConveyorRowProps {
  items: TestimonialItem[];
  direction?: "left" | "right";
  baseSpeed?: number;
}

function ConveyorRow({
  items,
  direction = "left",
  baseSpeed = 2.8,
}: ConveyorRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const baseX = useMotionValue(direction === "left" ? 0 : -50);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });

  useAnimationFrame((_, delta) => {
    // Bound delta to avoid jumps on tab switch
    const dt = Math.min(delta, 64) / 1000;
    const velocity = smoothVelocity.get();

    // Speed multiplier scales smoothly when user scrolls
    const scrollBoost = 1 + Math.min(Math.abs(velocity) / 220, 3.8);
    const hoverFactor = isHovered ? 0.25 : 1;

    const moveBy =
      (direction === "left" ? -1 : 1) *
      baseSpeed *
      scrollBoost *
      hoverFactor *
      dt;

    baseX.set(baseX.get() + moveBy);
  });

  // Infinite wrapping between -50% and 0%
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  // Duplicate items twice for seamless 50% loop
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className="flex overflow-hidden select-none py-1 no-scrollbar outline-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex gap-4 sm:gap-6 shrink-0 will-change-transform no-scrollbar"
        style={{ x }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="w-[280px] sm:w-[360px] h-[210px] sm:h-[225px] shrink-0 rounded-2xl sm:rounded-3xl border border-header-border bg-bg p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-hairline hover:shadow-xs transition-all duration-200"
          >
            <div>
              {/* Top: 5-Star Rating (Pure Stars, No Badges) */}
              <div
                className="flex items-center gap-1 text-[#FAEB92] mb-3"
                aria-label="Rating 5 bintang"
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#FAEB92] text-[#FAEB92]"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Testimonial Quote */}
              <p className="font-serif text-[14px] sm:text-base text-ink leading-relaxed break-words line-clamp-4">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            {/* Bottom: Couple Info & Date (No Template Badge) */}
            <div className="pt-3 border-t border-hairline/60 flex items-center justify-between">
              <div>
                <h3 className="font-sans font-bold text-sm sm:text-base text-ink tracking-tight">
                  {item.couple}
                </h3>
                <p className="text-xs text-ink-soft mt-0.5">
                  {item.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="testimoni"
      className="scroll-mt-20 py-14 sm:py-20 md:py-24 w-full border-t border-hairline/60 bg-bg-alt/30 overflow-hidden"
    >
      {/* Section Header: Standardized font and size */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAEB92] text-black text-xs font-semibold tracking-wide font-sans mb-3 sm:mb-4 shadow-2xs">
          <span>Testimoni Pasangan</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink leading-tight">
          Cerita Bahagia Bersama Invitea
        </h2>
        <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl mx-auto text-balance">
          Kisah nyata dari pasangan yang telah mempercayakan hari bahagia mereka bersama Invitea.
        </p>
      </div>

      {/* 2-Row Infinite Conveyor with Scroll Velocity Acceleration & Smooth Fade Edges */}
      <div className="relative w-full space-y-4 sm:space-y-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] sm:[-webkit-mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        {/* Row 1: Moves Left */}
        <ConveyorRow items={ROW_1_ITEMS} direction="left" baseSpeed={2.8} />

        {/* Row 2: Moves Right */}
        <ConveyorRow items={ROW_2_ITEMS} direction="right" baseSpeed={2.8} />
      </div>
    </section>
  );
}
