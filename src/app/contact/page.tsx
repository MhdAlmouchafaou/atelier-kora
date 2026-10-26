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
          Décrivez votre projet en quelques lignes. Nous vous rappelons sous deux jours ouvrés
          pour fixer la visite. La visite et le devis sont gratuits.
        </p>
      </PageIntro>

      <section className="border-t border-trait">
        <div className="conteneur grid gap-14 pt-10 pb-20 lg:grid-cols-12 lg:gap-8 lg:pt-14 lg:pb-28">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside aria-label="Coordonnées de l'atelier" className="lg:col-span-4 lg:col-start-9">
            <dl className="grid gap-8">
              <div>
                <dt className="cote-texte">Par téléphone</dt>
                <dd className="mt-1">
                  <a
                    href={site.phone.href}
                    className="lien text-[1.75rem] leading-tight font-bold [font-variation-settings:'wdth'_80]"
                  >
                    {site.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="cote-texte">Par email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${site.email}`} className="lien [overflow-wrap:anywhere]">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="cote-texte">Atelier</dt>
                <dd className="mt-1">
                  {site.address.street}
                  <br />
                  {site.address.area}
                  <br />
                  <a href={mapsUrl} className="lien mt-2 inline-block" rel="noopener">
                    Itinéraire
                  </a>
                </dd>
              </div>
              <div>
                <dt className="cote-texte">Horaires</dt>
                <dd className="mt-1 grid gap-2">
                  {site.hours.map((h) => (
                    <p key={h.days}>
                      {h.days}
                      <br />
                      <span className="text-graphite">{h.time}</span>
                    </p>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="cote-texte">Zone d&apos;intervention</dt>
                <dd className="mt-1">{site.zone}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
