export type WalkthroughStep = { node: number; title: string; text: string };
const step = (node: number, title: string, text: string): WalkthroughStep => ({
  node,
  title,
  text,
});

// Illustrative explanations based on the reviewed case-study content, not runs.
export const walkthroughs: Record<string, WalkthroughStep[]> = {
  forgequeue: [
    step(
      0,
      "Describe the dependencies",
      "Submit a workflow graph. In the report example, customers and orders are independent roots; aggregation waits for both.",
    ),
    step(
      1,
      "Commit work and delivery intent",
      "PostgreSQL stores the workflow, ready jobs, and outbox records transactionally. A broker outage does not erase the accepted work.",
    ),
    step(
      2,
      "Publish a delivery signal",
      "The outbox relay sends job IDs to RabbitMQ with publisher confirms. Retried publication can produce duplicates; PostgreSQL guards the claim.",
    ),
    step(
      3,
      "Run a typed handler",
      "Workers claim with a renewable lease and fencing token. The report handlers validate their inputs; permanent validation errors bypass retries.",
    ),
    step(
      4,
      "Release only ready steps",
      "A successful fenced result supplies dependent-step inputs. The documented fixture produces a Markdown report; an invalid customer blocks reporting.",
    ),
    step(
      4,
      "Keep the guarantee precise",
      "This is an illustrative explanation, not a running worker or a benchmark. At-least-once execution means external side effects may repeat.",
    ),
  ],
  clearstep: [
    step(
      0,
      "Start with a document",
      "Use the fictional notice to explain the workflow without uploading personal information.",
    ),
    step(
      1,
      "Extract in the browser",
      "PDF text extraction and image OCR happen locally. Scanned-PDF OCR remains incomplete.",
    ),
    step(
      2,
      "Validate the analysis",
      "Structured output is checked, with a bounded repair attempt and an explicitly labelled fallback. This explanation does not call a model.",
    ),
    step(
      3,
      "Surface the next action",
      "An extracted deadline becomes an actionable checklist item with a connection back to the source notice.",
    ),
  ],
  claimguard: [
    step(
      0,
      "Preserve sentence identity",
      "Stable sentence IDs allow the pipeline to identify exactly which part of an article needs attention.",
    ),
    step(
      1,
      "Check atomic claims",
      "Deterministic gates catch unsupported values and other failures before relying on a model's verdict.",
    ),
    step(
      2,
      "Inspect the quoted evidence",
      "In the README fixture, the article says two years while the source FAQ says three. Verification must point to the quote.",
    ),
    step(
      3,
      "Repair only the failure",
      "Only the failing sentence is eligible for repair; untouched sentences must stay byte-identical. Unresolved claims require review.",
    ),
    step(
      4,
      "Keep the audit",
      "The report records the claim, evidence, and repair outcome. This is an illustration, not a new verification run.",
    ),
  ],
  cloudcrew: [
    step(
      0,
      "Submit the request",
      "A client asks the supervisor to run a task.",
    ),
    step(
      1,
      "Validate and orchestrate",
      "The supervisor checks the request and coordinates work rather than tying it to one worker's memory.",
    ),
    step(
      2,
      "Persist before execution",
      "The durable database queue retains the task even when a worker disappears.",
    ),
    step(
      3,
      "Claim with a lease",
      "Worker 01 claims a task with a lease. Ownership is temporary, not a promise that the worker will finish.",
    ),
    step(
      3,
      "A worker stops",
      "After the lease expires, the task can be reclaimed. The persisted task does not vanish with the worker.",
    ),
    step(
      3,
      "Recover with a new attempt",
      "Worker 02 receives a new fencing token. The stale attempt cannot overwrite the newer saved result.",
    ),
    step(
      4,
      "Save the fenced result",
      "At-least-once execution remains the boundary: an external call may happen twice even though a stale database result is rejected.",
    ),
  ],
  cipherrelay: [
    step(
      0,
      "Compose in the browser",
      "Plaintext begins at the sender. Identity trust still needs attention, especially on first contact.",
    ),
    step(
      1,
      "Encrypt before sending",
      "AES-GCM protects content in the browser. Static identity keys do not provide forward secrecy.",
    ),
    step(
      2,
      "Relay ciphertext",
      "The server transports encrypted content, but routing, timing, and other metadata remain visible.",
    ),
    step(
      3,
      "Decrypt at the recipient",
      "The recipient browser decrypts content. Independently checking fingerprints strengthens first-contact trust.",
    ),
  ],
  mindplay: [
    step(
      0,
      "Acquire the headset stream",
      "Smarting EEG and motion signals arrive through LSL; channel order, units, and calibration must match the trained setup.",
    ),
    step(
      1,
      "Three parallel input branches",
      "Motor imagery uses FBCSP/LDA; intentional blinks and gyroscope motion have separate detectors. These are parallel inputs, not three sequential classifiers.",
    ),
    step(
      2,
      "Arbitrate commands",
      "Input branches converge on command arbitration so competing detections do not issue unrelated commands simultaneously.",
    ),
    step(
      3,
      "Apply a shared cooldown",
      "Refractory periods, consecutive predictions, and shared cooldown address accidental or repeated activation.",
    ),
    step(
      4,
      "Send a game command",
      "Keyboard controls and a live overlay complete the prototype. The animation does not establish clinical usefulness or across-user accuracy.",
    ),
  ],
  "cross-browser-qa": [
    step(
      0,
      "Choose critical journeys",
      "Start with user journeys on third-party Swag Labs, not a claim of authorship of the application.",
    ),
    step(
      1,
      "Make coverage explicit",
      "Map rendering engines and installed browser coverage. WebKit execution does not establish real Safari coverage.",
    ),
    step(
      2,
      "Run automated checks",
      "Use expected-failure handling for known seeded defects. An unexpected pass should trigger review of the stale defect record.",
    ),
    step(
      3,
      "Preserve failure context",
      "Trace, screenshots, and video help explain a failure. This walkthrough is not a new browser test execution.",
    ),
    step(
      4,
      "Assess remaining risk",
      "Release readiness connects evidence to unresolved risk; inspect CI artifacts before claiming a published run passed.",
    ),
  ],
  "ecommerce-qa": [
    step(
      0,
      "Define expected behavior",
      "Requirements establish what should happen in the third-party ProShop application.",
    ),
    step(
      1,
      "Design traceable tests",
      "Connect critical user journeys to test cases so coverage can be inspected.",
    ),
    step(
      2,
      "Execute and record",
      "Manual and API testing supply observed outcomes. Not Run cases are not silently counted as passing.",
    ),
    step(
      3,
      "Collect defect evidence",
      "Recorded steps and artifacts make defects reproducible and help distinguish severity from visual polish.",
    ),
    step(
      4,
      "Make the No-Go decision",
      "The case study's release assessment follows the recorded defects and remaining coverage gaps, not an animated success badge.",
    ),
  ],
  edime: [
    step(
      0,
      "Start with PathMNIST",
      "The pipeline uses a research benchmark, not patient-specific clinical deployment.",
    ),
    step(
      1,
      "Generate conditionally",
      "Conditional diffusion explores synthetic images; convincing appearance alone does not establish utility.",
    ),
    step(
      2,
      "Inspect the samples",
      "Mode collapse and low structural fidelity remain recorded outcomes, not problems hidden by the animation.",
    ),
    step(
      3,
      "Examine explanations",
      "Grad-CAM and Integrated Gradients help inspect influential regions and failures.",
    ),
    step(
      4,
      "Evaluate honestly",
      "Compare image metrics with downstream classifier performance. These proxies do not establish clinical validity.",
    ),
  ],
  "rag-pipeline": [
    step(
      0,
      "Ingest PDFs",
      "Start with a concrete document collection, such as the project's handbook use case.",
    ),
    step(
      1,
      "Represent document content",
      "Sentence embeddings make document content searchable by semantic similarity.",
    ),
    step(
      2,
      "Retrieve relevant context",
      "FAISS selects context from the index before a model answers the question.",
    ),
    step(
      3,
      "Use local inference",
      "Ollama supplies local inference; the real application still requires a configured model and suitable hardware.",
    ),
    step(
      4,
      "Check the answer",
      "Retrieved context does not guarantee factuality. A repeatable grounding evaluation is an opportunity for improvement.",
    ),
  ],
};
