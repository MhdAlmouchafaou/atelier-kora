import Link from "next/link";
import type { Metadata } from "next";
import { PrimaryLink } from "@/components/buttons";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col justify-center bg-noyer text-sciure">
      <div className="conteneur flex flex-col items-center py-36 text-center">
        <h1 className="titre-1 max-w-[12ch]">
          <span className="ouverture-ligne">
            <span>Cette page n&apos;existe pas</span>
          </span>
        </h1>
        <p
          className="chapeau ouverture-fondu mt-8 max-w-[40ch] text-lin"
          style={{ ["--delai" as string]: "400ms" }}
        >
          L&apos;adresse a peut-être changé. Les réalisations, les services et le formulaire de
          devis sont accessibles depuis le menu.
        </p>
        <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row">
          <PrimaryLink href="/">Revenir à l&apos;accueil</PrimaryLink>
          <Link
            href="/realisations"
            className="lien inline-flex min-h-11 items-center font-semibold"
          >
            Voir les réalisations
          </Link>
        </div>
      </div>
    </section>
  );
}
