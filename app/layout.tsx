import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { LocalBusiness, WithContext } from "schema-dts";
import GoogleAnalytics from "@/components/GoogleAnalytics";

import type { Metadata } from "next";
import { Fraunces, Figtree } from "next/font/google";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCallBar from "@/components/layout/MobileCallBar";
import CookieBanner from "@/components/CookieBanner";
import { site } from "@/data/site";
import { ogImage } from "@/utils/metadata";

// Redesign fonts: Fraunces for display, Figtree for body and UI.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-display",
});
const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  // Defaults for pages without their own metadata (e.g. the 404 page).
  // Each page sets its own title, description and canonical URL.
  title: "Dr Mould | Mould Removal & Treatment in Hertfordshire, Essex & Cambridgeshire",
  description:
    "We safely remove mould, treat the affected areas and help you tackle what’s causing it, across Hertfordshire, Essex and Cambridgeshire.",
  metadataBase: new URL(site.url),
  openGraph: {
    siteName: site.name,
    locale: "en_GB",
    type: "website",
    images: [ogImage],
  },
  // Pages don't set `twitter`, so they inherit this card type. Next fills the
  // title, description and image in from each page's Open Graph tags.
  twitter: {
    card: "summary_large_image",
  },
  // viewport-fit=cover lets the mobile call bar pad for the iPhone home bar.
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
};
const jsonLd: WithContext<LocalBusiness> = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${site.url}/`,
  name: "Dr Mould - Local Mould Treatment and Cleaning Service",
  description: "Professional mold removal, treatment and cleaning services.",
  url: `${site.url}/`,
  logo: `${site.url}/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hare Street",
    addressLocality: "Buntingford",
    addressRegion: "Hertfordshire",
    addressCountry: "United Kingdom",
    postalCode: "SG9 0EA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "book a mould treatment",
    telephone: site.phoneIntl,
    email: site.email,
  },
  image: [`${site.url}${ogImage.url}`],
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.94868891616687,
    longitude: 0.021126236728081227,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      {
        "@type": "DayOfWeek",
        name: "Monday",
      },
      {
        "@type": "DayOfWeek",
        name: "Tuesday",
      },
      {
        "@type": "DayOfWeek",
        name: "Wednesday",
      },
      {
        "@type": "DayOfWeek",
        name: "Thursday",
      },
      {
        "@type": "DayOfWeek",
        name: "Friday",
      },
    ],
    opens: "08:00",
    closes: "17:30",
  },
  areaServed: "Hertfordshire, Essex, Cambridgeshire",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body
        className={`${fraunces.variable} ${figtree.variable}`}
      >
        {/* Keep analytics before CookieBanner: gtag must exist before the
            banner applies the stored consent. */}
        <GoogleAnalytics GA_MEASUREMENT_ID="G-KSTFZWW3Y6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          data-slot="skip-link"
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-paper focus:px-5 focus:py-3 focus:font-semibold focus:text-forest-700 focus:shadow-soft"
        >
          Skip to content
        </a>
        <TopBar />
        <Header />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
        <CookieBanner />
      </body>
    </html>
  );
}
