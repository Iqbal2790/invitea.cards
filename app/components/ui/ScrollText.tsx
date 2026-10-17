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
    offset: ["start end", "start 80%"],
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
  const startRatio = index / Math.max(1, totalElements);
  const endRatio = Math.min(1, startRatio + 0.4);

  const depthBlur = useTransform(
    scrollYProgress,
    [startRatio * 0.6, endRatio],
    [Math.min(12, (index + 1) * blurRevealIntensity * 2.5), 0]
  );

  const depthOpacity = useTransform(
    scrollYProgress,
    [startRatio * 0.6, endRatio],
    [0.25 + (index / totalElements) * 0.2, 1]
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

interface BlurRevealItemProps {
  children: React.ReactNode;
  className?: string;
  staggerIndex?: number;
  initialBlur?: number;
  y?: number;
  as?: "div" | "span";
}

/**
 * BlurRevealItem
 * Applies Framer ScrollText blur reveal to any individual element, text, badge, button, or card item.
 */
export function BlurRevealItem({
  children,
  className = "",
  staggerIndex = 0,
  initialBlur = 6,
  y = 6,
  as = "div",
}: BlurRevealItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const startOffset = Math.max(90, 98 - staggerIndex * 2);
  const endOffset = Math.max(78, 86 - staggerIndex * 2);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${startOffset}%`, `start ${endOffset}%`],
  });

  const blurAmount = Math.max(4, initialBlur + staggerIndex * 0.8);
  const depthBlur = useTransform(scrollYProgress, [0, 1], [blurAmount, 0]);
  const depthOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [y, 0]);
  const depthFilter = useTransform(
    depthBlur,
    (v) => `blur(${Math.max(0, v)}px)`
  );

  const Component = as === "span" ? motion.span : motion.div;

  return (
    <Component
      ref={ref as any}
      style={{
        filter: depthFilter,
        opacity: depthOpacity,
        y: translateY,
      }}
      className={`will-change-[filter,opacity,transform] ${className}`}
    >
      {children}
    </Component>
  );
}

interface BlurRevealCardItemProps {
  children: React.ReactNode;
  index?: number;
  totalElements?: number;
  className?: string;
  initialBlur?: number;
}

/**
 * BlurRevealCardItem for sub-feature items inside each card.
 * Uses its own viewport target to guarantee early crisp reveal near bottom of screen.
 */
export function BlurRevealCardItem({
  children,
  index = 0,
  className = "",
  initialBlur = 6,
}: BlurRevealCardItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Stagger start slightly per column/row, unblur early near screen bottom (82-86%)
  const startPercent = Math.max(90, 98 - (index % 2) * 2);
  const endPercent = Math.max(78, 84 - (index % 2) * 2);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${startPercent}%`, `start ${endPercent}%`],
  });

  const blurAmount = Math.max(4, initialBlur + (index % 2) * 1.2);
  const depthBlur = useTransform(scrollYProgress, [0, 1], [blurAmount, 0]);
  const depthOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const depthFilter = useTransform(
    depthBlur,
    (v) => `blur(${Math.max(0, v)}px)`
  );

  return (
    <motion.div
      ref={ref}
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
  className = "",
  initialBlur = 6,
}: {
  children: React.ReactNode;
  className?: string;
  initialBlur?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 96%", "start 80%"],
  });

  const depthBlur = useTransform(scrollYProgress, [0, 1], [initialBlur, 0]);
  const depthOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const depthFilter = useTransform(
    depthBlur,
    (v) => `blur(${Math.max(0, v)}px)`
  );

  return (
    <motion.div
      ref={ref}
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
