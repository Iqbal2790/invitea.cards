import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface ScrollTextProps {
  text: string;
  className?: string;
  blurRevealIntensity?: number;
  mode?: "word" | "char";
}

/**
 * ScrollText with Blur Reveal Effect
 * Adapted from Framer ScrollText component (https://framer.com/m/ScrollText-M1QJj7.js@sYrAG0TKhZqanAFvmYKp)
 * Uses scroll-driven progressive depth blur & opacity reveal.
 */
export function ScrollText({
  text,
  className = "",
  blurRevealIntensity = 0.8,
  mode = "word",
}: ScrollTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center 70%"],
  });

  const elements = mode === "word" ? text.split(" ") : text.split("");

  return (
    <span
      ref={containerRef}
      className={`inline-flex flex-wrap ${className}`}
      style={{ willChange: "filter, opacity" }}
    >
      {elements.map((item, index) => (
        <AnimatedElement
          key={index}
          element={item}
          index={index}
          totalElements={elements.length}
          scrollYProgress={scrollYProgress}
          blurRevealIntensity={blurRevealIntensity}
          mode={mode}
          isLast={index === elements.length - 1}
        />
      ))}
    </span>
  );
}

function AnimatedElement({
  element,
  index,
  totalElements,
  scrollYProgress,
  blurRevealIntensity,
  mode,
  isLast,
}: {
  element: string;
  index: number;
  totalElements: number;
  scrollYProgress: MotionValue<number>;
  blurRevealIntensity: number;
  mode: "word" | "char";
  isLast: boolean;
}) {
  // Staggered progressive unblur following Framer ScrollText algorithm
  const startRatio = index / Math.max(1, totalElements);
  const endRatio = Math.min(1, startRatio + 0.4);

  const depthBlur = useTransform(
    scrollYProgress,
    [startRatio * 0.6, endRatio],
    [Math.min(10, (index + 1) * blurRevealIntensity * 2), 0]
  );

  const depthOpacity = useTransform(
    scrollYProgress,
    [startRatio * 0.6, endRatio],
    [0.3 + (index / totalElements) * 0.2, 1]
  );

  const depthFilter = useTransform(
    depthBlur,
    (v) => `blur(${Math.max(0, v)}px)`
  );

  return (
    <span className="inline-block whitespace-pre will-change-[filter,opacity]">
      <motion.span
        style={{
          display: "inline-block",
          filter: depthFilter,
          opacity: depthOpacity,
        }}
      >
        {element}
        {mode === "word" && !isLast ? "\u00A0" : ""}
      </motion.span>
    </span>
  );
}

interface BlurRevealCardItemProps {
  children: React.ReactNode;
  index: number;
  totalElements?: number;
  scrollYProgress: MotionValue<number>;
  className?: string;
}

/**
 * BlurRevealCardItem for sub-feature items inside each card
 * Progressively unblurs and fades in as the card scrolls through the viewport.
 */
export function BlurRevealCardItem({
  children,
  index,
  totalElements = 4,
  scrollYProgress,
  className = "",
}: BlurRevealCardItemProps) {
  // Progressive window based on item index
  const startRatio = (index / totalElements) * 0.35;
  const endRatio = Math.min(1, startRatio + 0.55);

  const depthBlur = useTransform(
    scrollYProgress,
    [startRatio, endRatio],
    [(index + 1) * 3, 0]
  );

  const depthOpacity = useTransform(
    scrollYProgress,
    [startRatio, endRatio],
    [0.4, 1]
  );

  const translateY = useTransform(
    scrollYProgress,
    [startRatio, endRatio],
    [10, 0]
  );

  const depthFilter = useTransform(
    depthBlur,
    (v) => `blur(${Math.max(0, v)}px)`
  );

  return (
    <motion.div
      style={{
        filter: depthFilter,
        opacity: depthOpacity,
        y: translateY,
      }}
      className={`will-change-[filter,opacity,transform] ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * BlurRevealContainer for card mockups or card panels
 */
export function BlurRevealContainer({
  children,
  scrollYProgress,
  className = "",
  initialBlur = 8,
}: {
  children: React.ReactNode;
  scrollYProgress: MotionValue<number>;
  className?: string;
  initialBlur?: number;
}) {
  const depthBlur = useTransform(scrollYProgress, [0.1, 0.7], [initialBlur, 0]);
  const depthOpacity = useTransform(scrollYProgress, [0.1, 0.7], [0.4, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.7], [0.97, 1]);
  const depthFilter = useTransform(
    depthBlur,
    (v) => `blur(${Math.max(0, v)}px)`
  );

  return (
    <motion.div
      style={{
        filter: depthFilter,
        opacity: depthOpacity,
        scale,
      }}
      className={`will-change-[filter,opacity,transform] ${className}`}
    >
      {children}
    </motion.div>
  );
}
