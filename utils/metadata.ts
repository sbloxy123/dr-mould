import type { Metadata } from "next";
import { site } from "@/data/site";

// Per-page metadata: title, description, a canonical URL for this page, and
// matching Open Graph tags. Open Graph is set in full here because a page's
// `openGraph` replaces the layout's rather than merging with it.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "en_GB",
      type: "website",
      images: "/opengraph-image.png",
    },
  };
}
