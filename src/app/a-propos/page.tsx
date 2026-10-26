import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { PageIntro } from "@/components/page-intro";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "L'atelier et l'équipe",
  description:
    "Atelier Kora : six personnes qui dessinent, fabriquent et posent depuis 2009. Les bois que nous travaillons et l'usage de chacun.",
  alternates: { canonical: "/a-propos" },
};

const team = [
  { name: "Daniel Kora", role: "Fondateur. Reçoit les clients et prend les mesures." },
  { name: "Sarah Morel", role: "Dessine les plans et prépare les devis." },
  { name: "Thomas Ricci", role: "Menuisier d'atelier." },
  { name: "Inès Dumont", role: "Menuisière d'atelier." },
  { name: "Marc Lefèvre", role: "Dirige les équipes de pose." },
  { name: "Léa Bernard", role: "Accueil et suivi des chantiers." },
];

const woods = [
  { name: "Chêne", use: "Cuisines, escaliers, dressings", note: "Dur et veiné. Se patine et fonce légèrement avec le temps." },
  { name: "Noyer", use: "Façades, habillages, mobilier", note: "Brun profond, veinage marqué." },
  { name: "Frêne", use: "Escaliers, plans", note: "Clair et souple, il encaisse bien les chocs." },
  { name: "Hêtre", use: "Plans de travail", note: "Dense, grain fin. Accepte l'huile alimentaire." },
  { name: "Pin", use: "Lambris, escaliers", note: "Tendre et noueux, le plus abordable." },
  { name: "Contreplaqué de bouleau", use: "Caissons, bibliothèques", note: "Stable, ne travaille pas. Chants réguliers laissés visibles ou laqués." },
];

const photos = [
  { src: "/images/atelier/tracage-crayon.jpg", alt: "Traçage au crayon d'une ligne de coupe sur une planche", caption: "Traçage avant la coupe", w: 1800, h: 1200 },
  { src: "/images/atelier/assemblage-lamelles.jpg", alt: "Un menuisier creuse à la lamelleuse les rainures d'assemblage dans un panneau", caption: "Assemblage par lamelles", w: 1800, h: 2546 },
  { src: "/images/atelier/rabot.jpg", alt: "Un menuisier en tablier passe le rabot sur une planche, sur l'établi", caption: "Rabotage à la main", w: 1800, h: 1200 },
  { src: "/images/atelier/ciseaux-a-bois.jpg", alt: "Ciseaux à bois posés sur un plateau en bois brut", caption: "Les ciseaux de l'établi", w: 1800, h: 936 },
  { src: "/images/atelier/planche-noyer.jpg", alt: "Une menuisière pose la main sur une planche de noyer, au milieu de la sciure", caption: "Choix d'une planche de noyer", w: 1800, h: 1202 },
  { src: "/images/atelier/copeaux.jpg", alt: "Copeaux de rabot sur un vieux tréteau en bois", caption: "Copeaux de rabot", w: 1800, h: 1200 },
];

export default function AtelierPage() {
  return (
    <>
      <PageIntro title="L'atelier">
        <p>
          Daniel Kora a ouvert l&apos;atelier en {site.founded}, après douze ans chez un fabricant
          d&apos;escaliers. Il a travaillé seul les deux premières années.
        </p>
        <p>
          Nous sommes aujourd&apos;hui six. Tout est dessiné, débité et assemblé ici : nous
          n&apos;achetons pas de meubles en kit. La même équipe fabrique et pose, et vous avez un
          seul interlocuteur du premier rendez-vous à la fin du chantier.
        </p>
      </PageIntro>

      <section aria-label="Photos de l'atelier" className="border-t border-trait">
        <div className="conteneur grid gap-x-6 gap-y-10 pt-8 pb-20 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:pb-28">
          {photos.map((photo, i) => (
            <figure
              key={photo.src}
              className={
                i === 0 ? "lg:col-span-7" : i === 1 ? "lg:col-span-5 lg:row-span-2" : i === 2 ? "lg:col-span-7" : "lg:col-span-4"
              }
            >
              <div className={`relative overflow-hidden bg-trait ${i === 1 ? "aspect-[3/4] lg:aspect-auto lg:h-[calc(100%-2rem)]" : "aspect-[3/2]"}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                  preload={i === 0}
                  className="object-cover"
                />
              </div>
              <figcaption className="cote-texte mt-2">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section aria-labelledby="equipe-titre" className="border-t border-trait">
        <div className="conteneur section grid gap-10 md:grid-cols-12">
          <h2 id="equipe-titre" className="titre-2 md:col-span-4">
            L&apos;équipe
          </h2>
          <ul className="border-b border-trait md:col-span-8">
            {team.map((member) => (
              <li
                key={member.name}
                className="grid gap-1 border-t border-trait py-5 sm:grid-cols-[14rem_1fr] sm:gap-6"
              >
                <span className="font-semibold">{member.name}</span>
                <span className="text-graphite">{member.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="bois-titre" className="border-t border-trait">
        <div className="conteneur section">
          <h2 id="bois-titre" className="titre-2">
            Les bois que nous travaillons
          </h2>
          <p className="mt-5 max-w-[56ch] text-graphite">
            Le bois se choisit selon l&apos;usage avant de se choisir selon la couleur. Voici ceux
            que nous avons toujours en stock.
          </p>
          <div className="mt-10 overflow-x-auto lg:mt-14">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-encre">
                  <th scope="col" className="cote-texte pb-3 pr-6 font-medium">Essence</th>
                  <th scope="col" className="cote-texte pb-3 pr-6 font-medium">Usages chez nous</th>
                  <th scope="col" className="cote-texte pb-3 font-medium">Caractère</th>
                </tr>
              </thead>
              <tbody>
                {woods.map((wood) => (
                  <tr key={wood.name} className="border-b border-trait align-top">
                    <th scope="row" className="py-5 pr-6 text-[1.25rem] font-bold [font-variation-settings:'wdth'_72]">
                      {wood.name}
                    </th>
                    <td className="py-5 pr-6">{wood.use}</td>
                    <td className="py-5 text-graphite">{wood.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
