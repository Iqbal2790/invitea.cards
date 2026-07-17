"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- Helper Components ---

// 1. ParticlesBackground (Hydration fixed)
const ParticlesBackground = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0514] via-[#100824] to-[#05030a] z-0" />
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0514] via-[#100824] to-[#05030a] opacity-90" />
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-indigo-300"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.1
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.1, 0.8, 0.1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// 2. Word Pull Up
const WordPullUp = ({ text, className = "", delayOffset = 0 }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap justify-center gap-x-3 gap-y-2 ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 1,
            delay: delayOffset + (i * 0.15),
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

// 3. Blob Gooey Background
const GooeyBlob = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-30">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 90, 180, 270, 360],
          borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "30% 70% 60% 40%", "40% 60% 70% 30%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 blur-[100px]"
      />
    </div>
  );
};

// 4. Sparkles Outro (Hydration Fixed)
const Sparkles = () => {
  const [mounted, setMounted] = useState(false);
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    setSparks(Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 2 + 0.5,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 1.5,
    })));
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
       {sparks.map((s) => (
         <motion.div
           key={s.id}
           className="absolute w-1 h-1 bg-white rounded-full"
           style={{
             left: `${s.x}%`,
             top: `${s.y}%`,
             boxShadow: "0 0 10px 2px rgba(255,255,255,0.8)"
           }}
           animate={{
             opacity: [0, 1, 0],
             scale: [0, s.scale, 0]
           }}
           transition={{
             duration: s.duration,
             repeat: Infinity,
             delay: s.delay
           }}
         />
       ))}
    </div>
  );
};

// 5. Horizontal Gallery (Act 3)
const HorizontalGallery = ({ photos, containerRef }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to horizontal translation
  // Moves from right to left
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-80%"]);

  if (!photos || photos.length === 0) return null;

  return (
    <section ref={targetRef} className="relative h-[300vh] z-20">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <motion.div 
          style={{ x }} 
          className="flex gap-12 md:gap-24 px-[10vw] md:px-[20vw]"
        >
          {photos.map((url, i) => (
            <div 
              key={i} 
              className="relative w-[280px] h-[400px] md:w-[350px] md:h-[500px] shrink-0 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(79,70,229,0.3)] border border-indigo-500/30 group"
            >
              <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-transparent to-transparent opacity-80" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- Main Template ---

export default function CelestialJourneyTemplate({ data }) {
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);
  const containerRef = useRef(null);

  const photos = data?.foto_urls || [];
  const messageLines = data?.pesan?.split('\n').filter(line => line.trim() !== '') || [];

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[100dvh] bg-[#05030a] text-stone-100 font-sans overflow-y-auto overflow-x-hidden scroll-smooth hide-scrollbar"
    >
      <AnimatePresence mode="wait">
        {!isJourneyStarted ? (
          // Act 1: The Prologue
          <motion.div
            key="prologue"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#05030a] cursor-pointer"
            onClick={() => setIsJourneyStarted(true)}
          >
             <motion.div 
               animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="w-16 h-16 rounded-full bg-indigo-500 blur-xl absolute"
             />
             <motion.div 
               animate={{ scale: [1, 1.05, 1] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="w-4 h-4 rounded-full bg-white z-10 shadow-[0_0_30px_10px_rgba(255,255,255,0.8)]"
             />
             <motion.p
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1 }}
               className="mt-12 text-sm tracking-[0.3em] uppercase text-indigo-200 font-light"
             >
               Tap to begin the journey
             </motion.p>
          </motion.div>
        ) : (
          // The Main Journey
          <motion.div
            key="journey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="relative w-full"
          >
            <ParticlesBackground />

            {/* Act 2: The Ascent (Entrance) */}
            <section className="relative w-full h-screen flex flex-col items-center justify-center z-10 px-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-center"
              >
                <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-indigo-400 mb-8 font-semibold opacity-80">
                  Spesial Untuk
                </p>
                <WordPullUp 
                  text={data?.nama_penerima || "Nama Penerima"} 
                  className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-[10vh] flex flex-col items-center gap-4 animate-bounce"
              >
                <span className="text-[10px] uppercase tracking-widest text-indigo-300">Scroll Down</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-indigo-400 to-transparent"></div>
              </motion.div>
            </section>

            {/* Act 3: The Gallery of Time */}
            {photos.length > 0 && (
              <HorizontalGallery photos={photos} containerRef={containerRef} />
            )}

            {/* Act 4: The Whispers (Message) */}
            <section className="relative w-full min-h-screen flex items-center justify-center px-8 py-32 z-10 overflow-hidden">
              <GooeyBlob />
              
              <div className="max-w-3xl mx-auto text-center space-y-16 z-10">
                {messageLines.length > 0 ? (
                  messageLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                      <h3 className="text-2xl md:text-4xl leading-relaxed text-stone-200 font-serif font-light">
                        {line}
                      </h3>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                  >
                    <h3 className="text-2xl md:text-4xl leading-relaxed text-stone-200 font-serif font-light">
                      Pesan dari lubuk hati akan berbisik di sini.
                    </h3>
                  </motion.div>
                )}
              </div>
            </section>

            {/* Act 5: The Constellation (Outro) */}
            <section className="relative w-full h-screen flex flex-col items-center justify-center z-10 bg-gradient-to-b from-transparent via-[#0a0514] to-[#05030a]">
              <Sparkles />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-center px-6 relative z-10"
              >
                {/* Thin connection lines indicating constellation */}
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-20 -z-10">
                   <svg width="300" height="300" viewBox="0 0 300 300" className="animate-pulse">
                      <path d="M50,150 L150,50 L250,150 L150,250 Z" stroke="white" strokeWidth="1" fill="none" />
                      <circle cx="50" cy="150" r="3" fill="white" />
                      <circle cx="150" cy="50" r="3" fill="white" />
                      <circle cx="250" cy="150" r="3" fill="white" />
                      <circle cx="150" cy="250" r="3" fill="white" />
                   </svg>
                </div>

                <p className="text-xs tracking-[0.4em] uppercase text-indigo-400 mb-6 font-semibold opacity-70">
                  Dengan sepenuh hati,
                </p>
                <h2 className="text-5xl md:text-7xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200">
                  {data?.nama_pengirim || "Nama Pengirim"}
                </h2>
              </motion.div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
