"use client";
import { motion } from "framer-motion";

export default function Quote({ data }) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center py-20 px-6 relative z-10 overflow-hidden">
      {/* Background Section */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/bg_quote.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center space-y-8 max-w-lg mx-auto bg-white/20 backdrop-blur-sm p-10 rounded-[32px] border-[0.5px] border-white/40 shadow-xl"
      >
        <div className="font-serif text-6xl text-primary/40 leading-none">"</div>
        <p className="font-sans text-sm leading-loose text-text-muted italic px-4">
          {data.kutipan.teks}
        </p>
        <div className="font-serif text-6xl text-primary/40 leading-none rotate-180">"</div>
        <p className="font-serif text-lg text-primary font-medium">{data.kutipan.sumber}</p>
      </motion.div>
    </section>
  );
}
