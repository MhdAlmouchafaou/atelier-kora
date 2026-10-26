"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/content/site";
import { smoothScroll } from "@/lib/motion";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`text-[1.375rem] leading-none font-extrabold tracking-[-0.02em] [font-variation-settings:'wdth'_75] ${className}`}
    >
      Atelier Kora
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Ferme le menu quand on change de page.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setHidden(false);
  }

  // Barre transparente en haut de page, pleine ensuite ; elle se cache quand on
  // descend et revient dès qu'on remonte.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setSolid(y > 40);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 400);
        last = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Menu ouvert : la page ne défile plus, Échap le ferme.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    smoothScroll.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      smoothScroll.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const showBar = solid && !open;

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={`fixed inset-x-0 top-0 z-50 text-sciure transition-transform duration-500 ease-(--ease-expo) ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 bg-noyer transition-opacity duration-500 ${showBar ? "opacity-100" : "opacity-0"}`}
        />
        <div className="conteneur flex h-18 items-center justify-between gap-6 lg:h-20">
          <Link href="/" className="-my-2 py-2" aria-label="Atelier Kora, accueil">
            <Wordmark />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="lien-trace py-2 text-[0.9375rem] font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-7 lg:flex">
            <a href={site.phone.href} className="lien-trace text-[0.9375rem] font-medium">
              {site.phone.display}
            </a>
            {pathname !== "/contact" && (
              <Link href="/contact" className="bouton min-h-11 px-5 text-[0.9375rem]">
                Demander un devis
              </Link>
            )}
          </div>

          <div className="flex items-center gap-1 lg:hidden">
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
              className="inline-flex min-h-11 items-center gap-3 rounded-full border border-current px-5 text-[0.9375rem] font-medium"
            >
              {open ? "Fermer" : "Menu"}
              <span aria-hidden="true" className="relative block h-2.5 w-4">
                <span
                  className={`absolute left-0 h-px w-4 bg-current transition-transform duration-500 ${open ? "top-1/2 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-px w-4 bg-current transition-transform duration-500 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu plein écran (téléphone et tablette), hors de la barre qui se déplace. */}
      <div
        id="menu-mobile"
        inert={!open}
        data-lenis-prevent
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-noyer pt-18 text-sciure transition-[clip-path,visibility] duration-700 ease-(--ease-scie) lg:hidden ${
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav
          aria-label="Navigation principale"
          className="conteneur flex flex-1 flex-col pt-8 pb-10"
        >
          <ul>
            {[{ href: "/", label: "Accueil" }, ...navigation].map((item, i) => (
              <li key={item.href} className="overflow-clip border-b border-filet-sombre">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  style={{ transitionDelay: open ? `${180 + i * 60}ms` : "0ms" }}
                  className={`flex min-h-18 items-center text-[2.75rem] leading-none font-extrabold tracking-[-0.03em] transition-transform duration-900 ease-(--ease-expo) [font-variation-settings:'wdth'_75] aria-[current=page]:text-chene ${
                    open ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className={`mt-auto pt-10 transition-opacity duration-700 ${open ? "opacity-100 delay-500" : "opacity-0"}`}
          >
            <Link href="/contact" onClick={() => setOpen(false)} className="bouton w-full">
              Demander un devis
            </Link>
            <p className="mt-5 text-lin">
              Ou appelez l&apos;atelier au{" "}
              <a
                href={site.phone.href}
                className="lien font-semibold whitespace-nowrap text-sciure"
              >
                {site.phone.display}
              </a>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
