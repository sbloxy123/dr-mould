import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dr-mould.co.uk",
      lastModified: new Date(),
    },
    {
      url: "https://dr-mould.co.uk/information",
      lastModified: new Date(),
    },
    {
      url: "https://dr-mould.co.uk/gallery",
      lastModified: new Date(),
    },
    {
      url: "https://dr-mould.co.uk/contact",
      lastModified: new Date(),
    },
  ];
}
