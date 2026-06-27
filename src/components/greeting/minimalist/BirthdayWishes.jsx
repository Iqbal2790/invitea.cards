"use client";
import { motion } from 'framer-motion';

export default function BirthdayWishes({ data }) {
  if (!data.harapan) return null;

  return (
    <section className="h-full px-8 flex items-center justify-center text-center">
      <motion.div 
        className="max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <p className="text-3xl md:text-4xl text-[#FBBF24] mb-8 font-serif italic" style={{ fontFamily: "'Playfair Display', serif" }}>
          "
        </p>
        <p className="text-[#F8FAFC] text-2xl font-serif leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
          {data.harapan}
        </p>
      </motion.div>
    </section>
  );
}
