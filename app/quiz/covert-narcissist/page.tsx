import { Metadata } from "next";
import CovertNarcissistQuizLanding from "./CovertNarcissistQuizLanding";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import {
  COVERT_NARCISSIST_QUIZ_INFO,
  COVERT_NARCISSIST_QUIZ_FAQ,
} from "@/lib/quiz-covert-narcissist-data";
import {
  generateBreadcrumbSchema,
  generatePersonSchema,
} from "@/lib/schema";

const BASE_URL = SITE_CONFIG.url;

export const metadata: Metadata = {
  title:
    "Covert Narcissist Test (HSNS, Calibrated) · The Quiet Version | Kanika Rose",
  description:
    "A 10-item covert narcissist test built on the Hypersensitive Narcissism Scale (HSNS, Hendin & Cheek 1997). Measures vulnerable / covert narcissism, the pattern the NPI systematically underreads. Scored against published norms (M=26.7, SD=6.6). Free, ~3 minutes. Educational only.",
  keywords:
    "covert narcissist test, vulnerable narcissism test, hypersensitive narcissism scale, HSNS, am I a covert narcissist, covert narcissism quiz, vulnerable narcissist test, covert narcissist signs, covert NPD test",
  alternates: {
    canonical: `${BASE_URL}/quiz/covert-narcissist`,
  },
  openGraph: {
    title:
      "The Covert Narcissist Test · HSNS Calibrated. The Quiet Version of the Loud Disorder.",
    description:
      "10 items, single subscale, scored against published research norms. Vulnerable narcissism, the pattern the NPI-40 systematically misses. 3 minutes. Free. Educational, not diagnostic.",
    type: "website",
    url: `${BASE_URL}/quiz/covert-narcissist`,
    siteName: SITE_CONFIG.name,
    images: ["/images/quiz-og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Covert Narcissist Test · HSNS by Kanika Rose",
    description:
      "Vulnerable narcissism. HSNS calibrated. Three minutes. Educational only.",
    images: ["/images/quiz-og.jpg"],
  },
};

function generateCovertNarcissistQuizSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: COVERT_NARCISSIST_QUIZ_INFO.name,
    description: COVERT_NARCISSIST_QUIZ_INFO.description,
    url: `${BASE_URL}/quiz/covert-narcissist`,
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
      { "@type": "Thing", name: "Vulnerable Narcissism" },
      { "@type": "Thing", name: "Hypersensitive Narcissism Scale" },
      { "@type": "Thing", name: "Covert Narcissism" },
    ],
    timeRequired: `PT${COVERT_NARCISSIST_QUIZ_INFO.estimatedMinutes}M`,
    isAccessibleForFree: true,
    inLanguage: "en",
    author: { "@type": "Person", name: SITE_CONFIG.name, url: BASE_URL },
    publisher: { "@type": "Organization", name: SITE_CONFIG.name, url: BASE_URL },
    disclaimer: COVERT_NARCISSIST_QUIZ_INFO.disclaimer,
    citation: COVERT_NARCISSIST_QUIZ_INFO.basedOn,
  };
}

function generateFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: COVERT_NARCISSIST_QUIZ_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export default function CovertNarcissistQuizPage() {
  const schemas = [
    generateCovertNarcissistQuizSchema(),
    generateFaqSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Quiz", url: `${BASE_URL}/quiz` },
      {
        name: "Covert Narcissist Test",
        url: `${BASE_URL}/quiz/covert-narcissist`,
      },
    ]),
    generatePersonSchema(),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <CovertNarcissistQuizLanding />
    </>
  );
}
