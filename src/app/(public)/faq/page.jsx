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

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <section className="relative px-4 py-24 md:py-32 overflow-hidden border-b border-border-subtle bg-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-light/20 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-main font-semibold">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-lg text-text-muted leading-relaxed">
            Temukan jawaban atas pertanyaan umum terkait pembuatan undangan dan kartu ucapan digital di Invitea.
          </p>
        </div>
      </section>

      <section className="flex-1 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                >
                  <span className="font-serif text-lg md:text-xl font-medium text-text-main">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-colors ${isOpen ? 'bg-brand-light/50 text-brand' : 'bg-transparent text-text-muted'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-text-muted leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
