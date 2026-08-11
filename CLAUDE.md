# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

No test suite is configured.

## Environment Variables

Required in `.env.local`:

```
GOOGLE_EMAIL=           # Gmail address for sending contact form emails
GOOGLE_PASSWORD=        # Gmail app password (not account password)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=   # Unsigned upload preset for the widget
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Architecture

Next.js 13 App Router site for Dr Mould, a UK mould treatment service based in Hertfordshire.

**Pages:** `/` (home), `/contact`, `/gallery`, `/information`

**Contact form flow:**
1. `components/Form.tsx` — client component with Formik + Zod validation (`utils/validations.tsx`). Opens a Cloudinary upload widget (loaded via `<Script>`) that uploads images directly to Cloudinary and stores returned `secure_url`s in local state.
2. On submit, POSTs to `/api/contact/route.tsx` with form values + Cloudinary image URLs.
3. The API route renders `components/Email.tsx` (react-email template) and sends it via nodemailer through Gmail SMTP (`utils/nodemailer.tsx`). The email is sent to itself (from/to are both `GOOGLE_EMAIL`).

**Static content:** All page copy and FAQ content lives in `data/information.ts` and `data/feature-content.ts` as typed arrays — edit here to change site text.

**Styling:** Tailwind with custom theme colours (`theme_indigo`, `theme_gold`, `theme_light_green`, `theme_dark_green`, `theme_white`) and a custom breakpoint scale (`2xsmall` → `2xlarge`). Material Tailwind wraps the Tailwind config via `withMT`. Two plain CSS files exist for navbar and secondary button styles.

**Fonts:** Mulish, Poppins, and Patua One loaded via `next/font/google` and exposed as CSS variables (`--font-mulish`, `--font-poppins`, `--font-patua`).

**Analytics:** Google Analytics via `components/GoogleAnalytics.jsx` (measurement ID `G-KSTFZWW3Y6`), with consent gated through `components/CookieBanner.tsx` and `lib/gtagHelper.js`.

**SEO:** Schema.org `LocalBusiness` JSON-LD is inlined in `app/layout.tsx`. Sitemap is generated at `app/sitemap.ts`.

**Deployment:** Vercel (`.vercel/project.json` present).
