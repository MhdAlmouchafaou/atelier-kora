@AGENTS.md

# Atelier Kora : règles du projet

Site vitrine d'une menuiserie (entreprise fictive). Next.js 16 (App Router),
React 19, Tailwind CSS 4, TypeScript. Hébergement prévu : Vercel.

## À lire avant toute tâche
- BRIEF.md : objectif, cibles, pages, appels à l'action.
- DESIGN.md : couleurs, police, échelle, composants, interdits.
  Lire DESIGN.md avant toute modification d'interface.
- contenu/reponses-client.md : seule source des faits sur l'entreprise.

## Commandes
- npm run dev : serveur de développement (http://localhost:3000)
- npm run build : construction de production, à lancer avant chaque commit
- npm run lint : vérification du code

## Organisation
- src/app : pages (accueil, services, realisations, a-propos, contact,
  mentions-legales), route API du formulaire (api/contact), sitemap, robots.
- src/components : composants réutilisables (en-tête, pied de page, cotes,
  galerie, formulaire, bandeau d'appel).
- src/content : coordonnées (site.ts), services et étapes (services.ts),
  réalisations (projets.ts). Tout texte factuel vient de là.
- public/images : photos (projets, atelier). Crédits dans CREDITS.md.

## Règles
- Aucune couleur, police ou ombre hors DESIGN.md.
- Aucun texte, chiffre, avis ou nom inventé : si une information manque,
  écrire [À COMPLÉTER] et le signaler.
- Coordonnées modifiées uniquement dans src/content/site.ts.
- Clés secrètes seulement dans .env.local (jamais dans le code ni sur GitHub).
- Accessibilité : un seul h1 par page, texte alternatif sur chaque photo,
  focus clavier visible, cibles tactiles de 44 px au moins.

## Règles d'écriture (textes du site)
1. Aucun tiret cadratin ni demi-cadratin.
2. Pas de listes à intitulés en gras suivis de deux-points.
3. Pas de mots gonflés : crucial, incontournable, véritable, passion,
   révolutionnaire, sublimer.
4. Pas de tournure « ce n'est pas seulement X, c'est Y ».
5. Pas de participe présent qui commente en fin de phrase.
6. Pas d'émojis, pas de point d'exclamation.
7. Phrases courtes, vouvoiement, faits précis.
8. Pas d'étiquettes en capitales au-dessus des titres.
