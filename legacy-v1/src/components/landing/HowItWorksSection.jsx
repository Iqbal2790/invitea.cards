"use client";

import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="cara-kerja" className="py-[clamp(64px,9vw,120px)] w-full">
      <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)]">
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={item}
          className="max-w-[640px] mb-[clamp(40px,6vw,68px)]"
        >
          <h2 className="font-serif font-medium text-[clamp(2rem,4vw,2.9rem)] leading-[1.08] text-ink">
            Sesederhana Itu
          </h2>
          <p className="mt-[16px] text-ink-soft text-[16px]">
            Tidak perlu keahlian teknis. Hanya dengan 4 langkah mudah, undangan cantik Anda siap dibagikan.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="flex flex-col"
        >
          {/* Step 01 */}
          <motion.div variants={item} className="grid grid-cols-[80px_1fr] md:grid-cols-[110px_1fr] gap-[clamp(16px,4vw,48px)] py-[34px] border-t border-hairline items-start group">
            <span className="font-serif italic text-[3rem] md:text-[3.4rem] text-pink-line leading-[1] mt-[-4px]">01</span>
            <div>
              <h3 className="font-serif font-medium text-[1.4rem] md:text-[1.5rem] mb-[8px] text-ink">Pilih Desain</h3>
              <p className="text-ink-soft max-w-[52ch] text-[15px] md:text-[15.5px]">
                Temukan variasi desain menawan yang paling cocok dengan nuansa acaramu.
              </p>
            </div>
          </motion.div>

          {/* Step 02 */}
          <motion.div variants={item} className="grid grid-cols-[80px_1fr] md:grid-cols-[110px_1fr] gap-[clamp(16px,4vw,48px)] py-[34px] border-t border-hairline items-start group">
            <span className="font-serif italic text-[3rem] md:text-[3.4rem] text-pink-line leading-[1] mt-[-4px]">02</span>
            <div>
              <h3 className="font-serif font-medium text-[1.4rem] md:text-[1.5rem] mb-[8px] text-ink">Isi Detail Acara</h3>
              <p className="text-ink-soft max-w-[52ch] text-[15px] md:text-[15.5px]">
                Masukkan informasi mempelai, waktu, lokasi peta, dan pesan singkat Anda.
              </p>
            </div>
          </motion.div>

          {/* Step 03 */}
          <motion.div variants={item} className="grid grid-cols-[80px_1fr] md:grid-cols-[110px_1fr] gap-[clamp(16px,4vw,48px)] py-[34px] border-t border-hairline items-start group">
            <span className="font-serif italic text-[3rem] md:text-[3.4rem] text-pink-line leading-[1] mt-[-4px]">03</span>
            <div>
              <h3 className="font-serif font-medium text-[1.4rem] md:text-[1.5rem] mb-[8px] text-ink">Aktivasi</h3>
              <p className="text-ink-soft max-w-[52ch] text-[15px] md:text-[15.5px]">
                Selesaikan pembayaran ringan dengan mudah untuk mengaktifkan tautan undanganmu.
              </p>
            </div>
          </motion.div>

          {/* Step 04 */}
          <motion.div variants={item} className="grid grid-cols-[80px_1fr] md:grid-cols-[110px_1fr] gap-[clamp(16px,4vw,48px)] py-[34px] border-t border-b border-hairline items-start group">
            <span className="font-serif italic text-[3rem] md:text-[3.4rem] text-pink-line leading-[1] mt-[-4px]">04</span>
            <div>
              <h3 className="font-serif font-medium text-[1.4rem] md:text-[1.5rem] mb-[8px] text-ink">Bagikan</h3>
              <p className="text-ink-soft max-w-[52ch] text-[15px] md:text-[15.5px]">
                Tautan eksklusif siap dibagikan ke seluruh orang terkasih melalui WhatsApp atau media sosial.
              </p>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
