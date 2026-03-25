import { Metadata } from "next";
import CoachingPageClient from "./CoachingPageClient";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Coaching with Kanika Batra — I Tell You What I See",
  description:
    "1:1 coaching for men and women. Single sessions, intensive programmes, career strategy, or ongoing retainer. No softening, no filtering.",
  keywords:
    "kanika batra coaching, 1 on 1 coaching, relationship coaching, pattern recognition, dark psychology coaching",
  alternates: {
    canonical: `${SITE_CONFIG.url}/coaching`,
  },
  openGraph: {
    title: "Coaching with Kanika Batra — I Tell You What I See",
    description:
      "1:1 coaching. No softening, no filtering. Limited spots each month.",
    type: "website",
    images: ["/api/og?title=Coaching+with+Kanika&subtitle=I+Tell+You+What+I+See"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coaching with Kanika Batra",
    description:
      "1:1 coaching. No softening, no filtering. Limited spots each month.",
    images: ["/api/og?title=Coaching+with+Kanika&subtitle=I+Tell+You+What+I+See"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Kanika Batra's coaching therapy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Kanika is not a licensed therapist and does not treat mental health conditions. This is strategic coaching — she tells you what she sees in a situation and gives you a concrete next move.",
      },
    },
    {
      "@type": "Question",
      name: "What if I don't know what to talk about in a coaching session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The situation that made you look at this page — that's what you talk about. A person, a pattern, a decision you can't make. Bring whatever's keeping you up at night.",
      },
    },
    {
      "@type": "Question",
      name: "How do I prepare for a coaching session with Kanika Batra?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Think about the one situation you most want clarity on. The more specific you are, the more useful the session will be. Screenshots, context, and backstory all help.",
      },
    },
    {
      "@type": "Question",
      name: "What is the refund policy for coaching sessions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you book and genuinely can't make it, the session can be rescheduled once. No refunds after the session happens — you're paying for time and attention, and you'll get both.",
      },
    },
    {
      "@type": "Question",
      name: "Can I upgrade to a longer coaching programme after a single session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If you do a single session and want to go deeper, what you paid will be credited toward the Intensive or Career programme.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can I book a coaching session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the month. Sometimes there are spots within the week, sometimes it's a 2-3 week wait. Retainer clients get priority scheduling.",
      },
    },
    {
      "@type": "Question",
      name: "Is coaching with Kanika Batra confidential?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Completely. What you share stays between you and Kanika. No details, names, or situations are shared on social media or with anyone else.",
      },
    },
  ],
};

export default function CoachingPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <CoachingPageClient />
    </>
  );
}
