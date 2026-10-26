"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/content/site";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`text-[1.375rem] leading-none font-bold tracking-[-0.01em] [font-variation-settings:'wdth'_72] ${className}`}
    >
      Atelier Kora
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Ferme le menu quand on change de page.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-trait bg-papier">
      <div className="conteneur flex h-17 items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="-my-2 py-2" aria-label="Atelier Kora, accueil">
          <Wordmark />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`py-2 text-[0.9375rem] font-medium underline-offset-[6px] hover:underline aria-[current=page]:underline aria-[current=page]:decoration-2`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a href={site.phone.href} className="text-[0.9375rem] font-medium hover:underline">
            {site.phone.display}
          </a>
          {pathname !== "/contact" && (
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-[3px] bg-vert px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-vert-fonce"
          >
            Demander un devis
          </Link>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={site.phone.href}
            className="inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-medium underline underline-offset-4"
          >
            Appeler
          </a>
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex min-h-11 items-center gap-3 rounded-[3px] border border-encre px-4 text-[0.9375rem] font-medium"
          >
            {open ? "Fermer" : "Menu"}
            <span aria-hidden="true" className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 h-px w-4 bg-current transition-transform ${open ? "top-1/2 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-current transition-transform ${open ? "top-1/2 -rotate-45" : "bottom-0"}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-trait bg-papier lg:hidden"
      >
        <nav aria-label="Navigation principale" className="conteneur pt-2 pb-8">
          <ul>
            {navigation.map((item) => (
              <li key={item.href} className="border-b border-trait">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex min-h-15 items-center text-[1.75rem] font-bold [font-variation-settings:'wdth'_72] aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[6px]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-8 flex min-h-13 items-center justify-center rounded-[3px] bg-vert px-6 font-semibold text-white"
          >
            Demander un devis
          </Link>
          <p className="mt-5 text-graphite">
            Ou appelez l&apos;atelier au{" "}
            <a href={site.phone.href} className="lien font-semibold text-encre">
              {site.phone.display}
            </a>
          </p>
        </nav>
      </div>
    </header>
  );
}
