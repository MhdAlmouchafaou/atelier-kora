import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PrimaryLink } from "@/components/buttons";
import { CoteH, CoteV } from "@/components/cote";
import { CtaBand } from "@/components/cta-band";
import { ProcessTimeline } from "@/components/process-timeline";
import { ProjectFigure } from "@/components/project-figure";
import { featuredProjects, projects } from "@/content/projets";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/",
  description: site.description,
});

const hero = projects.find((p) => p.slug === "cuisine-chene-ilot")!;

export default function HomePage() {
  const [big, tall, ...rest] = featuredProjects;

  return (
    <>
      {/* Ouverture */}
      <section className="conteneur grid gap-10 pt-10 pb-18 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-5 lg:pt-6">
          <h1 className="titre-1">Cuisines, rangements et escaliers sur mesure</h1>
          <p className="chapeau mt-6 max-w-[38ch]">
            Dessinés et fabriqués dans notre atelier, posés par la même équipe. La visite et le
            devis sont gratuits.
          </p>
          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center">
            <PrimaryLink href="/contact">Demander un devis</PrimaryLink>
            <p className="text-graphite">
              ou au{" "}
              <a href={site.phone.href} className="lien font-semibold whitespace-nowrap text-encre">
                {site.phone.display}
              </a>
            </p>
          </div>
        </div>

        <figure className="lg:col-span-7">
          <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-x-4">
            <div className="relative aspect-[3/2] overflow-hidden bg-trait">
              <Image
                src={hero.image}
                alt={hero.alt}
                fill
                preload
                sizes="(min-width: 1280px) 700px, (min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
            </div>
            <CoteV label="2 450" animate className="w-4" />
            <CoteH label="4 200" animate />
          </div>
          <figcaption className="mt-4 grid max-w-[60ch] gap-0.5">
            <span className="font-semibold">{hero.title}</span>
            <span className="cote-texte">
              {hero.wood}. {hero.finish}. {hero.dimensions}.
            </span>
          </figcaption>
        </figure>
      </section>

      {/* Services */}
      <section aria-labelledby="services-titre" className="border-t border-trait">
        <div className="conteneur section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="services-titre" className="titre-2">
              Ce que nous fabriquons
            </h2>
            <Link href="/services" className="lien font-medium">
              Détail des services
            </Link>
          </div>

          <ul className="mt-12 border-b border-trait lg:mt-16">
            {services.map((service) => (
              <li key={service.slug} className="border-t border-trait">
                <Link
                  href={`/services#${service.slug}`}
                  className="group grid items-center gap-x-8 gap-y-3 py-7 md:grid-cols-12 lg:py-8"
                >
                  <h3 className="titre-3 underline-offset-[6px] group-hover:underline md:col-span-4">
                    {service.title}
                  </h3>
                  <p className="max-w-[52ch] text-graphite md:col-span-5">{service.summary}</p>
                  <div className="relative hidden aspect-[3/2] overflow-hidden bg-trait md:col-span-3 md:block">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 290px, 22vw"
                      className="object-cover"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Réalisations */}
      <section aria-labelledby="realisations-titre" className="border-t border-trait">
        <div className="conteneur section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="realisations-titre" className="titre-2">
              Quelques réalisations
            </h2>
            <Link href="/realisations" className="lien font-medium">
              Voir les {projects.length} réalisations
            </Link>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-12 lg:mt-16 lg:gap-x-8 lg:gap-y-14">
            <div className="md:col-span-8">
              <ProjectFigure
                project={big}
                sizes="(min-width: 1280px) 780px, (min-width: 768px) 64vw, 100vw"
              />
            </div>
            <div className="md:col-span-4">
              <ProjectFigure
                project={tall}
                aspect="aspect-[4/5]"
                stretch
                sizes="(min-width: 1280px) 380px, (min-width: 768px) 32vw, 100vw"
              />
            </div>
            {rest.map((project) => (
              <div key={project.slug} className="md:col-span-6 lg:col-span-3">
                <ProjectFigure
                  project={project}
                  sizes="(min-width: 1280px) 290px, (min-width: 1024px) 23vw, (min-width: 768px) 48vw, 100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Déroulement */}
      <section aria-labelledby="etapes-titre" className="border-t border-trait">
        <div className="conteneur section">
          <h2 id="etapes-titre" className="titre-2 max-w-[18ch]">
            De la prise de mesures à la pose
          </h2>
          <p className="mt-5 max-w-[56ch] text-graphite">
            La frise montre la place de chaque étape dans un projet type, à l&apos;échelle de sa
            durée habituelle.
          </p>
          <ProcessTimeline />
        </div>
      </section>

      {/* L'atelier */}
      <section aria-labelledby="atelier-titre" className="border-t border-trait">
        <div className="conteneur section grid gap-10 md:grid-cols-12 md:items-center lg:gap-8">
          <div className="relative aspect-[3/2] overflow-hidden bg-trait md:col-span-7">
            <Image
              src="/images/atelier/tracage-crayon.jpg"
              alt="Un menuisier trace au crayon une ligne de coupe sur une planche, entouré de copeaux"
              fill
              sizes="(min-width: 1280px) 700px, (min-width: 768px) 56vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-5 lg:col-span-4 lg:col-start-9">
            <h2 id="atelier-titre" className="titre-2">
              Un atelier, six personnes
            </h2>
            <p className="mt-5 text-graphite">
              Daniel Kora a ouvert l&apos;atelier en {site.founded}, après douze ans chez un
              fabricant d&apos;escaliers. Tout est dessiné, débité et assemblé ici : nous
              n&apos;achetons pas de meubles en kit. La même équipe fabrique et pose.
            </p>
            <Link href="/a-propos" className="lien mt-6 inline-block font-medium">
              L&apos;équipe et les bois que nous travaillons
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
