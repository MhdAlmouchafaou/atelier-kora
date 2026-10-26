import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { PageIntro } from "@/components/page-intro";
import { site } from "@/content/site";
import { Words } from "@/components/motion/words";

export const metadata: Metadata = pageMetadata({
  path: "/a-propos",
  title: "L'atelier et l'équipe",
  description:
    "Atelier Kora : six personnes qui dessinent, fabriquent et posent depuis 2009. Les bois que nous travaillons et l'usage de chacun.",
});

const team = [
  { name: "Daniel Kora", role: "Fondateur. Reçoit les clients et prend les mesures." },
  { name: "Sarah Morel", role: "Dessine les plans et prépare les devis." },
  { name: "Thomas Ricci", role: "Menuisier d'atelier." },
  { name: "Inès Dumont", role: "Menuisière d'atelier." },
  { name: "Marc Lefèvre", role: "Dirige la pose." },
  { name: "Léa Bernard", role: "Accueil et suivi des chantiers." },
];

const woods = [
  {
    name: "Chêne",
    use: "Cuisines, escaliers, dressings",
    note: "Dur et veiné, il fonce légèrement avec le temps.",
  },
  { name: "Noyer", use: "Façades, habillages, mobilier", note: "Brun profond, veinage marqué." },
  { name: "Frêne", use: "Escaliers, plans", note: "Clair et souple, il résiste bien aux chocs." },
  {
    name: "Hêtre",
    use: "Plans de travail",
    note: "Dense, grain fin, il accepte l'huile alimentaire.",
  },
  { name: "Pin", use: "Lambris, escaliers", note: "Tendre et noueux, c'est le moins cher." },
  {
    name: "Contreplaqué de bouleau",
    use: "Caissons, bibliothèques",
    note: "Stable ; ses chants restent visibles ou sont laqués.",
  },
];

const layout = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "sm:col-span-2 lg:col-span-12",
];
const aspects = [
  "aspect-[3/2]",
  "aspect-[3/2] lg:aspect-[16/15]",
  "aspect-[3/2] lg:aspect-[16/15]",
  "aspect-[3/2]",
  "aspect-[3/2] lg:aspect-[21/9]",
];

const photos = [
  {
    src: "/images/atelier/tracage-crayon.jpg",
    alt: "Traçage au crayon d'une ligne de coupe sur une planche",
    caption: "Traçage avant la coupe",
    w: 1800,
    h: 1200,
  },
  {
    src: "/images/atelier/assemblage-lamelles.jpg",
    alt: "Un menuisier creuse à la lamelleuse les rainures d'assemblage dans un panneau",
    caption: "Assemblage par lamelles",
    w: 1800,
    h: 2546,
  },
  {
    src: "/images/atelier/rabot.jpg",
    alt: "Un menuisier en tablier passe le rabot sur une planche, sur l'établi",
    caption: "Rabotage à la main",
    w: 1800,
    h: 1200,
  },
  {
    src: "/images/atelier/ciseaux-a-bois.jpg",
    alt: "Ciseaux à bois posés sur un plateau en bois brut",
    caption: "Les ciseaux de l'établi",
    w: 1800,
    h: 936,
  },
  {
    src: "/images/atelier/copeaux.jpg",
    alt: "Copeaux de rabot sur un vieux tréteau en bois",
    caption: "Copeaux de rabot",
    w: 1800,
    h: 1200,
  },
];

export default function AtelierPage() {
  return (
    <>
      <PageIntro
        title="L'atelier"
        image={{
          src: "/images/atelier/planche-noyer.jpg",
          alt: "Une menuisière pose la main sur une planche de noyer, au milieu de la sciure",
        }}
      >
        <p>
          Daniel Kora a ouvert l&apos;atelier en {site.founded}, après douze ans chez un fabricant
          d&apos;escaliers. Il a travaillé seul les deux premières années.
        </p>
        <p>
          Nous sommes aujourd&apos;hui six. Tout est dessiné, débité et assemblé ici : nous
          n&apos;achetons pas de meubles en kit. La même équipe fabrique et pose, et vous avez un
          seul interlocuteur du premier rendez-vous à la fin du chantier.
        </p>
      </PageIntro>

      <section aria-labelledby="equipe-titre" className="conteneur section">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 id="equipe-titre" data-anim="titre" className="titre-2 md:sticky md:top-28">
              <Words>L&apos;équipe</Words>
            </h2>
          </div>
          <ul className="border-b border-filet md:col-span-8">
            {team.map((member) => (
              <li
                key={member.name}
                data-anim="bloc"
                className="group grid gap-2 border-t border-filet py-7 sm:grid-cols-[1fr_1fr] sm:items-baseline sm:gap-8 lg:py-9"
              >
                <span className="titre-3 transition-[--wdth] duration-700 ease-(--ease-expo) [--wdth:75] [font-variation-settings:'wdth'_var(--wdth)] group-hover:[--wdth:100]">
                  {member.name}
                </span>
                <span className="text-brou">{member.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Photos de l'atelier" className="conteneur pb-24 lg:pb-44">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {photos.map((photo, i) => (
            <figure key={photo.src} className={layout[i]}>
              <div
                data-anim="image"
                className={`relative overflow-hidden rounded-[1.25rem] ${aspects[i]}`}
              >
                <div data-parallaxe="6" className="absolute inset-x-0 -inset-y-[8%]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={
                      i === 0 || i === 3
                        ? "(min-width: 1024px) 56vw, (min-width: 640px) 50vw, 100vw"
                        : "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                    }
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="mention mt-3 text-brou">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="bois" aria-labelledby="bois-titre" className="bg-noyer text-sciure">
        <div className="conteneur section">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <h2 id="bois-titre" data-anim="titre" className="titre-2 md:col-span-7">
              <Words>Les bois que nous travaillons</Words>
            </h2>
            <p data-anim="bloc" className="max-w-[40ch] text-lin md:col-span-4 md:col-start-9">
              Les essences que nous travaillons le plus, et l&apos;usage que nous en faisons.
            </p>
          </div>
          <div
            role="region"
            aria-label="Tableau des bois, défilable horizontalement"
            tabIndex={0}
            className="mt-14 overflow-x-auto lg:mt-20"
          >
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-sciure">
                  <th scope="col" className="mention pr-6 pb-4 font-medium text-lin">
                    Essence
                  </th>
                  <th scope="col" className="mention pr-6 pb-4 font-medium text-lin">
                    Usages chez nous
                  </th>
                  <th scope="col" className="mention pb-4 font-medium text-lin">
                    Caractère
                  </th>
                </tr>
              </thead>
              <tbody>
                {woods.map((wood) => (
                  <tr key={wood.name} className="border-b border-filet-sombre align-baseline">
                    <th
                      scope="row"
                      className="py-7 pr-6 text-[clamp(2rem,1.2rem+2.6vw,3.75rem)] leading-none font-extrabold tracking-[-0.03em] [font-variation-settings:'wdth'_75]"
                    >
                      <span className="fil-du-bois [background-size:150rem_auto]">{wood.name}</span>
                    </th>
                    <td className="py-7 pr-6">{wood.use}</td>
                    <td className="py-7 text-lin">{wood.note}</td>
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
