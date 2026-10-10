export const notes = [
  {
    slug: "a-queue-without-another-service",
    title: "A queue without another service.",
    summary:
      "Why CloudCrew keeps task state in PostgreSQL—and what that does not guarantee.",
    project: "cloudcrew",
    repo: "CloudCrew",
    diagram: [
      "Submit",
      "Durable row",
      "Lease + fencing token",
      "Persist result",
    ],
    paragraphs: [
      "CloudCrew already needs durable task history. Using PostgreSQL for the queue keeps the claim, lifecycle state, and result close together instead of introducing another service just to coordinate work. SKIP LOCKED lets available workers claim different rows without waiting on one another.",
      "A lease gives a stopped worker's task a path back into circulation. A fencing token prevents an old attempt from overwriting the new attempt's saved result. Recovery and stale-write protection solve different problems; both matter.",
      "This is still at-least-once execution. A worker can make an external call and crash before persisting the result. Fencing a database write cannot undo that call. Owner-scoped idempotency and careful side-effect design remain important.",
      "The useful next question is not whether a message broker would look more impressive on a diagram. It is where contention, operational needs, or measured throughput justify the additional complexity. The repository's local benchmarks identify the API bottleneck; they are not proof of linear worker scaling.",
    ],
  },
  {
    slug: "encrypted-does-not-mean-invisible",
    title: "Encrypted doesn't mean invisible.",
    summary:
      "CipherRelay's content boundary, first-contact trust, and the limits of static keys.",
    project: "cipherrelay",
    repo: "CipherRelay-secure-real-time-messaging-and-file-relay",
    diagram: [
      "Plaintext in browser",
      "AES-GCM ciphertext",
      "Relay sees metadata",
      "Peer decrypts",
    ],
    paragraphs: [
      "CipherRelay encrypts message and file content in the browser. The relay transports ciphertext rather than plaintext. That is a meaningful content boundary, but not a promise that every aspect of a conversation is hidden.",
      "The server can still observe routing, timing, and other metadata. Identity trust is separate too: trust-on-first-use fingerprints can flag later key changes, while first contact remains vulnerable to an active intermediary unless fingerprints are verified independently.",
      "Static identity ECDH does not provide forward secrecy. Compromise of long-term key material has consequences that a ratcheting protocol is designed to reduce. Calling this an educational prototype is more accurate than presenting it as a replacement for an independently audited messenger.",
      "The engineering lesson is to describe a threat boundary before attaching a security label. The README explicitly documents these constraints, including missing key recovery and multi-device support. Any protocol redesign should start with an explicit threat model and independent review.",
    ],
  },
  {
    slug: "fast-is-not-ready-to-ship",
    title: "Fast isn't ready to ship.",
    summary: "Why healthy latency did not overturn a No-Go QA recommendation.",
    project: "ecommerce-qa",
    repo: "ecommerce-qa-testing-portfolio",
    diagram: [
      "Performance passes",
      "Authorization fails",
      "Customer data exposed",
      "Release: No-Go",
    ],
    paragraphs: [
      "The ProShop QA snapshot contains a 300-request local performance run with zero errors and a worst observed p95 of 120.03 ms. Useful information—but a narrow answer to a narrow question. It does not establish production performance or release readiness.",
      "A critical cross-customer order disclosure changes the release decision. An endpoint can be fast and reliably return the wrong person's data. Authorization checks must bind the authenticated customer to the requested resource, rather than merely confirming that a customer is logged in.",
      "The recorded assessment connects 45 traceable cases, six confirmed defects, and a No-Go recommendation. Thirteen cases remain Not Run, including deferred PayPal coverage. Keeping those gaps visible avoids inflating the pass rate or suggesting checkout is fully validated.",
      "The work here is QA of Brad Traversy's third-party ProShop v2, not authorship of its storefront. The strongest evidence is the chain from reproducible behavior to defect documentation to release judgment. A fix would need an ownership regression test and a targeted retest before changing that judgment.",
    ],
  },
] as const;
