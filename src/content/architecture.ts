export const architecture: Record<string, { title: string; text: string }[]> = {
  clearstep: [
    {
      title: "Browser extraction",
      text: "PDF text extraction and image OCR happen locally. Only extracted text reaches the application API; the uploaded file itself is not sent to the server. Scanned-PDF OCR remains incomplete.",
    },
    {
      title: "Validate the output",
      text: "Zod checks structured model output. Invalid model output gets one repair attempt before an explicitly labeled deterministic fallback—not a silent claim of successful inference.",
    },
    {
      title: "Optional inference",
      text: "Qwen through local Ollama is optional. The fictional sample works without a model; arbitrary documents do not receive the same rich demo analysis.",
    },
    {
      title: "On-device storage",
      text: "Browser localStorage retains one recent structured analysis. No application database is required. On-device persistence is not the same as storing nothing.",
    },
  ],
  cipherrelay: [
    {
      title: "Client encryption",
      text: "Message and file content is encrypted in the browser with AES-256-GCM. P-256 ECDH and HKDF derive keys; static identity keys do not provide forward secrecy.",
    },
    {
      title: "Ciphertext relay",
      text: "The relay transports ciphertext, but routing, timing, and other metadata remain visible. Content encryption does not make a conversation invisible.",
    },
    {
      title: "Identity trust",
      text: "Trust-on-first-use fingerprints detect later key changes. First-contact interception remains possible unless fingerprints are verified independently.",
    },
    {
      title: "Operational boundary",
      text: "Container, proxy, metrics, and backup/restore tooling support operations, not proof of independent security review. Multi-device use and key recovery remain limitations.",
    },
  ],
};
