import FaqList from "@/components/FaqList";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqIntro } from "@/data/home";
import { faq } from "@/data/information";

type FaqSectionProps = {
  // The line under the heading (desktop only). Defaults to the home page copy.
  intro?: string;
  // Heading size: the Mould advice page uses the 30px mobile heading.
  headingSize?: "default" | "compact";
};

// Shared FAQ block (id="faq"), used on the home and Mould advice pages.
export default function FaqSection({
  intro = faqIntro.intro,
  headingSize = "default",
}: FaqSectionProps) {
  return (
    <section data-slot="faq-section" id="faq" className="py-14 lg:py-28">
      <Container className="grid gap-[18px] lg:grid-cols-3 lg:gap-16">
        <Reveal data-slot="faq-section-header" className="flex flex-col lg:gap-4">
          <SectionHeading
            eyebrow={faqIntro.eyebrow}
            title={faqIntro.title}
            size={headingSize}
          />
          <p className="hidden text-[17px] leading-[1.6] text-ink-700 lg:block">
            {intro}
          </p>
        </Reveal>
        <Reveal className="lg:col-span-2">
          <FaqList items={faq} />
        </Reveal>
      </Container>
    </section>
  );
}
