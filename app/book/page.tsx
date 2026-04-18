import { Metadata } from "next";
import BookPageClient from "./BookPageClient";
import { SITE_CONFIG } from "@/lib/constants";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";

export const metadata: Metadata = {
  title: "Sociopathic Dating Bible | Kanika Batra",
  description:
    "Learn dark psychology and the inner workings of manipulation. Written by a clinically diagnosed sociopath. Never feel helpless or vulnerable again.",
  keywords:
    "sociopathic dating bible, dating guide, dark psychology dating, manipulation tactics, kanika batra book, dating strategy",
  alternates: {
    canonical: `${SITE_CONFIG.url}/book`,
  },
  openGraph: {
    title: "Sociopathic Dating Bible - A Cure For Empathy",
    description:
      "Learn dark psychology and the inner workings of manipulation. Never feel helpless or vulnerable again.",
    type: "website",
    images: ["/api/og?title=Sociopathic+Dating+Bible&subtitle=A+Cure+For+Empathy"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sociopathic Dating Bible",
    description:
      "Dark psychology and manipulation — written by a clinically diagnosed sociopath. Never feel helpless again.",
    images: ["/api/og?title=Sociopathic+Dating+Bible&subtitle=A+Cure+For+Empathy"],
  },
};

export default async function BookPage() {
  // Look up membership so we can show the member-exclusive $9.99 price
  // instead of $24.99. The server-side checkout endpoint enforces the
  // same rule, so this display lookup is informational only — not a
  // security boundary. Non-members still pay $24.99 even if the prop
  // is spoofed client-side.
  const userId = await optionalServerAuth();
  let isMember = false;
  if (userId) {
    const check = await checkMembership(userId);
    isMember = check.isMember && check.status === "ACTIVE";
  }

  return <BookPageClient isMember={isMember} />;
}
