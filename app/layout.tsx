import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { LocalBusiness, WithContext } from "schema-dts";
import GoogleAnalytics from "@/components/GoogleAnalytics";

import Navbar from "../components/Navbar";
import type { Metadata } from "next";
import { Inter, Mulish, Poppins, Patua_One } from "next/font/google";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({ subsets: ["latin"] });
const mulish = Mulish({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mulish",
});
const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
const patua = Patua_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-patua",
});
export const metadata: Metadata = {
  title: "Dr Mould | Effective Mould Solutions for Healthier Homes",
  description:
    "Proven mould removal and prevention treatments that create mould-free living spaces, promoting a healthier and comfortable home environment",
  metadataBase: new URL("https://www.dr-mould.co.uk"),
  alternates: {
    canonical: "/",
    languages: {
      "en-gb": "/en-gb",
    },
  },

  openGraph: {
    images: "/opengraph-image.png",
  },
};
const jsonLd: WithContext<LocalBusiness> = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://dr-mould.co.uk/",
  name: "Dr Mould - Local Mould Treatment and Cleaning Service",
  description: "Professional mold removal, treatment and cleaning services.",
  url: "https://dr-mould.co.uk/",
  logo: "https://www.dr-mould.co.uk/favicon.ico",
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
    telephone: "+447806615231",
    email: "contact@dr-mould.co.uk",
  },
  image: ["https://www.dr-mould.co.uk/opengraph-image.png?ad00cb6df7787160"],
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
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <GoogleAnalytics GA_MEASUREMENT_ID="G-KSTFZWW3Y6" />

      <body
        className={`${mulish.variable}  ${poppins.variable} ${patua.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
