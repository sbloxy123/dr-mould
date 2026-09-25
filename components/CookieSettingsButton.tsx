"use client";

import { openConsentBanner } from "@/lib/analytics";

// Reopens the cookie banner so visitors can change their choice. Lives in the
// footer, which is a server component.
export default function CookieSettingsButton({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      data-slot="cookie-settings-button"
      onClick={(event) => openConsentBanner(event.currentTarget)}
      className={className}
    >
      Cookie settings
    </button>
  );
}
