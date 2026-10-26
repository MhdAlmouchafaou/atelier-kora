import type { ProjectType } from "./projets";

export type Service = {
  slug: ProjectType;
  title: string;
  summary: string;
  details: string[];
  woods: string;
  delay: string;
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    slug: "cuisines",
    title: "Cuisines",
    summary:
      "Façades, caissons et plans de travail fabriqués à vos mesures, jusqu'au plafond si la pièce le permet.",
    details: [
      "Implantation dessinée d'après le relevé de la pièce, électroménager compris.",
      "Caissons en contreplaqué de bouleau, façades en bois massif ou plaqué.",
      "Plans en bois massif fabriqués à l'atelier ; plans en pierre posés par un marbrier partenaire.",
    ],
    woods: "Chêne, noyer, frêne, hêtre",
    delay: "4 à 6 semaines d'atelier, 2 à 3 jours de pose",
    image: "/images/projets/cuisine-plan-hetre.jpg",
    alt: "Cuisine aux façades crème avec plans de travail en hêtre massif",
  },
  {
    slug: "rangements",
    title: "Rangements et dressings",
    summary:
      "Placards, dressings, bibliothèques et sous-pentes qui occupent chaque centimètre, même dans une pièce irrégulière.",
    details: [
      "Aménagement intérieur choisi avec vous : penderies, tiroirs, étagères réglables.",
      "Portes battantes, coulissantes ou miroirs, avec fermeture amortie.",
      "Mesures prises au millimètre pour les murs et plafonds qui ne sont pas droits.",
    ],
    woods: "Chêne, contreplaqué de bouleau, laque",
    delay: "3 à 5 semaines d'atelier, 1 à 2 jours de pose",
    image: "/images/projets/bibliotheque-toute-hauteur.jpg",
    alt: "Bibliothèque blanche du sol au plafond sur deux niveaux",
  },
  {
    slug: "escaliers",
    title: "Escaliers",
    summary:
      "Escaliers droits, quart tournants ou balancés, calculés pour que chaque marche ait le même pas.",
    details: [
      "Calcul du giron et de la hauteur de marche d'après la trémie existante.",
      "Rampes à balustres, à barreaux ou en verre.",
      "Fabrication complète à l'atelier, pose en un ou deux jours.",
    ],
    woods: "Chêne, frêne, pin",
    delay: "3 à 4 semaines d'atelier, 1 à 2 jours de pose",
    image: "/images/projets/escalier-pin-balustres.jpg",
    alt: "Escalier balancé en pin à balustres tournés",
  },
  {
    slug: "agencement",
    title: "Commerces et bureaux",
    summary:
      "Comptoirs, présentoirs, tables et habillages muraux, fabriqués pour s'adapter au lieu et au rythme d'ouverture.",
    details: [
      "Plans validés avec vous ou votre architecte avant toute fabrication.",
      "Pose planifiée en dehors des heures d'ouverture si nécessaire.",
      "Matériaux choisis pour un usage intensif : vernis résistant, chants massifs.",
    ],
    woods: "Chêne, noyer, contreplaqué de bouleau",
    delay: "4 à 6 semaines d'atelier, 2 à 4 jours de pose",
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
    duration: "Sous 10 jours ouvrés",
    days: 10,
  },
  {
    title: "Fabrication",
    text: "Tout est débité, assemblé et fini à l'atelier, par l'équipe qui viendra poser.",
    duration: "4 à 6 semaines",
    days: 25,
  },
  {
    title: "Pose",
    text: "La même équipe pose, règle chaque porte et repart en laissant la pièce propre.",
    duration: "1 à 3 jours",
    days: 2,
  },
] as const;
