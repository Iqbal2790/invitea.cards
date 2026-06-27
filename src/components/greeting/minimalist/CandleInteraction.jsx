"use client";
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CandleInteraction({ onBlown, isBlown }) {
  const [isBlowing, setIsBlowing] = useState(false);
  const [isExtinguished, setIsExtinguished] = useState(false);
  const blowTimeoutRef = useRef(null);

  // Jika parent memberikan prop isBlown, sinkronkan statenya
  useEffect(() => {
    if (isBlown && !isExtinguished) {
      setIsExtinguished(true);
    }
  }, [isBlown, isExtinguished]);

  const startBlowing = (e) => {
    e.preventDefault();
    if (isExtinguished || isBlown) return;
    setIsBlowing(true);
    
    // Jika ditahan selama 3 detik, lilin mati
    blowTimeoutRef.current = setTimeout(() => {
      setIsExtinguished(true);
      setIsBlowing(false);
      onBlown();
    }, 3000);
  };

  const stopBlowing = () => {
    if (isExtinguished) return;
    setIsBlowing(false);
    clearTimeout(blowTimeoutRef.current);
  };

  // Clean up timer
  useEffect(() => {
    return () => clearTimeout(blowTimeoutRef.current);
  }, []);

  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-[400px] w-full cursor-pointer select-none touch-none"
      onPointerDown={startBlowing}
      onPointerUp={stopBlowing}
      onPointerLeave={stopBlowing}
      onContextMenu={(e) => e.preventDefault()} // Disable right click/long press context menu
    >
      {/* Lingkaran Progress Halus */}
      {!isExtinguished && (
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none opacity-40 rotate-[-90deg]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#E5E7EB" strokeWidth="1" />
          <motion.circle 
            cx="50" cy="50" r="48" 
            fill="none" stroke="#D4AF37" strokeWidth="2"
            strokeDasharray="301.59"
            initial={{ strokeDashoffset: 301.59 }}
            animate={{ strokeDashoffset: isBlowing ? 0 : 301.59 }}
            transition={{ duration: isBlowing ? 3 : 0.5, ease: isBlowing ? "linear" : "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Kontainer Lilin */}
      <div className="relative z-10 mt-12">
        {/* Api Lilin */}
        {!isExtinguished && (
          <motion.div 
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-8 h-16 origin-bottom z-20"
            animate={
              isBlowing 
                ? { scale: [1, 0.4, 0.2, 0.3], y: [0, 8, 12, 10], rotate: [0, -10, 10, -5], opacity: [1, 0.8, 0.5, 0.6] } 
                : { scale: [1, 1.05, 0.95, 1], rotate: [-2, 2, -1, 1], opacity: 1 }
            }
            transition={
              isBlowing 
                ? { duration: 3, ease: "easeOut" } 
                : { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
            }
          >
            {/* Inner Flame */}
            <div className="w-full h-full bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-100 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-[0_0_40px_10px_rgba(253,186,116,0.5)]" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-6 bg-white rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] opacity-80 mix-blend-overlay" />
          </motion.div>
        )}
        
        {/* Asap tipis setelah mati */}
        {isExtinguished && (
          <motion.div 
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-4 h-24 bg-gray-300 rounded-full blur-md z-20"
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.6, 0], y: -80, scale: 3, rotate: 15 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          />
        )}

        {/* Batang Lilin & Holder */}
        <div className="relative mt-2">
          {/* Sumbu */}
          <div className="w-1 h-3 bg-[#475569] mx-auto rounded-t-sm" />
          
          {/* Badan Lilin */}
          <div className="w-12 h-32 mx-auto relative rounded-t-md overflow-hidden" 
               style={{
                 background: "linear-gradient(to right, #e2e8f0 0%, #ffffff 50%, #cbd5e1 100%)",
                 boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)"
               }}>
               
            {/* SVG Lelehan Lilin di atas */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-8 text-white fill-current opacity-90 drop-shadow-sm">
              <path d="M0 0 L100 0 L100 20 Q85 40 70 15 Q55 60 40 10 Q20 50 0 15 Z" />
            </svg>

            {/* Bayangan internal untuk 3D feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
          </div>

          {/* Tempat Lilin (Holder) */}
          <div className="w-20 h-4 mx-auto bg-gradient-to-r from-[#94a3b8] via-[#cbd5e1] to-[#64748b] rounded-full mt-[-2px] shadow-lg border border-white/20" />
          <div className="w-24 h-1 mx-auto bg-black/20 rounded-full mt-2 blur-sm" />
        </div>
      </div>

      {/* Instruksi teks */}
      <motion.p 
        className="mt-16 text-[#7D7070] font-sans text-xs tracking-[0.2em] uppercase text-center"
        animate={{ opacity: isBlowing || isExtinguished ? 0 : 1 }}
      >
        Tahan layar untuk meniup
      </motion.p>
    </div>
  );
}
