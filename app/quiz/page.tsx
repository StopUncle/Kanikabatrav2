import { Metadata } from "next";
import QuizLanding from "./QuizLanding";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import { QUIZ_INFO } from "@/lib/quiz-data";
import {
  generateBreadcrumbSchema,
  generatePersonSchema,
} from "@/lib/schema";

const BASE_URL = SITE_CONFIG.url;

// SEO-tuned title/description: leads with brand ("Dark Mirror Assessment"),
// trails with the long-tail keyword density that buyer queries actually use
// ("cluster B personality test for women / dark psychology quiz"). Description
// hits the comparison ("not your average Dark Triad test") because Dark Triad
// is the head term and we want positional advantage in the comparative SERP.
export const metadata: Metadata = {
  title:
    "Dark Mirror Assessment. Cluster B Personality Test (Free) | Kanika Batra",
  description:
    "A 6-axis personality assessment for women. Discover whether your dominant traits are Psychopathic, Sociopathic, Narcissistic, Borderline, or Histrionic, written by a clinically diagnosed sociopath. Free to take, 5 minutes, 20 scenarios.",
  keywords:
    "dark mirror assessment, dark psychology quiz, cluster B personality test, am I a sociopath quiz, am I a narcissist quiz, dark triad test for women, borderline personality test, histrionic personality quiz, psychopath test online",
  alternates: {
    canonical: `${BASE_URL}/quiz`,
  },
  openGraph: {
    title:
      "The Dark Mirror Assessment. See What's Really Looking Back",
    description:
      "A psychological assessment for women revealing your dominant patterns across six personality types. Psychopathic, Sociopathic, Narcissistic, Borderline, Histrionic, Neurotypical. 20 scenarios. Brutal truth.",
    type: "website",
    url: `${BASE_URL}/quiz`,
    siteName: SITE_CONFIG.name,
    images: ["/images/quiz-og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dark Mirror Assessment",
    description:
      "Six personality types. Twenty scenarios. Five minutes. See what's really looking back.",
    images: ["/images/quiz-og.jpg"],
  },
};

// Schema.org Quiz type, the actual schema for an online assessment. Google
// has rich-result support for educational Quiz markup; even where it doesn't
// surface a rich card it strengthens topical relevance for "personality
// quiz" / "online assessment" queries. Pairs with the FAQPage schema
// emitted by the FAQSection component inside QuizLanding.
function generateQuizSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: QUIZ_INFO.name,
    description: QUIZ_INFO.description,
    url: `${BASE_URL}/quiz`,
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: "Personality Psychology",
    },
    about: [
      {
        "@type": "Thing",
        name: "Cluster B Personality Disorders",
        sameAs: "https://en.wikipedia.org/wiki/Cluster_B_personality_disorders",
      },
      { "@type": "Thing", name: "Dark Triad" },
      { "@type": "Thing", name: "Antisocial Personality Disorder" },
      { "@type": "Thing", name: "Narcissistic Personality Disorder" },
      { "@type": "Thing", name: "Borderline Personality Disorder" },
      { "@type": "Thing", name: "Histrionic Personality Disorder" },
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
    offers: {
      "@type": "Offer",
      price: QUIZ_INFO.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      description: "Unlock the full Dark Mirror report, clinical-style diagnosis with functioning level and detailed analysis delivered to your email.",
    },
  };
}

export default function QuizPage() {
  const schemas = [
    generateQuizSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Dark Mirror Assessment", url: `${BASE_URL}/quiz` },
    ]),
    generatePersonSchema(),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <QuizLanding />
    </>
  );
}
