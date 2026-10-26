import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { Cursor } from "@/components/motion/cursor";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { site } from "@/content/site";
import "./globals.css";

// Archivo variable (graisse 100 à 900, largeur 62 % à 125 %), servie depuis le projet.
const archivo = localFont({
  // Le sous-ensemble latin couvre tous les caractères du français.
  src: "./fonts/archivo-latin-standard-normal.woff2",
  style: "normal",
  weight: "100 900",
  display: "swap",
  variable: "--font-archivo",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Atelier Kora, menuiserie et agencement intérieur sur mesure",
    template: "%s | Atelier Kora",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "fr_FR",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#241913",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={archivo.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-chene focus:px-5 focus:py-3 focus:text-noyer"
        >
          Aller au contenu
        </a>
        <Header />
        {/* La page et le pied de page sont dans app/template.tsx (transition de page). */}
        {children}
        <JsonLd />
        <SmoothScroll />
        <Cursor />
      </body>
    </html>
  );
}
