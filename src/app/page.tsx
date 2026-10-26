import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { Hero } from "@/components/home/hero";
import { ProjectsRail } from "@/components/home/projects-rail";
import { ServicesList } from "@/components/home/services-list";
import { WoodsBand } from "@/components/home/woods-band";
import { ProcessStack } from "@/components/process-stack";
import { featuredProjects, projects } from "@/content/projets";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Words } from "@/components/motion/words";

export const metadata: Metadata = pageMetadata({
  path: "/",
  description: site.description,
});

const facts = [
  { term: "Depuis", value: String(site.founded) },
  { term: "À l'atelier", value: "6 personnes" },
  { term: "Zone d'intervention", value: "60 km autour de l'atelier" },
  { term: "Visite et devis", value: "Gratuits" },
];

export default function HomePage() {
  const counts = Object.fromEntries(
    services.map((s) => [s.slug, projects.filter((p) => p.type === s.slug).length]),
  );

  return (
    <>
      <Hero />

      {/* Manifeste */}
      <section aria-labelledby="manifeste-titre" className="conteneur section">
        <h2 id="manifeste-titre" className="sr-only">
          Notre façon de travailler
        </h2>
        <p
          data-anim="mots"
          className="max-w-[26ch] text-[clamp(2rem,1rem+3.6vw,4.25rem)] leading-[1.04] font-semibold tracking-[-0.025em] [font-variation-settings:'wdth'_88]"
        >
          <Words masque={false}>
            {
              "Tout est dessiné, débité et assemblé dans notre atelier. Nous n'achetons pas de meubles en kit. La même équipe fabrique et pose\u00a0: vous avez un seul interlocuteur du premier rendez-vous à la pose."
            }
          </Words>
        </p>
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-filet pt-8 lg:mt-24 lg:grid-cols-4">
          {facts.map((fact, i) => (
            <div key={fact.term} data-anim="bloc" data-delai={i * 0.08}>
              <dt className="mention text-brou">{fact.term}</dt>
              <dd className="titre-3 mt-2">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Services */}
      <section aria-labelledby="services-titre" className="conteneur pb-24 lg:pb-44">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="services-titre" data-anim="titre" className="titre-2 max-w-[12ch]">
            <Words>Ce que nous fabriquons</Words>
          </h2>
          <Link href="/services" className="lien inline-flex min-h-11 items-center font-semibold">
            Détail des services
          </Link>
        </div>
        <ServicesList services={services} counts={counts} />
      </section>

      <ProjectsRail projects={featuredProjects} total={projects.length} />

      {/* Déroulement */}
      <section aria-labelledby="etapes-titre" className="conteneur section">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="etapes-titre" data-anim="titre" className="titre-2 md:col-span-7">
            <Words>De la prise de mesures à la pose</Words>
          </h2>
          <p data-anim="bloc" className="max-w-[40ch] text-brou md:col-span-4 md:col-start-9">
            Quatre étapes, avec la même équipe du début à la fin. La visite et le devis sont
            gratuits.
          </p>
        </div>
        <ProcessStack />
      </section>

      <WoodsBand />

      {/* L'atelier */}
      <section aria-labelledby="atelier-titre" className="conteneur section">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6 lg:col-span-5">
            <div
              data-anim="image"
              className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]"
            >
              <div data-parallaxe="8" className="absolute inset-x-0 -inset-y-[10%]">
                <Image
                  src="/images/matiere/chaise-atelier.jpg"
                  alt="Dans l'atelier, un menuisier assemble un banc en bois sous les étagères d'outils"
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:col-span-6 lg:col-span-6 lg:col-start-7">
            <h2 id="atelier-titre" data-anim="titre" className="titre-2 max-w-[10ch]">
              <Words>Un atelier, six personnes</Words>
            </h2>
            <div data-anim="bloc" className="chapeau mt-8 max-w-[40ch] space-y-5 text-brou">
              <p>
                Daniel Kora a ouvert l&apos;atelier en {site.founded}, après douze ans chez un
                fabricant d&apos;escaliers. Il a travaillé seul les deux premières années.
              </p>
              <p>
                Aujourd&apos;hui, Sarah dessine les plans, Thomas et Inès fabriquent, Marc dirige la
                pose et Léa suit les chantiers.
              </p>
            </div>
            <Link
              href="/a-propos"
              data-anim="bloc"
              className="lien mt-8 inline-flex min-h-11 items-center self-start font-semibold"
            >
              L&apos;équipe et l&apos;atelier
            </Link>
            <div
              data-anim="image"
              className="relative mt-12 hidden aspect-[3/2] w-2/3 self-end overflow-hidden rounded-[1.25rem] lg:mt-auto lg:block"
            >
              <Image
                src="/images/atelier/tracage-crayon.jpg"
                alt="Un menuisier trace au crayon une ligne de coupe sur une planche, entouré de copeaux"
                fill
                sizes="(min-width: 1024px) 30vw, 34vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
