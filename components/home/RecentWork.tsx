import BeforeAfterPair from "@/components/BeforeAfterPair";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { getBeforeAfter } from "@/data/before-after";
import { recentWork } from "@/data/home";

export default function RecentWork() {
  const items = recentWork.items.map(getBeforeAfter);

  return (
    <section id="work" className="bg-forest-900 py-14 text-linen lg:py-28">
      <Container className="flex flex-col gap-6 lg:gap-12">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={recentWork.eyebrow}
            title={recentWork.title}
            tone="dark"
          />
          <Button
            href="/gallery"
            variant="outline-on-dark"
            className="hidden lg:inline-flex"
          >
            {recentWork.cta}
          </Button>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-7">
          {items.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.08}>
              <figure className="flex flex-col gap-2.5 lg:gap-3.5">
                <BeforeAfterPair
                  before={item.beforeImage}
                  after={item.afterImage}
                  beforeAlt={item.beforeAlt}
                  afterAlt={item.afterAlt}
                  heightClassName="h-[170px] lg:h-[220px]"
                  size="sm"
                  sizes="(min-width: 1024px) 190px, 50vw"
                />
                <figcaption className="text-base font-semibold text-paper lg:text-[17px]">
                  {item.title}
                  {item.town && (
                    <span className="font-normal text-[#BFD0C5]">
                      {" "}
                      · {item.town}
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Button href="/gallery" variant="outline-on-dark" fullWidth className="lg:hidden">
          {recentWork.cta}
        </Button>
      </Container>
    </section>
  );
}
