import Image from "next/image";
import type { ReactNode } from "react";

// En-tête commun des pages intérieures : fond noyer, très grand titre qui
// monte au chargement, puis une photo large qui s'ouvre.
export function PageIntro({
  title,
  children,
  image,
}: {
  title: string;
  children?: ReactNode;
  image?: { src: string; alt: string; position?: string };
}) {
  return (
    <div className="text-sciure">
      <div className="bg-noyer">
        <div className="conteneur pt-36 pb-16 lg:pt-52 lg:pb-24">
          <h1 className="titre-1 max-w-[12ch]">
            <span className="ouverture-ligne">
              <span style={{ ["--delai" as string]: "150ms" }}>{title}</span>
            </span>
          </h1>
          {children && (
            <div
              className="ouverture-fondu chapeau mt-8 max-w-[52ch] space-y-4 text-lin lg:mt-12 lg:ml-[calc(100%/12*5)]"
              style={{ ["--delai" as string]: "600ms" }}
            >
              {children}
            </div>
          )}
        </div>
      </div>
      {image && (
        // La photo est à cheval entre le fond noyer et la page claire.
        <div className="bg-[linear-gradient(var(--color-noyer)_50%,transparent_50%)]">
          <div className="conteneur">
            <div
              className="ouverture-photo relative aspect-[4/3] overflow-hidden rounded-[1.25rem] sm:aspect-[21/9]"
              style={{ animationDuration: "1.5s" }}
            >
              <div data-parallaxe="8" className="absolute inset-x-0 -inset-y-[10%]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  preload
                  sizes="(min-width: 1440px) 1360px, 100vw"
                  className={`object-cover ${image.position ?? ""}`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
