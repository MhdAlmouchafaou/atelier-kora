import Image from "next/image";
import Link from "next/link";
import { LiveStatus } from "@/components/live-status";

// Ouverture de l'accueil, animée en CSS (aucune attente du JavaScript) :
// la photo s'ouvre depuis une fente, comme un trait de scie, puis le nom
// de l'atelier se déploie en largeur.
export function Hero() {
  return (
    <section className="relative isolate flex h-svh min-h-[38rem] flex-col overflow-hidden bg-noyer text-sciure">
      <div className="ouverture-photo absolute inset-0 -z-10">
        <div data-parallaxe="6" className="absolute inset-x-0 -inset-y-[8%]">
          <Image
            src="/images/matiere/atelier-sciage.jpg"
            alt="Un menuisier scie une planche à l'établi, la sciure vole dans la lumière de l'atelier"
            fill
            preload
            sizes="100vw"
            className="object-cover object-[38%_50%]"
          />
        </div>
        {/* Voile pour la lisibilité du texte posé sur la photo (DESIGN.md). */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(36_25_19/0.94)_8%,rgb(36_25_19/0.35)_55%,rgb(36_25_19/0.5))]"
        />
      </div>

      <div className="conteneur mt-auto pb-5 lg:pb-8">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7 lg:col-span-6">
            <h1 className="text-[clamp(1.75rem,1.2rem+1.9vw,2.875rem)] leading-[1.05] font-semibold tracking-[-0.02em] [--wdth:90]">
              <span className="ouverture-ligne">
                <span style={{ ["--delai" as string]: "900ms" }}>
                  Cuisines, rangements et escaliers sur mesure. Dessinés et fabriqués à
                  l&apos;atelier, posés par la même équipe.
                </span>
              </span>
            </h1>
            <div
              className="ouverture-fondu mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 lg:hidden"
              style={{ ["--delai" as string]: "1300ms" }}
            >
              <Link href="/contact" className="bouton">
                Demander un devis
              </Link>
              <span className="text-lin">Visite et devis gratuits</span>
            </div>
          </div>
          <div
            className="ouverture-fondu md:col-span-4 md:col-start-9 md:justify-self-end"
            style={{ ["--delai" as string]: "1400ms" }}
          >
            <LiveStatus className="text-[0.9375rem]" />
          </div>
        </div>

        <p
          aria-hidden="true"
          className="nom-geant ouverture-deploie mt-6 -mb-[0.12em] lg:mt-10"
          style={{ ["--delai" as string]: "700ms" }}
        >
          Atelier Kora
        </p>
      </div>
    </section>
  );
}
