// Before and after photo pairs. Used by the home page (hero and Recent work)
// and the Our work gallery. Leave `town` out and captions drop " · town".

export type BeforeAfterCategory =
  | "Walls & ceilings"
  | "Cupboards & wardrobes"
  | "Brickwork";

export type BeforeAfterItem = {
  slug: string;
  title: string;
  category: BeforeAfterCategory;
  town?: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
};

export const beforeAfter: BeforeAfterItem[] = [
  {
    slug: "bathroom-ceiling",
    title: "Bathroom ceiling",
    category: "Walls & ceilings",
    beforeImage: "/before-after-square/bathroom-before.jpg",
    afterImage: "/before-after-square/bathroom-after.jpg",
    beforeAlt: "Bathroom ceiling with mould spots, before treatment",
    afterAlt: "Bathroom ceiling clean and mould-free, after treatment",
  },
  {
    slug: "bedroom-wall-corner",
    title: "Bedroom wall corner",
    category: "Walls & ceilings",
    beforeImage: "/before-after-square/bedroom-before.jpg",
    afterImage: "/before-after-square/bedroom-after.jpg",
    beforeAlt: "Bedroom wall corner with mould, before treatment",
    afterAlt: "Bedroom wall corner clean, after treatment",
  },
  {
    slug: "fitted-wardrobe",
    title: "Fitted wardrobe",
    category: "Cupboards & wardrobes",
    beforeImage: "/before-after-square/wardrobe-before.jpg",
    afterImage: "/before-after-square/wardrobe-after.jpg",
    beforeAlt: "Fitted wardrobe covered in black mould, before treatment",
    afterAlt: "The same wardrobe clean and mould-free after treatment",
  },
  {
    slug: "cupboard-under-the-stairs",
    title: "Cupboard under the stairs",
    category: "Cupboards & wardrobes",
    beforeImage: "/before-after-square/cupboard-before.jpg",
    afterImage: "/before-after-square/cupboard-after.jpg",
    beforeAlt:
      "Cupboard under the stairs with mould on the wall, before treatment",
    afterAlt: "Cupboard under the stairs clean, after treatment",
  },
  {
    slug: "brick-feature-wall-1",
    title: "Brick feature wall, room 1",
    category: "Brickwork",
    beforeImage: "/before-after-square/upstand-before.jpg",
    afterImage: "/before-after-square/upstand-after.jpg",
    beforeAlt: "Internal brick feature wall with mould, before treatment",
    afterAlt: "Internal brick feature wall clean, after treatment",
  },
  {
    slug: "brick-feature-wall-2",
    title: "Brick feature wall, room 2",
    category: "Brickwork",
    beforeImage: "/before-after-square/cupboard-left-before-main.png",
    afterImage: "/before-after-square/cupboard-left-after-main.jpg",
    beforeAlt:
      "Brick feature wall in a second room with mould, before treatment",
    afterAlt: "Brick feature wall in a second room clean, after treatment",
  },
  {
    slug: "brick-feature-wall-3",
    title: "Brick feature wall, room 3",
    category: "Brickwork",
    beforeImage: "/before-after-square/pillar-left-main.png",
    afterImage: "/before-after-square/pillar-left-after-main.jpg",
    beforeAlt: "Brick pillar with mould, before treatment",
    afterAlt: "Brick pillar clean, after treatment",
  },
];

export function getBeforeAfter(slug: string): BeforeAfterItem {
  const item = beforeAfter.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Unknown before/after item: ${slug}`);
  return item;
}
