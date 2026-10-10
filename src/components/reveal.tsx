"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

// Content stays visible before JavaScript and when reduced motion is requested.
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element || reduced || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.animate(
            [{ transform: "translateY(22px)" }, { transform: "translateY(0)" }],
            { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)" },
          );
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reduced]);
  return (
    <motion.div ref={ref} className={className}>
      {children}
    </motion.div>
  );
}
