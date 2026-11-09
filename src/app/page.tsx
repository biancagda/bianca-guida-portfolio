import Link from "next/link";
import { site } from "@/content/site";
import { categories, featuredProjects, projects } from "@/content/projects";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { IdCard } from "@/components/IdCard";
import { BrandLogo } from "@/components/BrandLogo";
import { Rich } from "@/lib/text";
import { Icon } from "@/components/Icon";

export default function Home() {
  return (
    <>
      <Hero />

      <Marquee items={Object.values(categories)} />

      {/* ─── Sélection ─── */}
      <section className="px-site pt-20 md:pt-32" aria-labelledby="selection">
        <SectionHead
          id="selection"
          label="Sélection"
          title={["Work", <span key="s" className="serif-i block whitespace-nowrap pt-[0.08em] text-[0.3em] normal-case leading-none text-signal">projets phares</span>]}
          aside={
            <Link href="/projets" className="label">
              <span className="u-link">Tous les projets <Icon name="arrow-right" /></span>
            </Link>
          }
        />
        <ProjectGrid projects={featuredProjects} />
      </section>

      {/* ─── À propos ─── */}
      <section className="px-site pt-24 md:pt-36" aria-labelledby="apropos">
        <SectionHead id="apropos" label="À propos" title={["Bianca", <span key="g" className="serif-i normal-case">en quelques mots</span>]} />
        <div className="grid-12 items-center gap-y-16">
          <Reveal className="col-span-12 md:col-span-7">
            <IdCard />
          </Reveal>
          <Reveal className="col-span-12 md:col-span-4 md:col-start-9" delay={0.1}>
            <p className="text-[22px] leading-[1.2] tracking-[-0.015em] md:text-[clamp(22px,1.9vw,30px)] md:leading-[1.2]">
              <Rich text={site.aboutIntro} />
            </p>
            <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
              <Link href="/a-propos" className="pill">
                Mon parcours <Icon name="arrow-right" />
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
                <h3 className="display text-[26px] leading-[0.95] md:text-[clamp(28px,2.4vw,40px)]">{s.title}</h3>
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
              {site.experiences
                .filter((e) => e.logo)
                .map((e) => (
                  <li key={e.name} className="flex min-h-[86px] items-center justify-between gap-6 border-b border-line py-5">
                    <BrandLogo logo={e.logo!} name={e.name} size="clamp(26px,2.4vw,38px)" />
                    <span className="label shrink-0 text-right text-mute">{e.period}</span>
                  </li>
                ))}
              <li className="border-b border-line py-4">
                <span className="display block text-[clamp(32px,3vw,48px)]">{site.education[0].school}</span>
                <span className="label mt-1 block text-mute">
                  {site.education[0].title} · {site.education[0].period}
                </span>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
