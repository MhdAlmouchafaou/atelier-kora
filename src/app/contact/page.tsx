import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Demander un devis",
  description:
    "Décrivez votre projet de cuisine, rangement, escalier ou agencement. Atelier Kora vous rappelle sous deux jours ouvrés. Visite et devis gratuits.",
});

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name} ${site.address.street} ${site.address.area}`,
)}`;

export default function ContactPage() {
  return (
    <>
      <PageIntro title="Demander un devis">
        <p>
          Décrivez votre projet en quelques lignes. Nous vous rappelons sous deux jours ouvrés pour
          fixer la visite. La visite et le devis sont gratuits.
        </p>
      </PageIntro>

      <section
        aria-label="Formulaire et coordonnées"
        className="conteneur pt-14 pb-24 lg:pt-20 lg:pb-40"
      >
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside aria-label="Coordonnées de l'atelier" className="lg:col-span-4 lg:col-start-9">
            <dl className="grid gap-9 lg:sticky lg:top-28">
              <div>
                <dt className="mention text-brou">Par téléphone</dt>
                <dd className="mt-2">
                  <a
                    href={site.phone.href}
                    className="lien-trace text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] leading-tight font-extrabold tracking-[-0.02em] whitespace-nowrap [font-variation-settings:'wdth'_80]"
                  >
                    {site.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mention text-brou">Par email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="lien text-[1.125rem] [overflow-wrap:anywhere]"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mention text-brou">Atelier</dt>
                <dd className="mt-2">
                  {site.address.street}
                  <br />
                  {site.address.area}
                  <br />
                  <a
                    href={mapsUrl}
                    className="lien mt-2 inline-flex min-h-11 items-center"
                    rel="noopener"
                  >
                    Itinéraire
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mention text-brou">Horaires</dt>
                <dd className="mt-2 grid gap-3">
                  {site.hours.map((h) => (
                    <p key={h.days}>
                      {h.days}
                      <br />
                      <span className="text-brou">{h.time}</span>
                    </p>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="mention text-brou">Zone d&apos;intervention</dt>
                <dd className="mt-2">{site.zone}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
