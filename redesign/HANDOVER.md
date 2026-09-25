# Dr Mould redesign: build handover

This folder is the full brief for rebuilding the Dr Mould site in the new design. It's written for Claude Code (or any developer) working in this repo.

## What's in this folder

| Path | What it is |
| --- | --- |
| `HANDOVER.md` | This brief: design system, page specs, content changes, build plan, QA checklist. |
| `CLAUDE_CODE_PROMPT.md` | The prompt to paste into Claude Code to start the work. |
| `README.md` | Instructions for Stuart on Git branching, Vercel previews and going live. |
| `reference/*.html` | Static renders of every approved page, desktop and mobile. **They're the visual and copy source of truth.** Open them in a browser (they load images from `../../public`). Read their inline styles for exact colours, sizes and spacing. |
| `screenshots/*.jpg` | The same pages as images, sliced top to bottom (`-01`, `-02`…). Mobile shots are at 2x. |
| `assets/` | New logo files: `logo.svg` (a vector redraw of the original logo), `logo-512.png`, `apple-touch-icon.png` and `favicon-32.png`. |

The reference HTML is **not production code**. It's a flat mock-up with inline styles. Rebuild it properly as React components with Tailwind classes, reusing the existing Next.js app structure.

---

## 1. Ground rules

1. **Work on the `redesign` branch.** Never commit to `master`. (Stuart creates the branch and the `v1-original` tag first. See `README.md`.)
2. **Don't change the enquiry backend.** Leave these working exactly as they are:
   - `app/api/contact/route.tsx`
   - `utils/nodemailer.tsx`
   - `components/Email.tsx` (restyling the email template is out of scope)
   - `utils/cloudinary.ts`
   - `app/api/cloudinary-signature.ts`
   - the environment variables
   - the Formik, Zod and Cloudinary upload logic inside `components/Form.tsx`
   Only the form's markup and styling change.
3. **Keep Google Analytics and the consent logic** (`GoogleAnalytics.jsx`, `lib/gtagHelper.js`, `lib/storageHelper.js`, and the consent behaviour of `CookieBanner.tsx`). Restyle the banner only.
4. **Keep the URLs:** `/`, `/information`, `/gallery` and `/contact`. Only the menu labels change ("Mould advice" for `/information`, "Our work" for `/gallery`). This avoids any SEO loss or need for redirects. Keep the `id="mould-removal-section"` anchor on the Mould advice page, because old links point to it.
5. **Don't upgrade Next.js, React or Tailwind** in this branch. Stay on Next 13.4 and Tailwind 3.3.
6. **Build in phases (section 9).** After each phase run `npm run lint` and `npm run build`, fix any errors, commit, then stop and summarise so Stuart can check the Vercel preview.
7. **Placeholders:** anything in `[square brackets]` in the reference is a placeholder. **Never ship bracketed text.** Section 8 says how to handle each one.

---

## 2. Design system

### Colours

Replace the old `theme_*` colours in `tailwind.config.js` with this palette. Keep the old keys until every component has been migrated, then delete them.

| Token | Hex | Use |
| --- | --- | --- |
| `forest-900` | `#16372A` | Top bar, dark "Recent work" band, footer, heading text |
| `forest-700` | `#1E4A38` | Primary buttons, quote panel, icon tiles, links |
| `leaf-600` | `#2E8357` | Eyebrow labels, active nav underline, link hover, check icons |
| `logo` | `#347D2E` | Logo only |
| `sage-100` | `#E4EEDF` | Chips, icon backgrounds, step number circles |
| `sage-50` | `#F2F7F1` | Photo upload drop zone |
| `linen` | `#F7F3EA` | Page background |
| `paper` | `#FFFDF8` | Header, cards, form panels |
| `sand-200` | `#E6DFCF` | Card borders, header border |
| `sand-300` | `#D9D0BC` | FAQ dividers, filter toolbar rule (`#E0D8C6`) |
| `sand-400` | `#CFC6B2` | Input borders |
| `ink-900` | `#1F2A24` | Primary text |
| `ink-700` | `#3D4A43` | Body copy |
| `ink-500` | `#5A6660` | Muted and caption text (passes 4.5:1 on linen) |
| `gold-400` | `#E3B55B` | "After" tags, eyebrows and icons on dark backgrounds, quote mark |
| `gold-600` | `#B7832F` | Step numbers (large text only) |
| `amber-50` / `amber-900` / `amber-700` | `#FBF1DC` / `#5C3B08` / `#8A5A12` | Health note callout: background / text / icon |
| `mist-200` / `mist-300` | `#D5E0D8` / `#A9BDB0` | Text on dark green (footer, quote panel) |

Also used: `#E9E3D3` (top bar text), `#BFD0C5` (muted captions on the dark band), `#9FB5A7` (upload zone dashed border), and `rgba(22,55,42,0.9)` for the "Before" tag.

### Typography

- **Display:** *Fraunces* (variable, `opsz` axis), weights 500 and 600. Use it for headings, the "Dr Mould" wordmark, card titles, captions on gallery cards and the review quote.
- **Body and UI:** *Figtree*, weights 400, 500, 600 and 700.
- Load both with `next/font/google` in `app/layout.tsx` and expose them as `--font-display` and `--font-body`. Then remove Patua One, Poppins, Mulish and Inter. If Next 13.4's font list is missing Figtree, install `@fontsource/figtree` and import it instead.

| Style | Desktop | Mobile | Notes |
| --- | --- | --- | --- |
| Hero H1 | 64px / 1.04 | 36px / 1.08 | Fraunces 500, tracking −0.02em |
| Page H1 (inner pages) | 60px / 1.05 | 40px / 1.05 | Fraunces 500 |
| Section H2 | 46px / 1.1 | 32px / 1.12 (30px on Mould advice) | Fraunces 500 |
| Card H3 | 26px | 23px | Fraunces 500 |
| Small H3 (steps, tips, causes) | 17–20px | 16–19px | Figtree 600 |
| Eyebrow | 14px | 13px | Figtree 600, uppercase, tracking 0.1em, `leaf-600` (`gold-400` on dark) |
| Lead paragraph | 20px / 1.6 | 17px / 1.55 | `ink-700` |
| Body | 17–18px / 1.65–1.7 | 16–17px | `ink-700` |
| Caption / meta | 14–15px | 13–14px | `ink-500` |
| Buttons | 16–18px, 600 | 16–17px, 600 | |

### Layout and spacing

- Content width is **1200px max**, centred: `mx-auto max-w-[1200px] px-4 md:px-8 xl:px-0`. At 1440px wide this gives the 120px side margins in the reference.
- Vertical section padding is **112px** on desktop and **56px** on mobile. Heading-to-content gap is 48–56px on desktop and 20–24px on mobile.
- Breakpoints: mobile-first. `md` (768px) introduces two-column grids where it makes sense. `lg` (1024px) switches to the desktop header and full desktop layouts. The reference shows 390px and 1440px; interpolate sensibly between them.
- Radii: buttons and chips fully rounded (`rounded-full`); cards 20–24px (18px on mobile); images 12–18px; inputs 10–12px.
- Shadows, used sparingly:
  - Hero photo card: `0 1px 0 #E6DFCF, 0 24px 48px -24px rgba(22,55,42,.35)`
  - Slider handle: `0 4px 14px rgba(22,55,42,.35)`
  - Mobile call bar: `0 -8px 24px -12px rgba(22,55,42,.35)`

### Icons

Use simple 24px outline icons with a 1.8–2.2 stroke. `lucide-react` matches the reference exactly (Phone, Mail, Clock, MapPin, Heart, CalendarDays, ShieldCheck, Check, Search, Droplet, House, ChevronsLeftRight, Upload, Camera, X, Menu, AlertCircle). Adding it is fine, or inline the SVGs. No emoji anywhere.

### Motion

Keep it subtle: a one-time fade-and-rise of about 16px, around 400ms, on section entry. Honour `prefers-reduced-motion`. The current 100px slide-ins are too much; remove them.

### Accessibility, all non-negotiable

- Real `<a>` and `<button>` elements.
- A visible keyboard focus ring (`outline 2px solid #2E8357; outline-offset 2px`).
- Touch targets of at least 44px.
- Every form field has a `<label>`.
- Icon-only buttons get an `aria-label`.
- Meaningful `alt` text on photos.
- `aria-pressed` on filter buttons, `aria-expanded` on the mobile menu button.
- `lang="en-GB"` on `<html>`.

---

## 3. Shared components

Build these first and reuse them everywhere.

| Component | Spec |
| --- | --- |
| **TopBar** | Desktop only (≥`lg`). `forest-900` background, 14px `#E9E3D3` text, 10px vertical padding. Left side: heart icon + "Family-run", then map pin + "Hertfordshire · Essex · Cambridgeshire". Right side: "Mon–Fri, 8:00–17:30". Icons in `gold-400`. |
| **Header** | `paper` background with a `sand-200` bottom border. Desktop is 88px tall: the logo (`/logo.svg`, 48px) and a stacked wordmark ("Dr Mould" in Fraunces 26px/600 over "MOULD REMOVAL & PREVENTION" at 12px, tracking 0.08em, `ink-500`). Then the nav: Home, Services (`/#services`), Our work (`/gallery`), Mould advice (`/information`), Contact (`/contact`), at 16px/500 with a 36px gap. The current page is `forest-700` with a 2px `leaf-600` underline. Then a phone link "07364 233567" with an icon, and a primary pill button "Get a free quote" linking to `/contact`. Mobile is 64px tall: logo 38px plus "Dr Mould" 22px, and a hamburger button. |
| **Mobile menu** | Not drawn in the mock-ups. Build it like this: a panel that drops down under the header (full width, `paper` background, `sand-200` border). Five links in 56px rows with `sand-300` dividers, 17px/600, the current page in `forest-700`. Below them, two full-width buttons: "Call 07364 233567" (outline) and "Get a free quote" (filled). The hamburger becomes an X; use `aria-expanded` and `aria-controls`; Esc closes it; closes on navigation. You can drop `@headlessui/react` and do this with CSS transitions. |
| **Footer** | `forest-900` background. Desktop is a 4-column grid: the brand block spans 2 columns (the logo in a 52px `paper` circle, "Dr Mould" in Fraunces 28px, and the line "Mould removal, treatment and prevention specialists, based in Hare Street, Buntingford. Serving Hertfordshire, Essex and Cambridgeshire."), then "Explore" (Services, Our work, Mould advice, FAQs, Contact), then "Get in touch" (phone, email, hours). Below a hairline: "© {year} Dr Mould. All rights reserved." and "Design & build by Bloxie" (link). On mobile the brand block stacks, then the two link columns side by side. On mobile, add bottom padding of about 120px so the call bar never covers content. |
| **MobileCallBar** | Below `lg` only. Fixed to the bottom, `paper` background, top border, shadow, 12/16/20px padding (add `env(safe-area-inset-bottom)`). Two 52px pill buttons: "Call us" (outline, phone icon, `tel:` link) and "Free quote" (filled, `/contact`). **On `/contact`** show one full-width outline button instead: "Rather talk? Call 07364 233567". |
| **Button** | Variants: `primary` (`forest-700` background, `paper` text), `outline` (1.5px `forest-700` border), `on-dark` (`paper` background, `forest-700` text), `outline-on-dark` (a 1.5px border at 60% of `paper`). Sizes: md is 52px tall, lg is 56–60px. |
| **SectionHeading** | An eyebrow, H2 and optional intro paragraph; can be left- or centre-aligned. |
| **ProofBar** | A card (`paper` background, `sand-200` border, 20px radius). Desktop is a 4-column grid; mobile is 2×2. Each item has a 44px (36px on mobile) `sage-100` icon tile, then bold text over muted text. Items: CalendarDays "Established 2024" / "Based in Buntingford"; MapPin "Local to you" / "Herts, Essex & Cambs"; ShieldCheck "Safe & thorough" / "Full PPE & specialist kit"; Check "Free quotes" / "No obligation, from photos". Mobile uses the short labels shown in the reference ("Est. 2024" / "Buntingford", "Local" / "3 counties", "Safe" / "Full PPE & kit", "Free quotes" / "No obligation"). |
| **BeforeAfterPair** | A static pair of images side by side with a 6–10px gap. The outer corners are rounded; the inner corners are 2–4px. Tags are uppercase 12–13px/600 pills: "Before" (`rgba(22,55,42,.9)` background, `paper` text) and "After" (`gold-400` background, `forest-900` text). Used in the home hero and in Recent work. |
| **BeforeAfterSlider** | Restyle `components/ImageSlider.tsx` and keep its drag logic. The container is square with an 18px radius (16px on mobile) and starts at 50%. A 3px `paper` divider line, and a 44px round `paper` handle with a ChevronsLeftRight icon and the handle shadow. "Before" tag top-left, "After" tag top-right. **Add keyboard support:** a visually hidden `<input type="range" min=0 max=100>` labelled "Compare before and after: {title}" that drives the same position, so arrow keys work. Remove the "SLIDE ME" tag. Use `next/image` with proper `sizes`. |
| **FaqList** | Native `<details>`/`<summary>` (replaces the Material Tailwind accordion). Rows have `sand-300` bottom borders and 24px padding (18px on mobile). The question is 20px/600 (17px on mobile) in `forest-900`, with a "+" (or "−" when open) in `leaf-600` on the right. Answers are 17px/1.65 `ink-700`, max-width 720px. The first item is open by default. Data comes from `faq` in `data/information.ts`. |
| **CtaBand** | A `forest-700` panel with a 28px radius (22px on mobile). An H2 at 38px (28px on mobile), a line of text in `mist-200`, then "Get a free quote" (`on-dark`) and "Call 07364 233567" (`outline-on-dark`). Mobile shows only the quote button. |
| **QuoteForm** | See section 6. |
| **CookieBanner** | Same logic, new look. A `paper` card, `sand-200` border, 16px radius, soft shadow, 15px text: "We use cookies to understand how people use our site." Buttons: "Accept" (primary, small) and "Decline" (text button). Desktop: fixed bottom-left, max-width 420px, 24px from the edges. Mobile: full width minus 16px margins, sitting **above** the call bar (bottom about 88px). |

---

## 4. Pages

Take all copy verbatim from `reference/*.html`. The notes below cover structure and behaviour.

### 4.1 Home (`/`): `home-desktop.html`, `home-mobile.html`

1. **Hero.**
   - Desktop is a 2-column grid with a 72px gap. Left column:
     - The chip "Mould removal & treatment specialists" (`sage-100`)
     - The H1 "Mould gone. / Your home back to how it should be."
     - The lead paragraph
     - Two buttons: "Get a free, no-obligation quote" (primary, jumps to `#quote`) and "Call 07364 233567" (outline)
   - Right column: a hero photo card (`paper`, 24px radius, 16px padding, hero shadow) holding a BeforeAfterPair (the wardrobe images, 400px tall), with a caption row: "**Fitted wardrobe** · cleaned & treated" on the left and a "See more of our work →" link to `/gallery` on the right.
   - On mobile it stacks: chip, H1, paragraph (a shorter version, see the reference), two full-width buttons, then the photo pair (200px tall) with the caption below.
2. **ProofBar**, directly under the hero.
3. **About.** Eyebrow "About us", H2 "Proper treatment, not just a clean-up" and two paragraphs from the reference. **There's no photo yet** (section 8), so render this section as a **single text column** (max-width about 760px, left-aligned inside the container) with no placeholder box. Build it so a photo can be added later by setting one value (for example `ABOUT_IMAGE` in `data/site.ts`): when it's set, switch to the 2-column layout in the reference (image left, 480px tall, 24px radius; text right).
4. **Services** (`id="services"`). A `paper` background band with top and bottom borders. The header row has the eyebrow "What we do" and H2 "From first spot to long-term fix" on the left and a short paragraph on the right. Below it, three cards (`linen` background, 20px radius, 36px padding): a 56px `forest-700` icon tile with a `paper` icon (House, Search, Droplet), a Fraunces H3 and body text. Titles are "Mould removal", "Finding hidden mould" and "Treatment & prevention". On mobile the cards stack.
5. **How it works.** A centred heading ("How it works" / "Simple, from the first photo") over an ordered list of 4 steps. Desktop: 4 columns, each with a 2px `forest-700` top rule, a Fraunces number in `gold-600` at 40px, a Figtree 600 title and body text. Mobile: stacked, with the number to the left of the text.
6. **Recent work** (`id="work"`). `forest-900` band. Eyebrow "Recent work" (`gold-400`), H2 "Real homes, real results", and an outline-on-dark button "View full gallery →" linking to `/gallery`. Below, three BeforeAfterPairs (220px tall; 170px on mobile) for the bathroom ceiling, cupboard under the stairs and bedroom wall corner, each captioned "**Title**" plus " · Town" when a town is known. On mobile the button goes at the bottom, full width.
7. **Reviews: conditional.** Only render this if `data/reviews.ts` has at least one review (it starts empty; see section 8). Desktop layout: the heading on the left (4fr: eyebrow "Reviews", H2 "What our customers say", line "Honest feedback from homes we've treated.") and a featured quote card on the right (7fr: `paper`, 24px radius, 48/56px padding, a `gold-400` quote-mark SVG, the quote in Fraunces 28px (21px on mobile), then a 44px initial circle with "**Name** · Town · Job"). If there's more than one review, show the first as the feature, or rotate through them. Don't add star ratings unless the review really has them.
8. **Quote** (`id="quote"`). Desktop: a `forest-700` panel with a 28px radius, 72px padding, and a 2-column grid with **vertically centred** columns. Left: H2 "Get your free, no-obligation quote", the line of text, and a list of phone, email and hours (48px translucent icon circles, `gold-400` icons). Right: `<QuoteForm variant="compact" />` in a `paper` card. Mobile: an **edge-to-edge** green section (no side margins, no radius, 48px/16px padding) with the heading, text and contact list, then the form card at full width.
9. **FAQ** (`id="faq"`). Desktop: a 3-column grid with the heading block in column 1 (eyebrow "FAQs", H2 "Good questions", line "Can't see yours? Just give us a ring, we're happy to help.") and FaqList spanning columns 2–3. Mobile: stacked.
10. Footer, then the MobileCallBar.

**Remove** from the old home page: the full-screen hero with its gradient overlay, the three coloured `ActionBox` blocks, and the "Mould Removal" `FeatureTopic` text block.

### 4.2 Mould advice (`/information`): `mould-advice-desktop.html`, `mould-advice-mobile.html`

1. **Page intro.** A `paper` band with a bottom border. Breadcrumb "Home / Mould advice", H1 "Mould advice", and the lead paragraph.
2. **Body.** Desktop is a grid of `280px 1fr` with a 96px gap.
   - **Aside** (make it `sticky top-8` on desktop):
     - "On this page" navigation: a left border rule, links to `#causes`, `#professional`, `#removal`, `#tips` and `#faq`. The active link is 600 weight with a 2px `forest-700` left border; update it on scroll with IntersectionObserver.
     - Below it, a small `forest-700` card: "Not sure what you're dealing with?", a line of text, and an `on-dark` button "Get a free quote".
   - **Content** (max-width 800px, 96px between articles):
     - `#causes`: eyebrow "The basics", H2 "What causes mould", intro, then 6 cause cards in a 2-column grid (`paper`, border, 16px radius), then a closing line. **On mobile the cards stay 2 columns.**
     - `#professional`: eyebrow "Getting help", H2 "When to call a professional", intro, then a list of 7 items. Each has a `leaf-600` check icon, a bold lead-in and a sentence, separated by dividers.
     - `#removal` (**also keep `id="mould-removal-section"`**, for example on a wrapper): eyebrow "What we do", H2 "About mould removal", two paragraphs, then the amber health-note callout (AlertCircle icon, "Why it matters for your health", text). On mobile, add a full-width primary button after the callout: "Send us a photo for a free quote".
   - **On mobile** the aside is replaced by a wrap of "jump" chips (`sage-100` pills: Causes, When to call us, Removal, Prevention tips, FAQs) under the intro.
3. **Tips** (`#tips`). A `paper` band. The header row has the eyebrow "Prevention", H2 "10 ways to reduce mould at home" (max-width about 780px so it stays on one line) and a paragraph on the right about the 7–15 litres a day. Desktop: a **5 × 2 grid**, each tip with a 150px-tall image (14px radius), a 17px/600 title and 15px text. Mobile: a list, each item a 96px square image on the left with the title and text on the right. Images are the existing `/public/reduce-mould/*`.
4. **FAQ**: same component and layout as the home page.
5. **CtaBand**: "Still worried about mould?"
6. Footer, then the MobileCallBar.

### 4.3 Our work (`/gallery`): `our-work-desktop.html`, `our-work-mobile.html`

1. **Page intro.** A `paper` band: breadcrumb, H1 "Our work", and the lead "Before and after photos from real jobs across Hertfordshire, Essex and Cambridgeshire."
2. **Gallery.** A `linen` background, 48px top padding.
   - **Filter toolbar.** This is a client component.
     - **Desktop:** a single row with a `sand` bottom rule. On the left, a segmented control: a `paper` pill container with a 1px border and 5px padding, holding 4 buttons (All, Walls & ceilings, Cupboards & wardrobes, Brickwork). Each button is 44px tall with the label plus a small count badge. The active button is `forest-700` with `paper` text and a translucent badge; inactive buttons are transparent with a `#EFE9DC` badge. On the right, a hint: a small circular ChevronsLeftRight icon plus "Drag the handle on a photo to compare".
     - **Mobile:** the chips sit in one row that **scrolls sideways** (`overflow-x-auto`, full bleed to the screen edges, no wrapping; the last chip is partly visible on purpose). The hint line sits below.
     - Buttons use `aria-pressed`, and the group has `aria-label="Filter by type of job"`. Counts come from the data.
   - **Grid.** 3 columns with a 40px row gap and a 32px column gap (1 column on mobile, 32px apart). Each item is a BeforeAfterSlider (square) plus a caption: the title in Fraunces 22px (20px on mobile) over "{category} · {town}" at 15px in `ink-500` (leave out " · town" when there's no town).
   - **CTA tile, the last item in the grid.** A `forest-700` card with an 18px radius and 40px padding, laid out as a column with space between. The eyebrow "Your home next?" (`gold-400`), H2 "Got a mould problem like these?" (36px, max-width 420px), a line of text, then "Get a free quote" (`on-dark`) and "Call 07364 233567" (`outline-on-dark`). **Its column span fills the remaining space in the last row:** `span = count % 3 === 0 ? 3 : 3 - (count % 3)`, and it's at least as tall as a slider (379px). On mobile it's a normal full-width card at the end.
   - There's no separate CTA band on this page.
3. Footer, then the MobileCallBar.

### 4.4 Contact (`/contact`): `contact-desktop.html`, `contact-mobile.html`

1. **Intro** (on `linen`, no band). Breadcrumb, H1 "Get a free, no-obligation quote", and the lead paragraph.
2. **Body.** Desktop is a grid of `7fr 5fr` with a 48px gap, top-aligned.
   - **Left:** `<QuoteForm variant="full" />` in a `paper` card (24px radius, 44px padding) titled "Your enquiry".
   - **Right:** a stack of three cards:
     - "Prefer to talk?": the `forest-700` card with phone (24px/600), email and hours.
     - "What happens next": a `paper` card with 3 numbered steps in 32px `sage-100` circles.
     - "Areas we cover": an outlined card with three county chips and the line "Based in Hare Street, Buntingford. A bit further afield? Just ask."
3. **Mobile order:** intro; two quick-contact tiles side by side ("Call us" on `forest-700` with the number underneath; "Email us" on `paper` with "Send us a message"); the form; "What happens next"; "Areas we cover"; footer; the single-button call bar.

### 4.5 Not found (`app/not-found.tsx`)

This page isn't in the mock-ups. Keep it on-brand and simple:
- `linen` background with the normal header and footer
- an eyebrow "404"
- H1 "Sorry, we can't find that page" (Fraunces)
- a line of text
- two buttons: "Back to home" (primary) and "Get a free quote" (outline)

No emoji.

---

## 5. Content and data changes

Move the site-wide facts into `data/site.ts` so they're edited in one place:

```ts
export const site = {
  phoneDisplay: "07364 233567",
  phoneHref: "tel:07364233567",
  email: "drmouldservices@gmail.com",
  hours: "Mon–Fri, 8:00–17:30",
  hoursLong: "Monday to Friday, 8:00–17:30",
  areas: ["Hertfordshire", "Essex", "Cambridgeshire"],
  base: "Hare Street, Buntingford",
  established: 2024,
  aboutImage: null as string | null, // set to e.g. "/about.jpg" when Stuart has a photo
};
```

**`data/information.ts`:**
- `infoWithPoints` and `mouldRemoval`: replace with the shorter copy in `mould-advice-desktop.html` (causes, the "professional" list with bold lead-ins, the removal paragraphs and the health note). Drop the sentence "Explore information on common mould types, removal costs, and effective prevention methods here." It promises content that doesn't exist.
- `reduceMould`: use the new titles and texts from the reference. **Fix the washing tip.** It currently says "consider using mould-resistant paint…". It should read "Dry washing outside" / "Where you can't, use a vented dryer or dehumidifier and open a window." Keep the existing images.
- `faq`, "What areas do you serve?": **remove London.** It becomes: "We cover Hertfordshire, Cambridgeshire and Essex as our primary service areas. However, we are willing to travel further for the right jobs. Your satisfaction is our priority, and we aim to accommodate your needs to the best of our ability." Change the question label to "What areas do you cover?", and the others to match the reference ("How do I stop mould coming back?", "What happens on the day of treatment?", "How long does it take?").
- `faq`, "How do I prevent mould…": replace 'Please check out our "Information Page"…' with a sentence linking to `/information#tips`.

**`data/before-after.ts`:** add `category: "Walls & ceilings" | "Cupboards & wardrobes" | "Brickwork"` and an optional `town?: string`. Rename the titles to match the reference (for example "Brick feature wall, room 1"). Keep the image paths.

**`data/reviews.ts` (new):** `export const reviews: { quote: string; name: string; town?: string; job?: string }[] = [];`

**Other new data files** (optional but tidy): `data/services.ts` and `data/steps.ts`, holding the home page cards and steps.

**Delete once they're no longer used:**
- `data/feature-content.ts`
- `components/action-box.tsx`, `ActionBoxes.tsx`, `SecondaryBtn.tsx`, `css/secondaryBtn.css`, `FeatureTopic.tsx`, `InfoCard.tsx`, `InfoWithPoints.tsx`, `TopicText.tsx`, `Hero.tsx`, `HeroText.tsx`
- `css/navbar.css`
- `utils/material-tailwind-exports.ts`
- `public/next.svg`, `public/vercel.svg`
- `public/hero-img*.png` and `public/before-after.png`, if unused

**Logo:** copy `redesign/assets/logo.svg` to `public/logo.svg` and use it in the header and footer instead of `/icon.png`. Also copy `logo-512.png` to `public/logo.png` and `apple-touch-icon.png` to `app/apple-icon.png` (the Next 13 file convention). Keep `app/favicon.ico` unless Stuart asks for a new one.

---

## 6. QuoteForm (restyle of `components/Form.tsx`)

- **Keep all of the logic:** Formik, `validationSchema`, the Cloudinary upload (max 5 photos), the POST to `/api/contact`, the loading state and `resetForm`. Keep the field **names** exactly (`name`, `email`, `phone`, `address`, `message`), because the API route and email template depend on them.
- **Labels:**
  - `name`: "Your name" (`autocomplete="name"`)
  - `phone`: "Phone number" (`type="tel"`, `autocomplete="tel"`)
  - `email`: "Email" (`autocomplete="email"`)
  - `address`: "Town or postcode" (`autocomplete="postal-code"`)
  - `message`: "Where's the mould, and how long has it been there?"
  - The **full** variant also shows the hint below the message: "For example: black spots on the bathroom ceiling, getting worse over the last few months."
- **Inputs:** 52px tall (48px in the compact variant), a 1px `sand-400` border, 12px radius, white background, 16px text (important: this stops iOS zooming in). Focus state: `leaf-600` border plus a focus ring. Error state: a `#B42318` border and a 14px `#B42318` message under the field.
- **Layout:** 2 columns on desktop (name and phone, then email and postcode), with the message, photos and submit spanning full width. 1 column on mobile.
- **Photos:** the label "Photos (optional, up to 5)", then a dashed drop zone (`sage-50` background, 1.5px dashed `#9FB5A7` border, 14px radius, 104px tall; 88px on mobile). Desktop text: Upload icon + "Add photos" / "JPG or PNG. Photos help us give you an accurate quote." Mobile text: Camera icon + "Take or add photos" / "Helps us give an accurate quote". The compact variant is a 64px single-line "Add photos (optional)". Uploaded photos show as 72px thumbnails with a round dark "×" button (`aria-label="Remove photo n"`). While uploading, show "Uploading…" and disable the zone.
- **Submit:** a full-width primary pill (56–60px) "Send my enquiry". While sending, show a spinner and "Sending…", and disable the button.
- **Privacy line under the button:** "We'll only use your details to reply to your enquiry." The full variant adds " Your data is handled in line with UK data protection law."
- **Toasts:** keep react-toastify but theme it to match (a `paper` background, `forest-700` for success, `#B42318` for errors, Figtree). Error text: "Sorry, something went wrong. Please try again, or call us on 07364 233567." Success text: "Thanks! Your enquiry has been sent. We'll be in touch soon."

---

## 7. SEO and metadata

- Add `export const metadata` to each page:
  - `/`: "Dr Mould | Mould Removal & Treatment in Hertfordshire, Essex & Cambridgeshire"
  - `/information`: "Mould Advice: Causes, Prevention & When to Call a Professional | Dr Mould"
  - `/gallery`: "Our Work: Before & After Mould Removal | Dr Mould"
  - `/contact`: "Get a Free Mould Removal Quote | Dr Mould"
  - Each gets a one-sentence description drawn from its intro.
- JSON-LD in `app/layout.tsx`:
  - Set `logo` to `https://www.dr-mould.co.uk/logo.png`.
  - Keep `areaServed` as the three counties.
  - Set `telephone` to `+447364233567`. The old `+447806615231` is wrong (confirmed by Stuart).
- The sitemap doesn't change, because the URLs don't.

---

## 8. Open items and placeholders

| Item | What to do |
| --- | --- |
| **Phone number** | **Resolved: 07364 233567** is correct. Use it everywhere via `data/site.ts`, and change the JSON-LD `telephone` from `+447806615231` to `+447364233567`. |
| **Reply time** ("[within one working day]") | **Resolved: use "as soon as we can".** Home and mobile quote panels: "…add a few photos if you can. We'll get back to you as soon as we can." Contact, "What happens next" step 1: "**We review your enquiry** and photos, and get back to you as soon as we can." Drop `replyTime` from `data/site.ts`. |
| **About photo** | None yet. Ship the text-only layout; `site.aboutImage` switches on the 2-column version later. Never show the striped placeholder. |
| **Reviews** | None yet. The section is hidden while `reviews` is empty. |
| **Gallery towns** (`[Town]`) | Optional. Leave `town` out and the caption drops " · town". |
| **Insurance / accreditation** | Not applicable. Don't mention it anywhere. |
| **Brick wall photos 2 and 3** | The "before" images are low resolution, but they're the best available. Use them as they are; `next/image` with `object-cover` is fine. |
| **"Leave a gap" tip image** | Keep `gap.jpg` as it is. |

---

## 9. Build plan

Commit after each phase with a message like `redesign(phase 3): home page`. Run `npm run lint && npm run build` before each commit, then pause for review.

1. **Foundations:**
   - **Fix `.gitignore` first.** Delete the line `route.tsx`. It silently ignores every Next.js API route file, so any new one would never reach GitHub. The existing `app/api/contact/route.tsx` is already tracked and holds no secrets (it reads env vars). Check with `git ls-files app/api/contact/route.tsx` (it should print the path) and `git check-ignore -v app/api/contact/route.tsx` (it should print nothing). Commit this on its own: `chore: stop ignoring route.tsx files`.
   - fonts (Fraunces and Figtree via `next/font`), the Tailwind tokens, base styles (`body` background `linen`, text `ink-900`, focus ring)
   - `data/site.ts`, the logo files, the `Container` and `Button` primitives, `lucide-react`
   - Remove `withMT` from `tailwind.config.js` only once nothing imports Material Tailwind (phase 7).
2. **Layout shell:** TopBar, Header plus the mobile menu, Footer, MobileCallBar and the restyled CookieBanner. Wire them into `app/layout.tsx`.
3. **Home page:** all sections in 4.1, with ProofBar, BeforeAfterPair, the conditional Reviews, QuoteForm (compact) and FaqList.
4. **Mould advice page:** section 4.2 plus the `data/information.ts` rewrite.
5. **Our work page:** section 4.3, the restyled slider with keyboard support, and the filter.
6. **Contact page:** section 4.4 and QuoteForm (full).
7. **Clean-up:**
   - the 404 page and metadata
   - delete unused components, CSS and data (section 5)
   - remove `@material-tailwind/react`, `@headlessui/react` (if unused), `@formspree/react` (unused) and the old font variables
   - remove the old `theme_*` colours and the custom `screens` keys, if unused
   - update the root `CLAUDE.md` to describe the new structure, tokens and data files
8. **QA pass**, using the checklist below. Fix everything, then do a final commit.
9. **Pre-launch reminder** (required, so Stuart doesn't forget to test before going live):
   - Create `.github/pull_request_template.md` with the "Before merging to master" checklist below. GitHub shows it automatically when Stuart opens the pull request from `redesign` into `master`.
   - End your final message with that same checklist as a clearly headed **"⚠️ Before you merge"** block, so it's the last thing Stuart sees when the build finishes.

   The checklist:
   ```markdown
   ## Before merging to master
   - [ ] Opened the Vercel **preview** URL for this branch (not the live site)
   - [ ] Sent a test enquiry **without** photos, and the email arrived
   - [ ] Sent a test enquiry **with** 2+ photos, and the email arrived with the photo links working
   - [ ] Checked a validation error (e.g. submit with an empty name)
   - [ ] Tapped the phone number and the "Call us" bar on a real phone
   - [ ] Checked every page on a phone and on desktop
   - [ ] Cookie banner: Accept and Decline both work
   ```

---

## 10. QA checklist

- [ ] Every page matches its reference at 1440px and 390px. Also check 768px and 1024px for sensible in-between layouts.
- [ ] No horizontal scrolling at 320px wide (except the deliberate filter-chip row).
- [ ] No bracketed placeholder text is visible anywhere.
- [ ] "London" doesn't appear anywhere (`grep -ri london app components data`).
- [ ] The phone link, the email link, the "Get a free quote" buttons and the `#services`, `#work`, `#quote` and `#faq` anchors all work.
- [ ] The enquiry form sends successfully **on the Vercel preview** with and without photos, validation errors show correctly, and the email arrives with the photos.
- [ ] The gallery filter updates the counts, the grid and the CTA tile span. Sliders work by mouse, touch and keyboard.
- [ ] The mobile menu opens, closes, closes on Esc and traps nothing. The call bar never covers the footer or the cookie banner.
- [ ] The cookie banner's Accept and Decline still update the gtag consent.
- [ ] Lighthouse on mobile: Accessibility ≥ 95, Best Practices ≥ 95, SEO 100, Performance ≥ 85.
- [ ] Keyboard only: every interactive element can be reached and has a visible focus ring.
- [ ] `npm run lint` and `npm run build` are clean.
