import type { Metadata } from "next";
import { site } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";
import { LineReveal, Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contacter ${site.name}, directrice artistique et designer graphique à Paris : poste, projet freelance ou collaboration.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const links = [
    { label: "E-mail", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { label: "Instagram", value: site.contact.instagram.handle, href: site.contact.instagram.url },
    { label: "LinkedIn", value: site.contact.linkedin.handle, href: site.contact.linkedin.url },
  ];
  return (
    <div className="px-site pt-28 md:pt-36">
      <LineReveal
        className="display text-[22vw] md:text-[15vw]"
        lines={["Écrivons", <span key="s" className="serif-i normal-case text-signal">ensemble.</span>]}
      />
      <div className="grid-12 mt-14 gap-y-16 border-t border-line pt-6 md:mt-20">
        <Reveal className="col-span-12 md:col-span-4">
          <p className="max-w-[32ch] text-paper/75">
            Un poste, un projet, une collaboration ou simplement l&apos;envie d&apos;échanger : je réponds à chaque message.
          </p>
          <ul className="mt-10">
            {links.map((l) => (
              <li key={l.label} className="border-b border-line">
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-4"
                >
                  <span className="label text-mute">{l.label}</span>
                  <span className="serif-i truncate text-[clamp(20px,1.7vw,26px)] transition-colors group-hover:text-signal">
                    {l.value} <span aria-hidden>↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="col-span-12 md:col-span-7 md:col-start-6" delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
