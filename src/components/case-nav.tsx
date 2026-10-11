"use client";
import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
const sections = [
  "Overview",
  "Architecture",
  "Decisions",
  "Evidence",
  "Lessons",
];
export function CaseNav() {
  const [active, setActive] = useState("overview");
  const reduced = useReducedMotion();
  const markerId = useId();
  useEffect(() => {
    let frame = 0;
    const update = () => {
      let current = "overview";
      for (const name of sections) {
        const el = document.getElementById(name.toLowerCase());
        if (el && el.getBoundingClientRect().top <= innerHeight * 0.35)
          current = el.id;
      }
      setActive(current);
      frame = 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return (
    <nav className="case-nav" aria-label="Case study sections">
      {sections.map((name) => (
        <a
          href={`#${name.toLowerCase()}`}
          key={name}
          aria-current={active === name.toLowerCase() ? "location" : undefined}
        >
          {active === name.toLowerCase() && (
            <motion.span
              className="case-position-marker"
              layoutId={markerId}
              transition={{ duration: reduced ? 0 : 0.2 }}
              aria-hidden="true"
            />
          )}
          <span className="case-position-label">{name}</span>
        </a>
      ))}
    </nav>
  );
}
