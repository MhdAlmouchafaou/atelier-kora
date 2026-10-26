# Atelier Kora

Site vitrine d'une menuiserie et agencement intérieur (entreprise fictive),
construit avec Next.js, Tailwind CSS et Claude Code.

Cinq pages : accueil, services, réalisations (galerie filtrable avec
visionneuse), l'atelier, demande de devis (formulaire envoyé par email).
Plus les mentions légales, une page 404, le sitemap, le robots.txt, les
données structurées et l'image de partage.

## Lancer le projet

Il faut Node.js 20.9 ou plus récent.

```
npm install
cp .env.example .env.local
npm run dev
```

Le site s'ouvre sur http://localhost:3000.

## Fichiers à connaître

| Fichier | Rôle |
| --- | --- |
| BRIEF.md | Cahier des charges |
| DESIGN.md | Direction artistique : couleurs, police, règles |
| CLAUDE.md, AGENTS.md | Règles lues par Claude Code et Codex |
| contenu/reponses-client.md | Réponses du client, source de tous les textes |
| contenu/textes.md | Textes des pages, rédigés à partir des réponses |
| src/content/site.ts | Téléphone, email, adresse, horaires |
| src/content/projets.ts | Les réalisations de la galerie |
| src/content/services.ts | Les services et les étapes d'un projet |
| CREDITS.md | Origine des photos et de la police |

Pour changer une coordonnée, une réalisation ou un service, modifiez
seulement le fichier de `src/content` concerné : toutes les pages suivent.

## Formulaire de contact

Le formulaire passe par la route `src/app/api/contact/route.ts`, qui envoie
un email avec Resend. Sans clé, le formulaire affiche un message clair et
propose d'appeler l'atelier.

1. Créez un compte sur resend.com et une clé API.
2. Dans `.env.local` (et dans Vercel, Settings, Environment Variables) :
   `RESEND_API_KEY`, `CONTACT_TO` (adresse qui reçoit les demandes) et
   `CONTACT_FROM`.
3. Pour les tests, `CONTACT_FROM=Atelier Kora <onboarding@resend.dev>`
   n'envoie qu'à l'adresse de votre compte Resend. Pour un vrai client,
   vérifiez son nom de domaine dans Resend.

## Mise en ligne sur Vercel

1. Importez ce dépôt GitHub dans Vercel.
2. Ajoutez les variables de `.env.example`, dont `NEXT_PUBLIC_SITE_URL`
   (adresse finale du site, sans barre à la fin).
3. Déployez. Pour un nom de domaine acheté chez LWS : chapitre 17 du livre.

## Skills utilisés pour l'interface

```
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add vercel-labs/agent-skills --skill web-design-guidelines
npx skills add https://github.com/pbakaus/impeccable --skill impeccable
npx skills add https://github.com/hardikpandya/stop-slop --skill stop-slop
```

## Vérifications faites

- `npm run build` et `npm run lint` sans erreur.
- Rendu contrôlé à 375, 768 et 1280 px.
- Lighthouse (mobile) : performance de 93 à 99, accessibilité, bonnes
  pratiques et SEO à 100 sur l'accueil, les services et les réalisations.
- Tests automatiques (Playwright) : filtres de la galerie, visionneuse au
  clavier, menu mobile, formulaire (erreurs, focus, envoi), route API.
- Contrastes de couleurs mesurés (voir DESIGN.md).
