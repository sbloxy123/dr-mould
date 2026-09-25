import { Clock, Mail, Phone } from "lucide-react";
import QuoteForm from "@/components/Form";
import Container from "@/components/ui/Container";
import { quotePanel } from "@/data/home";
import { site } from "@/data/site";

const iconCircle =
  "flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-paper/[0.12] text-gold-400 lg:h-12 lg:w-12";

// Green quote panel with the compact form. Edge to edge on mobile, a
// rounded panel inside the container on desktop.
export default function QuotePanel() {
  return (
    <section id="quote" className="bg-forest-700 lg:bg-transparent">
      <Container>
        <div className="grid gap-5 py-12 text-linen lg:grid-cols-2 lg:items-center lg:gap-16 lg:rounded-[28px] lg:bg-forest-700 lg:p-[72px]">
          <div className="flex flex-col gap-5 lg:gap-[22px]">
            <h2 className="font-display text-[32px] font-medium leading-[1.12] text-paper lg:text-[46px] lg:leading-[1.1]">
              {quotePanel.title}
            </h2>
            <p className="text-base leading-[1.6] text-mist-200 lg:text-lg">
              <span className="lg:hidden">{quotePanel.textShort}</span>
              <span className="hidden lg:inline">{quotePanel.text}</span>
            </p>
            <ul className="flex flex-col gap-3.5 lg:gap-[18px] lg:pt-3">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 text-[19px] font-semibold text-paper transition-colors hover:text-gold-400 lg:gap-3.5 lg:text-[22px]"
                >
                  <span className={iconCircle}>
                    <Phone className="h-[18px] w-[18px] lg:h-5 lg:w-5" strokeWidth={2} aria-hidden />
                  </span>
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="flex items-center gap-3 text-[15px] text-paper transition-colors hover:text-gold-400 lg:gap-3.5 lg:text-lg"
                >
                  <span className={iconCircle}>
                    <Mail className="h-[18px] w-[18px] lg:h-5 lg:w-5" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="break-all">{site.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-base text-paper lg:gap-3.5 lg:text-lg">
                <span className={iconCircle}>
                  <Clock className="h-[18px] w-[18px] lg:h-5 lg:w-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="lg:hidden">{site.hours}</span>
                <span className="hidden lg:inline">{site.hoursLong}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-[18px] bg-paper p-[22px] text-ink-900 lg:rounded-[20px] lg:p-9">
            <QuoteForm variant="compact" />
          </div>
        </div>
      </Container>
    </section>
  );
}
