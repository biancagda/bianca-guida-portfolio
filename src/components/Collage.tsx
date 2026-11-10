import { useId } from "react";

/** Éléments de papeterie vintage réutilisables : trombone, pince, ruban adhésif. */

const CLIP_PATH = "M14 34V84a8 8 0 0 0 16 0V20a13 13 0 0 0-26 0v68a17 17 0 0 0 34 0V30";

export function PaperClip({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 40 110" aria-hidden className={`drop-shadow-[2px_3px_2px_rgba(0,0,0,0.35)] ${className}`} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id={`m${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f4f2" />
          <stop offset="0.35" stopColor="#a9aaa7" />
          <stop offset="0.55" stopColor="#e9e9e6" />
          <stop offset="0.8" stopColor="#8d8e8b" />
          <stop offset="1" stopColor="#cfd0cc" />
        </linearGradient>
      </defs>
      <path d={CLIP_PATH} stroke="rgba(0,0,0,0.18)" strokeWidth="3.4" transform="translate(2.5 3)" />
      <path d={CLIP_PATH} stroke="#6f706d" strokeWidth="3.4" />
      <path d={CLIP_PATH} stroke={`url(#m${id})`} strokeWidth="2.6" />
      <path d={CLIP_PATH} stroke="rgba(255,255,255,0.75)" strokeWidth="0.7" transform="translate(-0.6 -0.6)" />
    </svg>
  );
}

/** Pince à dessin noire (binder clip), vue de face, avec ses deux leviers métalliques. */
export function BinderClip({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 80" aria-hidden className={`drop-shadow-[2px_4px_3px_rgba(0,0,0,0.5)] ${className}`} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* leviers */}
      <path d="M20 40 L14 8 Q14 3 20 3 L28 3" stroke="#8d8e8b" strokeWidth="3.2" />
      <path d="M44 40 L50 8 Q50 3 44 3 L36 3" stroke="#8d8e8b" strokeWidth="3.2" />
      <path d="M20 40 L14 8 Q14 3 20 3 L28 3" stroke="#ecece8" strokeWidth="1.2" />
      <path d="M44 40 L50 8 Q50 3 44 3 L36 3" stroke="#ecece8" strokeWidth="1.2" />
      {/* corps de la pince */}
      <path d="M8 40 H56 L52 76 Q32 80 12 76 Z" fill="#141413" />
      <path d="M8 40 H56 L55 47 H9 Z" fill="#2b2b29" />
      <path d="M14 52 H50" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="2" />
    </svg>
  );
}

/** Morceau de ruban adhésif translucide. */
export function Tape({ className = "", yellow = false }: { className?: string; yellow?: boolean }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none block h-[26px] w-[96px] shadow-[0_1px_2px_rgba(0,0,0,0.25)] [clip-path:polygon(3%_0,97%_4%,100%_30%,97%_55%,100%_100%,2%_96%,0_60%,3%_35%)] ${
        yellow ? "bg-signal/80" : "bg-[#f3efe6]/55"
      } ${className}`}
    />
  );
}
