"use client";
import { useState, useEffect, useRef } from "react";

export default function TypewriterText({ text, speed = 80, className = "" }) {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);
  const textCharsRef = useRef(Array.from(text || ""));

  // Update refs and handle deletion when text changes
  useEffect(() => {
    const newChars = Array.from(text || "");
    textCharsRef.current = newChars;
    
    // If text was deleted, immediately truncate the displayed text
    if (indexRef.current > newChars.length) {
      indexRef.current = newChars.length;
      setDisplayedText(newChars.slice(0, indexRef.current).join(""));
    } else {
      // If text changed completely (not just appended), we might want to reset.
      // But for live preview, appending or replacing a char is common.
      // We will correct the displayed text if it mismatches up to the current index.
      const currentDisplayed = newChars.slice(0, indexRef.current).join("");
      setDisplayedText(currentDisplayed);
    }
  }, [text]);

  useEffect(() => {
    const timer = setInterval(() => {
      const chars = textCharsRef.current;
      if (indexRef.current < chars.length) {
        setDisplayedText(chars.slice(0, indexRef.current + 1).join(""));
        indexRef.current++;
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [speed]);

  return (
    <div className={className}>
      {displayedText}
      <span className="animate-pulse ml-1 opacity-70">|</span>
    </div>
  );
}
