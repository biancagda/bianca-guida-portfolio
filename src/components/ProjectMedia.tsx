import Image from "next/image";
import type { Media, Project } from "@/content/projects";

type Props = {
  project: Project;
  media?: Media;
  sizes: string;
  /** Classe de ratio, ex. "aspect-[4/5]". Si absente, l'image garde ses proportions. */
  ratio?: string;
  priority?: boolean;
  className?: string;
  /** Effet de zoom léger au survol du parent `.group`. */
  hoverZoom?: boolean;
};

/**
 * Affiche le visuel d'un projet, ou — tant qu'il n'existe pas — un aplat
 * à la couleur du projet, clairement identifié comme emplacement à remplacer.
 */
export function ProjectMedia({ project, media, sizes, ratio, priority, className = "", hoverZoom }: Props) {
  const zoom = hoverZoom ? "transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]" : "";

  if (media) {
    return (
      <div className={`relative overflow-hidden bg-ink-2 ${ratio ?? ""} ${className}`}>
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          sizes={sizes}
          priority={priority}
          className={`${ratio ? "absolute inset-0 h-full w-full object-cover" : "h-auto w-full"} ${zoom}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden p-[clamp(12px,2vw,24px)] ${ratio ?? "aspect-[4/3]"} ${className}`}
      style={{ backgroundColor: project.color, color: project.ink ?? "#fff" }}
      role="img"
      aria-label={`Emplacement du visuel « ${project.title} » (à venir)`}
    >
      <span className="label opacity-70">Visuel à venir</span>
      <span className={`display block text-[clamp(40px,7vw,120px)] ${zoom}`}>{project.title}</span>
      <span className="label opacity-60">/images/projets/{project.slug}/</span>
    </div>
  );
}
