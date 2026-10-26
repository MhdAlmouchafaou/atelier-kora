<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Atelier Kora : règles du projet

Les règles complètes sont dans CLAUDE.md (même contenu pour Claude Code et
Codex). En résumé :
- Lire BRIEF.md, DESIGN.md et contenu/reponses-client.md avant toute tâche.
- Aucune couleur, police ou ombre hors DESIGN.md.
- Aucun texte, chiffre ou avis inventé : écrire [À COMPLÉTER].
- Coordonnées uniquement dans src/content/site.ts.
- Clés secrètes seulement dans .env.local.
- Lancer npm run build et npm run lint avant chaque commit.
