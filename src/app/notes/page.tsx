import { BuildNotes } from "@/components/build-notes";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Build notes",
  description: "Engineering tradeoffs from Usman Tariq's projects.",
};
export default function NotesPage() {
  return (
    <main id="main">
      <BuildNotes />
    </main>
  );
}
