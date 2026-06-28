"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { MailOpen } from "lucide-react";

export default function CoverOverlay({ children, onOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    setIsOpen(true);
    if (onOpen) onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div 
          initial={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-dark/95 backdrop-blur-sm"
        >
          <div className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none">
             {/* If we want we can pass bg image, but brand color is fine for now */}
          </div>
          <div className="relative z-10 flex flex-col items-center p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl text-center max-w-sm w-[90%]">
            
            <div className="mb-6">
               {children}
            </div>

            <button 
              onClick={handleOpen}
              className="group relative flex items-center gap-3 px-8 py-4 bg-white text-brand-dark rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <MailOpen className="w-5 h-5 text-brand" />
              <span>Buka Undangan</span>
              <div className="absolute inset-0 rounded-full border-2 border-white/40 scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"></div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
