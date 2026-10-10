"use client";
import { useEffect, useState } from "react";
const sections = [
  "Overview",
  "Architecture",
  "Decisions",
  "Evidence",
  "Lessons",
];
export function CaseNav() {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActive(current.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    sections.forEach((name) => {
      const el = document.getElementById(name.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <nav className="case-nav" aria-label="Case study sections">
      {sections.map((name) => (
        <a
          href={`#${name.toLowerCase()}`}
          key={name}
          aria-current={active === name.toLowerCase() ? "location" : undefined}
        >
          {name}
        </a>
      ))}
    </nav>
  );
}
