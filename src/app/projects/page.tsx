import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/project-explorer";
import { getSiteUrl } from "@/content/site-url";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Usman Tariq's AI, cloud, software, security, and testing projects. Filter by role or search by technology.",
  alternates: getSiteUrl() ? { canonical: "/projects" } : undefined,
};
export default function ProjectsPage() {
  return (
    <main id="main" className="section collection-page">
      <span className="eyebrow">THE PROJECT NOTEBOOK</span>
      <h1>
        A few ideas.
        <br />
        <em>A lot of engineering.</em>
      </h1>
      <p className="collection-intro">
        Applications, research, testing, and the lessons in between.
        <br />
        Find something relevant to your team—or just follow your curiosity.
      </p>
      <ProjectExplorer />
    </main>
  );
}
