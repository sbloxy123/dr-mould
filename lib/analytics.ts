// Google Analytics and cookie consent helpers, shared by GoogleAnalytics (its
// inline script), PageviewTracker, CookieBanner and CookieSettingsButton.
// No "client-only": server components import the constants. The functions
// only touch `window` when they're called.

// Existing key: keep it so visitors' stored choices survive.
export const CONSENT_KEY = "cookie_consent";
export const OPEN_CONSENT_EVENT = "cookie-consent:open";

export type OpenConsentDetail = { returnTo: HTMLElement | null };

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// Queues a command the way Google's gtag stub does, so it works whether or
// not gtag.js has loaded (it isn't loaded at all on Previews or `next dev`).
// gtag.js only reads `arguments` objects, so this can't push a plain array.
export function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

// true = accepted, false = declined, null = not chosen yet (or no storage).
export function readConsent(): boolean | null {
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null");
    return typeof value === "boolean" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(granted: boolean) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(granted));
  } catch {
    // Storage blocked: the choice only lasts for this page view.
  }
}

export function updateAnalyticsConsent(granted: boolean) {
  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });
}

// GA sets _ga and _ga_<ID> on the highest domain it can (".dr-mould.co.uk"),
// so expire them host-only and on every parent domain. The browser ignores
// the public suffix ("co.uk").
export function clearAnalyticsCookies() {
  const names = document.cookie
    .split("; ")
    .map((cookie) => cookie.split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
  const labels = location.hostname.split(".");
  const domains = labels.slice(0, -1).map((_, i) => labels.slice(i).join("."));
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    }
  }
}

export function trackPageView(referrer: string) {
  gtag("event", "page_view", {
    page_location: location.href,
    page_title: document.title,
    page_referrer: referrer,
  });
}

// Safari doesn't focus a button on click, so the caller passes the element
// focus should return to rather than the banner reading activeElement.
export function openConsentBanner(returnTo: HTMLElement | null = null) {
  window.dispatchEvent(
    new CustomEvent<OpenConsentDetail>(OPEN_CONSENT_EVENT, {
      detail: { returnTo },
    })
  );
}
