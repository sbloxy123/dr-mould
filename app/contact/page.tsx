import QuoteForm from "@/components/Form";
import PageIntro from "@/components/PageIntro";
import Container from "@/components/ui/Container";
import AreasCard from "@/components/contact/AreasCard";
import NextSteps from "@/components/contact/NextSteps";
import QuickContact from "@/components/contact/QuickContact";
import TalkCard from "@/components/contact/TalkCard";
import { contactIntro, formTitle } from "@/data/contact";

export default function ContactPage() {
  return (
    <>
      <PageIntro
        variant="plain"
        titleSize="long"
        title={contactIntro.title}
        lead={contactIntro.lead}
        leadShort={contactIntro.leadShort}
        crumb="Contact"
      />

      <section className="pb-12 lg:pb-28">
        <Container className="lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start lg:gap-12">
          <div>
            <QuickContact />
            <div className="rounded-[20px] border border-sand-200 bg-paper p-[22px] lg:rounded-3xl lg:p-11">
              <h2 className="mb-4 font-display text-2xl font-medium text-forest-900 lg:mb-[26px] lg:text-[28px]">
                {formTitle}
              </h2>
              <QuoteForm variant="full" />
            </div>
          </div>

          <div className="flex flex-col gap-10 pt-10 lg:gap-6 lg:pt-0">
            <TalkCard />
            <NextSteps />
            <AreasCard />
          </div>
        </Container>
      </section>
    </>
  );
}
