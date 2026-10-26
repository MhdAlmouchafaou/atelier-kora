// Ligne de cote, comme sur un plan de menuisier : deux traits de rappel,
// deux traits obliques aux extrémités et la dimension au milieu.
// La cote est décorative pour les lecteurs d'écran : l'information
// qu'elle porte est toujours répétée dans le texte ou la légende.

type CoteProps = {
  label: string;
  animate?: boolean;
  className?: string;
};

function Oblique({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 10"
      className={`h-2.5 w-2.5 shrink-0 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <line x1="1" y1="9" x2="9" y2="1" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function CoteH({ label, animate = false, className = "" }: CoteProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center gap-2 text-graphite ${className}`}
    >
      <span className="absolute top-1/2 left-0 h-3.5 w-px -translate-y-1/2 bg-current" />
      <span className="absolute top-1/2 right-0 h-3.5 w-px -translate-y-1/2 bg-current" />
      <div className={`flex flex-1 items-center gap-2 ${animate ? "cote-trace-x" : ""}`}>
        <Oblique className="-ml-[4.5px]" />
        <span className="h-px flex-1 bg-current" />
        <span className={`cote-texte whitespace-nowrap px-1 ${animate ? "cote-trace-label" : ""}`}>
          {label}
        </span>
        <span className="h-px flex-1 bg-current" />
        <Oblique className="-mr-[4.5px]" />
      </div>
    </div>
  );
}

export function CoteV({ label, animate = false, className = "" }: CoteProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex flex-col items-center gap-2 text-graphite ${className}`}
    >
      <span className="absolute top-0 left-1/2 h-px w-3.5 -translate-x-1/2 bg-current" />
      <span className="absolute bottom-0 left-1/2 h-px w-3.5 -translate-x-1/2 bg-current" />
      <div className={`flex flex-1 flex-col items-center gap-2 ${animate ? "cote-trace-y" : ""}`}>
        <Oblique className="-mt-[4.5px]" />
        <span className="w-px flex-1 bg-current" />
        <span
          className={`cote-texte whitespace-nowrap py-1 [writing-mode:vertical-rl] rotate-180 ${animate ? "cote-trace-label" : ""}`}
        >
          {label}
        </span>
        <span className="w-px flex-1 bg-current" />
        <Oblique className="-mb-[4.5px]" />
      </div>
    </div>
  );
}
