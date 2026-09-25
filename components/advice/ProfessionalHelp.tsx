import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { professionalHelp } from "@/data/information";

export default function ProfessionalHelp() {
  return (
    <Reveal>
      <article data-slot="professional-help" id="professional" className="flex flex-col gap-4 lg:gap-[22px]">
        <SectionHeading
          eyebrow={professionalHelp.eyebrow}
          title={professionalHelp.title}
          size="article"
        />
        <p className="hidden text-lg leading-[1.7] text-ink-700 lg:block">
          {professionalHelp.intro}
        </p>
        <ul data-slot="professional-help-list" className="flex flex-col border-t border-sand-300">
          {professionalHelp.items.map((item) => (
            <li
              key={item.lead}
              className="flex gap-3 border-b border-sand-300 py-3.5 lg:gap-4 lg:py-[18px]"
            >
              <Check
                strokeWidth={2.4}
                aria-hidden
                className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600 lg:h-[22px] lg:w-[22px]"
              />
              <span className="text-base leading-[1.55] text-ink-700 lg:text-[17px] lg:leading-[1.6]">
                <span className="lg:hidden">
                  <strong className="font-semibold text-forest-900">
                    {item.leadShort}
                  </strong>
                  {item.bodyShort}
                </span>
                <span className="hidden lg:inline">
                  <strong className="font-semibold text-forest-900">
                    {item.lead}
                  </strong>{" "}
                  {item.body}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}
