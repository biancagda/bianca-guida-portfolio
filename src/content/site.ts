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

  /** Phrase d'accroche de la page d'accueil. Le texte entre *étoiles* passe en italique serif. */
  headline: "Je fabrique des idées qui *se voient* — campagnes, identités et images pour des marques qui veulent être regardées.",

  /** Statut affiché en haut de la page d'accueil. Mets `null` pour le masquer. */
  availability: "Disponible — CDI, CDD & freelance" as string | null,

  /** ⚠︎ À RELIRE — présentation courte (accueil). *Étoiles* = italique serif. */
  aboutIntro:
    "Fraîchement diplômée d'un master en direction artistique et design graphique à Sup de Pub Paris, je passe de l'*idée* à l'*image* : je cherche le concept juste, puis la forme qui le rend évident.",

  /** Texte de ton ancien site, conservé tel quel. */
  bioShort:
    "Passionnée depuis toujours par l'image, la création visuelle et la publicité, j'explore la direction artistique à travers des projets mêlant concept, esthétique et efficacité, pour façonner des univers uniques et percutants.",

  /** Page À propos. ⚠︎ Textes rédigés à partir de ton ancien site : relis-les et réécris-les avec ta voix. */
  about: {
    statement: "Une idée forte, *une image juste*.",
    paragraphs: [
      "Passionnée depuis toujours par l'image, la création visuelle et la publicité, j'explore la direction artistique à travers des projets mêlant concept, esthétique et efficacité, pour façonner des univers uniques et percutants.",
      "Diplômée du master Design graphique & Direction artistique de Sup de Pub Paris, j'ai appris à défendre une idée autant qu'à lui donner forme : campagnes 360, identités de marque, packaging, édition.",
    ],
    vision: [
      "Je crois qu'un bon visuel commence par une bonne question. Avant de choisir une typographie ou une couleur, je cherche ce que la marque a à dire, et à qui.",
      "Vient ensuite la forme, que je veux simple, directe et un peu inattendue : assez claire pour être comprise en une seconde, assez singulière pour qu'on s'en souvienne.",
    ],
    /** ⚠︎ À COMPLÉTER — tes inspirations (studios, designers, magazines, artistes, films…). Liste vide = encadré « à compléter ». */
    inspirations: [] as string[],
    /** ⚠︎ À COMPLÉTER — quelques mots sur toi en dehors du travail. Laisse vide pour masquer. */
    personality: "",
  },

  contact: {
    /** ⚠︎ À COMPLÉTER — ton adresse e-mail professionnelle. */
    email: "contact@exemple.fr",
    /** ⚠︎ À COMPLÉTER — liens vers tes profils. */
    instagram: { handle: "@a.completer", url: "https://www.instagram.com/" },
    linkedin: { handle: "Bianca Guida", url: "https://www.linkedin.com/" },
    /**
     * Formulaire de contact : crée un formulaire gratuit sur https://formspree.io,
     * puis colle l'URL fournie (ex. https://formspree.io/f/abcdwxyz) dans la
     * variable d'environnement NEXT_PUBLIC_FORM_ENDPOINT (fichier .env.local).
     * Sans endpoint, le formulaire ouvre la messagerie de la visiteuse / du visiteur.
     */
  },

  /** Agences et structures (repris de ton ancien site). Précise le rôle si tu veux. */
  experiences: [
    { name: "TBWA\\Paris", role: "⚠︎ À compléter — poste & dates" },
    { name: "Publicis Conseil", role: "⚠︎ À compléter — poste & dates" },
  ],

  education: [
    {
      title: "Master Design graphique & Direction artistique",
      school: "Sup de Pub Paris",
      period: "⚠︎ années à compléter",
    },
  ],

  /** Domaines de compétences — affichés sur l'accueil et la page À propos. */
  skills: [
    {
      title: "Direction artistique",
      items: ["Concept & territoire de marque", "Campagnes 360", "Direction photo", "Activation & événementiel"],
    },
    {
      title: "Graphisme",
      items: ["Identité visuelle", "Packaging", "Édition & print", "Typographie"],
    },
    {
      title: "Digital",
      items: ["Social media", "Contenus vidéo", "UI & maquettes web"],
    },
    {
      /** ⚠︎ À VÉRIFIER — adapte la liste à tes vrais outils. */
      title: "Outils",
      items: ["Photoshop", "Illustrator", "InDesign", "After Effects", "Figma"],
    },
  ],
};

export type Site = typeof site;
