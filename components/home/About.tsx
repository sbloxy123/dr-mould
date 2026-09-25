import BeforeAfterSlider from "@/components/ImageSlider";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { getBeforeAfter } from "@/data/before-after";
import { about } from "@/data/home";

// Before/after slider left and text right on desktop; slider first on mobile.
export default function About() {
  const featured = getBeforeAfter(about.featuredWork);

  return (
    <section data-slot="about" className="py-14 lg:pb-28 lg:pt-[120px]">
      <Container className="grid gap-5 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Capped on tablets so the square slider doesn't fill the screen. */}
        <Reveal data-slot="about-media" className="md:max-w-[560px]">
          <BeforeAfterSlider
            title={featured.title}
            before={featured.beforeImage}
            after={featured.afterImage}
            beforeAlt={featured.beforeAlt}
            afterAlt={featured.afterAlt}
            sizes="(min-width: 768px) 560px, 100vw"
          />
        </Reveal>
        <Reveal
          data-slot="about-content"
          className="flex flex-col gap-5 lg:gap-[22px]"
        >
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className="text-[17px] leading-[1.65] text-ink-700 lg:text-lg lg:leading-[1.7]"
            >
              <span className="lg:hidden">{about.paragraphsShort[index]}</span>
              <span className="hidden lg:inline">{paragraph}</span>
            </p>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
