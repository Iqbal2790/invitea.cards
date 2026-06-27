"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function WaxSealInteraction({ onBreak, isBroken }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (!isBroken) {
      onBreak();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative w-full">
      <AnimatePresence>
        {!isBroken && (
          <motion.div 
            className="flex flex-col items-center select-none w-64 h-64 justify-center"
            exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
          >
            {/* STATIC HITBOX */}
            <div 
              className="relative w-40 h-40 flex items-center justify-center cursor-pointer rounded-full"
              onClick={handleClick}
            >
              {/* Wax Seal Graphic */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none hover:scale-105 transition-transform duration-300">
                {/* The Wax Seal itself */}
                <motion.div 
                  className="w-24 h-24 rounded-full bg-[#8b1c2b] shadow-[0_4px_15px_rgba(0,0,0,0.5),inset_0_-4px_10px_rgba(0,0,0,0.4),inset_0_4px_10px_rgba(255,255,255,0.2)] flex items-center justify-center border border-[#6b1420]"
                >
                  <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center">
                    <span className="font-serif text-3xl text-[#E5C07B] drop-shadow-md">R&A</span>
                  </div>
                </motion.div>
              </div>
            </div>

            <p className="mt-8 font-sans tracking-[0.2em] uppercase text-xs text-[#52525B] text-center max-w-[200px] pointer-events-none animate-pulse">
              Klik untuk Membuka
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
