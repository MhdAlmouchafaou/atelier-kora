"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Service } from "@/content/services";
import { DESKTOP, gsap, useGSAP } from "@/lib/motion";

// Liste des services. À la souris, le titre survolé s'élargit et la photo
// du service suit le pointeur. Au doigt, chaque service montre sa photo.
export function ServicesList({
  services,
  counts,
}: {
  services: Service[];
  counts: Record<string, number>;
}) {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const list = root.current;
      const box = preview.current;
      if (!list || !box) return;
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        gsap.set(box, { xPercent: -50, yPercent: -50, scale: 0, rotate: -6 });
        const x = gsap.quickTo(box, "x", { duration: 0.7, ease: "power3.out" });
        const y = gsap.quickTo(box, "y", { duration: 0.7, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = list.getBoundingClientRect();
          x(e.clientX - r.left);
          y(e.clientY - r.top);
        };
        const enter = () => gsap.to(box, { scale: 1, rotate: 0, duration: 0.8, ease: "expo.out" });
        const leave = () => {
          gsap.to(box, { scale: 0, rotate: -6, duration: 0.6, ease: "expo.out" });
          setActive(null);
        };
        list.addEventListener("pointermove", move);
        list.addEventListener("pointerenter", enter);
        list.addEventListener("pointerleave", leave);
        return () => {
          list.removeEventListener("pointermove", move);
          list.removeEventListener("pointerenter", enter);
          list.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative mt-14 lg:mt-20">
      <ul className="border-b border-filet">
        {services.map((service, i) => (
          <li key={service.slug} className="border-t border-filet">
            <Link
              href={`/services#${service.slug}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group relative isolate grid gap-x-8 gap-y-4 py-8 md:grid-cols-12 md:items-center lg:py-11"
            >
              {/* Fond noyer qui monte au survol */}
              <span
                aria-hidden="true"
                className="absolute inset-x-[-1.25rem] inset-y-0 -z-10 origin-bottom scale-y-0 bg-noyer transition-transform duration-700 ease-(--ease-expo) group-hover:scale-y-100 md:inset-x-[-2.5rem]"
              />
              <span className="relative block aspect-[16/10] overflow-hidden rounded-xl md:hidden">
                <Image src={service.image} alt="" fill sizes="100vw" className="object-cover" />
              </span>
              <h3 className="titre-2 transition-[--wdth,color,translate] duration-700 ease-(--ease-expo) group-hover:translate-x-4 group-hover:text-sciure md:col-span-7 lg:group-hover:[--wdth:100]">
                {service.title}
              </h3>
              <span className="grid gap-3 md:col-span-5 lg:col-span-4 lg:col-start-9">
                <span className="max-w-[44ch] text-brou transition-colors duration-500 group-hover:text-lin">
                  {service.summary}
                </span>
                <span className="mention transition-colors duration-500 group-hover:text-chene">
                  {counts[service.slug]} réalisations dans la galerie
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Photo qui suit le pointeur (souris seulement) */}
      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10 hidden aspect-[4/3] w-[22rem] overflow-hidden rounded-2xl [@media(hover:hover)_and_(pointer:fine)]:block"
        style={{ transform: "scale(0)" }}
      >
        {services.map((service, i) => (
          <Image
            key={service.slug}
            src={service.image}
            alt=""
            fill
            sizes="352px"
            className={`object-cover transition-[opacity,scale] duration-700 ease-(--ease-expo) ${
              active === i ? "scale-100 opacity-100" : "scale-125 opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
