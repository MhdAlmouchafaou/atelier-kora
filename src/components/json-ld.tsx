import { services } from "@/content/services";
import { site } from "@/content/site";

// Données structurées de l'entreprise (schema.org), lues par les moteurs de recherche.
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone.display,
    email: site.email,
    image: `${site.url}/images/projets/cuisine-chene-ilot.jpg`,
    foundingDate: String(site.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.area}`,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:30",
      },
    ],
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.summary },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Le caractère < est échappé pour qu'aucun texte ne puisse fermer la balise.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
