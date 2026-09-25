# Plan: fix GA page tracking and cookie consent, add a "Cookie settings" link

- **Status:** v2, agreed. Updated after Fable's review (`plans/analytics-consent.review.md`) and Stuart's decisions (§1). Being implemented on branch `ga-consent-fix`.
- **Written:** 2026-09-25 by Claude (Opus 5.5).
- **Stack:** Next.js 13.4.12 App Router, deployed on Vercel (`master` → dr-mould.co.uk). See `CLAUDE.md`.

## 1. Summary and decisions

**Problems**
1. **Wrong page paths:** page views are recorded under the wrong path. Almost everything lands on `/`, and `/gallery` has never been recorded.
2. **Late consent:** consent is applied late, and the cookie banner writes to localStorage on every page load before the visitor has done anything.
3. **No way to change the choice:** once a visitor accepts or declines, the banner never comes back.

**Decisions (Stuart, 2026-09-25)**
- **Page views on client-side navigation:** a small manual tracker. Stuart unticks GA's "Page changes based on browser history events" when it deploys (§6).
- **Test traffic:** localhost and Vercel Previews stop sending hits to the live GA property. It fails safe: production keeps tracking even if Vercel's variable is missing (§5.2).
- **Banner:** "Decline" gets the same weight as "Accept". The wording stays as it is.
- **Footer:** a "Cookie settings" button reopens the banner.

## 2. Evidence (live site, 2026-09-25)

Checked in Chrome on https://www.dr-mould.co.uk, in a browser that had already accepted cookies. Also checked in the GA property "Dr Mould" (account 281472115, property 402400577, web stream 5990544868).

**GA property settings:**
- The measurement ID `G-KSTFZWW3Y6` matches `app/layout.tsx:124`.
- The stream URL is `https://www.dr-mould.co.uk`.
- Enhanced measurement is on, including Page views → "Page changes based on browser history events".

**`window.dataLayer` after loading the home page**, in order:
1. `js`
2. `consent default` denied
3. `config` with `page_path: "/"`
4. `consent update` denied (CookieBanner's first effect run)
5. `config` with `page_path: "/"` (PageviewTracker)
6. `consent update` granted

**Hits sent:**
- **Home page load:** one `page_view` with `dl=/`, `dp=/` and `gcs=G1-1`.
- **Clicking "Our work":** one `page_view` with `dl=/gallery` but **`dp=/`**, and the right `dt`.

**What GA recorded:**
- **Realtime → Pages** then showed one row: `/`, with 2 views.
- **Pages and screens, 1 Jan 2025 to 25 Sep 2026:** 146 views and 34 users. `/` had 126 views, `/contact` 16 and `/information` 4. `/gallery` never appears.

The "503" that the browser automation tool reported for `g/collect` is an artefact of how it captures cross-origin requests; the hits reached Realtime.

## 3. Root causes

### 3.1 Page path

- `components/GoogleAnalytics.jsx:45-47` sets `page_path` in the first `config`. gtag keeps it for later hits and sends it as `dp`. GA4 reports `dp` in preference to `dl`, as the evidence in §2 shows. `page_path` is a leftover from Universal Analytics and isn't a GA4 `page_view` parameter.
- GA's history-based page views fire when Next calls `pushState`, so they carry the stale `dp`.
- `PageviewTracker` (`GoogleAnalytics.jsx:12-23`, `lib/gtagHelper.js`) re-runs `config` after the route renders, which is too late. So each view is labelled with the previous page's path, or with `/`.
- `GoogleAnalytics.jsx:17` drops the `?` before the query string. That affects hits after PageviewTracker's second `config`: `/?utm_source=x` would be recorded as `/utm_source=x`.

### 3.2 Consent timing and storage writes

- `analytics_storage` starts as denied, and only CookieBanner switches it to granted, after hydration (`CookieBanner.tsx:15-32`). For a returning visitor, the first hit's consent state depends on timing.
- `CookieBanner.tsx:13` starts its state at `false`. The effect therefore sends `consent update denied` and writes `false` (or `null` on a first visit) to localStorage before the real value arrives.
- `CookieBanner.tsx:24` calls `window.gtag` directly and depends on the order effects run in. In Next 13.4, `afterInteractive` scripts are added from a `useEffect` (`node_modules/next/dist/client/script.js:225-237`).

### 3.3 No way to change the choice

The banner never returns once a choice is stored, and declining leaves any `_ga` cookies in place.

## 4. Non-goals (flag them, don't do them)

- **Consent model:** changing it (for example to the statistical-purposes exception). That's a legal decision (§9).
- **New banner wording, and a privacy or cookie policy page.**
- **Any GA admin change** other than the one setting in §6, which Stuart makes.
- **Converting the `.jsx` files to TypeScript.**

## 5. Changes

### 5.1 `lib/analytics.ts` (new)

The shared GA and consent helpers. It has no `"client-only"` import, because the server components import its constants; the functions only touch `window` when they're called.

- `CONSENT_KEY = "cookie_consent"`: the existing key, kept so stored choices survive.
- `OPEN_CONSENT_EVENT = "cookie-consent:open"`, and the type `OpenConsentDetail = { returnTo: HTMLElement | null }`.
- `gtag(...args)`: pushes `arguments` to `window.dataLayer`, the same way Google's stub does. It works whether or not gtag.js has loaded, or ever loads. It must be a `function` declaration, not an arrow function, because gtag.js ignores plain arrays.
- `readConsent(): boolean | null`: parses the stored value with a `try`. `"true"` gives `true` and `"false"` gives `false`. Anything else, including a missing key, `"null"`, `"undefined"` or blocked storage, gives `null`.
- `saveConsent(granted)`: writes with a `try`.
- `updateAnalyticsConsent(granted)`: `gtag("consent", "update", { analytics_storage: … })`.
- `clearAnalyticsCookies()`: for every `_ga` or `_ga_*` cookie, expires it with no domain, then on each parent domain of `location.hostname`. The review confirms this is right for `www.dr-mould.co.uk`, `*.vercel.app` and `localhost`.
- `trackPageView(referrer)`: `gtag("event", "page_view", { page_location: location.href, page_title: document.title, page_referrer: referrer })`.
- `openConsentBanner(returnTo)`: dispatches a `CustomEvent` whose detail is `{ returnTo }`. The button that was clicked is passed in explicitly, because Safari and iOS don't focus a button when it's clicked, so `document.activeElement` can't be used.

**Delete** `lib/gtagHelper.js` and `lib/storageHelper.js`.

### 5.2 `components/GoogleAnalytics.jsx` (becomes a server component)

- **Remove the old code:** `"use client"`, the old tracker, `Suspense` and the hooks.
- **Keep `id="google-analytics"`** on the inline script. Next uses it as the script's cache key (`script.js:79`).
- **Render order:**
  1. the inline script, `afterInteractive`, always;
  2. `<PageviewTracker />`, always;
  3. the gtag.js `<Script src>`, `afterInteractive`, **only when `loadGtag` is true**.
- **Inline script:**

```js
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var stored = null;
try { stored = JSON.parse(localStorage.getItem('${CONSENT_KEY}')); } catch (e) {}
gtag('consent', 'default', {
  analytics_storage: stored === true ? 'granted' : 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
```

- **`loadGtag`** is computed in `app/layout.tsx` and passed down as a prop:
  - `process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview"`.
  - **Production on Vercel:** true. If Vercel's system variables aren't exposed, `VERCEL_ENV` is undefined and it's still true, so production never loses tracking.
  - **Previews:** false, as long as Vercel's system variables are exposed. If they aren't, Previews keep sending hits, which is no worse than today.
  - **`next dev`:** false.
  - **A local `next build && next start`:** true. Block `google-analytics.com` in DevTools when testing that way.
- **Without gtag.js,** the dataLayer still fills with the consent default, `config`, the tracker's `page_view` events and consent updates. So Previews and the dev server can be checked end to end without sending anything.
- **`afterInteractive` is early enough:** gtag.js can't run before hydration either, and `beforeInteractive` would delay hydration (review §5, Q4).

### 5.3 `components/PageviewTracker.tsx` (new, client component)

- Sends `trackPageView()` when `usePathname()` changes.
- **Skips the first render:** the first page view comes from `config`.
- **Strict Mode:** in development React runs effects twice on mount, so "is this the first render?" is tracked by comparing against the last pathname seen, kept in a ref starting at the first pathname, not with a boolean flag.
- **Referrer:** passes the previous `location.href` as `page_referrer`.
- **What it ignores:** a change to only the `#` part or only the query string doesn't change `usePathname`, so `/#services` clicked on the home page and in-page anchors send nothing.
- **No `Suspense` boundary needed:** `usePathname` doesn't need one; only `useSearchParams` does.

### 5.4 `components/CookieBanner.tsx`

**State:**
- `open` (starts `false`, so the server render and hydration show nothing, as now);
- `openRequests` (a counter);
- `bannerRef`;
- `returnFocusRef`.

**Behaviour:**
- **On mount:** open the banner if `readConsent() === null`. No gtag call and no storage write.
- **On `OPEN_CONSENT_EVENT`:**
  - store `detail.returnTo`, falling back to `document.activeElement`;
  - set `open` to true;
  - increment `openRequests`.
- **Focus:** an effect on `openRequests` focuses the banner region, which gets `tabIndex={-1}`. It also works when the banner is already open.
- **`choose(granted)`:**
  - `saveConsent`, then `updateAnalyticsConsent`;
  - if declined, `clearAnalyticsCookies()`;
  - `setOpen(false)`;
  - focus the stored element, if it's still in the page (`isConnected`).
- **Remove** `declare global { gtag: any }`.

**Equal weight:** "Decline" becomes `variant="outline"`, the same `size="sm"` as "Accept". Keep the text, classes and `data-slot`s. Don't add `outline-none` to the region.

### 5.5 `components/CookieSettingsButton.tsx` (new, client component)

A `<button type="button" data-slot="cookie-settings-button">` labelled "Cookie settings". It calls `openConsentBanner(event.currentTarget)` on click.

### 5.6 `components/layout/Footer.tsx`

In the `footer-legal` row (`Footer.tsx:66-81`), wrap the copyright line and the button in `<span className="flex flex-wrap items-center gap-x-3 gap-y-1">`.

The button's classes are `min-h-[24px] text-paper underline underline-offset-2 hover:text-gold-400`. They match the "Bloxie" credit link, and the minimum height meets WCAG 2.5.8. The footer stays a server component.

### 5.7 `app/layout.tsx`

- Compute `loadGtag` and pass it to `<GoogleAnalytics>`.
- Update the comment at lines 122-123. The banner no longer depends on the order, but `GoogleAnalytics` stays first so the consent default is queued before anything else.

### 5.8 `CLAUDE.md`

Rewrite the "Analytics and consent" paragraph to cover:
- `lib/analytics.ts`;
- the inline script sets the consent default from storage;
- the first `config` sends the first page view, and `PageviewTracker` sends the rest;
- **the GA setting "Page changes based on browser history events" must stay off**, or navigations double count;
- the `loadGtag` rule;
- the footer button and the `cookie-consent:open` event;
- declining clears the `_ga` cookies.

Remove the note about `Suspense`.

## 6. Rollout

1. **Build and check on the branch:** on the dev server, which sends no hits, run §7 checks A1-A12.
2. **Push the branch and check the Preview:** view source and confirm gtag.js isn't loaded; spot-check A2, A5 and A8.
3. **Stuart OKs the merge,** and it's pushed to `master`.
4. **When the production deploy is live,** Stuart unticks GA → Admin → Data streams → Dr Mould → Enhanced measurement → Page views → advanced settings → "Page changes based on browser history events", and saves. Until he does, each navigation counts twice. If he unticks it before the deploy instead, navigations aren't counted at all for those few minutes. Either is negligible at this traffic level; after the deploy is simpler to check.
5. **Run §7 checks B1-B6 on production.**

Rollback is Vercel Instant Rollback. If rolling back, tick the GA setting again, because the old code relies on it.

## 7. Verification

**Consent codes on hits:** `gcs` is `G1` followed by the ad_storage digit and then the analytics_storage digit. With the new defaults, **denied is `G100` and granted is `G101`**. Expect a `gcd` parameter on every hit too.

### A. Local dev server and Preview (no gtag.js, so read `window.dataLayer`)

1. **Build:** `npm run lint` and `npm run build` pass, every page is still static (`○`), and there are no hydration warnings in the console.
2. **First visit** (clear site data): the banner shows, and the dataLayer has `consent default` with `analytics_storage` denied and the three `ad_*` signals denied, before `config`. There's no `cookie_consent` key and no `consent update` until a click.
3. **Accept:** the dataLayer gets `consent update` granted, localStorage holds `true`, and the banner hides.
4. **Reload:** `consent default` is granted, the banner stays hidden and nothing is written on load.
5. **Navigation:** go Home → Our work → Mould advice → Contact → Home using the header, then a footer link, then Back and Forward. Expect one `page_view` event per navigation, where:
   - `page_location` is the new URL;
   - `page_title` is the new page's title, including after Back and Forward;
   - `page_referrer` is the previous URL.
6. **No page view for these:** the hero's "Get a free quote" (`#quote`), a jump chip and an "On this page" link on `/information`, and "Services" (`/#services`) clicked while already on `/`.
7. **"Services" (`/#services`) from another page:** exactly one `page_view` for `/`.
8. **Footer "Cookie settings":**
   - the banner opens with focus on the region;
   - Tab reaches Decline and then Accept;
   - choosing returns focus to the footer button.
   Check at mobile width (banner above the call bar) and on desktop, and if possible in Safari or iOS Safari.
9. **Decline** (after accepting, and separately on a first visit):
   - localStorage holds `false`;
   - the dataLayer gets `consent update` denied;
   - no `_ga` cookies (set a fake `_ga` cookie first to check deletion);
   - navigating afterwards doesn't bring them back.
10. **Old stored values:** set `cookie_consent` to `null`, `undefined`, `true` and `false` by hand, then reload each time. Expect the banner to show, show, hide and hide.
11. **Storage blocked:** with site data blocked, there are no errors, the banner shows and the choices don't throw.
12. **Legacy anchor:** load `/information#mould-removal-section` directly. There's one page view (from `config`) and the page scrolls to the section.

### B. Production (real hits: DevTools Network filtered by `collect`, and GA Realtime)

1. **gtag.js is loaded** (view source).
2. **First visit:** hits have `gcs=G100`, and no `_ga` cookies are set.
3. **After Accept:** later hits have `gcs=G101` and the `_ga` cookies appear.
4. **After reloading:** the first `page_view` is `G101`.
5. **Navigating through the pages:** one hit per page, each with the right `dl` and `dt` and no `dp`. GA Realtime lists `/gallery`, `/information` and `/contact` as their own rows. `/gallery` has never been recorded before, so its row is the clearest sign the fix works.
6. **`/?utm_source=test&utm_medium=check`:** `dl` includes the query, the path shows as `/`, and Realtime shows the source as "test".

## 8. Files

- **New:** `lib/analytics.ts`, `components/PageviewTracker.tsx`, `components/CookieSettingsButton.tsx`
- **Changed:** `components/GoogleAnalytics.jsx`, `components/CookieBanner.tsx`, `components/layout/Footer.tsx`, `app/layout.tsx`, `CLAUDE.md`
- **Deleted:** `lib/gtagHelper.js`, `lib/storageHelper.js`

## 9. Open for Stuart (not part of this change)

- **Consent model:** the review (§7) reports that the PECR changes from the Data (Use and Access) Act 2025 are in force, and that the ICO finalised its storage-and-access guidance on 29 April 2026. That guidance includes a statistical-purposes exception with conditions. Whether Google Analytics qualifies is a question for Stuart or an adviser.
- **Banner information:** the banner doesn't say which cookies it sets, who sets them or for how long. There's no policy page to link to. It also doesn't mention that cookieless pings still reach Google after a visitor declines.
- **Vercel setting:** check that "Automatically expose System Environment Variables" is on in the Vercel project, so Previews really stop sending hits (§5.2).
