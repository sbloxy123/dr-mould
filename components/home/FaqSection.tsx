import FaqList from "@/components/FaqList";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqIntro } from "@/data/home";
import { faq } from "@/data/information";

export default function FaqSection() {
  return (
    <section id="faq" className="py-14 lg:py-28">
      <Container className="grid gap-[18px] lg:grid-cols-3 lg:gap-16">
        <Reveal className="flex flex-col lg:gap-4">
          <SectionHeading eyebrow={faqIntro.eyebrow} title={faqIntro.title} />
          <p className="hidden text-[17px] leading-[1.6] text-ink-700 lg:block">
            {faqIntro.intro}
          </p>
        </Reveal>
        <Reveal className="lg:col-span-2">
          <FaqList items={faq} />
        </Reveal>
      </Container>
    </section>
  );
}
