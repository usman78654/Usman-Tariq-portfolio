"use client";
import { useState } from "react";
import { profile, cvs } from "@/content/profile";

export function CopyEmail() {
  const [message, setMessage] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setMessage("Email copied.");
    } catch {
      setMessage("Could not copy. Use the email link instead.");
    }
  }
  return (
    <div className="copy-email">
      <button className="text-link" onClick={copy}>
        Copy email <span aria-hidden="true">↗</span>
      </button>
      <span role="status">{message}</span>
    </div>
  );
}

export function CVChooser() {
  return (
    <details className="cv-chooser">
      <summary>
        Choose a CV <span aria-hidden="true">↗</span>
      </summary>
      <div className="cv-chooser-options">
        {cvs.map((cv) => (
          <a key={cv.focus} href={cv.href} download>
            <strong>{cv.label}</strong>
            <span>{cv.description}</span>
          </a>
        ))}
      </div>
    </details>
  );
}
