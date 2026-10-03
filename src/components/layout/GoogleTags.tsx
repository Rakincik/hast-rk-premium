"use client";

import Script from "next/script";
import { useSiteContent } from "@/context/SiteContentContext";

export default function GoogleTags() {
  const { content } = useSiteContent();
  const gaId = content?.settings?.tracking?.googleAnalyticsId;
  const adsId = content?.settings?.tracking?.googleAdsId;

  if (!gaId && !adsId) return null;

  return (
    <>
      {gaId && (
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      )}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${gaId ? `gtag('config', '${gaId}');` : ""}
            ${adsId ? `gtag('config', '${adsId}');` : ""}
          `,
        }}
      />
    </>
  );
}
