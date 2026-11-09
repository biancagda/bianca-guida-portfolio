import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projects, thumbnailOf, type Media, type Project } from "@/content/projects";
import { ProjectMedia } from "@/components/ProjectMedia";
import { categoryList } from "@/components/ProjectMeta";
import { LineReveal, Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.title}${p.client ? ` — ${p.client}` : ""}. ${p.tagline}`,
    alternates: { canonical: `/projets/${p.slug}` },
    openGraph: thumbnailOf(p) ? { images: [{ url: thumbnailOf(p)!.src, width: thumbnailOf(p)!.width, height: thumbnailOf(p)!.height, alt: thumbnailOf(p)!.alt }] } : undefined,
  };
}

/** La fiche du projet : 3 lignes maximum, pour comprendre en un coup d'œil. */
const fiche = [
  { key: "context", title: "Contexte" },
  { key: "concept", title: "Idée" },
  { key: "applications", title: "Dispositif" },
] as const;

/** Ordre d'apparition des visuels insérés dans le texte (champ `inline`). */
const inlineOrder = ["context", "problem", "concept", "research", "identity", "applications"] as const;

const galleryPlace: Record<NonNullable<Media["layout"]>, string> = {
  full: "col-span-12",
  wide: "col-span-12 md:col-start-2 md:col-span-10",
  half: "col-span-6",
  offset: "col-span-12 md:col-start-5 md:col-span-8",
  /** Image étroite / basse définition : centrée, jamais agrandie. */
  narrow: "col-span-12 mx-auto w-full max-w-[430px]",
};

function Figure({ project, media, priority }: { project: Project; media: Media; priority?: boolean }) {
  const place = galleryPlace[media.layout ?? "full"];
  return (
    <Reveal className={place}>
      <figure>
        <ProjectMedia project={project} media={media} priority={priority} sizes={media.layout === "half" ? "50vw" : "100vw"} />
        {media.caption && (
          <figcaption className={`label mt-3 text-mute ${media.layout === "half" ? "hidden md:block" : ""}`}>{media.caption}</figcaption>
        )}
      </figure>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next = getNextProject(project.slug);

  const meta = [
    ["Client", project.client],
    ["Année", project.year],
    ["Cadre", project.frame],
    ["Rôle", project.role],
    ["Discipline", categoryList(project)],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <article>
      {/* ─── En-tête ─── */}
      <header className="px-site pt-28 md:pt-36">
        <div className="label mb-6 flex justify-between text-mute">
          <Link href="/projets" className="u-link">
            <Icon name="arrow-left" /> Projets
          </Link>
        </div>
        <LineReveal className="display text-[19vw] md:text-[12.5vw]" lines={[project.title]} />
        <div className="grid-12 mt-6 gap-y-6 border-t border-line pt-5 md:mt-12 md:gap-y-8">
          <p className="serif-i col-span-12 text-[22px] leading-[1.15] md:col-span-6 md:text-[clamp(24px,2.6vw,40px)] md:leading-[1.1]">{project.tagline}</p>
          <dl className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-3 text-[14px] md:col-span-5 md:col-start-8 md:gap-y-4 md:text-[15px]">
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="label text-signal">{k}</dt>
                <dd className="mt-1">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {project.draft && (
        <div className="px-site mt-10">
          <p className="label flex items-center gap-3 border border-signal/50 px-4 py-3 text-signal">
            <Icon name="dot" className="h-[0.7em] w-[0.7em]" /> Étude de cas en cours de rédaction — contenu provisoire, visuels à venir.
          </p>
        </div>
      )}

      {/* ─── Visuel principal (masqué pour une présentation sans `cover` : elle commence par sa propre page de titre) ─── */}
      {(project.cover || !project.slides?.length) && (
      <div className="px-site mt-10 md:mt-14">
        <Reveal>
          {/* Visuel principal : `cover`, sinon la vignette, sinon un emplacement « à venir » */}
          <ProjectMedia project={project} media={project.cover ?? project.thumbnail} ratio={project.cover ?? project.thumbnail ? undefined : "aspect-[16/9]"} sizes="100vw" priority />
        </Reveal>
      </div>
      )}

      {/* ─── Étude de cas ─── */}
      <div className="px-site mt-10 space-y-12 md:mt-16 md:space-y-20">
        <Reveal>
          <dl className="grid gap-x-10 gap-y-6 border-t border-line pt-6 md:grid-cols-3">
            {fiche.map(({ key, title }) =>
              project[key]?.length ? (
                <div key={key}>
                  <dt className="label text-signal">{title}</dt>
                  <dd className="mt-2 text-[17px] leading-[1.45] md:text-[clamp(17px,1.3vw,20px)]">{project[key]!.join(" ")}</dd>
                </div>
              ) : null,
            )}
          </dl>
        </Reveal>

        {/* Visuels */}
        {inlineOrder.some((k) => project.inline?.[k]?.length) && (
          <div className="grid-12 gap-y-3 md:gap-y-6">
            {inlineOrder.flatMap((k) => project.inline?.[k] ?? []).map((m) => (
              <Figure key={m.src} project={project} media={m} />
            ))}
          </div>
        )}

        {/* Chiffres clés */}
        {project.figures && (
          <section aria-label="Chiffres clés" className="grid-12 gap-y-10 border-t border-line pt-5">
            <p className="label col-span-12 text-mute md:col-span-4">(Chiffres clés)</p>
            <div className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-10 md:col-span-8 md:grid-cols-4">
              {project.figures.map((f, i) => (
                <Reveal key={f.label} delay={i * 0.08}>
                  <p className="display text-[clamp(48px,5vw,88px)] text-signal">{f.value}</p>
                  <p className="mt-2 text-paper/70">{f.label}</p>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Présentation page par page */}
        {project.slides?.length ? (
          <section aria-label="La présentation">
            <p className="label mb-6 flex justify-between border-t border-line pt-5 text-mute md:mb-10">
              <span>(La présentation)</span>
            </p>
            <ol className="space-y-3 md:space-y-6">
              {project.slides.map((m, i) => (
                <li key={m.src}>
                  <Reveal>
                    <figure>
                      <ProjectMedia project={project} media={m} sizes="100vw" />
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {/* Galerie — masquée si le projet est complet et n'a pas d'images supplémentaires */}
        {(project.gallery?.length || (project.draft && !project.slides?.length)) && (
        <section aria-label="Galerie">
          <p className="label mb-8 border-t border-line pt-5 text-mute">(Galerie)</p>
          <div className="grid-12 gap-y-6 md:gap-y-10">
            {project.gallery?.length ? (
              project.gallery.map((m) => <Figure key={m.src} project={project} media={m} />)
            ) : (
              <>
                <div className="col-span-12 md:col-span-7">
                  <ProjectMedia project={project} ratio="aspect-[4/3]" sizes="60vw" />
                </div>
                <div className="col-span-12 md:col-span-4 md:col-start-9 md:mt-24">
                  <ProjectMedia project={project} ratio="aspect-[3/4]" sizes="33vw" />
                </div>
              </>
            )}
          </div>
          {project.credits && <p className="label mt-8 text-mute">{project.credits}</p>}
        </section>
        )}
      </div>

      {/* ─── Projet suivant ─── */}
      <nav aria-label="Projet suivant" className="px-site mt-20 md:mt-32">
        <Link href={`/projets/${next.slug}`} className="group grid-12 items-end gap-y-6 border-t border-line pt-5">
          <div className="col-span-12 md:col-span-8">
            <p className="label text-signal">Projet suivant</p>
            <p className="display mt-3 text-[13vw] md:text-[11vw]">
              {next.title} <span className="inline-block align-middle transition-transform duration-500 group-hover:translate-x-4"><Icon name="arrow-right" className="h-[0.6em] w-[0.6em]" /></span>
            </p>
          </div>
          <div className="col-span-12 md:col-span-4">
            <ProjectMedia project={next} media={thumbnailOf(next)} ratio="aspect-[4/3]" sizes="33vw" hoverZoom />
          </div>
        </Link>
      </nav>
    </article>
  );
}
