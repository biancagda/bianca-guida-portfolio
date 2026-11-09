"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Apparition discrète au scroll : fondu + glissement vertical, une seule fois. */
export function Reveal({ delay = 0, y = 32, children, ...rest }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Titre dont chaque ligne monte depuis un masque (effet typographique d'affiche).
 * L'observation se fait sur le conteneur : les lignes masquées ne sont jamais
 * « visibles » pour l'IntersectionObserver.
 */
export function LineReveal({
  lines,
  className,
  delay = 0,
  as = "h1",
  inView = false,
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
    : { animate: "show" };
  return (
    <Tag className={className} initial={reduce ? false : "hidden"} {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="-mt-[0.12em] block overflow-hidden pb-[0.04em] pt-[0.12em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: "105%" },
              show: { y: "0%", transition: { duration: 1, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
