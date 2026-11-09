"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/content/site";
import { Rich } from "@/lib/text";
import { LineReveal } from "./Reveal";
import { Icon } from "./Icon";

/** Délai d'apparition : on attend la fin de l'intro si elle est jouée. */
function useStartDelay() {
  const [delay] = useState(() =>
    typeof document !== "undefined" && document.documentElement.dataset.introSeen ? 0.15 : 1.55,
  );
  return delay;
}

export function Hero() {
  const d = useStartDelay();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Le nom glisse doucement en sens opposés au scroll : la composition « respire ».
  const left = useTransform(scrollY, [0, 800], [0, reduce ? 0 : -120]);
  const right = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 120]);
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: d + delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  });
  const [first, ...rest] = site.name.toUpperCase().split(" ");
  const last = rest.join(" ");

  return (
    <section className="px-site relative flex min-h-[100svh] flex-col pb-10 pt-24 md:pt-28" aria-labelledby="hero-title">
      <motion.div {...fade(0.3)} className="grid-12 label gap-y-2 border-t border-line pt-3 text-mute">
        <span className="col-span-4 md:col-span-3">(Portfolio © {new Date().getFullYear()})</span>
        {site.availability && (
          <span className="col-span-8 flex items-center justify-end gap-2 text-paper md:col-span-5 md:justify-start">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            {site.availability}
          </span>
        )}
        <span className="col-span-4 hidden md:block md:text-right">{site.city}, France</span>
      </motion.div>

      <h1 id="hero-title" className="sr-only">
        {site.name} — {site.role}
      </h1>

      <div className="mt-auto pt-10" aria-hidden>
        {/* Ligne 1 : prénom + portrait */}
        <div className="flex items-end justify-between gap-6">
          <motion.div style={{ x: left }}>
            <LineReveal as="p" delay={d} className="display text-[30vw] md:text-[21vw]" lines={[first]} />
          </motion.div>
          <motion.div
            initial={reduce ? false : { scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: d + 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative mb-[2.2vw] hidden aspect-square w-[14vw] shrink-0 overflow-hidden rounded-full md:block"
          >
            <Image
              src="/images/portrait/bianca.jpg"
              alt=""
              fill
              sizes="15vw"
              priority
              className="object-cover object-[50%_20%] grayscale transition-[filter] duration-700 group-hover:grayscale-0"
            />
          </motion.div>
        </div>

        {/* Ligne 2 : rôle + nom */}
        <div className="-mt-[1vw] flex items-end justify-between gap-6">
          <motion.p {...fade(0.5)} className="label mb-[2.6vw] hidden max-w-[30ch] leading-relaxed md:block">
            {site.role}
          </motion.p>
          <motion.div style={{ x: right }} className="ml-auto">
            <LineReveal as="p" delay={d + 0.08} className="display text-right text-[30vw] md:text-[21vw]" lines={[last]} />
          </motion.div>
        </div>
      </div>

      <div className="grid-12 mt-8 items-end gap-y-8 md:mt-4">
        <motion.p {...fade(0.6)} className="label col-span-12 md:hidden">
          {site.role}
        </motion.p>
        <motion.p {...fade(0.65)} className="col-span-12 text-[clamp(24px,2.6vw,40px)] leading-[1.12] tracking-[-0.01em] md:col-span-7 md:col-start-1">
          <Rich text={site.headline} />
        </motion.p>
        <motion.div {...fade(0.8)} className="col-span-12 flex gap-3 md:col-span-5 md:justify-end">
          <Link href="/projets" className="pill">
            Travail <Icon name="arrow-down-right" />
          </Link>
          <Link href="/a-propos" className="pill pill-ghost">
            À propos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
