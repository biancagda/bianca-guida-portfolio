"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { thumbnailOf, type Project } from "@/content/projects";
import { categoryList } from "./ProjectMeta";

/**
 * Index éditorial des projets : une ligne par projet, comme une table des
 * matières de magazine. Au survol (souris), le visuel du projet suit le curseur.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 28, mass: 0.6 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <div className="grid-12 label border-b border-line pb-3 text-mute">
        <span className="col-span-8 md:col-span-6">Projet</span>
        <span className="col-span-4 hidden md:block">Discipline</span>
        <span className="col-span-4 text-right md:col-span-2">Année</span>
      </div>
      <ul>
        {projects.map((p) => (
          <li key={p.slug} className="border-b border-line">
            <Link
              href={`/projets/${p.slug}`}
              className="grid-12 group items-baseline py-4 transition-colors duration-300 md:py-5"
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(p)}
              onFocus={() => setActive(null)}
            >
              <span className="col-span-12 md:col-span-6">
                <span className="display block text-[clamp(34px,4.6vw,72px)] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3 ">
                  {p.title}
                </span>
                <span className="label mt-1 block text-mute md:hidden">{categoryList(p)}</span>
              </span>
              <span className="label col-span-4 hidden text-mute md:block">{categoryList(p)}</span>
              <span className="label col-span-2 hidden text-right text-mute md:block">
                {p.year ?? "—"}
                {p.draft && <span className="ml-2 text-signal">●</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {projects.some((p) => p.draft) && (
        <p className="label mt-4 text-mute">
          <span className="text-signal">●</span> Étude de cas en cours de rédaction
        </p>
      )}

      {/* Aperçu flottant — souris uniquement */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden w-[min(28vw,400px)] md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      >
        <AnimatePresence mode="popLayout">
          {active && (
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-[4/5] overflow-hidden"
              style={{ backgroundColor: active.color }}
            >
              {thumbnailOf(active) ? (
                <Image src={thumbnailOf(active)!.src} alt="" width={thumbnailOf(active)!.width} height={thumbnailOf(active)!.height} sizes="400px" className="h-full w-full object-cover" />
              ) : (
                <div className="display flex h-full items-end p-5 text-[64px]" style={{ color: active.ink }}>
                  {active.title}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
