"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NightSkyBackground({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create stars
    const starCount = 150;
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      
      // Random size from 1px to 3px
      const size = Math.random() * 2 + 1;
      
      // Random position
      const x = Math.random() * 100; // 0 to 100vw
      const y = Math.random() * 100; // 0 to 100vh
      
      star.style.position = "absolute";
      star.style.left = `${x}vw`;
      star.style.top = `${y}vh`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = "white";
      star.style.borderRadius = "50%";
      star.style.opacity = Math.random(); // Initial random opacity
      star.style.boxShadow = `0 0 ${size * 2}px rgba(255,255,255,0.8)`;
      
      container.appendChild(star);
      stars.push(star);
      
      // Twinkle animation
      gsap.to(star, {
        opacity: Math.random() * 0.5 + 0.1, // fade down
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    }

    return () => {
      stars.forEach(star => {
        gsap.killTweensOf(star);
        if (container.contains(star)) {
          container.removeChild(star);
        }
      });
    };
  }, []);

  return (
    <div className="relative h-full w-full bg-[#0a0a1a] overflow-hidden text-white flex flex-col items-center justify-center">
      {/* Container for stars */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />
      
      {/* A subtle gradient glow for the night sky */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a3a] via-[#0a0a1a] to-[#0a0a1a] z-0 pointer-events-none opacity-60" />
      
      {/* Content */}
      <div className="relative z-10 w-full h-full flex-grow">
        {children}
      </div>
    </div>
  );
}
