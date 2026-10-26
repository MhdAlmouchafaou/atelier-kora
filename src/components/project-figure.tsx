import Image from "next/image";
import type { Project } from "@/content/projets";

// Photo d'une réalisation avec sa fiche courte : nom, bois et finition, dimensions.
export function ProjectFigure({
  project,
  aspect,
  sizes,
  priority = false,
}: {
  project: Project;
  aspect: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure>
      <div className={`relative overflow-hidden bg-trait ${aspect}`}>
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes={sizes}
          preload={priority}
          className="object-cover"
        />
      </div>
      <figcaption className="mt-3 grid gap-0.5">
        <span className="font-semibold">{project.title}</span>
        <span className="cote-texte">
          {project.wood}. {project.finish}.
        </span>
      </figcaption>
    </figure>
  );
}
