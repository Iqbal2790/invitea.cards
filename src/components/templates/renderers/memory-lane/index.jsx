"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Grain Texture Overlay ───────────────────────────────────────────────────
function GrainOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-50"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.04,
      }}
    />
  );
}

// ─── Progress Dots ────────────────────────────────────────────────────────────
function ProgressDots({ total, current, darkBg }) {
  return (
    <div className="absolute bottom-8 left-1/2 z-[100] flex -translate-x-1/2 gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i + 1 === current;
        return (
          <div
            key={i}
            className="h-[6px] w-[6px] rounded-full transition-all duration-300"
            style={{
              backgroundColor: isActive
                ? darkBg
                  ? "#EDE5D0"
                  : "#C9973A"
                : "#C8A97E",
              opacity: isActive ? 1 : 0.3,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Subtle Confetti ──────────────────────────────────────────────────────────
function SubtleConfetti({ count = 30 }) {
  const [particles] = useState(() => {
    const colors = ["#C9973A", "#D4A5A5", "#C8A97E"];
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      rotation: Math.random() * 360,
    }));
  });

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ top: "-10%", left: `${p.x}%`, rotate: p.rotation, opacity: 0 }}
          animate={{ top: "110%", rotate: p.rotation + 180, opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          className="absolute"
          style={{ width: "4px", height: "2px", backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}

// ─── Screen 1 — Opening ──────────────────────────────────────────────────────
function Screen1({ onNext }) {
  return (
    <div
      className="absolute inset-0 flex cursor-pointer select-none flex-col items-center justify-center"
      style={{ backgroundColor: "#3D2B1F" }}
      onClick={onNext}
    >
      <GrainOverlay />
      <div className="relative mb-8">
        <svg width="40" height="120" viewBox="0 0 40 120" fill="none">
          <path
            d="M20 10C20 10 28 25 28 35C28 45 20 48 20 48C20 48 12 45 12 35C12 25 20 10 20 10Z"
            fill="#C9973A"
            fillOpacity="0.4"
            style={{ animation: "ml-flicker 0.8s ease-in-out infinite" }}
          />
          <path
            d="M20 20C20 20 25 30 25 37C25 43 20 45 20 45C20 45 15 43 15 37C15 30 20 20 20 20Z"
            fill="#EDE5D0"
            style={{ animation: "ml-flicker 0.8s ease-in-out infinite", animationDelay: "0.1s" }}
          />
          <line x1="20" y1="45" x2="20" y2="52" stroke="#3D2B1F" strokeWidth="2" />
          <rect x="14" y="52" width="12" height="68" rx="2" fill="#F5F0E8" />
        </svg>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "22px", color: "#EDE5D0", textAlign: "center", padding: "0 28px" }}
      >
        Ada sesuatu untukmu...
      </motion.p>
    </div>
  );
}

// ─── Screen 2 — The Reveal ────────────────────────────────────────────────────
function Screen2({ onNext, receiverName, recipientAge }) {
  return (
    <div
      className="absolute inset-0 flex cursor-pointer select-none flex-col items-center justify-center"
      style={{ backgroundColor: "#F5F0E8" }}
      onClick={onNext}
    >
      <GrainOverlay />
      <SubtleConfetti />
      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "14px", color: "#C8A97E", marginBottom: "16px" }}
        >
          Untuk
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(40px, 12vw, 56px)", color: "#7A5C3C", lineHeight: 1.1, marginBottom: "16px" }}
        >
          {receiverName || "Kamu"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "18px", color: "#3D2B1F" }}
        >
          Hari ini adalah harimu
        </motion.p>
        {recipientAge && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "14px", color: "#C8A97E", marginTop: "8px" }}
          >
            {recipientAge} tahun yang luar biasa
          </motion.p>
        )}
      </div>
    </div>
  );
}

// ─── Screen 3 — First Memory (Polaroid flip) ──────────────────────────────────
function Screen3({ onNext, photo1, caption1 }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="absolute inset-0 flex select-none flex-col items-center justify-center"
      style={{ backgroundColor: "#EDE5D0" }}
    >
      <GrainOverlay />
      <div className="relative z-10" style={{ perspective: "1000px" }}>
        <motion.div
          className="relative cursor-pointer"
          style={{ width: "280px", height: "320px", transformStyle: "preserve-3d" }}
          initial={{ rotateZ: -3 }}
          animate={{ rotateY: isFlipped ? 180 : 0, rotateZ: isFlipped ? 0 : -3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setIsFlipped(true)}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center"
            style={{ backfaceVisibility: "hidden", background: "#F8F4EC", padding: "12px 12px 40px", boxShadow: "0 6px 24px rgba(122,92,60,0.18)" }}
          >
            <div className="w-full flex-1 overflow-hidden" style={{ background: "#E8E2D2" }}>
              {photo1 ? (
                <img src={photo1} alt="Kenangan 1" className="w-full h-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span style={{ fontFamily: "'Lora', serif", fontStyle: "italic", color: "#C8A97E", opacity: 0.5, fontSize: "13px" }}>Foto 1</span>
                </div>
              )}
            </div>
            <div className="absolute bottom-3 w-full text-center">
              <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "13px", color: "#7A5C3C" }}>Foto 1</p>
            </div>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 flex items-center justify-center p-6 text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "#F5F0E8", boxShadow: "0 6px 24px rgba(122,92,60,0.18)" }}
          >
            <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "15px", color: "#3D2B1F", lineHeight: 1.8 }}>
              &ldquo;{caption1 || "Waktu itu kita nggak tahu ini akan jadi salah satu hari terbaik kita."}&rdquo;
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-24 z-10 flex h-10 items-center justify-center">
        {!isFlipped ? (
          <motion.p
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "12px", color: "#C8A97E" }}
          >
            Ketuk foto untuk lihat lebih dekat
          </motion.p>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onClick={onNext}
            style={{ fontFamily: "'Lora', serif", fontSize: "13px", color: "#C8A97E", padding: "8px 16px", background: "none", border: "none", cursor: "pointer" }}
          >
            Lanjut →
          </motion.button>
        )}
      </div>
    </div>
  );
}

// ─── Screen 4 — Double Memory ─────────────────────────────────────────────────
function Screen4({ onNext, photo2, photo3, caption2, caption3 }) {
  const [flippedLeft, setFlippedLeft] = useState(false);
  const [flippedRight, setFlippedRight] = useState(false);
  const bothFlipped = flippedLeft && flippedRight;

  return (
    <div
      className="absolute inset-0 flex select-none flex-col items-center justify-center"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      <GrainOverlay />
      <div className="relative z-10 flex gap-5 px-4" style={{ perspective: "1000px" }}>
        {/* Left */}
        <motion.div
          className="relative cursor-pointer"
          style={{ width: "150px", height: "190px", transformStyle: "preserve-3d" }}
          initial={{ rotateZ: -4 }}
          animate={{ rotateY: flippedLeft ? 180 : 0, rotateZ: flippedLeft ? 0 : -4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setFlippedLeft(true)}
        >
          <div className="absolute inset-0 flex flex-col items-center" style={{ backfaceVisibility: "hidden", background: "#F8F4EC", padding: "8px 8px 32px", boxShadow: "0 4px 20px rgba(122,92,60,0.15)" }}>
            <div className="w-full flex-1 overflow-hidden" style={{ background: "#E8E2D2" }}>
              {photo2 ? (
                <img src={photo2} alt="Kenangan 2" className="w-full h-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span style={{ fontFamily: "'Lora', serif", fontStyle: "italic", color: "#C8A97E", opacity: 0.5, fontSize: "10px" }}>Foto 2</span>
                </div>
              )}
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-3 text-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "#EDE5D0", boxShadow: "0 4px 20px rgba(122,92,60,0.15)" }}>
            <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "12px", color: "#3D2B1F", lineHeight: 1.6 }}>
              &ldquo;{caption2 || "Foto ini diambil tepat sebelum kita ketawa sampai nggak bisa napas."}&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          className="relative cursor-pointer"
          style={{ width: "150px", height: "190px", transformStyle: "preserve-3d" }}
          initial={{ rotateZ: 3 }}
          animate={{ rotateY: flippedRight ? 180 : 0, rotateZ: flippedRight ? 0 : 3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setFlippedRight(true)}
        >
          <div className="absolute inset-0 flex flex-col items-center" style={{ backfaceVisibility: "hidden", background: "#F8F4EC", padding: "8px 8px 32px", boxShadow: "0 4px 20px rgba(122,92,60,0.15)" }}>
            <div className="w-full flex-1 overflow-hidden" style={{ background: "#E8E2D2" }}>
              {photo3 ? (
                <img src={photo3} alt="Kenangan 3" className="w-full h-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span style={{ fontFamily: "'Lora', serif", fontStyle: "italic", color: "#C8A97E", opacity: 0.5, fontSize: "10px" }}>Foto 3</span>
                </div>
              )}
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-3 text-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "#EDE5D0", boxShadow: "0 4px 20px rgba(122,92,60,0.15)" }}>
            <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "12px", color: "#3D2B1F", lineHeight: 1.6 }}>
              &ldquo;{caption3 || "Masih inget bau kopi yang kita pesan sambil ngobrolin masa depan."}&rdquo;
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-24 z-10 flex h-10 items-center justify-center">
        {!bothFlipped ? (
          <motion.p
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "12px", color: "#C8A97E" }}
          >
            Ketuk setiap foto
          </motion.p>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            onClick={onNext}
            style={{ fontFamily: "'Lora', serif", fontSize: "13px", color: "#C8A97E", padding: "8px 16px", background: "none", border: "none", cursor: "pointer" }}
          >
            Lanjut →
          </motion.button>
        )}
      </div>
    </div>
  );
}

// ─── Screen 5 — Heartfelt Letter ──────────────────────────────────────────────
function Screen5({ onNext, mainMessage, senderName, recipientAge, receiverName }) {
  const letter = mainMessage || `Selamat ulang tahun, ${receiverName || "kamu"}. Kamu nggak pernah sadar betapa banyak kebaikan yang kamu bawa ke hidup orang-orang di sekitarmu. Semoga ${recipientAge || "tahun ini"} jadi tahun yang paling berani.`;
  const chars = letter.split("");
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished) return;
    if (displayedCount < chars.length) {
      const t = setTimeout(() => setDisplayedCount((n) => n + 1), 35);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setIsFinished(true), 500);
      return () => clearTimeout(t);
    }
  }, [displayedCount, isFinished, chars.length]);

  const handleSkip = () => {
    if (!isFinished) {
      setDisplayedCount(chars.length);
      setIsFinished(true);
    }
  };

  return (
    <div
      className="absolute inset-0 flex cursor-pointer select-none flex-col items-center justify-center"
      style={{ backgroundColor: "#EDE5D0" }}
      onClick={handleSkip}
    >
      <GrainOverlay />
      <div className="relative z-10 flex w-full max-w-[320px] flex-col items-center px-8">
        <div className="mb-4 h-[1px] w-[120px]" style={{ background: "#C8A97E", opacity: 0.3 }} />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "13px", color: "#C8A97E", textAlign: "center", marginBottom: "40px" }}
        >
          Sebuah pesan untukmu
        </motion.p>
        <div style={{ minHeight: "140px", display: "flex", justifyContent: "center", textAlign: "center" }}>
          <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "17px", color: "#3D2B1F", lineHeight: 1.9 }}>
            {chars.slice(0, displayedCount).join("")}
          </p>
        </div>
        {isFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-4 flex w-full flex-col items-center"
          >
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "20px", color: "#7A5C3C", textAlign: "center", marginBottom: "48px" }}>
              — {senderName || "Seseorang yang menyayangimu"}
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              style={{ fontFamily: "'Lora', serif", fontSize: "13px", color: "#C8A97E", padding: "8px 16px", background: "none", border: "none", cursor: "pointer" }}
            >
              Lanjut →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Screen 6 — Film Strip ────────────────────────────────────────────────────
function Screen6({ onNext, filmPhoto1, filmPhoto2, filmPhoto3, filmPhoto4, filmPhoto5, filmCaption1, filmCaption2, filmCaption3, filmCaption4, filmCaption5 }) {
  const scrollRef = useRef(null);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const allFrames = [
    { id: 1, photo: filmPhoto1, caption: filmCaption1 || "Awal cerita kita..." },
    { id: 2, photo: filmPhoto2, caption: filmCaption2 || "Foto ini diambil tepat sebelum kita ketawa sampai nggak bisa napas." },
    { id: 3, photo: filmPhoto3, caption: filmCaption3 || "Masih inget bau kopi yang kita pesan sambil ngobrolin masa depan." },
    { id: 4, photo: filmPhoto4, caption: filmCaption4 || "Waktu seakan berhenti setiap kali kita berdua." },
    { id: 5, photo: filmPhoto5, caption: filmCaption5 || "Dan masih banyak lagi memori yang akan kita buat." },
  ];
  
  const activeCount = filmPhoto5 ? 5 : (filmPhoto4 ? 4 : 3);
  const frames = allFrames.slice(0, activeCount);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft: sl, scrollWidth, clientWidth } = scrollRef.current;
    if (sl + clientWidth >= scrollWidth - 50) setReachedEnd(true);
  };

  return (
    <div className="absolute inset-0 flex select-none flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: "#3D2B1F" }}>
      <GrainOverlay />
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-24"
        style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "13px", color: "#F5F0E8" }}
      >
        Kenangan kita
      </motion.p>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="w-full">
        {/* Sprocket top */}
        <div className="mb-2 flex w-full justify-center overflow-hidden opacity-30">
          {Array.from({ length: 40 }).map((_, i) => <div key={`t-${i}`} className="mx-1 h-3 w-2 flex-shrink-0 rounded-[1px]" style={{ background: "#EDE5D0" }} />)}
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={(e) => { setIsDragging(true); setStartX(e.pageX - scrollRef.current.offsetLeft); setScrollLeft(scrollRef.current.scrollLeft); }}
          onMouseLeave={() => setIsDragging(false)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={(e) => { if (!isDragging) return; e.preventDefault(); const x = e.pageX - scrollRef.current.offsetLeft; scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 2; }}
          className="flex w-full gap-4 overflow-x-auto py-4"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            scrollSnapType: isDragging ? "none" : "x mandatory",
            scrollBehavior: "smooth",
            paddingLeft: "calc(50% - 120px)",
            paddingRight: "calc(50% - 120px)",
            scrollbarWidth: "none",
          }}
        >
          {frames.map((frame) => (
            <div key={frame.id} className="flex flex-shrink-0 flex-col items-center" style={{ width: "240px", scrollSnapAlign: "center" }}>
              <div className="mb-4 flex w-full items-center justify-center overflow-hidden" style={{ aspectRatio: "1", background: "#1A110C", border: "1px solid rgba(200,169,126,0.4)" }}>
                {frame.photo ? (
                  <img src={frame.photo} alt={`Kenangan ${frame.id}`} className="h-full w-full object-cover" />
                ) : (
                  <span style={{ fontFamily: "'Lora', serif", color: "#C8A97E", opacity: 0.3, fontSize: "10px" }}>Foto {frame.id}</span>
                )}
              </div>
              <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "12px", color: "#F5F0E8", opacity: 0.7, textAlign: "center", padding: "0 8px" }}>
                {frame.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Sprocket bottom */}
        <div className="mt-2 flex w-full justify-center overflow-hidden opacity-30">
          {Array.from({ length: 40 }).map((_, i) => <div key={`b-${i}`} className="mx-1 h-3 w-2 flex-shrink-0 rounded-[1px]" style={{ background: "#EDE5D0" }} />)}
        </div>
      </motion.div>

      <div className="absolute bottom-24 z-10 flex h-10 items-center justify-center">
        {reachedEnd ? (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onNext}
            style={{ fontFamily: "'Lora', serif", fontSize: "13px", color: "#F5F0E8", opacity: 0.8, padding: "8px 16px", background: "none", border: "none", cursor: "pointer" }}
          >
            Lanjut →
          </motion.button>
        ) : (
          <motion.p
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "12px", color: "#F5F0E8", opacity: 0.5 }}
          >
            Geser →
          </motion.p>
        )}
      </div>
    </div>
  );
}

// ─── Screen 7 — Reasons / Bubbles ────────────────────────────────────────────
function Screen7({ onNext, reasons }) {
  const defaultReasons = [
    { id: 1, text: "Caramu ketawa", x: 40, y: 180 },
    { id: 2, text: "Keberanianmu", x: 220, y: 160 },
    { id: 3, text: "Kejujuranmu", x: 120, y: 280 },
    { id: 4, text: "Cara kamu dengerin", x: 240, y: 290 },
    { id: 5, text: "Energimu", x: 50, y: 380 },
    { id: 6, text: "Senyummu", x: 180, y: 420 },
    { id: 7, text: "Kamu, apa adanya", x: 250, y: 490 },
  ];

  // Use custom reasons if provided (fill up to 7 slots)
  const bubbles = defaultReasons.map((d, i) => ({
    ...d,
    text: (reasons && reasons[i]) ? reasons[i] : d.text,
  }));

  const [tappedBubbles, setTappedBubbles] = useState([]);
  const allTapped = tappedBubbles.length === bubbles.length;

  return (
    <div className="absolute inset-0 flex select-none flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: "#F5F0E8" }}>
      <GrainOverlay />
      <div className="relative z-10 h-full w-full max-w-[390px] flex-shrink-0">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-24 w-full px-4 text-center"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "20px", color: "#7A5C3C" }}
        >
          Hal-hal yang selalu aku suka dari kamu
        </motion.p>

        {bubbles.map((bubble) => {
          const isTapped = tappedBubbles.includes(bubble.id);
          return (
            <motion.div
              key={bubble.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + bubble.id * 0.1, type: "spring", stiffness: 200, damping: 20 }}
              onClick={() => !isTapped && setTappedBubbles((p) => [...p, bubble.id])}
              className="absolute flex cursor-pointer items-center justify-center rounded-full px-4 py-2 transition-colors duration-500"
              style={{
                left: `${(bubble.x / 390) * 100}%`,
                top: `${(bubble.y / 844) * 100}%`,
                transform: "translate(-50%, -50%)",
                minWidth: "50px",
                minHeight: "36px",
                border: "1px solid rgba(200,169,126,0.4)",
                backgroundColor: isTapped ? "rgba(212, 165, 165, 0.3)" : "#EDE5D0",
              }}
            >
              <AnimatePresence mode="wait">
                {!isTapped ? (
                  <motion.span key="star" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.2 }} style={{ color: "#C8A97E" }}>
                    ✦
                  </motion.span>
                ) : (
                  <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "14px", color: "#3D2B1F", whiteSpace: "nowrap" }}>
                    {bubble.text}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        <div className="absolute bottom-24 flex w-full items-center justify-center h-10">
          {!allTapped ? (
            <p style={{ fontFamily: "'Lora', serif", fontSize: "12px", color: "#C8A97E" }}>
              {tappedBubbles.length} dari {bubbles.length}
            </p>
          ) : (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={onNext}
              style={{ fontFamily: "'Lora', serif", fontSize: "13px", color: "#C8A97E", padding: "8px 16px", background: "none", border: "none", cursor: "pointer" }}
            >
              Lanjut →
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 8 — Our Melody ────────────────────────────────────────────────────
function Screen8({ onNext, songUrl, musicQuote, isPlaying, onPlay }) {
  const [showNext, setShowNext] = useState(false);

  const handlePlay = () => {
    if (!isPlaying) {
      if (onPlay) onPlay();
      setTimeout(() => setShowNext(true), 3000);
    }
  };

  return (
    <div className="absolute inset-0 flex select-none flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: "#3D2B1F" }}>
      <GrainOverlay />
      <div className="relative z-10 flex w-full max-w-[390px] flex-col items-center px-6">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
          style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "17px", color: "#F5F0E8" }}
        >
          &ldquo;{musicQuote || "Lagu ini selalu mengingatkanku padamu."}&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onClick={handlePlay}
          className="relative mb-12 cursor-pointer"
        >
          <svg width="200" height="130" viewBox="0 0 200 130" fill="none">
            <rect width="200" height="130" rx="12" fill="#EDE5D0" />
            <path d="M40 0 L160 0 L160 20 L40 20 Z" fill="#D8CFBA" />
            <rect x="50" y="45" width="100" height="40" rx="4" fill="#3D2B1F" />
            <g style={{ transformOrigin: "75px 65px", animationDuration: "4s" }} className={isPlaying ? "animate-spin" : ""}>
              <circle cx="75" cy="65" r="14" fill="#EDE5D0" />
              <circle cx="75" cy="65" r="6" fill="#3D2B1F" />
              <line x1="75" y1="51" x2="75" y2="79" stroke="#3D2B1F" strokeWidth="2" />
              <line x1="61" y1="65" x2="89" y2="65" stroke="#3D2B1F" strokeWidth="2" />
            </g>
            <g style={{ transformOrigin: "125px 65px", animationDuration: "4s" }} className={isPlaying ? "animate-spin" : ""}>
              <circle cx="125" cy="65" r="14" fill="#EDE5D0" />
              <circle cx="125" cy="65" r="6" fill="#3D2B1F" />
              <line x1="125" y1="51" x2="125" y2="79" stroke="#3D2B1F" strokeWidth="2" />
              <line x1="111" y1="65" x2="139" y2="65" stroke="#3D2B1F" strokeWidth="2" />
            </g>
            <line x1="75" y1="48" x2="125" y2="48" stroke="#D8CFBA" strokeWidth="2" />
            <rect x="20" y="95" width="160" height="25" rx="4" fill="#D4A5A5" fillOpacity="0.6" />
            <text x="100" y="112" fill="#3D2B1F" fontSize="11" fontFamily="Lora" fontStyle="italic" textAnchor="middle">Our Song</text>
            <circle cx="20" cy="115" r="4" fill="#3D2B1F" />
            <circle cx="180" cy="115" r="4" fill="#3D2B1F" />
          </svg>
        </motion.div>

        <div className="flex h-24 flex-col items-center">
          <AnimatePresence mode="wait">
            {!showNext ? (
              <motion.div key="play-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-col items-center">
                <button
                  onClick={handlePlay}
                  className="mb-3 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-transform active:scale-95"
                  style={{ border: "2px solid #C9973A" }}
                >
                  <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderLeft: "10px solid #C9973A", borderBottom: "6px solid transparent", marginLeft: "2px" }} />
                </button>
                <p style={{ fontFamily: "'Lora', serif", fontSize: "12px", color: "#C8A97E" }}>Putar Lagu</p>
              </motion.div>
            ) : (
              <motion.button key="next-btn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} onClick={onNext}
                style={{ fontFamily: "'Lora', serif", fontSize: "13px", color: "#F5F0E8", opacity: 0.8, padding: "8px 16px", marginTop: "16px", background: "none", border: "none", cursor: "pointer" }}>
                Lanjut →
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 9 — Grand Finale ──────────────────────────────────────────────────
function Screen9({ receiverName, senderName, recipientAge }) {
  const [blownOut, setBlownOut] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [showWishModal, setShowWishModal] = useState(false);
  const [wishText, setWishText] = useState("");
  const [wishSent, setWishSent] = useState(false);
  const [confetti] = useState(() => {
    const colors = ["#C9973A", "#D4A5A5", "#3D2B1F", "#E8E2D2"];
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 3,
      size: 4 + Math.random() * 6,
    }));
  });

  useEffect(() => {
    if (blownOut) setTimeout(() => setShowCta(true), 1500);
  }, [blownOut]);

  return (
    <div className="absolute inset-0 flex select-none flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: "#F5F0E8" }}>
      <GrainOverlay />

      {blownOut && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ top: "-10%", left: `${c.x}%`, rotate: 0, opacity: 0 }}
              animate={{ top: "110%", rotate: 360, opacity: [0, 1, 1, 0] }}
              transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-sm"
              style={{ width: `${c.size}px`, height: `${c.size * 1.5}px`, backgroundColor: c.color }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex h-full w-full max-w-[390px] flex-col items-center justify-center px-6">
        <div className="flex h-40 w-full items-end justify-center pb-12">
          <AnimatePresence mode="wait">
            {!blownOut ? (
              <motion.p key="make-wish" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.8 }}
                className="text-center"
                style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "17px", color: "#C8A97E" }}>
                Make a wish...
              </motion.p>
            ) : (
              <motion.div key="hbd" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-center">
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(22px, 5vw, 32px)", color: "#7A5C3C" }}>
                  Selamat Ulang Tahun
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(36px, 10vw, 56px)", color: "#7A5C3C" }}>
                  {receiverName || "Kamu"}!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cake SVG */}
        <motion.div className="relative flex cursor-pointer flex-col items-center" onClick={() => setBlownOut(true)} whileTap={{ scale: 0.95 }}>
          {/* Candles */}
          <div className="absolute -top-[16%] left-1/2 z-20 flex -translate-x-1/2 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative flex flex-col items-center">
                <motion.svg 
                  key="flame" 
                  width="16" 
                  height="24" 
                  viewBox="0 0 16 24" 
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: blownOut ? 0 : 1, scale: blownOut ? 0 : 1 }} 
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "bottom center" }}
                >
                  <path d="M8 0C8 0 13 8 13 13C13 18 8 20 8 20C8 20 3 18 3 13C3 8 8 0 8 0Z" fill="#C9973A" fillOpacity="0.4" style={{ animation: "ml-flicker 0.8s ease-in-out infinite", animationDelay: `${i * 0.15}s` }} />
                  <path d="M8 6C8 6 11 11 11 14C11 17 8 18 8 18C8 18 5 17 5 14C5 11 8 6 8 6Z" fill="#EDE5D0" style={{ animation: "ml-flicker 0.8s ease-in-out infinite" }} />
                </motion.svg>
                <div style={{ width: "4px", height: "28px", background: i === 1 ? "#C9973A" : "#D4A5A5" }} />
              </div>
            ))}
          </div>
          {/* Cake body */}
          <svg width="140" height="110" viewBox="0 0 140 110" fill="none">
            <rect x="10" y="55" width="120" height="50" rx="6" fill="#D4A5A5" />
            <rect x="20" y="30" width="100" height="30" rx="4" fill="#EDE5D0" />
            <path d="M10 55 Q35 45 70 55 Q105 65 130 55" stroke="#F5F0E8" strokeWidth="6" fill="none" />
            <path d="M20 30 Q45 22 70 30 Q95 38 120 30" stroke="#F5F0E8" strokeWidth="5" fill="none" />
          </svg>
        </motion.div>

        <div className="flex h-40 w-full items-start justify-center pt-10">
          {!blownOut && (
            <p className="text-center" style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "12px", color: "#C8A97E", opacity: 0.7 }}>
              Ketuk kue untuk meniup lilin
            </p>
          )}

          {showCta && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-center">
              <p className="mb-6 text-center" style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "16px", color: "#C8A97E" }}>
                — Dari: {senderName || "Seseorang yang menyayangimu"}
              </p>
              <button
                onClick={() => setShowWishModal(true)}
                className="px-6 py-2 rounded-full border border-[#D4A5A5] text-[#7A5C3C] bg-white/50 hover:bg-white transition-colors"
                style={{ fontFamily: "'Lora', serif", fontSize: "14px" }}
              >
                Tulis Harapan
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Make a Wish Modal */}
      <AnimatePresence>
        {showWishModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-2xl bg-[#FDFBF7] p-6 shadow-xl relative"
            >
              <button 
                onClick={() => setShowWishModal(false)}
                className="absolute right-4 top-4 text-[#7A5C3C] opacity-60 hover:opacity-100 p-2 text-xl"
              >
                ✕
              </button>
              
              {!wishSent ? (
                <div className="pt-4">
                  <h3 className="mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "24px", color: "#7A5C3C" }}>
                    Make a Wish...
                  </h3>
                  <textarea
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="Tuliskan harapanmu di hari spesial ini..."
                    className="w-full rounded-xl border border-[#D8CFBA] bg-white p-4 text-sm focus:border-[#C9973A] focus:outline-none focus:ring-1 focus:ring-[#C9973A] min-h-[120px]"
                    style={{ fontFamily: "'Lora', serif", color: "#3D2B1F" }}
                  />
                  <button
                    onClick={() => {
                      if (wishText.trim()) setWishSent(true);
                    }}
                    disabled={!wishText.trim()}
                    className="mt-6 w-full rounded-xl bg-[#D4A5A5] py-3 text-white transition-colors hover:bg-[#c29191] disabled:opacity-50 disabled:hover:bg-[#D4A5A5]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    Kirim Harapan
                  </button>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="mb-4 text-4xl">✨</div>
                  <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "22px", color: "#7A5C3C" }}>
                    Harapan Terkirim
                  </h3>
                  <p style={{ fontFamily: "'Lora', serif", fontSize: "14px", color: "#C8A97E" }}>
                    Semoga semua harapan baikmu di tahun ini terkabul.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── CSS Injection for flicker animation ──────────────────────────────────────
const MemoryLaneStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Lora:ital,wght@0,400;1,400&display=swap');
    @keyframes ml-flicker {
      0% { opacity: 0.85; transform: scale(0.98); }
      50% { opacity: 1; transform: scale(1.02); }
      100% { opacity: 0.85; transform: scale(0.98); }
    }
    .ml-no-scrollbar::-webkit-scrollbar { display: none; }
  `}</style>
);

// ─── Main Renderer ────────────────────────────────────────────────────────────
export default function MemoryLane({ data, isPreview = false, isBuilder = false }) {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const TOTAL_SCREENS = 9;

  const nextScreen = () => {
    if (currentScreen < TOTAL_SCREENS) setCurrentScreen((n) => n + 1);
  };

  const {
    receiverName,
    senderName,
    recipientAge,
    photo1,
    photo2,
    photo3,
    caption1,
    caption2,
    caption3,
    filmPhoto1,
    filmPhoto2,
    filmPhoto3,
    filmPhoto4,
    filmPhoto5,
    filmCaption1,
    filmCaption2,
    filmCaption3,
    filmCaption4,
    filmCaption5,
    mainMessage,
    reasons,
    songUrl,
    musicQuote,
  } = data || {};

  // Extract YouTube ID if URL is provided
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  const ytId = getYoutubeId(songUrl);

  const isDarkScreen = currentScreen === 1 || currentScreen === 6 || currentScreen === 8;

  const screenProps = { 
    onNext: nextScreen, 
    receiverName, senderName, recipientAge, photo1, photo2, photo3, caption1, caption2, caption3, 
    filmPhoto1, filmPhoto2, filmPhoto3, filmPhoto4, filmPhoto5, filmCaption1, filmCaption2, filmCaption3, filmCaption4, filmCaption5,
    mainMessage, reasons, songUrl, musicQuote,
    isPlaying, onPlay: () => setIsPlaying(true)
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#FDFBF7]" style={{ fontFamily: "'Lora', serif" }}>
      <MemoryLaneStyles />

      <AnimatePresence mode="wait">
        {currentScreen === 1 && <motion.div key="s1" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0"><Screen1 {...screenProps} /></motion.div>}
        {currentScreen === 2 && <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0"><Screen2 {...screenProps} /></motion.div>}
        {currentScreen === 3 && <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0"><Screen3 {...screenProps} /></motion.div>}
        {currentScreen === 4 && <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0"><Screen4 {...screenProps} /></motion.div>}
        {currentScreen === 5 && <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0"><Screen5 {...screenProps} /></motion.div>}
        {currentScreen === 6 && <motion.div key="s6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0"><Screen6 {...screenProps} /></motion.div>}
        {currentScreen === 7 && <motion.div key="s7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0"><Screen7 {...screenProps} /></motion.div>}
        {currentScreen === 8 && <motion.div key="s8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0"><Screen8 {...screenProps} /></motion.div>}
        {currentScreen === 9 && <motion.div key="s9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0"><Screen9 {...screenProps} /></motion.div>}
      </AnimatePresence>

      <ProgressDots total={TOTAL_SCREENS} current={currentScreen} darkBg={isDarkScreen} />

      {/* Controller for Live Preview */}
      {isBuilder && (
        <div className="absolute top-6 right-6 z-[100] flex items-center gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-lg">
          <button 
            onClick={() => setCurrentScreen(Math.max(1, currentScreen - 1))} 
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors" 
            title="Previous Screen"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center px-2 text-[#F5F0E8] text-[11px] uppercase tracking-wider font-semibold">
            Slide {currentScreen} / {TOTAL_SCREENS}
          </div>
          <button 
            onClick={() => setCurrentScreen(Math.min(TOTAL_SCREENS, currentScreen + 1))} 
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors" 
            title="Next Screen"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Hidden YouTube Audio Player (persists across screens) */}
      {isPlaying && ytId && (
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&loop=1&playlist=${ytId}&enablejsapi=1`}
          allow="autoplay"
          className="hidden"
        />
      )}
    </div>
  );
}
