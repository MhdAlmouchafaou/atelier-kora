import { steps } from "@/content/services";

// Les étapes d'un projet, sous forme de cotation en chaîne (comme sur un plan) :
// un seul trait continu, coupé par un repère à chaque changement d'étape.
// Sur grand écran, chaque segment est proportionnel à la durée de l'étape.

function Repere({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`absolute text-graphite ${className}`}>
      <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" focusable="false">
        <line x1="1" y1="9" x2="9" y2="1" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    </span>
  );
}

export function ProcessTimeline() {
  return (
    <ol className="mt-12 lg:mt-16 lg:flex">
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <li
            key={step.title}
            style={{ flexGrow: step.days, flexBasis: 0 }}
            className="relative pb-10 pl-10 last:pb-0 lg:min-w-[13rem] lg:pb-0 lg:pl-0"
          >
            {/* Trait de cote : vertical sur téléphone, horizontal sur grand écran. */}
            <span
              aria-hidden="true"
              className={`absolute top-1 left-3 w-px bg-graphite lg:top-3 lg:right-0 lg:left-0 lg:h-px lg:w-auto ${last ? "bottom-1 lg:bottom-auto" : "bottom-0 lg:bottom-auto"}`}
            />
            {/* Rappel et repère au début de l'étape. */}
            <span
              aria-hidden="true"
              className="absolute top-1 left-1.5 h-px w-3.5 bg-graphite lg:top-0.5 lg:left-0 lg:h-5 lg:w-px"
            />
            <Repere className="top-[-0.05rem] left-[0.5rem] lg:top-2 lg:left-[-0.3rem]" />
            {last && (
              <>
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-1.5 h-px w-3.5 bg-graphite lg:top-0.5 lg:right-0 lg:bottom-auto lg:left-auto lg:h-5 lg:w-px"
                />
                <Repere className="bottom-[-0.05rem] left-[0.5rem] lg:top-2 lg:right-[-0.3rem] lg:bottom-auto lg:left-auto" />
              </>
            )}

            <div className="lg:pt-10 lg:pr-8">
              <p className="cote-texte">
                <span className="sr-only">Durée : </span>
                {step.duration}
              </p>
              <h3 className="mt-2 text-[1.375rem] leading-tight">
                <span className="mr-2 text-graphite">{index + 1}.</span>
                {step.title}
              </h3>
              <p className="mt-2 max-w-[34ch] text-graphite">{step.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
