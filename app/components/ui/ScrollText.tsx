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
  initialBlur = 8,
  y = 6,
  as = "div",
}: BlurRevealItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const startOffset = Math.max(88, 98 - staggerIndex);
  const endOffset = Math.max(72, 84 - staggerIndex);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${startOffset}%`, `start ${endOffset}%`],
  });

  const blurAmount = Math.max(4, initialBlur + staggerIndex);
  const depthBlur = useTransform(scrollYProgress, [0, 1], [blurAmount, 0]);
  const depthOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
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
  index: number;
  totalElements?: number;
  scrollYProgress?: MotionValue<number>;
  className?: string;
}

/**
 * BlurRevealCardItem for sub-feature items inside each card
 */
export function BlurRevealCardItem({
  children,
  index,
  totalElements = 4,
  scrollYProgress,
  className = "",
}: BlurRevealCardItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: localScroll } = useScroll({
    target: ref,
    offset: ["start 98%", "start 82%"],
  });

  const activeProgress = scrollYProgress || localScroll;
  const startRatio = (index / totalElements) * 0.25;
  const endRatio = Math.min(1, startRatio + 0.55);

  const depthBlur = useTransform(
    activeProgress,
    [startRatio, endRatio],
    [(index + 1) * 2.5, 0]
  );

  const depthOpacity = useTransform(
    activeProgress,
    [startRatio, endRatio],
    [0.35, 1]
  );

  const translateY = useTransform(
    activeProgress,
    [startRatio, endRatio],
    [8, 0]
  );

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
  scrollYProgress,
  className = "",
  initialBlur = 8,
}: {
  children: React.ReactNode;
  scrollYProgress?: MotionValue<number>;
  className?: string;
  initialBlur?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: localProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "center 65%"],
  });

  const activeProgress = scrollYProgress || localProgress;
  const depthBlur = useTransform(activeProgress, [0.05, 0.75], [initialBlur, 0]);
  const depthOpacity = useTransform(activeProgress, [0.05, 0.75], [0.3, 1]);
  const scale = useTransform(activeProgress, [0.05, 0.75], [0.97, 1]);
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
