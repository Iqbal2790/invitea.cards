"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Berapa lama proses pembuatan undangan digital?",
    answer: "Prosesnya sepenuhnya instan! Setelah Anda memilih desain, mengisi detail acara, dan menyelesaikan pembayaran, tautan undangan Anda akan langsung aktif dan siap dibagikan detik itu juga."
  },
  {
    question: "Apakah ada batasan jumlah tamu yang bisa menerima undangan?",
    answer: "Tidak ada batasan sama sekali. Anda bebas menyebarkan tautan undangan digital Anda ke sebanyak mungkin keluarga, kerabat, dan teman tanpa dikenakan biaya tambahan."
  },
  {
    question: "Apakah saya bisa mengubah detail acara atau salah ketik setelah membayar?",
    answer: "Mohon maaf, saat ini sistem kami tidak menyediakan opsi revisi setelah pembayaran berhasil dilakukan. Oleh karena itu, kami sangat menyarankan Anda untuk mengecek kembali semua detail acara (nama, waktu, lokasi, dsb) sebelum mengaktifkan undangan."
  },
  {
    question: "Metode pembayaran apa saja yang bisa digunakan?",
    answer: "Kami menerima berbagai metode pembayaran demi kenyamanan Anda, termasuk QRIS, Transfer Bank (Virtual Account BCA, Mandiri, BNI, BRI), serta e-Wallet (GoPay, OVO, ShopeePay, Dana)."
  },
  {
    question: "Bagaimana cara menyebarkan undangan kepada tamu?",
    answer: "Setelah undangan Anda aktif, sistem kami akan menyediakan tautan eksklusif (link). Anda cukup menyalin tautan tersebut dan membagikannya secara personal atau di grup chat WhatsApp, LINE, dan media sosial."
  }
];

// Stagger animation container
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg transition-colors duration-400">
      {/* Header Section */}
      <section className="relative px-[clamp(20px,5vw,64px)] py-[clamp(56px,8vw,108px)] overflow-hidden border-b border-hairline bg-bg-alt">
        <div className="max-w-[800px] mx-auto text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2.6rem,5vw,4rem)] font-medium leading-[1.08] text-ink"
          >
            Pertanyaan <em className="italic text-pink-btn-text dark:text-pink">Umum</em>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[18px] text-ink-soft leading-[1.6] max-w-[55ch] mx-auto"
          >
            Temukan jawaban atas pertanyaan umum terkait pembuatan undangan dan kartu ucapan digital di Invitea.
          </motion.p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="flex-1 px-[clamp(20px,5vw,64px)] py-[clamp(40px,6vw,80px)]">
        <div className="max-w-[800px] mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="border-b border-hairline last:border-b-0"
                >
                  <button
                    onClick={() => toggleOpen(index)}
                    className="flex items-center justify-between w-full py-6 md:py-8 text-left focus:outline-none group"
                  >
                    <span className={`font-serif text-xl md:text-2xl font-medium transition-colors duration-300 ${isOpen ? 'text-berry dark:text-pink' : 'text-ink group-hover:text-berry dark:group-hover:text-pink'}`}>
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      <ChevronDown className={`w-6 h-6 transition-all duration-400 ease-out ${isOpen ? "rotate-180 text-berry dark:text-pink" : "rotate-0 text-ink-soft group-hover:text-berry dark:group-hover:text-pink"}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 md:pb-10 pt-2 text-[16px] md:text-[17px] text-ink-soft leading-relaxed max-w-[70ch]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
