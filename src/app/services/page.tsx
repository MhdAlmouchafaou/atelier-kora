import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PageIntro } from "@/components/page-intro";
import { ProcessStack } from "@/components/process-stack";
import { projects } from "@/content/projets";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { Words } from "@/components/motion/words";

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Services : cuisines, rangements, escaliers, agencement",
  description:
    "Cuisines, dressings, bibliothèques, escaliers, agencements et habillages sur mesure, en chêne, noyer, frêne, hêtre ou pin. Visite et devis gratuits.",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        title="Ce que nous fabriquons"
        image={{
          src: "/images/matiere/claustra-tasseaux.jpg",
          alt: "Habillage mural en fines lames de bois assemblées en triangles",
        }}
      >
        <p>
          Pour chaque projet, nous relevons les cotes chez vous, dessinons un plan, fabriquons à
          l&apos;atelier et posons nous-mêmes. Le devis détaillé suit la visite ; l&apos;un et
          l&apos;autre sont gratuits.
        </p>
      </PageIntro>

      {/* Sommaire */}
      <nav aria-label="Services" className="conteneur pt-16 lg:pt-24">
        <ul className="flex flex-wrap gap-2">
          {services.map((service) => (
            <li key={service.slug}>
              <a
                href={`#${service.slug}`}
                className="inline-flex min-h-11 items-center rounded-full border border-filet px-5 font-medium transition-colors hover:border-noyer hover:bg-noyer hover:text-sciure"
              >
                {service.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {services.map((service, index) => {
        const count = projects.filter((p) => p.type === service.slug).length;
        const flip = index % 2 === 1;
        return (
          <section
            key={service.slug}
            id={service.slug}
            aria-labelledby={`${service.slug}-titre`}
            className="conteneur py-20 lg:py-32"
          >
            <div className="grid gap-10 md:grid-cols-12 md:gap-8">
              <div className={`md:col-span-6 lg:col-span-7 ${flip ? "md:order-2" : ""}`}>
                <div
                  data-anim="image"
                  className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] md:sticky md:top-28 lg:aspect-[5/4]"
                >
                  <div data-parallaxe="7" className="absolute inset-x-0 -inset-y-[9%]">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(min-width: 1024px) 56vw, (min-width: 768px) 48vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div
                className={`md:col-span-6 lg:col-span-5 ${flip ? "md:order-1" : ""} md:flex md:flex-col md:justify-center`}
              >
                <h2 id={`${service.slug}-titre`} data-anim="titre" className="titre-2">
                  <Words>{service.title}</Words>
                </h2>
                <p data-anim="bloc" className="chapeau mt-6">
                  {service.summary}
                </p>
                <ul data-anim="bloc" className="mt-8 border-b border-filet">
                  {service.details.map((d) => (
                    <li key={d} className="border-t border-filet py-4 text-brou">
                      {d}
                    </li>
                  ))}
                </ul>
                <dl data-anim="bloc" className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="mention text-brou">Bois utilisés</dt>
                    <dd className="mt-1 font-semibold">{service.woods}</dd>
                  </div>
                  <div>
                    <dt className="mention text-brou">Finitions</dt>
                    <dd className="mt-1 font-semibold">{service.finishes}</dd>
                  </div>
                </dl>
                <Link
                  href={`/realisations?type=${service.slug}`}
                  className="bouton bouton-contour mt-10 self-start"
                >
                  Voir les réalisations ({count})
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="etapes-titre" className="bg-sciure">
        <div className="conteneur section border-t border-filet">
          <h2 id="etapes-titre" data-anim="titre" className="titre-2 max-w-[14ch]">
            <Words>Comment se déroule un projet</Words>
          </h2>
          <ProcessStack />
        </div>
      </section>

      <section aria-labelledby="entretien-titre" className="bg-noyer text-sciure">
        <div className="conteneur section grid gap-10 md:grid-cols-12">
          <h2 id="entretien-titre" data-anim="titre" className="titre-2 md:col-span-5">
            <Words>Entretenir le bois</Words>
          </h2>
          <div data-anim="bloc" className="chapeau space-y-6 text-lin md:col-span-6 md:col-start-7">
            <p>
              Une finition à l&apos;huile se ravive avec une nouvelle couche tous les un à deux ans,
              après un léger égrenage.
            </p>
            <p>
              Un vernis à l&apos;eau se nettoie à l&apos;eau savonneuse et ne demande rien
              d&apos;autre. Nous laissons une fiche d&apos;entretien à la pose.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
