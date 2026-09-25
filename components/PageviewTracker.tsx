"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackPageView } from "@/lib/analytics";

// Sends a page_view on client-side navigation. The first page view comes from
// gtag('config') in GoogleAnalytics, so the path it starts on is skipped.
// Comparing against the last path (not a first-render flag) also stays quiet
// when Strict Mode re-runs the effect in development. Changes to only the
// #fragment or query string don't change the path, so they aren't counted.
//
// GA's "Page changes based on browser history events" setting must stay off,
// or every navigation is counted twice.
export default function PageviewTracker() {
  const pathname = usePathname();
  const lastPath = useRef(pathname);
  const lastUrl = useRef("");

  useEffect(() => {
    if (!lastUrl.current) lastUrl.current = location.href;
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    trackPageView(lastUrl.current);
    lastUrl.current = location.href;
  }, [pathname]);

  return null;
}
