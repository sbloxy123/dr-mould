import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

export default function NotFound() {
  return (
    <section data-slot="not-found" className="py-20 lg:py-32">
      <Container className="flex max-w-[760px] flex-col items-start gap-5 lg:gap-6">
        <Eyebrow>404</Eyebrow>
        <h1 className="font-display text-[40px] font-medium leading-[1.05] tracking-[-0.015em] text-forest-900 lg:text-[60px] lg:tracking-[-0.02em]">
          Sorry, we can&rsquo;t find that page
        </h1>
        <p className="text-[17px] leading-[1.55] text-ink-700 lg:text-xl lg:leading-[1.6]">
          The link may be out of date, or the page may have moved. Try the
          home page, or get in touch and we&rsquo;ll help.
        </p>
        <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Get a free quote
          </Button>
        </div>
      </Container>
    </section>
  );
}
