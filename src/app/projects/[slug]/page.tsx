import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, repoUrl } from "@/content/projects";
import { cvs } from "@/content/profile";
import { ViewTransition } from "react";
import { ProjectPreview } from "@/components/project-preview";
import { CaseNav } from "@/components/case-nav";
import { projectScope, contributions } from "@/content/curation";
import { getSiteUrl } from "@/content/site-url";
import { projectVideos } from "@/content/project-videos";
import { ProjectVideo } from "@/components/project-video";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? {
        title: p.title,
        description: p.summary,
        alternates: getSiteUrl()
          ? { canonical: `/projects/${p.slug}` }
          : undefined,
        openGraph: {
          title: `${p.title} — Usman Tariq`,
          description: p.summary,
        },
      }
    : { title: "Project not found" };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const index = projects.indexOf(p);
  const next = projects[(index + 1) % projects.length];
  const cv = cvs.find((c) => c.focus === p.focus[0]);
  return (
    <main id="main" className="case-study">
      <section className="section case-hero">
        <Link href="/projects" className="text-link back-link">
          <ArrowLeft size={16} />
          All projects
        </Link>
        <div className="case-heading">
          <div>
            <span className="eyebrow">
              {p.category} / {p.status}
            </span>
            <h1>
              {p.title}
              <span>.</span>
            </h1>
            <p>{p.subtitle}</p>
          </div>
          <a
            className="button"
            href={repoUrl(p)}
            target="_blank"
            rel="noreferrer"
          >
            Explore the repository <ArrowUpRight size={18} />
          </a>
        </div>
        <ViewTransition
          name={`project-${p.slug}`}
          share="project-morph"
          default="none"
        >
          <ProjectPreview project={p} interactive />
        </ViewTransition>
        <div className="case-summary">
          <div>
            <span className="eyebrow">WHAT IT DOES</span>
            <p>{p.summary}</p>
          </div>
          <div>
            <span className="eyebrow">
              {contributions[p.slug]
                ? "MY CONTRIBUTION"
                : "WORK IN THIS REPOSITORY"}
            </span>
            <p>{contributions[p.slug] ?? projectScope[p.slug]}</p>
          </div>
          <div>
            <span className="eyebrow">THE INTERESTING DECISION</span>
            <p>{p.decisions[0].text}</p>
          </div>
          <div>
            <span className="eyebrow">START WITH THE EVIDENCE</span>
            <strong>{p.evidence[0].value}</strong>
            <p>{p.evidence[0].context}</p>
            <a href={`${repoUrl(p)}#readme`} target="_blank" rel="noreferrer">
              Inspect the source ↗
            </a>
          </div>
        </div>
        <div className="case-facts">
          <div>
            <span className="eyebrow">BUILT WITH</span>
            <div className="tags">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <span className="eyebrow">PROJECT TYPE</span>
            <p>{p.status}</p>
          </div>
          <div>
            <span className="eyebrow">START HERE</span>
            <a href={`${repoUrl(p)}#readme`} target="_blank" rel="noreferrer">
              README & setup <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <CaseNav />
      <section className="section case-story" id="overview">
        <div className="story-label">
          <span className="eyebrow">01 / THE IDEA</span>
          <h2>{p.subtitle}</h2>
        </div>
        <div className="story-body">
          <h3>The problem</h3>
          <p>{p.problem}</p>
          <h3>The approach</h3>
          <p>{p.solution}</p>
        </div>
      </section>
      <section className="section architecture-section" id="architecture">
        <span className="eyebrow">02 / THE SYSTEM AT A GLANCE</span>
        <h2>Follow the flow.</h2>
        <ol className="architecture-flow">
          {p.flow.map((s, i) => (
            <li key={s}>
              <span className="eyebrow">0{i + 1}</span>
              <strong>{s}</strong>
              {i < p.flow.length - 1 && (
                <ArrowRight size={19} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
        <p className="architecture-note">
          A simplified architecture overview. The repository documents the
          implementation details.
        </p>
      </section>
      {p.image && (
        <figure className="section evidence-image">
          <Image
            src={p.image}
            alt="CloudCrew task console showing queued work, workers, and persisted task history"
            width={1440}
            height={3147}
            sizes="(max-width: 760px) 100vw, 90vw"
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption>
            Actual console screenshot from the CloudCrew repository.
          </figcaption>
        </figure>
      )}
      <section className="section decisions-section" id="decisions">
        <span className="eyebrow">03 / THE ENGINEERING DECISIONS</span>
        <h2>Why it's built this way.</h2>
        <div className="decision-grid">
          {p.decisions.map((d, i) => (
            <article key={d.title}>
              <span>0{i + 1}</span>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section evidence-section" id="evidence">
        <span className="eyebrow">04 / WHAT TO LOOK AT</span>
        <h2>Evidence over adjectives.</h2>
        {projectVideos[p.slug] && (
          <ProjectVideo video={projectVideos[p.slug]} />
        )}
        <div className="evidence-grid">
          {p.evidence.map((e) => (
            <div key={e.label}>
              <span className="eyebrow">{e.label}</span>
              <strong>{e.value}</strong>
              <p>{e.context}</p>
            </div>
          ))}
        </div>
        <p className="source-note">
          Capabilities and result snapshots follow the project's current README,
          reviewed {p.slug === "mindplay" ? "October 11" : "October 10"}, 2026.{" "}
          <a href={`${repoUrl(p)}#readme`} target="_blank" rel="noreferrer">
            Read the source <ArrowUpRight size={14} />
          </a>
        </p>
        {p.links && (
          <div className="evidence-links">
            {p.links.map((l) => (
              <a
                key={l.path}
                href={`${repoUrl(p)}/${l.path.includes(".") ? "blob" : "tree"}/HEAD/${l.path}`}
                target="_blank"
                rel="noreferrer"
              >
                {l.label}
                <ArrowUpRight size={17} />
              </a>
            ))}
          </div>
        )}
      </section>
      <section className="section case-story limitations" id="lessons">
        <div className="story-label">
          <span className="eyebrow">05 / THE HONEST PART</span>
          <h2>What I'd improve next.</h2>
        </div>
        <div className="story-body">
          <h3>Current boundaries</h3>
          <ul>
            {p.limits.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <h3>The next iteration</h3>
          <p>{p.next}</p>
          {cv && (
            <a
              className="text-link"
              href={cv.href}
              target="_blank"
              rel="noreferrer"
            >
              Open my {cv.label} CV <ArrowUpRight size={17} />
            </a>
          )}
        </div>
      </section>
      <Link className="next-project section" href={`/projects/${next.slug}`}>
        <span className="eyebrow">KEEP EXPLORING</span>
        <div>
          <h2>{next.title}</h2>
          <ArrowUpRight size={55} />
        </div>
        <p>{next.subtitle}</p>
      </Link>
    </main>
  );
}
