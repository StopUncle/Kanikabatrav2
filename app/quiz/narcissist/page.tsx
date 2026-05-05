import { Metadata } from "next";
import NarcissistQuizLanding from "./NarcissistQuizLanding";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import {
  NARCISSIST_QUIZ_INFO,
  NARCISSIST_QUIZ_FAQ,
} from "@/lib/quiz-narcissist-data";
import {
  generateBreadcrumbSchema,
  generatePersonSchema,
} from "@/lib/schema";

const BASE_URL = SITE_CONFIG.url;

export const metadata: Metadata = {
  title:
    "Narcissist Test (NPI-40, Calibrated) · Read by a Real One | Kanika Rose",
  description:
    "A 40-item forced-choice narcissist test built on the Narcissistic Personality Inventory (NPI-40, Raskin & Terry 1988). Two subscales: Grandiose Confidence and Predatory Pattern. Scored against published population norms (M=15.3, SD=6.8). Free, ~7 minutes. Educational only, not a diagnosis.",
  keywords:
    "narcissist test, NPI-40, Narcissistic Personality Inventory, am I a narcissist, narcissism test free, grandiose narcissism, dark triad narcissism, NPD test, narcissistic personality test",
  alternates: {
    canonical: `${BASE_URL}/quiz/narcissist`,
  },
  openGraph: {
    title:
      "The Narcissist Test · NPI-40 Calibrated. Read by a Real One.",
    description:
      "40 forced-choice items, two subscales, scored against published research norms. The instrument the field uses, the read no other quiz site offers. 7 minutes. Free. Educational, not diagnostic.",
    type: "website",
    url: `${BASE_URL}/quiz/narcissist`,
    siteName: SITE_CONFIG.name,
    images: ["/images/quiz-og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Narcissist Test · NPI-40 by Kanika Rose",
    description:
      "NPI-40 calibrated. Two subscales. Seven minutes. Educational only.",
    images: ["/images/quiz-og.jpg"],
  },
};

function generateNarcissistQuizSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: NARCISSIST_QUIZ_INFO.name,
    description: NARCISSIST_QUIZ_INFO.description,
    url: `${BASE_URL}/quiz/narcissist`,
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: "Personality Psychology",
    },
    about: [
      {
        "@type": "Thing",
        name: "Narcissistic Personality Disorder",
        sameAs:
          "https://en.wikipedia.org/wiki/Narcissistic_personality_disorder",
      },
      {
        "@type": "Thing",
        name: "Narcissistic Personality Inventory",
        sameAs:
          "https://en.wikipedia.org/wiki/Narcissistic_Personality_Inventory",
      },
      { "@type": "Thing", name: "Grandiose Narcissism" },
      { "@type": "Thing", name: "Cluster B Personality Disorders" },
    ],
    timeRequired: `PT${NARCISSIST_QUIZ_INFO.estimatedMinutes}M`,
    isAccessibleForFree: true,
    inLanguage: "en",
    author: { "@type": "Person", name: SITE_CONFIG.name, url: BASE_URL },
    publisher: { "@type": "Organization", name: SITE_CONFIG.name, url: BASE_URL },
    disclaimer: NARCISSIST_QUIZ_INFO.disclaimer,
    citation: NARCISSIST_QUIZ_INFO.basedOn,
  };
}

function generateFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: NARCISSIST_QUIZ_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export default function NarcissistQuizPage() {
  const schemas = [
    generateNarcissistQuizSchema(),
    generateFaqSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Quiz", url: `${BASE_URL}/quiz` },
      { name: "Narcissist Test", url: `${BASE_URL}/quiz/narcissist` },
    ]),
    generatePersonSchema(),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <NarcissistQuizLanding />
    </>
  );
}
