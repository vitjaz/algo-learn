import type { MetadataRoute } from "next";
import { algorithmModules } from "@/lib/algorithms";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://algo-learn.alexeev-blog.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const algorithmPages = Object.keys(algorithmModules).map((slug) => ({
    url: `${SITE_URL}/algorithms/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...algorithmPages,
  ];
}
