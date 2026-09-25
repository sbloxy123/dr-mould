"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { adviceAsideCta, adviceSections } from "@/data/information";
import { cn } from "@/utils/cn";

// A section counts as "current" once its top passes this line.
const ACTIVE_LINE = 0.3; // 30% down the viewport

// Desktop sidebar: sticky "On this page" links plus a small quote card.
export default function AdviceAside() {
  const [active, setActive] = useState(adviceSections[0].id);

  useEffect(() => {
    const elements = adviceSections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    // Pick the last section whose top has scrolled past the active line.
    const update = () => {
      const line = window.innerHeight * ACTIVE_LINE;
      let current = elements[0].id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };

    // The observer fires whenever a section crosses the active line.
    const observer = new IntersectionObserver(update, {
      rootMargin: `0px 0px -${(1 - ACTIVE_LINE) * 100}% 0px`,
    });
    elements.forEach((el) => observer.observe(el));
    update();
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden lg:sticky lg:top-8 lg:flex lg:flex-col lg:gap-7">
      <nav
        aria-label="On this page"
        className="flex flex-col gap-1 border-l-2 border-sand-300"
      >
        <span className="pb-2.5 pl-[18px] text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-500">
          On this page
        </span>
        {adviceSections.map((section) => {
          const current = active === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setActive(section.id)}
              aria-current={current ? "location" : undefined}
              className={cn(
                "-ml-0.5 border-l-2 px-[18px] py-2 text-base transition-colors",
                current
                  ? "border-forest-700 font-semibold text-forest-700"
                  : "border-transparent text-ink-700 hover:text-leaf-600"
              )}
            >
              {section.label}
            </a>
          );
        })}
      </nav>

      <div className="flex flex-col gap-3.5 rounded-[20px] bg-forest-700 p-7">
        <p className="font-display text-[22px] leading-[1.25] text-paper">
          {adviceAsideCta.title}
        </p>
        <p className="text-[15px] leading-[1.6] text-mist-200">
          {adviceAsideCta.body}
        </p>
        <Button href="/contact" variant="on-dark" size="sm" fullWidth>
          Get a free quote
        </Button>
      </div>
    </aside>
  );
}
