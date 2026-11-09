"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

export function SiteFooter() {
  const pathname = usePathname();
  const onContact = pathname === "/contact";
  const year = new Date().getFullYear();

  return (
    <footer className="px-site relative mt-32 overflow-hidden border-t border-line pt-10 md:mt-48">
      {!onContact && (
        <Reveal className="grid-12 gap-y-8 pb-20 md:pb-28">
          <p className="label col-span-12 text-mute md:col-span-3">(Contact)</p>
          <div className="col-span-12 md:col-span-9">
            <h2 className="display text-[15vw] md:text-[9.5vw]">
              Une idée, un projet,
              <br />
              un poste <span className="serif-i text-signal">à pourvoir ?</span>
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href={`mailto:${site.contact.email}`} className="serif-i u-link text-[clamp(26px,4vw,56px)] leading-tight">
                {site.contact.email}
              </a>
              <Link href="/contact" className="pill pill-ghost ml-auto">
                Écrire un message →
              </Link>
            </div>
          </div>
        </Reveal>
      )}

      <div className="grid-12 gap-y-6 border-t border-line py-8">
        <ul className="label col-span-6 space-y-1 md:col-span-3">
          <li>
            <a className="u-link" href={site.contact.linkedin.url} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </li>
          <li>
            <a className="u-link" href={site.contact.instagram.url} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
          </li>
          <li>
            <a className="u-link" href={`mailto:${site.contact.email}`}>
              E-mail ↗
            </a>
          </li>
        </ul>
        <ul className="label col-span-6 space-y-1 md:col-span-3">
          <li><Link className="u-link" href="/projets">Projets</Link></li>
          <li><Link className="u-link" href="/a-propos">À propos</Link></li>
          <li><Link className="u-link" href="/contact">Contact</Link></li>
        </ul>
        <p className="label col-span-12 text-mute md:col-span-4">
          © {year} {site.name}
          <br />
          Conception & direction artistique : {site.name}
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="label col-span-12 justify-self-start md:col-span-2 md:justify-self-end"
        >
          <span className="u-link">Haut de page ↑</span>
        </button>
      </div>

      <p aria-hidden className="display pointer-events-none -mb-[3.2vw] select-none whitespace-nowrap text-center text-[22.5vw] leading-[0.8] text-ink-2">
        {site.name}
      </p>
    </footer>
  );
}
