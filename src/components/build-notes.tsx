import Link from "next/link";
import { notes } from "@/content/notes";
export function BuildNotes() {
  return (
    <section className="section build-notes" id="notes">
      <div className="section-heading">
        <div>
          <span className="eyebrow">FROM THE ENGINEERING NOTEBOOK</span>
          <h2>
            The choices
            <br />
            <em>behind the code.</em>
          </h2>
        </div>
        <p>
          Short reads about constraints, failure modes,
          <br />
          and why the obvious answer isn't always enough.
        </p>
      </div>
      <div className="notes-grid">
        {notes.map((note, i) => (
          <Link
            className="note-card"
            href={`/notes/${note.slug}`}
            key={note.slug}
          >
            <span className="eyebrow">0{i + 1} / BUILD NOTE</span>
            <h3>{note.title}</h3>
            <p>{note.summary}</p>
            <span className="text-link">Read the note ↗</span>
          </Link>
        ))}
      </div>
      <Link href="/notes" className="text-link">
        All build notes ↗
      </Link>
    </section>
  );
}
