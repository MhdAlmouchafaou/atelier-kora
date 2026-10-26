"use client";

import { useRef } from "react";
import { DESKTOP, gsap, useGSAP } from "@/lib/motion";

// Pastille qui suit la souris. Au-dessus d'un élément marqué data-curseur,
// elle grossit et affiche le texte de l'attribut (par exemple « Voir »).
// Décorative : le texte réel reste dans les liens et boutons.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = dot.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(DESKTOP, () => {
      gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0 });
      const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
      let label = "";
      let shown = false;

      const move = (e: PointerEvent) => {
        x(e.clientX);
        y(e.clientY);
        const target = (e.target as Element | null)?.closest<HTMLElement>("[data-curseur]");
        const next = target?.dataset.curseur ?? "";
        if (next !== label || !shown) {
          label = next;
          shown = true;
          if (text.current) text.current.textContent = next;
          gsap.to(el, { scale: next ? 1 : 0.14, duration: 0.6, ease: "expo.out" });
        }
      };
      const hide = () => {
        shown = false;
        gsap.to(el, { scale: 0, duration: 0.4 });
      };
      window.addEventListener("pointermove", move);
      document.documentElement.addEventListener("pointerleave", hide);
      return () => {
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", hide);
      };
    });
    return () => mm.revert();
  });

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[60] hidden size-24 items-center justify-center rounded-full bg-chene text-[0.9375rem] font-semibold text-noyer [@media(hover:hover)_and_(pointer:fine)]:flex"
      style={{ transform: "scale(0)" }}
    >
      <span ref={text} />
    </div>
  );
}
