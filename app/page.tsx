import Hero from "@/components/home/Hero";
import ProofBar from "@/components/ProofBar";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import HowItWorks from "@/components/home/HowItWorks";
import RecentWork from "@/components/home/RecentWork";
import Reviews from "@/components/home/Reviews";
import QuotePanel from "@/components/home/QuotePanel";
import FaqSection from "@/components/FaqSection";

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
