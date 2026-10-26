import type { Metadata } from "next";
import { site } from "@/content/site";

// Métadonnées d'une page : titre, description, adresse canonique et aperçu de partage.
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title?: string;
  description: string;
}): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "fr_FR",
      url: path,
      title: title ? `${title} | ${site.name}` : undefined,
      description,
    },
  };
}
