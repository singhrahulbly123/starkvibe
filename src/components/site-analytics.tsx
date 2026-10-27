"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const consentKey = "starkvibe-analytics-consent";
const googleAdsId = "AW-18533455332";

export function SiteAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const googleTagId = measurementId || googleAdsId;
  const [consent, setConsent] = useState<"granted" | "denied" | "unknown">("unknown");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const saved = window.localStorage.getItem(consentKey);
    if (saved === "granted" || saved === "denied") setConsent(saved);
  }, []);

  useEffect(() => {
    const update = () => {
      const saved = window.localStorage.getItem(consentKey);
      if (saved === "granted" || saved === "denied") setConsent(saved);
    };
    window.addEventListener("starkvibe-consent-changed", update);
    return () => window.removeEventListener("starkvibe-consent-changed", update);
  }, []);

  useEffect(() => {
    if (consent === "granted" && measurementId && window.gtag) {
      trackEvent("page_view", { page_path: `${pathname}${searchParams.size ? `?${searchParams}` : ""}` });
    }
  }, [consent, measurementId, pathname, searchParams]);

  function saveConsent(value: "granted" | "denied") {
    window.localStorage.setItem(consentKey, value);
    setConsent(value);
    window.dispatchEvent(new Event("starkvibe-consent-changed"));
  }

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`} strategy="afterInteractive" />
          <Script id="starkvibe-google-tags" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); ${measurementId ? `gtag('config', '${measurementId}', { anonymize_ip: true, send_page_view: false });` : ""} gtag('config', '${googleAdsId}');`}</Script>
        </>
      )}
      {(measurementId || googleAdsId) && consent === "unknown" && (
        <div className="fixed inset-x-3 bottom-3 z-[120] mx-auto flex max-w-[680px] flex-wrap items-center justify-between gap-4 border border-ink bg-paper p-4 text-sm text-ink shadow-xl" role="dialog" aria-label="Analytics preferences">
          <p className="max-w-[450px] leading-5">We use analytics and advertising measurement to understand site visits and improve StarkVibe. Read our <a className="font-semibold underline" href="/privacy-policy">Privacy Policy</a>.</p>
          <div className="flex gap-2"><button onClick={() => saveConsent("denied")} className="border border-ink px-4 py-2 font-semibold">Decline</button><button onClick={() => saveConsent("granted")} className="bg-ink px-4 py-2 font-semibold text-paper">Accept analytics</button></div>
        </div>
      )}
    </>
  );
}
