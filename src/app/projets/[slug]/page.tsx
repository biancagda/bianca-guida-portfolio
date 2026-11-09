import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projects, thumbnailOf, type Media, type Project } from "@/content/projects";
import { ProjectMedia } from "@/components/ProjectMedia";
import { categoryList } from "@/components/ProjectMeta";
import { LineReveal, Reveal } from "@/components/Reveal";
import { pad } from "@/lib/text";
import { StepText } from "@/components/StepText";

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

/** Les étapes de l'étude de cas, dans l'ordre. `hint` guide la rédaction quand le texte manque. */
const steps = [
  { key: "context", title: "Contexte", hint: "Pour qui, dans quel cadre (école, concours, agence), avec quelle équipe ?" },
  { key: "problem", title: "Problématique & intention", hint: "Quel était le problème à résoudre ? Que vouliez-vous provoquer chez la cible ?" },
  { key: "concept", title: "Concept", hint: "L'idée en une phrase, puis comment elle se déploie." },
  { key: "research", title: "Recherche graphique", hint: "Moodboards, pistes écartées, croquis, essais typographiques… montre le chemin." },
  { key: "identity", title: "Identité visuelle", hint: "Typographie, couleurs, système graphique, direction photo : les choix et leurs raisons." },
  { key: "applications", title: "Déclinaisons", hint: "Affichage, social, packaging, print, événement… où vit la création ?" },
] as const;

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
  const index = projects.findIndex((p) => p.slug === project.slug);

  const meta = [
    ["Client", project.client],
    ["Année", project.year],
    ["Cadre", project.frame],
    ["Rôle", project.role],
    ["Discipline", categoryList(project)],
  ].filter(([, v]) => v) as [string, string][];

  let stepNumber = 0;

  return (
    <article>
      {/* ─── En-tête ─── */}
      <header className="px-site pt-28 md:pt-36">
        <div className="label mb-6 flex justify-between text-mute">
          <Link href="/projets" className="u-link">
            ← Projets
          </Link>
          <span>
            {pad(index + 1)} / {pad(projects.length)}
          </span>
        </div>
        <LineReveal className="display text-[19vw] md:text-[12.5vw]" lines={[project.title]} />
        <div className="grid-12 mt-6 gap-y-6 border-t border-line pt-5 md:mt-12 md:gap-y-8">
          <p className="serif-i col-span-12 text-[22px] leading-[1.15] md:col-span-6 md:text-[clamp(24px,2.6vw,40px)] md:leading-[1.1]">{project.tagline}</p>
          <dl className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-3 text-[14px] md:col-span-5 md:col-start-8 md:gap-y-4 md:text-[15px]">
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="label text-mute">{k}</dt>
                <dd className="mt-1">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {project.draft && (
        <div className="px-site mt-10">
          <p className="label flex items-center gap-3 border border-signal/50 px-4 py-3 text-signal">
            <span aria-hidden>●</span> Étude de cas en cours de rédaction — contenu provisoire, visuels à venir.
          </p>
        </div>
      )}

      {/* ─── Visuel principal ─── */}
      <div className="px-site mt-10 md:mt-16">
        <Reveal>
          {/* Visuel principal : `cover`, sinon la vignette, sinon un emplacement « à venir » */}
          <ProjectMedia project={project} media={project.cover ?? project.thumbnail} ratio={project.cover ?? project.thumbnail ? undefined : "aspect-[16/9]"} sizes="100vw" priority />
        </Reveal>
      </div>

      {/* ─── Étude de cas ─── */}
      <div className="px-site mt-16 space-y-16 md:mt-36 md:space-y-36">
        {steps.map((step) => {
          const text = project[step.key];
          const media = project.inline?.[step.key];
          if (!text && !media && !project.draft) return null;
          stepNumber += 1;
          return (
            <section key={step.key} aria-labelledby={`etape-${step.key}`}>
              <Reveal className="grid-12 gap-y-4 border-t border-line pt-5 md:gap-y-6">
                <div className="col-span-12 md:col-span-4">
                  <p className="label text-signal">{pad(stepNumber)}</p>
                  <h2 id={`etape-${step.key}`} className="display mt-2 text-[32px] md:text-[clamp(36px,3.6vw,60px)]">
                    {step.title}
                  </h2>
                </div>
                <div className="col-span-12 md:col-span-7 md:col-start-6">
                  {text ? (
                    <StepText paragraphs={text} />
                  ) : (
                    <p className="label border border-dashed border-line p-5 normal-case tracking-normal text-mute">
                      [À compléter] {step.hint}
                    </p>
                  )}
                </div>
              </Reveal>
              {media && (
                <div className="grid-12 mt-8 gap-y-3 md:mt-20 md:gap-y-6">
                  {media.map((m) => (
                    <Figure key={m.src} project={project} media={m} />
                  ))}
                </div>
              )}
            </section>
          );
        })}

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

        {/* Galerie — masquée si le projet est complet et n'a pas d'images supplémentaires */}
        {(project.gallery?.length || project.draft) && (
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
      <nav aria-label="Projet suivant" className="px-site mt-24 md:mt-48">
        <Link href={`/projets/${next.slug}`} className="group grid-12 items-end gap-y-6 border-t border-line pt-5">
          <div className="col-span-12 md:col-span-8">
            <p className="label text-mute">(Projet suivant)</p>
            <p className="display mt-3 text-[13vw] transition-colors duration-500 group-hover:text-signal md:text-[11vw]">
              {next.title} <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">→</span>
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
