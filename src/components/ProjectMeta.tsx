import { categories, type Project } from "@/content/projects";

export function categoryList(p: Project, max?: number) {
  return p.categories
    .slice(0, max)
    .map((c) => categories[c])
    .join(" · ");
}

/** Ligne d'infos sous une vignette : disciplines (2 max), année. */
export function ProjectMetaLine({ project, compact }: { project: Project; compact?: boolean }) {
  return (
    <div className="label flex items-baseline gap-3 text-mute">
      <span className={`truncate ${compact ? "hidden md:inline" : ""}`}>{categoryList(project, 2)}</span>
      {project.year && <span className="ml-auto shrink-0">{project.year}</span>}
    </div>
  );
}
