"use client";

import { getLocalStorage, setLocalStorage } from "@/lib/storageHelper";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

declare global {
  interface Window {
    gtag: any;
  }
}
export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);

    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied";

    window.gtag("consent", "update", {
      analytics_storage: newValue,
    });

    setLocalStorage("cookie_consent", cookieConsent);

    //For Testing
    // console.log("Cookie Consent: ", cookieConsent);
  }, [cookieConsent]);
  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className={`${
        cookieConsent != null ? "hidden" : "flex"
      } fixed inset-x-4 bottom-[calc(96px+env(safe-area-inset-bottom))] z-50 flex-col gap-3 rounded-2xl border border-sand-200 bg-paper p-4 text-[15px] leading-[1.5] text-ink-900 shadow-soft sm:flex-row sm:items-center sm:justify-between lg:inset-x-auto lg:bottom-6 lg:left-6 lg:max-w-[420px] lg:p-5`}
    >
      <p>We use cookies to understand how people use our site.</p>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="text"
          size="sm"
          onClick={() => setCookieConsent(false)}
        >
          Decline
        </Button>
        <Button size="sm" onClick={() => setCookieConsent(true)}>
          Accept
        </Button>
      </div>
    </div>
  );
}
