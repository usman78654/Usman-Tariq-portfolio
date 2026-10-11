"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
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
            slug: "cloudcrew",
            title: "CloudCrew",
            detail: "Failure → recovery",
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
    slugs: ["claimguard", "cloudcrew", "ecommerce-qa", "cross-browser-qa"],
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
  const selected = themes[theme];
  return (
    <section className="project-atlas" aria-label="Project atlas">
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
            onClick={() => setTheme(i)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <p className="atlas-description" role="status">
        {selected.text}
      </p>
      <div className="atlas-network">
        <div className="atlas-hub" aria-hidden="true">
          {selected.title}
          <span>↘</span>
        </div>
        <ul>
          {visible.map((project) => {
            const connected = selected.slugs.includes(project.slug);
            return (
              <li key={project.slug} data-connected={connected}>
                <span className="atlas-route" aria-hidden="true" />
                <Link href={`/projects/${project.slug}`}>
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
