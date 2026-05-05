import { Metadata } from "next";
import BPDQuizLanding from "./BPDQuizLanding";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import { BPD_QUIZ_INFO, BPD_QUIZ_FAQ } from "@/lib/quiz-bpd-data";
import {
  generateBreadcrumbSchema,
  generatePersonSchema,
} from "@/lib/schema";

const BASE_URL = SITE_CONFIG.url;

export const metadata: Metadata = {
  title:
    "BPD Test (MSI-BPD, Calibrated) · The Screen the Field Uses | Kanika Rose",
  description:
    "A 10-item Borderline Personality Disorder test built on the McLean Screening Instrument (MSI-BPD, Zanarini 2003). Items map to the 9 DSM-5 BPD criteria. Cutoff ≥7 indicates likely BPD per the validation study (81% sensitivity, 85% specificity). Free, ~2 minutes. Educational only, not a diagnosis.",
  keywords:
    "BPD test, borderline personality disorder test, MSI-BPD, am I borderline, BPD quiz, BPD screening, borderline test online, McLean Screening Instrument, BPD self-test",
  alternates: {
    canonical: `${BASE_URL}/quiz/bpd`,
  },
  openGraph: {
    title:
      "The BPD Test · MSI-BPD Calibrated. The Screen the Field Uses.",
    description:
      "10 yes/no items mapped to the 9 DSM-5 BPD criteria. Established cutoff (≥7) for likely BPD. 2 minutes. Free. Educational, not diagnostic.",
    type: "website",
    url: `${BASE_URL}/quiz/bpd`,
    siteName: SITE_CONFIG.name,
    images: ["/images/quiz-og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The BPD Test · MSI-BPD by Kanika Rose",
    description:
      "10 yes/no items, mapped to DSM-5 criteria. Two minutes.",
    images: ["/images/quiz-og.jpg"],
  },
};

function generateBPDQuizSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: BPD_QUIZ_INFO.name,
    description: BPD_QUIZ_INFO.description,
    url: `${BASE_URL}/quiz/bpd`,
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: "Personality Psychology",
    },
    about: [
      {
        "@type": "Thing",
        name: "Borderline Personality Disorder",
        sameAs:
          "https://en.wikipedia.org/wiki/Borderline_personality_disorder",
      },
      { "@type": "Thing", name: "MSI-BPD" },
      { "@type": "Thing", name: "Cluster B Personality Disorders" },
      { "@type": "Thing", name: "Dialectical Behavior Therapy" },
    ],
    timeRequired: `PT${BPD_QUIZ_INFO.estimatedMinutes}M`,
    isAccessibleForFree: true,
    inLanguage: "en",
    author: { "@type": "Person", name: SITE_CONFIG.name, url: BASE_URL },
    publisher: { "@type": "Organization", name: SITE_CONFIG.name, url: BASE_URL },
    disclaimer: BPD_QUIZ_INFO.disclaimer,
    citation: BPD_QUIZ_INFO.basedOn,
  };
}

function generateFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BPD_QUIZ_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export default function BPDQuizPage() {
  const schemas = [
    generateBPDQuizSchema(),
    generateFaqSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Quiz", url: `${BASE_URL}/quiz` },
      { name: "BPD Test", url: `${BASE_URL}/quiz/bpd` },
    ]),
    generatePersonSchema(),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <BPDQuizLanding />
    </>
  );
}
