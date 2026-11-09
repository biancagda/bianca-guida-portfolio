import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projets", "/a-propos", "/contact"].map((p) => ({ url: `${site.url}${p}`, priority: p ? 0.8 : 1 }));
  return [...pages, ...projects.map((p) => ({ url: `${site.url}/projets/${p.slug}`, priority: 0.7 }))];
}
