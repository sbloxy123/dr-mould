import { CalendarDays, Check, MapPin, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import { site } from "@/data/site";

type ProofItem = {
  icon: LucideIcon;
  title: string;
  titleShort: string;
  text: string;
  textShort: string;
};

const items: ProofItem[] = [
  {
    icon: CalendarDays,
    title: `Established ${site.established}`,
    titleShort: `Est. ${site.established}`,
    text: "Based in Buntingford",
    textShort: "Buntingford",
  },
  {
    icon: MapPin,
    title: "Local to you",
    titleShort: "Local",
    text: "Herts, Essex & Cambs",
    textShort: "3 counties",
  },
  {
    icon: ShieldCheck,
    title: "Safe & thorough",
    titleShort: "Safe",
    text: "Full PPE & specialist kit",
    textShort: "Full PPE & kit",
  },
  {
    icon: Check,
    title: "Free quotes",
    titleShort: "Free quotes",
    text: "No obligation, from photos",
    textShort: "No obligation",
  },
];

// Four trust points in a card under the hero. 2x2 on mobile, one row on desktop.
export default function ProofBar() {
  return (
    <Container data-slot="proof-bar">
      <section
        data-slot="proof-bar-card"
        aria-label="Why choose Dr Mould"
        className="grid grid-cols-2 gap-x-3.5 gap-y-[18px] rounded-[18px] border border-sand-200 bg-paper p-5 lg:grid-cols-4 lg:gap-7 lg:rounded-[20px] lg:px-9 lg:py-[26px]"
      >
        {items.map(({ icon: Icon, title, titleShort, text, textShort }) => (
          <div key={title} data-slot="proof-bar-item" className="flex items-center gap-2.5 lg:gap-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-sage-100 text-forest-700 lg:h-11 lg:w-11 lg:rounded-xl">
              <Icon
                className="h-[18px] w-[18px] lg:h-[22px] lg:w-[22px]"
                strokeWidth={1.8}
                aria-hidden
              />
            </span>
            <span className="flex flex-col lg:gap-0.5">
              <strong className="text-sm font-semibold text-forest-900 lg:text-base">
                <span className="lg:hidden">{titleShort}</span>
                <span className="hidden lg:inline">{title}</span>
              </strong>
              <span className="text-[13px] text-ink-500 lg:text-sm">
                <span className="lg:hidden">{textShort}</span>
                <span className="hidden lg:inline">{text}</span>
              </span>
            </span>
          </div>
        ))}
      </section>
    </Container>
  );
}
