"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

// ── Icons & Assets ────────────────────────────────────────────────────────
const FlowerSVG = ({ className }) => (
  <svg width="60" height="150" viewBox="0 0 100 150" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stem */}
    <path className="wb-stem" d="M50 150 Q50 90 50 45" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
    
    {/* Leaves */}
    <g className="wb-leaves">
      <path d="M50 130 Q30 110 10 70 Q25 100 50 120 Z" fill="currentColor" />
      <path d="M50 120 Q70 100 90 60 Q75 90 50 110 Z" fill="currentColor" />
    </g>
    
    {/* Petals (Profile View) */}
    <g className="wb-petals">
      <path d="M 50 46 Q 40 20 50 5 Q 60 20 50 46 Z" fill="currentColor" />
      <path d="M 50 46 Q 35 25 30 10 Q 45 20 50 46 Z" fill="currentColor" />
      <path d="M 50 46 Q 65 25 70 10 Q 55 20 50 46 Z" fill="currentColor" />
      <path d="M 50 46 Q 25 35 15 25 Q 35 35 50 46 Z" fill="currentColor" />
      <path d="M 50 46 Q 75 35 85 25 Q 65 35 50 46 Z" fill="currentColor" />
    </g>
  </svg>
);

const DecorativeFlower = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#E8C77E]">
    <path d="M12 12 C8 12 6 6 12 2 C18 6 16 12 12 12 Z" fill="currentColor" opacity="0.8" />
    <path d="M12 12 C12 16 6 18 2 12 C6 8 12 10 12 12 Z" fill="currentColor" opacity="0.6" />
    <path d="M12 12 C12 16 18 18 22 12 C18 8 12 10 12 12 Z" fill="currentColor" opacity="0.6" />
    <path d="M12 12 C16 12 18 18 12 22 C6 18 8 12 12 12 Z" fill="currentColor" opacity="0.4" />
  </svg>
);

// ── Main Component ────────────────────────────────────────────────────────
export default function WhisperingBloomTemplate({ data }) {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [direction, setDirection] = useState(1);

  // Defaults
  const kalimatPenutup = data?.kalimat_penutup || "Semoga kebahagiaan selalu menyertaimu.";
  const signature = data?.signature_penutup || "Dengan cinta,";
  const hasMusic = Boolean(data?.youtube_url);
  const fotoUrls = Array.isArray(data?.foto_urls) && data.foto_urls.length > 0 
    ? data.foto_urls 
    : ["https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop"]; // Fallback

  const totalScreens = hasMusic ? 8 : 7;
  
  // To handle the screen mapping without music gap
  const getScreenComponent = (index) => {
    switch(index) {
      case 1: return <Screen1Opening next={() => goNext()} />;
      case 2: return <Screen2Cover data={data} />;
      case 3: return <Screen3From data={data} />;
      case 4: return <Screen4Message data={data} />;
      case 5: return <Screen5Gallery photos={fotoUrls} />;
      case 6: return hasMusic ? <Screen6Music url={data.youtube_url} /> : <Screen7Personal kalimat={kalimatPenutup} />;
      case 7: return hasMusic ? <Screen7Personal kalimat={kalimatPenutup} /> : <Screen8Closing data={data} signature={signature} />;
      case 8: return hasMusic ? <Screen8Closing data={data} signature={signature} /> : null;
      default: return null;
    }
  };

  const goNext = () => {
    if (currentScreen < totalScreens) {
      setDirection(1);
      setCurrentScreen(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentScreen > 1) {
      setDirection(-1);
      setCurrentScreen(prev => prev - 1);
    }
  };

  // ── Global Styles ────────────────────────────────────────────────────────
  // We inject the glow-pulse animation here
  useEffect(() => {
    if (!document.getElementById("whispering-bloom-styles")) {
      const style = document.createElement("style");
      style.id = "whispering-bloom-styles";
      style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Manrope:wght@300;400;600&display=swap');
        
        .wb-font-serif { font-family: 'Cormorant Garamond', serif; }
        .wb-font-sans { font-family: 'Manrope', sans-serif; }
        
        .wb-flower {
          opacity: 0;
          transform: scale(0.85);
          filter: drop-shadow(0 0 0px transparent);
          transition: opacity 1.2s ease-out, transform 1.2s ease-out, filter 1.2s ease-out;
          color: #5A2D13; /* Dark orange/brown when off */
        }
        
        .wb-flower .wb-stem {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
        }
        .wb-flower .wb-leaves, .wb-flower .wb-petals {
          opacity: 0;
          transform: scale(0);
          transform-origin: 50px 125px;
        }
        .wb-flower .wb-petals {
          transform-origin: 50px 46px;
        }

        .wb-flower.wb-animate {
          opacity: 1;
          transform: scale(1);
          color: #FFC069; /* Bright bulb when on */
          filter: drop-shadow(0 0 18px #FFC069) drop-shadow(0 0 36px #FF7A45);
          animation: wb-glow-pulse 3s ease-in-out infinite alternate 1.5s;
        }
        
        .wb-flower.wb-animate .wb-stem {
          animation: grow-stem 1s ease-out forwards;
        }
        .wb-flower.wb-animate .wb-leaves {
          animation: pop-out 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 0.5s;
        }
        .wb-flower.wb-animate .wb-petals {
          animation: pop-out 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 0.8s;
        }

        @keyframes grow-stem {
          0% { stroke-dashoffset: 120; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pop-out {
          0% { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }
        .wb-flower.wb-personal-animate {
          opacity: 1;
          transform: scale(1.1);
          color: #FFC069;
          filter: drop-shadow(0 0 20px #FFC069) drop-shadow(0 0 40px #FF7A45);
          animation: wb-glow-pulse 3s ease-in-out infinite alternate;
          transition: opacity 2s ease-out, transform 2s ease-out, filter 2s ease-out, color 2s ease-out;
        }
        
        @keyframes wb-glow-pulse {
          from { filter: drop-shadow(0 0 14px #FFC069) drop-shadow(0 0 28px #FF7A45); }
          to { filter: drop-shadow(0 0 22px #FFC069) drop-shadow(0 0 44px #FF7A45); }
        }
        
        .wb-breathe {
          animation: wb-breathe 4s ease-in-out infinite;
        }
        @keyframes wb-breathe {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(255,192,105,0.3)); }
          50% { transform: scale(1.02); filter: drop-shadow(0 0 12px rgba(255,192,105,0.6)); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div 
      className="relative w-full h-[100dvh] bg-[#0D0D14] overflow-hidden text-[#F5F0E6] select-none"
      onClick={() => currentScreen > 1 && goNext()}
    >
      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <motion.div
          key={currentScreen}
          custom={direction}
          initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
          transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          className="absolute inset-0 flex flex-col items-center justify-center w-full h-full"
        >
          {getScreenComponent(currentScreen)}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Indicators (Only show after screen 1) */}
      {currentScreen > 1 && (
        <div className="absolute bottom-[40px] left-0 w-full flex justify-center gap-2 z-50">
          {Array.from({ length: totalScreens - 1 }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i + 2 === currentScreen ? "w-6 bg-[#FFC069]" : "w-1.5 bg-[#3D2B1F]"
              }`}
            />
          ))}
        </div>
      )}
      
      {/* Invisible Left Click Area for Prev */}
      {currentScreen > 1 && (
        <div 
          className="absolute top-0 left-0 w-[30%] h-full z-40" 
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
        />
      )}
    </div>
  );
}

// ── Screens ───────────────────────────────────────────────────────────────

function Screen1Opening({ next }) {
  const [animatedIdxs, setAnimatedIdxs] = useState([]);
  const [showTap, setShowTap] = useState(false);

  useEffect(() => {
    // Exact timing from reference JS snippet
    // 0: Center, 1: LeftInner, 2: RightInner, 3: FarLeft, 4: FarRight
    // Their JS: flowers[0] (Center) animates immediately
    const t1 = setTimeout(() => setAnimatedIdxs([0]), 500); 
    
    // Their JS: after 3000ms, flowers[1] and flowers[2] animate
    const t2 = setTimeout(() => setAnimatedIdxs(prev => [...prev, 1, 2]), 3500);
    
    // Their JS: random interval for remaining
    const t3 = setTimeout(() => {
      const remaining = [3, 4].sort(() => Math.random() - 0.5);
      remaining.forEach((idx, i) => {
        setTimeout(() => {
          setAnimatedIdxs(prev => [...prev, idx]);
        }, i * 500);
      });
    }, 3500);

    // Show Tap text
    const t4 = setTimeout(() => setShowTap(true), 6000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  // Map visual layout (FarLeft, LeftInner, Center, RightInner, FarRight)
  // to the logical index (0 = Center, 1 = LeftInner, 2 = RightInner, 3 = FarLeft, 4 = FarRight)
  const layoutMap = [3, 1, 0, 2, 4];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer" onClick={(e) => { e.stopPropagation(); next(); }}>
      <div className="absolute bottom-[10vh] flex gap-2 sm:gap-4 items-end justify-center w-full px-4">
        {layoutMap.map(logicalIdx => (
          <div key={logicalIdx} className={`transform origin-bottom ${logicalIdx === 0 ? 'scale-110 z-10' : 'scale-90 opacity-80'}`}>
            <FlowerSVG className={`wb-flower ${animatedIdxs.includes(logicalIdx) ? 'wb-animate' : ''}`} />
          </div>
        ))}
      </div>
      
      <AnimatePresence>
        {showTap && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-[40vh] text-[#FFC069] wb-font-sans tracking-[0.3em] text-sm uppercase wb-breathe"
          >
            Tap to Open
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Screen2Cover({ data }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center">
      {/* Subtle ambient glow in bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FFC069] rounded-full blur-[100px] opacity-[0.08]" />
      
      <DecorativeFlower />
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="wb-font-sans text-[#E8C77E] uppercase tracking-widest text-xs mt-8 mb-4"
      >
        {data?.momen || "Momen Spesial"}
      </motion.p>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="wb-font-serif text-5xl sm:text-6xl italic text-[#F5F0E6] leading-tight"
      >
        {data?.nama_penerima || "Nama Penerima"}
      </motion.h1>
    </div>
  );
}

function Screen3From({ data }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center">
      <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-[#FF7A45] rounded-full blur-[80px] opacity-[0.06]" />
      
      <p className="wb-font-sans text-[#B8B4AC] text-sm tracking-wider mb-6">
        Sebuah pesan hangat dari
      </p>
      <h2 className="wb-font-serif text-4xl italic text-[#FFC069]">
        {data?.nama_pengirim || "Nama Pengirim"}
      </h2>
    </div>
  );
}

function Screen4Message({ data }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center">
      <DecorativeFlower />
      
      <div 
        className="mt-8 wb-font-serif text-xl leading-relaxed text-[#F5F0E6] max-w-md overflow-y-auto max-h-[60vh] custom-scrollbar px-4"
        onClick={e => e.stopPropagation()} // Allow scrolling without navigating
      >
        <p className="whitespace-pre-wrap">
          {data?.pesan || "Terima kasih telah menjadi bagian dari perjalanan yang luar biasa ini."}
        </p>
      </div>
    </div>
  );
}

function Screen5Gallery({ photos }) {
  const [idx, setIdx] = useState(0);

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (idx < photos.length - 1) setIdx(i => i + 1);
  };
  
  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (idx > 0) setIdx(i => i - 1);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-sm aspect-[3/4] p-4 relative z-10">
        <div className="w-full h-full rounded-lg overflow-hidden border border-[#E8C77E]/30 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] relative">
          <AnimatePresence mode="wait">
            <motion.img 
              key={idx}
              src={photos[idx]}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Internal Swiper Controls */}
          {photos.length > 1 && (
            <>
              <div className="absolute top-0 left-0 w-1/3 h-full z-20" onClick={handlePrevPhoto} />
              <div className="absolute top-0 right-0 w-1/3 h-full z-20" onClick={handleNextPhoto} />
            </>
          )}
        </div>
      </div>

      {photos.length > 1 && (
        <div className="flex gap-1.5 mt-6 z-10">
          {photos.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-[#E8C77E]' : 'bg-[#3D2B1F]'}`} />
          ))}
        </div>
      )}
      
      <p className="wb-font-sans text-xs text-[#B8B4AC] mt-4 tracking-widest uppercase z-10">
        Kenangan Kita
      </p>
    </div>
  );
}

function Screen6Music({ url }) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Extract ID
  const getYoutubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };
  
  const videoId = getYoutubeId(url);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center z-10">
      <p className="wb-font-sans text-[#E8C77E] uppercase tracking-widest text-xs mb-8">Lagu Spesial</p>
      
      {videoId ? (
        <div className="relative flex flex-col items-center">
          {/* Glowing rings behind button */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#FFC069] rounded-full blur-[40px] transition-opacity duration-1000 ${isPlaying ? 'opacity-40' : 'opacity-10'}`} />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#FF7A45] rounded-full blur-[20px] transition-opacity duration-1000 ${isPlaying ? 'opacity-50' : 'opacity-0'}`} />
          
          <button 
            onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
            className="relative z-10 w-16 h-16 rounded-full border border-[#E8C77E] flex items-center justify-center text-[#E8C77E] hover:bg-[#E8C77E] hover:text-[#0D0D14] transition-all duration-500"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>
          
          <div className="w-0 h-0 overflow-hidden opacity-0 pointer-events-none">
            {isPlaying && (
              <iframe 
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`} 
                allow="autoplay" 
              />
            )}
          </div>
        </div>
      ) : (
        <p className="wb-font-sans text-[#B8B4AC] text-sm">Musik tidak tersedia</p>
      )}
    </div>
  );
}

function Screen7Personal({ kalimat }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer">
      <div 
        className="relative flex flex-col items-center justify-center w-64 h-64 z-20"
        onClick={(e) => { e.stopPropagation(); setIsOpened(true); }}
      >
        <FlowerSVG className={`wb-flower ${isOpened ? 'wb-personal-animate' : 'wb-breathe opacity-60'}`} />
        
        {!isOpened && (
          <p className="absolute bottom-4 wb-font-sans text-[#FFC069] text-xs tracking-widest uppercase">
            Sentuh Bunga
          </p>
        )}
      </div>

      <AnimatePresence>
        {isOpened && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-[25vh] px-8 text-center z-10"
          >
            <p className="wb-font-serif italic text-2xl text-[#F5F0E6] leading-relaxed">
              "{kalimat}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Screen8Closing({ data, signature }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center">
      {/* Afterglow from Opening */}
      <div className="absolute bottom-[5vh] flex gap-2 sm:gap-4 items-end justify-center w-full px-4 opacity-30 blur-[2px]">
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className={`transform origin-bottom ${i === 2 ? 'scale-110' : 'scale-90'}`}>
            <FlowerSVG className="wb-flower wb-animate opacity-50" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center bg-[#0D0D14]/50 backdrop-blur-sm px-8 py-6 rounded-2xl border border-[#3D2B1F]/50">
        <p className="wb-font-sans text-[#B8B4AC] text-sm tracking-wider mb-2">
          {signature}
        </p>
        <h2 className="wb-font-serif text-3xl italic text-[#FFC069]">
          {data?.nama_pengirim || "Nama Pengirim"}
        </h2>
      </div>
    </div>
  );
}
