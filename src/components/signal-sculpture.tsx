"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMotionPreference } from "./use-motion-preference";
import { ArrowUpRight, Pause, Play, RotateCcw, Zap } from "lucide-react";

type Point = { x: number; y: number; z: number };
const rows = 13;
const columns = 28;
const forms = [
  {
    name: "Signal",
    description:
      "A flowing ribbon: complex inputs, before a useful shape emerges.",
    caption: "COMPLEX INPUTS",
    link: "/projects/clearstep",
    cta: "From paperwork to next steps",
    color: "196,245,98",
  },
  {
    name: "Structure",
    description:
      "A connected sphere: individual pieces become a coherent whole.",
    caption: "CONNECTED THINKING",
    link: "/projects/claimguard",
    cta: "Inspect the reasoning",
    color: "137,232,212",
  },
  {
    name: "System",
    description:
      "A layered lattice: connections matter as much as the individual nodes.",
    caption: "RELIABLE CONNECTIONS",
    link: "/projects/cloudcrew",
    cta: "Explore failure and recovery",
    color: "194,174,255",
  },
];

function pointFor(index: number, mode: number): Point {
  const row = Math.floor(index / columns);
  const column = index % columns;
  const u = column / (columns - 1);
  const v = row / (rows - 1);
  if (mode === 0)
    return {
      x: (u - 0.5) * 2.5,
      y: Math.sin(u * Math.PI * 3 + v * 2.2) * 0.4 + (v - 0.5) * 0.35,
      z: (v - 0.5) * 1.4,
    };
  if (mode === 1) {
    const latitude = (v * 0.94 + 0.03) * Math.PI;
    const longitude = u * Math.PI * 2;
    return {
      x: Math.sin(latitude) * Math.cos(longitude),
      y: Math.cos(latitude),
      z: Math.sin(latitude) * Math.sin(longitude),
    };
  }
  return {
    x: (u - 0.5) * 2,
    y: (v - 0.5) * 1.65,
    z: Math.sin(u * Math.PI * 2) * 0.22 + Math.cos(v * Math.PI * 2) * 0.22,
  };
}

export function SignalSculpture() {
  const [mode, setMode] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const reduced = useMotionPreference();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const current = useRef<Point[]>(
    Array.from({ length: rows * columns }, (_, i) => pointFor(i, 0)),
  );
  const command = useRef<(kind: "pulse" | "reset") => void>(() => {});
  const orientation = useRef(-0.38);
  const form = forms[mode];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context || reduced === null) return;
    if (reduced && playing) setPlaying(false);
    setReady(true);
    let frame = 0;
    let visible = false;
    let disposed = false;
    let width = 1;
    let height = 1;
    let last = 0;
    let started = 0;
    let activeUntil = 0;
    let pulseStart = -10000;
    let angle = orientation.current;
    let pointer = { x: 0, y: 0 };
    let eased = { x: 0, y: 0 };
    let lens: { x: number; y: number } | null = null;
    let draws = 0;
    const target = Array.from({ length: rows * columns }, (_, i) =>
      pointFor(i, mode),
    );
    const rgb = forms[mode].color;

    function schedule(duration = 800) {
      if (disposed || document.hidden || !visible) return;
      activeUntil = performance.now() + (reduced ? 0 : duration);
      if (!frame) frame = requestAnimationFrame(draw);
    }
    function draw(now: number) {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      const delta = Math.min(32, now - (last || now));
      last = now;
      if (playing && !reduced) {
        if (!started) started = now;
        if (now - started >= 20000) {
          setPlaying(false);
          return;
        }
        angle += delta * 0.00017;
        orientation.current = angle;
      }
      eased.x += (pointer.x - eased.x) * 0.12;
      eased.y += (pointer.y - eased.y) * 0.12;
      context!.clearRect(0, 0, width, height);
      const scale = Math.min(width * 0.31, height * 0.4);
      const yaw = angle + (reduced ? 0 : eased.x * 0.28);
      const pitch = -0.25 + (reduced ? 0 : eased.y * 0.18);
      const pulseAge = (now - pulseStart) / 1500;
      const projected = current.current.map((point, i) => {
        const desired = target[i];
        const ease = reduced ? 1 : 1 - Math.exp(-delta / 115);
        point.x += (desired.x - point.x) * ease;
        point.y += (desired.y - point.y) * ease;
        point.z += (desired.z - point.z) * ease;
        const x = point.x * Math.cos(yaw) - point.z * Math.sin(yaw);
        const z = point.x * Math.sin(yaw) + point.z * Math.cos(yaw);
        const y = point.y * Math.cos(pitch) - z * Math.sin(pitch);
        const depth = point.y * Math.sin(pitch) + z * Math.cos(pitch);
        const perspective = 3.8 / (3.8 + depth);
        const distance = Math.sqrt(point.x ** 2 + point.y ** 2 + point.z ** 2);
        const wave =
          pulseAge >= 0 && pulseAge < 1.6
            ? Math.exp(-((distance - pulseAge * 2.4) ** 2) * 22)
            : 0;
        const screenX = width / 2 + x * scale * perspective * (1 + wave * 0.05);
        const screenY =
          height / 2 + y * scale * perspective * (1 + wave * 0.05);
        const inspection = lens
          ? Math.exp(
              -((screenX - lens.x) ** 2 + (screenY - lens.y) ** 2) / 6500,
            )
          : 0;
        return {
          x: screenX,
          y: screenY,
          depth,
          glow: Math.max(wave, inspection * 0.8),
        };
      });
      context!.lineWidth = 0.7;
      projected.forEach((point, i) => {
        for (const next of [
          i % columns < columns - 1 ? i + 1 : -1,
          i + columns < projected.length ? i + columns : -1,
        ]) {
          if (next < 0) continue;
          const end = projected[next];
          const opacity =
            0.12 + (1 - (point.depth + 1.3) / 2.6) * 0.16 + point.glow * 0.45;
          context!.strokeStyle = `rgba(${rgb},${Math.max(0.08, Math.min(0.8, opacity))})`;
          context!.beginPath();
          context!.moveTo(point.x, point.y);
          context!.lineTo(end.x, end.y);
          context!.stroke();
        }
      });
      projected
        .sort((a, b) => b.depth - a.depth)
        .forEach((point) => {
          const opacity = 0.32 + (1 - (point.depth + 1.3) / 2.6) * 0.6;
          context!.fillStyle = `rgba(${rgb},${Math.min(1, opacity + point.glow)})`;
          context!.beginPath();
          context!.arc(
            point.x,
            point.y,
            1.2 + point.glow * 2.3,
            0,
            Math.PI * 2,
          );
          context!.fill();
        });
      // A finite signal ring, not a benchmark or actual project data.
      if (!reduced && pulseAge >= 0 && pulseAge < 1) {
        context!.strokeStyle = `rgba(${rgb},${(1 - pulseAge) * 0.45})`;
        context!.lineWidth = 1;
        context!.beginPath();
        context!.ellipse(
          width / 2,
          height / 2,
          Math.max(1, pulseAge * scale * 1.6),
          Math.max(1, pulseAge * scale * 0.5),
          -0.2,
          0,
          Math.PI * 2,
        );
        context!.stroke();
      }
      if (lens && !reduced) {
        context!.strokeStyle = `rgba(${rgb},0.3)`;
        context!.lineWidth = 0.75;
        // Only the sculpture has an inspection lens. Never replace the site cursor.
        context!.beginPath();
        context!.roundRect(lens.x - 44, lens.y - 44, 88, 88, 10);
        context!.stroke();
      }
      canvas!.dataset.draws = String(++draws);
      canvas!.dataset.running = String(
        !reduced && (playing || now < activeUntil),
      );
      if (!reduced && (playing || now < activeUntil))
        frame = requestAnimationFrame(draw);
    }
    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(width * ratio);
      canvas!.height = Math.round(height * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      schedule();
    }
    function move(event: PointerEvent) {
      if (reduced || event.pointerType !== "mouse") return;
      const rect = canvas!.getBoundingClientRect();
      lens = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      pointer = {
        x: ((event.clientX - rect.left) / width) * 2 - 1,
        y: ((event.clientY - rect.top) / height) * 2 - 1,
      };
      schedule(700);
    }
    function leave() {
      lens = null;
      pointer = { x: 0, y: 0 };
      schedule(700);
    }
    function visibility() {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        canvas!.dataset.running = "false";
        setPlaying(false);
      } else schedule();
    }
    command.current = (kind) => {
      if (kind === "reset") {
        lens = null;
        angle = -0.38;
        orientation.current = angle;
        pointer = { x: 0, y: 0 };
        eased = { x: 0, y: 0 };
        pulseStart = -10000;
      } else pulseStart = performance.now();
      schedule(kind === "pulse" ? 1800 : 900);
    };
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible) schedule(1100);
        else {
          cancelAnimationFrame(frame);
          frame = 0;
          canvas!.dataset.running = "false";
          setPlaying(false);
        }
      },
      { threshold: 0.15 },
    );
    intersection.observe(canvas);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    resize();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      intersection.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      canvas.dataset.running = "false";
      command.current = () => {};
    };
  }, [mode, playing, reduced]);

  return (
    <section className="signal-studio section" aria-labelledby="signal-heading">
      <div className="signal-studio-copy">
        <span className="eyebrow">A LITTLE CREATIVE ENGINEERING</span>
        <h2 id="signal-heading">
          Complexity,
          <br />
          <em>with a shape.</em>
        </h2>
        <p>
          Move your mouse. Change the form. Send a pulse.
          <br />A little visual expression of how I like to think.
        </p>
        <span className="signal-boundary">
          INTERACTIVE ART / NOT PROJECT TELEMETRY
        </span>
        <Link href="#work" className="text-link">
          Skip to the projects <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="signal-instrument" data-form={form.name.toLowerCase()}>
        <div className="signal-instrument-top">
          <span>UT / SIGNAL STUDIO</span>
          <span>{form.caption}</span>
        </div>
        <div className="signal-viewport">
          <svg
            className="signal-fallback"
            viewBox="0 0 600 400"
            aria-hidden="true"
            data-ready={ready}
          >
            <g fill="none" stroke="#c4f562" strokeWidth="0.7" opacity="0.65">
              {Array.from({ length: 9 }, (_, i) => (
                <ellipse
                  key={i}
                  cx="300"
                  cy="200"
                  rx={25 + i * 17}
                  ry="150"
                  transform={`rotate(${i * 20} 300 200)`}
                />
              ))}
            </g>
          </svg>
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="signal-canvas"
          />
          <span className="signal-coordinate" aria-hidden="true">
            {String(mode + 1).padStart(2, "0")} / {form.name.toUpperCase()}
          </span>
        </div>
        <div
          className="signal-form-controls"
          role="group"
          aria-label="Choose sculpture form"
        >
          {forms.map((item, i) => (
            <button
              type="button"
              key={item.name}
              aria-pressed={i === mode}
              disabled={!ready}
              onClick={() => {
                setMode(i);
                setPlaying(false);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="signal-actions">
          <button
            type="button"
            disabled={!ready}
            onClick={() => {
              setPulseCount((value) => value + 1);
              command.current("pulse");
            }}
          >
            <Zap size={16} aria-hidden="true" />
            Send a pulse
          </button>
          <button
            type="button"
            disabled={!ready || reduced !== false}
            onClick={() => setPlaying(!playing)}
          >
            {playing ? (
              <Pause size={16} aria-hidden="true" />
            ) : (
              <Play size={16} aria-hidden="true" />
            )}
            {playing ? "Pause sculpture" : "Animate for 20s"}
          </button>
          <button
            type="button"
            disabled={!ready}
            onClick={() => {
              setPlaying(false);
              setMode(1);
              setPulseCount(0);
              command.current("reset");
            }}
            aria-label="Reset sculpture"
          >
            <RotateCcw size={16} aria-hidden="true" />
          </button>
        </div>
        <p className="signal-description" role="status" aria-atomic="true">
          {form.description}
          {pulseCount > 0 ? ` Pulse ${pulseCount} sent.` : ""}
          {ready && reduced
            ? " Reduced motion: static forms, no rotation or pulse movement."
            : ""}
        </p>
        <Link className="signal-project-link" href={form.link}>
          {form.cta}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

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
