import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { reduceMould } from "@/data/information";

// "10 ways to reduce mould at home". Desktop: 5 x 2 grid of image cards.
// Mobile: a list with a 96px image beside each tip (two columns on tablets).
export default function Tips() {
  return (
    <section
      data-slot="tips"
      id="tips"
      className="border-y border-sand-200 bg-paper py-12 lg:py-[104px]"
    >
      <Container className="flex flex-col gap-4 lg:gap-12">
        <Reveal
          data-slot="tips-header"
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
        >
          <SectionHeading
            eyebrow={reduceMould.eyebrow}
            title={reduceMould.title}
            size="compact"
            className="lg:max-w-[780px] lg:gap-3.5"
          />
          <p className="mb-1 text-base leading-[1.6] text-ink-700 lg:mb-0 lg:max-w-[440px] lg:text-[17px]">
            <span className="lg:hidden">{reduceMould.introShort}</span>
            <span className="hidden lg:inline">{reduceMould.intro}</span>
          </p>
        </Reveal>

        <Reveal>
          <ul data-slot="tips-list" className="grid gap-4 md:grid-cols-2 md:gap-x-8 lg:grid-cols-5 lg:gap-5">
            {reduceMould.items.map((tip) => (
              <li
                key={tip.title}
                data-slot="tip"
                className="flex items-center gap-3.5 lg:flex-col lg:items-stretch lg:gap-3"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl lg:h-[150px] lg:w-full lg:rounded-[14px]">
                  <Image
                    src={tip.image}
                    alt={tip.alt}
                    fill
                    sizes="(min-width: 1024px) 230px, 96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 lg:gap-3">
                  <h3 className="text-[17px] font-semibold text-forest-900">
                    {tip.title}
                  </h3>
                  <p className="text-[15px] leading-[1.5] text-ink-700 lg:leading-[1.55]">
                    <span className="lg:hidden">{tip.bodyShort}</span>
                    <span className="hidden lg:inline">{tip.body}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
