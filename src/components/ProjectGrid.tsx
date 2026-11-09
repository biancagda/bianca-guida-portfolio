import Link from "next/link";
import { thumbnailOf, type Project } from "@/content/projects";
import { ProjectMedia } from "./ProjectMedia";
import { ProjectMetaLine } from "./ProjectMeta";
import { Reveal } from "./Reveal";

/**
 * Ordinateur : composition asymétrique sur la grille 12 colonnes
 * (grand / petit décalé / moyen…), comme une mise en page de magazine.
 * Téléphone : une grille simple et régulière, pour ne pas surcharger l'écran.
 */
const rhythm = [
  { place: "md:col-start-1 md:col-span-7", ratio: "md:aspect-[4/3]", sizes: "58vw" },
  { place: "md:col-start-9 md:col-span-4 md:mt-[22vh]", ratio: "md:aspect-[3/4]", sizes: "33vw" },
  { place: "md:col-start-2 md:col-span-5", ratio: "md:aspect-[4/5]", sizes: "42vw" },
  { place: "md:col-start-8 md:col-span-5 md:mt-[12vh]", ratio: "md:aspect-[5/4]", sizes: "42vw" },
  { place: "md:col-start-3 md:col-span-8", ratio: "md:aspect-[16/9]", sizes: "66vw" },
  { place: "md:col-start-1 md:col-span-4", ratio: "md:aspect-[3/4]", sizes: "33vw" },
  { place: "md:col-start-6 md:col-span-7 md:mt-[16vh]", ratio: "md:aspect-[4/3]", sizes: "58vw" },
];

type Props = {
  projects: Project[];
  startIndex?: number;
  /**
   * « featured » (accueil) : sur téléphone, une colonne avec de grandes images.
   * « compact » (page Projets) : sur téléphone, deux colonnes, titre + année seulement.
   */
  variant?: "featured" | "compact";
};

export function ProjectGrid({ projects, startIndex = 0, variant = "featured" }: Props) {
  const compact = variant === "compact";
  return (
    <div className={`grid-12 ${compact ? "gap-y-10" : "gap-y-14"} md:gap-y-28`}>
      {projects.map((p, i) => {
        const r = rhythm[i % rhythm.length];
        const mobile = compact ? "col-span-6 aspect-[4/5]" : "col-span-12 aspect-[4/3]";
        const [span, ratio] = [mobile.split(" ")[0], mobile.split(" ")[1]];
        return (
          <Reveal key={p.slug} className={`${span} ${r.place}`} delay={compact ? (i % 2) * 0.06 : 0}>
            <Link href={`/projets/${p.slug}`} className="group block">
              <ProjectMedia
                project={p}
                media={thumbnailOf(p)}
                ratio={`${ratio} ${r.ratio}`}
                sizes={`(min-width: 768px) ${r.sizes}, ${compact ? "50vw" : "100vw"}`}
                hoverZoom
                compact={compact}
              />
              <div className="mt-3 md:mt-4">
                <ProjectMetaLine project={p} index={startIndex + i} compact={compact} />
                <h3
                  className={`display mt-1.5 transition-colors duration-500 group-hover:text-signal md:mt-2 md:text-[clamp(38px,4.4vw,76px)] ${
                    compact ? "text-[26px]" : "text-[40px]"
                  }`}
                >
                  {p.title}
                </h3>
                <p className="serif-i mt-1 hidden max-w-[46ch] text-[clamp(18px,1.5vw,22px)] leading-snug text-paper/75 md:block">
                  {p.tagline}
                </p>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
