# Review of `plans/analytics-consent.md`

- **Reviewed:** 2026-09-25 by Claude (Fable 5.1), read-only. No code, plan, GA or git changes were made.
- **Checked against:** the repo at `6c899b5`, `node_modules/next` 13.4.12, Google's tag-platform and GA4 docs, Vercel's docs and the ICO's guidance (links in §9).
- **Not done:** I did not run the site or open the GA property. Everything about live behaviour is taken from the plan's §2 or from docs.

## 1. Verdict

**Ready with changes.** The diagnosis is right, the line references are accurate, and the design (consent default read from storage in the inline script, first `config` without `page_path`, GA's history page views, a footer button that reopens the banner) is sound for Next 13.4. The changes below are mostly to the sketches and the verification list. None of them alters the shape of the plan.

## 2. Blocking issues (fix before or during implementation)

1. **The `gcs` values in §7 are wrong once the `ad_*` defaults are added.** `gcs` is `G1` + ad_storage + analytics_storage, with `-` meaning "not set". Today `ad_storage` is never set, which is why §2 saw `G1-1`. After §5.2 sets it to `denied`, "analytics granted" becomes **`G101`** and "denied" stays **`G100`**. Checks 3, 4 and 9 must say `G101`, or the tester will think consent mode broke. Expect a `gcd` parameter on every hit as well.
2. **The reopen path doesn't work on Safari.** `document.activeElement` is not the clicked button in Safari and iOS Safari, because those browsers don't focus buttons on click. So after choosing, focus goes nowhere. Pass the button through the event instead of reading `activeElement` (replacement in §3.3).
3. **§6.2's fallback and the primary must never both be live.** If the manual tracker ships while "Page changes based on browser history events" is still on, every navigation is double counted. Google's own guidance says enhanced measurement sends history page views even with `send_page_view: false`. Put the GA toggle in the rollout steps, not just in prose.

## 3. Recommended changes

### 3.1 `lib/consent.ts`

- `readConsent`, `saveConsent`, `clearAnalyticsCookies` and the `arguments` push are all correct as written. Detail:
  - `JSON.parse(localStorage.getItem(KEY) ?? "null")` handles `"true"`, `"false"`, `"null"` (the old code's first-visit write) and the old helper's `"undefined"` (throws, caught, returns `null`). Compatibility with stored values is fine.
  - Pushing `arguments` is required. gtag.js only treats `Arguments` objects on the dataLayer as commands and silently drops plain arrays. Not stated in Google's docs, but widely documented and consistent with Google's snippet; keep the `function` declaration, not an arrow.
  - TypeScript: `function gtag(..._args: unknown[]) { window.dataLayer!.push(arguments); }` compiles under `strict` with `target: es5`, and `next/core-web-vitals` doesn't enable `prefer-rest-params`. `catch {}` without a binding is fine on TS 5.1. `declare global` works because the file has exports.
  - Cookie domains: for `www.dr-mould.co.uk` the loop tries no domain, `www.dr-mould.co.uk`, `dr-mould.co.uk` and `co.uk`. The last is a public suffix and the browser ignores it. gtag's `auto` cookie domain puts `_ga` on `dr-mould.co.uk`, which is covered. `*.vercel.app` is on the public suffix list so gtag sets a host-only cookie there, and the no-domain write deletes it. `localhost` produces an empty domain list and only the host-only write. All three cases are right.
- **Change `openConsentBanner` to carry the return-focus element** (fixes blocking issue 2):

```ts
export const OPEN_CONSENT_EVENT = "cookie-consent:open";

export type OpenConsentDetail = { returnTo: HTMLElement | null };

export function openConsentBanner(returnTo: HTMLElement | null = null) {
  window.dispatchEvent(
    new CustomEvent<OpenConsentDetail>(OPEN_CONSENT_EVENT, { detail: { returnTo } })
  );
}
```

- Optional: add `expires=Thu, 01 Jan 1970 00:00:00 GMT` beside `Max-Age=0` in `clearAnalyticsCookies`. Every current browser honours `Max-Age`; this is belt and braces only.

### 3.2 `components/GoogleAnalytics.jsx`

- Removing `"use client"`, the tracker, `Suspense` and the hooks is correct. `next/script` is itself a `"use client"` module (`node_modules/next/dist/client/script.js:1`), so a server component can render it, and the props are serialisable.
- **Keep `id="google-analytics"` on the inline script.** `loadScript` uses `id || src` as its cache key (`script.js:79`); without an id the inline script has no key.
- Order is guaranteed without `beforeInteractive`: both `afterInteractive` scripts are appended to `<body>` from `useEffect` (`script.js:225-237`; the plan says 225-235), passive effects run siblings in order, the inline script executes synchronously on append, and gtag.js executes asynchronously after it loads. The dataLayer therefore always holds `consent default` before gtag.js reads it. See §5 Q4 for why `beforeInteractive` would be worse.
- Setting `ad_storage`, `ad_user_data` and `ad_personalization` to `denied` has no downside for this site. Google's docs say it's up to you to set every type, and a type that is never set doesn't count as denied, which is what `G1-1` in §2 shows. Explicit `denied` is the conservative choice and stops that ambiguity. The only feature it limits is Google Signals demographics, which the property doesn't need.

### 3.3 `components/CookieBanner.tsx`

Replace the reopen and focus part of the sketch with this. It fixes Safari, avoids the extra `focusOnOpen` render, and still moves focus when the banner was already open (first visit, then the footer button is clicked, which the plan's version handles but a plain ref flag would not):

```tsx
const [open, setOpen] = useState(false);
const [openRequests, setOpenRequests] = useState(0);
const bannerRef = useRef<HTMLDivElement>(null);
const returnFocusRef = useRef<HTMLElement | null>(null);

useEffect(() => {
  if (readConsent() === null) setOpen(true);
}, []);

useEffect(() => {
  const reopen = (event: Event) => {
    const detail = (event as CustomEvent<OpenConsentDetail>).detail;
    returnFocusRef.current =
      detail?.returnTo ?? (document.activeElement as HTMLElement | null);
    setOpen(true);
    setOpenRequests((n) => n + 1);
  };
  window.addEventListener(OPEN_CONSENT_EVENT, reopen);
  return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
}, []);

// Runs after the banner is display:flex, so focus() works.
useEffect(() => {
  if (openRequests > 0) bannerRef.current?.focus();
}, [openRequests]);

const choose = (granted: boolean) => {
  saveConsent(granted);
  updateAnalyticsConsent(granted);
  if (!granted) clearAnalyticsCookies();
  setOpen(false);
  const target = returnFocusRef.current;
  returnFocusRef.current = null;
  if (target?.isConnected) target.focus();
};
```

Notes:
- Server render and hydration match: both render `hidden`. The banner still pops in after mount for first-time visitors, as it does today.
- Order of effects: the mount effect no longer touches gtag or storage, so nothing depends on `GoogleAnalytics` having run. On click, `updateAnalyticsConsent` pushes to `window.dataLayer` whether or not gtag.js has loaded, and `clearAnalyticsCookies` runs after gtag has processed the denial (gtag hooks `dataLayer.push` synchronously), so it can't re-set the cookies on the next event.
- When there is no element to return focus to (first visit), the clicked button becomes `display: none` and focus drops to `<body>`. Chrome and Firefox keep the sequential focus point where the button was, so Tab continues from there. Acceptable; don't focus `#main`, that would scroll the page to the top.
- The global `:focus-visible` rule (`app/globals.css:17`) will draw the green ring around the whole banner after keyboard activation of the footer button, and not after a mouse click. That's the right behaviour. Leave it.
- Remove the `declare global { gtag: any }` block as planned; nothing else references `window.gtag` once `lib/gtagHelper.js` goes.

### 3.4 `components/CookieSettingsButton.tsx`

Pass the button to the event:

```tsx
onClick={(event) => openConsentBanner(event.currentTarget)}
```

Everything else in §5.4 and §5.5 checks out: the footer row is at `Footer.tsx:66-81`, the credit link classes match, the button inherits the 13px font from Tailwind's preflight, `text-paper` and `gold-400` exist in `tailwind.config.js`, and `min-h-[24px]` satisfies WCAG 2.5.8 for a non-inline control.

### 3.5 Plan text corrections

- §3.1, last bullet: `/utm_source=x` only affects hits after PageviewTracker's second `config`, not the landing hit (which carries `dp=/` from the inline script). Same conclusion, slightly different mechanism.
- §3.2: `script.js:225-237`, not 225-235.
- §9: the Data (Use and Access) Act's PECR changes are in force (commenced 5 February 2026 per secondary sources) and the ICO's guidance was finalised on 29 April 2026. "May allow" is out of date; see §7 below.

## 4. Verification (§7): gaps and additions

The plan's checks would catch most regressions. They would miss these:

1. **`gcs` expectations** (blocking issue 1): use `G100` for denied and `G101` for granted throughout.
2. **Back and Forward titles.** GA fires on `popstate` immediately, before Next has rendered the restored page, so `dt` will probably be the previous page's title. Not a regression, but record it, because it's the strongest argument for the §6.2 fallback. Also check that Next's `replaceState` after the restore (`app-router.js:84`, runs whenever the tree changes) does not produce a second `page_view` for the same URL. §2's "one page_view on load" says nothing about this: at hydration time gtag.js hadn't loaded yet, so its listener wasn't installed.
3. **Header "Services" while already on `/`.** `navLinks` and the footer use `<Link href="/#services">`, which goes through Next's router and calls `pushState` with the fragment (`navigate-reducer.js:96,251`, `app-router.js:82`). From another page that's a real view of `/`; from the home page it's a duplicate. Test both, separately from the plain `<a href="#…">` cases (hero `#quote`, `JumpChips`, `AdviceAside`), which the browser handles with `hashchange` and `popstate` instead.
4. **Decline, then navigate.** After declining, click through two pages and confirm no `_ga*` cookie reappears and every hit is `G100`.
5. **Decline on a first visit** (not only "decline after accepting"): no cookies ever set, `cookie_consent` is `false`.
6. **No writes on load.** Assert `localStorage` has no `cookie_consent` key after a first load, and that the dataLayer holds no `consent update` entry until a click. That is the regression the old code had.
7. **Console.** No hydration warnings and no `useSearchParams` bailout message in the build output. Check `.next/server/app/*` are still static in the `npm run build` summary (the plan has this; keep it).
8. **Safari and iOS Safari** for check 8, because of the `activeElement` difference.
9. **Legacy anchor on full load:** open `/information#mould-removal-section` directly; expect one `page_view` with the fragment in `dl` and `/information` as the path in Realtime.
10. **After merge:** confirm in GA Realtime that `/gallery` finally appears as its own row. It has never been recorded, so it's the clearest signal the fix worked.

## 5. Answers to §12

1. **`dp`.** Yes. GA4's `page_view` parameters are `page_location`, `page_title`, `client_id`, `language`, `page_encoding` and `user_agent`; `page_path` is not among them, it's a Universal Analytics leftover that gtag still forwards as `dp`. §2 shows GA using `dp` over `dl`. Removing `page_path` is the whole fix: the hit then carries only `dl`, GA derives the path from it, and `page_location` doesn't need setting because it defaults to `location.href`. What I can't cite from Google's docs is the "dp beats dl" precedence itself, but the observation is unambiguous.
2. **History page views on Next 13.4:**
   - `pushState` happens in `HistoryUpdater`'s `useInsertionEffect` (`app-router.js:69-90`), which runs during React's commit before the rest of the tree, including the new `<title>`, is mutated. So the push precedes the title update. §2 nonetheless saw the correct `dt` on the "Our work" click, so gtag must build the hit slightly later. Keep check 5, and expect Back/Forward to show the old title (§4 item 2).
   - Hydration `replaceState` (`app-router.js:84`) runs before gtag.js has loaded (gtag.js is appended after hydration, `script.js:225`), so it can't cause an extra view on load. It also runs after every tree change, including Back/Forward restores; whether gtag counts a `replaceState` to an unchanged URL is not documented. Test it (§4 item 2).
   - Fragment changes: Google's help page lists `pushState`, `popState` and `replaceState` and says nothing about fragments. Third-party write-ups say gtag also listens for `hashchange`. Unverified either way; check 7 is the right approach.
3. **After a ping, does update granted re-send?** No. Google's consent guide describes no re-sending and warns instead that "Google tags may lose key data points from the original page … many sessions with consent could be missing a session_start event". The landing view stays a cookieless ping; the first cookied hit is the next event. Cookieless pings go to the property for modelling and aren't in standard reports, as the plan says.
4. **`afterInteractive` is early enough.** Nothing can be sent before gtag.js executes, and gtag.js is `afterInteractive` too. `beforeInteractive` in the App Router routes the inline script through `self.__next_s` and `app-bootstrap.js:21-53`, which runs every such script *before hydration starts*. That would delay interactivity for no gain. Stay with `afterInteractive`, inline script first.
5. **Cookie deletion domains:** correct for all three hosts (details in §3.1).
6. **Focus target:** focusing the region with `tabIndex={-1}` is right. It announces "Cookie consent, region" plus the text, and the buttons are one Tab away. Focusing Decline or Accept directly would skip the message. Don't add `outline-none`.
7. **Bugs in the sketches:** Safari `activeElement` (blocking issue 2); the missing `id` risk (§3.2); otherwise none. SSR, hydration, effect order, TypeScript and `arguments` are all fine as analysed above.
8. **Consent at code level:** see §7.

## 6. Views on §6.2 and §8

**§6.2 (anchor links).** Either design depends on a GA admin setting: the primary needs history page views *on*, the fallback needs them *off*. Given that, my preference is the fallback as the permanent design, for three reasons that go beyond anchors: it labels Back/Forward views with the right title, it ignores fragment and query-only changes by construction (`usePathname` doesn't change for them), and it doesn't rely on undocumented gtag behaviour. The cost is one small client component and a GA toggle that Stuart flips. If Stuart would rather not touch GA, the primary is acceptable and check 7 decides. Two notes on the fallback sketch: `document.title` will be current, because `useEffect` runs after React has committed the new `<title>` in the same commit as the page (verify once); and it must skip the first render, as the plan says, because the first `config` sends that view.

**§8 (localhost and Previews).** Yes, do it, with `VERCEL_ENV === "production"`. Vercel's docs confirm `VERCEL_ENV` is available at build and runtime, but only when "Enable access to System Environment Variables" is ticked in the project's Environment Variables settings, so confirm that first. Locally `VERCEL_ENV` is unset, so `npm run dev` stops sending hits, which also removes the plan's own constraint about local testing. Keep a local override for the §7 checks: build with `VERCEL_ENV=production` and block `google-analytics.com` in DevTools. The alternative in the plan (a "Developer traffic" data filter) needs `debug_mode: true` on non-production hits and a permanent exclude filter in GA admin; it keeps Previews testable in DebugView, but it's more moving parts and a GA change. I'd only choose it if Preview verification matters more than simplicity.

## 7. UK consent: flags only

Not legal advice. Things a reviewer of the code should raise:

- **The law changed.** The ICO's storage-and-access guidance (finalised 29 April 2026) describes a statistical-purposes exception under PECR as amended by the Data (Use and Access) Act 2025. Its conditions include: the sole purpose is aggregate statistics to improve the service; a third-party provider acts as a processor and doesn't combine the data with other clients' data; clear information is given; and there's a simple, free way to object, which the ICO says can be a toggle defaulting to on. Whether Google Analytics, on Google's terms, fits those conditions is exactly the question for Stuart or their adviser, and the plan's §9 should point at the finalised guidance rather than say "may allow".
- **While opt-in stays:** the banner gives no information about which cookies, who sets them (Google) or for how long, and there's no policy page to link to. Informed consent is hard to argue with one sentence.
- **Equal prominence:** "Decline" is the `text` button variant next to a filled primary "Accept". The ICO's expectation is that rejecting is as easy as accepting, and visual prominence is part of that.
- **Withdrawal:** the footer button meets "as easy to withdraw as to give". Good.
- **Cookieless pings after a decline** still send IP address, user agent and screen size to Google. That's outside PECR's storage rule but still a data transfer; the banner text ("We use cookies to understand…") doesn't describe it.
- **What the plan fixes** is real: today the site writes to `localStorage` before any choice and fires a consent update on load. Both go away.

## 8. Things I'm not sure about

- Whether gtag dedupes a `replaceState` to an unchanged URL, and whether it fires on fragment-only changes. Both are empirical (§4 items 2 and 3).
- Whether the `dp`-over-`dl` precedence is documented anywhere. I couldn't find it; the §2 evidence is what supports it.
- Whether Vercel's system variables are enabled on this project. Not visible from the repo.
- The plan's "503 is a tool artefact" explanation is plausible (`no-cors` responses are opaque) but I didn't reproduce it.
- I did not verify the "unset consent types count as granted" behaviour against a specific line of Google's docs; the `G1-1` observation and Google's "set all types" wording are consistent with it.

## 9. Sources

- Google, Consent mode setup: https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced
- Google, Consent mode behaviour (cookieless pings): https://support.google.com/analytics/answer/9976101
- Google, Enhanced measurement events: https://support.google.com/analytics/answer/9216061
- Google, Measure pageviews (`send_page_view`, history setting): https://developers.google.com/analytics/devguides/collection/ga4/views
- Google, gtag `page_view` parameters: https://developers.google.com/tag-platform/gtagjs/reference/events#page_view
- Google, Developer traffic filter: https://support.google.com/analytics/answer/13296662
- Vercel, System environment variables: https://vercel.com/docs/environment-variables/system-environment-variables
- ICO, Storage and access technologies guidance and its exceptions chapter: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/
- `gcs` format (third party, several agreeing): https://consentcheck.online/gcs-decoder
- `arguments` vs arrays on the dataLayer (third party): https://github.com/AmauriC/tarteaucitron.js/issues/618
- Next 13.4.12 source: `node_modules/next/dist/client/script.js`, `client/app-bootstrap.js`, `client/components/app-router.js`, `client/components/router-reducer/reducers/navigate-reducer.js`
