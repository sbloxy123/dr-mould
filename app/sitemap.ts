import { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
    },
    {
      url: `${site.url}/information`,
      lastModified: new Date(),
    },
    {
      url: `${site.url}/gallery`,
      lastModified: new Date(),
    },
    {
      url: `${site.url}/contact`,
      lastModified: new Date(),
    },
  ];
}
