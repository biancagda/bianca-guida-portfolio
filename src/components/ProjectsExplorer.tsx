"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categories, type CategoryKey, type Project } from "@/content/projects";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectIndex } from "./ProjectIndex";

type View = "index" | "grille";
const VIEW_KEY = "bg-projets-vue";

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<CategoryKey | "all">("all");
  const [view, setView] = useState<View>("grille");

  useEffect(() => {
    try {
      const v = localStorage.getItem(VIEW_KEY);
      if (v === "index" || v === "grille") setView(v);
    } catch {}
  }, []);
  const changeView = (v: View) => {
    setView(v);
    try {
      localStorage.setItem(VIEW_KEY, v);
    } catch {}
  };

  // Seules les catégories réellement utilisées apparaissent dans les filtres.
  const used = useMemo(() => {
    const present = new Set(projects.flatMap((p) => p.categories));
    return (Object.keys(categories) as CategoryKey[]).filter((c) => present.has(c)).map((c) => ({ key: c }));
  }, [projects]);

  const list = filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <>
      {/* Téléphone : une seule ligne de filtres qui défile horizontalement */}
      <div className="sticky top-14 z-20 -mx-[clamp(16px,3vw,40px)] mb-10 flex flex-col gap-3 bg-ink/95 py-3 md:top-16 md:mb-20 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-4 md:px-[clamp(16px,3vw,40px)]">
        <div
          className="flex gap-2 overflow-x-auto px-[clamp(16px,3vw,40px)] [scrollbar-width:none] md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Filtrer par catégorie"
        >
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")} label="Tout" />
          {used.map((c) => (
            <FilterButton key={c.key} active={filter === c.key} onClick={() => setFilter(c.key)} label={categories[c.key]} />
          ))}
        </div>
        <div className="label flex gap-4 px-[clamp(16px,3vw,40px)] md:px-0" role="group" aria-label="Affichage">
          {(["grille", "index"] as View[]).map((v) => (
            <button key={v} type="button" onClick={() => changeView(v)} aria-pressed={view === v} className={view === v ? "text-paper" : "text-mute hover:text-paper"}>
              {view === v ? "● " : "○ "}
              {v === "grille" ? "Grille" : "Index"}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {list.length} projet{list.length > 1 ? "s" : ""} affiché{list.length > 1 ? "s" : ""}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${view}-${filter}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {view === "grille" ? <ProjectGrid projects={list} variant="compact" /> : <ProjectIndex projects={list} />}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function FilterButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="label shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 shadow-[inset_0_0_0_1px_var(--color-line)] transition-colors duration-300 hover:bg-paper hover:text-ink aria-pressed:bg-paper aria-pressed:text-ink"
    >
      {label}
    </button>
  );
}
