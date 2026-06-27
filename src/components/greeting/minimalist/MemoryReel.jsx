"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight } from "lucide-react";

export default function MemoryReel({ data, onFinish }) {
  const [visibleCount, setVisibleCount] = useState(1);

  if (!data.momen || data.momen.length === 0) return null;

  const totalPhotos = data.momen.length;

  const handleNextPhoto = () => {
    if (visibleCount < totalPhotos) {
      setVisibleCount(prev => prev + 1);
    } else if (onFinish) {
      onFinish();
    }
  };

  return (
    <section className="h-full flex flex-col items-center justify-center px-6 relative">
      <div className="relative w-full max-w-[300px] h-[400px]">
        {/* Instruksi Ketuk Foto - Hanya muncul sebelum foto terakhir */}
        <AnimatePresence>
          {visibleCount < totalPhotos && (
            <motion.p 
              className="absolute -top-12 left-0 right-0 text-center text-[#F8FAFC]/60 text-sm font-sans tracking-widest uppercase z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Ketuk Foto
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {data.momen.slice(0, visibleCount).map((momen, index) => {
            // Buat tumpukan polaroid yang saling tumpang tindih
            const rotation = index % 2 === 0 ? -6 : 8;
            const zIndex = index + 1; // Foto selanjutnya menimpa foto sebelumnya
            const topOffset = index * 12; // Geser sedikit ke bawah agar terlihat menumpuk

            return (
              <motion.div 
                key={index}
                className="absolute left-0 right-0 mx-auto w-full"
                style={{ zIndex, top: `${topOffset}px` }}
                initial={{ opacity: 0, scale: 0.8, y: 100, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: rotation }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              >
                <div className="bg-[#FFFFFF] p-3 pb-10 shadow-2xl rounded-sm border border-black/5 transform-gpu cursor-pointer" onClick={handleNextPhoto}>
                  <div className="relative w-full aspect-square overflow-hidden bg-gray-200 pointer-events-none">
                    <Image
                      src={momen.foto}
                      alt={`Memory ${index + 1}`}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>
                  {momen.caption && (
                    <p className="absolute bottom-3 left-4 right-4 text-center text-[#0F172A] font-sans text-[11px] italic leading-tight line-clamp-2 pointer-events-none">
                      "{momen.caption}"
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Tombol Lanjut Lokal - HANYA MUNCUL setelah semua foto terbuka */}
      <AnimatePresence>
        {visibleCount === totalPhotos && (
          <motion.div 
            className="absolute bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
          >
            <button 
              onClick={handleNextPhoto}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white transition-all shadow-lg border border-white/10"
            >
              <span className="text-sm tracking-widest uppercase font-sans">
                Lanjut
              </span>
              <ChevronRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
