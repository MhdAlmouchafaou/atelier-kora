// Coordonnées et réglages communs à tout le site.
// Toutes les informations pratiques se modifient ici, et seulement ici.

export const site = {
  name: "Atelier Kora",
  description:
    "Menuiserie et agencement intérieur : cuisines, rangements, escaliers et commerces sur mesure, dessinés et fabriqués à l'atelier, posés par la même équipe.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://atelier-kora.vercel.app",
  phone: {
    display: "+000 612 34 56 78",
    href: "tel:+000612345678",
  },
  email: "contact@atelier-kora.com",
  address: {
    street: "14 rue des Scieurs",
    area: "Zone artisanale du Moulin",
  },
  hours: [
    { days: "Du lundi au vendredi", time: "8 h à 12 h et 13 h 30 à 17 h 30" },
    { days: "Samedi matin", time: "Sur rendez-vous" },
  ],
  zone: "Dans un rayon de 60 km autour de l'atelier",
  founded: 2009,
} as const;

export const navigation = [
  { href: "/realisations", label: "Réalisations" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "L'atelier" },
  { href: "/contact", label: "Contact" },
] as const;
