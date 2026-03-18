import { Metadata } from "next";
import Script from "next/script";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kanika Batra — I see what you can't.",
  description:
    "Diagnosed ASPD. Author. Soprano. Take the quiz, ask a question, or book a private session.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/links`,
  },
  openGraph: {
    title: "Kanika Batra — I see what you can't.",
    description:
      "Diagnosed ASPD. Author. Soprano. Take the quiz, ask a question, or book a private session.",
    url: `${SITE_CONFIG.url}/links`,
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Kanika Batra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanika Batra",
    description: "I see what you can't.",
    images: [`${SITE_CONFIG.url}/og-image.jpg`],
  },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Google Analytics 4 — replace GA_MEASUREMENT_ID with your actual ID */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>

      {/* Meta Pixel — replace META_PIXEL_ID with your actual Pixel ID */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'META_PIXEL_ID');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=META_PIXEL_ID&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      {children}
    </>
  );
}
