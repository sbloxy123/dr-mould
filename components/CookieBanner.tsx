"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import {
  OPEN_CONSENT_EVENT,
  clearAnalyticsCookies,
  readConsent,
  saveConsent,
  updateAnalyticsConsent,
  type OpenConsentDetail,
} from "@/lib/analytics";

// Shown until the visitor chooses, and again from the footer's "Cookie
// settings" button. The stored choice itself is applied by the inline script
// in GoogleAnalytics, so nothing here runs on load except reading it.
export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [openRequests, setOpenRequests] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (readConsent() === null) setOpen(true);
  }, []);

  useEffect(() => {
    const reopen = (event: Event) => {
      const { detail } = event as CustomEvent<OpenConsentDetail>;
      returnFocusRef.current =
        detail?.returnTo ?? (document.activeElement as HTMLElement | null);
      setOpen(true);
      setOpenRequests((count) => count + 1);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // Runs once the banner is visible, so focus() takes.
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

  return (
    <div
      ref={bannerRef}
      data-slot="cookie-banner"
      role="region"
      aria-label="Cookie consent"
      tabIndex={-1}
      className={`${
        open ? "flex" : "hidden"
      } fixed inset-x-4 bottom-[calc(96px+env(safe-area-inset-bottom))] z-50 flex-col gap-3 rounded-2xl border border-sand-200 bg-paper p-4 text-[15px] leading-[1.5] text-ink-900 shadow-soft sm:flex-row sm:items-center sm:justify-between lg:inset-x-auto lg:bottom-6 lg:left-6 lg:max-w-[420px] lg:p-5`}
    >
      <p>We use cookies to understand how people use our site.</p>

      <div data-slot="cookie-banner-actions" className="flex shrink-0 items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => choose(false)}>
          Decline
        </Button>
        <Button size="sm" onClick={() => choose(true)}>
          Accept
        </Button>
      </div>
    </div>
  );
}
