import Image from "next/image";
import { site } from "@/content/site";

/**
 * Carte d'identité créative : esprit « carte de membre » vintage,
 * déclinée sur fond noir avec des pointes de jaune.
 */
export function IdCard() {
  const year = new Date().getFullYear();
  const fields = [
    { k: "Nom", v: site.name },
    { k: "Spécialité", v: "Direction artistique" },
    { k: "Croit en", v: "L'idée avant l'image" },
  ];

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[14px] border border-paper/15 bg-[#1d1d1b] p-[6%] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] md:p-[5%]">
        <div className="flex gap-[6%]">
          {/* Colonne texte */}
          <div className="min-w-0 flex-1">
            <p className="display text-[clamp(26px,3vw,46px)] leading-none text-paper">
              Creative <span className="text-signal">ID</span>
            </p>
            <p className="mt-3 font-mono text-[clamp(9px,0.85vw,13px)] uppercase leading-[1.45] tracking-wide text-paper/65">
              La titulaire de cette carte
              <br />
              est directrice artistique
              <br />
              certifiée Sup de Pub Paris
            </p>

            <dl className="mt-[9%] space-y-[6%]">
              {fields.map((f) => (
                <div key={f.k} className="flex items-baseline gap-2">
                  <dt className="shrink-0 pb-1 font-mono text-[clamp(9px,0.8vw,12px)] uppercase tracking-wide text-paper/65">{f.k} :</dt>
                  <dd className="serif-i min-w-0 flex-1 border-b border-paper/30 pb-1 text-[clamp(17px,1.8vw,28px)] leading-[1.05] text-signal">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="display mt-[9%] text-[clamp(13px,1vw,16px)] tracking-wide text-paper">ID N° {year}-BG</p>
          </div>

          {/* Colonne photo */}
          <div className="w-[38%] shrink-0">
            <p className="font-mono text-[clamp(9px,0.85vw,13px)] font-bold uppercase tracking-wide text-paper">Valide :</p>
            <p className="font-mono text-[clamp(9px,0.85vw,13px)] uppercase tracking-wide text-paper/80">
              {year} – <span className="serif-i normal-case text-[1.5em] text-signal">pour toujours</span>
            </p>
            <div className="group relative mt-3">
              {/* Coins de photomaton */}
              <span className="absolute -left-[5%] -top-[4%] h-[10%] w-[12%] border-l-2 border-t-2 border-paper/80" />
              <span className="absolute -right-[5%] -top-[4%] h-[10%] w-[12%] border-r-2 border-t-2 border-paper/80" />
              <span className="absolute -bottom-[4%] -left-[5%] h-[10%] w-[12%] border-b-2 border-l-2 border-paper/80" />
              <span className="absolute -bottom-[4%] -right-[5%] h-[10%] w-[12%] border-b-2 border-r-2 border-paper/80" />
              <div className="relative aspect-[4/5] overflow-hidden border-[3px] border-ink">
                <Image
                  src="/images/portrait/bianca.jpg"
                  alt={`Portrait de ${site.name}`}
                  fill
                  sizes="(min-width: 768px) 22vw, 40vw"
                  className="object-cover object-[50%_18%] grayscale contrast-[1.05] transition-[filter] duration-700 group-hover:grayscale-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tampon jaune */}
      <svg
        viewBox="0 0 200 200"
        aria-hidden
        className="pointer-events-none absolute -bottom-[10%] right-[2%] w-[30%] -rotate-12 text-signal opacity-90 md:-bottom-[12%] md:right-[-3%] md:w-[26%]"
      >
        <defs>
          <path id="stamp-circle" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <polygon points="100,6 166,34 194,100 166,166 100,194 34,166 6,100 34,34" fill="none" stroke="currentColor" strokeWidth="3" />
        <text fill="currentColor" fontSize="15" letterSpacing="3" fontFamily="ui-monospace, monospace">
          <textPath href="#stamp-circle">DE L&apos;IDÉE À L&apos;IMAGE • PARIS • {year} •</textPath>
        </text>
        <text x="100" y="112" textAnchor="middle" fill="currentColor" fontSize="44" fontStyle="italic" fontFamily="Georgia, serif">
          BG
        </text>
      </svg>
    </div>
  );
}
