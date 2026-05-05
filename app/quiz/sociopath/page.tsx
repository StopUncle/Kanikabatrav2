import { Metadata } from "next";
import SociopathQuizLanding from "./SociopathQuizLanding";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import {
  SOCIOPATH_QUIZ_INFO,
  SOCIOPATH_QUIZ_FAQ,
} from "@/lib/quiz-sociopath-data";
import {
  generateBreadcrumbSchema,
  generatePersonSchema,
} from "@/lib/schema";

const BASE_URL = SITE_CONFIG.url;

// SEO-tuned title/description: leads with the buyer query phrasing
// ("sociopath test", "am I a sociopath") because that's the exact text
// people type into search bars. Trails with the differentiation hook
// ("by a real one") and brand qualifier so the SERP shows the unique
// positioning next to the long-tail keyword match.
//
// Disclaimer policy: every customer-facing surface (this title, the
// OG blurb, the FAQ rich result, the take page header, the results
// page) must hold the same line, educational only, not diagnostic.
// If you edit any copy here, mirror the disclaimer language in the
// equivalent surface for legal-protection consistency.
export const metadata: Metadata = {
  title:
    "Sociopath Test (LSRP-Calibrated) · Built by a Real One | Kanika Rose",
  description:
    "A 26-item sociopath test built on the Levenson Self-Report Psychopathy Scale (LSRP). Two subscales (Primary cold-core and Secondary impulsive-shell), scored against published research norms (n=487). Free, ~5 minutes. Written by a clinically diagnosed author. Educational only, not a diagnosis.",
  keywords:
    "sociopath test, am I a sociopath, psychopathy test, LSRP, Levenson Self-Report Psychopathy Scale, primary psychopathy, secondary psychopathy, ASPD test, antisocial personality test, dark psychology quiz, free sociopath quiz",
  alternates: {
    canonical: `${BASE_URL}/quiz/sociopath`,
  },
  openGraph: {
    title:
      "The Sociopath Test · Calibrated by the LSRP. Written by a Real One.",
    description:
      "26 items, two subscales, scored against published research norms. The instrument the field uses, the voice no other quiz site has. 5 minutes. Free. Educational only, not a diagnosis.",
    type: "website",
    url: `${BASE_URL}/quiz/sociopath`,
    siteName: SITE_CONFIG.name,
    images: ["/images/quiz-og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sociopath Test · By a Real One",
    description:
      "LSRP-calibrated. Two subscales. Five minutes. Free. Educational, not diagnostic.",
    images: ["/images/quiz-og.jpg"],
  },
};

// Schema.org Quiz markup. Google has rich-result support for
// educational Quiz markup; even when it doesn't surface a rich card,
// it strengthens topical relevance for "sociopath test" / "psychopathy
// quiz" queries. Pairs with the FAQPage schema emitted by FAQSection.
function generateSociopathQuizSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: SOCIOPATH_QUIZ_INFO.name,
    description: SOCIOPATH_QUIZ_INFO.description,
    url: `${BASE_URL}/quiz/sociopath`,
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: "Personality Psychology",
    },
    about: [
      {
        "@type": "Thing",
        name: "Antisocial Personality Disorder",
        sameAs:
          "https://en.wikipedia.org/wiki/Antisocial_personality_disorder",
      },
      {
        "@type": "Thing",
        name: "Psychopathy",
        sameAs: "https://en.wikipedia.org/wiki/Psychopathy",
      },
      {
        "@type": "Thing",
        name: "Levenson Self-Report Psychopathy Scale",
        sameAs:
          "https://en.wikipedia.org/wiki/Levenson_Self-Report_Psychopathy_Scale",
      },
      { "@type": "Thing", name: "Primary Psychopathy" },
      { "@type": "Thing", name: "Secondary Psychopathy" },
      { "@type": "Thing", name: "Cluster B Personality Disorders" },
    ],
    timeRequired: `PT${SOCIOPATH_QUIZ_INFO.estimatedMinutes}M`,
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
    // indexers see the educational-only positioning at the schema
    // level, not just in body copy. This matters for SEO trust signals
    // AND for liability, anyone scraping the page sees the disclaimer
    // as a first-class field.
    disclaimer: SOCIOPATH_QUIZ_INFO.disclaimer,
    // The LSRP is the underlying instrument; surface it in citation
    // form so academic-search-aware crawlers can pick up the lineage.
    citation: SOCIOPATH_QUIZ_INFO.basedOn,
  };
}

// FAQPage schema, eligible for FAQ rich result in SERP. Disclaimer
// surfaces inside multiple Q&A items so the rich result itself
// carries the disclaimer language even before a click.
function generateFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SOCIOPATH_QUIZ_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export default function SociopathQuizPage() {
  const schemas = [
    generateSociopathQuizSchema(),
    generateFaqSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Quiz", url: `${BASE_URL}/quiz` },
      { name: "Sociopath Test", url: `${BASE_URL}/quiz/sociopath` },
    ]),
    generatePersonSchema(),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <SociopathQuizLanding />
    </>
  );
}
