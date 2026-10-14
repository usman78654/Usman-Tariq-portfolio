"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { Project } from "@/content/projects";
import { ProjectArt } from "./project-art";
import { architecture } from "@/content/architecture";
import { projectVideos } from "@/content/project-videos";
import { ProjectVideo } from "./project-video";
import { EngineeringWalkthrough } from "./engineering-walkthrough";

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
  const [repaired, setRepaired] = useState(false);
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
    <div
      className={`project-preview preview-${project.slug}`}
      data-preview-mode={inside ? "inside" : watching ? "video" : "surface"}
    >
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
        <div className="inside-panel surface-system-reveal">
          <span className="eyebrow">
            SIMPLIFIED ARCHITECTURE / INSPECT A COMPONENT
          </span>
          <EngineeringWalkthrough project={project} />
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
      ) : project.slug === "forgequeue" ? (
        <div className="forge-preview">
          <span className="eyebrow">REPORT WORKFLOW / ILLUSTRATION</span>
          <h3>Two inputs. One useful result.</h3>
          <ol
            className="forge-report-flow"
            aria-label="Report demo dependencies"
          >
            <li>
              <span>PARALLEL INPUTS</span>
              <strong>Read customers + read orders</strong>
            </li>
            <li>
              <span>WAIT FOR BOTH</span>
              <strong>Validate & aggregate</strong>
            </li>
            <li>
              <span>ONLY ON SUCCESS</span>
              <strong>Write Markdown report</strong>
            </li>
          </ol>
          <p className="preview-caption">
            The repository records five fixture orders totaling $485.00. Invalid
            input blocks the report. This diagram is not a live run.
          </p>
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
        <div className="document-demo" data-analyzed={analyzed}>
          <span className="eyebrow">
            INTERACTIVE ILLUSTRATION / FICTIONAL NOTICE
          </span>
          <div className="document-demo-columns">
            <div>
              <small>NORTHBRIDGE / SAMPLE NOTICE</small>
              <h3>A deadline buried in the details.</h3>
              <p>
                Please submit your renewal form by{" "}
                <mark className="source-deadline">20 November</mark>. Include
                proof of address. No payment is required for this sample notice.
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
                    <li className="deadline-result">Deadline: 20 November</li>
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
        <div className="claim-preview" data-repaired={repaired}>
          <span className="eyebrow">TARGETED REPAIR / ILLUSTRATION</span>
          <h3 className="claim-demo-title">Fix the claim. Keep the context.</h3>
          {interactive ? (
            <div className="claim-repair-demo">
              <div className="repair-example" aria-live="polite">
                <p>
                  <span>Orion publishes a product FAQ.</span>{" "}
                  <span
                    className="repaired-sentence"
                    key={repaired ? "after" : "before"}
                  >
                    {repaired
                      ? "The warranty lasts three years."
                      : "The warranty lasts two years."}
                  </span>{" "}
                  <span>Customers can read it before buying.</span>
                </p>
                <small>
                  {repaired
                    ? "Only the middle sentence changed; surrounding text stays identical."
                    : "The middle sentence conflicts with the source."}
                </small>
              </div>
              <p className="claim-source">
                <span>Source / README fixture</span>
                <strong>Three-year warranty in the FAQ.</strong>
              </p>
              <button
                type="button"
                className="button small"
                onClick={() => setRepaired(!repaired)}
              >
                {repaired ? "Reset repair example" : "Show targeted repair"}
              </button>
            </div>
          ) : (
            <div className="claim-static-example">
              <p>“Two-year warranty” → “Three-year warranty”</p>
              <p className="claim-source">
                Source / README fixture: three years in the FAQ.
              </p>
            </div>
          )}
          <span className="preview-caption">
            Fictional sample. Read the recorded report for the real run and its
            framing limitation.
          </span>
        </div>
      ) : (
        <ProjectArt project={project} />
      )}
    </div>
  );
}
