import { Metadata } from "next";
import DatingSociopathQuizLanding from "./DatingSociopathQuizLanding";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import {
  DATING_QUIZ_INFO,
  DATING_QUIZ_FAQ,
} from "@/lib/quiz-dating-sociopath-data";
import {
  generateBreadcrumbSchema,
  generatePersonSchema,
} from "@/lib/schema";

const BASE_URL = SITE_CONFIG.url;

export const metadata: Metadata = {
  title:
    "Am I Dating a Sociopath? · 20-Scenario Partner-Detection Quiz | Kanika Rose",
  description:
    "A 20-scenario partner-detection quiz drawn from the Sociopathic Dating Bible. Two axes, Behavioural Red Flags (visible patterns) and Internal Red Flags (the body's read). Combined quadrant interpretation. Free, ~6 minutes. Educational only, not a diagnosis.",
  keywords:
    "am I dating a sociopath, sociopath partner test, am I dating a narcissist, partner red flags quiz, signs you're dating a sociopath, sociopath relationship test, dating a sociopath, sociopathic partner signs",
  alternates: {
    canonical: `${BASE_URL}/quiz/dating-sociopath`,
  },
  openGraph: {
    title:
      "Are You Dating a Sociopath? · Twenty Scenarios From the Sociopathic Dating Bible",
    description:
      "20 scenarios. Two axes. Combined quadrant read. The partner-detection quiz the people in this niche have been waiting for. Free.",
    type: "website",
    url: `${BASE_URL}/quiz/dating-sociopath`,
    siteName: SITE_CONFIG.name,
    images: ["/images/quiz-og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Are You Dating a Sociopath? · By Kanika Rose",
    description:
      "20-scenario partner-detection quiz. Two axes. Six minutes. Free.",
    images: ["/images/quiz-og.jpg"],
  },
};

function generateDatingQuizSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: DATING_QUIZ_INFO.name,
    description: DATING_QUIZ_INFO.description,
    url: `${BASE_URL}/quiz/dating-sociopath`,
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: "Relationship Psychology",
    },
    about: [
      {
        "@type": "Thing",
        name: "Antisocial Personality Disorder",
        sameAs:
          "https://en.wikipedia.org/wiki/Antisocial_personality_disorder",
      },
      { "@type": "Thing", name: "Coercive Control" },
      { "@type": "Thing", name: "Cluster B Personality Disorders" },
      { "@type": "Thing", name: "Partner Detection" },
      { "@type": "Thing", name: "Domestic Violence Awareness" },
    ],
    timeRequired: `PT${DATING_QUIZ_INFO.estimatedMinutes}M`,
    isAccessibleForFree: true,
    inLanguage: "en",
    author: { "@type": "Person", name: SITE_CONFIG.name, url: BASE_URL },
    publisher: { "@type": "Organization", name: SITE_CONFIG.name, url: BASE_URL },
    disclaimer: DATING_QUIZ_INFO.disclaimer,
  };
}

function generateFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: DATING_QUIZ_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export default function DatingSociopathQuizPage() {
  const schemas = [
    generateDatingQuizSchema(),
    generateFaqSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Quiz", url: `${BASE_URL}/quiz` },
      {
        name: "Are You Dating a Sociopath?",
        url: `${BASE_URL}/quiz/dating-sociopath`,
      },
    ]),
    generatePersonSchema(),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <DatingSociopathQuizLanding />
    </>
  );
}
