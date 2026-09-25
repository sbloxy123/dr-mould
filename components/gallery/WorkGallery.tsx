"use client";

import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import BeforeAfterSlider from "@/components/ImageSlider";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { beforeAfter, type BeforeAfterCategory } from "@/data/before-after";
import { galleryCategories, ourWork } from "@/data/gallery";
import { site } from "@/data/site";
import { cn } from "@/utils/cn";

type Filter = "all" | BeforeAfterCategory;

// Tailwind needs the full class names, so map the span rather than build it.
const ctaSpan: Record<1 | 2 | 3, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
};

// The CTA tile fills whatever is left of the last 3-column row.
function spanFor(count: number): 1 | 2 | 3 {
  const remainder = count % 3;
  return remainder === 0 ? 3 : ((3 - remainder) as 1 | 2);
}

export default function WorkGallery() {
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: ourWork.allLabel, count: beforeAfter.length },
    ...galleryCategories.map((category) => ({
      value: category,
      label: category,
      count: beforeAfter.filter((item) => item.category === category).length,
    })),
  ];

  const items =
    filter === "all"
      ? beforeAfter
      : beforeAfter.filter((item) => item.category === filter);

  return (
    <section className="pb-12 pt-5 lg:pb-28 lg:pt-12">
      <Container className="flex flex-col gap-7 lg:gap-9">
        {/* Filter toolbar */}
        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-8 lg:border-b lg:border-sand-rule lg:pb-7">
          <div
            role="group"
            aria-label={ourWork.filterLabel}
            className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 md:-mx-8 md:px-8 lg:mx-0 lg:inline-flex lg:w-auto lg:gap-1 lg:overflow-visible lg:rounded-full lg:border lg:border-sand-rule lg:bg-paper lg:p-[5px]"
          >
            {filters.map(({ value, label, count }) => {
              const active = value === filter;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(value)}
                  className={cn(
                    "flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] pl-4 pr-3 text-sm font-semibold transition-colors lg:gap-2.5 lg:border-0 lg:pl-5 lg:pr-4 lg:text-[15px]",
                    active
                      ? "border-forest-700 bg-forest-700 text-paper"
                      : "border-sand-rule bg-paper text-ink-900 hover:bg-sage-100 lg:bg-transparent"
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full px-1.5 text-xs font-bold leading-none lg:h-6 lg:min-w-[24px] lg:px-[7px] lg:text-[13px]",
                      active ? "bg-paper/[0.18] text-paper" : "bg-sand-100 text-ink-500"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="flex items-center gap-2 text-sm text-ink-500 lg:gap-2.5 lg:text-[15px]">
            <span
              aria-hidden
              className="flex text-forest-700 lg:h-8 lg:w-8 lg:items-center lg:justify-center lg:rounded-full lg:border lg:border-sand-rule lg:bg-paper"
            >
              <ChevronsLeftRight size={16} strokeWidth={2.2} />
            </span>
            {ourWork.hint}
          </p>
        </div>

        <p role="status" className="sr-only">
          Showing {items.length} of {beforeAfter.length} jobs
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
          {items.map((item, index) => (
            <figure key={item.slug} className="flex flex-col gap-2.5 lg:gap-3.5">
              <BeforeAfterSlider
                title={item.title}
                before={item.beforeImage}
                after={item.afterImage}
                beforeAlt={item.beforeAlt}
                afterAlt={item.afterAlt}
                sizes="(min-width: 1280px) 379px, (min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                priority={index === 0}
              />
              <figcaption className="flex flex-col gap-0.5 lg:gap-1">
                <span className="font-display text-xl text-forest-900 lg:text-[22px]">
                  {item.title}
                </span>
                <span className="text-sm text-ink-500 lg:text-[15px]">
                  {item.category}
                  {item.town && ` · ${item.town}`}
                </span>
              </figcaption>
            </figure>
          ))}

          {/* CTA tile: fills the rest of the last row on desktop */}
          <aside
            className={cn(
              "mt-4 flex flex-col gap-3.5 rounded-[22px] bg-forest-700 px-5 py-7 md:col-span-2 lg:mt-0 lg:min-h-[379px] lg:justify-between lg:gap-7 lg:rounded-[18px] lg:p-10",
              ctaSpan[spanFor(items.length)]
            )}
          >
            <div className="flex flex-col gap-3.5">
              <Eyebrow tone="dark" className="hidden lg:block">
                {ourWork.ctaTile.eyebrow}
              </Eyebrow>
              <h2 className="max-w-[420px] font-display text-[28px] font-medium leading-[1.12] text-paper lg:text-4xl">
                {ourWork.ctaTile.title}
              </h2>
              <p className="max-w-[420px] text-base leading-[1.55] text-mist-200 lg:text-[17px]">
                <span className="lg:hidden">{ourWork.ctaTile.textShort}</span>
                <span className="hidden lg:inline">{ourWork.ctaTile.text}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" variant="on-dark" className="w-full lg:w-auto">
                Get a free quote
              </Button>
              <Button
                href={site.phoneHref}
                variant="outline-on-dark"
                className="hidden lg:inline-flex"
              >
                Call {site.phoneDisplay}
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
