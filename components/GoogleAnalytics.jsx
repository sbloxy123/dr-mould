import Script from "next/script";
import PageviewTracker from "@/components/PageviewTracker";
import { CONSENT_KEY } from "@/lib/analytics";

// gtag with consent mode. The inline script applies the visitor's stored
// cookie choice before `config`, so returning visitors who accepted are
// counted from their first page view. `config` sends that first page view;
// PageviewTracker sends the rest.
//
// `loadGtag` is false on Previews and `next dev`: the dataLayer still fills
// (so consent and page views can be checked there) but nothing reaches GA.
export default function GoogleAnalytics({ GA_MEASUREMENT_ID, loadGtag }) {
  return (
    <>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
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
          `,
        }}
      />
      <PageviewTracker />
      {loadGtag && (
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
      )}
    </>
  );
}
