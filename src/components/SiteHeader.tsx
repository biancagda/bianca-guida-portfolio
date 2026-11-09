"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";

const nav = [
  { href: "/projets", label: "Projets" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

function ParisClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="px-site pointer-events-none fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
        <div className="grid-12 items-baseline pt-5 md:pt-6">
          <Link href="/" className="display pointer-events-auto col-span-6 text-[22px] leading-none md:col-span-4 md:text-[26px] lg:col-span-3" aria-label={`${site.name} — accueil`}>
            {site.name}
          </Link>

          <p className="label col-span-4 hidden lg:block">
            Direction artistique
            <br />& design graphique
          </p>
          <p className="label col-span-2 hidden lg:block">
            {site.city} <ParisClock />
          </p>

          <nav aria-label="Navigation principale" className="pointer-events-auto col-span-8 hidden justify-end gap-6 md:flex lg:col-span-3">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="label group relative" aria-current={isActive(item.href) ? "page" : undefined}>
                <span className="u-link">{item.label}</span>
                <span
                  className={`absolute -left-3 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-current transition-transform duration-500 ${
                    isActive(item.href) ? "scale-100" : "scale-0"
                  }`}
                  aria-hidden
                />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="label pointer-events-auto col-span-6 justify-self-end md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? "Fermer" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="px-site fixed inset-0 z-40 flex flex-col justify-between bg-paper pb-8 pt-24 text-ink md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Navigation mobile" className="flex flex-col">
              {[{ href: "/", label: "Accueil" }, ...nav].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-b border-ink/15"
                >
                  <Link href={item.href} className="display flex items-baseline justify-between py-2 text-[18vw]">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="label flex justify-between">
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              <span>
                {site.city} <ParisClock />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
