import PageIntro from "@/components/PageIntro";
import CtaBand from "@/components/CtaBand";
import FaqSection from "@/components/FaqSection";
import Container from "@/components/ui/Container";
import AdviceAside from "@/components/advice/AdviceAside";
import JumpChips from "@/components/advice/JumpChips";
import Causes from "@/components/advice/Causes";
import ProfessionalHelp from "@/components/advice/ProfessionalHelp";
import Removal from "@/components/advice/Removal";
import Tips from "@/components/advice/Tips";
import {
  adviceCtaBand,
  adviceFaqIntro,
  adviceIntro,
} from "@/data/information";

export default function MouldAdvicePage() {
  return (
    <>
      <PageIntro
        title={adviceIntro.title}
        lead={adviceIntro.lead}
        leadShort={adviceIntro.leadShort}
        crumb="Mould advice"
      />

      <section className="pb-14 lg:pb-[104px] lg:pt-[88px]">
        <Container className="lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-24">
          <AdviceAside />
          <div>
            <JumpChips />
            <div className="flex max-w-[800px] flex-col gap-14 pt-12 lg:gap-24 lg:pt-0">
              <Causes />
              <ProfessionalHelp />
              <Removal />
            </div>
          </div>
        </Container>
      </section>

      <Tips />
      <FaqSection intro={adviceFaqIntro} headingSize="compact" />
      <CtaBand title={adviceCtaBand.title} body={adviceCtaBand.body} />
    </>
  );
}
