"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import HeartAnimation from "./HeartAnimation";
import NightSkyBackground from "./NightSkyBackground";
import TypewriterText from "./TypewriterText";
import ConstellationGallery from "./ConstellationGallery";
import FloatingWishes from "./FloatingWishes";
import { MailOpen, ChevronLeft, ChevronRight } from "lucide-react";

export default function MagicalLanternsTemplate({ data, isPreview = false, isBuilder = false }) {
  const [stage, setStage] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parse data for this template based on generic LiveInvitationPage shape
  // For this template, we assume `data` contains:
  // - receiverName / groom / bride
  // - greetingText
  // - photos (array of urls)
  // - wishes (array of {text: string})
  // - finalGreeting
  // - senderName
  const receiver = data?.receiverName || data?.bride || data?.groom || "Special Someone";
  const greeting = data?.greetingText || `Happy Birthday, ${receiver}! Wishing you all the love and happiness in the world.`;
  const photos = Array.isArray(data?.photos) ? data.photos : Array.isArray(data?.foto_urls) ? data.foto_urls : [];
  const hasPhotos = photos.some((photo) => {
    if (!photo) return false;
    if (typeof photo === "string") return Boolean(photo.trim());
    return Boolean(photo.previewUrl || photo.url);
  });
  const wishes = data?.wishes || [
    { text: "Dari Alex yang selalu menyayangimu." },
    { text: "Wishing you health and happiness." },
    { text: "Another year of amazing adventures." },
    { text: "Happy birthday to someone special." },
    { text: "Let's celebrate this wonderful day!" },
  ];
  const finalQuote = data?.finalQuote || `"To the world you may be one person,\nbut to one person you are the world."`;
  const finalGreeting = data?.finalGreeting || "Once again, Happy Birthday! Enjoy your special day.";
  const senderName = data?.senderName || "Alex";

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setStage(0);
  };

  const nextStage = () => setStage((current) => (
    current === 1 && !hasPhotos ? 3 : Math.min(4, current + 1)
  ));

  const previousStage = () => setStage((current) => (
    current === 3 && !hasPhotos ? 1 : Math.max(-1, current - 1)
  ));

  return (
    <div className={`w-full relative overflow-hidden bg-[#0a0a1a] ${isPreview ? 'h-full' : 'h-[100dvh]'}`}>
      {/* Background music */}
      <audio 
        ref={audioRef} 
        src="https://cdn.pixabay.com/audio/2022/03/15/audio_79185a676b.mp3" 
        loop 
      />

      <NightSkyBackground>
        {stage === -1 && (
          <div className="flex flex-col items-center justify-center h-full w-full absolute inset-0 z-50 bg-black/40 backdrop-blur-sm">
            <button 
              onClick={handleStart}
              className="flex flex-col items-center justify-center group animate-pulse"
            >
              <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center border border-pink-500/50 group-hover:bg-pink-500/40 transition-all shadow-[0_0_20px_rgba(255,105,180,0.5)]">
                <MailOpen className="w-10 h-10 text-pink-300" />
              </div>
              <p className="mt-6 text-xl font-serif text-pink-200 tracking-wider">Tap to open</p>
              <p className="mt-2 text-sm font-sans text-pink-300/80">For: {receiver}</p>
            </button>
          </div>
        )}

        {stage === 0 && (
          <HeartAnimation onComplete={() => setStage(1)} />
        )}
        
        {stage === 1 && (
          <div className="flex flex-col items-center justify-center h-full w-full px-4 text-center absolute inset-0 z-10">
            <TypewriterText 
              text={greeting} 
              speed={70} 
              className="text-3xl md:text-5xl font-serif text-pink-300 drop-shadow-[0_0_15px_rgba(255,105,180,0.8)] leading-tight max-w-2xl" 
            />
            <div className="mt-12 opacity-0 animate-[fade-in-up_1s_ease-out_5s_forwards]">
              <button 
                onClick={() => setStage(hasPhotos ? 2 : 3)}
                className="px-6 py-2 border border-white/30 rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-all text-sm tracking-widest uppercase"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {stage === 2 && hasPhotos && (
          <ConstellationGallery
            photos={photos}
            onComplete={() => setStage(3)}
          />
        )}

        {stage === 3 && (
          <FloatingWishes 
            wishes={wishes}
            onComplete={() => setStage(4)} 
          />
        )}

        {stage === 4 && (
          <div className="flex flex-col items-center justify-center h-full w-full px-4 text-center absolute inset-0 z-10 animate-[fade-in-up_1s_ease-out_forwards]">
            <h2 className="text-2xl md:text-4xl font-serif text-white/90 drop-shadow-md mb-6 leading-relaxed max-w-2xl whitespace-pre-line">
              {finalQuote}
            </h2>
            <TypewriterText 
              text={finalGreeting} 
              speed={60} 
              className="text-2xl md:text-3xl font-serif text-pink-300 drop-shadow-[0_0_15px_rgba(255,105,180,0.8)] mb-8 max-w-xl" 
            />
            <div className="opacity-0 animate-[fade-in-up_1s_ease-out_5s_forwards]">
              <p className="text-lg font-serif text-white/70 italic">{data?.closingRemark || "With lots of love,"}</p>
              <p className="text-3xl font-serif text-pink-400 mt-2">{senderName}</p>
            </div>
          </div>
        )}
      </NightSkyBackground>

      {/* Controller for Live Preview (PORTALED DIRECTLY TO BODY SO IT NEVER SCROLLS - BUILDER ONLY) */}
      {mounted && isBuilder && typeof document !== "undefined" && createPortal(
        <div className="fixed top-6 right-6 z-[9999] flex items-center gap-2 bg-black/75 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-2xl pointer-events-auto text-white">
          <button 
            type="button"
            onClick={previousStage}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer" 
            title="Bagian Sebelumnya"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center px-2 text-white text-[11px] uppercase tracking-wider font-semibold">
            Slide {!hasPhotos && stage >= 3 ? stage + 1 : stage + 2} / {hasPhotos ? 6 : 5}
          </div>
          <button 
            type="button"
            onClick={nextStage}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer" 
            title="Bagian Selanjutnya"
          >
            <ChevronRight size={18} />
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
