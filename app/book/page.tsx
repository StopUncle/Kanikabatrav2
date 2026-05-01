import { Metadata } from "next";
import BookPageClient from "./BookPageClient";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sociopathic Dating Bible | Kanika Batra",
  description:
    "Not how to recover from one. How to spot the next one before they spot you. The clinical operator's manual on dark psychology, written by a clinically diagnosed sociopath.",
  keywords:
    "dark psychology, manipulation tactics, sociopath, narcissist recognition, pattern recognition, cluster b personality, kanika batra book, operator's manual, sociopathic dating bible",
  alternates: {
    canonical: `${SITE_CONFIG.url}/book`,
  },
  openGraph: {
    title: "Sociopathic Dating Bible — The Operator's Manual",
    description:
      "Not how to recover from one. How to spot the next one before they spot you.",
    type: "website",
    images: ["/api/og?title=Sociopathic+Dating+Bible&subtitle=The+Operator%27s+Manual"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sociopathic Dating Bible",
    description:
      "Not how to recover from one. How to spot the next one before they spot you. By a clinically diagnosed sociopath.",
    images: ["/api/og?title=Sociopathic+Dating+Bible&subtitle=The+Operator%27s+Manual"],
  },
};

export default function BookPage() {
  return <BookPageClient />;
}
