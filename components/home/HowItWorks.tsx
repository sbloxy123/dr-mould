import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { steps, stepsIntro } from "@/data/steps";

export default function HowItWorks() {
  return (
    <section data-slot="how-it-works" className="py-14 lg:py-28">
      <Container className="flex flex-col gap-6 lg:gap-14">
        <Reveal>
          <SectionHeading
            eyebrow={stepsIntro.eyebrow}
            title={stepsIntro.title}
            className="lg:items-center lg:text-center"
          />
        </Reveal>
        <ol data-slot="how-it-works-steps" className="flex flex-col gap-5 lg:grid lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal
                data-slot="how-it-works-step"
                delay={index * 0.08}
                className="flex gap-4 border-t-2 border-forest-700 pt-4 lg:flex-col lg:gap-3 lg:pt-6"
              >
                <span
                  aria-hidden
                  className="font-display text-[34px] leading-none text-gold-600 lg:text-[40px]"
                >
                  {index + 1}
                </span>
                <span className="flex flex-col gap-1.5 lg:gap-3">
                  <h3 className="text-[19px] font-semibold leading-snug text-forest-900 lg:text-xl">
                    {step.title}
                  </h3>
                  <p className="text-base leading-[1.55] text-ink-700 lg:leading-[1.6]">
                    <span className="lg:hidden">{step.bodyShort}</span>
                    <span className="hidden lg:inline">{step.body}</span>
                  </p>
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
