import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="section not-found">
      <span className="eyebrow">404 / A SMALL DETOUR</span>
      <h1>
        This idea isn't
        <br />
        <em>on the map.</em>
      </h1>
      <p>Let's get you back to the projects.</p>
      <Link href="/projects" className="button">
        Explore the work ↗
      </Link>
    </main>
  );
}
