// Copy for the Mould advice page (/information) and the shared FAQ.
// Where the mobile design uses shorter wording, it's in a `...Short` field.

export const adviceIntro = {
  title: "Mould advice",
  lead: "Straightforward guidance on what causes mould, when it’s time to call in a professional, and simple ways to keep your home mould-free.",
  leadShort:
    "What causes mould, when to call in a professional, and simple ways to keep your home mould-free.",
};

// "On this page" links (desktop aside) and jump chips (mobile).
export const adviceSections = [
  { id: "causes", label: "What causes mould", chip: "Causes" },
  { id: "professional", label: "When to call a professional", chip: "When to call us" },
  { id: "removal", label: "About mould removal", chip: "Removal" },
  { id: "tips", label: "Reducing mould at home", chip: "Prevention tips" },
  { id: "faq", label: "FAQs", chip: "FAQs" },
];

export const adviceAsideCta = {
  title: "Not sure what you’re dealing with?",
  body: "Send us a couple of photos and we’ll give you a free, no-obligation quote.",
};

export type CauseItem = { title: string; body: string; bodyShort?: string };

export const causes = {
  eyebrow: "The basics",
  title: "What causes mould",
  intro:
    "Mould needs two things: excess moisture, and something organic to feed on. The main causes are:",
  items: [
    {
      title: "High humidity",
      body: "Humid rooms give mould ideal conditions to thrive.",
    },
    {
      title: "Water leaks",
      body: "Leaking pipes, roofs or walls bring in the moisture mould needs.",
    },
    {
      title: "Poor ventilation",
      body: "Without airflow, moisture can’t escape and builds up.",
    },
    {
      title: "Condensation",
      body: "Warm air meeting cold surfaces leaves moisture behind.",
    },
    {
      title: "Organic materials",
      body: "Wood, paper, fabric and even dust act as a food source.",
    },
    {
      title: "Time",
      body: "In the right conditions mould can start within 24–48 hours and spread quickly.",
      bodyShort: "In the right conditions mould can start within 24–48 hours.",
    },
  ] as CauseItem[],
  // Desktop only.
  conclusion:
    "Deal with the underlying cause and you can prevent, or greatly reduce, mould growth.",
};

// Each item renders as "<strong>{lead}</strong> {body}" on desktop and
// "<strong>{leadShort}</strong>{bodyShort}" on mobile. `bodyShort` includes
// its own leading space or comma.
export type ProfessionalItem = {
  lead: string;
  body: string;
  leadShort: string;
  bodyShort: string;
};

export const professionalHelp = {
  eyebrow: "Getting help",
  title: "When to call a professional",
  // Desktop only.
  intro:
    "Small patches can often be handled yourself. It’s worth getting help if:",
  items: [
    {
      lead: "It’s spread widely.",
      body: "Mould covering a large area or several rooms needs a thorough, organised clean-up.",
      leadShort: "It’s spread widely",
      bodyShort: " across a large area or several rooms.",
    },
    {
      lead: "It’s affecting your health.",
      body: "If anyone at home has allergies or breathing problems, safe removal matters.",
      leadShort: "It’s affecting your health",
      bodyShort: ", such as allergies or breathing problems.",
    },
    {
      lead: "You suspect hidden mould.",
      body: "A musty smell but nothing visible can mean mould behind walls, under floors or in ceilings.",
      leadShort: "You suspect hidden mould",
      bodyShort: " behind walls, under floors or in ceilings.",
    },
    {
      lead: "It keeps coming back.",
      body: "Recurring mould usually means the root cause hasn’t been found yet.",
      leadShort: "It keeps coming back",
      bodyShort: ", so the root cause hasn’t been found.",
    },
    {
      lead: "It’s damaged the building.",
      body: "Mould can harm plaster, wood and other materials that may need repair.",
      leadShort: "It’s damaged the building",
      bodyShort: ", like plaster or woodwork.",
    },
    {
      lead: "You’re not sure how to tackle it safely.",
      body: "The right equipment and know-how make a real difference.",
      leadShort: "You’re not sure how",
      bodyShort: " to tackle it safely.",
    },
    {
      lead: "You’d rather save the time.",
      body: "We’ll handle the whole job quickly and properly.",
      leadShort: "You’d rather save the time",
      bodyShort: " and have it done properly.",
    },
  ] as ProfessionalItem[],
};

export const mouldRemoval = {
  eyebrow: "What we do",
  title: "About mould removal",
  paragraphs: [
    {
      text: "We remove harmful mould of all kinds, including black mould (Stachybotrys). It usually comes from leaks, flooding, poor ventilation, weak insulation, high humidity, plumbing problems or poor building techniques.",
      textShort:
        "We remove harmful mould of all kinds, including black mould (Stachybotrys). It usually comes from leaks, flooding, poor ventilation, weak insulation, high humidity or plumbing problems.",
    },
    {
      text: "Mould isn’t always obvious. It can hide behind walls, under floors and in roof spaces, and often only shows once it breaks through the surface or leaves a stain.",
      textShort:
        "Mould can hide behind walls, under floors and in roof spaces, and often only shows once it breaks through the surface.",
    },
  ],
  healthNote: {
    title: "Why it matters for your health",
    body: "Mould exposure is linked to breathing problems, allergies, headaches, tiredness and sore throats. Left alone, it can make rooms unpleasant to live in and more costly to put right.",
    bodyShort:
      "Mould exposure is linked to breathing problems, allergies, headaches, tiredness and sore throats.",
  },
  // Mobile only, after the health note.
  mobileCta: "Send us a photo for a free quote",
};

export type TipItem = {
  title: string;
  body: string;
  bodyShort: string;
  image: string;
  alt: string;
};

export const reduceMould = {
  eyebrow: "Prevention",
  title: "10 ways to reduce mould at home",
  intro:
    "A family of four can release 7–15 litres of water a day just from cooking, showering and breathing. These habits help keep it in check.",
  introShort:
    "A family of four can release 7–15 litres of water a day from cooking, showering and breathing.",
  items: [
    {
      title: "Control humidity",
      body: "Use a dehumidifier in damp rooms and keep humidity between 30% and 50%.",
      bodyShort: "Use a dehumidifier and keep humidity between 30% and 50%.",
      image: "/reduce-mould/dehumidifier.png",
      alt: "Dehumidifier in a room",
    },
    {
      title: "Ventilate",
      body: "Run extractor fans while cooking and showering to clear moist air fast.",
      bodyShort: "Run extractor fans while cooking and showering.",
      image: "/reduce-mould/vent.png",
      alt: "Extractor fan vent",
    },
    {
      title: "Fix leaks promptly",
      body: "Repair leaking pipes, roofs and walls before water can build up.",
      bodyShort: "Repair pipes, roofs and walls before water builds up.",
      image: "/reduce-mould/leak.png",
      alt: "Water-stained ceiling from a leak",
    },
    {
      title: "Insulate properly",
      body: "Insulated walls, windows and pipes mean less condensation.",
      bodyShort: "Insulated walls, windows and pipes mean less condensation.",
      image: "/reduce-mould/insulation.png",
      alt: "Cross-section of an insulated wall",
    },
    {
      title: "Clean regularly",
      body: "Keep bathrooms and kitchens clean and dry so spores can’t settle.",
      bodyShort: "Keep bathrooms and kitchens clean and dry.",
      image: "/reduce-mould/clean.png",
      alt: "Wiping a surface with a cloth",
    },
    {
      title: "Mind your houseplants",
      body: "Overwatering plants adds more moisture to the air than you’d think.",
      bodyShort: "Overwatering adds more moisture than you’d think.",
      image: "/reduce-mould/plants.png",
      alt: "Watering indoor plants",
    },
    {
      title: "Check lofts & basements",
      body: "Make sure they’re ventilated and leak-free, and check them now and then.",
      bodyShort: "Keep them ventilated, leak-free and checked now and then.",
      image: "/reduce-mould/basement.png",
      alt: "Loft space",
    },
    {
      title: "Dry washing outside",
      body: "Where you can’t, use a vented dryer or dehumidifier and open a window.",
      bodyShort: "Or use a vented dryer or dehumidifier and open a window.",
      image: "/reduce-mould/clothes.png",
      alt: "Clothes drying indoors",
    },
    {
      title: "Maintain seals",
      body: "Check seals around doors and windows to keep moisture out.",
      bodyShort: "Check seals around doors and windows.",
      image: "/reduce-mould/window.jpg",
      alt: "Window frame and seal",
    },
    {
      title: "Leave a gap",
      body: "In winter, pull furniture slightly off outside walls so air can circulate.",
      bodyShort: "In winter, pull furniture slightly off outside walls.",
      image: "/reduce-mould/gap.jpg",
      alt: "Gap between furniture and wall",
    },
  ] as TipItem[],
};

export const adviceCtaBand = {
  title: "Still worried about mould?",
  body: "Send us a few photos for a free, no-obligation quote.",
};

export const adviceFaqIntro =
  "Can’t see yours? Give us a ring and we’ll happily help.";

export type FaqItem = {
  id: number;
  question: string;
  answer: string[];
  // Optional closing sentence with a link, rendered as "{prefix} {label}."
  link?: { prefix: string; label: string; href: string };
};

export const faq: FaqItem[] = [
  {
    id: 1,
    question: "Do I have black mould in my home?",
    answer: [
      "To find out if you have black mould or any other type of mould in your home, you should perform a visual inspection. Check areas that are prone to moisture, such as bathrooms, kitchens, basements, and areas with water leaks. Black mould often appears as black or dark green patches and can have a slimy texture.",
      "If you suspect you have mould, it's essential to take it seriously, as mould can have adverse effects on health. Contact us if you're looking to effectively get rid of the mould in your home and help put your mind at ease.",
    ],
  },
  {
    id: 2,
    question: "How do I stop mould coming back?",
    answer: [
      "Preventing mould formation in a home involves taking proactive measures to control moisture and create an environment that is less conducive to mould growth.",

      "Key advice to prevent mould formation includes reducing humidity (efficient bathroom & kitchen extractor fans), improving ventilation (open windows), adding insulation to external-side walls and fixing any leaks.",

      "To put things into perspective, an average family of four can release around 7 to 15 litres of water per day through activities such as cooking, showers, breathing, and perspiration, with cooking and showering being the main contributors to indoor moisture.",
    ],
    link: {
      prefix: "For practical advice, see our",
      label: "10 ways to reduce mould at home",
      href: "/information#tips",
    },
  },
  {
    id: 3,
    question: "What happens on the day of treatment?",
    answer: [
      "For the safety and well-being of our customers, it's recommended to vacate the premises during the mould treatment process. Leaving windows open and ensuring proper ventilation for at least one hour helps disperse any residual fumes or particles. As part of our commitment to safety, we wear full Personal Protective Equipment (PPE), including ventilation masks, while working with our products to ensure a secure and healthy environment for everyone involved.",
    ],
  },
  {
    id: 4,
    question: "How long does it take?",
    answer: [
      "The time frame varies depending on the extent of the mould infestation. We aim to complete the treatment as efficiently as possible without compromising quality.",
    ],
  },
  {
    id: 5,
    question: "What areas do you cover?",
    answer: [
      "We cover Hertfordshire, Cambridgeshire and Essex as our primary service areas. However, we are willing to travel further for the right jobs. Your satisfaction is our priority, and we aim to accommodate your needs to the best of our ability.",
    ],
  },
];
