import { Fragment } from "react";

/** Transforme « du texte *en italique* » : les passages entre *étoiles* passent en serif italique. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <em key={i} className="serif-i">
            {p.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

export const pad = (n: number) => String(n).padStart(2, "0");
