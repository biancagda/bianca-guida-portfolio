"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";

const KEY = "bg-intro-seen";

/**
 * Écran d'ouverture, joué une seule fois par session (≈1,5 s).
 * Un petit script dans <head> le masque avant même l'affichage si déjà vu.
 */
export function Intro() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {}
    if (seen || reduce) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(t);
  }, [reduce]);

  if (done) return null;
  const letters = site.name.toUpperCase().split("");

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem("${KEY}")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.introSeen="1"}catch(e){}`,
        }}
      />
      <style>{`html[data-intro-seen] .intro-overlay{display:none}`}</style>
      <motion.div
        aria-hidden
        className="intro-overlay fixed inset-0 z-[70] flex items-center justify-center bg-ink"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ delay: 1.35, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="display flex overflow-hidden text-[clamp(56px,13vw,220px)]">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: ["110%", "0%", "0%", "-110%"] }}
              transition={{ duration: 1.5, times: [0, 0.35, 0.75, 1], delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
            >
              {l === " " ? " " : l}
            </motion.span>
          ))}
        </div>
        <motion.p
          className="label absolute bottom-6 left-1/2 -translate-x-1/2 text-mute"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, times: [0, 0.3, 1] }}
        >
          Portfolio — {new Date().getFullYear()}
        </motion.p>
      </motion.div>
    </>
  );
}
