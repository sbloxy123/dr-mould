import Link from "next/link";
import { Phone } from "lucide-react";
import BeforeAfterPair from "@/components/BeforeAfterPair";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { getBeforeAfter } from "@/data/before-after";
import { hero } from "@/data/home";
import { site } from "@/data/site";

export default function Hero() {
  const featured = getBeforeAfter(hero.featuredWork);

  return (
    <section data-slot="hero" className="pb-8 pt-6 lg:pb-24 lg:pt-[88px]">
      <Container className="grid gap-4 lg:grid-cols-2 lg:items-center lg:gap-[72px]">
        <div data-slot="hero-content" className="flex flex-col gap-4 lg:gap-7">
          <span data-slot="hero-chip" className="self-start rounded-full bg-sage-100 px-3 py-1.5 text-[13px] font-semibold text-forest-700 lg:px-3.5 lg:py-2 lg:text-sm">
            {hero.chip}
          </span>
          <h1 data-slot="hero-title" className="font-display text-4xl font-medium leading-[1.08] tracking-[-0.015em] text-forest-900 lg:text-[64px] lg:leading-[1.04] lg:tracking-[-0.02em]">
            {hero.titleLines[0]}{" "}
            <span className="lg:block">{hero.titleLines[1]}</span>
          </h1>
          <p data-slot="hero-lead" className="max-w-[540px] text-[17px] leading-[1.55] text-ink-700 lg:text-xl lg:leading-[1.6]">
            <span className="lg:hidden">{hero.leadShort}</span>
            <span className="hidden lg:inline">{hero.lead}</span>
          </p>
          <div data-slot="hero-actions" className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:gap-3.5">
            <Button href="#quote" size="lg" fullWidth className="lg:w-auto">
              <span className="lg:hidden">{hero.primaryCtaShort}</span>
              <span className="hidden lg:inline">{hero.primaryCta}</span>
            </Button>
            <Button
              href={site.phoneHref}
              variant="outline"
              size="lg"
              fullWidth
              className="lg:w-auto"
            >
              <Phone size={18} strokeWidth={2} aria-hidden className="lg:hidden" />
              Call {site.phoneDisplay}
            </Button>
          </div>
        </div>

        <figure data-slot="hero-featured" className="mt-1 flex flex-col gap-2.5 lg:mt-0 lg:gap-3.5 lg:rounded-3xl lg:bg-paper lg:p-4 lg:shadow-hero">
          <BeforeAfterPair
            before={featured.beforeImage}
            after={featured.afterImage}
            beforeAlt={featured.beforeAlt}
            afterAlt={featured.afterAlt}
            heightClassName="h-[200px] md:h-[300px] lg:h-[400px]"
            size="lg"
            sizes="(min-width: 1024px) 300px, 50vw"
            priority
          />
          <figcaption className="flex items-center justify-between gap-4 text-sm text-ink-500 lg:px-1.5 lg:pb-1 lg:text-[15px]">
            <span>
              <strong className="font-semibold text-ink-900">
                {featured.title}
              </strong>{" "}
              · {hero.featuredCaption}
            </span>
            <Link
              href="/gallery"
              className="hidden font-semibold text-forest-700 transition-colors hover:text-leaf-600 lg:inline"
            >
              {hero.galleryLink}
            </Link>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
