import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import CookieConsent from "@/components/CookieConsent";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/schema";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com",
  ),
  title: "Kanika Batra - The Psychology of Power",
  description:
    "Psychology of power expert with 670K+ followers. Author, speaker, and clinically diagnosed sociopath teaching strategic psychology that builds obsession and commands authority.",
  keywords:
    "Kanika Batra, sociopath, dark psychology, psychology of power, power dynamics, strategic psychology",
  openGraph: {
    title: "Kanika Batra - The Psychology of Power",
    description:
      "Psychology of power expert with 670K+ followers. Clinically diagnosed sociopath teaching strategic psychology.",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Kanika Batra - The Psychology of Power",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanika Batra - The Psychology of Power",
    description:
      "Psychology of power expert with 670K+ followers. Clinically diagnosed sociopath teaching strategic psychology.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050511",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en">
      <head>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Kanika Batra Blog"
          href="/feed.xml"
        />
        {/*
          Google Analytics is loaded by <CookieConsent /> below, only after
          the user explicitly accepts. Previously it was loaded
          unconditionally here — a GDPR / ePrivacy violation for EU visitors.

          Removed at the same time: the Lemon Squeezy script loader (LS was
          rejected and we're on Stripe now) and PayPal dns-prefetch hints
          (PayPal was fully removed in April 2026).
        */}
      </head>
      <body className={inter.className}>
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
        <CookieConsent />
      </body>
    </html>
  );
}
