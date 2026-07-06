"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ConstellationGallery({ photos = [], onComplete }) {
  const containerRef = useRef(null);
  
  // Extract URL whether it's a string or an object with previewUrl/url
  const getPhotoUrl = (p) => {
    if (!p) return null;
    if (typeof p === "string") return p;
    return p.previewUrl || p.url || null;
  };

  const displayPhotos = [
    getPhotoUrl(photos[0]),
    getPhotoUrl(photos[1]),
    getPhotoUrl(photos[2]),
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Fade in container
      tl.to(containerRef.current, { opacity: 1, duration: 1 });

      // Animate SVG lines drawing (stroke-dashoffset)
      tl.to(".constellation-line", {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.5
      }, "+=0.5");

      // Fade in photos at nodes
      tl.to(".constellation-photo", {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.5)",
        stagger: 0.5
      }, "-=1.5");

      // Wait a few seconds, then show continue button
      tl.to(".continue-btn", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "+=2");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-20 flex items-center justify-center opacity-0 w-full h-full overflow-hidden"
    >
      {/* SVG lines for constellation */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }}>
        {/* We use percentage coordinates to make it responsive */}
        {/* Line 1 */}
        <line 
          x1="20%" y1="30%" 
          x2="50%" y2="50%" 
          stroke="rgba(255,255,255,0.6)" 
          strokeWidth="2"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          className="constellation-line"
        />
        {/* Line 2 */}
        <line 
          x1="50%" y1="50%" 
          x2="80%" y2="70%" 
          stroke="rgba(255,255,255,0.6)" 
          strokeWidth="2"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          className="constellation-line"
        />
      </svg>

      {/* Node 1 */}
      <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 constellation-photo opacity-0 scale-50">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/40 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.4)] bg-white/10 flex items-center justify-center">
          {displayPhotos[0] ? (
            <img src={displayPhotos[0]} alt="Foto 1" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white/60 font-serif text-sm md:text-base">Foto 1</span>
          )}
        </div>
      </div>

      {/* Node 2 */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 constellation-photo opacity-0 scale-50">
        <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-white/40 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.4)] bg-white/10 flex items-center justify-center">
          {displayPhotos[1] ? (
            <img src={displayPhotos[1]} alt="Foto 2" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white/60 font-serif text-sm md:text-base">Foto 2</span>
          )}
        </div>
      </div>

      {/* Node 3 */}
      <div className="absolute top-[70%] left-[80%] -translate-x-1/2 -translate-y-1/2 constellation-photo opacity-0 scale-50">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/40 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.4)] bg-white/10 flex items-center justify-center">
          {displayPhotos[2] ? (
            <img src={displayPhotos[2]} alt="Foto 3" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white/60 font-serif text-sm md:text-base">Foto 3</span>
          )}
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 continue-btn opacity-0 translate-y-4">
        <button 
          onClick={onComplete}
          className="px-6 py-2 border border-white/30 rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-all text-sm tracking-widest uppercase"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
