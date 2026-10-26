import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/realisations", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/a-propos", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/mentions-legales", priority: 0.1 },
  ];
  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
