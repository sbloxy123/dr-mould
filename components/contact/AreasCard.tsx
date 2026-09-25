import { areasCard } from "@/data/contact";
import { site } from "@/data/site";

// Plain section on mobile, an outlined card on desktop.
export default function AreasCard() {
  return (
    <section data-slot="areas-card" className="flex flex-col gap-3.5 lg:gap-4 lg:rounded-3xl lg:border lg:border-sand-200 lg:px-9 lg:py-8">
      <h2 className="font-display text-[22px] font-medium text-forest-900">
        {areasCard.title}
      </h2>
      <ul className="flex flex-wrap gap-2">
        {site.areas.map((area) => (
          <li
            key={area}
            className="rounded-full bg-sage-100 px-3 py-2 text-sm font-semibold text-forest-700 lg:px-3.5 lg:text-[15px]"
          >
            {area}
          </li>
        ))}
      </ul>
      <p className="text-[15px] leading-[1.55] text-ink-500">
        Based in {site.base}. {areasCard.note}
      </p>
    </section>
  );
}
