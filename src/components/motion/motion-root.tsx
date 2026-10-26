"use client";

import { useRef } from "react";
import { MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/motion";

// Animations au défilement, déclarées dans les pages par des attributs :
//   data-anim="titre"     les mots montent derrière un cache (texte découpé par <Words>)
//   data-anim="mots"      les mots passent de pâle à plein au fil du défilement
//   data-anim="bloc"      le bloc apparaît en montant légèrement
//   data-anim="image"     la photo s'ouvre par un masque
//   data-anim="largeur"   la largeur de la police suit le défilement
//   data-parallaxe="12"   la photo glisse dans son cadre (en %)
// Les éléments déjà visibles au chargement ne sont pas masqués : la page
// s'affiche entière, même avant le chargement du JavaScript. Aucune animation
// ne modifie le texte : React relit au chargement exactement le HTML du serveur.
// Monté dans app/template.tsx, donc relancé à chaque page.

const visibleAuChargement = (el: Element) =>
  el.getBoundingClientRect().top < window.innerHeight * 0.92;

export function MotionRoot() {
  const marker = useRef<HTMLSpanElement>(null);

  useGSAP((_, contextSafe) => {
    const root = marker.current?.closest("[data-page]") ?? document.body;
    const all = <T extends HTMLElement>(selector: string) =>
      Array.from(root.querySelectorAll<T>(selector));

    // Mise en place après l'évènement load, une fois les photos et la police
    // chargées : les positions mesurées sont alors définitives.
    const mm = gsap.matchMedia();
    const setup = contextSafe!(() =>
      mm.add(MOTION, () => {
        // Titres : chaque mot monte derrière son cache (mots découpés au rendu, voir Words).
        all("[data-anim='titre']").forEach((el) => {
          if (visibleAuChargement(el)) return;
          gsap.from(el.querySelectorAll(".mot-in"), {
            yPercent: 115,
            rotate: 4,
            duration: 1.2,
            stagger: 0.045,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        // Manifeste : les mots passent de pâle à plein au fil du défilement.
        all("[data-anim='mots']").forEach((el) => {
          gsap.fromTo(
            el.querySelectorAll(".mot-in"),
            { opacity: 0.5 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 50%", scrub: true },
            },
          );
        });

        // Blocs
        all("[data-anim='bloc']").forEach((el) => {
          if (visibleAuChargement(el)) return;
          gsap.from(el, {
            y: 48,
            opacity: 0,
            duration: 1.2,
            delay: Number(el.dataset.delai ?? 0),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        // Photos
        all("[data-anim='image']").forEach((el) => {
          if (visibleAuChargement(el)) return;
          const img = el.querySelector("img");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
          tl.fromTo(
            el,
            { clipPath: "inset(18% 8% 18% 8%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.4,
              ease: "expo.inOut",
              clearProps: "clipPath",
            },
          );
          if (img) tl.from(img, { scale: 1.3, duration: 1.8, ease: "expo.out" }, 0);
        });

        // Parallaxe
        all("[data-parallaxe]").forEach((el) => {
          const amount = Number(el.dataset.parallaxe || 10);
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });

        // Largeur de police liée au défilement
        all("[data-anim='largeur']").forEach((el) => {
          const from = Number(el.dataset.de ?? 62);
          const to = Number(el.dataset.a ?? 100);
          gsap.fromTo(
            el,
            { "--wdth": from },
            {
              "--wdth": to,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: el.dataset.debut ?? "top bottom",
                end: el.dataset.fin ?? "bottom 60%",
                scrub: 0.6,
              },
            },
          );
        });
      }),
    );

    let frame = 0;
    const start = () => {
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setup());
      });
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    // Les photos et la police chargées modifient les hauteurs : on recalcule.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    const timer = window.setTimeout(refresh, 600);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", start);
      window.removeEventListener("load", refresh);
      window.clearTimeout(timer);
      mm.revert();
    };
  });

  return <span ref={marker} hidden />;
}
