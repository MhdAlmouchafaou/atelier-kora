import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";
import "./globals.css";

// Archivo variable (graisse 100 à 900, largeur 62 % à 125 %), servie depuis le projet.
const archivo = localFont({
  src: [
    { path: "./fonts/archivo-latin-standard-normal.woff2", style: "normal" },
    { path: "./fonts/archivo-latin-ext-standard-normal.woff2", style: "normal" },
  ],
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
    locale: "fr",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#edeeea",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={archivo.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-encre focus:px-4 focus:py-3 focus:text-papier"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd />
      </body>
    </html>
  );
}
