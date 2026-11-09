/**
 * Pictogrammes au trait, dessinés en SVG : rendu identique sur tous les écrans
 * (aucun emoji système, notamment sur iPhone). Ils prennent la couleur et la taille du texte.
 */
type Name = "arrow-right" | "arrow-left" | "arrow-up" | "arrow-up-right" | "arrow-down-right" | "dot" | "ring" | "star";

const paths: Record<Name, React.ReactNode> = {
  "arrow-right": <path d="M3 12h17M14 6l6 6-6 6" />,
  "arrow-left": <path d="M21 12H4M10 6l-6 6 6 6" />,
  "arrow-up": <path d="M12 21V4M6 10l6-6 6 6" />,
  "arrow-up-right": <path d="M6 18L18 6M8 6h10v10" />,
  "arrow-down-right": <path d="M6 6l12 12M18 8v10H8" />,
  dot: <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />,
  ring: <circle cx="12" cy="12" r="4.5" />,
  star: <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />,
};

export function Icon({ name, className = "" }: { name: Name; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={name === "star" ? 2.2 : 1.6}
      strokeLinecap="square"
      aria-hidden
      className={`inline-block h-[0.85em] w-[0.85em] shrink-0 align-[-0.08em] ${className}`}
    >
      {paths[name]}
    </svg>
  );
}
