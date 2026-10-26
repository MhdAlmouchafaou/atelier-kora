import Image from "next/image";
import type { Project } from "@/content/projets";

// Photo d'une réalisation avec sa fiche courte : nom, bois, finition et dimensions.
// Avec `stretch`, la photo occupe toute la hauteur disponible (rangée de grille),
// pour que deux photos voisines aient la même hauteur et leurs légendes la même ligne.
export function ProjectFigure({
  project,
  aspect = "aspect-[3/2]",
  sizes,
  stretch = false,
}: {
  project: Project;
  aspect?: string;
  sizes: string;
  stretch?: boolean;
}) {
  return (
    <figure className={stretch ? "flex h-full flex-col" : undefined}>
      <div
        className={`relative overflow-hidden bg-trait ${stretch ? `${aspect} md:aspect-auto md:min-h-0 md:flex-1` : aspect}`}
      >
        <Image src={project.image} alt={project.alt} fill sizes={sizes} className="object-cover" />
      </div>
      <figcaption className="mt-3 grid gap-0.5">
        <span className="font-semibold">{project.title}</span>
        <span className="cote-texte">
          {project.wood}. {project.finish}.
        </span>
        <span className="cote-texte">{project.dimensions}</span>
      </figcaption>
    </figure>
  );
}
