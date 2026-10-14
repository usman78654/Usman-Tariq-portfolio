"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import {
  FileText,
  Gamepad2,
  Terminal,
  ArrowUpRight,
  BookOpen,
  Mic,
  FlaskConical,
} from "lucide-react";
import { type Project } from "@/content/projects";

export function EngineeringDesk() {
  const reduced = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <div
      className="engineering-desk"
      aria-label="Explore three engineering projects"
      onPointerMove={(event) => {
        if (reduced !== false || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((event.clientX - rect.left) / rect.width) * 8 - 4,
          y: ((event.clientY - rect.top) / rect.height) * -8 + 4,
        });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <span className="eyebrow">ON MY ENGINEERING DESK</span>
      <div
        className="desk-layers"
        style={
          {
            "--desk-x": `${tilt.x}deg`,
            "--desk-y": `${tilt.y}deg`,
          } as CSSProperties
        }
      >
        {[
          {
            slug: "clearstep",
            title: "ClearStep",
            detail: "Notice → next steps",
            Icon: FileText,
          },
          {
            slug: "forgequeue",
            title: "ForgeQueue",
            detail: "Jobs → durable workflows",
            Icon: Terminal,
          },
          {
            slug: "mindplay",
            title: "Mindplay",
            detail: "Inputs → game controls",
            Icon: Gamepad2,
          },
        ].map(({ slug, title, detail, Icon }) => (
          <Link key={slug} href={`/projects/${slug}`} className="desk-card">
            <Icon size={23} aria-hidden="true" />
            <strong>{title}</strong>
            <small>{detail}</small>
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}

const hobbies = [
  {
    title: "Perfume collecting",
    Icon: FlaskConical,
    line: "A collection beyond the code.",
  },
  {
    title: "Gaming",
    Icon: Gamepad2,
    line: "Away from the editor, into another world.",
  },
  {
    title: "Reading",
    Icon: BookOpen,
    line: "A good book has my attention, too.",
  },
  { title: "Singing", Icon: Mic, line: "A different kind of creative outlet." },
];
export function PersonalSnapshots() {
  const [index, setIndex] = useState(0);
  const { title, Icon, line } = hobbies[index];
  return (
    <div className="personal-snapshots" aria-label="Outside the IDE">
      <span className="eyebrow">
        OUTSIDE THE IDE / {index + 1} OF {hobbies.length}
      </span>
      <div className="snapshot-stack">
        <div
          className="snapshot-card"
          key={title}
          aria-live="polite"
          aria-atomic="true"
        >
          <Icon size={32} aria-hidden="true" />
          <h3>{title}</h3>
          <p>{line}</p>
        </div>
      </div>
      <div className="snapshot-controls">
        <button
          type="button"
          onClick={() =>
            setIndex((index + hobbies.length - 1) % hobbies.length)
          }
        >
          Previous interest
        </button>
        <button
          type="button"
          onClick={() => setIndex((index + 1) % hobbies.length)}
        >
          Next interest →
        </button>
      </div>
      <span className="snapshot-note">
        Perfume collecting · Gaming · Reading · Singing
      </span>
    </div>
  );
}

const themes = [
  {
    title: "Reliability",
    text: "Inspect outputs, recover from failures, test the unhappy path.",
    slugs: [
      "claimguard",
      "forgequeue",
      "cloudcrew",
      "ecommerce-qa",
      "cross-browser-qa",
    ],
  },
  {
    title: "AI & interaction",
    text: "Turn complex inputs into something a person can use.",
    slugs: ["clearstep", "claimguard", "mindplay", "edime", "rag-pipeline"],
  },
  {
    title: "Security",
    text: "Make trust boundaries explicit rather than invisible.",
    slugs: ["cipherrelay"],
  },
];
export function ProjectAtlas({ visible }: { visible: Project[] }) {
  const [theme, setTheme] = useState(0);
  const [hasTraced, setHasTraced] = useState(false);
  const [focusedProject, setFocusedProject] = useState<string | null>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef(new Map<string, HTMLLIElement>());
  const [geometry, setGeometry] = useState({
    width: 1,
    height: 1,
    routes: [] as { slug: string; path: string; x: number; y: number }[],
  });
  const selected = themes[theme];
  const projectKey = visible.map((project) => project.slug).join("|");
  const connectedCount = visible.filter((project) =>
    selected.slugs.includes(project.slug),
  ).length;

  useEffect(() => {
    const network = networkRef.current;
    const hub = hubRef.current;
    if (!network || !hub) return;
    let frame = 0;
    const measure = () => {
      const bounds = network.getBoundingClientRect();
      const center = hub.getBoundingClientRect();
      const hubX = center.left - bounds.left + center.width / 2;
      const hubY = center.top - bounds.top + center.height / 2;
      const routes = Array.from(projectRefs.current.entries()).map(
        ([slug, element]) => {
          const node = element.getBoundingClientRect();
          const onRight = node.left - bounds.left + node.width / 2 > hubX;
          const startX = onRight
            ? center.right - bounds.left
            : center.left - bounds.left;
          const endX = onRight
            ? node.left - bounds.left
            : node.right - bounds.left;
          const endY = node.top - bounds.top + node.height / 2;
          const bend = (startX + endX) / 2;
          return {
            slug,
            path: `M ${startX} ${hubY} C ${bend} ${hubY}, ${bend} ${endY}, ${endX} ${endY}`,
            x: endX,
            y: endY,
          };
        },
      );
      setGeometry({ width: bounds.width, height: bounds.height, routes });
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(network);
    observer.observe(hub);
    projectRefs.current.forEach((element) => observer.observe(element));
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [projectKey, theme]);

  return (
    <section
      className="project-atlas"
      aria-label="Project atlas"
      data-theme={theme}
    >
      <div className="atlas-intro">
        <span className="eyebrow">
          PROJECT ATLAS / CONNECTIONS, NOT RANKINGS
        </span>
        <h3>Different projects. Shared thinking.</h3>
        <p>
          Choose a theme to trace its connections. These are editorial
          groupings, not skill scores.
        </p>
      </div>
      <div
        className="atlas-themes"
        role="group"
        aria-label="Explore project themes"
      >
        {themes.map((item, i) => (
          <button
            type="button"
            key={item.title}
            aria-pressed={i === theme}
            onClick={() => {
              setTheme(i);
              setHasTraced(true);
            }}
          >
            {item.title}
          </button>
        ))}
      </div>
      <p className="atlas-description" role="status">
        {selected.text}{" "}
        <span>{connectedCount} connected in this selection.</span>
      </p>
      <div className="atlas-network" ref={networkRef}>
        <svg
          className="atlas-connectors"
          viewBox={`0 0 ${geometry.width} ${geometry.height}`}
          aria-hidden="true"
          focusable="false"
        >
          {geometry.routes.map((route, index) => {
            const connected = selected.slugs.includes(route.slug);
            return (
              <g
                key={`${theme}-${route.slug}`}
                data-connected={connected}
                data-focused={route.slug === focusedProject}
                data-trace={hasTraced && connected}
                style={{ "--route-delay": `${index * 45}ms` } as CSSProperties}
              >
                <path className="atlas-line-base" d={route.path} />
                {connected && (
                  <path
                    className="atlas-line-active"
                    d={route.path}
                    pathLength={1}
                  />
                )}
                <circle
                  className="atlas-endpoint"
                  cx={route.x}
                  cy={route.y}
                  r={3}
                />
              </g>
            );
          })}
        </svg>
        <div className="atlas-hub" ref={hubRef} aria-hidden="true">
          <span className="atlas-hub-kicker">SHARED THINKING</span>
          <strong key={selected.title}>{selected.title}</strong>
          <span className="atlas-hub-count">{connectedCount} connections</span>
        </div>
        <ul aria-label="Projects connected by engineering themes">
          {visible.map((project, index) => {
            const connected = selected.slugs.includes(project.slug);
            return (
              <li
                key={project.slug}
                data-connected={connected}
                ref={(element) => {
                  if (element) projectRefs.current.set(project.slug, element);
                  else projectRefs.current.delete(project.slug);
                }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  onPointerEnter={() => setFocusedProject(project.slug)}
                  onPointerLeave={() => setFocusedProject(null)}
                  onFocus={() => setFocusedProject(project.slug)}
                  onBlur={() => setFocusedProject(null)}
                >
                  <span className="atlas-node-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{project.title}</strong>
                  <small>
                    {connected
                      ? `Connected to ${selected.title}`
                      : "Explore another thread"}
                  </small>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {!visible.some((project) => selected.slugs.includes(project.slug)) && (
        <p>
          No projects in this filtered selection match that theme. Try All work.
        </p>
      )}
      <p className="snapshot-note">
        Use Cards view for previews, recordings, and interactive walkthroughs.
      </p>
    </section>
  );
}
