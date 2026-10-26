// Réalisations affichées sur l'accueil et dans la galerie.
// Ajouter un projet : déposer la photo dans public/images/projets,
// puis ajouter une entrée ci-dessous.

export type ProjectType = "cuisines" | "rangements" | "escaliers" | "agencement";

export type Project = {
  slug: string;
  title: string;
  type: ProjectType;
  image: string;
  width: number;
  height: number;
  alt: string;
  wood: string;
  finish: string;
  /** Dimensions principales, telles qu'elles figurent sur le plan. */
  dimensions: string;
  /** Durée d'atelier et de pose. */
  duration: string;
  /** Mis en avant sur l'accueil. */
  featured?: boolean;
};

export const projectTypes: { value: ProjectType; label: string }[] = [
  { value: "cuisines", label: "Cuisines" },
  { value: "rangements", label: "Rangements" },
  { value: "escaliers", label: "Escaliers" },
  { value: "agencement", label: "Agencement et habillages" },
];

export const projects: Project[] = [
  {
    slug: "cuisine-chene-ilot",
    title: "Cuisine en chêne avec îlot",
    type: "cuisines",
    image: "/images/projets/cuisine-chene-ilot.jpg",
    width: 1770,
    height: 1180,
    alt: "Cuisine aux façades en chêne, colonnes jusqu'au plafond, îlot en chêne avec plan de pierre noire",
    wood: "Chêne, plan en pierre noire",
    finish: "Vernis mat à l'eau",
    dimensions: "Linéaire 4 200 mm, colonnes 2 450 mm",
    duration: "5 semaines d'atelier, 2 jours de pose",
  },
  {
    slug: "escalier-pin-quart-tournant",
    title: "Escalier quart-tournant",
    type: "escaliers",
    image: "/images/projets/escalier-pin-quart-tournant.jpg",
    width: 1800,
    height: 1200,
    alt: "Escalier quart-tournant en pin, première marche arrondie, rampe à balustres tournés",
    wood: "Pin massif",
    finish: "Vernis satiné à l'eau",
    dimensions: "15 marches, première marche arrondie",
    duration: "4 semaines d'atelier, 2 jours de pose",
    featured: true,
  },
  {
    slug: "dressing-chene-miroirs",
    title: "Dressing en chêne, portes miroirs",
    type: "rangements",
    image: "/images/projets/dressing-chene-miroirs.jpg",
    width: 1800,
    height: 1200,
    alt: "Dressing toute hauteur en chêne clair dans une chambre, deux portes miroirs et tiroirs",
    wood: "Chêne, caissons en contreplaqué de bouleau",
    finish: "Huile incolore",
    dimensions: "Largeur 3 200 mm, hauteur 2 500 mm",
    duration: "4 semaines d'atelier, 1 jour de pose",
    featured: true,
  },
  {
    slug: "cuisine-noyer-ilot",
    title: "Îlot en noyer",
    type: "cuisines",
    image: "/images/projets/cuisine-noyer-ilot.jpg",
    width: 1800,
    height: 1186,
    alt: "Cuisine blanche avec un îlot aux façades en noyer et un plan blanc",
    wood: "Noyer, plan en quartz blanc",
    finish: "Huile incolore",
    dimensions: "Îlot 2 800 mm",
    duration: "4 semaines d'atelier, 1 jour de pose",
    featured: true,
  },
  {
    slug: "escalier-limon-chene",
    title: "Escalier droit en chêne",
    type: "escaliers",
    image: "/images/projets/escalier-limon-chene.jpg",
    width: 1800,
    height: 2250,
    alt: "Marches en chêne d'un escalier droit le long d'un mur blanc",
    wood: "Chêne massif, marches de 40 mm",
    finish: "Huile-cire",
    dimensions: "13 marches, largeur 900 mm",
    duration: "4 semaines d'atelier, 1 jour de pose",
    featured: true,
  },
  {
    slug: "bureaux-tables-chene",
    title: "Espace de travail partagé",
    type: "agencement",
    image: "/images/projets/bureaux-tables-chene.jpg",
    width: 1800,
    height: 1200,
    alt: "Grand espace de bureaux avec tables en chêne clair et plafond à caissons",
    wood: "Chêne et contreplaqué de bouleau",
    finish: "Vernis mat à l'eau",
    dimensions: "14 tables, 2 banquettes",
    duration: "6 semaines d'atelier, 3 jours de pose",
  },
  {
    slug: "bibliotheque-toute-hauteur",
    title: "Bibliothèque toute hauteur",
    type: "rangements",
    image: "/images/projets/bibliotheque-toute-hauteur.jpg",
    width: 1800,
    height: 2918,
    alt: "Bibliothèque blanche du sol au plafond sur deux niveaux, au-dessus d'un canapé",
    wood: "Contreplaqué de bouleau",
    finish: "Laque blanche mate",
    dimensions: "Hauteur 5 200 mm, 64 cases",
    duration: "5 semaines d'atelier, 3 jours de pose",
  },
  {
    slug: "cuisine-chene-teinte",
    title: "Cuisine en chêne teinté",
    type: "cuisines",
    image: "/images/projets/cuisine-chene-teinte.jpg",
    width: 1800,
    height: 1350,
    alt: "Cuisine aux façades en chêne teinté, îlot central et plancher en bois",
    wood: "Chêne, façades à cadre",
    finish: "Teinte noyer, vernis satiné",
    dimensions: "Linéaire 6 400 mm",
    duration: "6 semaines d'atelier, 3 jours de pose",
  },
  {
    slug: "escalier-pin-balustres",
    title: "Escalier balancé à balustres",
    type: "escaliers",
    image: "/images/projets/escalier-pin-balustres.jpg",
    width: 1800,
    height: 1200,
    alt: "Escalier balancé en pin avec poteau d'angle et balustres tournés",
    wood: "Pin massif",
    finish: "Vernis satiné à l'eau",
    dimensions: "16 marches, 3 marches balancées",
    duration: "4 semaines d'atelier, 2 jours de pose",
  },
  {
    slug: "habillage-tasseaux",
    title: "Habillage mural en tasseaux",
    type: "agencement",
    image: "/images/projets/habillage-tasseaux.jpg",
    width: 1800,
    height: 1800,
    alt: "Mur de salon habillé de tasseaux verticaux en bois foncé, du sol au plafond",
    wood: "Noyer",
    finish: "Huile incolore",
    dimensions: "Hauteur 2 700 mm, tasseaux de 20 × 40 mm",
    duration: "2 semaines d'atelier, 1 jour de pose",
    featured: true,
  },
  {
    slug: "cuisine-plan-hetre",
    title: "Plans de travail en hêtre",
    type: "cuisines",
    image: "/images/projets/cuisine-plan-hetre.jpg",
    width: 1800,
    height: 1200,
    alt: "Cuisine aux façades crème avec plans de travail en hêtre massif et retour en péninsule",
    wood: "Hêtre massif, 40 mm",
    finish: "Huile alimentaire",
    dimensions: "Plans 3 900 mm et 2 200 mm",
    duration: "2 semaines d'atelier, 1 jour de pose",
  },
  {
    slug: "armoire-chene",
    title: "Armoire deux portes",
    type: "rangements",
    image: "/images/projets/armoire-chene.jpg",
    width: 1800,
    height: 2700,
    alt: "Armoire deux portes en chêne posée contre un mur blanc, sur un parquet en chevrons",
    wood: "Chêne massif",
    finish: "Huile-cire",
    dimensions: "Hauteur 1 950 mm, largeur 1 050 mm",
    duration: "3 semaines d'atelier",
  },
  {
    slug: "lambris-pin",
    title: "Chambre lambrissée",
    type: "agencement",
    image: "/images/projets/lambris-pin.jpg",
    width: 1800,
    height: 1201,
    alt: "Chambre aux murs couverts de lambris en pin, banquette et applique murale",
    wood: "Pin noueux",
    finish: "Huile incolore",
    dimensions: "Surface 38 m²",
    duration: "1 semaine d'atelier, 3 jours de pose",
    featured: true,
  },
];

// Ordre d'affichage sur l'accueil : une grande photo, une photo verticale, puis quatre.
const featuredOrder = [
  "dressing-chene-miroirs",
  "escalier-limon-chene",
  "cuisine-noyer-ilot",
  "escalier-pin-quart-tournant",
  "habillage-tasseaux",
  "lambris-pin",
];
export const featuredProjects = featuredOrder.map((slug) => projects.find((p) => p.slug === slug)!);

export function typeLabel(type: ProjectType) {
  return projectTypes.find((t) => t.value === type)?.label ?? type;
}
