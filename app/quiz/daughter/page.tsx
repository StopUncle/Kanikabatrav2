import { Metadata } from "next";
import DaughterQuizLanding from "./DaughterQuizLanding";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import { DAUGHTER_QUIZ_INFO } from "@/lib/quiz-daughter-data";
import {
  generateBreadcrumbSchema,
  generatePersonSchema,
} from "@/lib/schema";

const BASE_URL = SITE_CONFIG.url;

// SEO-tuned title/description: leads with the buyer query phrasing
// ("am I a daughter of a narcissist") because that's the exact text women
// in the niche type into search bars. Trails with the brand qualifier so
// the SERP shows authorship credibility next to the long-tail match.
//
// IMPORTANT, disclaimer status: this metadata describes the assessment as
// "educational" not "diagnostic." Every customer-facing surface (this title,
// the OpenGraph blurb, the FAQ, the take page header, the results page)
// must hold the same line: not medical advice, not a diagnosis. If you
// edit any copy here, mirror the disclaimer language in the equivalent
// surface for the legal-protection consistency.
export const metadata: Metadata = {
  title:
    "Am I a Daughter of a Narcissist?. The Daughter Pattern Assessment | Kanika Batra",
  description:
    "A 20-scenario assessment for adult daughters of (likely) narcissistic mothers. Maps your trauma response across six profiles. Hypervigilant, Fawn, Over-Functioner, Scapegoat, Golden Cage, Sovereign and reads how strongly your mother's behaviour matches the NPD pattern. Free, ~6 minutes. Educational only, not medical advice or a diagnosis.",
  keywords:
    "am I a daughter of a narcissist, daughter of narcissistic mother test, narcissistic mother quiz, am I the scapegoat quiz, golden child quiz, anxious attachment quiz, fawn response test, daughters of narcissists, narcissistic mother daughter pattern",
  alternates: {
    canonical: `${BASE_URL}/quiz/daughter`,
  },
  openGraph: {
    title:
      "The Daughter Pattern Assessment. What Twenty Years Built Into You",
    description:
      "A 20-scenario assessment for daughters of narcissistic mothers. Six profiles across the daughter-of-narcissist spectrum. 6 minutes. Free. Educational only, not medical advice or a clinical diagnosis.",
    type: "website",
    url: `${BASE_URL}/quiz/daughter`,
    siteName: SITE_CONFIG.name,
    images: ["/images/quiz-og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Daughter Pattern Assessment",
    description:
      "Six daughter-of-narcissist profiles. Twenty scenarios. Six minutes. Educational, not diagnostic.",
    images: ["/images/quiz-og.jpg"],
  },
};

function generateDaughterQuizSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: DAUGHTER_QUIZ_INFO.name,
    description: DAUGHTER_QUIZ_INFO.description,
    url: `${BASE_URL}/quiz/daughter`,
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: "Family Systems & Trauma Response",
    },
    about: [
      {
        "@type": "Thing",
        name: "Narcissistic Personality Disorder",
        sameAs:
          "https://en.wikipedia.org/wiki/Narcissistic_personality_disorder",
      },
      { "@type": "Thing", name: "Adult Children of Narcissists" },
      { "@type": "Thing", name: "Anxious Attachment" },
      { "@type": "Thing", name: "Fawn Response" },
      { "@type": "Thing", name: "Cluster B Personality Disorders" },
      { "@type": "Thing", name: "Family Systems Theory" },
    ],
    timeRequired: "PT7M",
    isAccessibleForFree: true,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: BASE_URL,
    },
    // Disclaimer surfaced in structured data so search engines and AI
    // indexers see the educational-only positioning at the schema level,
    // not just in the body copy. This matters for SEO trust signals AND
    // for liability, anyone scraping the page sees the disclaimer as
    // a first-class field.
    disclaimer:
      "Educational and reflective use only. Not a clinical diagnosis or medical advice. See full disclaimer on the assessment page.",
  };
}

export default function DaughterQuizPage() {
  const schemas = [
    generateDaughterQuizSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Quiz", url: `${BASE_URL}/quiz` },
      { name: "Daughter Pattern Assessment", url: `${BASE_URL}/quiz/daughter` },
    ]),
    generatePersonSchema(),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <DaughterQuizLanding />
    </>
  );
}
