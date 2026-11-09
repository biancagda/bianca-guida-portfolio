import Image from "next/image";
import Link from "next/link";
import { thumbnailOf, type Project } from "@/content/projects";
import { ProjectMetaLine } from "./ProjectMeta";
import { Reveal } from "./Reveal";

/**
 * Galerie « justifiée » : chaque vignette est affichée EN ENTIER, sans recadrage.
 * Dans une rangée, toutes les images ont la même hauteur et leur largeur
 * s'adapte à leur format (une affiche verticale est étroite, un paysage est large).
 * Résultat : des rangées pleines, alignées, sans trou.
 */
function toRows(projects: Project[], pattern: number[]): Project[][] {
  const rows: Project[][] = [];
  let i = 0;
  let k = 0;
  while (i < projects.length) {
    let n = pattern[k % pattern.length];
    const left = projects.length - i;
    if (left - n === 1 && n > 1) n = Math.min(left, n + 1); // pas de projet seul en fin de liste
    rows.push(projects.slice(i, i + n));
    i += n;
    k += 1;
  }
  return rows;
}

const ratioOf = (p: Project) => {
  const m = thumbnailOf(p);
  return m ? m.width / m.height : 4 / 3;
};

type Props = {
  projects: Project[];
  /** « featured » (accueil) : rangées de 2. « compact » (page Projets) : rangées de 2 et 3 en alternance. */
  variant?: "featured" | "compact";
};

export function ProjectGrid({ projects, variant = "featured" }: Props) {
  const compact = variant === "compact";
  return (
    <>
      {/* Ordinateur */}
      <div className="hidden md:block">
        <Rows rows={toRows(projects, compact ? [2, 3] : [2])} compact={compact} />
      </div>
      {/* Téléphone : accueil = une image par ligne ; page Projets = rangées de 2 */}
      <div className="md:hidden">
        <Rows rows={toRows(projects, compact ? [2] : [1])} compact={compact} small={compact} />
      </div>
    </>
  );
}

function Rows({ rows, compact, small }: { rows: Project[][]; compact: boolean; small?: boolean }) {
  return (
    <div className="space-y-10 md:space-y-16">
      {rows.map((row, r) => (
        <div key={r} className="flex gap-x-[clamp(12px,1.6vw,24px)]">
          {row.map((p) => {
            const media = thumbnailOf(p);
            const ratio = ratioOf(p);
            const share = (ratio / row.reduce((t, q) => t + ratioOf(q), 0)) * 100;
            return (
              <Reveal
                key={p.slug}
                className="min-w-0 basis-0"
                style={{ flexGrow: ratio, flexShrink: 1 }}
              >
                <Link href={`/projets/${p.slug}`} className="group block">
                  <div className="relative overflow-hidden bg-ink-2" style={{ aspectRatio: String(ratio) }}>
                    {media ? (
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes={`${Math.max(30, Math.round(share))}vw`}
                        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="display flex h-full items-end p-5 text-[48px]" style={{ backgroundColor: p.color, color: p.ink }}>
                        {p.title}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 md:mt-4">
                    <ProjectMetaLine project={p} compact={small} />
                    <h3 className={`display mt-1.5 text-paper md:mt-2 md:text-[clamp(30px,3vw,52px)] ${small ? "text-[22px]" : "text-[34px]"}`}>{p.title}</h3>
                    {!compact && (
                      <p className="serif-i mt-1 max-w-[46ch] text-[clamp(17px,1.35vw,21px)] leading-snug text-paper/75">{p.tagline}</p>
                    )}
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
