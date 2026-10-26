import type { ProjectType } from "./projets";

export type Service = {
  slug: ProjectType;
  title: string;
  summary: string;
  details: string[];
  woods: string;
  finishes: string;
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    slug: "cuisines",
    title: "Cuisines",
    summary:
      "Façades, caissons et plans de travail fabriqués aux mesures de la pièce, jusqu'au plafond si vous le souhaitez.",
    details: [
      "Implantation dessinée d'après le relevé de la pièce, électroménager compris.",
      "Caissons en contreplaqué de bouleau, façades en bois massif ou plaqué bois.",
      "Plans en bois massif fabriqués à l'atelier ; plans en pierre posés par un marbrier partenaire.",
    ],
    woods: "Chêne, noyer, frêne, hêtre",
    finishes: "Huile ou vernis à l'eau",
    image: "/images/projets/cuisine-plan-hetre.jpg",
    alt: "Cuisine aux façades crème avec plans de travail en hêtre massif",
  },
  {
    slug: "rangements",
    title: "Rangements et dressings",
    summary:
      "Placards, dressings, bibliothèques et sous-pentes, dessinés pour la pièce, y compris quand les murs ne sont pas droits.",
    details: [
      "Aménagement intérieur choisi avec vous : penderies, tiroirs, étagères réglables.",
      "Portes battantes, coulissantes ou miroirs, avec fermeture amortie.",
      "Chaque mur est mesuré : les murs et plafonds sont rarement droits.",
    ],
    woods: "Chêne, noyer, contreplaqué de bouleau",
    finishes: "Huile, vernis à l'eau ou laque mate",
    image: "/images/projets/bibliotheque-toute-hauteur.jpg",
    alt: "Bibliothèque blanche du sol au plafond sur deux niveaux",
  },
  {
    slug: "escaliers",
    title: "Escaliers",
    summary:
      "Escaliers droits, quart-tournants ou balancés, calculés pour que chaque marche ait la même hauteur.",
    details: [
      "Giron et hauteur de marche calculés d'après la trémie existante.",
      "Rampes à balustres ou à barreaux.",
      "Fabrication complète à l'atelier, pose en un ou deux jours.",
    ],
    woods: "Chêne, frêne, pin",
    finishes: "Huile ou vernis à l'eau",
    image: "/images/projets/escalier-pin-balustres.jpg",
    alt: "Escalier balancé en pin à balustres tournés",
  },
  {
    slug: "agencement",
    title: "Agencement et habillages",
    summary:
      "Commerces, bureaux, habillages muraux et lambris, dessinés avec vous ou votre architecte.",
    details: [
      "Plans validés avec vous ou votre architecte avant la fabrication.",
      "Pour un commerce, pose en dehors des heures d'ouverture si nécessaire.",
      "Pour un usage intensif : vernis résistant et chants en bois massif.",
    ],
    woods: "Chêne, noyer, pin, contreplaqué de bouleau",
    finishes: "Huile ou vernis à l'eau",
    image: "/images/projets/bureaux-tables-chene.jpg",
    alt: "Espace de bureaux avec tables en chêne clair",
  },
];

/** Étapes d'un projet, avec leur durée en jours ouvrés pour la frise. */
export const steps = [
  {
    title: "Visite et mesures",
    text: "Nous venons chez vous dans la semaine qui suit votre appel, écoutons le projet et relevons toutes les cotes.",
    duration: "Dans la semaine",
    days: 5,
  },
  {
    title: "Plan et devis",
    text: "Vous recevez un plan coté et un devis détaillé. La visite et le devis sont gratuits.",
    duration: "Sous 10 jours ouvrés",
    days: 10,
  },
  {
    title: "Fabrication",
    text: "Tout est débité, assemblé et fini à l'atelier. Nous n'achetons pas de meubles en kit.",
    duration: "4 à 6 semaines",
    days: 25,
  },
  {
    title: "Pose",
    text: "La même équipe fabrique et pose. Elle règle chaque porte et laisse le chantier propre.",
    duration: "1 à 3 jours",
    days: 2,
  },
] as const;
