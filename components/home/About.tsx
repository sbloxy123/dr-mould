import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { about } from "@/data/home";
import { site } from "@/data/site";
import { cn } from "@/utils/cn";

// Text-only until `site.aboutImage` is set, then image left and text right.
export default function About() {
  const image = site.aboutImage;

  return (
    <section className="py-14 lg:pb-28 lg:pt-[120px]">
      <Container
        className={cn(
          "grid gap-5",
          image ? "lg:grid-cols-2 lg:items-center lg:gap-20" : undefined
        )}
      >
        {image && (
          <Reveal>
            <div className="relative h-60 overflow-hidden rounded-[18px] lg:h-[480px] lg:rounded-3xl">
              <Image
                src={image}
                alt={about.imageAlt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        )}
        <Reveal
          className={cn(
            "flex flex-col gap-5 lg:gap-[22px]",
            !image && "max-w-[760px]"
          )}
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
