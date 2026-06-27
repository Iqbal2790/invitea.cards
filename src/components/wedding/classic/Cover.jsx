"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Cover({ data, onOpen, hideButton }) {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-background text-text-main overflow-hidden">
      {/* Background Image / Decoration */}
      <div className="absolute inset-0 opacity-[0.85] bg-[url('/images/backgrounds/bg_cover.png')] bg-cover bg-center">
        {/* Soft overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>
      </div>
      
      <div className="relative z-10 text-center space-y-6 px-6">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-sans tracking-[0.2em] uppercase text-text-muted"
        >
          The Wedding Of
        </motion.p>
        
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl font-serif text-primary"
        >
          {data.mempelai.pria.nama_panggilan} <br/><span className="text-4xl text-text-main">&</span><br/> {data.mempelai.wanita.nama_panggilan}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="font-serif text-lg text-text-muted"
        >
          {data.acara.akad.hari_tanggal}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="pt-12"
        >
          {!hideButton && (
            <motion.button 
              onClick={onOpen}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="bg-primary text-white px-8 py-3 rounded-full font-sans text-sm tracking-wider hover:bg-opacity-90 transition-all shadow-xl"
            >
              Buka Undangan
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
