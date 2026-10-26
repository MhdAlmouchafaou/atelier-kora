import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/page-intro";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  path: "/mentions-legales",
  title: "Mentions légales et données personnelles",
  description:
    "Éditeur, hébergeur, crédits photos et traitement des données personnelles du site Atelier Kora.",
});

export default function MentionsPage() {
  return (
    <>
      <PageIntro title="Mentions légales" />
      <div>
        <div className="conteneur grid gap-12 pt-16 pb-28 md:grid-cols-12 lg:pt-24">
          <div className="space-y-12 md:col-span-8 lg:col-span-7 [&_h2]:text-[2rem] [&_h2]:leading-tight [&_p]:mt-3 [&_p]:text-brou">
            <section>
              <h2>Éditeur</h2>
              <p>
                {site.name}, {site.address.street}, {site.address.area}. Téléphone :{" "}
                {site.phone.display}. Email : {site.email}.
              </p>
              <p>
                Forme juridique, numéro d&apos;immatriculation et directeur de la publication :
                [À COMPLÉTER].
              </p>
              <p>
                Atelier Kora est une entreprise fictive, créée pour un projet de démonstration. Les
                noms, coordonnées et réalisations présentés sont imaginaires.
              </p>
            </section>

            <section>
              <h2>Hébergement</h2>
              <p>
                Le site est hébergé par Vercel Inc., dont les coordonnées figurent sur vercel.com.
              </p>
            </section>

            <section>
              <h2>Photographies</h2>
              <p>
                Les photographies proviennent de la banque d&apos;images Unsplash et sont utilisées
                selon la licence Unsplash.
              </p>
            </section>

            <section id="donnees">
              <h2>Données personnelles</h2>
              <p>
                Le formulaire de contact recueille votre nom, votre téléphone, votre email si vous
                le donnez, le type de projet et votre message. Ces informations servent uniquement à
                vous rappeler et à établir un devis. Elles ne sont ni vendues ni transmises à des
                tiers, en dehors du service d&apos;envoi d&apos;emails qui nous les achemine.
              </p>
              <p>Durée de conservation des demandes : [À COMPLÉTER].</p>
              <p>
                Pour consulter, corriger ou supprimer vos données, écrivez à {site.email}.
              </p>
              <p>Le site ne dépose aucun cookie de mesure d&apos;audience ou de publicité.</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
