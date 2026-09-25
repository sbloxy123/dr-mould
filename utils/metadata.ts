import type { Metadata } from "next";
import { site } from "@/data/site";

// Shared social sharing image (1200 x 630). Rendered from redesign/og-image.html.
// Rename the file when it changes, so Facebook and LinkedIn don't keep
// showing their cached copy of the old one.
export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Dr Mould: mould removal and treatment in Hertfordshire, Essex and Cambridgeshire, with before and after photos of a mouldy wardrobe",
};

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
      images: [ogImage],
    },
  };
}
