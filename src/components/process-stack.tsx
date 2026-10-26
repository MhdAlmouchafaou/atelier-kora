"use client";

import { useRef } from "react";
import { steps } from "@/content/services";
import { MOTION, gsap, useGSAP } from "@/lib/motion";

// Les quatre étapes d'un projet. En haut, une chaîne de cotes comme sur un
// plan : chaque segment est proportionnel à la durée habituelle de l'étape
// et se remplit au défilement. Dessous, les étapes s'empilent comme des
// planches posées les unes sur les autres.
export function ProcessStack() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.fromTo(
          "[data-chaine-remplissage]",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-etapes]",
              start: "top 70%",
              end: "bottom 80%",
              scrub: true,
            },
          },
        );
      });
      mm.add("(min-width: 64rem) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-etape]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.94,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top 70%", end: "top 20%", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="mt-14 lg:mt-20">
      {/* Chaîne de cotes, à l'échelle des durées. Décorative : tout est répété dessous. */}
      <div aria-hidden="true" className="relative">
        <div className="relative flex h-10 items-center">
          {steps.map((step, i) => (
            <div
              key={step.title}
              style={{ flexGrow: step.days, flexBasis: 0 }}
              className="relative flex h-full items-center border-l border-brou"
            >
              <span className="mention absolute top-0 left-2 text-brou">{i + 1}</span>
            </div>
          ))}
          <span className="absolute top-0 right-0 h-full w-px bg-brou" />
          <span className="absolute inset-x-0 top-1/2 h-px bg-filet" />
          <span
            data-chaine-remplissage
            className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-px origin-left bg-chene"
          />
        </div>
        <p className="mention mt-3 text-brou">
          Chaque segment est à l&apos;échelle de la durée habituelle de l&apos;étape.
        </p>
      </div>

      <ol data-etapes className="mt-12 grid gap-5 lg:mt-16 lg:gap-0">
        {steps.map((step, i) => (
          <li
            key={step.title}
            data-etape
            style={{ top: `calc(6.5rem + ${i * 1.75}rem)` }}
            className="origin-top rounded-[1.5rem] border border-filet bg-copeau p-7 sm:p-10 lg:sticky lg:mb-[18vh] lg:grid lg:min-h-[24rem] lg:grid-cols-12 lg:gap-8 lg:p-14 lg:last:mb-0"
          >
            <p
              aria-hidden="true"
              className="text-[5rem] leading-[0.8] font-extrabold tracking-[-0.04em] text-chene [font-variation-settings:'wdth'_75] lg:col-span-3 lg:text-[10rem]"
            >
              {i + 1}
            </p>
            <div className="mt-6 lg:col-span-6 lg:mt-0">
              <h3 className="titre-2">
                <span className="sr-only">Étape {i + 1} : </span>
                {step.title}
              </h3>
              <p className="chapeau mt-5 max-w-[40ch] text-brou">{step.text}</p>
            </div>
            <p className="mt-8 border-t border-filet pt-4 lg:col-span-3 lg:mt-0 lg:self-end lg:border-t-0 lg:pt-0 lg:text-right">
              <span className="mention block text-brou">Durée</span>
              <span className="titre-3 mt-1 block">{step.duration}</span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
