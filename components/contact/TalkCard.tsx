import { Clock, Mail, Phone } from "lucide-react";
import { talkCard } from "@/data/contact";
import { site } from "@/data/site";

const iconCircle =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper/[0.12] text-gold-400";

// Desktop only: the green "Prefer to talk?" card at the top of the sidebar.
export default function TalkCard() {
  return (
    <section data-slot="talk-card" className="hidden flex-col gap-[22px] rounded-3xl bg-forest-700 p-9 text-linen lg:flex">
      <h2 className="font-display text-[28px] font-medium text-paper">
        {talkCard.title}
      </h2>
      <a
        href={site.phoneHref}
        className="flex items-center gap-3.5 text-2xl font-semibold text-paper transition-colors hover:text-gold-400"
      >
        <span className={iconCircle}>
          <Phone size={20} strokeWidth={2} aria-hidden />
        </span>
        {site.phoneDisplay}
      </a>
      <a
        href={site.emailHref}
        className="flex items-center gap-3.5 text-[17px] text-paper transition-colors hover:text-gold-400"
      >
        <span className={iconCircle}>
          <Mail size={20} strokeWidth={2} aria-hidden />
        </span>
        <span className="break-all">{site.email}</span>
      </a>
      <p className="flex items-center gap-3.5 text-[17px]">
        <span className={iconCircle}>
          <Clock size={20} strokeWidth={2} aria-hidden />
        </span>
        {site.hoursLong}
      </p>
    </section>
  );
}
