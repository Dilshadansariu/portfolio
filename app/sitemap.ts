import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Single-page portfolio — one entry is correct here. If separate routes are
// added later (e.g. a dedicated /resume or /blog page), add them as
// additional entries in this array.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
