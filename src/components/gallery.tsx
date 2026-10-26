"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { type Project, type ProjectType, projectTypes, typeLabel } from "@/content/projets";

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

  const choose = (value: Filter) => {
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

  // À l'ouverture : focus sur « Fermer » et la page derrière ne défile plus.
  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
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
    <section aria-label="Galerie des réalisations" className="border-t border-trait">
      <div className="conteneur pt-8 pb-20 lg:pb-28">
        <div role="group" aria-label="Filtrer par type de projet" className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={filter === option.value}
              onClick={() => choose(option.value)}
              className="group inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-trait px-4 text-[0.9375rem] font-medium transition-colors hover:border-encre aria-pressed:border-encre aria-pressed:bg-encre aria-pressed:text-papier"
            >
              {option.label}
              <span className="font-normal text-graphite [font-variant-numeric:tabular-nums] group-aria-pressed:text-sauge">
                {option.count}
              </span>
            </button>
          ))}
        </div>

        <p aria-live="polite" className="sr-only">
          {visible.length} réalisations affichées
        </p>

        <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {visible.map((project, index) => (
            <li key={project.slug}>
              <button
                type="button"
                onClick={() => open(index)}
                className="group block w-full text-left"
                aria-haspopup="dialog"
              >
                <span className="relative block aspect-[3/2] overflow-hidden bg-trait">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 380px, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                    className="object-cover transition-opacity group-hover:opacity-90"
                  />
                </span>
                <span className="mt-3 grid gap-0.5">
                  <span className="font-semibold underline-offset-4 group-hover:underline">
                    {project.title}
                  </span>
                  <span className="cote-texte">
                    {project.wood}. {project.finish}.
                  </span>
                  <span className="cote-texte">{project.dimensions}</span>
                  <span className="sr-only">, agrandir la photo</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="visionneuse-titre"
        onClose={() => setOpenIndex(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto h-dvh max-h-none w-full max-w-none bg-papier p-0 text-encre outline-none backdrop:bg-encre/80 open:animate-[apparaitre_200ms_ease-out] md:h-[min(90dvh,56rem)] md:w-[min(92vw,80rem)]"
      >
        {current && (
          <div className="flex h-full flex-col overflow-y-auto md:grid md:grid-cols-[1fr_20rem] md:overflow-hidden">
            <div className="relative min-h-[55dvh] flex-1 bg-encre md:min-h-0">
              <Image
                key={current.slug}
                src={current.image}
                alt={current.alt}
                fill
                loading="eager"
                sizes="(min-width: 768px) 70vw, 100vw"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-6 p-6 md:overflow-y-auto md:p-8">
              <div className="flex items-start justify-between gap-4">
                <p className="cote-texte" aria-live="polite">
                  {openIndex! + 1} sur {visible.length}
                  <span className="sr-only"> : {current.title}</span>
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => dialogRef.current?.close()}
                  className="-mt-2 -mr-2 inline-flex min-h-11 items-center px-2 font-medium underline underline-offset-4"
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
                  <div key={term} className="border-t border-trait pt-3">
                    <dt className="cote-texte">{term}</dt>
                    <dd className="mt-0.5">{value}</dd>
                  </div>
                ))}
              </dl>
              {visible.length > 1 && (
                <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="min-h-11 rounded-[3px] border border-encre px-3 font-medium"
                  >
                    Précédente
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="min-h-11 rounded-[3px] border border-encre px-3 font-medium"
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
