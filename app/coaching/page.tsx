import { Metadata } from "next";
import CoachingPageClient from "./CoachingPageClient";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Coaching with Kanika Batra — See What Everyone Else Misses",
  description:
    "1:1 coaching with a diagnosed sociopath. The Read, Pattern Reset, and Private Retainer. See what everyone else misses.",
  keywords:
    "kanika batra coaching, 1 on 1 coaching, relationship coaching, pattern recognition, dark psychology coaching",
  alternates: {
    canonical: `${SITE_CONFIG.url}/coaching`,
  },
  openGraph: {
    title: "Coaching with Kanika Batra — See What Everyone Else Misses",
    description:
      "1:1 coaching with a diagnosed sociopath. See what everyone else misses.",
    type: "website",
    images: ["/api/og?title=Coaching+with+Kanika&subtitle=See+What+Everyone+Else+Misses"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coaching with Kanika Batra",
    description:
      "1:1 coaching with a diagnosed sociopath. See what everyone else misses.",
    images: ["/api/og?title=Coaching+with+Kanika&subtitle=See+What+Everyone+Else+Misses"],
  },
};

export default function CoachingPage() {
  return <CoachingPageClient />;
}
