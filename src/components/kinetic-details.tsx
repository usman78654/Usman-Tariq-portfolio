"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Local, finite enhancements: the original text and every click target stay put. */
export function KineticDetails() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const cleanups = new Map<HTMLElement, () => void>();
    let observer: MutationObserver | undefined;
    let discoveryFrame = 0;

    function enhancePhrase(element: HTMLElement) {
      const source = element.firstChild;
      if (!source || source.nodeType !== Node.TEXT_NODE) return;
      const sourceText = source.textContent ?? "";
      const text = sourceText.trim();
      if (!text) return;
      const ink = getComputedStyle(element).color;
      const overlay = document.createElement("span");
      overlay.className = "kinetic-letter-copy";
      overlay.setAttribute("aria-hidden", "true");
      const letters: HTMLElement[] = [];
      const words: { group: HTMLElement; range: Range }[] = [];
      let cursor = sourceText.indexOf(text);

      // Generated-content copies leave the original literal text node intact,
      // including its accessible name, selection, and no-JS presentation.
      text.split(" ").forEach((word) => {
        const group = document.createElement("span");
        group.className = "kinetic-letter-word";
        const range = document.createRange();
        range.setStart(source, cursor);
        range.setEnd(source, cursor + word.length);
        cursor += word.length + 1;
        words.push({ group, range });
        Array.from(word).forEach((character) => {
          const letter = document.createElement("span");
          letter.className = "kinetic-letter";
          letter.dataset.letter = character;
          letters.push(letter);
          group.append(letter);
        });
        overlay.append(group);
      });

      element.classList.add("kinetic-phrase");
      element.style.setProperty("--kinetic-ink", ink);
      element.append(overlay);

      // Per-letter spans lose cross-letter kerning. Let the original text decide
      // each word's line and position instead of reflowing the decorative copy.
      // Otherwise a fractionally wider "useful" wraps into the contact details.
      function positionWords() {
        const bounds = element.getBoundingClientRect();
        const firstLine = words[0].range.getBoundingClientRect().top;
        words.forEach(({ group, range }) => {
          const word = range.getBoundingClientRect();
          group.style.left = `${word.left - bounds.left}px`;
          group.style.top = `${word.top - firstLine}px`;
        });
      }
      positionWords();
      const resizeObserver = window.ResizeObserver
        ? new ResizeObserver(positionWords)
        : undefined;
      resizeObserver?.observe(element);
      window.addEventListener("resize", positionWords);
      const trigger =
        element.closest<HTMLElement>(".contact-heading") ?? element;
      let animations: Animation[] = [];
      let playing = false;

      function stop() {
        animations.forEach((animation) => animation.cancel());
        animations = [];
        playing = false;
        delete element.dataset.kineticActive;
      }

      function ripple(event: PointerEvent) {
        if (event.pointerType !== "mouse" || playing) return;
        playing = true;
        element.dataset.kineticActive = "true";
        const fromRight =
          event.clientX >
          element.getBoundingClientRect().left + element.offsetWidth / 2;
        animations = letters.map((letter, index) =>
          letter.animate(
            [
              { transform: "translateY(0) rotate(0deg)" },
              { transform: "translateY(-0.12em) rotate(-4deg)", offset: 0.38 },
              { transform: "translateY(0.025em) rotate(1deg)", offset: 0.72 },
              { transform: "translateY(0) rotate(0deg)" },
            ],
            {
              duration: 460,
              delay: (fromRight ? letters.length - index - 1 : index) * 18,
              easing: "cubic-bezier(.22,.68,0,1)",
              fill: "both",
            },
          ),
        );
        void Promise.all(animations.map((animation) => animation.finished))
          .then(() => stop())
          .catch(() => {
            // A pointer exit, route change, or preference change cancels safely.
          });
      }

      trigger.addEventListener("pointerenter", ripple);
      trigger.addEventListener("pointerleave", stop);
      cleanups.set(element, () => {
        stop();
        resizeObserver?.disconnect();
        window.removeEventListener("resize", positionWords);
        trigger.removeEventListener("pointerenter", ripple);
        trigger.removeEventListener("pointerleave", stop);
        overlay.remove();
        element.classList.remove("kinetic-phrase");
        element.style.removeProperty("--kinetic-ink");
      });
    }

    function enhanceCard(element: HTMLElement) {
      const edge = document.createElement("span");
      edge.className = "kinetic-edge";
      edge.setAttribute("aria-hidden", "true");
      element.append(edge);
      let pointerFrame = 0;
      let latestX = 0;
      let latestY = 0;
      let arrowAnimation: Animation | undefined;

      function move(event: PointerEvent) {
        if (event.pointerType !== "mouse") return;
        latestX = event.clientX;
        latestY = event.clientY;
        if (pointerFrame) return;
        pointerFrame = requestAnimationFrame(() => {
          pointerFrame = 0;
          const bounds = element.getBoundingClientRect();
          element.style.setProperty("--edge-x", `${latestX - bounds.left}px`);
          element.style.setProperty("--edge-y", `${latestY - bounds.top}px`);
          element.dataset.edgeActive = "true";
        });
      }

      function enter(event: PointerEvent) {
        move(event);
        if (event.pointerType !== "mouse") return;
        const arrow = element.querySelector<SVGElement>(
          ".project-title-link > svg, .text-link > svg",
        );
        if (!arrow) return;
        arrowAnimation?.cancel();
        const isResume = element.classList.contains("resume-card");
        arrowAnimation = arrow.animate(
          [
            { transform: "translate(0, 0)", opacity: 1 },
            {
              transform: isResume
                ? "translate(0, 5px)"
                : "translate(5px, -5px)",
              opacity: 0.45,
              offset: 0.45,
            },
            { transform: "translate(0, 0)", opacity: 1 },
          ],
          { duration: 380, easing: "cubic-bezier(.22,.68,0,1)" },
        );
      }

      function leave() {
        cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        delete element.dataset.edgeActive;
        arrowAnimation?.cancel();
      }

      element.addEventListener("pointerenter", enter);
      element.addEventListener("pointermove", move, { passive: true });
      element.addEventListener("pointerleave", leave);
      cleanups.set(element, () => {
        leave();
        element.removeEventListener("pointerenter", enter);
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
        element.style.removeProperty("--edge-x");
        element.style.removeProperty("--edge-y");
        edge.remove();
      });
    }

    function discover() {
      discoveryFrame = 0;
      for (const [element, cleanup] of cleanups) {
        if (!main!.contains(element)) {
          cleanup();
          cleanups.delete(element);
        }
      }
      main!
        .querySelectorAll<HTMLElement>(".hero-last > em, .contact-heading > em")
        .forEach((element) => {
          if (!cleanups.has(element)) enhancePhrase(element);
        });
      main!
        .querySelectorAll<HTMLElement>(".project-card, .resume-card")
        .forEach((element) => {
          if (!cleanups.has(element)) enhanceCard(element);
        });
    }

    function reset() {
      observer?.disconnect();
      observer = undefined;
      cancelAnimationFrame(discoveryFrame);
      discoveryFrame = 0;
      for (const cleanup of cleanups.values()) cleanup();
      cleanups.clear();
    }

    function syncPreference() {
      reset();
      if (reduced.matches || !finePointer.matches) return;
      discover();
      // Filtering and Cards / Map view replace project nodes without changing
      // pathname. Observe additions, never style changes or pointer activity.
      observer = new MutationObserver(() => {
        if (!discoveryFrame) discoveryFrame = requestAnimationFrame(discover);
      });
      observer.observe(main!, { childList: true, subtree: true });
    }

    syncPreference();
    reduced.addEventListener("change", syncPreference);
    finePointer.addEventListener("change", syncPreference);
    return () => {
      reset();
      reduced.removeEventListener("change", syncPreference);
      finePointer.removeEventListener("change", syncPreference);
    };
  }, [pathname]);

  return null;
}
