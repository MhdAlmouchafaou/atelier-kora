import Link from "next/link";
import type { Metadata } from "next";
import { PrimaryLink } from "@/components/buttons";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <section className="conteneur flex flex-col items-center py-24 text-center lg:py-36">
      <h1 className="titre-2 max-w-[20ch]">Cette page n&apos;existe pas</h1>
      <p className="mt-5 max-w-[44ch] text-graphite">
        L&apos;adresse a peut-être changé. Les réalisations, les services et le formulaire de devis
        sont accessibles depuis le menu.
      </p>
      <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
        <PrimaryLink href="/">Revenir à l&apos;accueil</PrimaryLink>
        <Link href="/realisations" className="lien font-medium">
          Voir les réalisations
        </Link>
      </div>
    </section>
  );
}
