import type { ReactNode } from "react";

// En-tête commun des pages intérieures.
export function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="conteneur pt-12 pb-14 lg:pt-20 lg:pb-20">
      <h1 className="titre-1 max-w-[16ch]">{title}</h1>
      {children && (
        <div className="chapeau mt-6 max-w-[58ch] space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}
