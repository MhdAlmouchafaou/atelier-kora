"use client";

import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
}

export { gsap, Flip, ScrollTrigger, useGSAP };

export const REDUCED = "(prefers-reduced-motion: reduce)";
export const MOTION = "(prefers-reduced-motion: no-preference)";
/** Ordinateur avec souris : effets de survol, curseur, défilement doux. */
export const DESKTOP =
  "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(REDUCED).matches;
}

// Instance unique du défilement doux, partagée par le menu et la visionneuse
// (qui l'arrêtent pendant qu'ils sont ouverts).
let lenis: Lenis | null = null;
export const smoothScroll = {
  get: () => lenis,
  set: (instance: Lenis | null) => {
    lenis = instance;
  },
  stop: () => lenis?.stop(),
  start: () => lenis?.start(),
};
