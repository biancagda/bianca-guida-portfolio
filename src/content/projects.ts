/**
 * ─────────────────────────────────────────────────────────────
 *  TES PROJETS
 *
 *  ➜ Ajouter un projet : copie un bloc { … } et change le `slug`.
 *  ➜ Supprimer un projet : efface son bloc.
 *  ➜ Réordonner : déplace les blocs (l'ordre ici = l'ordre sur le site,
 *    repris de ton ancien site).
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
const ho = "/images/projets/horee";
const mc = "/images/projets/macareoni";
const vi = "/images/projets/vico";

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
    slug: "macareoni",
    title: "Ma'care'oni",
    client: "Kraft — Mac & Cheese",
    frame: "Participation D&AD Awards",
    categories: ["campagne", "packaging", "digital"],
    tagline: "Une saveur pour chaque humeur, et des inconnus qui partagent le même plat.",
    color: "#1f63e0",
    ink: "#ffd23f",
    featured: true,
    cover: {
      src: `${mc}/packagings-moods.jpg`,
      alt: "Trois packs Kraft Mac & Cheese édition Ma'care'oni : Feeling angry? Extra Spicy, Feeling happy? Original Taste, Feeling sad? Extra Cheesy",
      width: 1600,
      height: 879,
    },
    // Textes de ton book + traduction de tes boards (en anglais). ⚠︎ Relis la traduction.
    context: [
      "Campagne d'activation Kraft pour son produit iconique : les mac and cheese.",
      "Manger des plats réconfortants est un moyen de vaincre les défis et les difficultés de la vie d'adulte.",
    ],
    problem: [
      "Comment amener la GenZ à se rencontrer et à créer du lien autour des mac & cheese, quand la solitude fait partie de son quotidien ?",
      "Insight : enfants, les GenZ mangeaient des mac & cheese en famille. Devenus adultes, ils vivent l'isolement social et cherchent à retrouver ce sentiment de proximité. Le comfort food devient une façon de surmonter les épreuves.",
    ],
    concept: [
      "Une saveur pour chaque humeur. Feeling angry? Extra Spicy. Feeling happy? Original Taste. Feeling sad? Extra Cheesy.",
      "Le pack mène à un appel vidéo en ligne qui permet de se rencontrer et de partager son repas. L'objectif : recréer le sentiment de familiarité autour des mac & cheese. « Let's share and care for one another while eating mac&cheese! »",
    ],
    applications: [
      "Scan ! Le QR code imprimé sur le côté du pack donne accès à un appel vidéo.",
      "Meet ! On y retrouve des personnes qui ont scanné le même pack et partagent la même humeur. Chercher du soutien, donner un conseil, partager son repas et ses pensées.",
    ],
    inline: {
      applications: [
        {
          src: `${mc}/mecanique-scan-meet.jpg`,
          alt: "Mécanique Scan! Meet! : le flanc du pack avec son QR code mène à des appels vidéo où des inconnus mangent des mac & cheese ensemble",
          width: 1600,
          height: 879,
          layout: "full",
          caption: "Mécanique — Scan ! Meet !",
        },
      ],
    },
    figures: [
      { value: "3 mois", label: "en rayon, en édition limitée" },
      { value: "1 756", label: "heures d'appels en ligne" },
      { value: "5 000", label: "personnes connectées" },
      { value: "80 %", label: "d'avis positifs" },
    ],
  },
  {
    slug: "torta-di-spaghetti",
    title: "Torta",
    // year: "2025",  ⚠︎ ajoute l'année
    categories: ["branding", "packaging", "image"],
    tagline: "Torta di Spaghetti — l'identité graphique d'un commerce de restauration.",
    color: "#1f5fd6",
    ink: "#f6d64a",
    draft: true,
    context: ["Réalisation d'une identité graphique pour un commerce de restauration."],
  },
  {
    slug: "oh-my-cream",
    title: "Oh My Cream",
    client: "Oh My Cream Skincare",
    categories: ["campagne", "da", "digital"],
    tagline: "Le soin parfait d'une vie imparfaite.",
    color: "#3a1420",
    ink: "#efe6dc",
    draft: true,
    context: [
      "Proposition de campagne de communication 360° conçue pour la marque de cosmétique Oh My Cream.",
      "L'objectif de cette stratégie globale est d'accompagner et de promouvoir avec impact le lancement de leur nouveau « combo anti-imperfections » sur l'ensemble des canaux de diffusion.",
    ],
  },
  {
    slug: "patagonia",
    title: "Patagonia",
    client: "Patagonia",
    year: "2025",
    categories: ["campagne", "da", "image"],
    tagline: "Quand on aime, on n'abandonne pas. On répare !",
    color: "#2f3a33",
    ink: "#f2efe6",
    draft: true,
    context: ["Proposition d'une campagne print pour promouvoir le service de réparation Patagonia."],
  },
  {
    slug: "va-museum",
    title: "V&A Museum",
    client: "Victoria and Albert Museum",
    year: "2026",
    categories: ["branding", "edition", "da"],
    tagline: "Moderniser l'image d'une institution sans trahir son histoire.",
    color: "#1f4a33",
    ink: "#e7d9b0",
    draft: true,
    context: [
      "Refonte complète de l'identité visuelle du V&A, le célèbre musée d'art et de design de Londres.",
      "L'objectif était de moderniser entièrement l'image de marque, tout en respectant l'histoire et le prestige de cette institution.",
    ],
  },
  {
    slug: "chez-louis",
    title: "Chez Louis",
    year: "2026",
    categories: ["branding", "packaging"],
    tagline: "⚠︎ Accroche à compléter — brandbook & identité de marque",
    color: "#1c2a6b",
    ink: "#e9d9a6",
    draft: true,
  },
  {
    slug: "vico",
    title: "Vico",
    client: "Vico — gamme Street Food",
    year: "2025",
    frame: "Compétition Campagne 360 — Sup de Pub",
    categories: ["campagne", "da", "digital"],
    tagline: "#StreetandChips — les classiques de la street food s'invitent chez toi.",
    color: "#c92f8c",
    ink: "#2a0a1d",
    cover: {
      src: `${vi}/affichage-metro.jpg`,
      alt: "Trois affiches Vico Street Food dans le métro : « C'est pas la capitale, c'est Bangkok bébé ! », « Tex Mex, Tex Mex Vie », « Sauce Curry, Beau Gosse »",
      width: 1920,
      height: 1076,
    },
    // Textes repris de ton book et de tes boards (coquilles corrigées).
    context: [
      "Création d'une campagne de notoriété pour travailler l'attractivité et la désirabilité des nouvelles saveurs Vico auprès de la cible 18-24 ans, dans le cadre de notre compétition Campagne 360 de Sup de Pub.",
      "Dans une époque où les rappeurs sont devenus les icônes incontournables de la jeunesse, les 18-24 ans recherchent constamment de nouvelles expériences. Curieux de découvertes, ils apprécient revisiter les saveurs emblématiques de la street food sous des formats innovants. Avec cette nouvelle gamme, ils retrouvent en quelques minutes, dans un simple paquet de chips, l'authenticité des snacks qu'ils adorent.",
    ],
    problem: [
      "Big idea : faire de la chips un symbole urbain pour la Gen Z.",
      "Insight : pour la génération Z, le rap n'est pas qu'un genre musical, c'est une culture qui façonne leur quotidien : leur façon de parler, de s'habiller, et même de manger. Inspirée des saveurs urbaines du monde entier, la street food fait partie intégrante de leur lifestyle, tout comme le rap est la bande-son de leur génération.",
    ],
    concept: [
      "Reprendre des phrases, des titres cultes de rappeurs en faisant le lien avec les nouvelles saveurs Street Food proposées par Vico : « C'est pas la capitale, c'est Bangkok bébé ! », « Sauce Curry, Beau Gosse », « Elle a le regard qui tue Tzatziki ».",
      "Signature : les classiques de la street food s'invitent chez toi.",
    ],
    applications: [
      "Packaging — un QR code sur chaque paquet permet d'accéder facilement à la playlist et de savourer l'instant en musique.",
      "Playlists — créer une playlist unique inspirée de chaque saveur Vico, afin d'offrir une expérience immersive aux jeunes auditeurs Spotify. À l'heure de l'apéro, ils peuvent déguster leurs chips tout en écoutant une sélection musicale aussi variée et originale que les nouvelles saveurs. « Les playlists qui vont vous faire craquer ! »",
    ],
    inline: {
      concept: [
        {
          src: `${vi}/board-street-and-chips.jpg`,
          alt: "Board #StreetandChips : insight, big idea, concept, déclinaisons d'affiches colorées par saveur, packaging avec QR code et playlists Spotify",
          width: 1920,
          height: 1080,
          layout: "full",
          caption: "Board de campagne — #StreetandChips",
        },
      ],
      applications: [
        {
          src: `${vi}/board-playlists-spotify.jpg`,
          alt: "Board playlists Spotify : quatre playlists Street and Chips, une par saveur (Bœuf Thaï, Cheese Naan, Tzatziki, Spicy Curry Sauce)",
          width: 1920,
          height: 1080,
          layout: "full",
          caption: "Playlists Spotify — une par saveur",
        },
      ],
    },
  },
  {
    slug: "horee",
    title: "Horée",
    client: "Horée — marque de soin BIO",
    year: "2024",
    frame: "Créa team",
    categories: ["campagne", "da", "packaging"],
    tagline: "Santé, à votre peau ! Une campagne d'image et de notoriété pour une marque de beauté qui se boit des yeux.",
    color: "#ece6dc",
    ink: "#5c0f1c",
    featured: true,
    cover: {
      src: `${ho}/abribus-serums.jpg`,
      alt: "Affiche Horée sur un mobilier urbain : deux mains trinquent avec les sérums Détoxifiant et Désaltérant BIO, titre « Santé, à votre peau ! »",
      width: 1920,
      height: 1288,
    },
    // Textes repris de tes concept boards (coquilles corrigées). ⚠︎ Le 2e paragraphe
    // du concept a été rédigé à partir des affiches : relis-le.
    context: [
      "Les jeunes femmes âgées de 20 à 25 ans commencent à avoir une vraie routine beauté. Elles savent que les besoins en hydratation varient selon leur âge, leur environnement et leurs activités, et qu'une bonne hydratation permet de ralentir le vieillissement cutané.",
      "Elles sont aussi adeptes de la culture « Starbucks », de la boisson à emporter.",
    ],
    problem: [
      "Création d'une campagne d'image et de notoriété pour la marque de beauté Horée.",
      "Insight : la peau est l'organe qui a le plus besoin d'hydratation.",
    ],
    concept: [
      "Horée, votre peau désaltérée. Les soins se présentent comme des boissons : une lotion avec sa paille, des sérums qu'on lève pour trinquer.",
      "La signature « Santé, à votre peau ! » détourne le toast pour parler d'hydratation, et la mention « ne pas boire » assume le clin d'œil jusqu'au bout.",
    ],
    applications: [
      "Activation — La santé au frais chez Monoprix. Installation d'un frigo américain avec un écran digital intégré qui invite à passer une « commande rafraîchissante ». Après le diagnostic, il délivre un échantillon de lotion adaptée à son type de peau. Présent dans les Monoprix, il donne de la visibilité aux produits Horée et offre une expérience immersive. Cette activation invite aussi à un événement au Perchoir du Marais.",
      "Événement — Peau de bienvenue, avec Perchoir Group. Le Perchoir est un bar à cocktails situé sur le rooftop du BHV Marais. Lors du week-end du 21 juin 2024, Horée s'associe au Perchoir : en complément des boissons habituelles, une nouvelle gamme de jus de fruits personnalisés. Via un QR code, les consommateurs accèdent à un questionnaire qui leur permet de passer directement commande ; le jus est accompagné d'un échantillon de lotion personnalisé.",
    ],
    inline: {
      concept: [
        {
          src: `${ho}/affiche-lotion.webp`,
          alt: "Affiche Horée : flacon orange de lotion L'Essentiel BIO avec une paille en métal, « Santé, à votre peau ! »",
          width: 1414,
          height: 2000,
          layout: "half",
          caption: "Campagne d'affichage — Lotion visage L'Essentiel BIO",
        },
        {
          src: `${ho}/affiche-serums.webp`,
          alt: "Affiche Horée : deux mains trinquent avec un sérum rouge Détoxifiant et un sérum vert Désaltérant",
          width: 1414,
          height: 2000,
          layout: "half",
          caption: "Campagne d'affichage — Sérums Détoxifiant & Désaltérant BIO",
        },
      ],
      applications: [
        {
          src: `${ho}/concept-board-activation-monoprix.jpg`,
          alt: "Concept board de l'activation « La santé au frais » : frigo américain rose avec écran de diagnostic, chez Monoprix",
          width: 1920,
          height: 1357,
          layout: "full",
          caption: "Concept board de l'activation — Monoprix",
        },
        // ⚠︎ Dépose le concept board Perchoir dans public/images/projets/horee/
        // sous ce nom, puis retire les « // » des lignes ci-dessous.
        // {
        //   src: `${ho}/concept-board-evenement-perchoir.jpg`,
        //   alt: "Concept board de l'événement « Peau de bienvenue » avec Perchoir Group : rooftop, plateau jus d'orange et questionnaire mobile",
        //   width: 1920,
        //   height: 1081,
        //   layout: "full",
        //   caption: "Concept board de l'événement — Le Perchoir",
        // },
      ],
    },
    // ⚠︎ Chiffres repris du board : précise les libellés si besoin.
    figures: [
      { value: "100+", label: "mille" },
      { value: "30 %", label: "réseaux" },
      { value: "0 €", label: "média" },
    ],
    gallery: [
      {
        src: `${ho}/abribus-lotion.jpg`,
        alt: "Affiche Horée lotion L'Essentiel BIO sur un mobilier urbain, en ville",
        width: 1920,
        height: 1288,
        layout: "full",
        caption: "Affichage urbain",
      },
    ],
  },
  {
    slug: "loreal-brandstorm",
    title: "L'Oréal Brandstorm",
    client: "L'Oréal — Prada Beauty",
    year: "2026",
    frame: "Concours L'Oréal Brandstorm 2026",
    categories: ["da", "packaging", "digital"],
    tagline: "Les Infusions de Prada. La génération Z consomme de façon circulaire : comment la rendre fidèle ?",
    color: "#b9dcc4",
    ink: "#21402c",
    draft: true,
    context: [
      "Ce projet a été conçu dans le cadre de l'édition 2026 de L'Oréal Brandstorm, le grand concours d'innovation étudiant organisé par le groupe.",
      "Le défi de cette année invitait les participants à imaginer de nouvelles stratégies pour répondre au besoin croissant de nouveauté de la génération Z, tout en réussissant à renforcer leur fidélité envers les marques.",
    ],
  },
  {
    slug: "mairie-de-paris",
    title: "Mairie de Paris",
    client: "Ville de Paris",
    year: "2024",
    categories: ["campagne", "packaging"],
    tagline: "Le Bon Coup, Tête de gland ?, S'envoyer en l'air… Jouir avec un grand Oui. ⚠︎ Accroche à relire",
    color: "#f0a43a",
    ink: "#3a1606",
    draft: true,
  },
  {
    slug: "lov-magazine",
    title: "LOV Magazine",
    categories: ["edition", "image"],
    tagline: "Le magazine qui aborde les sujets tabous de manière artistique et positive.",
    color: "#e23b2e",
    ink: "#fff3e0",
    draft: true,
    context: [
      "LOV, le magazine qui aborde des sujets tabous de manière artistique et positive. Dans ce numéro, le phénomène du vol est au cœur de l'ouvrage.",
      "Le vol à l'étalage, bien que souvent perçu comme un crime mineur, peut avoir des conséquences profondes sur la vie des personnes impliquées, allant de sanctions légales à des effets durables sur la confiance et la perception de soi.",
    ],
  },
  {
    slug: "clean-up-day",
    title: "Clean Up Day",
    client: "Mairie de Paris",
    year: "2024",
    categories: ["campagne", "branding"],
    tagline: "Votre baignade en mer en 2050 ? Une campagne d'affichage pour agir dès maintenant.",
    color: "#1e56c8",
    ink: "#f4ea3c",
    draft: true,
    context: [
      "Création d'une campagne d'affichage pour le « Clean Up Day ».",
      "Journée dédiée à la promotion de la propreté et de la durabilité environnementale à travers des actions concrètes de nettoyage et de sensibilisation.",
    ],
  },
  {
    slug: "la-chambre-de-roomy",
    title: "La Chambre de Roomy",
    year: "2024",
    categories: ["edition"],
    tagline: "Création d'un livre pour enfant autour du concept « chambre noire ».",
    color: "#1e1e1e",
    ink: "#d7d2c8",
    draft: true,
    context: ["Création d'un livre pour enfant autour du concept « chambre noire »."],
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
