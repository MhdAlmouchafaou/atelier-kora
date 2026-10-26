"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { type Project, typeLabel } from "@/content/projets";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/motion";
import { Words } from "@/components/motion/words";

// Réalisations de l'accueil. Sur grand écran, la section reste en place et
// les photos défilent à l'horizontale ; une ligne de cote mesure la progression.
// Sur téléphone, ou si les animations sont réduites, on fait glisser du doigt.
export function ProjectsRail({ projects, total }: { projects: Project[]; total: number }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 64rem) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - el.clientWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo(
          progress.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
        // Les photos glissent un peu moins vite que leur cadre.
        el.querySelectorAll<HTMLElement>("[data-rail-img]").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

        // Au clavier, l'élément qui reçoit le focus est amené à l'écran.
        const onFocus = (e: FocusEvent) => {
          const item = (e.target as HTMLElement).closest<HTMLElement>("[data-rail-item]");
          const st = tween.scrollTrigger;
          if (!item || !st) return;
          const ratio = Math.min(1, item.offsetLeft / Math.max(1, distance()));
          window.scrollTo({ top: st.start + ratio * (st.end - st.start), behavior: "instant" });
        };
        el.addEventListener("focusin", onFocus);
        return () => el.removeEventListener("focusin", onFocus);
      });
      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      aria-labelledby="realisations-titre"
      className="overflow-hidden bg-noyer text-sciure"
    >
      <div className="conteneur flex flex-wrap items-end justify-between gap-x-10 gap-y-6 pt-24 lg:pt-28">
        <h2 id="realisations-titre" data-anim="titre" className="titre-2">
          <Words>Réalisations</Words>
        </h2>
        <p data-anim="bloc" className="max-w-[34ch] text-lin">
          {total} projets sortis de l&apos;atelier. Pour chacun : le bois, la finition et les
          dimensions.
        </p>
      </div>

      <div
        ref={track}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] md:px-10 lg:mt-12 lg:snap-none lg:gap-8 lg:overflow-visible lg:pb-0"
      >
        {projects.map((project) => (
          <figure key={project.slug} data-rail-item className="flex shrink-0 snap-start flex-col">
            <Link
              href={`/realisations?type=${project.type}`}
              data-curseur="Voir"
              className="group relative block h-[19rem] overflow-hidden rounded-2xl sm:h-[24rem] lg:h-[max(18rem,calc(100svh-23rem))]"
              style={{ aspectRatio: `${project.width} / ${project.height}` }}
            >
              <span data-rail-img className="absolute -inset-x-[10%] inset-y-0 block">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 80vw"
                  className="object-cover transition-transform duration-[1.2s] ease-(--ease-expo) group-hover:scale-105"
                />
              </span>
              <span className="sr-only">Voir les réalisations : {typeLabel(project.type)}</span>
            </Link>
            <figcaption className="mt-4 grid w-0 min-w-full gap-0.5 pb-1">
              <span className="font-semibold">{project.title}</span>
              <span className="mention text-lin">
                {project.wood}. {project.dimensions}.
              </span>
            </figcaption>
          </figure>
        ))}

        <div data-rail-item className="flex shrink-0 snap-start">
          <Link
            href="/realisations"
            className="sur-chene group flex h-[19rem] w-[17rem] flex-col justify-end rounded-2xl bg-chene p-7 text-noyer sm:h-[24rem] sm:w-[22rem] lg:h-[max(18rem,calc(100svh-23rem))] lg:w-[26rem] lg:p-9"
          >
            <span className="titre-2 transition-[--wdth] duration-700 ease-(--ease-expo) group-hover:[--wdth:100]">
              Voir les {total} réalisations
            </span>
          </Link>
        </div>
      </div>

      {/* Ligne de cote : progression dans la galerie (grand écran) */}
      <div aria-hidden="true" className="conteneur hidden pt-6 pb-8 lg:block">
        <div className="relative flex h-3 items-center text-lin">
          <span className="absolute left-0 h-3 w-px bg-current" />
          <span className="absolute right-0 h-3 w-px bg-current" />
          <span className="h-px w-full bg-filet-sombre" />
          <span ref={progress} className="absolute inset-x-0 h-px origin-left bg-chene" />
        </div>
      </div>
    </section>
  );
}
