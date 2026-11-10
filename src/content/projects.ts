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
  campagne: "Campagne 360",
  image: "Photographie / Image",
} as const;

export type CategoryKey = keyof typeof categories;

export type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Mise en page dans la galerie : pleine largeur, large, moitié, ou décalée. */
  layout?: "full" | "wide" | "half" | "offset" | "narrow";
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
  /** Masque la ligne « Discipline » en haut de la page projet. */
  hideDiscipline?: boolean;
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

  /**
   * La fiche du projet, affichée en 3 colonnes : Contexte / Idée / Dispositif.
   * Une phrase courte chacune — c'est l'image qui doit parler.
   */
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
  /**
   * Présentation complète, page par page (ex. les slides d'une campagne 360).
   * Affichées en pleine largeur, dans l'ordre, avec un compteur « 01 / 12 ».
   * Nomme tes fichiers 01.webp, 02.webp… pour garder l'ordre.
   */
  slides?: Media[];
  credits?: string;
};

const fb = "/images/projets/flying-blue";
const op = "/images/projets/opal";
const pa = "/images/projets/patagonia";
const cl = "/images/projets/clean-up-day";
const va = "/images/projets/va-museum";
const ro = "/images/projets/la-chambre-de-roomy";
const lb = "/images/projets/loreal-brandstorm";
const om = "/images/projets/oh-my-cream";
const tt = "/images/projets/torta-di-spaghetti";
const cz = "/images/projets/chez-louis";
const ho = "/images/projets/horee";
const mc = "/images/projets/macareoni";
const vi = "/images/projets/vico";
const lo = "/images/projets/lov-magazine";

export const projects: Project[] = [
  {
    slug: "flying-blue-lime",
    title: "Flying Blue × Lime",
    client: "Flying Blue — Air France KLM",
    year: "2025",
    role: "Direction artistique & conception",
    frame: "Projet d'école — Sup de Pub Paris",
    categories: ["campagne", "da"],
    tagline: "Pédaler, s'envoler.",
    color: "#1d22c9",
    ink: "#ffffff",
    featured: true,
    thumbnail: {
      src: "/images/projets/flying-blue/vignette.jpg",
      alt: "Jeune femme souriante sur un vélo Lime aux couleurs Flying Blue, « Ride with us. »",
      width: 1206,
      height: 670,
    },
    cover: {
      src: `${fb}/affiche-new-york.webp`,
      alt: "Affiche Flying Blue dans un couloir de métro : une jeune femme à vélo Lime, titre « Cette balade à vélo m'amène jusqu'à New York* »",
      width: 1920,
      height: 1426,
    },
    context: ["Rendre Flying Blue désirable auprès des 18-24 ans, une génération qui voyage en pensant écologie."],
    concept: ["Flying Blue × Lime : chaque kilomètre à vélo devient un mile."],
    applications: ["Affichage métro, vélos Lime habillés, réseaux sociaux et voyage presse à New York."],
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
    slug: "macareoni",
    title: "Ma'care'oni",
    client: "Kraft — Mac & Cheese",
    year: "2025",
    frame: "Participation D&AD Awards",
    categories: ["campagne", "da"],
    tagline: "Une saveur pour chaque humeur.",
    color: "#1f63e0",
    ink: "#ffd23f",
    featured: true,
    thumbnail: {
      src: "/images/projets/macareoni/vignette.jpg",
      alt: "Logo Ma'care'oni, « care » en jaune fondant, sur fond bleu Kraft",
      width: 1206,
      height: 663,
    },
    cover: {
      src: `${mc}/packagings-moods.jpg`,
      alt: "Trois packs Kraft Mac & Cheese édition Ma'care'oni : Feeling angry? Extra Spicy, Feeling happy? Original Taste, Feeling sad? Extra Cheesy",
      width: 1600,
      height: 879,
    },
    context: ["Activation pour les mac & cheese Kraft. Participation aux D&AD Awards."],
    concept: ["Une saveur par humeur, et un QR code pour partager son repas en appel vidéo."],
    applications: ["Packs en édition limitée et mécanique « Scan ! Meet ! »."],
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
    year: "2026",
    categories: ["branding", "image"],
    tagline: "La pizza a trouvé sa cousine.",
    color: "#1f5fd6",
    ink: "#f6d64a",
    thumbnail: {
      src: "/images/projets/torta-di-spaghetti/vignette.jpg",
      alt: "Une jeune femme croque à pleines dents une part de torta di spaghetti sur fond noir, logo Torta rouge et emblème jaune",
      width: 1206,
      height: 677,
    },
    context: ["Identité d'une street food napolitaine à emporter."],
    concept: ["La pizza a trouvé sa cousine : la tarte aux spaghetti."],
    applications: ["Logo, affiches, boîtes à emporter et photographie."],
    slides: [
      { src: `${tt}/01.webp`, alt: "Logo Torta di Spaghetti en rouge et jaune, avec l'emblème en nid de spaghetti, sur fond vert", width: 2000, height: 1116 },
      { src: `${tt}/02.webp`, alt: "Affiche vintage « Il gusto della tradizione » avec une part de torta et la baie de Naples, carte verte au logo Torta, texte de présentation", width: 2000, height: 1114 },
      { src: `${tt}/03.webp`, alt: "Texte de concept sur fond rouge : « Née dans les cuisines de Nonna, la tarte aux pâtes est un plat du cœur »", width: 2000, height: 1135 },
      { src: `${tt}/04.webp`, alt: "Déclinaisons du logo en rouge, blanc et noir, et affiche rouge vintage : un personnage allongé sur une part géante de torta, « 6 € da asporto »", width: 2000, height: 1101 },
      { src: `${tt}/05.webp`, alt: "Charte : palette vert #006837, jaune #f6c104, rouge #e32514, bleu #2b61a3 ; typographies Baucher Gothic URW Extd et Dreaming Outloud Script", width: 2000, height: 1123 },
      { src: `${tt}/06.webp`, alt: "Packaging : boîtes triangulaires bleues à motif de spaghetti jaunes, sticker rond Torta et torta entière sur planche", width: 2000, height: 1123 },
      { src: `${tt}/07.webp`, alt: "Déclinaisons de l'emblème Torta en rouge, bleu et vert, et éléments graphiques vintage : nid de spaghetti, « Buona, semplice, italiana », monogramme T", width: 2000, height: 1120 },
      { src: `${tt}/08.webp`, alt: "Motif de spaghetti jaunes en boucles sur fond rouge avec le logo Torta en blanc", width: 2000, height: 1117 },
      { src: `${tt}/09.webp`, alt: "Photographie : une jeune femme croque dans une part de torta sur fond noir, logo Torta et emblème jaune", width: 2000, height: 1120 },
      { src: `${tt}/10.webp`, alt: "Page de fin : « Grazie mille ! » et logo Torta en blanc sur fond bleu, motif de spaghetti jaunes", width: 2000, height: 1107 },
    ],
  },
  {
    slug: "opal",
    title: "Opal",
    client: "Opal — application de gestion du temps d'écran",
    year: "2025",
    role: "Projet d'équipe",
    frame: "Compétition Campagne 360 — Sup de Pub · Équipe lauréate",
    categories: ["campagne", "da"],
    tagline: "20 ans d'écran plus tard…",
    color: "#2b1660",
    ink: "#e9ddff",
    featured: true,
    thumbnail: {
      src: "/images/projets/opal/vignette.jpg",
      alt: "Logo Opal blanc sur une forme lumineuse aux couleurs irisées, fond noir",
      width: 1206,
      height: 674,
    },
    cover: {
      src: `${op}/affichage-metro.jpg`,
      alt: "Trois affiches Opal dans le métro : « 20 ans, c'est le temps qu'a pris Steve Jobs pour créer l'iPhone », « …J.R.R. Tolkien pour créer Le Seigneur des Anneaux », « …Marie Curie pour gagner 2 prix Nobel »",
      width: 1920,
      height: 1387,
    },
    context: ["Campagne 360 pour l'application Opal. Équipe lauréate de la compétition Sup de Pub."],
    concept: ["20 ans d'écran dans une vie : ce que d'autres ont accompli dans le même temps."],
    applications: ["Affichage métro et activation « Opal × Ghostbusters »."],
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
    slug: "oh-my-cream",
    title: "Oh My Cream",
    client: "Oh My Cream! Skincare",
    year: "2026",
    role: "Projet d'équipe — avec Cybil Ajacques, Loup Arbel, Mila Capron, Olivia Cheno et Georges Gautier",
    frame: "Campagne 360 — Sup de Pub Paris",
    categories: ["campagne", "da"],
    tagline: "Le soin parfait d'une vie imparfaite.",
    color: "#3a1420",
    ink: "#efe6dc",
    thumbnail: {
      src: "/images/projets/oh-my-cream/vignette.jpg",
      alt: "Collage Oh My Cream : photo d'une femme qui applique sa crème, tube dessiné, pince et trombone",
      width: 1206,
      height: 671,
    },
    context: ["Campagne 360 pour le lancement du duo anti-imperfections Oh My Cream."],
    concept: ["« Le soin parfait d'une vie imparfaite. »"],
    applications: ["Film, natures mortes, Instagram, événement et kit RP."],
    slides: [
      { src: `${om}/01.webp`, alt: "Slide de titre : OH MY CREAM ! skincare — Campagne 360, Sup de Pub Paris", width: 2000, height: 1125 },
      { src: `${om}/02.webp`, alt: "Insight « Soyons honnêtes » : la vraie vie est loin du cliché clean girl ; une beauté minimaliste, efficace et naturelle", width: 2000, height: 1125 },
      { src: `${om}/03.webp`, alt: "« Des vies intenses, souvent chaotiques. » sur un fond d'objets du quotidien en vrac", width: 2000, height: 1122 },
      { src: `${om}/04.webp`, alt: "Problème : « Vie mouvementée, peau déséquilibrée. La sensibilité cutanée est souvent le miroir des intensités d'une vie de femme. »", width: 2000, height: 1124 },
      { src: `${om}/05.webp`, alt: "Solution « Devenir un repère » : profils de femmes de générations différentes ; la skincare comme pause essentielle", width: 2000, height: 1122 },
      { src: `${om}/06.webp`, alt: "Mécanique « Un storytelling en trois temps » : le quotidien déborde, la peau réagit, OMC aide à la rééquilibrer", width: 2000, height: 1123 },
      { src: `${om}/07.webp`, alt: "Big idea sur fond bordeaux : « Le soin parfait d'une vie imparfaite. Une vie dense, sociale, imparfaite, mais tenue par quelques gestes fiables. »", width: 2000, height: 1117 },
      { src: `${om}/08.webp`, alt: "« Skincare first » : une pile de journaux froissés ; la direction artistique où l'ordre émerge du chaos, textures de papier et découpes", width: 2000, height: 1125 },
      { src: `${om}/09.webp`, alt: "Nature morte « Métro, boulot, belle peau » : le sérum anti-imperfections en équilibre sur une pile d'objets du quotidien, fond bleu à cercles découpés", width: 2000, height: 1122 },
      { src: `${om}/10.webp`, alt: "Nature morte « Métro, boulot, belle peau » : le soin ciblé anti-imperfections sur une pile d'objets, fond bleu criblé de pastilles découpées", width: 2000, height: 1121 },
      { src: `${om}/11.webp`, alt: "Moodboard du film de lancement « Un chaos maîtrisé » : un film mixed media sur le quotidien d'une femme citadine, avec un retravail graphique print", width: 2000, height: 1125 },
      { src: `${om}/12.webp`, alt: "« Du digital… » sur fond bordeaux", width: 2000, height: 1123 },
      { src: `${om}/13.webp`, alt: "Digital / content creation : grille Instagram Oh My Cream — mises en scène du quotidien, collages des actifs, annonce de l'event Café Nuances", width: 2000, height: 1121 },
      { src: `${om}/14.webp`, alt: "Références de Reels à forte identité visuelle, entre dualité scientifique et lifestyle aspirationnel", width: 2000, height: 1120 },
      { src: `${om}/15.webp`, alt: "« … à l'expérientiel. » sur fond bordeaux", width: 2000, height: 1120 },
      { src: `${om}/16.webp`, alt: "Event « Bois ta skincare » chez Café Nuances : boisson Oh My Juice et machine à boules d'échantillons Oh My Cream", width: 2000, height: 1121 },
      { src: `${om}/17.webp`, alt: "Kit RP « Le jeu d'adresse » : tour en bois gravée Oh My Cream avec le sérum caché à l'intérieur", width: 2000, height: 1122 },
      { src: `${om}/18.webp`, alt: "Kit RP « Le jeu d'adresse » : la tour s'effondre, une main tient le sérum anti-imperfections intact", width: 2000, height: 1122 },
      { src: `${om}/19.webp`, alt: "Kit RP : unboxing par des influenceuses parisiennes (@isabeaudelatour, @jeannedamas, @mademoisellesoph) et vidéo TikTok", width: 2000, height: 1121 },
      { src: `${om}/20.webp`, alt: "Slide de fin : « À ceux qui vont vite et visent haut : merci. » sur une photo floue d'une femme qui traverse la rue", width: 2000, height: 1122 },
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
      src: "/images/projets/patagonia/vignette.jpg",
      alt: "Logo Patagonia sur la photo d'un vieil homme en polaire Patagonia, un chat sur les genoux",
      width: 1206,
      height: 668,
    },
    cover: {
      src: `${pa}/affichage-trois-affiches.jpg`,
      alt: "Trois affiches Patagonia sur un mur : un vieil homme avec son chat, une vieille dame avec des pigeons, un berger avec son chien, chacun dans sa veste Patagonia réparée depuis des décennies",
      width: 1920,
      height: 889,
    },
    context: ["Campagne print pour le service de réparation Patagonia."],
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
    context: ["Refonte de l'identité du V&A, musée d'art et de design à Londres."],
    concept: ["Le monogramme V&A devient une fenêtre qui se réinvente à chaque exposition."],
    applications: ["Affiches, site, scénographie, billets, brochure et livret."],
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
    categories: ["branding", "da"],
    tagline: "Savourez la ficelle à pleines dents.",
    color: "#1c2a6b",
    ink: "#e9d9a6",
    thumbnail: {
      src: "/images/projets/chez-louis/vignette.jpg",
      alt: "Devanture Chez Louis : store bleu marine avec la mascotte Louis, logo jaune sur la vitrine",
      width: 1206,
      height: 667,
    },
    context: ["Brandbook d'un fast-food à la française."],
    concept: ["La ficelle travaillée comme une pièce de maroquinerie."],
    applications: ["Logo, mascotte, devanture, menu, packaging et affichage."],
    slides: [
      { src: `${cz}/01.webp`, alt: "Couverture : « Brandbook Chez Louis » en grandes capitales blanches sur fond bleu marine", width: 2000, height: 1125 },
      { src: `${cz}/02.webp`, alt: "Introduction : « Avec une carte volontairement réduite, Chez Louis réinvente la restauration rapide en proposant un modèle alternatif aux fast-foods traditionnels. »", width: 2000, height: 1125 },
      { src: `${cz}/03.webp`, alt: "Trois valeurs en images : savoir-faire français (tablier noué), qualité irréprochable (pâte farinée), expérience soignée (sacs à baguettes)", width: 2000, height: 1125 },
      { src: `${cz}/04.webp`, alt: "Une femme en trench sur un passage piéton brandit une pancarte « Le fast food à la française c'est Chez Louis ! »", width: 2000, height: 1125 },
      { src: `${cz}/05.webp`, alt: "Moodboard : une baguette, un héritage, un fil, une surpiqûre, un sac baguette, « douce », des couleurs chaudes", width: 2000, height: 1125 },
      { src: `${cz}/06.webp`, alt: "Logo Chez Louis, typographie haute et condensée, en jaune jasmin sur bleu indigo et en indigo sur jaune", width: 2000, height: 1125 },
      { src: `${cz}/07.webp`, alt: "Typographies : Roboto Black pour les titres, Medium pour les sous-titres, Thin pour les paragraphes", width: 2000, height: 1125 },
      { src: `${cz}/08.webp`, alt: "Nuanciers identitaires : Twilight Indigo #1D3461, Dust Grey #D6D5C9, Jasmine #F4D58D", width: 2000, height: 1125 },
      { src: `${cz}/09.webp`, alt: "Principes graphiques : la mascotte Louis, homme moustachu portant un sac à baguette, en pied, en buste et en portrait", width: 2000, height: 1125 },
      { src: `${cz}/10.webp`, alt: "Devanture Chez Louis : store bleu marine festonné avec la mascotte Louis, logo jaune sur la vitrine", width: 2000, height: 1125 },
      { src: `${cz}/11.webp`, alt: "Menu sur chevalet bleu : la Ficelle piquée, brodée, surpiquée et doublée", width: 2000, height: 1125 },
      { src: `${cz}/12.webp`, alt: "Cartes de « Ficélité » : cartes bleues au logo Chez Louis et versos jaunes à tampons", width: 2000, height: 1125 },
      { src: `${cz}/13.webp`, alt: "Sac à baguette bleu marine imprimé de la mascotte Louis, porté dans une rue parisienne", width: 2000, height: 1125 },
      { src: `${cz}/14.webp`, alt: "Porte-gobelets bleu Chez Louis et gobelets jaunes à motif Louis", width: 2000, height: 1125 },
      { src: `${cz}/15.webp`, alt: "Affichage métro : deux ficelles nouées d'une bague Louis, « Vite fait, très bien fait. »", width: 2000, height: 1125 },
      { src: `${cz}/16.webp`, alt: "Page de fin : logo Chez Louis et signature « savourez la ficelle à pleines dents » en jaune sur fond bleu", width: 2000, height: 1125 },
    ],
  },
  {
    slug: "vico",
    title: "Vico",
    client: "Vico — gamme Street Food",
    year: "2025",
    frame: "Compétition Campagne 360 — Sup de Pub",
    categories: ["campagne", "da"],
    tagline: "Les classiques de la street food s'invitent chez toi.",
    color: "#c92f8c",
    ink: "#2a0a1d",
    thumbnail: {
      src: "/images/projets/vico/vignette.jpg",
      alt: "Affiche Vico sur fond rose : « C'est pas la capitale, c'est Bangkok bébé ! » et le paquet Street Food saveur Bœuf Thaï",
      width: 1206,
      height: 670,
    },
    cover: {
      src: `${vi}/affichage-metro.jpg`,
      alt: "Trois affiches Vico Street Food dans le métro : « C'est pas la capitale, c'est Bangkok bébé ! », « Tex Mex, Tex Mex Vie », « Sauce Curry, Beau Gosse »",
      width: 1920,
      height: 1076,
    },
    context: ["Campagne 360 pour les nouvelles saveurs Vico, cible 18-24 ans."],
    concept: ["Les punchlines du rap rencontrent la street food : #StreetandChips."],
    applications: ["Affichage, packs avec QR code et une playlist Spotify par saveur."],
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
    hideDiscipline: true,
    categories: ["campagne", "da"],
    tagline: "Santé, à votre peau !",
    color: "#ece6dc",
    ink: "#5c0f1c",
    featured: true,
    thumbnail: {
      src: "/images/projets/horee/vignette.jpg",
      alt: "Une main tient le sérum Détoxifiant BIO Horée, des gouttes rouges s'en échappent",
      width: 1206,
      height: 669,
    },
    cover: {
      src: `${ho}/abribus-serums.jpg`,
      alt: "Affiche Horée sur un mobilier urbain : deux mains trinquent avec les sérums Détoxifiant et Désaltérant BIO, titre « Santé, à votre peau ! »",
      width: 1920,
      height: 1288,
    },
    context: ["Campagne de notoriété pour une marque de soin BIO, auprès des 20-25 ans."],
    concept: ["Des soins qui se boivent : « Santé, à votre peau ! »"],
    applications: ["Affichage, frigo-diagnostic chez Monoprix et événement au Perchoir du Marais."],
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
    role: "Projet d'équipe — avec Mila Capron et Alexandre Couy",
    frame: "Concours L'Oréal Brandstorm 2026",
    categories: ["da"],
    tagline: "Les In-Fusions de Prada : l'art du layering.",
    color: "#b9dcc4",
    ink: "#21402c",
    thumbnail: {
      src: "/images/projets/loreal-brandstorm/vignette.jpg",
      alt: "Coffret vert d'eau « Les Infusions de Prada » ouvert : trois flacons rose, orange et vert",
      width: 2000,
      height: 1116,
    },
    cover: {
      src: `${lb}/01-insight-gen-z.webp`,
          alt: "Slide : « Gen Z consumes in a circular way, frequently changes, and accumulates without lasting attachment. » avec trois chiffres clés",
          width: 2000,
          height: 1124,
    },
    context: ["L'Oréal Brandstorm 2026 : fidéliser une Gen Z qui change sans cesse."],
    concept: ["Les In-Fusions de Prada : trois parfums qui s'emboîtent et se superposent."],
    applications: ["Coffret de layering vendu sur Sephora."],
    figures: [
      { value: "32 %", label: "des Gen Z possèdent 4 parfums ou plus" },
      { value: "71 %", label: "de recherches Google pour la mode « layered » fin 2024" },
      { value: "79 %", label: "des Gen Z voient le changement d'emploi comme la clé d'un meilleur salaire" },
    ],
    inline: {
      problem: [
        {
          src: `${lb}/02-in-fusion.webp`,
      alt: "Une main empile trois flacons Prada Infusion rose, orange et vert qui s'emboîtent : « one cap for three fragrances », « mix and match », « interlocking packaging », « mini size and smart size »",
      width: 1358,
      height: 752,
          layout: "wide",
        },
      ],
      applications: [
        {
          src: `${lb}/03-sephora.webp`,
          alt: "Ordinateur portable affichant la fiche produit Sephora du coffret de layering Les In-Fusions de Prada, « Reinventing an existing product with added value »",
          width: 1320,
          height: 744,
          layout: "wide",
        },
      ],
    },
  },
  {
    slug: "lov-magazine",
    title: "LOV Magazine",
    year: "2024",
    frame: "Numéro 1 — avril 2024",
    categories: ["edition", "da", "image"],
    tagline: "Dérober, chaparder, chiper.",
    color: "#e23b2e",
    ink: "#fff3e0",
    thumbnail: {
      src: "/images/projets/lov-magazine/vignette.jpg",
      alt: "Double page LOV : jeune femme en écharpe tartan dans une épicerie, logo LOV rouge, banane en gros plan",
      width: 1206,
      height: 664,
    },
    cover: {
      src: `${lo}/couverture-dos-ticket.jpg`,
      alt: "Couverture du magazine LOV n°1 : une fraise marquée d'un code-barres, « Dérober, Chaparder, Chiper. » ; au dos, un ticket de caisse",
      width: 1200,
      height: 766,
    },
    context: ["Un magazine qui aborde les sujets tabous avec art. Numéro 1 : le vol."],
    concept: ["Un dos en ticket de caisse, des aliments numérotés comme des pièces à conviction."],
    applications: ["Couverture, séries photo en épicerie et natures mortes."],
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
    tagline: "Votre baignade en mer en 2038 ?",
    color: "#1e4fa0",
    ink: "#f4ea3c",
    thumbnail: {
      src: "/images/projets/clean-up-day/vignette.jpg",
      alt: "Couvercle de poubelle bleue marqué « Clean Up Day » en jaune",
      width: 1206,
      height: 662,
    },
    cover: {
      src: `${cl}/affiche-baignade-2038.jpg`,
      alt: "Affiche Clean Up Day : une nageuse en maillot vert, prête à plonger depuis une poubelle verte, « Votre baignade en mer en 2038 — samedi 16 septembre »",
      width: 1920,
      height: 1440,
    },
    context: ["Affiche pour la journée mondiale du nettoyage."],
    concept: ["« Votre baignade en mer en 2038 » : une nageuse plonge dans une poubelle."],
    applications: ["Affichage et bacs de collecte."],
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
    tagline: "Le livre qui donne envie de ranger sa chambre.",
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
    context: ["Livre pour enfant écrit et illustré à la main."],
    concept: ["Une chambre en désordre devient un cauchemar : de quoi donner envie de ranger."],
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
