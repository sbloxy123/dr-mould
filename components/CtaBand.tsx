import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/data/site";

type CtaBandProps = {
  title: string;
  body: string;
};

// Green call-to-action panel near the foot of a page. Mobile shows only the
// quote button; the call bar already offers the phone number there.
export default function CtaBand({ title, body }: CtaBandProps) {
  return (
    <Container className="mb-12 lg:mb-[104px]">
      <Reveal>
        <section className="flex flex-col gap-3.5 rounded-[22px] bg-forest-700 px-5 py-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:rounded-[28px] lg:px-16 lg:py-14">
          <div className="flex flex-col gap-3.5 lg:gap-2.5">
            <h2 className="font-display text-[28px] font-medium leading-[1.12] text-paper lg:text-[38px] lg:leading-[1.1]">
              {title}
            </h2>
            <p className="text-base leading-[1.55] text-mist-200 lg:text-lg">
              {body}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 lg:flex-row">
            <Button
              href="/contact"
              variant="on-dark"
              className="w-full lg:w-auto lg:text-[17px]"
            >
              Get a free quote
            </Button>
            <Button
              href={site.phoneHref}
              variant="outline-on-dark"
              className="hidden lg:inline-flex lg:text-[17px]"
            >
              Call {site.phoneDisplay}
            </Button>
          </div>
        </section>
      </Reveal>
    </Container>
  );
}
