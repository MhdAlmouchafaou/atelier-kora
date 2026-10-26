import Link from "next/link";
import { navigation, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="overflow-hidden bg-noyer text-sciure">
      <div className="conteneur grid gap-12 pt-20 pb-12 md:grid-cols-12 lg:pt-28">
        <p className="titre-3 max-w-[22ch] md:col-span-12 lg:col-span-4">
          Menuiserie et agencement intérieur. Dessiné, fabriqué et posé par la même équipe depuis{" "}
          {site.founded}.
        </p>

        <div className="md:col-span-5 lg:col-span-3 lg:col-start-5">
          <h2 className="mention text-lin">Contact</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={site.phone.href} className="lien-trace text-[1.25rem] font-semibold">
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="lien-trace [overflow-wrap:anywhere]">
                {site.email}
              </a>
            </li>
            <li className="pt-2 text-lin">
              {site.address.street}
              <br />
              {site.address.area}
            </li>
          </ul>
        </div>

        <div className="md:col-span-4 lg:col-span-3">
          <h2 className="mention text-lin">Horaires</h2>
          <dl className="mt-4 space-y-3">
            {site.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd className="text-lin">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label="Pages du site" className="md:col-span-3 lg:col-span-2">
          <h2 className="mention text-lin">Pages</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/" className="lien-trace">
                Accueil
              </Link>
            </li>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="lien-trace whitespace-nowrap">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Le nom de l'atelier s'élargit à mesure qu'on arrive en bas de page. */}
      <div aria-hidden="true" className="conteneur">
        <p
          data-anim="largeur"
          data-de="62"
          data-a="104"
          data-debut="top bottom"
          data-fin="bottom bottom"
          className="nom-geant -mb-[0.12em]"
        >
          Atelier Kora
        </p>
      </div>

      <div className="border-t border-filet-sombre">
        <div className="conteneur flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-6 text-[0.9375rem] text-lin">
          <p>© Atelier Kora</p>
          <Link href="/mentions-legales" className="lien-trace">
            Mentions légales et données personnelles
          </Link>
        </div>
      </div>
    </footer>
  );
}
