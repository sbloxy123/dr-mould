// Copy for the Contact page (/contact). Phone, email, hours and areas come
// from data/site.ts. `...Short` fields are the mobile wording.

export const contactIntro = {
  title: "Get a free, no-obligation quote",
  lead: "Tell us a bit about the problem and add a few photos if you can. We’ll come back to you with a clear price, with no pressure.",
  leadShort:
    "Tell us about the problem and add a few photos if you can. We’ll come back with a clear price.",
};

export const formTitle = "Your enquiry";

export const talkCard = {
  title: "Prefer to talk?",
};

// Mobile-only tiles above the form.
export const quickContact = {
  call: { title: "Call us" },
  email: { title: "Email us", note: "Send us a message" },
};

// Rendered as "<strong>{lead}</strong>{body}". `body` includes its own
// leading space.
export type NextStep = { lead: string; body: string; bodyShort: string };

export const nextSteps = {
  title: "What happens next",
  steps: [
    {
      lead: "We review your enquiry",
      body: " and photos, and get back to you as soon as we can.",
      bodyShort: " and get back to you as soon as we can.",
    },
    {
      lead: "We get in touch",
      body: " to talk it through and give you a clear, no-obligation price.",
      bodyShort: " with a clear, no-obligation price.",
    },
    {
      lead: "We book a date",
      body: " that suits you, and let you know how to prepare.",
      bodyShort: " that suits you.",
    },
  ] as NextStep[],
};

export const areasCard = {
  title: "Areas we cover",
  note: "A bit further afield? Just ask.",
};
