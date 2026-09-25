# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check (next/core-web-vitals)
```

No test suite is configured. Node is pinned to `24.x` in `package.json` so Vercel and local builds match.

## Environment Variables

Required in `.env.local`, and enabled for both Production and Preview in Vercel:

```
GOOGLE_EMAIL=           # Gmail address for sending contact form emails
GOOGLE_PASSWORD=        # Gmail app password (not account password)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=   # Unsigned upload preset used by the browser
CLOUDINARY_CLOUD_NAME=                  # Server-side; only used by the dead signature handler (see below)
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Architecture

Next.js 13.4 App Router site for Dr Mould, a mould removal business based in Hare Street, Buntingford, serving Hertfordshire, Essex and Cambridgeshire. `@/*` maps to the repo root. The 2026 redesign brief (spec, reference renders, screenshots) lives in `redesign/`.

**Pages:** `/` (home), `/information` (labelled "Mould advice"), `/gallery` (labelled "Our work"), `/contact`, plus `app/not-found.tsx`. The URLs predate the redesign and must not change. `/information` keeps an `id="mould-removal-section"` anchor because old links point to it. Any new page must also be added to the hardcoded list in `app/sitemap.ts`.

**Layout** (`app/layout.tsx`): skip link, `TopBar` (desktop only), `Header` (client; CSS-transition mobile menu), `<main id="main">`, `Footer`, `MobileCallBar` (below `lg`; a single call button on `/contact`), `CookieBanner`. Also holds the fonts, default metadata and the Schema.org `HomeAndConstructionBusiness` JSON-LD.

**Components:**
- `components/ui/`: primitives. `Container` (1200px column), `Button` (variants `primary`, `outline`, `on-dark`, `outline-on-dark`, `text`; renders `Link`, `<a>` or `<button>`), `SectionHeading` and `Eyebrow`, `Reveal` (one-time fade-and-rise; don't wrap above-the-fold content, it starts hidden until hydrated).
- `components/layout/`: the site shell above.
- `components/home/`, `components/advice/`, `components/gallery/`, `components/contact/`: sections for each page.
- Shared at the top level: `PageIntro` (breadcrumb, H1, lead), `CtaBand`, `FaqSection` and `FaqList` (native `<details>`), `ProofBar`, `BeforeAfterPair` (static pair), `ImageSlider` (the draggable, keyboard-accessible before/after slider), `Form` (the quote form), `CookieBanner`, `GoogleAnalytics`, `Email`.

**Content:** page copy lives in typed data files, not in components. Where the mobile design uses shorter wording, it's stored alongside in a `...Short` field and swapped with `lg:hidden` / `hidden lg:inline`.
- `data/site.ts`: phone, email, hours, areas, base, nav links.
- `data/home.ts`, `data/services.ts`, `data/steps.ts`: home page copy. `about.featuredWork` picks the gallery entry shown in the About section's before/after slider.
- `data/reviews.ts`: customer reviews. The home Reviews section only renders when this list is non-empty.
- `data/information.ts`: Mould advice page copy, and the shared `faq` list.
- `data/before-after.ts`: gallery entries (images under `public/before-after-square/`, `category`, optional `town`, alt text). The home hero, About and Recent work pick entries by slug.
- `data/gallery.ts`, `data/contact.ts`: Our work and Contact page copy.

**Contact form flow:**
1. `components/Form.tsx` is a client component with Formik + Zod validation (`utils/validations.tsx`; only name, email and message are validated). A `variant` prop picks `compact` (home quote panel) or `full` (contact page). Images are uploaded from the browser directly to Cloudinary's REST upload endpoint using the unsigned `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` (folder `contact_form_uploads`, max 5 images). The returned `secure_url`s are held in local state, not in Formik values.
2. On submit, it POSTs JSON to `/api/contact` (`app/api/contact/route.tsx`) with the form values and image URLs. The field names `name`, `email`, `phone`, `address` and `message` are relied on by the route and the email template.
3. The route renders `components/Email.tsx` (react-email) and sends it via nodemailer over Gmail SMTP (`utils/nodemailer.tsx`). From and to are both `GOOGLE_EMAIL`. Send errors are only logged; the route always returns 200, so the client shows a success toast even if the email failed.

**Dead code to be aware of:** `app/api/cloudinary-signature.ts` is a Pages Router (`NextApiRequest`) handler sitting inside the App Router tree, so it is never routed. It and `utils/cloudinary.ts` are the only consumers of the server-side `CLOUDINARY_*` vars.

**Styling:** Tailwind 3.3 with the design tokens in `tailwind.config.js`: `forest`, `leaf`, `sage`, `linen` (page background), `paper` (cards), `sand` (borders), `ink` (text), `gold`, `amber` (health note), `mist` (text on dark green), `danger`, plus `shadow-hero`, `shadow-handle`, `shadow-callbar`, `shadow-soft` and `max-w-content`. Breakpoints are Tailwind's defaults: `md` for two-column grids, `lg` for the desktop header and layouts. `app/globals.css` sets the base styles, the focus ring, reduced-motion handling and the react-toastify theme. `utils/cn.ts` joins class names (no tailwind-merge, so don't pass a class that conflicts with a component's own).

**Component names (`data-slot`):** every component's root element carries `data-slot="<kebab-case name>"` (e.g. `quote-panel`, `before-after-slider`), and its main parts use the same prefix (`quote-panel-card`, `quote-panel-form`). Target them instead of ids or `> div` selectors: from a parent with an arbitrary variant (`[&_[data-slot=button]]:w-full`), or in CSS with `[data-slot="quote-panel-card"]`. `Container`, `Button` and `Reveal` default to `container`, `button` and `reveal`; pass `data-slot` to rename one when it's a component's root. Give any new component a `data-slot` too.

**Fonts:** Fraunces (display) and Figtree (body) via `next/font/google` in `app/layout.tsx`, exposed as `--font-display` / `--font-body` and the `font-display` / `font-body` utilities.

**Icons:** `lucide-react`, pinned to exactly `0.577.0`. Version 1.x breaks server components on Next 13.4 (`react.createContext is not a function`), so don't upgrade it while on Next 13.

**Analytics and consent:** `components/GoogleAnalytics.jsx` (measurement ID `G-KSTFZWW3Y6`) loads gtag with `analytics_storage` defaulted to denied. Its page-view tracker reads `useSearchParams`, so it sits in its own `Suspense` boundary; without that every page falls back to client-only rendering. It must render before `CookieBanner`, which stores the choice in localStorage under `cookie_consent` (via `lib/storageHelper.js`, which is `client-only`) and updates gtag consent.

**SEO:** each page exports `metadata` built with `pageMetadata()` from `utils/metadata.ts` (title, description, its own canonical URL and Open Graph tags). `metadataBase` (`https://www.dr-mould.co.uk`) and the JSON-LD are in `app/layout.tsx`. `app/robots.ts` serves `/robots.txt`, which points crawlers at `app/sitemap.ts`; both build their URLs from `site.url`. The social sharing image is `public/og-image.png` (1200 x 630), set once as `ogImage` in `utils/metadata.ts` and used for Open Graph, Twitter (via `summary_large_image`, which Next fills from Open Graph) and the JSON-LD. Its source is `redesign/og-image.html`, which has the command to regenerate it; the logo is `public/logo.svg` (and `logo.png` for JSON-LD), and `app/apple-icon.png` is the touch icon.

## Gotchas

- Keep inputs at 16px text or larger, or iOS zooms in on focus.

**Deployment:** Vercel (`.vercel/project.json` present). Every pushed branch gets a Preview deployment; `master` deploys to dr-mould.co.uk.
