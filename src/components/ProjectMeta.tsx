import { categories, type Project } from "@/content/projects";

export function categoryList(p: Project) {
  return p.categories.map((c) => categories[c]).join(" · ");
}

export function ProjectMetaLine({ project, index }: { project: Project; index?: number }) {
  return (
    <div className="label flex items-baseline gap-3 text-mute">
      {index !== undefined && <span className="text-paper">{String(index + 1).padStart(2, "0")}</span>}
      <span className="truncate">{categoryList(project)}</span>
      {project.year && <span className="ml-auto shrink-0">{project.year}</span>}
    </div>
  );
}
