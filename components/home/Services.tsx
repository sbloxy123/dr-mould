import { Droplet, House, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { services, servicesIntro } from "@/data/services";
import type { Service } from "@/data/services";

const icons: Record<Service["icon"], LucideIcon> = {
  house: House,
  search: Search,
  droplet: Droplet,
};

export default function Services() {
  return (
    <section
      id="services"
      className="border-y border-sand-200 bg-paper py-14 lg:py-28"
    >
      <Container className="flex flex-col gap-6 lg:gap-14">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <SectionHeading
            eyebrow={servicesIntro.eyebrow}
            title={servicesIntro.title}
            className="lg:max-w-[760px]"
          />
          <p className="text-base leading-[1.6] text-ink-700 lg:max-w-[420px] lg:text-[17px]">
            <span className="lg:hidden">{servicesIntro.bodyShort}</span>
            <span className="hidden lg:inline">{servicesIntro.body}</span>
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-7">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.title} delay={index * 0.08}>
                <article className="flex h-full flex-col gap-3 rounded-[18px] bg-linen p-6 lg:gap-4 lg:rounded-[20px] lg:p-9">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-forest-700 text-paper lg:h-14 lg:w-14 lg:rounded-2xl">
                    <Icon
                      className="h-6 w-6 lg:h-7 lg:w-7"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </span>
                  <h3 className="font-display text-[23px] font-medium text-forest-900 lg:text-[26px]">
                    {service.title}
                  </h3>
                  <p className="text-base leading-[1.6] text-ink-700 lg:leading-[1.65]">
                    <span className="lg:hidden">{service.bodyShort}</span>
                    <span className="hidden lg:inline">{service.body}</span>
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
