import { Fragment } from "react";

// Découpe un texte en mots dès le rendu serveur, pour les animer sans toucher
// au texte après coup (React relit exactement ce que le serveur a envoyé).
// Avec `masque`, chaque mot monte derrière un cache (titres) ; sans, les mots
// changent seulement d'opacité (manifeste).
export function Words({ children, masque = true }: { children: string; masque?: boolean }) {
  const words = children.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className={masque ? "mot" : undefined}>
            <span className="mot-in inline-block">{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
