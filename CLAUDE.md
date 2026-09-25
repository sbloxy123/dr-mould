# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check (next/core-web-vitals)
```

No test suite is configured. Requires Node >= 20.

## Environment Variables

Required in `.env.local`:

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

Next.js 13 App Router site for Dr Mould, a UK mould treatment service based in Hertfordshire. `@/*` maps to the repo root.

**Pages:** `/` (home), `/contact`, `/gallery`, `/information`. Pages are server components that map over typed arrays from `data/` and render components. Any new page must also be added to the hardcoded list in `app/sitemap.ts`.

**Contact form flow:**
1. `components/Form.tsx` — client component with Formik + Zod validation (`utils/validations.tsx`; only name, email and message are validated). Images are chosen with a plain `<input type="file">` and uploaded from the browser directly to Cloudinary's REST upload endpoint using the unsigned `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` (folder `contact_form_uploads`, max 5 images). The returned `secure_url`s are held in local state, not in Formik values.
2. On submit, POSTs JSON to `/api/contact` (`app/api/contact/route.tsx`) with form values + image URLs.
3. The route renders `components/Email.tsx` (react-email) and sends it via nodemailer over Gmail SMTP (`utils/nodemailer.tsx`). From and to are both `GOOGLE_EMAIL`. Send errors are only logged; the route always returns 200, so the client shows a success toast even if the email failed.

**Dead code to be aware of:** `app/api/cloudinary-signature.ts` is a Pages Router (`NextApiRequest`) handler sitting inside the App Router tree, so it is never routed. It and `utils/cloudinary.ts` are the only consumers of the server-side `CLOUDINARY_*` vars. `@formspree/react` is installed but unused.

**Static content:** All page copy lives in typed arrays — `data/information.ts` (information page sections + FAQ), `data/feature-content.ts` (home page feature blocks), `data/before-after.ts` (gallery before/after image pairs under `public/before-after-square/`). Edit here to change site text or gallery entries.

**Styling:** Tailwind with custom theme colours (`theme_indigo`, `theme_gold`, `theme_light_green`, `theme_dark_green`, `theme_white`, each with `900` solid and `300` translucent shades) and a custom breakpoint scale (`2xsmall` 320px → `2xlarge` 1920px) alongside the defaults. Material Tailwind wraps the Tailwind config via `withMT`; its components are re-exported through the `"use client"` barrel `utils/material-tailwind-exports.ts` so server components can import them — add new Material Tailwind components there rather than importing the package directly. Framer Motion is used for entrance animations. Two plain CSS files (`css/`) style the navbar and secondary button.

**Fonts:** Mulish, Poppins, and Patua One loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables (`font-mulish`, `font-poppins`, `font-patua` utilities).

**Analytics and consent:** `components/GoogleAnalytics.jsx` (measurement ID `G-KSTFZWW3Y6`) loads gtag with `analytics_storage` defaulted to denied. `components/CookieBanner.tsx` stores the choice in localStorage under `cookie_consent` (via `lib/storageHelper.js`, which is `client-only`) and updates gtag consent.

**SEO:** Site metadata, `metadataBase` (`https://www.dr-mould.co.uk`) and a Schema.org `HomeAndConstructionBusiness` JSON-LD block (address, phone, hours) are inlined in `app/layout.tsx`. Open Graph / Twitter images live in `app/`.

**Deployment:** Vercel (`.vercel/project.json` present).
