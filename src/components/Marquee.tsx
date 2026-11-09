import { Icon } from "./Icon";
/** Bandeau défilant des disciplines — lent, purement typographique. */
export function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span className="display px-6 text-[40px] md:px-5 md:text-[clamp(36px,3.6vw,60px)]">{it}</span>
          <Icon name="star" className="h-[22px] w-[22px] text-signal md:h-[clamp(18px,1.8vw,28px)] md:w-[clamp(18px,1.8vw,28px)]" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="flex overflow-hidden border-y border-line py-3 md:py-2">
      <p className="sr-only">{items.join(", ")}</p>
      <div className="flex w-max animate-[marquee_40s_linear_infinite]" aria-hidden>
        {row}
        {row}
      </div>
    </div>
  );
}
