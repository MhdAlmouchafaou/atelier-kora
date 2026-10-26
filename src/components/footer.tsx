import Link from "next/link";
import { navigation, site } from "@/content/site";
import { Wordmark } from "./header";

export function Footer() {
  return (
    <footer className="bg-encre text-papier">
      <div className="conteneur grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-12 lg:col-span-4">
          <Wordmark className="text-[1.75rem]" />
          <p className="mt-4 max-w-[34ch] text-sauge">
            Menuiserie et agencement intérieur. Dessiné, fabriqué et posé par la même équipe depuis{" "}
            {site.founded}.
          </p>
        </div>

        <div className="md:col-span-5 lg:col-span-3">
          <h2 className="text-[1.125rem] [font-variation-settings:'wdth'_87]">Contact</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={site.phone.href} className="lien">
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="lien [overflow-wrap:anywhere]">
                {site.email}
              </a>
            </li>
            <li className="pt-2 text-sauge">
              {site.address.street}
              <br />
              {site.address.area}
            </li>
          </ul>
        </div>

        <div className="md:col-span-4 lg:col-span-3">
          <h2 className="text-[1.125rem] [font-variation-settings:'wdth'_87]">Horaires</h2>
          <dl className="mt-4 space-y-3">
            {site.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd className="text-sauge">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label="Pages du site" className="md:col-span-3 lg:col-span-2">
          <h2 className="text-[1.125rem] [font-variation-settings:'wdth'_87]">Pages</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/" className="lien">
                Accueil
              </Link>
            </li>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="lien">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/15">
        <div className="conteneur flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-6 text-[0.9375rem] text-sauge">
          <p>© Atelier Kora</p>
          <Link href="/mentions-legales" className="lien">
            Mentions légales et données personnelles
          </Link>
        </div>
      </div>
    </footer>
  );
}
