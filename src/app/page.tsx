import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Download,
  GraduationCap,
} from "lucide-react";
import { ProjectExplorer } from "@/components/project-explorer";
import { Playground } from "@/components/playground";
import { profile, cvs, experience } from "@/content/profile";
import type { Metadata } from "next";
import { getSiteUrl } from "@/content/site-url";
import { CopyEmail, CVChooser } from "@/components/contact-actions";
import { BuildNotes } from "@/components/build-notes";
import { EngineeringLab } from "@/components/engineering-lab";
import {
  EngineeringDesk,
  PersonalSnapshots,
} from "@/components/signature-interactions";
import { HeroAtmosphere } from "@/components/hero-atmosphere";

export const metadata: Metadata = {
  alternates: getSiteUrl() ? { canonical: "/" } : undefined,
};

export default function Home() {
  return (
    <main id="main">
      <section className="hero section hero-editorial">
        <HeroAtmosphere />
        <div className="hero-top">
          <span className="eyebrow">
            <span className="status-dot" /> SOFTWARE ENGINEER / HUAWEI
          </span>
          <span className="hero-location">ISLAMABAD, PK · 33.69° N</span>
        </div>
        <div className="hero-content">
          <div className="hero-copy">
            <p className="hero-intro">Hey, I'm Usman Tariq.</p>
            <span className="signature-word" aria-hidden="true">
              USMAN
            </span>
            <h1>
              I make complex things
              <br />
              <span className="hero-last">
                <em>make sense.</em>
                <span className="hero-star" aria-hidden="true">
                  ✳
                </span>
              </span>
            </h1>
            <p className="hero-description">
              Useful software. Intelligent tools. Reliable systems.
              <br />A collection of things I've built, tested, and figured out.
            </p>
            <div className="hero-actions">
              <Link href="#work" className="button">
                Explore my work <ArrowDown size={18} />
              </Link>
              <CVChooser />
            </div>
          </div>
          <div className="hero-project-entry">
            <EngineeringDesk />
          </div>
        </div>
        <div className="hero-bottom">
          <span>AI / SOFTWARE / CLOUD / QUALITY</span>
          <Link href="#work">
            SCROLL TO EXPLORE <ArrowDown size={14} />
          </Link>
        </div>
      </section>
      <section id="work" className="section work-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / SELECTED WORK</span>
            <h2>
              Ideas, turned
              <br />
              into <em>working things.</em>
            </h2>
          </div>
          <p>
            Six selected projects. Explore a preview, then open the case study
            for the engineering and evidence.
          </p>
        </div>
        <ProjectExplorer compact />
      </section>
      <section className="approach section">
        <span className="eyebrow">02 / HOW I THINK</span>
        <h2>
          The interesting part is
          <br />
          usually <em>under the hood.</em>
        </h2>
        <div className="approach-grid">
          <div>
            <span>01</span>
            <h3>Start with a real problem.</h3>
            <p>
              Understand the person, the workflow, and the constraints before
              choosing the tools.
            </p>
          </div>
          <div>
            <span>02</span>
            <h3>Make the tradeoffs visible.</h3>
            <p>
              Explain the architecture, show the boundaries, and be clear about
              what a system can promise.
            </p>
          </div>
          <div>
            <span>03</span>
            <h3>Let the evidence speak.</h3>
            <p>
              Inspect results, document failures, and use testing to decide what
              needs to happen next.
            </p>
          </div>
        </div>
      </section>
      <Playground />
      <EngineeringLab />
      <BuildNotes />
      <section className="experience section" id="experience">
        <div className="section-heading">
          <div>
            <span className="eyebrow">03 / ALONG THE WAY</span>
            <h2>
              Real teams.
              <br />
              <em>Real problems.</em>
            </h2>
          </div>
          <p>
            Engineering work, operational challenges,
            <br />
            and a little visual storytelling along the way.
          </p>
        </div>
        <div className="experience-list">
          {experience.map((e, i) => (
            <details key={e.company} open={i === 0}>
              <summary>
                <span className="experience-year">{e.year}</span>
                <span className="experience-company">
                  {e.company}
                  <small>{e.role}</small>
                </span>
                <span className="details-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{e.text}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="about section" id="about">
        <div className="about-title">
          <span className="eyebrow">04 / THE HUMAN BIT</span>
          <h2>
            More than
            <br />a <em>tech stack.</em>
          </h2>
          <div className="about-monogram" aria-hidden="true">
            ut.
          </div>
        </div>
        <div className="about-copy">
          <p className="about-lead">
            I'm Usman, a software engineer who enjoys making difficult things
            easier to understand.
          </p>
          <p>
            At Huawei, I work on telecom analytics, KPI dashboards, and workflow
            automation. In my own projects, I explore everything from document
            intelligence and distributed agents to encrypted messaging and the
            quality of software.
          </p>
          <p>
            I graduated in Software Engineering from FAST in Islamabad. I like
            understanding why something works, finding where it doesn't, and
            making the next version better.
          </p>
          <div className="education-note">
            <GraduationCap size={22} />
            <div>
              <strong>FAST · Software Engineering</strong>
              <span>Graduate · 2022–2026 · Islamabad</span>
            </div>
          </div>
          <div className="about-details">
            <span>English & Urdu · Fluent</span>
            <span>German · Basic</span>
          </div>
          <div className="personal-notebook">
            <span className="eyebrow">THREADS IN MY PROJECTS</span>
            <p>
              Making AI outputs inspectable, building recoverable systems, and
              testing beyond the happy path.
            </p>
          </div>
          <PersonalSnapshots />
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            A little more about my background <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      <section className="resume section" id="resume">
        <div className="section-heading">
          <div>
            <span className="eyebrow">05 / FOR YOUR SHORTLIST</span>
            <h2>
              The right CV
              <br />
              for <em>your role.</em>
            </h2>
          </div>
          <p>
            One engineer. Different ways to look at the work.
            <br />
            Choose the version most relevant to your team.
          </p>
        </div>
        <div className="resume-grid">
          {cvs.map((cv, i) => (
            <a href={cv.href} download key={cv.focus} className="resume-card">
              <div>
                <span className="eyebrow">0{i + 1} / PDF CV</span>
                <Download size={20} />
              </div>
              <h3>{cv.label}</h3>
              <p>{cv.description}</p>
              <span className="text-link">
                Download CV <ArrowDown size={17} />
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="contact section" id="contact">
        <span className="eyebrow">HAVE SOMETHING IN MIND?</span>
        <a href={`mailto:${profile.email}`} className="contact-heading">
          Let's make
          <br />
          <em>something useful.</em>
          <ArrowUpRight className="contact-arrow" />
        </a>
        <div className="contact-bottom">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <CopyEmail />
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Connect on LinkedIn <ArrowUpRight size={18} />
          </a>
          <span>ISLAMABAD, PAKISTAN</span>
        </div>
      </section>
    </main>
  );
}
