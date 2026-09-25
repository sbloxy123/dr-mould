import PageIntro from "@/components/PageIntro";
import { pageMetadata } from "@/utils/metadata";
import WorkGallery from "@/components/gallery/WorkGallery";
import { ourWork } from "@/data/gallery";

export const metadata = pageMetadata({
  title: "Our Work: Before & After Mould Removal | Dr Mould",
  description:
    "Before and after photos from real mould removal jobs across Hertfordshire, Essex and Cambridgeshire.",
  path: "/gallery",
});

export default function OurWorkPage() {
  return (
    <>
      <PageIntro title={ourWork.title} lead={ourWork.lead} crumb="Our work" />
      <WorkGallery />
    </>
  );
}
