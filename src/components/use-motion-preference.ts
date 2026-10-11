"use client";

import { useEffect, useState } from "react";

// Start identically on server/client, then subscribe to live OS changes.
// The installed Motion useReducedMotion hook snapshots the initial preference.
export function useMotionPreference() {
  const [reduced, setReduced] = useState<boolean | null>(null);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return reduced;
}
