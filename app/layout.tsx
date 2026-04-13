import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/Footer";
import LazySpeedInsights from "@/components/LazySpeedInsights";
import MotionProvider from "@/components/providers/MotionProvider";
import JsonLd from "@/components/JsonLd";
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DTNLQQ321K"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DTNLQQ321K', { 'anonymize_ip': true });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <MotionProvider>
          <main>{children}</main>
          <Footer />
        </MotionProvider>
        <LazySpeedInsights />
      </body>
    </html>
  );
}
