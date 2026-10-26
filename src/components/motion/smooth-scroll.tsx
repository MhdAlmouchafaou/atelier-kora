"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { DESKTOP, ScrollTrigger, gsap, smoothScroll } from "@/lib/motion";

// Défilement doux à la souris, synchronisé avec les animations au défilement.
// Rien sur écran tactile ni quand l'utilisateur a demandé moins d'animations.
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const query = window.matchMedia(DESKTOP);
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    const start = () => {
      if (lenis || !query.matches) return;
      lenis = new Lenis({ autoRaf: false, anchors: { offset: -96 }, lerp: 0.11 });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      smoothScroll.set(lenis);
    };
    const stop = () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
      smoothScroll.set(null);
    };
    const onChange = () => (query.matches ? start() : stop());

    start();
    query.addEventListener("change", onChange);
    return () => {
      query.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  // Une nouvelle page s'ouvre en haut, sans glissement.
  useEffect(() => {
    if (window.location.hash) return;
    smoothScroll.get()?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
