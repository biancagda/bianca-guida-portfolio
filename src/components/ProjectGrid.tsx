import Link from "next/link";
import { thumbnailOf, type Project } from "@/content/projects";
import { ProjectMedia } from "./ProjectMedia";
import { ProjectMetaLine } from "./ProjectMeta";
import { Reveal } from "./Reveal";

/**
 * Ordinateur : une mise en page de magazine pleine largeur, sans trou.
 * Les projets sont posés par rangées qui alternent « grand + petit »,
 * « petit + grand », puis une image pleine largeur. Dans une rangée,
 * les images ont toutes la même hauteur : les bords s'alignent.
 * Téléphone : une grille simple et régulière.
 */
type Cell = { project: Project; index: number; span: 5 | 7 | 12 };

function toRows(projects: Project[]): Cell[][] {
  const pattern: (5 | 7 | 12)[][] = [[7, 5], [5, 7], [12]];
  const rows: Cell[][] = [];
  let i = 0;
  let k = 0;
  while (i < projects.length) {
    let spans = pattern[k % pattern.length];
    if (projects.length - i < spans.length) spans = [12]; // dernier projet seul : pleine largeur
    rows.push(spans.map((span, j) => ({ project: projects[i + j], index: i + j, span })));
    i += spans.length;
    k += 1;
  }
  return rows;
}

const spanClass = { 5: "md:col-span-5", 7: "md:col-span-7", 12: "md:col-span-12" } as const;

type Props = {
  projects: Project[];
  /**
   * « featured » (accueil) : sur téléphone, une colonne avec de grandes images.
   * « compact » (page Projets) : sur téléphone, deux colonnes, titre + année seulement.
   */
  variant?: "featured" | "compact";
};

export function ProjectGrid({ projects, variant = "featured" }: Props) {
  const compact = variant === "compact";
  return (
    <div className="space-y-12 md:space-y-20">
      {toRows(projects).map((row, r) => (
        <div key={r} className={`grid-12 ${compact ? "gap-y-10" : "gap-y-12"}`}>
          {row.map(({ project: p, index, span }) => {
            const full = span === 12;
            const height = full ? "md:h-[clamp(340px,42vw,680px)]" : "md:h-[clamp(300px,32vw,540px)]";
            // Téléphone : 2 colonnes en mode compact, sauf les images « pleine largeur » qui gardent toute la largeur
            const mobile = compact && !full ? "col-span-6 aspect-[4/5]" : "col-span-12 aspect-[4/3]";
            const [mSpan, mRatio] = mobile.split(" ");
            return (
              <Reveal key={p.slug} className={`${mSpan} ${spanClass[span]}`} delay={compact ? (index % 2) * 0.06 : 0}>
                <Link href={`/projets/${p.slug}`} className="group block">
                  <ProjectMedia
                    project={p}
                    media={thumbnailOf(p)}
                    ratio={`${mRatio} md:aspect-auto ${height}`}
                    sizes={`(min-width: 768px) ${full ? "100vw" : span === 7 ? "58vw" : "42vw"}, ${compact ? "50vw" : "100vw"}`}
                    hoverZoom
                    compact={compact && !full}
                  />
                  <div className={`mt-3 md:mt-4 ${full ? "md:grid md:grid-cols-12 md:items-baseline md:gap-x-6" : ""}`}>
                    <div className={full ? "md:col-span-7" : ""}>
                      <ProjectMetaLine project={p} index={index} compact={compact && !full} />
                      <h3
                        className={`display mt-1.5 transition-colors duration-500 group-hover:text-signal md:mt-2 md:text-[clamp(36px,3.8vw,64px)] ${
                          compact && !full ? "text-[26px]" : "text-[40px]"
                        }`}
                      >
                        {p.title}
                      </h3>
                    </div>
                    <p
                      className={`serif-i mt-1 hidden max-w-[46ch] text-[clamp(17px,1.35vw,21px)] leading-snug text-paper/75 md:block ${
                        full ? "md:col-span-5 md:justify-self-end md:text-right" : ""
                      }`}
                    >
                      {p.tagline}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      ))}
    </div>
  );
}
