import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/Navbar";
import type { Metadata } from "next";
import { Inter, Mulish, Poppins, Patua_One } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const mulish = Mulish({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-mulish",
});
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
const patua = Patua_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-patua",
});
export const metadata: Metadata = {
  title: "Dr Mould",
  description: "Your Trusted Mould Treatment Solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body
        className={`${mulish.variable}  ${poppins.variable} ${patua.variable}`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
