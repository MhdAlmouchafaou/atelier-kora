// Règles du formulaire de contact, partagées par le navigateur et le serveur.

export const projectKinds = [
  "Cuisine",
  "Rangement ou dressing",
  "Escalier",
  "Commerce ou bureau",
  "Autre",
] as const;

export type ContactInput = {
  name: string;
  phone: string;
  email: string;
  kind: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+()\d\s.-]{8,20}$/;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (input.name.trim().length < 2) errors.name = "Indiquez votre nom.";
  if (!PHONE.test(input.phone.trim()))
    errors.phone = "Indiquez un numéro de téléphone, chiffres et espaces seulement.";
  if (input.email.trim() && !EMAIL.test(input.email.trim()))
    errors.email = "Cette adresse email n'est pas valide. Vérifiez-la ou laissez le champ vide.";
  if (!projectKinds.includes(input.kind as (typeof projectKinds)[number]))
    errors.kind = "Choisissez le type de projet.";
  if (input.message.trim().length < 20)
    errors.message = "Décrivez votre projet en une ou deux phrases (20 caractères au moins).";
  if (input.message.length > 3000) errors.message = "Votre message dépasse 3 000 caractères.";
  return errors;
}
