import Link from "next/link";
import type { Project } from "@/content/projects";
import { ProjectMedia } from "./ProjectMedia";
import { ProjectMetaLine } from "./ProjectMeta";
import { Reveal } from "./Reveal";

/**
 * Composition asymétrique : les projets sont posés sur la grille 12 colonnes
 * selon un rythme de mise en page éditoriale (grand / petit décalé / moyen…).
 */
const rhythm = [
  { place: "md:col-start-1 md:col-span-7", ratio: "aspect-[4/3]", sizes: "(min-width: 768px) 58vw, 100vw" },
  { place: "md:col-start-9 md:col-span-4 md:mt-[22vh]", ratio: "aspect-[3/4]", sizes: "(min-width: 768px) 33vw, 100vw" },
  { place: "md:col-start-2 md:col-span-5", ratio: "aspect-[4/5]", sizes: "(min-width: 768px) 42vw, 100vw" },
  { place: "md:col-start-8 md:col-span-5 md:mt-[12vh]", ratio: "aspect-[5/4]", sizes: "(min-width: 768px) 42vw, 100vw" },
  { place: "md:col-start-3 md:col-span-8", ratio: "aspect-[16/9]", sizes: "(min-width: 768px) 66vw, 100vw" },
  { place: "md:col-start-1 md:col-span-4", ratio: "aspect-[3/4]", sizes: "(min-width: 768px) 33vw, 100vw" },
  { place: "md:col-start-6 md:col-span-7 md:mt-[16vh]", ratio: "aspect-[4/3]", sizes: "(min-width: 768px) 58vw, 100vw" },
];

export function ProjectGrid({ projects, startIndex = 0 }: { projects: Project[]; startIndex?: number }) {
  return (
    <div className="grid-12 gap-y-16 md:gap-y-28">
      {projects.map((p, i) => {
        const r = rhythm[i % rhythm.length];
        return (
          <Reveal key={p.slug} className={`col-span-12 ${r.place}`}>
            <Link href={`/projets/${p.slug}`} className="group block">
              <ProjectMedia project={p} media={p.cover} ratio={r.ratio} sizes={r.sizes} hoverZoom />
              <div className="mt-4">
                <ProjectMetaLine project={p} index={startIndex + i} />
                <h3 className="display mt-2 text-[clamp(38px,4.4vw,76px)] transition-colors duration-500 group-hover:text-signal">{p.title}</h3>
                <p className="serif-i mt-1 max-w-[46ch] text-[clamp(18px,1.5vw,22px)] leading-snug text-paper/75">{p.tagline}</p>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
