"use client";
import { useState, useEffect, useRef } from "react";

export default function TypewriterText({ text, speed = 80, className = "" }) {
  const [, setTick] = useState(0);
  const indexRef = useRef(0);
  const textCharsRef = useRef(Array.from(text || ""));

  useEffect(() => {
    const newChars = Array.from(text || "");
    const oldChars = textCharsRef.current;
    
    // Find common prefix length between the old text and new text
    let commonLen = 0;
    while (
      commonLen < oldChars.length && 
      commonLen < newChars.length && 
      oldChars[commonLen] === newChars[commonLen]
    ) {
      commonLen++;
    }
    
    // Reset index to the divergence point (or keep it if it's smaller)
    indexRef.current = Math.min(indexRef.current, commonLen);
    textCharsRef.current = newChars;
    setTick(t => t + 1); // Force re-render
  }, [text]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (indexRef.current < textCharsRef.current.length) {
        indexRef.current++;
        setTick(t => t + 1);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [speed]);

  const displayedText = textCharsRef.current.slice(0, indexRef.current).join("");

  return (
    <div className={className}>
      {displayedText}
      <span className="animate-pulse ml-1 opacity-70">|</span>
    </div>
  );
}
