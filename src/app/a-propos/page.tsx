import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { LineReveal, Reveal } from "@/components/Reveal";
import { Rich, pad } from "@/lib/text";

export const metadata: Metadata = {
  title: "À propos",
  description: `${site.name}, directrice artistique et designer graphique à Paris, diplômée de Sup de Pub Paris. Parcours, vision du design et compétences.`,
  alternates: { canonical: "/a-propos" },
};

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid-12 gap-y-6 border-t border-line pt-5">
      <h2 className="label col-span-12 text-mute md:col-span-4">({label})</h2>
      <div className="col-span-12 md:col-span-8">{children}</div>
    </Reveal>
  );
}

export default function AboutPage() {
  const { about } = site;
  return (
    <div className="px-site pt-28 md:pt-36">
      <LineReveal className="display text-[24vw] md:text-[17vw]" lines={["À propos"]} />

      <div className="grid-12 mt-10 gap-y-12 md:mt-16">
        <Reveal className="col-span-12 md:col-span-5">
          <figure className="group relative">
            {/* Emplacement photo : remplace public/images/portrait/bianca.jpg */}
            <div className="relative aspect-square overflow-hidden md:aspect-[4/5]">
              <Image
                src="/images/portrait/bianca.jpg"
                alt={`Portrait de ${site.name}`}
                fill
                priority
                sizes="(min-width:768px) 40vw, 100vw"
                className="object-cover object-[50%_25%] grayscale transition-[filter] duration-700 group-hover:grayscale-0"
              />
            </div>
            <figcaption className="label mt-3 flex justify-between text-mute">
              <span>{site.name}</span>
              <span>{site.city}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="text-[30px] leading-[1.05] tracking-[-0.02em] md:text-[clamp(34px,4.4vw,72px)] md:leading-[1]">
              <Rich text={about.statement} />
            </p>
          </Reveal>
          <Reveal className="mt-6 space-y-4 text-[16px] leading-[1.55] md:mt-10 md:space-y-5 md:text-[clamp(18px,1.45vw,22px)] md:leading-[1.45]" delay={0.1}>
            {about.paragraphs.map((p, i) => (
              <p key={i} className={i ? "text-paper/75" : ""}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="pill">
              Me contacter
            </Link>
            <Link href="/projets" className="pill pill-ghost">
              Voir les projets
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 space-y-16 md:mt-48 md:space-y-32">
        <Block label="Parcours">
          <ul>
            {[...site.education.map((e) => ({ a: e.school, b: e.title, c: e.period })), ...site.experiences.map((e) => ({ a: e.name, b: e.role, c: "" }))].map(
              (row, i) => (
                <li key={i} className="grid grid-cols-12 items-baseline gap-x-4 border-b border-line py-5">
                  <span className="label col-span-2 text-signal">{pad(i + 1)}</span>
                  <span className="display col-span-10 text-[clamp(30px,3.6vw,56px)] md:col-span-5">{row.a}</span>
                  <span className="col-span-10 col-start-3 text-paper/70 md:col-span-5">
                    {row.b}
                    {row.c && <span className="label block text-mute">{row.c}</span>}
                  </span>
                </li>
              ),
            )}
          </ul>
        </Block>

        <Block label="Vision">
          <div className="space-y-6">
            {about.vision.map((p, i) => (
              <p key={i} className={i ? "text-[16px] leading-[1.55] text-paper/75 md:text-[clamp(18px,1.45vw,22px)] md:leading-[1.45]" : "serif-i text-[24px] leading-[1.15] md:text-[clamp(28px,3vw,46px)] md:leading-[1.1]"}>
                {p}
              </p>
            ))}
          </div>
        </Block>

        <Block label="Compétences">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-y-10">
            {site.skills.map((s) => (
              <div key={s.title}>
                <h3 className="display text-[clamp(26px,2.2vw,34px)]">{s.title}</h3>
                <ul className="mt-3 space-y-0.5 text-[14px] text-paper/70 md:space-y-1 md:text-[15px]">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Block>

        <Block label="Inspirations">
          {about.inspirations.length ? (
            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[clamp(26px,3vw,46px)] leading-tight">
              {about.inspirations.map((it, i) => (
                <li key={it} className={i % 2 ? "serif-i" : "display"}>
                  {it}
                  {i < about.inspirations.length - 1 && <span className="text-mute">,</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="border border-dashed border-line p-5 text-mute">
              [À compléter dans <code>src/content/site.ts</code> → <code>about.inspirations</code>] Studios, designers, magazines, artistes, films… ce qui nourrit ton regard.
            </p>
          )}
        </Block>

        {about.personality && (
          <Block label="En dehors du studio">
            <p className="text-[clamp(18px,1.45vw,22px)] leading-[1.45]">{about.personality}</p>
          </Block>
        )}
      </div>
    </div>
  );
}
