"use client";
import Link from "next/link";
import { useState } from "react";

const passages = [
  {
    title: "Queue durability",
    text: "A task is stored in PostgreSQL before a worker claims it. A worker crash does not erase the task.",
    tokens: ["queue", "task", "database", "stored", "durability"],
  },
  {
    title: "Lease recovery",
    text: "When a worker stops, its lease expires. Another worker can reclaim the task with a new fencing token.",
    tokens: ["worker", "crash", "recovery", "lease", "expires", "stops"],
  },
  {
    title: "Execution guarantee",
    text: "At-least-once execution means an external call can happen twice. Fencing protects the saved database result, not every external side effect.",
    tokens: ["twice", "external", "once", "fencing", "guarantee"],
  },
];
export function EngineeringLab() {
  const [mode, setMode] = useState("retrieval");
  const [question, setQuestion] = useState("What happens when a worker stops?");
  const [searched, setSearched] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [tested, setTested] = useState(false);
  const terms: string[] = question.toLowerCase().match(/[a-z]+/g) ?? [];
  const ranked = passages
    .map((p) => ({
      ...p,
      score: p.tokens.filter((t) => terms.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score);
  return (
    <section className="section engineering-lab" aria-labelledby="lab-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">TWO MORE SMALL EXPERIMENTS</span>
          <h2 id="lab-heading">
            Don't just read.
            <br />
            <em>Inspect the behavior.</em>
          </h2>
        </div>
        <p>
          Local, fictional fixtures. No account,
          <br />
          backend, or model API required.
        </p>
      </div>
      <div className="lab-shell">
        <div
          className="lab-tabs"
          role="group"
          aria-label="Choose engineering experiment"
        >
          <button
            aria-pressed={mode === "retrieval"}
            onClick={() => setMode("retrieval")}
          >
            Retrieval inspection
          </button>
          <button aria-pressed={mode === "qa"} onClick={() => setMode("qa")}>
            Seeded QA bug
          </button>
        </div>
        {mode === "retrieval" ? (
          <div className="lab-content">
            <span className="eyebrow">
              LIVE BROWSER-LOCAL LEXICAL MATCHING / NOT A FULL RAG MODEL
            </span>
            <h3>See which passage earns its place.</h3>
            <label className="lab-question">
              Sample question
              <input
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  setSearched(false);
                }}
              />
            </label>
            <div className="lab-actions">
              <button
                className="button small"
                onClick={() => setSearched(true)}
              >
                Retrieve passages
              </button>
              <button
                className="text-link"
                onClick={() => {
                  setQuestion("What happens when a worker stops?");
                  setSearched(false);
                }}
              >
                Reset retrieval
              </button>
            </div>
            <div className="retrieval-results" aria-live="polite">
              {searched ? (
                ranked[0].score === 0 ? (
                  <p>
                    No lexical matches. No answer is fabricated; try “worker” or
                    “external”.
                  </p>
                ) : (
                  ranked
                    .filter((p) => p.score > 0)
                    .map((p) => (
                      <article key={p.title}>
                        <span className="eyebrow">
                          {p.score} MATCHED TERM{p.score > 1 ? "S" : ""}
                        </span>
                        <h4>{p.title}</h4>
                        <p>{p.text}</p>
                      </article>
                    ))
                )
              ) : (
                <p>
                  Three short sample passages. Ranking uses exact matching
                  terms, not embeddings or an LLM. Inspect the source before
                  trusting an answer.
                </p>
              )}
            </div>
            <Link className="text-link" href="/projects/rag-pipeline">
              Explore the actual local RAG project ↗
            </Link>
          </div>
        ) : (
          <div className="lab-content">
            <span className="eyebrow">
              SEEDED SIMULATION / FICTIONAL CUSTOMERS / NO NETWORK REQUEST
            </span>
            <h3>Logged in does not mean authorized.</h3>
            <div className="qa-fixture">
              <div>
                <span>Authenticated customer</span>
                <strong>Customer A</strong>
              </div>
              <div>
                <span>Requested resource</span>
                <strong>Customer B's order</strong>
              </div>
              <div>
                <span>Ownership check</span>
                <strong>{fixed ? "Enforced" : "Missing (seeded bug)"}</strong>
              </div>
            </div>
            <div className="lab-actions">
              <button className="button small" onClick={() => setTested(true)}>
                Run ownership test
              </button>
              <button
                className="text-link"
                onClick={() => {
                  setFixed(!fixed);
                  setTested(false);
                }}
              >
                {fixed ? "Restore seeded bug" : "Apply ownership check"}
              </button>
              <button
                className="text-link"
                onClick={() => {
                  setFixed(false);
                  setTested(false);
                }}
              >
                Reset QA
              </button>
            </div>
            <div
              className={`test-verdict ${tested ? (fixed ? "pass" : "fail") : ""}`}
              aria-live="polite"
            >
              {tested ? (
                fixed ? (
                  <>
                    <strong>PASS · 403 Forbidden</strong>
                    <p>
                      Customer A cannot read Customer B's order. The expected
                      denial is enforced in this local simulation.
                    </p>
                  </>
                ) : (
                  <>
                    <strong>
                      FAIL · 200 OK exposes another customer's order
                    </strong>
                    <p>
                      Expected: 403. Actual: 200. Missing ownership enforcement
                      makes authentication alone insufficient. Release
                      recommendation: No-Go.
                    </p>
                  </>
                )
              ) : (
                <p>
                  Run the test, inspect the failure, then enable the ownership
                  check and retest.
                </p>
              )}
            </div>
            <pre className="test-snippet">
              <code>
                {
                  "expect(response.status).toBe(403);\nexpect(response.body).not.toContain(otherCustomerOrder);"
                }
              </code>
            </pre>
            <Link className="text-link" href="/projects/ecommerce-qa">
              See the actual assessment and evidence ↗
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
