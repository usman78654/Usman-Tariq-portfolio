"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Project } from "@/content/projects";
import { walkthroughs } from "@/content/walkthroughs";

export function EngineeringWalkthrough({ project }: { project: Project }) {
  const steps = walkthroughs[project.slug];
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const stage = steps[index];

  useEffect(() => {
    if (!playing) return;
    if (reduced || index === steps.length - 1) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(
      () => setIndex((i) => Math.min(i + 1, steps.length - 1)),
      2600,
    );
    return () => window.clearTimeout(timer);
  }, [playing, index, reduced, steps.length]);

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    const observer = window.IntersectionObserver
      ? new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) setPlaying(false);
        })
      : null;
    if (ref.current) observer?.observe(ref.current);
    return () => {
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="engineering-walkthrough"
      role="region"
      aria-label={`${project.title} engineering walkthrough`}
      data-started={started}
    >
      <p className="walkthrough-caption">
        ILLUSTRATIVE EXPLANATION / NOT A LIVE SYSTEM
      </p>
      <ol className="walkthrough-flow" aria-label="Simplified system flow">
        {project.flow.map((node, i) => (
          <li
            key={node}
            className={`walk-node ${stage.node === i ? "is-active" : ""}`}
            aria-current={stage.node === i ? "step" : undefined}
          >
            <span className="walk-node-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <strong>{node}</strong>
            {project.slug === "mindplay" && i === 1 && (
              <div className="parallel-inputs" aria-label="Parallel detectors">
                <span>EEG / FBCSP + LDA</span>
                <span>Blink detector</span>
                <span>Gyroscope</span>
                <small>PARALLEL INPUTS → ONE ARBITRATION POINT</small>
              </div>
            )}
            {i < project.flow.length - 1 && (
              <svg
                className="walk-connector"
                viewBox="0 0 60 16"
                aria-hidden="true"
              >
                <path
                  className="connector-track"
                  d="M2 8 H52 M45 2 L52 8 L45 14"
                />
                <path
                  className="connector-signal"
                  d="M2 8 H52 M45 2 L52 8 L45 14"
                  pathLength="1"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
      <div className="walkthrough-detail" aria-live="polite" aria-atomic="true">
        <span className="eyebrow">
          STEP {index + 1} / {steps.length}
          {playing ? " · PLAYING" : ""}
        </span>
        <h4>{stage.title}</h4>
        <p>{stage.text}</p>
      </div>
      <div
        className="walkthrough-controls"
        role="group"
        aria-label="Explanation playback"
      >
        <button
          type="button"
          className="button small secondary"
          disabled={Boolean(reduced)}
          onClick={() => {
            if (playing) setPlaying(false);
            else {
              if (index === steps.length - 1) setIndex(0);
              setStarted(true);
              setPlaying(true);
            }
          }}
        >
          {playing ? "Pause explanation" : "Play explanation"}
        </button>
        <button
          type="button"
          className="button small"
          disabled={index === steps.length - 1}
          onClick={() => {
            setPlaying(false);
            setStarted(true);
            setIndex((i) => i + 1);
          }}
        >
          {index === steps.length - 1 ? "Explanation complete" : "Next step"}
        </button>
        <button
          type="button"
          className="text-link"
          disabled={!started && index === 0}
          onClick={() => {
            setPlaying(false);
            setStarted(false);
            setIndex(0);
          }}
        >
          Reset explanation
        </button>
      </div>
      {reduced && (
        <p className="walkthrough-caption">
          Reduced motion is enabled. Use Next step to read the explanation at
          your own pace.
        </p>
      )}
    </div>
  );
}
