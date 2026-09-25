// Home page "What we do" cards. `bodyShort` is the mobile copy.

export type Service = {
  icon: "house" | "search" | "droplet";
  title: string;
  body: string;
  bodyShort: string;
};

export const servicesIntro = {
  eyebrow: "What we do",
  title: "From first spot to long-term fix",
  body: "Mould comes back if the cause isn’t dealt with. That’s why every job covers removal, treatment and practical advice.",
  bodyShort:
    "Mould comes back if the cause isn’t dealt with. Every job covers removal, treatment and practical advice.",
};

export const services: Service[] = [
  {
    icon: "house",
    title: "Mould removal",
    body: "Safe, thorough removal of black mould and other types from walls, ceilings, wardrobes and cupboards, using specialist equipment and full PPE.",
    bodyShort:
      "Safe, thorough removal of black mould and other types from walls, ceilings, wardrobes and cupboards.",
  },
  {
    icon: "search",
    title: "Finding hidden mould",
    body: "Mould can hide behind walls, under floors and in roof spaces. We inspect the problem areas and track down where the damp is coming from.",
    bodyShort:
      "Mould can hide behind walls, under floors and in roof spaces. We inspect and track down where the damp is coming from.",
  },
  {
    icon: "droplet",
    title: "Treatment & prevention",
    body: "We treat affected areas to stop regrowth and give honest advice on ventilation, humidity and insulation so it stays away.",
    bodyShort:
      "We treat affected areas to stop regrowth and advise on ventilation, humidity and insulation so it stays away.",
  },
];
