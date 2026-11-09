import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { LineReveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Projets",
  description: "Campagnes, identités visuelles, packaging et édition : l'ensemble des projets de direction artistique de Bianca Guida.",
  alternates: { canonical: "/projets" },
};

export default function ProjetsPage() {
  return (
    <section className="px-site pt-28 md:pt-36">
      <div className="grid-12 mb-10 items-end gap-y-4 md:mb-14">
        <LineReveal
          className="display col-span-12 text-[24vw] md:col-span-9 md:text-[17vw]"
          lines={[
            "Projets",
            <span key="s" className="serif-i block whitespace-nowrap pt-[0.1em] text-[0.36em] normal-case leading-none text-signal">
              de l&apos;idée à l&apos;image
            </span>,
          ]}
        />
        <p className="col-span-12 max-w-[34ch] pb-[1.5vw] text-paper/70 md:col-span-3">
          Campagnes 360, identités visuelles, direction artistique et édition.
        </p>
      </div>
      <ProjectsExplorer projects={projects} />
    </section>
  );
}
