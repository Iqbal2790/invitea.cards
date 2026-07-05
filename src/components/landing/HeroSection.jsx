"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 py-24 md:py-0 bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] -z-10" />
      
      {/* Subtle decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-light/40 rounded-full blur-3xl -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto flex flex-col items-center z-10 mt-16 md:mt-0"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-light/50 border border-brand/20 text-brand text-xs font-semibold tracking-widest uppercase mb-6 shadow-sm">
          <Sparkles className="w-3 h-3" />
          <span>Kini Hadir untuk Momen Spesialmu</span>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-text-main leading-tight mb-6">
          Sampaikan Kabar Bahagiamu dengan Sepenuh Hati.
        </h1>
        
        <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl leading-relaxed">
          Rangkai undangan digital dan kartu ucapan yang menawan dalam hitungan menit. Didesain dengan cinta, mudah disesuaikan, dan praktis dibagikan ke semua kerabat tanpa repot.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link 
            href="/templates?kategori=undangan"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white rounded-full hover:bg-brand/90 transition-all duration-300 shadow-md shadow-brand/20 text-base font-medium"
          >
            Buat Undangan
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/templates?kategori=ucapan"
            className="flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm border border-border-subtle text-brand rounded-full hover:bg-brand-light/50 transition-all duration-300 text-base font-medium shadow-sm"
          >
            Buat Kartu Ucapan
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
