"use client";
import { motion } from 'framer-motion';
import { DUMMY_GREETING_DATA } from '@/lib/dummy-data';

export default function LetterReveal() {
  const data = DUMMY_GREETING_DATA;

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[400px] w-full px-8 text-center"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
    >
      <motion.p 
        className="text-[#D4AF37] text-sm tracking-[0.2em] uppercase font-sans font-medium mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Teruntuk {data.penerima}
      </motion.p>
      
      <motion.h1 
        className="text-4xl md:text-5xl text-[#1C1C1E] mb-8 font-serif leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.3 }}
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {data.judul}
      </motion.h1>

      <motion.div 
        className="w-12 h-[1px] bg-gray-300 mb-8 mx-auto"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      />

      <motion.p 
        className="text-[#4A4A4A] text-lg leading-relaxed font-sans max-w-md mx-auto mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.9 }}
      >
        {data.pesan}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="flex flex-col items-center"
      >
        <p className="text-sm text-gray-400 font-sans uppercase tracking-widest mb-2">
          Salam Hangat,
        </p>
        <p className="text-xl text-[#1C1C1E] font-serif italic">
          {data.pengirim}
        </p>
      </motion.div>
    </motion.div>
  );
}
