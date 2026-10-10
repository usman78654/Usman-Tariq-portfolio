import {
  ArrowRight,
  Check,
  FileText,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectArt({ project }: { project: Project }) {
  return (
    <div
      className={`project-art art-${project.visual} tone-${project.color}`}
      aria-hidden="true"
    >
      <div className="art-grid" />
      <span className="art-label">{project.category} / concept diagram</span>
      {project.visual === "document" && (
        <div className="document-scene">
          <div className="paper-back">
            <FileText size={25} />
            <span>OFFICIAL NOTICE</span>
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="paper-front">
            <div className="paper-title">
              <Sparkles size={20} />
              <strong>A clear next step.</strong>
            </div>
            <p>Your document, made understandable.</p>
            {[
              "Find the important dates",
              "Understand what's required",
              "Make an action plan",
            ].map((t) => (
              <div className="paper-task" key={t}>
                <span>
                  <Check size={13} />
                </span>
                {t}
              </div>
            ))}
            <div className="paper-bottom">
              Clarity, without the clutter. <ArrowRight size={15} />
            </div>
          </div>
        </div>
      )}
      {project.visual === "cloud" && (
        <div className="cloud-scene">
          <div className="node supervisor">
            <Network size={23} />
            <span>SUPERVISOR</span>
          </div>
          <div className="node queue">
            DURABLE QUEUE <span>claim · lease · persist</span>
          </div>
          <div className="workers">
            {[1, 2, 3].map((n) => (
              <div className="node worker" key={n}>
                <span className="status-dot" />
                WORKER 0{n}
                <small>Ready for the next task</small>
              </div>
            ))}
          </div>
          <span className="cloud-caption">
            Independent workers. Shared state.
          </span>
        </div>
      )}
      {project.visual === "cipher" && (
        <div className="cipher-scene">
          <div className="cipher-ring">
            <LockKeyhole size={48} strokeWidth={1.2} />
          </div>
          <div className="cipher-line">a8f2 · 90bc · e173 · 5d4a</div>
          <div className="cipher-pills">
            <span>BROWSER</span>
            <ArrowRight size={18} />
            <span>CIPHERTEXT</span>
            <ArrowRight size={18} />
            <span>RELAY</span>
          </div>
          <p>Content encrypted before it leaves.</p>
        </div>
      )}
      {project.visual === "qa" && (
        <div className="qa-scene">
          <div className="qa-heading">
            <ShieldCheck size={25} />
            <span>RELEASE CONFIDENCE</span>
          </div>
          {[
            "Critical user journeys",
            "Browser & viewport coverage",
            "Accessible interactions",
          ].map((t, i) => (
            <div className="qa-row" key={t}>
              <span>0{i + 1}</span>
              <strong>{t}</strong>
              <Check size={19} />
            </div>
          ))}
          <div className="qa-footer">
            <span className="status-dot" />
            Evidence before assumptions.
          </div>
        </div>
      )}
      {project.visual === "research" && (
        <div className="research-scene">
          <div className="sample-grid">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} style={{ "--cell": i } as React.CSSProperties} />
            ))}
          </div>
          <div className="research-caption">
            <Sparkles size={17} />
            <span>Generate. Explain. Evaluate.</span>
          </div>
        </div>
      )}
      {project.visual === "rag" && (
        <div className="rag-scene">
          <div className="rag-question">What do the documents say?</div>
          <div className="rag-source">
            <FileText size={21} />
            <span>Retrieve relevant context</span>
            <span className="rag-index">01 / 03</span>
          </div>
          <div className="rag-answer">
            <Sparkles size={23} />
            <p>
              An answer grounded
              <br />
              in your knowledge base.
            </p>
            <span>DOCUMENTS → CONTEXT → ANSWER</span>
          </div>
        </div>
      )}
      <span className="art-index">UT / ENGINEERING LAB</span>
    </div>
  );
}
