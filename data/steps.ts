// Home page "How it works" steps. `bodyShort` is the mobile copy.

export type Step = {
  title: string;
  body: string;
  bodyShort: string;
};

export const stepsIntro = {
  eyebrow: "How it works",
  title: "Simple, from the first photo",
};

export const steps: Step[] = [
  {
    title: "Send us a few photos",
    body: "Use the quote form or give us a call. Photos help us give you an idea straight away.",
    bodyShort:
      "Use the quote form or give us a call. Photos help us give you an idea straight away.",
  },
  {
    title: "Free, no-obligation quote",
    body: "A clear price with no pressure. We’ll explain what we think is causing it.",
    bodyShort:
      "A clear price with no pressure, plus what we think is causing it.",
  },
  {
    title: "We remove & treat",
    body: "Carried out safely in full PPE. We’ll let you know when to step out and how long to air the room.",
    bodyShort:
      "Carried out safely in full PPE. We’ll say when to step out and how long to air the room.",
  },
  {
    title: "Keep it from coming back",
    body: "Practical tips for your home: ventilation, humidity, leaks and insulation.",
    bodyShort:
      "Practical tips for your home: ventilation, humidity, leaks and insulation.",
  },
];
