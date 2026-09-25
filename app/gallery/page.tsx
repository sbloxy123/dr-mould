import PageIntro from "@/components/PageIntro";
import WorkGallery from "@/components/gallery/WorkGallery";
import { ourWork } from "@/data/gallery";

export default function OurWorkPage() {
  return (
    <>
      <PageIntro title={ourWork.title} lead={ourWork.lead} crumb="Our work" />
      <WorkGallery />
    </>
  );
}
