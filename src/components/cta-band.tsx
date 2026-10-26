import { site } from "@/content/site";
import { PrimaryLink } from "./buttons";

// Bandeau d'appel, en bas de chaque page.
export function CtaBand({
  title = "Parlons de votre projet",
  text = "Nous venons prendre les mesures chez vous. La visite et le devis sont gratuits.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-titre" className="bg-vert text-white">
      <div className="conteneur grid gap-8 py-16 md:grid-cols-12 md:items-end lg:py-24">
        <div className="md:col-span-7">
          <h2 id="cta-titre" className="titre-2">
            {title}
          </h2>
          <p className="mt-4 max-w-[46ch] text-[1.125rem] text-white/85">{text}</p>
        </div>
        <div className="flex flex-col gap-4 md:col-span-5 md:items-end">
          <PrimaryLink href="/contact" tone="blanc" className="w-full sm:w-auto">
            Demander un devis
          </PrimaryLink>
          <p className="text-white/85">
            Ou appelez l&apos;atelier au{" "}
            <a href={site.phone.href} className="lien font-semibold whitespace-nowrap text-white">
              {site.phone.display}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
