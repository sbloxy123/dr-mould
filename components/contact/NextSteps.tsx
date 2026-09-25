import { nextSteps } from "@/data/contact";

// Plain section on mobile, a paper card on desktop.
export default function NextSteps() {
  return (
    <section data-slot="next-steps" className="flex flex-col gap-4 lg:gap-5 lg:rounded-3xl lg:border lg:border-sand-200 lg:bg-paper lg:p-9">
      <h2 className="font-display text-[26px] font-medium text-forest-900">
        {nextSteps.title}
      </h2>
      <ol className="flex flex-col gap-3.5 lg:gap-[18px]">
        {nextSteps.steps.map((step, index) => (
          <li key={step.lead} className="flex gap-3.5 lg:gap-4">
            <span
              aria-hidden
              className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-sage-100 font-bold text-forest-700 lg:h-8 lg:w-8"
            >
              {index + 1}
            </span>
            <p className="text-base leading-[1.5] text-ink-700 lg:leading-[1.55]">
              <strong className="font-semibold text-forest-900">{step.lead}</strong>
              <span className="lg:hidden">{step.bodyShort}</span>
              <span className="hidden lg:inline">{step.body}</span>
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
