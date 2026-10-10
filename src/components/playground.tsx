"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, ChevronRight, Network } from "lucide-react";

const stages = [
  {
    title: "Submit a task",
    text: "The supervisor validates the request and places the task in a durable database queue.",
    event: "task.accepted",
    node: 0,
  },
  {
    title: "A worker claims it",
    text: "An available worker claims the task with a lease. Other workers can pick up other jobs.",
    event: "lease.acquired",
    node: 1,
  },
  {
    title: "Imagine the worker stops",
    text: "The task stays in the database. After its lease expires, another worker can reclaim it.",
    event: "lease.expired",
    node: 2,
  },
  {
    title: "Another worker takes over",
    text: "The new attempt gets a fencing token. A stale worker cannot overwrite this attempt's saved result.",
    event: "task.reclaimed",
    node: 3,
  },
  {
    title: "The result is saved",
    text: "The result and lifecycle events are persisted. This is at-least-once execution: external calls may have happened more than once.",
    event: "result.persisted",
    node: 4,
  },
];
export function Playground() {
  const [step, setStep] = useState(0);
  const [scenario, setScenario] = useState("crash");
  const stage =
    scenario === "stale" && step === 4
      ? {
          ...stages[4],
          title: "The stale write is rejected",
          text: "Worker 01 returns after Worker 02 has reclaimed the task. Its old fencing token cannot overwrite the newer attempt's result.",
          event: "stale_write.rejected",
        }
      : stages[step];
  return (
    <section
      className="playground section"
      id="playground"
      aria-labelledby="playground-heading"
    >
      <div className="playground-intro">
        <span className="eyebrow">A LITTLE HANDS-ON</span>
        <h2 id="playground-heading">
          What happens
          <br />
          when a worker
          <br /> <em>disappears?</em>
        </h2>
        <p>
          Good systems plan for the awkward bits. Walk through the idea behind
          CloudCrew's job recovery.
        </p>
        <Link href="/projects/cloudcrew" className="text-link">
          Go deeper into CloudCrew <ArrowRight size={17} />
        </Link>
      </div>
      <div className="simulation">
        <div className="simulation-top">
          <span>
            <span className="status-dot" />
            JOB RECOVERY
          </span>
          <span>ILLUSTRATIVE WALKTHROUGH</span>
        </div>
        <div
          className="simulation-map"
          aria-label="Task moves from supervisor through durable queue and two workers to a saved result"
        >
          {["Supervisor", "Queue", "Worker 01", "Worker 02", "Result"].map(
            (n, i) => (
              <div
                className={`sim-node ${stage.node === i ? "active" : ""} ${step >= 2 && i === 2 && !(scenario === "stale" && step === 4) ? "stopped" : ""}`}
                key={n}
              >
                <Network size={22} />
                <span>{n}</span>
                {i === 2 && step >= 2 && (
                  <small>
                    {scenario === "stale" && step === 4
                      ? "stale attempt"
                      : "offline"}
                  </small>
                )}
              </div>
            ),
          )}
        </div>
        <div
          className="scenario-picker"
          role="group"
          aria-label="Worker failure scenario"
        >
          <button
            aria-pressed={scenario === "crash"}
            onClick={() => {
              setScenario("crash");
              setStep(0);
            }}
          >
            Worker crash
          </button>
          <button
            aria-pressed={scenario === "stale"}
            onClick={() => {
              setScenario("stale");
              setStep(0);
            }}
          >
            Stale worker returns
          </button>
        </div>
        <div className="simulation-detail" aria-live="polite">
          <span className="sim-event">
            0{step + 1} / 05 · {stage.event}
          </span>
          <h3>{stage.title}</h3>
          <p>{stage.text}</p>
        </div>
        <div className="simulation-actions">
          <button
            className="text-link"
            onClick={() => setStep(0)}
            disabled={step === 0}
          >
            <RotateCcw size={15} />
            Reset
          </button>
          <div className="step-dots" aria-hidden="true">
            {stages.map((_, i) => (
              <span className={i <= step ? "filled" : ""} key={i} />
            ))}
          </div>
          <button
            className="button small"
            onClick={() => setStep((s) => Math.min(s + 1, stages.length - 1))}
            disabled={step === stages.length - 1}
          >
            {step === stages.length - 1 ? "Walkthrough complete" : "Next step"}
            <ChevronRight size={16} />
          </button>
        </div>
        <p className="simulation-note">
          An interactive explanation, not a live backend connection.
        </p>
      </div>
    </section>
  );
}
