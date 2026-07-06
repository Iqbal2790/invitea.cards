"use client";
import { useState, useEffect } from "react";

export default function TypewriterText({ text, speed = 80, className = "" }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText(""); // Reset
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <div className={className}>
      {displayedText}
      <span className="animate-pulse ml-1 opacity-70">|</span>
    </div>
  );
}
