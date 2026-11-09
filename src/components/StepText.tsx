"use client";

import { useState } from "react";

/**
 * Texte d'une étape d'étude de cas.
 * Sur téléphone, seul le premier paragraphe est affiché ; la suite s'ouvre
 * avec « Lire la suite ». Sur ordinateur, tout est visible.
 */
export function StepText({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false);
  const [first, ...rest] = paragraphs;
  return (
    <div className="space-y-4 text-[16px] leading-[1.55] md:space-y-5 md:text-[clamp(18px,1.45vw,22px)] md:leading-[1.45]">
      <p className="text-paper">{first}</p>
      {rest.map((para, i) => (
        <p key={i} className={`text-paper/75 ${open ? "block" : "hidden md:block"}`}>
          {para}
        </p>
      ))}
      {rest.length > 0 && !open && (
        <button type="button" onClick={() => setOpen(true)} className="label text-signal md:hidden" aria-expanded={open}>
          Lire la suite +
        </button>
      )}
    </div>
  );
}
