"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { type Project, type ProjectType, projectTypes, typeLabel } from "@/content/projets";
import { Flip, gsap, prefersReducedMotion, smoothScroll } from "@/lib/motion";

type Filter = ProjectType | "tout";

const isFilter = (v: string | null): v is Filter =>
  v === "tout" || projectTypes.some((t) => t.value === v);

// Le filtre vit dans l'adresse (/realisations?type=escaliers) : un lien depuis la page
// Services ouvre directement la bonne catégorie, et l'adresse filtrée se partage.
const FILTER_EVENT = "galerie:filtre";

function readFilter(): Filter {
  const type = new URLSearchParams(window.location.search).get("type");
  return isFilter(type) ? type : "tout";
}

function subscribe(callback: () => void) {
  window.addEventListener(FILTER_EVENT, callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener(FILTER_EVENT, callback);
    window.removeEventListener("popstate", callback);
  };
}

export function Gallery({ projects }: { projects: Project[] }) {
  const filter = useSyncExternalStore(subscribe, readFilter, () => "tout" as Filter);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const grid = useRef<HTMLUListElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);

  const choose = (value: Filter) => {
    if (value === filter) return;
    if (grid.current && !prefersReducedMotion()) {
      flipState.current = Flip.getState(grid.current.querySelectorAll("[data-flip-id]"));
    }
    const url = new URL(window.location.href);
    if (value === "tout") url.searchParams.delete("type");
    else url.searchParams.set("type", value);
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(FILTER_EVENT));
  };

  const visible = filter === "tout" ? projects : projects.filter((p) => p.type === filter);
  const current = openIndex === null ? null : visible[openIndex];
  const isOpen = openIndex !== null;

  const open = (index: number) => {
    setOpenIndex(index);
    dialogRef.current?.showModal();
  };

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length)),
    [visible.length],
  );

  // Changement de filtre : les photos restantes glissent à leur nouvelle place,
  // les nouvelles apparaissent, celles qui partent s'effacent.
  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !grid.current) return;
    flipState.current = null;
    Flip.from(state, {
      targets: grid.current.querySelectorAll("[data-flip-id]"),
      duration: 0.9,
      ease: "expo.inOut",
      absolute: true,
      stagger: 0.02,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8, delay: 0.25 },
        ),
    });
  }, [filter]);

  // À l'ouverture : focus sur « Fermer » et la page derrière ne défile plus.
  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    smoothScroll.stop();
    return () => {
      root.style.overflow = previous;
      smoothScroll.start();
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
  }, [step]);

  const counts = Object.fromEntries(
    projectTypes.map((t) => [t.value, projects.filter((p) => p.type === t.value).length]),
  );
  const options = [
    { value: "tout" as Filter, label: "Tout", count: projects.length },
    ...projectTypes.map((t) => ({ ...t, count: counts[t.value] })),
  ];

  return (
    <section aria-label="Galerie des réalisations">
      <div className="conteneur pt-14 pb-24 lg:pt-20 lg:pb-40">
        <div role="group" aria-label="Filtrer par type de projet" className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={filter === option.value}
              onClick={() => choose(option.value)}
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-filet px-5 font-medium transition-colors duration-300 hover:border-noyer aria-pressed:border-noyer aria-pressed:bg-noyer aria-pressed:text-sciure"
            >
              {option.label}
              <span className="mention text-brou group-aria-pressed:text-chene">
                {option.count}
              </span>
            </button>
          ))}
        </div>

        <p aria-live="polite" className="sr-only">
          {visible.length} réalisations affichées
        </p>

        <ul
          ref={grid}
          className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20"
        >
          {visible.map((project, index) => {
            // Rythme de la grille : une grande photo, une plus étroite, puis l'inverse.
            const wide = index % 4 === 0 || index % 4 === 3;
            return (
              <li
                key={project.slug}
                data-flip-id={project.slug}
                className={wide ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <button
                  type="button"
                  onClick={() => open(index)}
                  data-curseur="Agrandir"
                  className="group block w-full text-left"
                  aria-haspopup="dialog"
                >
                  <span
                    className={`relative block overflow-hidden rounded-[1.25rem] bg-filet ${
                      wide ? "aspect-[3/2]" : "aspect-[3/2] lg:aspect-[16/15]"
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes={
                        wide
                          ? "(min-width: 1440px) 780px, (min-width: 1024px) 56vw, (min-width: 640px) 48vw, 100vw"
                          : "(min-width: 1440px) 560px, (min-width: 1024px) 40vw, (min-width: 640px) 48vw, 100vw"
                      }
                      preload={index === 0}
                      className="object-cover transition-transform duration-[1.2s] ease-(--ease-expo) group-hover:scale-105"
                    />
                  </span>
                  <span className="mt-4 grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-x-6">
                    <span className="text-[1.25rem] leading-tight font-bold [font-variation-settings:'wdth'_80]">
                      {project.title}
                    </span>
                    <span className="mention text-brou sm:text-right">
                      {typeLabel(project.type)}
                    </span>
                    <span className="mention text-brou sm:col-span-2">
                      {project.wood}. {project.finish}. {project.dimensions}.
                    </span>
                    <span className="sr-only">, agrandir la photo</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="visionneuse-titre"
        data-lenis-prevent
        onClose={() => setOpenIndex(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto h-dvh max-h-none w-full max-w-none bg-noyer p-0 text-sciure outline-none backdrop:bg-noyer/90 open:animate-[apparaitre_300ms_ease-out] md:h-[min(90dvh,58rem)] md:w-[min(94vw,84rem)] md:rounded-[1.5rem]"
      >
        {current && (
          <div className="flex h-full flex-col overflow-y-auto md:grid md:grid-cols-[1fr_22rem] md:overflow-hidden">
            <div className="relative min-h-[55dvh] flex-1 bg-noyer-clair md:min-h-0">
              <Image
                key={current.slug}
                src={current.image}
                alt={current.alt}
                fill
                loading="eager"
                sizes="(min-width: 768px) 70vw, 100vw"
                className="animate-[apparaitre_500ms_ease-out] object-contain"
              />
            </div>
            <div className="flex flex-col gap-6 p-6 md:overflow-y-auto md:p-8">
              <div className="flex items-start justify-between gap-4">
                <p className="mention text-lin" aria-live="polite">
                  {openIndex! + 1} sur {visible.length}
                  <span className="sr-only"> : {current.title}</span>
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => dialogRef.current?.close()}
                  className="-mt-2 -mr-2 inline-flex min-h-11 items-center rounded-full px-3 font-medium underline underline-offset-4"
                >
                  Fermer
                </button>
              </div>
              <h2 id="visionneuse-titre" className="titre-3">
                {current.title}
              </h2>
              <dl className="grid gap-4">
                {[
                  ["Type", typeLabel(current.type)],
                  ["Bois", current.wood],
                  ["Finition", current.finish],
                  ["Dimensions", current.dimensions],
                  ["Durée", current.duration],
                ].map(([term, value]) => (
                  <div key={term} className="border-t border-filet-sombre pt-3">
                    <dt className="mention text-lin">{term}</dt>
                    <dd className="mt-0.5">{value}</dd>
                  </div>
                ))}
              </dl>
              {visible.length > 1 && (
                <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="min-h-12 rounded-full border border-sciure px-3 font-medium transition-colors hover:bg-sciure hover:text-noyer"
                  >
                    Précédente
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="min-h-12 rounded-full border border-sciure px-3 font-medium transition-colors hover:bg-sciure hover:text-noyer"
                  >
                    Suivante
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
