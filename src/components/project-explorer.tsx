"use client";

import Link from "next/link";
import { useEffect, useState, ViewTransition } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowRight, Search } from "lucide-react";
import { projects, archivedWork, type Project } from "@/content/projects";
import { focuses, cvs, type Focus } from "@/content/profile";
import { ProjectPreview } from "./project-preview";
import { projectOrder } from "@/content/curation";
import { ProjectAtlas } from "./signature-interactions";

function validFocus(value: string | null): Focus {
  return focuses.some((f) => f.id === value) ? (value as Focus) : "all";
}
export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  return (
    <article
      className={`project-card ${featured && index === 0 ? "flagship-card" : ""} ${featured && index === 3 ? "story-card" : ""}`}
    >
      {featured ? (
        <ViewTransition
          name={`project-${project.slug}`}
          share="project-morph"
          default="none"
        >
          <ProjectPreview project={project} interactive />
        </ViewTransition>
      ) : (
        <Link
          href={`/projects/${project.slug}`}
          className="project-visual-link"
          aria-label={`Explore ${project.title}`}
        >
          <ViewTransition
            name={`project-${project.slug}`}
            share="project-morph"
            default="none"
          >
            <ProjectPreview project={project} />
          </ViewTransition>
          <span className="card-arrow">
            <ArrowUpRight size={24} />
          </span>
        </Link>
      )}
      <div className="project-info">
        <div className="project-eyebrow">
          <span>
            0{index + 1} / {project.category}
          </span>
          <span>{project.status}</span>
        </div>
        <Link href={`/projects/${project.slug}`} className="project-title-link">
          <ViewTransition
            name={`project-title-${project.slug}`}
            share="project-title-morph"
            default="none"
          >
            <h3>{project.title}</h3>
          </ViewTransition>
          <ArrowUpRight size={25} />
        </Link>
        <p>{project.summary}</p>
        <div
          className="tags"
          aria-label="Selected technologies; full stack in case study"
        >
          {project.stack.slice(0, 3).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ProjectExplorer({ compact = false }: { compact?: boolean }) {
  const [focus, setFocus] = useState<Focus>("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"cards" | "atlas">("cards");
  const reduced = useReducedMotion();
  useEffect(() => {
    const sync = () =>
      setFocus(validFocus(new URLSearchParams(location.search).get("focus")));
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  function choose(value: Focus) {
    setFocus(value);
    const url = new URL(location.href);
    if (value === "all") url.searchParams.delete("focus");
    else url.searchParams.set("focus", value);
    window.history.pushState({}, "", url.pathname + url.search + url.hash);
  }
  const filtered = projects
    .filter(
      (p) =>
        (focus === "all" || p.focus.includes(focus)) &&
        `${p.title} ${p.summary} ${p.stack.join(" ")}`
          .toLowerCase()
          .includes(search.toLowerCase()),
    )
    .sort(
      (a, b) =>
        (projectOrder[focus].indexOf(a.slug) < 0
          ? 99
          : projectOrder[focus].indexOf(a.slug)) -
        (projectOrder[focus].indexOf(b.slug) < 0
          ? 99
          : projectOrder[focus].indexOf(b.slug)),
    );
  const visible = compact && focus === "all" ? filtered.slice(0, 6) : filtered;
  const cv = cvs.find((c) => c.focus === focus);
  const archive = archivedWork.filter((p) =>
    `${p.title} ${p.category}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="explorer">
      <div className="explorer-controls">
        <div
          className="collection-view"
          role="group"
          aria-label="Project collection view"
        >
          <button
            type="button"
            aria-pressed={view === "cards"}
            onClick={() => setView("cards")}
          >
            Cards
          </button>
          <button
            type="button"
            aria-pressed={view === "atlas"}
            onClick={() => setView("atlas")}
          >
            Map view
          </button>
        </div>
        <div
          className="filter-tabs"
          role="group"
          aria-label="Filter projects by role"
        >
          {focuses.map((f) => (
            <button
              type="button"
              key={f.id}
              aria-pressed={focus === f.id}
              onClick={() => choose(f.id)}
            >
              {focus === f.id && (
                <motion.span
                  className="filter-indicator"
                  layoutId="role-filter-indicator"
                  transition={{ duration: reduced ? 0 : 0.2 }}
                  aria-hidden="true"
                />
              )}
              <span className="filter-label">{f.label}</span>
            </button>
          ))}
        </div>
        {!compact && (
          <label className="search-field">
            <Search size={17} />
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              placeholder="Find a project or technology"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        )}
        <p
          className="filter-result-count"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <strong>{visible.length}</strong>{" "}
          {visible.length === 1 ? "project" : "projects"} shown
        </p>
      </div>
      {cv && (
        <div className="cv-recommendation">
          Exploring {cv.label.toLowerCase()}?{" "}
          <a href={cv.href} target="_blank" rel="noreferrer">
            Open the matching CV <ArrowUpRight size={15} />
          </a>
        </div>
      )}
      {visible.length && view === "atlas" ? (
        <ProjectAtlas visible={visible} />
      ) : visible.length ? (
        <div className={`project-grid ${compact ? "curated-grid" : ""}`}>
          {visible.map((p, i) => (
            <motion.div
              layout="position"
              transition={{ duration: reduced ? 0 : 0.24 }}
              key={p.slug}
              className={compact && (i === 0 || i === 3) ? "wide-project" : ""}
            >
              <ProjectCard project={p} index={i} featured={compact} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No projects match that search.</h3>
          <p>Try another technology or explore all work.</p>
          <button
            className="button secondary"
            onClick={() => {
              setSearch("");
              choose("all");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
      {compact ? (
        <div className="explorer-bottom">
          <span>There's more where that came from.</span>
          <Link
            href={`/projects${focus !== "all" ? `?focus=${focus}` : ""}`}
            className="text-link"
          >
            Explore the full collection <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        focus === "all" && (
          <section className="archive">
            <div className="section-heading">
              <div>
                <span className="eyebrow">THE REST OF THE NOTEBOOK</span>
                <h2>More experiments.</h2>
              </div>
              <p>
                Smaller builds, coursework, and ideas in progress.
                <br />
                Explore the repositories for their current scope.
              </p>
            </div>
            <div className="archive-list">
              {archive.map((p, i) => (
                <a
                  href={`https://github.com/usman78654/${p.repo}`}
                  target="_blank"
                  rel="noreferrer"
                  key={p.repo}
                >
                  <span className="archive-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <strong>{p.title}</strong>
                  <span className="archive-category">{p.category}</span>
                  <ArrowUpRight size={19} />
                </a>
              ))}
            </div>
          </section>
        )
      )}
    </div>
  );
}
