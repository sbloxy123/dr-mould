"use client";

import { getLocalStorage, setLocalStorage } from "@/lib/storageHelper";
import { useState, useEffect } from "react";

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
      className={`${
        cookieConsent != null ? "hidden" : "flex"
      } my-10 z-30 mx-auto max-w-max md:max-w-screen-sm
                        fixed bottom-0 left-0 right-0
                        flex px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4
                         bg-gray-700 rounded-lg shadow`}
    >
      <div className="text-center text-white">
        <p className="mb-0">
          This website uses{" "}
          <span className="font-bold text-white">cookies</span>.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          className="px-5 py-2 text-gray-300 rounded-md border-gray-900"
          onClick={() => setCookieConsent(false)}
        >
          Decline
        </button>
        <button
          className="bg-gray-900 px-5 py-2 text-white rounded-lg"
          onClick={() => setCookieConsent(true)}
        >
          Allow Cookies
        </button>
      </div>
    </div>
  );
}
