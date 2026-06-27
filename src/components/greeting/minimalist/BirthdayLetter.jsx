"use client";
import { motion } from 'framer-motion';

export default function BirthdayLetter({ data }) {
  return (
    <section className="h-full flex flex-col items-center justify-center px-8 text-center">
      <motion.p 
        className="text-[#FBBF24] text-sm tracking-[0.2em] uppercase font-sans font-medium mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        Teruntuk {data.penerima}
      </motion.p>
      
      <motion.div 
        className="w-12 h-[1px] bg-white/20 mb-12 mx-auto"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      <div className="space-y-8 max-w-md mx-auto text-[#F8FAFC]/90 text-lg leading-relaxed font-sans">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {data.surat.paragraf_1}
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {data.surat.paragraf_2}
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {data.surat.paragraf_3}
        </motion.p>
      </div>
    </section>
  );
}
