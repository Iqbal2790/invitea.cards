"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function FloatingWishes({ wishes = [], onComplete }) {
  const containerRef = useRef(null);
  const [mainWishes, setMainWishes] = useState([]);
  const [bgLanterns, setBgLanterns] = useState([]);

  useEffect(() => {
    // Generate random positions/speeds on client to avoid hydration mismatch
    const fallbackWishes = [
      { text: "Happy birthday to someone special." },
      { text: "Let's celebrate this wonderful day!" },
    ];
    const sourceWishes = wishes.length > 0 ? wishes : fallbackWishes;
    
    const numWishes = Math.max(15, sourceWishes.length); // At least 15 or more if user added more
    const generatedWishes = Array.from({ length: numWishes }).map((_, index) => {
      // If we need more wishes than provided, cycle through them
      const textItem = sourceWishes[index % sourceWishes.length];
      return {
        text: textItem.text || textItem.message,
        name: textItem.name || null,
        left: `${Math.random() * 80 + 10}%`, // 10% to 90%
        duration: Math.random() * 8 + 8, // 8s to 16s (a bit slower variation)
        delay: index * 1.5 + Math.random(), // Stagger 1.5s interval
        scale: Math.random() * 0.3 + 0.8, // 0.8 to 1.1
      };
    });

    setMainWishes(generatedWishes);

    setBgLanterns(Array.from({ length: 30 }).map(() => ({
      left: `${Math.random() * 95 + 2}%`,
      duration: Math.random() * 15 + 15, // 15s to 30s (slower)
      delay: Math.random() * 10,
      scale: Math.random() * 0.4 + 0.2, // 0.2 to 0.6 (smaller)
      opacity: Math.random() * 0.4 + 0.3,
    })));
  }, []);

  useEffect(() => {
    if (mainWishes.length === 0 || bgLanterns.length === 0) return;

    const ctx = gsap.context(() => {
      // Fade in container
      gsap.to(containerRef.current, { opacity: 1, duration: 1 });

      // Background lanterns continuous animation
      gsap.utils.toArray(".bg-lantern").forEach((el, i) => {
        gsap.fromTo(el, 
          { y: window.innerHeight + 100, x: 0 },
          { 
            y: -300, 
            x: (Math.random() - 0.5) * 150, // Slight horizontal sway
            duration: bgLanterns[i].duration,
            delay: bgLanterns[i].delay,
            ease: "none",
            repeat: -1
          }
        );
      });

      // Foreground wishes animation
      let maxTime = 0;
      gsap.utils.toArray(".wish-card").forEach((el, i) => {
        const time = mainWishes[i].delay + mainWishes[i].duration;
        if (time > maxTime) maxTime = time;

        gsap.fromTo(el,
          { y: window.innerHeight + 200, opacity: 0 },
          {
            y: -400,
            opacity: 1,
            duration: mainWishes[i].duration,
            delay: mainWishes[i].delay,
            ease: "none",
          }
        );
      });

      // Show continue button near the end
      gsap.to(".continue-btn", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: maxTime - 4 // Show 4 seconds before the last lantern finishes
      });

    }, containerRef);

    return () => ctx.revert();
  }, [mainWishes, bgLanterns]);

  // Lantern SVG Component for reuse
  const LanternSVG = ({ index, isBg }) => (
    <div className={`relative z-10 ${!isBg && 'hover:scale-105'} transition-transform duration-500`}>
      <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(255,140,0,0.6)]">
        <defs>
          <linearGradient id={`lantern-body-${isBg ? 'bg' : 'fg'}-${index}`} x1="0" y1="100%" x2="0" y2="0%">
            <stop offset="0%" stopColor="#ffb347" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#d35400" stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id={`glow-${isBg ? 'bg' : 'fg'}-${index}`} cx="50%" cy="90%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#ffe066" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff7b00" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Paper Balloon Body */}
        <path 
          d="M 30 15 C 40 5, 60 5, 70 15 C 95 40, 85 90, 75 105 L 25 105 C 15 90, 5 40, 30 15 Z" 
          fill={`url(#lantern-body-${isBg ? 'bg' : 'fg'}-${index})`} 
          stroke="#c0392b" strokeWidth="1"
        />
        
        {/* Vertical Ribs */}
        <path d="M 50 8 L 50 105" stroke="#c0392b" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M 40 10 Q 30 50 37 105" stroke="#c0392b" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M 60 10 Q 70 50 63 105" stroke="#c0392b" strokeWidth="1.5" fill="none" opacity="0.5" />
        
        {/* Inner Fire Glow */}
        <circle cx="50" cy="95" r="22" fill={`url(#glow-${isBg ? 'bg' : 'fg'}-${index})`} className="animate-pulse mix-blend-screen" />
        
        {/* Wooden Base Frame */}
        <path d="M 23 105 L 77 105" stroke="#3e2723" strokeWidth="3" strokeLinecap="round" />
        <path d="M 35 105 L 50 115 L 65 105" stroke="#4e342e" strokeWidth="2" fill="none" />
        
        {/* Hanging string connection point */}
        <circle cx="50" cy="115" r="1.5" fill="#3e2723" />
      </svg>
    </div>
  );

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-30 opacity-0 overflow-hidden w-full h-full pointer-events-none"
    >
      <div className="w-full h-full relative pointer-events-auto">
        {/* Background Lanterns (No cards, just flying) */}
        {bgLanterns.map((lantern, index) => (
          <div
            key={`bg-${index}`}
            className="bg-lantern absolute flex flex-col items-center"
            style={{ 
              left: lantern.left, 
              transform: `scale(${lantern.scale})`,
              opacity: lantern.opacity,
              width: '64px',
              height: '80px'
            }}
          >
            <LanternSVG index={index} isBg={true} />
          </div>
        ))}

        {/* Main Foreground Wishes */}
        {mainWishes.map((wish, index) => (
          <div 
            key={`fg-${index}`}
            className="wish-card absolute flex flex-col items-center"
            style={{ 
              left: wish.left, 
              transform: `translateX(-50%) scale(${wish.scale})` 
            }}
          >
            <div className="w-16 h-20 md:w-24 md:h-28">
              <LanternSVG index={index} isBg={false} />
            </div>

            {/* Hanging String */}
            <div className="w-[1px] h-6 md:h-10 bg-gradient-to-b from-orange-400 to-white/30 -mt-2"></div>
            
            {/* Wish Card */}
            <div className="relative group">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_5px_rgba(212,175,55,0.8)] z-10" />
              <div className="bg-[#fffdf2]/95 backdrop-blur-sm border border-[#e6d5a1] px-4 py-3 shadow-[0_4px_15px_rgba(0,0,0,0.3)] max-w-[140px] md:max-w-[180px] text-center transform rotate-1 group-hover:-rotate-1 transition-transform duration-300 cursor-pointer">
                <p className="text-xs md:text-sm font-serif text-[#5c3e21] leading-relaxed">
                  {wish.text}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 continue-btn opacity-0 translate-y-4 z-50">
          <button 
            onClick={onComplete}
            className="px-6 py-2 border border-white/30 rounded-full text-white/80 bg-black/30 hover:bg-white/10 hover:text-white transition-all text-sm tracking-widest uppercase backdrop-blur-sm"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
