import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { categories, featuredProjects, projects } from "@/content/projects";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProjectGrid } from "@/components/ProjectGrid";
import { LineReveal, Reveal } from "@/components/Reveal";
import { Rich, pad } from "@/lib/text";

export default function Home() {
  return (
    <>
      <Hero projectCount={projects.length} />

      <Marquee items={Object.values(categories)} />

      {/* ─── Sélection ─── */}
      <section className="px-site pt-20 md:pt-40" aria-labelledby="selection">
        <div className="grid-12 mb-10 items-end gap-y-4 md:mb-24 md:gap-y-6">
          <p className="label col-span-12 text-mute md:col-span-3">(Sélection — {pad(featuredProjects.length)})</p>
          <LineReveal
            as="h2"
            inView
            className="display col-span-12 text-[16vw] md:col-span-6 md:text-[9vw]"
            lines={["Travaux", <span key="c" className="serif-i normal-case">choisis</span>]}
          />
          <Link href="/projets" className="label col-span-12 md:col-span-3 md:justify-self-end">
            <span className="u-link">Tous les projets ({pad(projects.length)}) →</span>
          </Link>
        </div>
        <ProjectGrid projects={featuredProjects} />
      </section>

      {/* ─── À propos ─── */}
      <section className="px-site pt-24 md:pt-56" aria-labelledby="apropos">
        <div className="grid-12 gap-y-6 border-t border-line pt-6 md:gap-y-10">
          <h2 id="apropos" className="label col-span-12 text-mute md:col-span-3">
            (À propos)
          </h2>
          <Reveal className="col-span-12 md:col-span-9">
            <p className="text-[24px] leading-[1.15] tracking-[-0.015em] md:text-[clamp(28px,3.6vw,58px)] md:leading-[1.08]">
              <Image
                src="/images/portrait/bianca.jpg"
                alt={`Portrait de ${site.name}`}
                width={240}
                height={240}
                className="mr-3 inline-block aspect-square w-[1.6em] -translate-y-[0.12em] rounded-full object-cover object-[50%_20%] align-middle grayscale"
              />
              <Rich text={site.aboutIntro} />
            </p>
            <p className="mt-6 hidden max-w-[52ch] text-paper/70 md:mt-10 md:block">{site.bioShort}</p>
            <Link href="/a-propos" className="pill pill-ghost mt-8 md:mt-10">
              Mon parcours →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── Compétences ─── */}
      <section className="px-site pt-24 md:pt-48" aria-labelledby="competences">
        <div className="grid-12 gap-y-8 border-t border-line pt-6 md:gap-y-10">
          <h2 id="competences" className="label col-span-12 text-mute md:col-span-3">
            (Compétences)
          </h2>
          <div className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-8 md:col-span-9 md:grid-cols-4 md:gap-y-12">
            {site.skills.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <p className="label text-signal">{pad(i + 1)}</p>
                <h3 className="display mt-2 text-[24px] leading-[0.95] md:mt-3 md:text-[clamp(28px,2.6vw,40px)]">{s.title}</h3>
                <ul className="mt-3 space-y-0.5 text-[14px] text-paper/70 md:mt-4 md:space-y-1 md:text-[15px]">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Expériences ─── */}
      <section className="px-site pt-24 md:pt-48" aria-labelledby="experiences">
        <div className="grid-12 gap-y-6 border-t border-line pt-6">
          <h2 id="experiences" className="label col-span-12 text-mute md:col-span-3">
            (Passée par)
          </h2>
          <ul className="col-span-12 md:col-span-9">
            {site.experiences.map((e) => (
              <li key={e.name} className="flex flex-wrap items-baseline justify-between gap-x-6 border-b border-line py-4">
                <span className="display text-[clamp(36px,6vw,96px)]">{e.name}</span>
                <span className="label text-mute">{e.role}</span>
              </li>
            ))}
            {site.education.map((e) => (
              <li key={e.school} className="flex flex-wrap items-baseline justify-between gap-x-6 border-b border-line py-4">
                <span className="display text-[clamp(36px,6vw,96px)]">{e.school}</span>
                <span className="label text-mute">{e.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
