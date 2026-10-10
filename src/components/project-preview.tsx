"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { Project } from "@/content/projects";
import { ProjectArt } from "./project-art";
import { architecture } from "@/content/architecture";
import { projectVideos } from "@/content/project-videos";
import { ProjectVideo } from "./project-video";

export function ProjectPreview({
  project,
  interactive = false,
}: {
  project: Project;
  interactive?: boolean;
}) {
  const [inside, setInside] = useState(false);
  const [watching, setWatching] = useState(false);
  const video = projectVideos[project.slug];
  const [selected, setSelected] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);
  const id = useId();
  const components = architecture[project.slug] ?? project.decisions;
  const media =
    project.slug === "cloudcrew"
      ? "/projects/cloudcrew-console.png"
      : project.slug === "ecommerce-qa"
        ? "/projects/proshop-qa.png"
        : project.slug === "mindplay"
          ? "/projects/mindplay-poster.png"
          : null;
  return (
    <div className={`project-preview preview-${project.slug}`}>
      {interactive && (
        <div
          className="preview-toolbar"
          role="group"
          aria-label={`${project.title} preview mode`}
        >
          <button
            aria-pressed={!inside && !watching}
            onClick={() => {
              setInside(false);
              setWatching(false);
            }}
          >
            Preview
          </button>
          <button
            aria-pressed={inside}
            onClick={() => {
              setInside(true);
              setWatching(false);
            }}
          >
            Look inside <span aria-hidden="true">↗</span>
          </button>
          {video && (
            <button
              aria-pressed={watching}
              onClick={() => {
                setInside(false);
                setWatching(true);
              }}
            >
              Watch video
            </button>
          )}
        </div>
      )}
      {watching && video ? (
        <ProjectVideo video={video} />
      ) : inside ? (
        <div className="inside-panel">
          <span className="eyebrow">
            SIMPLIFIED ARCHITECTURE / INSPECT A COMPONENT
          </span>
          <ol className="inside-flow">
            {project.flow.map((node, i) => (
              <li key={node}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {node}
              </li>
            ))}
          </ol>
          <div
            className="inside-buttons"
            role="group"
            aria-label="Inspect components and tradeoffs"
          >
            {components.map((d, i) => (
              <button
                key={d.title}
                aria-pressed={selected === i}
                aria-controls={id}
                onClick={() => setSelected(i)}
              >
                {d.title}
              </button>
            ))}
          </div>
          <div id={id} className="inside-explanation" aria-live="polite">
            <h3>{components[selected].title}</h3>
            <p>{components[selected].text}</p>
          </div>
        </div>
      ) : media ? (
        <figure className="real-preview">
          <Image
            src={media}
            alt={
              project.slug === "cloudcrew"
                ? "Actual CloudCrew console showing task and worker state"
                : project.slug === "mindplay"
                  ? "Illustrated Mindplay headset calibration from the supplied animated walkthrough"
                  : "ProShop storefront used in the QA assessment"
            }
            width={1440}
            height={
              project.slug === "cloudcrew"
                ? 3147
                : project.slug === "mindplay"
                  ? 768
                  : 1300
            }
            sizes="(max-width: 760px) 100vw, 70vw"
          />
          <figcaption>
            {project.slug === "mindplay"
              ? "ANIMATED WORKFLOW ILLUSTRATION · NOT LIVE FOOTAGE"
              : "ACTUAL REPOSITORY SCREENSHOT"}
            {project.slug === "ecommerce-qa"
              ? " · THIRD-PARTY APPLICATION"
              : ""}
          </figcaption>
        </figure>
      ) : project.slug === "clearstep" && interactive ? (
        <div className="document-demo">
          <span className="eyebrow">
            INTERACTIVE ILLUSTRATION / FICTIONAL NOTICE
          </span>
          <div className="document-demo-columns">
            <div>
              <small>NORTHBRIDGE / SAMPLE NOTICE</small>
              <h3>A deadline buried in the details.</h3>
              <p>
                Please submit your renewal form by 20 November. Include proof of
                address. No payment is required for this sample notice.
              </p>
              <button
                className="button small"
                onClick={() => setAnalyzed(!analyzed)}
              >
                {analyzed ? "Reset sample" : "Reveal the checklist"}
              </button>
            </div>
            <div className="demo-checklist" aria-live="polite">
              <span>YOUR NEXT STEPS</span>
              {analyzed ? (
                <>
                  <h3>A little clearer.</h3>
                  <ul>
                    <li>Submit the renewal form</li>
                    <li>Attach proof of address</li>
                    <li>Deadline: 20 November</li>
                  </ul>
                  <p>Source: the fictional notice shown alongside.</p>
                </>
              ) : (
                <>
                  <h3>From dense text to a clear next step.</h3>
                  <p>
                    Try the sample. No upload, model call, or personal data.
                  </p>
                </>
              )}
            </div>
          </div>
          <p className="preview-caption">
            A browser-local explanation of the workflow, not the running
            ClearStep application.
          </p>
        </div>
      ) : project.slug === "claimguard" ? (
        <div className="claim-preview">
          <span className="eyebrow">ILLUSTRATION / README FIXTURE</span>
          <div className="claim-line">
            <span>ARTICLE CLAIM</span>
            <strong>“two-year warranty”</strong>
            <span className="verdict">CONTRADICTED</span>
          </div>
          <div className="claim-line">
            <span>DOCUMENTED SOURCE</span>
            <strong>Three-year warranty in the FAQ</strong>
            <span className="verdict source">CHECK THE QUOTE</span>
          </div>
          <p>
            Repair only the failing sentence.
            <br />
            Keep the rest byte-identical.
          </p>
          <span className="preview-caption">
            Read the recorded report for the real run and its known framing
            limitation.
          </span>
        </div>
      ) : (
        <ProjectArt project={project} />
      )}
    </div>
  );
}
