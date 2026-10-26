import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/cta-band";
import { Gallery } from "@/components/gallery";
import { PageIntro } from "@/components/page-intro";
import { projects } from "@/content/projets";

export const metadata: Metadata = pageMetadata({
  path: "/realisations",
  title: "Réalisations",
  description:
    "Cuisines, dressings, bibliothèques, escaliers et habillages fabriqués par Atelier Kora, avec pour chacun le bois, la finition, les dimensions et la durée du chantier.",
});

export default function RealisationsPage() {
  return (
    <>
      <PageIntro title="Réalisations">
        <p>
          {projects.length} projets sortis de l&apos;atelier. Pour chacun : le bois, la
          finition, les dimensions principales et la durée d&apos;atelier et de pose.
        </p>
      </PageIntro>
      <Gallery projects={projects} />
      <CtaBand
        title="Un projet proche de l'un de ceux-ci ?"
        text="Citez-le dans votre demande : nous partirons de cette réalisation pour préparer la visite."
      />
    </>
  );
}
