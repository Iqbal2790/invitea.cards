import {
  motion,
  type Transition,
  type UseInViewOptions,
  useInView,
  type Variant,
} from "framer-motion";
import { type ReactNode, useRef, useState } from "react";

export type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
  as?: React.ElementType;
  once?: boolean;
};

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function ScrollReveal({
  children,
  className,
  variants = defaultVariants,
  transition,
  viewOptions,
  as = "div",
  once,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, viewOptions);
  const [isViewed, setIsViewed] = useState(false);

  const MotionComponent =
    (motion as unknown as Record<string, typeof motion.div>)[as as string] ||
    motion.div;

  return (
    <MotionComponent
      animate={isInView || isViewed ? "visible" : "hidden"}
      initial="hidden"
      onAnimationComplete={() => {
        if (once) setIsViewed(true);
      }}
      ref={ref}
      transition={transition}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

export default ScrollReveal;
