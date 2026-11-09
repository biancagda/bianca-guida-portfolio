"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { Rich } from "@/lib/text";
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
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: d + delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="px-site relative flex flex-col pb-10 pt-24 md:pt-28" aria-labelledby="hero-title">
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
        {site.name} — Creative portfolio — {site.role}
      </h1>

      {/* ─── Page de garde : un dossier posé sur fond noir ─── */}
      <motion.div
        aria-hidden
        initial={reduce ? false : { opacity: 0, y: 40, rotate: -1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: d, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-14 w-full max-w-[1180px] md:mt-12"
      >
        {/* Feuille glissée dans le dossier, qui dépasse en haut */}
        <div className="paper-tex absolute inset-x-[4%] -top-[4%] h-[30%] -rotate-[0.8deg] rounded-[2px] bg-[#f3efe6] shadow-[0_1px_0_rgba(0,0,0,0.2)]">
          <div className="h-[38%] w-[62%] bg-signal/70 bg-[repeating-linear-gradient(0deg,rgba(14,14,13,0.18)_0_1px,transparent_1px_6px),repeating-linear-gradient(90deg,rgba(14,14,13,0.18)_0_1px,transparent_1px_6px)]" />
          <div className="absolute left-[66%] top-[10%] space-y-1 font-mono text-[clamp(6px,0.7vw,10px)] leading-none text-ink/70">
            <p>DOSSIER — DA / DESIGN GRAPHIQUE</p>
            <p>RÉF. BG-{new Date().getFullYear()}</p>
          </div>
        </div>

        {/* Onglet du dossier */}
        <div className="paper-tex relative ml-[6%] h-[clamp(18px,2.4vw,34px)] w-[30%] rounded-t-[10px] bg-[#e6c993]" />

        {/* Dossier */}
        <div className="paper-tex relative overflow-hidden rounded-[6px] rounded-tl-none bg-[#ecd3a3] px-[6%] pb-[9%] pt-[34%] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] md:pt-[9%] md:pb-[7%]">
          {/* pli du carton */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[7%] h-px bg-ink/15" />

          <div className="relative text-center md:pr-[17%]">
            <p className="serif-i relative z-10 text-[19vw] leading-[0.8] text-ink md:text-[clamp(90px,10vw,170px)]">Creative</p>
            <p className="display -mt-[0.12em] text-[22vw] leading-[0.85] text-ink md:text-[clamp(120px,15.5vw,250px)]">Portfolio</p>
            <p className="label mt-5 text-[11px] tracking-[0.3em] text-ink md:mt-7 md:text-[13px]">
              <span className="highlight px-1">{site.name}</span>
            </p>
          </div>
        </div>

        {/* Polaroïd trombonné */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -30, rotate: 12 }}
          animate={{ opacity: 1, y: 0, rotate: 5 }}
          transition={{ delay: d + 0.45, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="paper-tex group absolute -top-[5%] right-[2%] w-[27%] bg-[#f4f1ea] p-[2.2%] pb-[7%] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)] md:-top-[8%] md:right-[3%] md:w-[18%] md:p-[1.2%] md:pb-[4%]"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/portrait/bianca.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 20vw, 30vw"
              priority
              className="object-cover object-[50%_18%] contrast-[1.05] grayscale sepia-[0.15] transition-[filter] duration-700 group-hover:grayscale-0 group-hover:sepia-0"
            />
          </div>
          {/* trombone métallique : dégradé argenté, reflet, ombre portée sur le papier */}
          <svg
            viewBox="0 0 40 110"
            className="absolute -top-[16%] right-[10%] h-[44%] w-auto rotate-[8deg] drop-shadow-[2px_3px_2px_rgba(0,0,0,0.35)]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <linearGradient id="clip-metal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f4f4f2" />
                <stop offset="0.35" stopColor="#a9aaa7" />
                <stop offset="0.55" stopColor="#e9e9e6" />
                <stop offset="0.8" stopColor="#8d8e8b" />
                <stop offset="1" stopColor="#cfd0cc" />
              </linearGradient>
            </defs>
            {/* ombre douce sur le polaroïd */}
            <path d="M14 34V84a8 8 0 0 0 16 0V20a13 13 0 0 0-26 0v68a17 17 0 0 0 34 0V30" stroke="rgba(0,0,0,0.18)" strokeWidth="3.4" transform="translate(2.5 3)" />
            {/* fil de métal */}
            <path d="M14 34V84a8 8 0 0 0 16 0V20a13 13 0 0 0-26 0v68a17 17 0 0 0 34 0V30" stroke="#6f706d" strokeWidth="3.4" />
            <path d="M14 34V84a8 8 0 0 0 16 0V20a13 13 0 0 0-26 0v68a17 17 0 0 0 34 0V30" stroke="url(#clip-metal)" strokeWidth="2.6" />
            {/* reflet */}
            <path d="M14 34V84a8 8 0 0 0 16 0V20a13 13 0 0 0-26 0v68a17 17 0 0 0 34 0V30" stroke="rgba(255,255,255,0.75)" strokeWidth="0.7" transform="translate(-0.6 -0.6)" />
          </svg>
        </motion.div>
      </motion.div>

      <div className="grid-12 mt-12 items-end gap-y-8 md:mt-14">
        <motion.p {...fade(0.6)} className="label col-span-12">
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
