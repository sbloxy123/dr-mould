// Site-wide facts. Edit here and every page picks up the change.

export const site = {
  name: "Dr Mould",
  tagline: "Mould removal & prevention",
  url: "https://www.dr-mould.co.uk",
  phoneDisplay: "07364 233567",
  phoneHref: "tel:07364233567",
  phoneIntl: "+447364233567",
  email: "drmouldservices@gmail.com",
  emailHref: "mailto:drmouldservices@gmail.com",
  hours: "Mon–Fri, 8:00–17:30",
  hoursLong: "Monday to Friday, 8:00–17:30",
  areas: ["Hertfordshire", "Essex", "Cambridgeshire"],
  base: "Hare Street, Buntingford",
  established: 2024,
  designCredit: { label: "Bloxie", href: "https://www.bloxie.co.uk/" },
};

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Our work", href: "/gallery" },
  { label: "Mould advice", href: "/information" },
  { label: "Contact", href: "/contact" },
];
