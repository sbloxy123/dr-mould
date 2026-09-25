import Hero from "@/components/home/Hero";
import { pageMetadata } from "@/utils/metadata";
import ProofBar from "@/components/ProofBar";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import HowItWorks from "@/components/home/HowItWorks";
import RecentWork from "@/components/home/RecentWork";
import Reviews from "@/components/home/Reviews";
import QuotePanel from "@/components/home/QuotePanel";
import FaqSection from "@/components/FaqSection";

export const metadata = pageMetadata({
  title:
    "Dr Mould | Mould Removal & Treatment in Hertfordshire, Essex & Cambridgeshire",
  description:
    "We safely remove mould, treat the affected areas and help you tackle what’s causing it, across Hertfordshire, Essex and Cambridgeshire.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <ProofBar />
      <About />
      <Services />
      <HowItWorks />
      <RecentWork />
      <Reviews />
      <QuotePanel />
      <FaqSection />
    </>
  );
}
