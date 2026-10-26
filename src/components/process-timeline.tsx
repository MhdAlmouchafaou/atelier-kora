import { steps } from "@/content/services";

// Les étapes d'un projet type, cotées en chaîne comme sur un plan :
// un trait continu, coupé par un repère à chaque étape. La longueur de chaque
// segment est proportionnelle à la durée habituelle de l'étape (en jours ouvrés).

function Repere() {
  return (
    <span aria-hidden="true" className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
      <span className="absolute top-1/2 left-1/2 block h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-graphite" />
      <svg viewBox="0 0 10 10" className="relative block h-2.5 w-2.5 text-graphite" focusable="false">
        <line x1="1" y1="9" x2="9" y2="1" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    </span>
  );
}

export function ProcessTimeline() {
  return (
    <div className="mt-12 lg:mt-16">
      {/* Chaîne de cotes, à l'échelle sur toutes les largeurs d'écran. */}
      <div aria-hidden="true" className="relative mx-1.5 flex h-8 items-center">
        {steps.map((step, index) => (
          <div
            key={step.title}
            style={{ flexGrow: step.days, flexBasis: 0 }}
            className="relative flex h-full items-center"
          >
            <span className="h-px w-full bg-graphite" />
            <Repere />
            <span className="cote-texte absolute -top-2 left-1/2 -translate-x-1/2 bg-papier px-1">
              {index + 1}
            </span>
          </div>
        ))}
        <span className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
          <span className="absolute top-1/2 left-1/2 block h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-graphite" />
          <svg viewBox="0 0 10 10" className="relative block h-2.5 w-2.5 text-graphite" focusable="false">
            <line x1="1" y1="9" x2="9" y2="1" stroke="currentColor" strokeWidth="1.25" />
          </svg>
        </span>
      </div>

      <ol className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title}>
            <p className="cote-texte">
              <span className="sr-only">Durée : </span>
              {step.duration}
            </p>
            <h3 className="mt-2 text-[1.375rem] leading-tight">
              <span className="mr-2 text-graphite">{index + 1}.</span>
              {step.title}
            </h3>
            <p className="mt-2 max-w-[34ch] text-graphite">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
