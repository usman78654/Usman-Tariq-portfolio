import type { Focus } from "./profile";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: string;
  focus: Focus[];
  stack: string[];
  repo: string;
  color: string;
  visual: "document" | "cloud" | "cipher" | "qa" | "research" | "rag";
  status: string;
  problem: string;
  solution: string;
  decisions: { title: string; text: string }[];
  evidence: { label: string; value: string; context: string }[];
  limits: string[];
  next: string;
  flow: string[];
  links?: { label: string; path: string }[];
  image?: string;
};
export const projects: Project[] = [
  {
    slug: "claimguard",
    title: "ClaimGuard",
    subtitle: "Check the claim. Preserve the rest.",
    summary:
      "A verification pipeline that checks generated articles against sources, repairs only failing sentences, and leaves an inspectable audit trail.",
    category: "AI reliability",
    focus: ["software"],
    stack: ["Python", "Gemini", "Lexical retrieval", "pytest"],
    repo: "Claimguard-Prototype",
    color: "lime",
    visual: "rag",
    status: "Recorded prototype",
    problem:
      "Generated content can contain plausible but unsupported numbers, invented experience, and contradictions. Another model's confident verdict is not enough to establish evidence.",
    solution:
      "ClaimGuard segments an existing article, extracts atomic claims, applies deterministic gates, verifies quoted evidence, and selectively repairs failing sentences. Unchanged sentences must remain byte-identical; unresolved claims are routed to a person.",
    decisions: [
      {
        title: "Verify the verifier",
        text: "Evidence quotes must literally occur in the named source. A verdict without a valid quote is downgraded to UNSUPPORTED in code.",
      },
      {
        title: "Bound the repair",
        text: "Each failing sentence gets at most two repair attempts. Rewrites are re-verified; unaffected sentences are protected by a byte-identity assertion.",
      },
      {
        title: "Keep simple work deterministic",
        text: "Phrase-pattern and orphan-figure gates avoid model calls. IDF-weighted lexical retrieval is deliberately sufficient for the four-document fixture.",
      },
    ],
    evidence: [
      {
        label: "Repair budget",
        value: "2 attempts",
        context: "Maximum per failing sentence, not an unbounded agent loop.",
      },
      {
        label: "Recorded evidence",
        value: "Full audit trail",
        context:
          "Committed report, repaired article, and claim-level JSON from a real Gemini run.",
      },
      {
        label: "Test fixture",
        value: "6 planted failures",
        context:
          "Authored sample includes a deliberately unfixable manufacturing claim; this is not a production benchmark.",
      },
    ],
    limits: [
      "The first-person blocklist can miss unsupported experiential framing; a recorded rewrite exposes this limitation.",
      "All recorded end-to-end runs used Gemini. The configured Anthropic path has not been exercised end to end.",
      "The small authored fixture does not establish general factual accuracy or production-scale retrieval quality.",
    ],
    next: "Require explicit source attribution for experiential claims and evaluate a broader independently collected corpus.",
    flow: [
      "Stable sentence IDs",
      "Atomic claims & gates",
      "Quoted verification",
      "Bounded repair",
      "Audit report",
    ],
    links: [
      { label: "Recorded diff and report", path: "out/report.md" },
      { label: "Claim-level audit", path: "out/claims.json" },
      {
        label: "Offline pipeline tests",
        path: "tests/test_pipeline_offline.py",
      },
    ],
  },
  {
    slug: "clearstep",
    title: "ClearStep",
    subtitle: "Less paperwork. More clarity.",
    summary:
      "A document assistant that turns dense notices into clear summaries, cited facts, and actionable checklists.",
    category: "Product engineering",
    focus: ["software"],
    stack: ["Next.js", "TypeScript", "OCR", "Ollama"],
    repo: "Product-ClearStep-an-AI-navigator-for-essential-paperwork",
    color: "lime",
    visual: "document",
    status: "Demo-ready MVP",
    problem:
      "A letter can contain an important deadline, a fee, and a required action, all buried in dense language. The challenge is making that information usable without sending uploaded documents to an external service.",
    solution:
      "ClearStep extracts text in the browser, then produces validated summaries, cited facts, and checklists. A bundled fictional notice makes the experience easy to try; optional local inference uses Qwen through Ollama.",
    decisions: [
      {
        title: "Extract locally",
        text: "PDF text extraction and image OCR happen in the browser. Only extracted text is sent to the application's API; the original file is not uploaded to the server.",
      },
      {
        title: "Validate the output",
        text: "Zod checks the structured response. Invalid model output gets one repair attempt before the application falls back to explicitly labeled demo analysis.",
      },
      {
        title: "Make the demo dependable",
        text: "A deterministic sample flow works without a model or paid API. It is labeled as demo mode, with conservative extraction for unfamiliar documents.",
      },
    ],
    evidence: [
      {
        label: "Upload boundary",
        value: "10 MB",
        context: "File-size limit documented in the README.",
      },
      {
        label: "Model setup",
        value: "Optional",
        context: "The bundled sample runs without Ollama.",
      },
      {
        label: "Persistence",
        value: "On device",
        context:
          "One recent structured analysis is stored in browser localStorage.",
      },
    ],
    limits: [
      "Scanned PDFs do not yet have a page-to-image OCR path.",
      "OCR currently supports English and downloads language data on first use.",
      "The deterministic sample is richer than analysis of arbitrary documents.",
    ],
    next: "Add scanned-PDF OCR, more languages, and document-specific evaluation suites.",
    flow: [
      "Your document",
      "Browser extraction",
      "Validated analysis",
      "Action checklist",
    ],
  },
  {
    slug: "cloudcrew",
    title: "CloudCrew",
    subtitle: "Give agents a reliable place to work.",
    summary:
      "A distributed task platform where independent workers claim durable jobs, run agents, and persist results.",
    category: "Distributed systems",
    focus: ["cloud", "software"],
    stack: ["FastAPI", "PostgreSQL", "Docker", "LangGraph"],
    repo: "CloudCrew",
    color: "blue",
    visual: "cloud",
    status: "Locally validated",
    image: "/projects/cloudcrew-console.png",
    problem:
      "Agent execution needs more than an API call. Jobs must survive restarts, retries need boundaries, and a worker that loses ownership must not overwrite a newer result.",
    solution:
      "A stateless supervisor accepts authenticated submissions. PostgreSQL serves as a durable queue while worker processes lease jobs, route them to plugins, record lifecycle events, and persist results.",
    decisions: [
      {
        title: "One database, two responsibilities",
        text: "PostgreSQL stores jobs and results and also acts as the queue. SKIP LOCKED supports independent workers without introducing a separate broker for this small deployment.",
      },
      {
        title: "Recover with leases and fencing",
        text: "Expired leases can be reclaimed. A fencing token prevents an old attempt from replacing a newer persisted result. Retries are bounded and eventually reach a terminal dead state.",
      },
      {
        title: "Be honest about execution",
        text: "Execution is at least once. Result fencing cannot undo an external provider call. Mock responses are labeled; cloud-provider errors enter the retry policy rather than becoming mock successes.",
      },
    ],
    evidence: [
      {
        label: "Execution",
        value: "At least once",
        context: "The documented reliability model, not an exactly-once claim.",
      },
      {
        label: "Queue",
        value: "Durable",
        context: "Tasks, results, and events survive API restarts.",
      },
      {
        label: "Demo mode",
        value: "No paid API",
        context: "Deterministic mock mode is explicit; Gemini is optional.",
      },
    ],
    limits: [
      "The README states that this project has not been deployed to a public cloud account.",
      "SQLite is for single-host development; PostgreSQL supports replica deployments.",
      "Stored history is not automatically sent to external models.",
    ],
    next: "Measure a real cloud deployment and compare worker scaling under a representative workload.",
    flow: [
      "API client",
      "Supervisor",
      "Durable queue",
      "Worker agents",
      "Saved result",
    ],
    links: [
      { label: "Reliability model", path: "docs/ARCHITECTURE.md" },
      { label: "Validation record", path: "docs/VALIDATION.md" },
      { label: "Recruiter walkthrough", path: "docs/DEMO.md" },
    ],
  },
  {
    slug: "cipherrelay",
    title: "CipherRelay",
    subtitle: "Private content. Visible engineering.",
    summary:
      "Educational encrypted chat and file sharing, packaged with reproducible deployment and operational tooling.",
    category: "Security & operations",
    focus: ["cloud", "software"],
    stack: ["React", "Web Crypto", "Socket.IO", "Docker"],
    repo: "CipherRelay-secure-real-time-messaging-and-file-relay",
    color: "purple",
    visual: "cipher",
    status: "Educational security project",
    problem:
      "An encrypted messenger needs both a content-security boundary and an understandable operational setup. Deployment, recovery, and identity trust all affect what the system can actually promise.",
    solution:
      "Messages and files are encrypted in the browser. The application combines authenticated WebSockets with a single-host Docker deployment, Caddy HTTPS routing, metrics, logs, and backup/restore tooling.",
    decisions: [
      {
        title: "Encrypt in the browser",
        text: "AES-256-GCM protects message and file content. Conversation keys are derived using P-256 ECDH and HKDF-SHA-256; private identity keys are non-exportable CryptoKey objects in IndexedDB.",
      },
      {
        title: "Pin peer identity",
        text: "Trust-on-first-use fingerprints block later identity-key changes. This protects subsequent contacts but leaves the first-contact key substitution limitation explicit.",
      },
      {
        title: "Include operations",
        text: "The repository includes health/readiness endpoints, private Prometheus metrics, Grafana provisioning, immutable-tag rollback commands, and backup/restore verification.",
      },
    ],
    evidence: [
      {
        label: "Content encryption",
        value: "AES-256-GCM",
        context: "Browser-side messages and files.",
      },
      {
        label: "Deployment",
        value: "Reproducible",
        context: "Docker Compose and Caddy routing.",
      },
      {
        label: "Observability",
        value: "Built in",
        context: "Metrics, logs, alerts, and Grafana configuration.",
      },
    ],
    limits: [
      "Static identity ECDH means the protocol has no forward secrecy.",
      "The server can see metadata including participants, timestamps, file names, and sizes.",
      "There is no multi-device key transfer or recovery; clearing browser storage makes existing ciphertext unreadable there.",
      "This is an educational design, not an independently audited production messenger.",
    ],
    next: "Explore a reviewed protocol with forward secrecy and a deliberate device/key-recovery design.",
    flow: [
      "Sender browser",
      "Encrypted content",
      "Relay server",
      "Recipient browser",
    ],
    links: [
      { label: "Security boundary", path: "SECURITY.md" },
      { label: "Operations runbook", path: "docs/RUNBOOK.md" },
      { label: "Validation record", path: "docs/VALIDATION.md" },
    ],
  },
  {
    slug: "cross-browser-qa",
    title: "Across the browsers",
    subtitle: "Same journey. Different engines.",
    summary:
      "A testing portfolio that connects exploratory findings, browser coverage, and Playwright evidence to release decisions.",
    category: "Test automation",
    focus: ["qa"],
    stack: ["Playwright", "JavaScript", "Accessibility", "GitHub Actions"],
    repo: "playwright-cross-browser-sqa-portfolio",
    color: "orange",
    visual: "qa",
    status: "Testing portfolio",
    problem:
      "A checkout flow working in one browser is not enough. Layouts, validation, accessibility, and slow-resource behavior can fail differently across browsers and devices.",
    solution:
      "The project tests Sauce Labs' Swag Labs application using a compatibility matrix, exploratory artifacts, and Playwright automation across Chromium, Firefox, installed Edge, and mobile/tablet layouts.",
    decisions: [
      {
        title: "Trace tests to risk",
        text: "Test IDs connect automation to the compatibility matrix. Defects include reproducible evidence; a release-readiness report communicates coverage and unresolved risk.",
      },
      {
        title: "Preserve failures",
        text: "Screenshots, videos, and traces attach to failed runs. CI publishes evidence even when the suite fails so findings remain inspectable.",
      },
      {
        title: "Track known defects explicitly",
        text: "Seeded defects use expected-failure handling. An unexpected pass prompts removal of a stale record. Rendering-engine tests do not stand in for branded Safari coverage.",
      },
    ],
    evidence: [
      {
        label: "Evidence",
        value: "Trace + video",
        context: "Failure artifacts preserve steps and browser context.",
      },
      {
        label: "Scope",
        value: "Cross-browser",
        context: "Chromium, Firefox, and explicit installed Edge execution.",
      },
      {
        label: "Decision",
        value: "Risk based",
        context:
          "A release-readiness report connects results to remaining risk.",
      },
    ],
    limits: [
      "Swag Labs is third-party software; the contribution showcased is the testing work.",
      "Real Safari needs a macOS runner and remains a coverage opportunity.",
      "The remote CI result must be inspected before claiming that a published run passed.",
    ],
    next: "Extend branded Safari coverage and use repeated critical-path runs to investigate flakiness.",
    flow: [
      "User journeys",
      "Browser matrix",
      "Automated checks",
      "Failure evidence",
      "Release decision",
    ],
    links: [
      { label: "Compatibility matrix", path: "docs/compatibility-matrix.md" },
      { label: "Release assessment", path: "docs/release-readiness.md" },
      { label: "Defect reports", path: "docs/defects" },
    ],
  },
  {
    slug: "edime",
    title: "EDiME",
    subtitle: "Look beyond a convincing image.",
    summary:
      "An explainable diffusion research pipeline exploring why synthetic medical images succeed or fail.",
    category: "AI research",
    focus: ["software"],
    stack: ["PyTorch", "DDPM", "Grad-CAM", "PathMNIST"],
    repo: "xai-diffusion-medical",
    color: "pink",
    visual: "research",
    status: "Research prototype",
    problem:
      "A generated pathology image can look plausible while failing to preserve meaningful structure. Image-quality scores alone do not explain what the model learned or where it breaks down.",
    solution:
      "A conditional UNet diffusion pipeline combines classifier-free guidance and EMA stabilization with Grad-CAM, Integrated Gradients, and downstream classifier evaluation on the PathMNIST benchmark.",
    decisions: [
      {
        title: "Evaluate utility as well as appearance",
        text: "FID, PSNR, and SSIM are considered alongside downstream classifier accuracy. That classifier is a proxy for utility, not proof of clinical validity.",
      },
      {
        title: "Inspect explanations",
        text: "Grad-CAM and Integrated Gradients help examine influential regions and understand failures in generated examples.",
      },
      {
        title: "Report unsuccessful results",
        text: "The README records low structural fidelity and mode collapse. The work includes a diagnosis of conditioning and noise-schedule issues, rather than a claim of deployment readiness.",
      },
    ],
    evidence: [
      {
        label: "FID · epoch 299",
        value: "240.95",
        context: "README-reported run; substantial room for improvement.",
      },
      {
        label: "SSIM · epoch 299",
        value: "0.072",
        context: "Low structural fidelity in the reported evaluation.",
      },
      {
        label: "Classifier accuracy",
        value: "22.22%",
        context:
          "Reported synthetic-image downstream accuracy, not clinical approval.",
      },
    ],
    limits: [
      "Research only; this is not a clinical tool.",
      "64×64 resolution limits structural realism.",
      "Mode collapse and imperfect evaluation proxies limit the usefulness of the reported model.",
    ],
    next: "Retrain with timestep conditioning from initialization, balanced sampling, and a revised noise schedule.",
    flow: [
      "PathMNIST",
      "Conditional diffusion",
      "Generated samples",
      "Explanations",
      "Evaluation",
    ],
  },
  {
    slug: "rag-pipeline",
    title: "Ask the documents",
    subtitle: "An answer with something behind it.",
    summary:
      "A local document Q&A pipeline combining semantic retrieval with an Ollama language model.",
    category: "Applied AI",
    focus: ["software"],
    stack: ["LangChain", "FAISS", "Ollama", "Streamlit"],
    repo: "llm-rag-pipeline",
    color: "blue",
    visual: "rag",
    status: "Local application",
    problem:
      "A general language model does not automatically know the contents of a specific handbook. Useful answers need relevant document context and a straightforward interface.",
    solution:
      "The pipeline ingests PDFs, creates HuggingFace sentence embeddings, retrieves context through FAISS, and gives that context to a local Ollama model through LangChain. Streamlit provides the interface.",
    decisions: [
      {
        title: "Retrieve before generating",
        text: "Semantic search selects document context before the model produces an answer, helping connect responses to the knowledge base.",
      },
      {
        title: "Keep inference local",
        text: "Ollama provides local inference. This avoids a paid hosted model dependency but requires a machine capable of running the model.",
      },
      {
        title: "Start with a concrete collection",
        text: "The initial use case is the FAST-NUCES FYP handbook; the document pipeline can be adapted to other collections.",
      },
    ],
    evidence: [
      {
        label: "Retrieval",
        value: "FAISS",
        context: "Vector search over document embeddings.",
      },
      {
        label: "Inference",
        value: "Local",
        context: "Ollama, not a public hosted model endpoint.",
      },
      {
        label: "Interface",
        value: "Streamlit",
        context: "Interactive document question answering.",
      },
    ],
    limits: [
      "Local Ollama and the document index must be configured to run the application.",
      "Retrieved context does not guarantee factual answers; a dedicated evaluation would strengthen the project.",
    ],
    next: "Add a repeatable evaluation set for retrieval relevance and answer grounding.",
    flow: [
      "PDF documents",
      "Embeddings",
      "FAISS retrieval",
      "Local model",
      "Answer",
    ],
  },
  {
    slug: "ecommerce-qa",
    title: "Before checkout ships",
    subtitle: "The most useful test can be a failure.",
    summary:
      "Risk-based manual and API testing that turned reproducible defects into a clear no-go release recommendation.",
    category: "Quality engineering",
    focus: ["qa"],
    stack: ["Postman", "Jira", "Manual testing", "axe"],
    repo: "ecommerce-qa-testing-portfolio",
    color: "orange",
    visual: "qa",
    status: "Documented QA execution",
    problem:
      "Shopping flows must do more than work for a happy-path customer. Order access, validation, and regressions need evidence strong enough to support a release decision.",
    solution:
      "The portfolio tests Brad Traversy's ProShop v2 with traceable manual cases, exploratory sessions, API assertions, browser workflows, accessibility scans, and structured defect reporting.",
    decisions: [
      {
        title: "Trace requirements to execution",
        text: "A traceability matrix connects risks and requirements to cases. Not-run cases stay explicitly visible rather than being counted as successes.",
      },
      {
        title: "Report reproducible defects",
        text: "Confirmed findings have steps, severity, expected/actual behavior, and evidence; the README records six defects imported into Jira.",
      },
      {
        title: "Make the release decision explicit",
        text: "The documented recommendation is No-Go because of cross-customer order disclosure. A successful local performance smoke does not override a critical access-control issue.",
      },
    ],
    evidence: [
      {
        label: "Manual cases",
        value: "45",
        context: "README snapshot: 29 passed, 3 failed, 13 not run.",
      },
      {
        label: "API assertions",
        value: "94",
        context: "README snapshot: 90 passed, 4 failed across 25 requests.",
      },
      {
        label: "Release decision",
        value: "No-Go",
        context:
          "Cross-customer order disclosure blocks the release recommendation.",
      },
    ],
    limits: [
      "ProShop is third-party software; this case study showcases QA work, not authorship of the shop.",
      "Thirteen cases remain not run; payment confirmation needs PayPal sandbox configuration.",
      "Reported performance observations describe a local smoke test, not production capacity.",
    ],
    next: "Retest the access-control fix and execute the deferred cases before revisiting release readiness.",
    flow: [
      "Requirements",
      "Test design",
      "Manual + API runs",
      "Defect evidence",
      "No-Go report",
    ],
    links: [
      { label: "Execution report", path: "reports/TEST_EXECUTION_REPORT.md" },
      { label: "Traceability matrix", path: "docs/TRACEABILITY_MATRIX.md" },
      {
        label: "Recorded walkthrough",
        path: "evidence/demo/proshop-qa-walkthrough.webm",
      },
    ],
  },
  {
    slug: "mindplay",
    title: "Mindplay",
    subtitle: "Three signals. One hands-free interaction.",
    summary:
      "A team-built brain–computer interface prototype combining motor-imagery EEG, intentional blinks, and head motion into hands-free game controls.",
    category: "Brain–computer interfaces",
    focus: ["software"],
    stack: ["Python", "FBCSP", "LDA", "LSL", "PyQt6", "pytest"],
    repo: "Mindplay-eeg-motor-imagery",
    color: "purple",
    visual: "research",
    status: "Academic prototype",
    problem:
      "Explore an alternative to conventional game controllers for players with limited hand mobility. The engineering challenge is translating noisy, calibrated sensor signals into intentional commands without competing detectors causing accidental actions.",
    solution:
      "Smarting headset signals arrive through Lab Streaming Layer. A five-band FBCSP/LDA branch classifies motor imagery, while blink and gyroscope branches detect complementary inputs. Shared command arbitration and cooldown feed keyboard controls and a live gamepad overlay; a PyQt6 interface connects recording, training, evaluation, and live use.",
    decisions: [
      {
        title: "Arbitrate competing inputs",
        text: "Motor imagery, blink, and head-motion detectors share a cooldown so simultaneous detections do not produce competing commands. Refractory periods and consecutive predictions address false activation.",
      },
      {
        title: "Make units explicit",
        text: "The pipeline expects microvolts. Stream values in volts require conversion, and the recording/training channel ordering must match.",
      },
      {
        title: "Use subject-specific training",
        text: "Record balanced motor-imagery and rest trials, then train and evaluate before live use. Separate matching-dataset results from proxy cross-dataset checks rather than presenting every score as subject accuracy.",
      },
      {
        title: "Connect the workflow",
        text: "The desktop interface brings recording, training, evaluation, and real-time use into a single flow. Low evaluation accuracy offers a retry or continue choice.",
      },
    ],
    evidence: [
      {
        label: "Documented evaluation",
        value: "94.4% / 160 trials",
        context:
          "Repository-reported accuracy and balanced accuracy for raw channels 0,3,4 cropped to 3 seconds. The report evaluates a saved model on a matching dataset; it does not establish a held-out split or across-user generalization.",
      },
      {
        label: "Classifier",
        value: "FBCSP + LDA",
        context: "Hand motor imagery versus rest.",
      },
      {
        label: "Complementary inputs",
        value: "EEG + blink + motion",
        context: "Three branches with shared command arbitration and cooldown.",
      },
      {
        label: "Automated checks",
        value: "13 tests reported",
        context:
          "README reports passing checks for signal processing, channel selection, cooldown, blink buffering, and gyroscope processing. These are software checks, not proof of end-to-end usability.",
      },
    ],
    limits: [
      "Academic prototype, not a clinically validated accessibility aid, medical device, or safety-critical control system.",
      "Matching-dataset scores may include training data; the report does not document an independent held-out protocol. Small datasets and best-available proxy scores must not be treated as generalization evidence.",
      "Live behavior depends on the user, session, electrode placement, and calibration. Windows, suitable EEG hardware, and an external LSL stream are required for the complete setup.",
      "Channel order, preprocessing, and units must match the trained model.",
    ],
    next: "Document a leakage-free, held-out evaluation across sessions and users, then measure false activations and end-to-end command latency during real gameplay. Clarify my individual responsibilities within the team.",
    flow: [
      "Headset / LSL",
      "EEG / blink / motion branches",
      "Command arbitration",
      "Shared cooldown",
      "Game controls + overlay",
    ],
    links: [
      {
        label: "Evaluation report & methodology",
        path: "reports/model_evaluation_report.md",
      },
      { label: "System architecture", path: "docs/ARCHITECTURE.md" },
      { label: "Demo execution guide", path: "DEMO_EXECUTION_GUIDE.md" },
    ],
  },
];

export const repoUrl = (project: Project) =>
  `https://github.com/usman78654/${project.repo}`;
export const archivedWork = [
  {
    repo: "graph-algorithm-benchmark",
    title: "Graph algorithm benchmark",
    category: "Algorithms",
  },
  {
    repo: "chess-ai-minmax",
    title: "Chess AI / minimax",
    category: "Algorithms",
  },
  {
    repo: "program-equivalence-checker",
    title: "Program equivalence checker",
    category: "Algorithms",
  },
  {
    repo: "ga-test-case-generator",
    title: "Genetic test-case generator",
    category: "Testing",
  },
  {
    repo: "word-ladder-adventure",
    title: "Word ladder adventure",
    category: "Algorithms",
  },
  {
    repo: "pixelcnn-image-inpainting",
    title: "PixelCNN image inpainting",
    category: "AI / ML",
  },
  { repo: "shakespeare-lstm", title: "Shakespeare LSTM", category: "AI / ML" },
  {
    repo: "sign-language-digits-classifier",
    title: "Sign-language digits classifier",
    category: "AI / ML",
  },
  {
    repo: "crosslingual-fake-news-detector",
    title: "Cross-lingual fake news detector",
    category: "AI / ML",
  },
  {
    repo: "ena-spotter-freight-rate-prediction",
    title: "Freight rate prediction",
    category: "AI / ML",
  },
  { repo: "OddJobs_MERN", title: "OddJobs", category: "Full stack" },
  {
    repo: "POS-System_Re-engineering",
    title: "POS system re-engineering",
    category: "Software",
  },
  {
    repo: "Multi_AgentSystem",
    title: "Multi-agent system",
    category: "AI / ML",
  },
  {
    repo: "Todo_App_GithubWorkflowsAndActions",
    title: "Todo app / GitHub workflows",
    category: "Full stack",
  },
  { repo: "E2E-ChatApp", title: "End-to-end chat app", category: "Security" },
  { repo: "Forgequeue", title: "Forgequeue", category: "In progress" },
];
