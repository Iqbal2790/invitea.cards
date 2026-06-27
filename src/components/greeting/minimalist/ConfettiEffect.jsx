"use client";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiEffect({ fire }) {
  useEffect(() => {
    if (fire) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#D4AF37", "#F4A261", "#B76E79"]
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#D4AF37", "#F4A261", "#B76E79"]
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [fire]);

  return null;
}
