import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { notes } from "@/content/notes";
import { getSiteUrl } from "@/content/site-url";
export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  return note
    ? {
        title: note.title,
        description: note.summary,
        alternates: getSiteUrl() ? { canonical: `/notes/${slug}` } : undefined,
      }
    : { title: "Note not found" };
}
export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  if (!note) notFound();
  return (
    <main id="main" className="section note-page">
      <Link href="/notes" className="text-link">
        ← All build notes
      </Link>
      <span className="eyebrow">ENGINEERING NOTE / OCTOBER 10, 2026</span>
      <h1>{note.title}</h1>
      <p className="note-deck">{note.summary}</p>
      <ol className="note-diagram">
        {note.diagram.map((node, i) => (
          <li key={node}>
            <span>0{i + 1}</span>
            <strong>{node}</strong>
          </li>
        ))}
      </ol>
      <div className="note-body">
        {note.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="source-note">
          Based on the documented implementation and recorded artifacts—not an
          independent audit.{" "}
          <a
            href={`https://github.com/usman78654/${note.repo}#readme`}
            target="_blank"
            rel="noreferrer"
          >
            Read the repository source ↗
          </a>
        </p>
        <Link href={`/projects/${note.project}`} className="button">
          Explore the full case study ↗
        </Link>
      </div>
    </main>
  );
}
