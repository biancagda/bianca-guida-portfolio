import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { categories, featuredProjects, projects } from "@/content/projects";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { Rich, pad } from "@/lib/text";

export default function Home() {
  return (
    <>
      <Hero projectCount={projects.length} />

      <Marquee items={Object.values(categories)} />

      {/* ─── Sélection ─── */}
      <section className="px-site pt-20 md:pt-32" aria-labelledby="selection">
        <SectionHead
          id="selection"
          label={`Sélection — ${pad(featuredProjects.length)}`}
          title={["Travaux", <span key="c" className="serif-i normal-case">choisis</span>]}
          aside={
            <Link href="/projets" className="label">
              <span className="u-link">Tous les projets ({pad(projects.length)}) →</span>
            </Link>
          }
        />
        <ProjectGrid projects={featuredProjects} />
      </section>

      {/* ─── À propos ─── */}
      <section className="px-site pt-24 md:pt-36" aria-labelledby="apropos">
        <SectionHead id="apropos" label="À propos" title={["Bianca", <span key="g" className="serif-i normal-case">en quelques mots</span>]} />
        <div className="grid-12 items-center gap-y-8">
          <Reveal className="col-span-12 md:col-span-4">
            <div className="group relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/portrait/bianca.jpg"
                alt={`Portrait de ${site.name}`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover object-[50%_20%] grayscale transition-[filter] duration-700 group-hover:grayscale-0"
              />
            </div>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-7 md:col-start-6" delay={0.1}>
            <p className="text-[24px] leading-[1.15] tracking-[-0.015em] md:text-[clamp(28px,3vw,48px)] md:leading-[1.1]">
              <Rich text={site.aboutIntro} />
            </p>
            <p className="mt-6 max-w-[56ch] text-paper/70 md:mt-8 md:text-[17px]">{site.bioShort}</p>
            <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
              <Link href="/a-propos" className="pill">
                Mon parcours →
              </Link>
              <Link href="/contact" className="pill pill-ghost">
                Me contacter
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Compétences & parcours ─── */}
      <section className="px-site pt-24 md:pt-36" aria-labelledby="competences">
        <SectionHead id="competences" label="Savoir-faire" title={["Compétences", <span key="p" className="serif-i normal-case">& parcours</span>]} />
        <div className="grid-12 gap-y-14">
          <div className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-10 md:col-span-7">
            {site.skills.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} className="border-t border-line pt-4">
                <p className="label text-signal">{pad(i + 1)}</p>
                <h3 className="display mt-2 text-[26px] leading-[0.95] md:text-[clamp(28px,2.4vw,40px)]">{s.title}</h3>
                <ul className="mt-3 space-y-0.5 text-[14px] text-paper/70 md:space-y-1 md:text-[15px]">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal className="col-span-12 md:col-span-4 md:col-start-9" delay={0.1}>
            <p className="label border-t border-line pt-4 text-mute">Passée par</p>
            <ul className="mt-2">
              {[...site.experiences.filter((e) => e.name !== "Freelance").map((e) => ({ a: e.name, b: `${e.role} · ${e.period}` })), { a: site.education[0].school, b: `${site.education[0].title} · ${site.education[0].period}` }].map((row) => (
                <li key={row.a} className="border-b border-line py-4">
                  <span className="display block text-[clamp(32px,3vw,48px)]">{row.a}</span>
                  <span className="label mt-1 block text-mute">{row.b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
