import Link from "next/link";
import { site } from "@/content/site";
import { Magnetic } from "./motion/magnetic";
import { Words } from "@/components/motion/words";

// Bandeau d'appel, en bas de chaque page.
export function CtaBand({
  title = "Une cuisine, un rangement, un escalier en projet ?",
  text = "Nous venons prendre les mesures chez vous. La visite et le devis sont gratuits.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-titre" className="sur-chene bg-chene text-noyer">
      <div className="conteneur section">
        <h2 id="cta-titre" data-anim="titre" className="titre-1 max-w-[14ch]">
          <Words>{title}</Words>
        </h2>
        <div className="mt-12 grid gap-10 border-t border-noyer/25 pt-10 lg:mt-16 lg:grid-cols-12 lg:items-center">
          <p data-anim="bloc" className="chapeau max-w-[34ch] lg:col-span-6">
            {text}
          </p>
          <div
            data-anim="bloc"
            className="flex flex-col items-start gap-5 sm:flex-row sm:items-center lg:col-span-6 lg:justify-end"
          >
            <Magnetic>
              <Link href="/contact" className="bouton bouton-noyer min-h-16 px-9 text-[1.125rem]">
                Demander un devis
              </Link>
            </Magnetic>
            <p>
              ou au{" "}
              <a href={site.phone.href} className="lien font-semibold whitespace-nowrap">
                {site.phone.display}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
