import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="px-site flex min-h-[80svh] flex-col justify-end pt-28">
      <p className="display text-[40vw] leading-[0.8] md:text-[30vw]">404</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-5">
        <p className="serif-i text-[clamp(24px,2.4vw,36px)]">Cette page n&apos;existe pas — ou pas encore.</p>
        <Link href="/projets" className="pill">Voir les projets <Icon name="arrow-right" /></Link>
      </div>
    </section>
  );
}
