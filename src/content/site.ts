/**
 * ─────────────────────────────────────────────────────────────
 *  INFORMATIONS GÉNÉRALES DU SITE
 *  Modifie ce fichier pour changer ton nom, ta bio, tes liens…
 *  Tout ce qui est marqué  ⚠︎ À COMPLÉTER  est un contenu provisoire.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Bianca Guida",
  role: "Direction artistique, conception & graphisme",
  city: "Paris",
  /** ⚠︎ À COMPLÉTER — l'URL finale du site (sert au référencement). */
  url: "https://biancaguida.fr",

  /** Citation de ton CV, utilisée sur la page À propos. */
  quote:
    "Du concept à la réalisation finale, j'explore la création sous toutes ses formes : direction artistique, graphisme, activation pub… Mon objectif est de mêler concept, esthétique et efficacité, pour façonner des univers uniques et percutants.",

  /** Phrase d'accroche de la page d'accueil. Le texte entre *étoiles* passe en italique serif. */
  headline: "Je fabrique des idées qui *se voient* — campagnes, identités et images pour des marques qui veulent être regardées.",

  /** Statut affiché en haut de la page d'accueil. Mets `null` pour le masquer. */
  availability: "Disponible — CDI, CDD & freelance" as string | null,

  /** ⚠︎ À RELIRE — présentation courte (accueil). *Étoiles* = italique serif. */
  aboutIntro:
    "Fraîchement diplômée d'un master en direction artistique et design graphique à Sup de Pub Paris, je\u00a0passe\u00a0de\u00a0l'*idée*\u00a0à\u00a0l'*image*\u00a0: je cherche le concept juste, puis la forme qui le rend évident.",

  /** Texte de ton ancien site, conservé tel quel. */
  bioShort:
    "Passionnée depuis toujours par l'image, la création visuelle et la publicité, j'explore la direction artistique à travers des projets mêlant concept, esthétique et efficacité, pour façonner des univers uniques et percutants.",

  /** Page À propos. ⚠︎ Textes rédigés à partir de ton ancien site : relis-les et réécris-les avec ta voix. */
  about: {
    statement: "Une idée forte, *une image juste*.",
    paragraphs: [
      "Diplômée du master Direction artistique & Design graphique de Sup de Pub Paris, formée chez TBWA\\Paris, Publicis Conseil et Deepki.",
    ],
    vision: [
      "Un bon visuel commence par une bonne question\u00a0:\nce que la marque a à dire, et à qui.",
    ],
    /** Tes inspirations (studios, designers, magazines, artistes, films…). Liste vide = section masquée. */
    inspirations: [] as string[],
    /** Quelques mots sur toi en dehors du travail (d'après ton CV). Laisse vide pour masquer. */
    personality: "Voyages, mode, photographie, décoration, art contemporain, expositions.",
  },

  contact: {
    email: "biancaguida3@gmail.com",
    phone: "06 27 27 52 71",
    /** Mets `null` pour masquer Instagram. Exemple : { handle: "@moncompte", url: "https://www.instagram.com/moncompte/" } */
    instagram: null as { handle: string; url: string } | null,
    linkedin: { handle: "Bianca Guida", url: "https://www.linkedin.com/in/bianca-guida-8809a0269" },
    /**
     * Formulaire de contact : crée un formulaire gratuit sur https://formspree.io,
     * puis colle l'URL fournie (ex. https://formspree.io/f/abcdwxyz) dans la
     * variable d'environnement NEXT_PUBLIC_FORM_ENDPOINT (fichier .env.local).
     * Sans endpoint, le formulaire ouvre la messagerie de la visiteuse / du visiteur.
     */
  },

  /**
   * Expériences professionnelles (d'après ton CV), de la plus récente à la plus ancienne.
   * `logo` (facultatif) : PNG détouré sur fond transparent, dans public/images/logos/.
   */
  experiences: [
    {
      name: "Deepki",
      logo: { src: "/images/logos/deepki.png", width: 1026, height: 352 },
      role: "Alternance — Designer graphique & UX",
      period: "2024 – 2026",
      detail: "Design UX/UI de la plateforme SaaS, recherche & wireframing, graphisme, exécution et production print.",
    },
    {
      name: "TBWA\\Paris",
      logo: { src: "/images/logos/tbwa.png", width: 948, height: 242 },
      role: "Stage — Assistante direction artistique",
      period: "Avr. – juill. 2024",
      detail: "Conception créative & production visuelle pour Krys, la Fondation Ronald McDonald, McDonald's et Aldi.",
    },
    {
      name: "Publicis Conseil",
      logo: { src: "/images/logos/publicis-conseil.png", width: 1122, height: 292 },
      role: "Stage — Assistante direction artistique",
      period: "Oct. 2022 – janv. 2023",
      detail: "Création publicitaire pour Garnier (Groupe L'Oréal).",
    },
    {
      name: "Satellite",
      logo: { src: "/images/logos/satellite.png", width: 1152, height: 348 },
      role: "Stage — Assistante direction artistique & photo",
      period: "Avril 2019",
      detail: "Direction artistique et production visuelle : organisation et stylisme de shootings photo pour la marque de bijoux.",
    },
    {
      name: "Freelance",
      logo: undefined as { src: string; width: number; height: number } | undefined,
      role: "Graphisme en restauration",
      period: "2020 – 2026",
      detail: "Gemma Cucina, Gemma, La Madonnina. Création d'une supérette solidaire au sein de Sup de Pub.",
    },
  ],

  education: [
    { title: "Master Direction artistique & Design graphique", school: "Sup de Pub Paris", period: "2021 – 2026", logo: { src: "/images/logos/sup-de-pub.png", width: 1600, height: 330 } },
    { title: "DNMADE Design d'objet", school: "Institut Sainte-Geneviève", period: "2020 – 2021", logo: undefined as { src: string; width: number; height: number } | undefined },
  ],

  /** Domaines de compétences (d'après ton CV) — affichés sur l'accueil et la page À propos. */
  skills: [
    {
      title: "Direction artistique",
      items: ["Création de concepts", "Identités de marque", "Campagnes 360", "Activation publicitaire"],
    },
    {
      title: "Graphisme",
      items: ["Illustration & dessin", "Photographie", "Édition", "Packaging"],
    },
    {
      title: "UX/UI & social",
      items: ["Wireframing", "Parcours utilisateur", "Design d'interfaces", "Stratégie & contenus social media"],
    },
    {
      title: "Outils",
      items: ["Photoshop, Illustrator, InDesign", "Premiere Pro", "Figma", "Adobe Firefly, Midjourney"],
    },
  ],
};

export type Site = typeof site;
