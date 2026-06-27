"use client";
import { motion } from 'framer-motion';

export default function FinalCard({ data }) {
  return (
    <section className="h-full px-8 flex flex-col items-center justify-center text-center">
      <motion.div
        className="w-full max-w-sm bg-[#F8FAFC] text-[#0F172A] p-8 md:p-10 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
      >
        <p className="font-serif text-2xl mb-6">
          Selamat Ulang Tahun yang ke-{data.umur}!
        </p>
        
        <div className="w-16 h-[1px] bg-[#0F172A]/20 mx-auto mb-6" />

        <p className="font-sans text-sm leading-relaxed text-[#0F172A]/80 mb-8">
          {data.penutup}
        </p>

        <div className="flex flex-col items-center">
          <p className="text-xs uppercase tracking-widest text-[#0F172A]/50 mb-2">
            Dari
          </p>
          <p className="font-serif italic text-xl">
            {data.pengirim}
          </p>
        </div>
      </motion.div>

      {/* Footer / Watermark */}
      <motion.p 
        className="mt-20 text-xs text-white/30 font-sans uppercase tracking-widest"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Dibuat dengan ❤️ oleh invitea
      </motion.p>
    </section>
  );
}
