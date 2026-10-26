import { site } from "@/content/site";
import { PrimaryLink } from "./buttons";

// Bandeau d'appel, en bas de chaque page.
export function CtaBand({
  title = "Une cuisine, un rangement, un escalier en projet ?",
  text = "Nous venons prendre les mesures chez vous. La visite et le devis sont gratuits.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-titre" className="bg-vert text-white">
      <div className="conteneur section grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <h2 id="cta-titre" className="titre-2 max-w-[20ch]">
            {title}
          </h2>
          <p className="mt-4 max-w-[46ch] text-[1.125rem] text-sauge">{text}</p>
        </div>
        <div className="flex flex-col items-start gap-4 md:col-span-4 md:col-start-9">
          <PrimaryLink href="/contact" tone="blanc" className="w-full sm:w-auto">
            Demander un devis
          </PrimaryLink>
          <p className="text-sauge">
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
