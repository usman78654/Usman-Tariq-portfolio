import type { Focus } from "./profile";

// Rank by demonstrable depth, relevant engineering decisions, and inspectable
// evidence—not stars, repository size, or CV wording. Reviewed 2026-10-10.
export const projectOrder: Record<Focus, string[]> = {
  all: [
    "clearstep",
    "claimguard",
    "cloudcrew",
    "ecommerce-qa",
    "cipherrelay",
    "mindplay",
    "cross-browser-qa",
    "edime",
    "rag-pipeline",
  ],
  software: [
    "clearstep",
    "claimguard",
    "mindplay",
    "cipherrelay",
    "edime",
    "rag-pipeline",
  ],
  cloud: ["cloudcrew", "cipherrelay"],
  qa: ["ecommerce-qa", "cross-browser-qa"],
};

export const projectScope: Record<string, string> = {
  clearstep:
    "Document extraction, validated analysis, and a privacy-conscious product workflow.",
  claimguard:
    "Deterministic gates, quoted verification, bounded repair, and offline guarantee tests.",
  cloudcrew:
    "Durable task orchestration, worker recovery, observability, and deployment tooling.",
  cipherrelay:
    "Client-side encryption, identity trust boundaries, and operational tooling.",
  "ecommerce-qa":
    "QA artifacts for Brad Traversy's ProShop v2; the shop itself is third-party software.",
  "cross-browser-qa":
    "Browser automation and release checks for Sauce Labs' Swag Labs; not authorship of the application.",
  edime:
    "Conditional diffusion research and explicit evaluation of unsuccessful outcomes.",
  mindplay:
    "Team-built EEG, blink, and head-motion game control with calibration, command arbitration, and desktop tooling.",
  "rag-pipeline":
    "A local document retrieval and question-answering application.",
};

export const contributions: Record<string, string> = {
  clearstep:
    "Solo project: application design and implementation across the document workflow.",
  "ecommerce-qa":
    "Solo QA project: test planning, execution, defect documentation, and release assessment for a third-party shop.",
  "cross-browser-qa":
    "Solo QA project: automation, cross-browser checks, evidence capture, and CI workflows for a third-party application.",
  mindplay:
    "Team project. The case study describes the system; individual task ownership is not yet specified.",
};
