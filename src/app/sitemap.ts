import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/content/site-url";
import { projects } from "@/content/projects";
import { notes } from "@/content/notes";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  if (!origin) return [];
  return [
    "/",
    "/projects",
    "/notes",
    ...notes.map((n) => `/notes/${n.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
  ].map((path) => ({ url: new URL(path, origin).href }));
}
