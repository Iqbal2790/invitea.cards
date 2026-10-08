"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full">
      {/* Mobile Sticky Background Container */}
      <div className="absolute inset-0 z-0 md:hidden overflow-hidden">
        <div className="sticky top-0 w-full h-[100svh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/hero-wedding.jpg" 
            alt="Momen romantis pernikahan"
            className="w-full h-full object-cover opacity-25 dark:opacity-10 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(80px,12vw,120px)] md:py-[clamp(56px,9vw,108px)] pb-[clamp(100px,15vw,160px)] md:pb-[clamp(72px,10vw,132px)] min-h-[100svh] md:min-h-0 flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-[clamp(32px,6vw,72px)] items-center">
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center text-center md:text-left items-center md:items-start pt-[10vh] md:pt-0"
          >
            <span className="inline-flex items-center gap-[10px] text-[14px] font-semibold tracking-[0.04em] text-berry dark:text-pink mb-[18px] md:before:content-[''] md:before:w-[28px] md:before:h-[1px] md:before:bg-current">
              Kini Hadir untuk Momen Spesialmu
            </span>
            <h1 className="font-serif text-[clamp(3.2rem,8vw,4.4rem)] font-medium leading-[1.08] text-ink md:max-w-[13ch] drop-shadow-sm md:drop-shadow-none">
              Sampaikan Kabar Bahagiamu dengan <em className="italic text-pink-btn-text dark:text-pink">Sepenuh Hati.</em>
            </h1>
            <p className="mt-[26px] text-[17px] md:text-[18px] text-ink-soft max-w-[46ch] leading-[1.6] drop-shadow-sm md:drop-shadow-none font-medium md:font-normal">
              Rangkai undangan digital dan kartu ucapan yang menawan dalam hitungan menit. Didesain dengan cinta, mudah disesuaikan, dan praktis dibagikan ke semua kerabat tanpa repot.
            </p>
            <div className="mt-[38px] flex flex-col sm:flex-row flex-wrap gap-[16px] w-full sm:w-auto justify-center md:justify-start">
              <Link 
                href="/templates?kategori=undangan"
                className="inline-flex justify-center items-center gap-[10px] px-[30px] py-[16px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] bg-pink-btn-bg text-cream-text shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)] w-full sm:w-auto"
              >
                Buat Undangan
              </Link>
              <Link 
                href="/templates?kategori=ucapan"
                className="inline-flex justify-center items-center gap-[10px] px-[30px] py-[16px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] bg-bg/80 backdrop-blur-md md:bg-transparent text-berry dark:text-ink border-[1.5px] border-berry dark:border-ink-soft transition-all duration-350 hover:bg-berry hover:text-cream-text dark:hover:bg-pink dark:hover:text-pink-btn-text dark:hover:border-pink w-full sm:w-auto shadow-sm md:shadow-none"
              >
                Buat Kartu Ucapan
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative hidden md:block"
          >
            <svg className="absolute -top-[34px] -left-[10px] w-[150px] h-[150px] opacity-90 z-0" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M75 140C75 140 20 120 20 75C20 45 45 30 65 40C80 47 80 65 68 70C58 74 48 65 55 55" stroke="var(--color-pink)" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="75" cy="30" r="9" stroke="var(--color-pink)" strokeWidth="1.4"/>
              <path d="M75 39C75 39 68 55 75 65C82 55 75 39 75 39Z" stroke="var(--color-pink)" strokeWidth="1.2"/>
            </svg>
            
            <div className="relative w-[86%] ml-auto rounded-[4px_120px_4px_4px] overflow-hidden shadow-[var(--shadow-photo)] rotate-[2deg] border-[6px] border-photo-frame z-10 bg-photo-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/hero-wedding.jpg" 
                alt="Momen romantis pernikahan"
                className="block w-full h-[460px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
