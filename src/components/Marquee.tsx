/** Bandeau défilant des disciplines — lent, purement typographique. */
export function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span className="display px-6 text-[clamp(40px,6vw,96px)]">{it}</span>
          <span className="serif-i text-[clamp(28px,4vw,64px)] text-signal">✳︎</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="flex overflow-hidden border-y border-line py-3">
      <p className="sr-only">{items.join(", ")}</p>
      <div className="flex w-max animate-[marquee_40s_linear_infinite]" aria-hidden>
        {row}
        {row}
      </div>
    </div>
  );
}
