/**
 * ─────────────────────────────────────────────────────────────
 *  TES PROJETS
 *
 *  ➜ Ajouter un projet : copie un bloc { … } et change le `slug`.
 *  ➜ Supprimer un projet : efface son bloc.
 *  ➜ Réordonner : déplace les blocs (l'ordre ici = l'ordre sur le site).
 *  ➜ Mettre en avant sur l'accueil : `featured: true`.
 *
 *  Images : range-les dans  public/images/projets/<slug>/
 *  puis indique le chemin  "/images/projets/<slug>/mon-image.jpg"
 *  avec sa largeur/hauteur en pixels (sert à éviter les sauts de mise en page).
 *
 *  `draft: true`  = étude de cas pas encore rédigée. Le site affiche
 *  alors un bandeau « en cours de rédaction » et des encadrés à compléter.
 *  Quand tu as rempli les textes et ajouté les visuels, passe-le à `false`.
 * ─────────────────────────────────────────────────────────────
 */

export const categories = {
  branding: "Identité visuelle",
  da: "Direction artistique",
  edition: "Édition / Print",
  packaging: "Packaging",
  campagne: "Campagne publicitaire",
  digital: "Digital / Social",
  image: "Photographie / Image",
} as const;

export type CategoryKey = keyof typeof categories;

export type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Mise en page dans la galerie : pleine largeur, large, moitié, ou décalée. */
  layout?: "full" | "wide" | "half" | "offset";
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  client?: string;
  year?: string;
  /** Ton rôle sur le projet (ex. « Direction artistique — projet d'équipe »). */
  role?: string;
  /** Contexte : école, concours, agence… */
  frame?: string;
  categories: CategoryKey[];
  /** Une phrase courte affichée sous le titre. */
  tagline: string;
  /** Couleur dominante du projet (utilisée tant qu'il n'y a pas d'image). */
  color: string;
  /** Couleur du texte posé sur `color`. */
  ink?: string;
  cover?: Media;
  featured?: boolean;
  draft?: boolean;

  /** Les étapes de l'étude de cas. Chaque texte peut contenir plusieurs paragraphes. */
  context?: string[];
  problem?: string[];
  concept?: string[];
  research?: string[];
  identity?: string[];
  applications?: string[];

  /** Chiffres clés (optionnel). */
  figures?: { value: string; label: string }[];
  /** Visuels insérés après une étape précise de l'étude de cas. */
  inline?: Partial<Record<"context" | "problem" | "concept" | "research" | "identity" | "applications", Media[]>>;
  gallery?: Media[];
  credits?: string;
};

const fb = "/images/projets/flying-blue";

export const projects: Project[] = [
  {
    slug: "flying-blue-lime",
    title: "Flying Blue × Lime",
    client: "Flying Blue — Air France KLM",
    // year: "2025",  ⚠︎ ajoute l'année
    role: "Direction artistique & conception",
    frame: "Projet d'école — Sup de Pub Paris",
    categories: ["campagne", "da", "digital"],
    tagline: "Pédaler, s'envoler. Chaque kilomètre à vélo devient un mile.",
    color: "#1d22c9",
    ink: "#ffffff",
    featured: true,
    cover: {
      src: `${fb}/affiche-new-york.webp`,
      alt: "Affiche Flying Blue dans un couloir de métro : une jeune femme à vélo Lime, titre « Cette balade à vélo m'amène jusqu'à New York* »",
      width: 1920,
      height: 1426,
    },
    // Textes repris de ta planche de présentation. ⚠︎ Le 2e paragraphe du concept et
    // le texte « identity » ont été rédigés à partir des visuels : relis-les et réécris-les.
    context: [
      "Dans une ère où l'écologie guide les choix de la jeunesse, ces voyageurs cherchent des moyens astucieux pour combiner leur envie d'aventure avec une empreinte écologique réduite.",
    ],
    problem: [
      "Créer une campagne de notoriété pour travailler l'attractivité et la désirabilité de la marque Flying Blue auprès des 18-24 ans.",
    ],
    concept: [
      "Flying Blue × Lime dévoile une collaboration transformant chaque kilomètre à vélo en miles. Une incitation à adopter une mobilité décarbonée, pour explorer les villes de France.",
      "La campagne d'affichage prolonge l'idée : chaque plaisir du quotidien rapproche d'un voyage. « Cette balade à vélo m'amène jusqu'à New York* », « Ce pad thaï paye mon billet pour Bangkok* ».",
    ],
    identity: [
      "Le bleu Flying Blue en aplat franc, des titres surlignés en bandeau et une photographie lifestyle prise sur le vif : un territoire chaleureux et direct, pensé pour une cible jeune.",
    ],
    applications: [
      "Affichage métro, vélos Lime habillés aux couleurs de Flying Blue, contenus Instagram « Ride with us. » et un voyage presse itinérant à New York avec des créateurs de contenu.",
    ],
    inline: {
      concept: [
        {
          src: `${fb}/affiche-bangkok.webp`,
          alt: "Affiche Flying Blue en station de métro : « Ce pad thaï paye mon billet pour Bangkok* »",
          width: 1920,
          height: 1424,
          layout: "full",
        },
      ],
    },
    figures: [
      { value: "123", label: "jours d'activation" },
      { value: "67 000", label: "miles gagnés par jour" },
      { value: "+10 %", label: "d'engagement sur les réseaux sociaux" },
      { value: "410 000", label: "utilisateurs font en moyenne 10 km/j" },
    ],
    gallery: [
      {
        src: `${fb}/board.jpg`,
        alt: "Planche de présentation : vélo Lime aux couleurs Flying Blue, post Instagram « Ride with us. », dossier presse New York et chiffres clés",
        width: 1920,
        height: 1080,
        layout: "full",
        caption: "Planche de synthèse — dispositif 360°",
      },
    ],
  },
  {
    slug: "opal",
    title: "Opal",
    client: "Opal",
    year: "2025",
    role: "Projet d'équipe",
    frame: "Compétition Campagne 360 — Sup de Pub · Équipe lauréate",
    categories: ["campagne", "da", "digital"],
    tagline: "Rendre visible l'impact d'une application sur notre temps et notre attention.",
    color: "#2b1660",
    ink: "#e9ddff",
    featured: true,
    draft: true,
    context: [
      "Opal est une application qui vous aide à mieux gérer votre temps et votre attention. Aujourd'hui, elle souhaite sensibiliser, engager et montrer concrètement l'impact qu'elle peut avoir dans la vie d'un futur utilisateur.",
      "Réalisation d'un case study avec mon équipe dans le cadre de notre compétition Campagne 360 de Sup de Pub — vainqueurs.",
    ],
  },
  {
    slug: "loreal-brandstorm",
    title: "L'Oréal Brandstorm",
    client: "L'Oréal",
    year: "2026",
    frame: "Concours L'Oréal Brandstorm 2026",
    categories: ["da", "campagne"],
    tagline: "La génération Z consomme de façon circulaire. Comment la rendre fidèle ?",
    color: "#e8e3da",
    ink: "#1a1a1a",
    featured: true,
    draft: true,
    context: [
      "Ce projet a été conçu dans le cadre de l'édition 2026 de L'Oréal Brandstorm, le grand concours d'innovation étudiant organisé par le groupe.",
      "Le défi de cette année invitait les participants à imaginer de nouvelles stratégies pour répondre au besoin croissant de nouveauté de la génération Z, tout en réussissant à renforcer leur fidélité envers les marques.",
    ],
  },
  {
    slug: "horee",
    title: "Horée",
    tagline: "Peau désaltérée. Une marque de soin et son activation événementielle.",
    categories: ["branding", "packaging", "campagne"],
    color: "#e7a3b4",
    ink: "#4a0f1f",
    featured: true,
    draft: true,
  },
  {
    slug: "patagonia",
    title: "Patagonia",
    client: "Patagonia",
    categories: ["campagne", "da"],
    tagline: "⚠︎ Accroche à compléter",
    color: "#2f3a33",
    ink: "#f2efe6",
    draft: true,
  },
  {
    slug: "va-museum",
    title: "V&A Museum",
    client: "Victoria and Albert Museum",
    year: "2026",
    categories: ["edition", "da"],
    tagline: "⚠︎ Accroche à compléter",
    color: "#1f4a33",
    ink: "#e7d9b0",
    draft: true,
  },
  {
    slug: "chez-louis",
    title: "Chez Louis",
    categories: ["branding", "packaging"],
    tagline: "⚠︎ Accroche à compléter — identité visuelle",
    color: "#1c2a6b",
    ink: "#e9d9a6",
    draft: true,
  },
  {
    slug: "torta-di-spaghetti",
    title: "Torta di Spaghetti",
    categories: ["branding", "image"],
    tagline: "⚠︎ Accroche à compléter — Grazie mille !",
    color: "#1f5fd6",
    ink: "#f6d64a",
    draft: true,
  },
  {
    slug: "les-infusions-de-prada",
    title: "Les Infusions de Prada",
    client: "Prada Beauty",
    categories: ["packaging", "da"],
    tagline: "⚠︎ Accroche à compléter",
    color: "#b9dcc4",
    ink: "#21402c",
    draft: true,
  },
  {
    slug: "mairie-de-paris-le-bon-coup",
    title: "Le Bon Coup",
    client: "Mairie de Paris",
    categories: ["campagne", "packaging"],
    tagline: "⚠︎ Accroche à compléter",
    color: "#f0a43a",
    ink: "#3a1606",
    draft: true,
  },
  {
    slug: "clean-up-day",
    title: "Clean Up Day",
    client: "Mairie de Paris",
    categories: ["campagne", "branding"],
    tagline: "⚠︎ Accroche à compléter",
    color: "#1e56c8",
    ink: "#f4ea3c",
    draft: true,
  },
  {
    slug: "la-chambre-de-roomy",
    title: "La Chambre de Roomy",
    categories: ["edition"],
    tagline: "Création d'un livre pour enfant autour du concept « chambre noire ».",
    color: "#1e1e1e",
    ink: "#d7d2c8",
    draft: true,
  },
  {
    slug: "macareoni",
    title: "Ma'care'oni",
    categories: ["branding", "packaging"],
    tagline: "⚠︎ Accroche à compléter",
    color: "#2c63dc",
    ink: "#ffd23f",
    draft: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const featuredProjects = projects.filter((p) => p.featured);
