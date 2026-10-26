"use client";

import Link from "next/link";
import { Fragment, useRef } from "react";
import { MOTION, gsap, useGSAP } from "@/lib/motion";
import { Words } from "@/components/motion/words";

const rows = [
  ["Chêne", "Noyer", "Frêne", "Chêne", "Noyer", "Frêne"],
  ["Hêtre", "Pin", "Bouleau", "Hêtre", "Pin", "Bouleau"],
];

// Repère oblique des lignes de cote, utilisé comme séparateur.
function Oblique() {
  return (
    <svg
      viewBox="0 0 10 10"
      className="mx-[0.2em] inline-block h-[0.32em] w-[0.32em] text-chene"
      focusable="false"
    >
      <line x1="1" y1="9" x2="9" y2="1" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

// Les essences travaillées à l'atelier, en très grand, qui avancent avec le
// défilement. La première ligne est remplie du fil du bois.
export function WoodsBand() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.utils.toArray<HTMLElement>("[data-defile]").forEach((row, i) => {
          gsap.fromTo(
            row,
            { xPercent: i % 2 ? -32 : 0 },
            {
              xPercent: i % 2 ? 0 : -32,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="bois-titre"
      className="overflow-hidden bg-noyer py-24 text-sciure lg:py-40"
    >
      <div aria-hidden="true" className="select-none">
        {rows.map((row, i) => (
          <p
            key={i}
            data-defile
            className={`text-[clamp(4.5rem,2rem+12vw,13.5rem)] leading-[0.92] font-extrabold tracking-[-0.04em] whitespace-nowrap [font-variation-settings:'wdth'_82] ${
              i === 1 ? "text-sciure" : ""
            }`}
          >
            {row.map((name, j) => (
              <Fragment key={j}>
                <span className={i === 0 ? "fil-du-bois" : ""}>{name}</span>
                <Oblique />
              </Fragment>
            ))}
          </p>
        ))}
      </div>

      <div className="conteneur mt-16 grid gap-8 md:grid-cols-12 lg:mt-24">
        <h2 id="bois-titre" data-anim="titre" className="titre-2 md:col-span-6">
          <Words>Les bois que nous travaillons</Words>
        </h2>
        <div data-anim="bloc" className="md:col-span-5 md:col-start-8">
          <p className="chapeau text-lin">
            Chêne, noyer, frêne, hêtre et pin en bois massif. Contreplaqué de bouleau pour les
            caissons. Finitions à l&apos;huile ou au vernis à l&apos;eau, laque mate pour les
            meubles peints.
          </p>
          <Link
            href="/a-propos#bois"
            className="lien mt-6 inline-flex min-h-11 items-center font-semibold"
          >
            L&apos;usage de chaque essence
          </Link>
        </div>
      </div>
    </section>
  );
}
