import { CircleAlert } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { mouldRemoval } from "@/data/information";

export default function Removal() {
  const { healthNote } = mouldRemoval;
  return (
    // Old links point at #mould-removal-section, so keep that id here.
    <div id="mould-removal-section">
      <Reveal>
        <article id="removal" className="flex flex-col gap-4 lg:gap-[22px]">
          <SectionHeading
            eyebrow={mouldRemoval.eyebrow}
            title={mouldRemoval.title}
            size="article"
          />
          {mouldRemoval.paragraphs.map((paragraph) => (
            <p
              key={paragraph.text}
              className="text-base leading-[1.65] text-ink-700 lg:text-lg lg:leading-[1.7]"
            >
              <span className="lg:hidden">{paragraph.textShort}</span>
              <span className="hidden lg:inline">{paragraph.text}</span>
            </p>
          ))}

          <aside className="flex gap-3.5 rounded-[14px] bg-amber-50 p-[18px] lg:gap-[18px] lg:rounded-2xl lg:px-7 lg:py-6">
            <CircleAlert
              strokeWidth={2}
              aria-hidden
              className="h-[22px] w-[22px] shrink-0 text-amber-700 lg:h-[26px] lg:w-[26px]"
            />
            <div className="flex flex-col gap-1 text-amber-900 lg:gap-1.5">
              <strong className="text-base font-semibold lg:text-[17px]">
                {healthNote.title}
              </strong>
              <p className="text-[15px] leading-[1.6] lg:text-base lg:leading-[1.65]">
                <span className="lg:hidden">{healthNote.bodyShort}</span>
                <span className="hidden lg:inline">{healthNote.body}</span>
              </p>
            </div>
          </aside>

          <Button href="/contact" fullWidth className="lg:hidden">
            {mouldRemoval.mobileCta}
          </Button>
        </article>
      </Reveal>
    </div>
  );
}
