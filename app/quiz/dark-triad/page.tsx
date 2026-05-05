import { Metadata } from "next";
import DarkTriadQuizLanding from "./DarkTriadQuizLanding";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import {
  DARK_TRIAD_QUIZ_INFO,
  DARK_TRIAD_QUIZ_FAQ,
} from "@/lib/quiz-dark-triad-data";
import {
  generateBreadcrumbSchema,
  generatePersonSchema,
} from "@/lib/schema";

const BASE_URL = SITE_CONFIG.url;

export const metadata: Metadata = {
  title:
    "Dark Triad Test (SD3, Calibrated) · Read by a Real One | Kanika Rose",
  description:
    "A 27-item Dark Triad test built on the Short Dark Triad (Jones & Paulhus 2014). Three axes — Machiavellianism, Narcissism, Psychopathy — scored against published norms (n=2929). Configuration archetype interpretation. Free, ~5 minutes. Educational only, not a diagnosis.",
  keywords:
    "dark triad test, SD3, Short Dark Triad, machiavellianism test, dark triad quiz, dark triad personality, dark triad measure, Jones Paulhus, dark triad assessment",
  alternates: {
    canonical: `${BASE_URL}/quiz/dark-triad`,
  },
  openGraph: {
    title:
      "The Dark Triad Test · SD3 Calibrated. Read by a Real One.",
    description:
      "27 items, three axes, configuration archetype. The wide map of dark personality. 5 minutes. Free.",
    type: "website",
    url: `${BASE_URL}/quiz/dark-triad`,
    siteName: SITE_CONFIG.name,
    images: ["/images/quiz-og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dark Triad Test · SD3 by Kanika Rose",
    description:
      "Three axes, wide map, calibrated norms. Five minutes.",
    images: ["/images/quiz-og.jpg"],
  },
};

function generateDarkTriadQuizSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: DARK_TRIAD_QUIZ_INFO.name,
    description: DARK_TRIAD_QUIZ_INFO.description,
    url: `${BASE_URL}/quiz/dark-triad`,
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: "Personality Psychology",
    },
    about: [
      {
        "@type": "Thing",
        name: "Dark Triad",
        sameAs: "https://en.wikipedia.org/wiki/Dark_triad",
      },
      { "@type": "Thing", name: "Machiavellianism" },
      { "@type": "Thing", name: "Narcissism" },
      { "@type": "Thing", name: "Psychopathy" },
      { "@type": "Thing", name: "Short Dark Triad" },
    ],
    timeRequired: `PT${DARK_TRIAD_QUIZ_INFO.estimatedMinutes}M`,
    isAccessibleForFree: true,
    inLanguage: "en",
    author: { "@type": "Person", name: SITE_CONFIG.name, url: BASE_URL },
    publisher: { "@type": "Organization", name: SITE_CONFIG.name, url: BASE_URL },
    disclaimer: DARK_TRIAD_QUIZ_INFO.disclaimer,
    citation: DARK_TRIAD_QUIZ_INFO.basedOn,
  };
}

function generateFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: DARK_TRIAD_QUIZ_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export default function DarkTriadQuizPage() {
  const schemas = [
    generateDarkTriadQuizSchema(),
    generateFaqSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Quiz", url: `${BASE_URL}/quiz` },
      { name: "Dark Triad Test", url: `${BASE_URL}/quiz/dark-triad` },
    ]),
    generatePersonSchema(),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <DarkTriadQuizLanding />
    </>
  );
}
