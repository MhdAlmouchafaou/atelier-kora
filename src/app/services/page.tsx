import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PageIntro } from "@/components/page-intro";
import { ProcessTimeline } from "@/components/process-timeline";
import { projects } from "@/content/projets";
import { services } from "@/content/services";

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Services : cuisines, rangements, escaliers, agencement",
  description:
    "Cuisines, dressings, bibliothèques, escaliers, agencements et habillages sur mesure, en chêne, noyer, frêne, hêtre ou pin. Visite et devis gratuits.",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro title="Ce que nous fabriquons">
        <p>
          Pour chaque projet, nous relevons les cotes chez vous, dessinons un plan, fabriquons à
          l&apos;atelier et posons nous-mêmes. Le devis détaillé suit la visite ; l&apos;un et
          l&apos;autre sont gratuits.
        </p>
      </PageIntro>

      {services.map((service, index) => {
        const count = projects.filter((p) => p.type === service.slug).length;
        return (
          <section
            key={service.slug}
            id={service.slug}
            aria-labelledby={`${service.slug}-titre`}
            className="border-t border-trait"
          >
            <div className="conteneur section grid gap-10 md:grid-cols-12 lg:gap-8">
              <div
                className={`relative aspect-[3/2] overflow-hidden bg-trait md:col-span-6 ${index % 2 === 1 ? "md:order-2 md:col-start-7" : ""}`}
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 1280px) 590px, (min-width: 768px) 48vw, 100vw"
                  preload={index === 0}
                  className="object-cover"
                />
              </div>

              <div
                className={`md:col-span-6 lg:col-span-5 ${index % 2 === 1 ? "md:order-1" : "lg:col-start-8"}`}
              >
                <h2 id={`${service.slug}-titre`} className="titre-2">
                  {service.title}
                </h2>
                <p className="mt-4 text-[1.125rem]">{service.summary}</p>
                <ul className="mt-6 space-y-3 text-graphite">
                  {service.details.map((d) => (
                    <li key={d} className="grid grid-cols-[1rem_1fr] gap-2">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 bg-graphite" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-8 grid gap-4 border-t border-trait pt-6 sm:grid-cols-2">
                  <div>
                    <dt className="cote-texte">Bois utilisés</dt>
                    <dd className="mt-1 font-medium">{service.woods}</dd>
                  </div>
                  <div>
                    <dt className="cote-texte">Finitions</dt>
                    <dd className="mt-1 font-medium">{service.finishes}</dd>
                  </div>
                </dl>
                <Link
                  href={`/realisations?type=${service.slug}`}
                  className="lien mt-8 inline-block font-medium"
                >
                  Voir les réalisations ({count})
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="etapes-titre" className="border-t border-trait">
        <div className="conteneur section">
          <h2 id="etapes-titre" className="titre-2 max-w-[18ch]">
            Comment se déroule un projet
          </h2>
          <ProcessTimeline />
        </div>
      </section>

      <section aria-labelledby="entretien-titre" className="border-t border-trait">
        <div className="conteneur section grid gap-8 md:grid-cols-12">
          <h2 id="entretien-titre" className="titre-2 md:col-span-5">
            Entretenir le bois
          </h2>
          <div className="space-y-5 text-[1.125rem] md:col-span-6 md:col-start-7">
            <p>
              Une finition à l&apos;huile se ravive avec une nouvelle couche tous les un à deux
              ans, après un léger égrenage.
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
