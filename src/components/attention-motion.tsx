"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";

// Progressive enhancement: nothing is hidden while JS loads or if motion is off.
export function AttentionMotion() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (
      reduced !== false ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const animations: Animation[] = [];
    const move = (
      element: Element | null,
      distance: number,
      duration: number,
      delay = 0,
    ) => {
      if (!element) return;
      animations.push(
        element.animate(
          [
            { transform: `translateY(${distance}px)` },
            { transform: "translateY(0)" },
          ],
          { duration, delay, easing: "cubic-bezier(.22,1,.36,1)" },
        ),
      );
    };
    const hero = document.querySelector(".hero");
    if (hero && hero.getBoundingClientRect().top > -80) {
      move(hero.querySelector(".hero-intro"), 6, 300);
      move(hero.querySelector("h1"), 12, 420, 50);
    }
    if (!window.IntersectionObserver)
      return () => animations.forEach((a) => a.cancel());
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const heading = entry.target;
          if (heading.matches(".hero-bottom > span")) {
            heading.setAttribute("data-motion-entered", "true");
            observer.unobserve(heading);
            continue;
          }
          const group =
            heading.closest(
              ".section-heading, .playground-intro, .about-title, .story-label",
            ) ?? heading.parentElement;
          move(group?.querySelector(".eyebrow") ?? null, 4, 180);
          move(heading, 10, 400, 60);
          observer.unobserve(heading);
        }
      },
      { threshold: 0.25 },
    );
    document
      .querySelectorAll(
        "main .section h2, .contact-heading, .hero-bottom > span",
      )
      .forEach((heading) => observer.observe(heading));
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      document
        .querySelector(".hero-bottom > span")
        ?.removeAttribute("data-motion-entered");
    };
  }, [pathname, reduced]);
  return null;
}
