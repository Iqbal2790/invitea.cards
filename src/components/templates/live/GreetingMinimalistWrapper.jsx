"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CandleInteraction from "@/components/greeting/minimalist/CandleInteraction";
import ConfettiEffect from "@/components/greeting/minimalist/ConfettiEffect";
import BirthdayLetter from "@/components/greeting/minimalist/BirthdayLetter";
import MemoryReel from "@/components/greeting/minimalist/MemoryReel";
import BirthdayWishes from "@/components/greeting/minimalist/BirthdayWishes";
import FinalCard from "@/components/greeting/minimalist/FinalCard";
import AudioPlayer from "@/components/wedding/classic/AudioPlayer";
import { ChevronRight } from "lucide-react";

export default function GreetingMinimalistWrapper({ orderData }) {
  const content = orderData.data_content || {};
  
  // Pisahkan pesan ucapan menjadi paragraf jika memungkinkan
  const pesanParts = (content.pesan_ucapan || "").split('\n').filter(p => p.trim() !== "");
  
  const momenArr = [];
  for (let i = 1; i <= 3; i++) {
    if (content[`foto_${i}`]) {
      momenArr.push({
        foto: content[`foto_${i}`],
        caption: content[`caption_${i}`] || `Memori indah ${i}`
      });
    }
  }

  const hasMusic = Boolean(content.youtube_url && content.youtube_url.trim() !== "");

  const data = {
    pengirim: content.nama_pengirim || "Pengirim",
    penerima: content.nama_penerima || "Penerima",
    umur: content.umur || 25, 
    pesan_pembuka: content.pesan_pembuka || "Ada hadiah kecil buat kamu…",
    instruksi: "Tapi sebelum dibuka, tiup lilinnya dulu 🎂",
    surat: {
      paragraf_1: pesanParts[0] || "Semoga hari ini dan seterusnya selalu dipenuhi dengan kebahagiaan.",
      paragraf_2: pesanParts[1] || "",
      paragraf_3: pesanParts[2] || ""
    },
    momen: momenArr,
    harapan: content.harapan || "Semoga tahun ini kamu lebih bahagia, sehat, dan sukses selalu.",
    penutup: content.pesan_penutup || "Dari hati yang paling dalam, selamat merayakan hari spesialmu.",
    musik_url: content.youtube_url || ""
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef(null);

  const handleStartBlowing = () => {
    if (hasMusic && audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleBlown = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setCurrentSlide(1);
    }, 1500); 
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  };

  const slideVariants = {
    initial: { opacity: 0, x: 50, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, scale: 0.95, transition: { duration: 0.5, ease: "easeIn" } }
  };

  const slides = [
    { type: 'candle', component: (
      <motion.section 
        key="slide-candle"
        className="absolute inset-0 flex flex-col items-center justify-center"
        exit={{ opacity: 0, scale: 1.1, transition: { duration: 1 } }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ffb45e]/10 to-transparent" />
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="text-center mb-8 px-6">
            <p className="font-serif text-2xl mb-2">{data.pesan_pembuka}</p>
            <p className="text-[#F8FAFC]/70 text-sm">{data.instruksi}</p>
          </div>
          <CandleInteraction onBlown={handleBlown} onStartBlowing={handleStartBlowing} onStopBlowing={handleStartBlowing} isBlown={currentSlide > 0} />
        </div>
      </motion.section>
    )},
    { type: 'letter', component: (
      <motion.section key="slide-letter" className="absolute inset-0 overflow-y-auto pb-24" variants={slideVariants} initial="initial" animate="animate" exit="exit">
        <BirthdayLetter data={data} />
      </motion.section>
    )},
    { 
      type: 'memory', 
      hideNextButton: data.momen.length > 0, // Hanya sembunyikan jika ada foto
      component: (
        <motion.section key="slide-memory" className="absolute inset-0 overflow-y-auto pb-24" variants={slideVariants} initial="initial" animate="animate" exit="exit">
          <MemoryReel data={data} onFinish={() => setCurrentSlide(prev => prev + 1)} />
        </motion.section>
      )
    },
    { type: 'wishes', component: (
      <motion.section key="slide-wishes" className="absolute inset-0 overflow-y-auto pb-24 flex items-center" variants={slideVariants} initial="initial" animate="animate" exit="exit">
        <BirthdayWishes data={data} />
      </motion.section>
    )},
    { type: 'final', component: (
      <motion.section key="slide-final" className="absolute inset-0 overflow-y-auto pb-24 flex items-center" variants={slideVariants} initial="initial" animate="animate" exit="exit">
        <FinalCard data={data} />
      </motion.section>
    )}
  ];

  // Hapus slide memori jika tidak ada foto
  const validSlides = data.momen.length > 0 ? slides : slides.filter(s => s.type !== 'memory');
  const totalSlides = validSlides.length;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) setCurrentSlide(prev => prev + 1);
  };

  return (
    <div className="bg-[#0A0914] h-screen w-full text-[#F8FAFC] overflow-hidden flex justify-center">
      <div className="w-full max-w-md h-full bg-gradient-to-b from-[#17153B] to-[#0A0914] relative shadow-2xl overflow-hidden flex flex-col">
        
        <ConfettiEffect fire={showConfetti} />
        {hasMusic && <AudioPlayer ref={audioRef} src={data.musik_url} isPlaying={currentSlide > 0} />}

        <div className="flex-1 relative w-full h-full">
          <AnimatePresence mode="wait">
            {validSlides[currentSlide] && validSlides[currentSlide].component}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {currentSlide > 0 && currentSlide < totalSlides - 1 && !validSlides[currentSlide].hideNextButton && (
            <motion.div 
              className="absolute bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 1 }} 
            >
              <button 
                onClick={nextSlide}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white transition-all shadow-lg border border-white/10"
              >
                <span className="text-sm tracking-widest uppercase font-sans">Lanjut</span>
                <ChevronRight size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
