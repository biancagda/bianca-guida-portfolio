import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Intro } from "@/components/Intro";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const instrument = Instrument_Serif({ weight: "400", style: ["italic", "normal"], subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const inter = Inter_Tight({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Direction artistique & design graphique`, template: `%s — ${site.name}` },
  description: `${site.name}, directrice artistique et designer graphique à Paris. ${site.bioShort}`,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    images: [{ url: "/images/projets/flying-blue/affiche-new-york.webp", width: 1920, height: 1426 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0e0e0d", colorScheme: "dark" };

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Directrice artistique & designer graphique",
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "FR" },
  alumniOf: site.education.map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
  url: site.url,
  sameAs: [site.contact.linkedin.url, site.contact.instagram.url],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${bebas.variable} ${instrument.variable} ${inter.variable}`}>
      <body className="grain min-h-dvh">
        <a href="#contenu" className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-paper focus:px-3 focus:py-2 focus:text-ink">
          Aller au contenu
        </a>
        <Intro />
        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </body>
    </html>
  );
}
