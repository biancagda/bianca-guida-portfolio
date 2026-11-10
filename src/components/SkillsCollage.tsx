import { site } from "@/content/site";
import { BinderClip, PaperClip, Tape } from "./Collage";
import { Reveal } from "./Reveal";

/**
 * Compétences en collage vintage : chaque domaine est un dossier en carton,
 * avec sa feuille qui dépasse, son onglet et un accessoire de papeterie.
 */
type Look = {
  body: string;
  tab: string;
  ink: string;
  sub: string;
  rule: string;
  sheet: "grid-yellow" | "grid-white" | "cream";
  rotate: string;
  extra: "clip" | "tape" | "binder" | "stamp";
};

const looks: Look[] = [
  { body: "paper-tex paper-tex-dark bg-[#2a2a27]", tab: "paper-tex paper-tex-dark bg-[#2f2f2c]", ink: "text-paper", sub: "text-paper/80", rule: "border-paper/20", sheet: "grid-yellow", rotate: "md:-rotate-[1.6deg]", extra: "clip" },
  { body: "paper-tex bg-[#f3efe6]", tab: "paper-tex bg-[#e9e4d8]", ink: "text-ink", sub: "text-ink/80", rule: "border-ink/25", sheet: "grid-white", rotate: "md:rotate-[1.2deg] md:mt-10", extra: "tape" },
  { body: "paper-tex bg-signal", tab: "paper-tex bg-[#e6f25a]", ink: "text-ink", sub: "text-ink/80", rule: "border-ink/25", sheet: "cream", rotate: "md:rotate-[0.8deg] md:-mt-4", extra: "binder" },
  { body: "paper-tex paper-tex-dark bg-[#2a2a27]", tab: "paper-tex paper-tex-dark bg-[#2f2f2c]", ink: "text-paper", sub: "text-paper/80", rule: "border-paper/20", sheet: "cream", rotate: "md:-rotate-[1deg] md:mt-6", extra: "stamp" },
];

const sheets = {
  "grid-yellow":
    "bg-signal/80 bg-[repeating-linear-gradient(0deg,rgba(14,14,13,0.16)_0_1px,transparent_1px_7px),repeating-linear-gradient(90deg,rgba(14,14,13,0.16)_0_1px,transparent_1px_7px)]",
  "grid-white":
    "bg-[#fbfaf6] bg-[repeating-linear-gradient(0deg,rgba(14,14,13,0.1)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(14,14,13,0.1)_0_1px,transparent_1px_8px)]",
  cream: "bg-[#f3efe6]",
};

export function SkillsCollage() {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-10 pt-6 md:gap-x-6 md:gap-y-12">
      {site.skills.map((s, i) => {
        const l = looks[i % looks.length];
        return (
          <Reveal key={s.title} delay={i * 0.08} className={l.rotate}>
            <article className="relative">
              {/* Feuille qui dépasse du dossier */}
              <div className={`paper-tex absolute inset-x-[7%] -top-[10px] h-[44px] -rotate-[1.2deg] rounded-[2px] md:-top-[14px] md:h-[60px] ${sheets[l.sheet]}`} />
              {/* Onglet */}
              <div className={`relative ml-[8%] flex h-[20px] w-[56%] items-center rounded-t-[7px] px-2 md:h-[30px] md:w-[52%] md:rounded-t-[9px] md:px-4 ${l.tab}`}>
                <span className={`hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] md:inline ${l.sub}`}>Savoir-faire</span>
              </div>
              {/* Dossier */}
              <div className={`relative rounded-[6px] rounded-tl-none px-3.5 pb-4 pt-3.5 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.9)] md:px-7 md:pb-7 md:pt-6 ${l.body}`}>
                <h3 className={`display relative z-10 text-[22px] leading-[0.95] md:text-[clamp(30px,2.6vw,42px)] ${l.ink}`}>{s.title}</h3>
                <ul className="relative z-10 mt-2 md:mt-4">
                  {s.items.map((it) => (
                    <li key={it} className={`serif-i border-b py-1 text-[14px] leading-tight md:py-1.5 md:text-[clamp(17px,1.35vw,21px)] md:leading-snug ${l.rule} ${l.sub}`}>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accessoire */}
              {l.extra === "clip" && <PaperClip className="absolute -top-[22px] right-[10%] z-20 h-[52px] w-auto rotate-[10deg] md:-top-[30px] md:h-[78px]" />}
              {l.extra === "tape" && <Tape yellow className="absolute -top-[16px] right-[6%] z-20 h-[18px] w-[60px] rotate-[8deg] md:-top-[22px] md:h-[26px] md:w-[96px]" />}
              {l.extra === "binder" && <BinderClip className="absolute -top-[22px] right-[12%] z-20 h-[40px] w-auto rotate-[4deg] md:-top-[30px] md:h-[58px]" />}
              {l.extra === "stamp" && (
                <svg viewBox="0 0 200 200" aria-hidden className="absolute -bottom-[22px] right-[6%] z-20 hidden w-[92px] -rotate-12 text-signal md:block md:-bottom-[22px] md:right-[6%] md:w-[92px]">
                  <defs>
                    <path id="skills-stamp" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
                  </defs>
                  <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="4" />
                  <text fill="currentColor" fontSize="17" letterSpacing="3" fontFamily="ui-monospace, monospace">
                    <textPath href="#skills-stamp">VALIDÉ • BIANCA GUIDA • PARIS •</textPath>
                  </text>
                  <text x="100" y="114" textAnchor="middle" fill="currentColor" fontSize="40" fontStyle="italic" fontFamily="Georgia, serif">
                    OK
                  </text>
                </svg>
              )}
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
