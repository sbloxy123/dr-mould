// Our work (/gallery) page copy. Taken from redesign/reference/our-work-desktop.html
// and our-work-mobile.html. `*Short` is the mobile wording where it differs.

import type { BeforeAfterCategory } from "@/data/before-after";

export const ourWork = {
  title: "Our work",
  lead: "Before and after photos from real jobs across Hertfordshire, Essex and Cambridgeshire.",
  filterLabel: "Filter by type of job",
  allLabel: "All",
  hint: "Drag the handle on a photo to compare",
  ctaTile: {
    eyebrow: "Your home next?",
    title: "Got a mould problem like these?",
    text: "Send us a few photos and we’ll give you a free, no-obligation quote.",
    textShort: "Send us a few photos for a free, no-obligation quote.",
  },
};

// Filter order, as shown in the toolbar.
export const galleryCategories: BeforeAfterCategory[] = [
  "Walls & ceilings",
  "Cupboards & wardrobes",
  "Brickwork",
];
