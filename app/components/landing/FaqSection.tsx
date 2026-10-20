import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Berapa lama proses pembuatan undangan digital?",
    answer:
      "Prosesnya sepenuhnya instan dan mandiri. Anda bisa memilih template, melengkapi informasi acara, dan membagikan tautan undangan dalam hitungan menit tanpa harus menunggu proses desain berhari-hari.",
  },
  {
    question: "Apakah benar-benar bisa dicoba secara gratis?",
    answer:
      "Ya, 100% gratis. Anda dapat langsung membuat undangan uji coba, melihat pratinjau live, dan menggunakan fitur Wedding Planner tanpa biaya apa pun di awal.",
  },
  {
    question: "Bisakah undangan menggunakan nama domain sendiri?",
    answer:
      "Tentu saja. Pada paket domain, tim Invitea menangani seluruh proses pendaftaran nama domain (seperti namakalian.com atau namakalian.my.id), konfigurasi server, hingga sertifikat keamanan SSL.",
  },
  {
    question: "Bagaimana cara membagikan undangan dengan nama tamu personal?",
    answer:
      "Invitea menyediakan generator tautan otomatis. Anda cukup memasukkan daftar nama tamu di dashboard, lalu membagikannya dengan satu klik langsung ke WhatsApp tamu bersangkutan dengan sapaan personal.",
  },
  {
    question: "Apakah data acara masih bisa diubah setelah undangan disebar?",
    answer:
      "Bisa kapan saja. Seluruh informasi teks seperti jadwal, rincian jam, hingga tautan lokasi dapat diperbarui secara mandiri melalui dashboard dan langsung terupdate otomatis di undangan tanpa mengubah tautan yang sudah dibagikan.",
  },
  {
    question: "Apakah ada batasan jumlah tamu yang bisa membuka undangan dan mengisi RSVP?",
    answer:
      "Tidak ada batasan. Seluruh tamu undangan Anda bebas mengakses link undangan dan mengirimkan konfirmasi kehadiran (RSVP) serta ucapan doa tanpa kuota maksimal.",
  },
  {
    question: "Metode pembayaran apa saja yang didukung?",
    answer:
      "Kami menerima pembayaran otomatis melalui QRIS (GoPay, OVO, Dana, ShopeePay, LinkAja) serta Transfer Virtual Account dari seluruh bank utama di Indonesia (BCA, Mandiri, BRI, BNI, Permata).",
  },
];

const springTransition = {
  type: "spring" as const,
  damping: 60,
  stiffness: 500,
  mass: 1,
};

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="scroll-mt-20 py-16 sm:py-24 md:py-28 w-full border-t border-hairline/60 bg-bg transition-colors"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAEB92] text-black text-xs font-semibold tracking-wide font-sans mb-3 sm:mb-4 shadow-2xs">
            <span>Tanya Jawab</span>
          </div>
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-ink leading-[1.15]">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl mx-auto text-balance font-sans">
            Semua hal penting yang perlu Anda ketahui tentang pembuatan undangan pernikahan digital dan wedding planner di Invitea.
          </p>
        </div>

        {/* Framer-Style Unified Accordion Capsule Container */}
        <LayoutGroup id="invitea-faq-accordion">
          <div className="w-full max-w-[800px] mx-auto p-1.5 rounded-[26px] bg-stone-200/50 dark:bg-neutral-950 border border-hairline/70 dark:border-white/10 flex flex-col gap-1 shadow-xs">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              const contentId = `faq-answer-${index}`;
              const buttonId = `faq-question-${index}`;

              return (
                <motion.div
                  key={item.question}
                  layout
                  transition={springTransition}
                  className={`w-full rounded-[22px] transition-colors duration-200 select-none overflow-hidden ${
                    isOpen
                      ? "bg-white dark:bg-neutral-900 border border-black/20 dark:border-white/25 shadow-xs"
                      : "bg-white/95 dark:bg-neutral-900/70 hover:bg-white dark:hover:bg-neutral-800 border border-hairline/40 dark:border-white/10 hover:border-hairline/70 dark:hover:border-white/20"
                  }`}
                >
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(index)}
                    className="group w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 rounded-[22px]"
                  >
                    <span
                      className={`font-sans text-base sm:text-lg leading-snug tracking-tight transition-colors duration-200 ${
                        isOpen
                          ? "text-black dark:text-white font-semibold"
                          : "text-ink group-hover:text-black dark:group-hover:text-white"
                      }`}
                    >
                      {item.question}
                    </span>

                    {/* Framer Plus/Minus Morphing Icon */}
                    <div
                      className={`relative w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                        isOpen
                          ? "bg-black dark:bg-white text-white dark:text-black"
                          : "bg-stone-100 dark:bg-neutral-800 text-ink-soft group-hover:bg-stone-200 dark:group-hover:bg-neutral-700 group-hover:text-ink dark:group-hover:text-white"
                      }`}
                      aria-hidden="true"
                    >
                      {/* Horizontal stroke: -90deg (closed) -> 90deg (opened) */}
                      <motion.span
                        className="absolute w-[1.5px] h-[12px] bg-current rounded-full"
                        initial={false}
                        animate={{ rotate: isOpen ? 90 : -90 }}
                        transition={springTransition}
                      />
                      {/* Vertical stroke: -180deg (closed) -> 90deg (opened) */}
                      <motion.span
                        className="absolute w-[1.5px] h-[12px] bg-current rounded-full"
                        initial={false}
                        animate={{ rotate: isOpen ? 90 : -180 }}
                        transition={springTransition}
                      />
                    </div>
                  </button>

                  {/* Framer-Motion Spring Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={springTransition}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-sm sm:text-base text-ink-soft dark:text-neutral-300 leading-relaxed font-sans">
                          <p>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </LayoutGroup>

        {/* WhatsApp Help Prompt */}
        <div className="mt-10 sm:mt-12 p-6 rounded-2xl border border-hairline/80 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-sans font-semibold text-base text-ink">
              Masih punya pertanyaan seputar pernikahan Anda?
            </h3>
            <p className="text-sm text-ink-soft mt-0.5 font-sans">
              Tim kami siap membantu menjawab dan mendampingi persiapan undangan Anda.
            </p>
          </div>
          <a
            href="https://wa.me/6282255667944?text=Halo%20Invitea%2C%20saya%20ingin%20tanya%20seputar%20undangan%20pernikahan."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-sans font-semibold text-sm bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-150 active:scale-95 shrink-0 shadow-xs"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Tanya via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
