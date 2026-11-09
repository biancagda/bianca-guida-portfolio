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
  /** Grand visuel en tête de la page projet. */
  cover?: Media;
  /**
   * Vignette cliquable dans la liste des projets (accueil, page Projets, « projet suivant »).
   * Si absente, c'est `cover` qui sert de vignette.
   */
  thumbnail?: Media;
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
const op = "/images/projets/opal";
const pa = "/images/projets/patagonia";
const cl = "/images/projets/clean-up-day";
const va = "/images/projets/va-museum";
const ro = "/images/projets/la-chambre-de-roomy";
const ho = "/images/projets/horee";
const mc = "/images/projets/macareoni";
const vi = "/images/projets/vico";
const lo = "/images/projets/lov-magazine";

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
    client: "Opal — application de gestion du temps d'écran",
    year: "2025",
    role: "Projet d'équipe",
    frame: "Compétition Campagne 360 — Sup de Pub · Équipe lauréate",
    categories: ["campagne", "da", "digital"],
    tagline: "20 ans d'écran plus tard… Et si ce temps vous revenait ?",
    color: "#2b1660",
    ink: "#e9ddff",
    featured: true,
    cover: {
      src: `${op}/affichage-metro.jpg`,
      alt: "Trois affiches Opal dans le métro : « 20 ans, c'est le temps qu'a pris Steve Jobs pour créer l'iPhone », « …J.R.R. Tolkien pour créer Le Seigneur des Anneaux », « …Marie Curie pour gagner 2 prix Nobel »",
      width: 1920,
      height: 1387,
    },
    // Textes de ton ancien site et de ton board (coquilles corrigées).
    context: [
      "Opal est une application qui vous aide à mieux gérer votre temps et votre attention. Aujourd'hui, elle souhaite sensibiliser, engager et montrer concrètement l'impact qu'elle peut avoir dans la vie d'un futur utilisateur.",
      "Réalisation d'un case study avec mon équipe dans le cadre de notre compétition Campagne 360 de Sup de Pub — vainqueurs.",
    ],
    problem: [
      "Insight : 20 ans. C'est le temps que vous passez, au cours d'une vie, absorbé par votre téléphone.",
    ],
    concept: [
      "Opal met en lumière trois figures inspirantes qui ont accompli de grandes choses en 20 ans. Leur parcours montre tout ce qu'il est possible de bâtir lorsque l'on reprend le contrôle de son temps. Et si vous aussi, vous aviez le temps de vous réaliser ?",
      "« 20 ans, c'est le temps qu'a pris Steve Jobs pour créer l'iPhone. » « … J.R.R. Tolkien pour créer Le Seigneur des Anneaux. » « … Marie Curie pour gagner 2 prix Nobel. » Chaque affiche déroule la frise de ces 20 années.",
    ],
    applications: [
      "Activation — Opal × Ghostbusters. Nous sommes en 2045. Opal hacke le monde du numérique : la société est projetée 20 ans en avant, un bond dans le futur pour faire prendre conscience du temps que l'on perd, chaque jour, sur nos écrans.",
      "Les médias et les réseaux s'emballent : « OPAL vient de pirater le présent », « L'info en 2045 ? OPAL l'a déjà piratée. » En moyenne, on passe 20 ans de sa vie sur son téléphone. Avec Opal, ce temps vous revient.",
    ],
    inline: {
      applications: [
        {
          src: `${op}/board-20-ans-ecran.webp`,
          alt: "Board « 20 ans d'écran plus tard… » : insight, contexte, big idea, notifications de médias piratés en 2045 et les trois affiches Opal",
          width: 1920,
          height: 1080,
          layout: "full",
          caption: "Board de campagne — 20 ans d'écran plus tard…",
        },
      ],
    },
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
    client: "Patagonia — Worn Wear",
    year: "2025",
    categories: ["campagne", "da", "image"],
    tagline: "Quand on aime, on n'abandonne pas. On répare !",
    color: "#2f3a33",
    ink: "#f2efe6",
    thumbnail: {
      src: `${pa}/affiche-pigeons.jpg`,
      alt: "Affiche Patagonia : une vieille dame souriante en veste Patagonia, des pigeons sur l'épaule, « Quand on aime, on abandonne pas, on repare ! »",
      width: 1200,
      height: 1698,
    },
    cover: {
      src: `${pa}/affichage-trois-affiches.jpg`,
      alt: "Trois affiches Patagonia sur un mur : un vieil homme avec son chat, une vieille dame avec des pigeons, un berger avec son chien, chacun dans sa veste Patagonia réparée depuis des décennies",
      width: 1920,
      height: 889,
    },
    // Contexte : texte de ton ancien site. ⚠︎ Le concept et l'identité ont été rédigés
    // à partir des affiches : relis-les et réécris-les avec tes mots.
    context: ["Proposition d'une campagne print pour promouvoir le service de réparation Patagonia."],
    concept: [
      "Un vêtement Patagonia s'use, se raccommode et traverse les années, comme une relation de longue date. La campagne met en scène des personnes âgées avec leur animal de compagnie et la veste qu'ils portent depuis des décennies.",
      "« Quand on aime, on abandonne pas, on repare ! » Chaque affiche date la pièce : M's Synchilla® Jacket réparée depuis 1998, W's Tres 3-in-1 Parka® réparée depuis 1987, M's Stormstride Jacket® réparée depuis 1981.",
    ],
    identity: [
      "Des photographies chaleureuses au grain argentique, presque des photos de famille, loin de l'image outdoor habituelle de la marque. Le titre en jaune pâle répond aux couleurs chaudes des images, la dernière ligne passe en blanc pour appuyer l'action : réparer.",
    ],
    inline: {
      concept: [
        {
          src: `${pa}/affiche-chat.jpg`,
          alt: "Affiche Patagonia : un vieil homme assis dans un fauteuil, un chat endormi sur les genoux, « M's Synchilla® Jacket réparé depuis 1998 »",
          width: 1200,
          height: 1698,
          layout: "half",
        },
        {
          src: `${pa}/affiche-pigeons.jpg`,
          alt: "Affiche Patagonia : une vieille dame avec des pigeons, « W's Tres 3-in-1 Parka® réparée depuis 1987 »",
          width: 1200,
          height: 1698,
          layout: "half",
        },
      ],
    },
  },
  {
    slug: "va-museum",
    title: "V&A Museum",
    client: "Victoria and Albert Museum — Londres",
    year: "2026",
    categories: ["branding", "edition", "da"],
    tagline: "Moderniser l'image d'une institution sans trahir son histoire.",
    color: "#1f4a33",
    ink: "#e7d9b0",
    // ⚠︎ Tu peux ajouter tes textes `problem` et `concept` : ils apparaîtront automatiquement.
    thumbnail: {
      src: `${va}/16-livret.webp`,
      alt: "Livre d'exposition V&A « Wallace & Gromit and Friends », couverture verte et monogramme en pâte à modeler, sur un fauteuil en velours vert",
      width: 2000,
      height: 1122,
    },
    cover: {
      src: `${va}/10-mise-en-situation.webp`,
      alt: "Affiche V&A 26/27 collée sur un mur, un passant flou au premier plan : le monogramme V&A découpe des portraits de Marie-Antoinette, une sculpture et une mannequin",
      width: 2000,
      height: 1120,
    },
    // Contexte : texte de ton ancien site. ⚠︎ Les textes « recherche », « identité » et
    // « déclinaisons » ont été rédigés à partir de tes slides : relis-les.
    context: [
      "Refonte complète de l'identité visuelle du V&A, le célèbre musée d'art et de design de Londres.",
      "L'objectif était de moderniser entièrement l'image de marque, tout en respectant l'histoire et le prestige de cette institution.",
    ],
    research: [
      "Le Victoria and Albert Museum, fondé en 1852, est un musée d'art situé à South Kensington. Analyse de sa communication actuelle : site web, affiches d'exposition (Cartier, Marie Antoinette Style) et réseaux sociaux.",
    ],
    identity: [
      "Le monogramme V&A, déjà iconique, devient le cœur du système : une fenêtre qui découpe les œuvres des expositions de la saison. Un bandeau de couleur porte les titres et les dates, un pied de page blanc signe chaque affiche.",
    ],
    applications: [
      "Chaque exposition réinvente le monogramme dans sa propre matière : moulures et ruban rose pour Marie Antoinette Style, pâte à modeler pour Inside Aardman, néon pour le David Bowie Centre.",
      "Le système se déploie partout : affichage, site web et réseaux sociaux, scénographie de la façade et de la cour du musée, billets d'entrée, brochure de saison et livret d'exposition.",
    ],
    inline: {
      research: [
        {
          src: `${va}/02-presentation-musee.webp`,
          alt: "Slide de présentation : monogramme V&A jaune, « Victoria and Albert Museum, fondé en 1852, musée d'art situé à Londres, South Kensington »",
          width: 2000,
          height: 1124,
          layout: "wide",
          caption: "Présentation du musée",
        },
        {
          src: `${va}/03-communication-actuelle.webp`,
          alt: "Slide « communication actuelle » : logo V&A, site web, affiches Cartier et Marie Antoinette Style, compte Instagram",
          width: 2000,
          height: 1122,
          layout: "wide",
          caption: "Communication actuelle",
        },
      ],
      identity: [
        {
          src: `${va}/08-print-generique.webp`,
          alt: "Affiche générique V&A 26/27 : bandeau rose avec la programmation, monogramme V&A découpant trois œuvres",
          width: 2000,
          height: 1122,
          layout: "wide",
          caption: "Print générique — saison 26/27",
        },
      ],
      applications: [
        {
          src: `${va}/09-declinaisons.webp`,
          alt: "Trois affiches d'exposition V&A : Marie Antoinette Style (monogramme orné de moulures et d'un ruban), Inside Aardman (monogramme en pâte à modeler avec Wallace et Gromit), David Bowie Centre (monogramme en néon)",
          width: 2000,
          height: 1121,
          layout: "full",
          caption: "Déclinaisons par exposition",
        },
        {
          src: `${va}/11-mise-en-situation-expositions.webp`,
          alt: "Les trois affiches d'exposition V&A rétroéclairées dans un couloir sombre",
          width: 2000,
          height: 1125,
          layout: "full",
          caption: "Mise en situation",
        },
        {
          src: `${va}/12-website-social-media.webp`,
          alt: "Site web V&A sur un ordinateur portable avec le monogramme Aardman, et deux posts Instagram aux couleurs des expositions",
          width: 2000,
          height: 1121,
          layout: "wide",
          caption: "Website & social media",
        },
        {
          src: `${va}/13-scenographie.webp`,
          alt: "Façade du V&A habillée : monogramme Marie-Antoinette entre les arcades, diadème géant sur le toit, Wallace et un escarpin géant dans la cour",
          width: 2000,
          height: 1120,
          layout: "full",
          caption: "Scénographie",
        },
        {
          src: `${va}/14-tickets.webp`,
          alt: "Billets d'entrée V&A : Marie Antoinette Style en rose, Inside Aardman en vert et orange",
          width: 2000,
          height: 1120,
          layout: "half",
          caption: "Tickets",
        },
        {
          src: `${va}/15-brochure.webp`,
          alt: "Brochure V&A ouverte : pages Marie Antoinette Style et David Bowie, et couverture de saison 26/27",
          width: 2000,
          height: 1121,
          layout: "half",
          caption: "Brochure",
        },
        {
          src: `${va}/16-livret.webp`,
          alt: "Livre d'exposition « Wallace & Gromit and Friends » à la couverture verte et au monogramme V&A en pâte à modeler, posé sur un fauteuil en velours vert",
          width: 2000,
          height: 1122,
          layout: "full",
          caption: "Livret d'exposition",
        },
      ],
    },
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
        {
          src: `${ho}/concept-board-evenement-perchoir.jpg`,
          alt: "Concept board de l'événement « Peau de bienvenue » avec Perchoir Group : rooftop du BHV Marais, plateau avec jus d'orange et QR code, questionnaire mobile Horée",
          width: 1920,
          height: 1081,
          layout: "full",
          caption: "Concept board de l'événement — Le Perchoir",
        },
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
    year: "2024",
    frame: "Numéro 1 — avril 2024",
    categories: ["edition", "da", "image"],
    tagline: "Dérober, chaparder, chiper. Le magazine qui aborde les sujets tabous de manière artistique et positive.",
    color: "#e23b2e",
    ink: "#fff3e0",
    thumbnail: {
      src: `${lo}/vignette-lov.webp`,
      alt: "Double page du magazine LOV : une jeune femme en écharpe tartan dans une épicerie, sac Louis Vuitton à la main, titre LOV en lettres rouges gonflées, banane en gros plan",
      width: 2000,
      height: 1123,
    },
    cover: {
      src: `${lo}/couverture-dos-ticket.jpg`,
      alt: "Couverture du magazine LOV n°1 : une fraise marquée d'un code-barres, « Dérober, Chaparder, Chiper. » ; au dos, un ticket de caisse",
      width: 1200,
      height: 766,
    },
    // Contexte : texte de ton ancien site. ⚠︎ Le concept et l'identité ont été rédigés
    // à partir des pages du magazine : relis-les et réécris-les avec tes mots.
    context: [
      "LOV, le magazine qui aborde des sujets tabous de manière artistique et positive. Dans ce numéro, le phénomène du vol est au cœur de l'ouvrage.",
      "Le vol à l'étalage, bien que souvent perçu comme un crime mineur, peut avoir des conséquences profondes sur la vie des personnes impliquées, allant de sanctions légales à des effets durables sur la confiance et la perception de soi.",
    ],
    concept: [
      "Basé sur des échanges entre jeunes, ce numéro explore le phénomène du vol de courses. Le dos de couverture prend la forme d'un ticket de caisse : banane, saumon, oignon, bonbon fil, mozzarella, brioche chocolat. Autant d'articles qui rythment ensuite les pages.",
    ],
    identity: [
      "Deux registres se répondent : des séries photo prises sur le vif dans une épicerie, sacs de luxe à la main, et des natures mortes d'aliments détourés, numérotés comme des pièces à conviction. Le logo LOV, en lettres rouges gonflées, apporte une note pop et ironique.",
    ],
    inline: {
      concept: [
        {
          src: `${lo}/oignons-sac.jpg`,
          alt: "Page du magazine LOV : un sac Louis Vuitton rempli de canettes, et trois oignons rouges numérotés 1, 2, 3",
          width: 1200,
          height: 732,
          layout: "wide",
        },
      ],
      identity: [
        {
          src: `${lo}/fond-du-sac.jpg`,
          alt: "Double page « Fond du sac » : deux jeunes femmes dans une épicerie avec des sacs Louis Vuitton, et une tranche de saumon",
          width: 1200,
          height: 782,
          layout: "half",
        },
        {
          src: `${lo}/epicerie-lunettes.jpg`,
          alt: "Double page du magazine LOV : jeune femme en lunettes noires et foulard à carreaux devant des rayons de biscuits",
          width: 1200,
          height: 733,
          layout: "half",
        },
        {
          src: `${lo}/brioche-22-47.jpg`,
          alt: "Double page du magazine LOV : silhouette avec un sac Louis Vuitton « +22.47 », et deux tranches de brioche au chocolat numérotées",
          width: 1200,
          height: 690,
          layout: "offset",
        },
      ],
    },
  },
  {
    slug: "clean-up-day",
    title: "Clean Up Day",
    client: "World Clean Up Day — journée mondiale du nettoyage",
    year: "2024",
    categories: ["campagne", "branding", "image"],
    tagline: "Votre baignade en mer en 2038 ? Une campagne d'affichage pour agir dès maintenant.",
    color: "#1e4fa0",
    ink: "#f4ea3c",
    cover: {
      src: `${cl}/affiche-baignade-2038.jpg`,
      alt: "Affiche Clean Up Day : une nageuse en maillot vert, prête à plonger depuis une poubelle verte, « Votre baignade en mer en 2038 — samedi 16 septembre »",
      width: 1920,
      height: 1440,
    },
    // Contexte : texte de ton ancien site. ⚠︎ Le concept et l'identité ont été rédigés
    // à partir des visuels : relis-les et réécris-les avec tes mots.
    context: [
      "Création d'une campagne d'affichage pour le « Clean Up Day ».",
      "Journée dédiée à la promotion de la propreté et de la durabilité environnementale à travers des actions concrètes de nettoyage et de sensibilisation.",
    ],
    concept: [
      "Projeter le public dans un futur proche : si l'on ne ramasse pas nos déchets, la mer de demain ressemblera à une poubelle. L'affiche met en scène une nageuse prête à plonger… dans un bac à ordures. « Votre baignade en mer en 2038 » — rendez-vous le samedi 16 septembre pour la Journée mondiale du nettoyage de notre planète.",
    ],
    identity: [
      "Un bleu profond et un jaune vif, une trame de points façon pop art qui dessine la mer, une vague blanche en guise de rupture et une typographie condensée très affirmée. Le système se décline sur le mobilier de la journée, jusqu'aux bacs de collecte.",
    ],
    inline: {
      identity: [
        {
          src: `${cl}/poubelle-clean-up-day.jpg`,
          alt: "Bac de collecte habillé aux couleurs du Clean Up Day : bleu, trame de points jaunes, vague blanche, « Journée mondiale du nettoyage de notre planète ! »",
          width: 1920,
          height: 1440,
          layout: "wide",
          caption: "Déclinaison — bacs de collecte",
        },
      ],
    },
  },
  {
    slug: "la-chambre-de-roomy",
    title: "La Chambre noire de Roomy",
    year: "2024",
    role: "Écriture, illustration & mise en page",
    categories: ["edition", "image"],
    tagline: "Un livre pour enfant, écrit et illustré à la main, qui donne envie de ranger sa chambre.",
    color: "#1e1e1e",
    ink: "#d7d2c8",
    thumbnail: {
      src: `${ro}/livres-ouverts.jpg`,
      alt: "Plusieurs exemplaires de « La Chambre noire de Roomy » ouverts et fermés : couvertures sombres, doubles pages avec la chambre en désordre et le petit lapin violet",
      width: 1920,
      height: 1440,
    },
    cover: {
      src: `${ro}/couverture-dos.jpg`,
      alt: "Couverture et dos du livre « La Chambre noire de Roomy » : le lapin violet étendu dans une chambre plongée dans l'ombre ; au dos, « L'histoire qui donnera l'envie de ranger la chambre de chaque enfant ! »",
      width: 1920,
      height: 1440,
    },
    context: [
      "Création d'un livre pour enfant autour du concept « chambre noire ».",
      "Une histoire avec une morale, entièrement écrite et illustrée par mes soins : des dessins réalisés à la main, puis retravaillés numériquement.",
    ],
    concept: [
      "Roomy, un petit lapin violet, ne range jamais sa chambre. La nuit, le désordre se transforme en cauchemar et sa chambre devient une « chambre noire ». « L'histoire qui donnera l'envie de ranger la chambre de chaque enfant ! »",
    ],
    identity: [
      "Chaque double page alterne un texte court posé dans un halo de lumière sur fond noir, comme une lampe de chevet, et une illustration de la chambre aux traits volontairement naïfs. Une typographie manuscrite accompagne le ton du conte.",
    ],
    inline: {
      identity: [
        {
          src: `${ro}/double-page-reveil.jpg`,
          alt: "Double page : à gauche, « Roomy se réveilla en sursaut, terrifié par son cauchemar… Mais il était l'heure d'aller à l'école. » dans un halo jaune ; à droite, Roomy crie « AHHHHH » dans sa chambre en désordre",
          width: 1920,
          height: 1440,
          layout: "wide",
        },
      ],
    },
  },
];

/** L'image qui représente le projet dans les listes : la vignette, sinon le visuel principal. */
export function thumbnailOf(p: Project) {
  return p.thumbnail ?? p.cover;
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const featuredProjects = projects.filter((p) => p.featured);
