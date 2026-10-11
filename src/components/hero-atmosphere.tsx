"use client";
import { useEffect, useRef } from "react";
import { useMotionPreference } from "./use-motion-preference";

export function HeroAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useMotionPreference();
  useEffect(() => {
    const element = ref.current;
    const hero = element?.closest(".hero");
    if (!element || !hero || reduced !== false) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const move = (event: Event) => {
      const pointer = event as PointerEvent;
      if (pointer.pointerType !== "mouse") return;
      const bounds = hero.getBoundingClientRect();
      x = ((pointer.clientX - bounds.left) / bounds.width) * 2 - 1;
      y = ((pointer.clientY - bounds.top) / bounds.height) * 2 - 1;
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          element.style.setProperty("--field-x", `${x * 12}px`);
          element.style.setProperty("--field-y", `${y * 10}px`);
        });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      element.style.removeProperty("--field-x");
      element.style.removeProperty("--field-y");
    };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", reset);
    return () => {
      reset();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", reset);
    };
  }, [reduced]);
  return (
    <div ref={ref} className="hero-atmosphere" aria-hidden="true">
      <svg viewBox="0 0 1000 800" fill="none">
        <g stroke="currentColor" strokeWidth="0.65">
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse
              key={i}
              cx="730"
              cy="360"
              rx={190 + i * 23}
              ry={160 + i * 18}
              transform={`rotate(${-35 + i * 7} 730 360)`}
            />
          ))}
          <path d="M90 730H700L915 515V160" />
          <path d="M130 750H730L950 530V170" />
        </g>
        <g fill="currentColor">
          <circle cx="90" cy="730" r="4" />
          <circle cx="915" cy="160" r="4" />
          <circle cx="950" cy="530" r="3" />
        </g>
      </svg>
    </div>
  );
}
