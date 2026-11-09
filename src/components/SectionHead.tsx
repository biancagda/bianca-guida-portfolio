import { LineReveal } from "./Reveal";

/** En-tête de section commun : étiquette, grand titre, élément optionnel aligné à droite. */
export function SectionHead({
  id,
  label,
  title,
  aside,
}: {
  id: string;
  label: string;
  title: React.ReactNode[];
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t border-line pt-5 md:mb-14">
      <div>
        <p className="label mb-3 text-signal">{label}</p>
        <LineReveal as="h2" inView className="display text-[14vw] md:text-[clamp(64px,7vw,120px)]" lines={title} />
        <span id={id} className="sr-only">{label}</span>
      </div>
      {aside && <div className="pb-2">{aside}</div>}
    </div>
  );
}
