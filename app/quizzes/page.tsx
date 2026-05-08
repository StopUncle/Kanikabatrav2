import type { Metadata } from "next";
import Link from "next/link";
import {
  Snowflake,
  Crown,
  EyeOff,
  Skull,
  Activity,
  Heart,
  Users,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import JsonLd from "@/components/JsonLd";
import { QUIZ_REGISTRY, type QuizRegistryEntry } from "@/lib/quiz-registry";
import { SITE_CONFIG } from "@/lib/constants";
import {
  generateBreadcrumbSchema,
  generatePersonSchema,
} from "@/lib/schema";

const BASE_URL = SITE_CONFIG.url;

// Public hub for the eight-quiz suite. Lives at /quizzes (plural) so the
// existing /quiz route remains the Dark Mirror landing page; this is the
// "see all the assessments" page above it. Built for SEO topical authority,
// each quiz's slug already ranks for its head term, the hub clusters them
// into a single internal-link node so authority flows across the suite.
//
// The dashboard QuizSuiteSection renders a logged-in version of the same
// idea; this is its public sibling. Both consume the QUIZ_REGISTRY single
// source of truth.

export const metadata: Metadata = {
  title:
    "Personality Quizzes Written by a Diagnosed Sociopath | Kanika Batra",
  description:
    "Eight psychological assessments calibrated against published clinical norms, the Dark Mirror, the Sociopath Test (LSRP-26), the Narcissist Test (NPI-40), the Covert Narcissist Test (HSNS), the Dark Triad (SD3), the BPD screen (MSI-BPD), the partner-detection quiz, and the Daughter Pattern. Free.",
  keywords:
    "personality quiz, dark psychology test, am I a sociopath quiz, am I a narcissist quiz, dark triad test, BPD test, covert narcissist test, sociopath partner test, daughter of a narcissistic mother quiz, cluster B test, kanika batra quiz",
  alternates: {
    canonical: `${BASE_URL}/quizzes`,
  },
  openGraph: {
    title: "The Quiz Suite. Eight Assessments, One Author.",
    description:
      "Eight clinical-grade personality assessments. Free, calibrated, written by an author with the diagnosis the Cluster B half of the suite is built to detect.",
    type: "website",
    url: `${BASE_URL}/quizzes`,
    siteName: SITE_CONFIG.name,
    images: ["/images/quiz-og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eight Personality Quizzes by Kanika Batra",
    description:
      "Sociopath, Narcissist, Covert Narcissist, Dark Triad, BPD, plus partner-detection and the Daughter Pattern. All free.",
    images: ["/images/quiz-og.jpg"],
  },
};

const ICONS: Record<QuizRegistryEntry["iconKey"], LucideIcon> = {
  snowflake: Snowflake,
  crown: Crown,
  "eye-off": EyeOff,
  skull: Skull,
  activity: Activity,
  heart: Heart,
  family: Users,
  mirror: Crown,
};

const TONES: Record<
  QuizRegistryEntry["tone"],
  { iconBg: string; iconText: string; chipText: string; chipBorder: string }
> = {
  blue: {
    iconBg: "bg-blue-400/10",
    iconText: "text-blue-300",
    chipText: "text-blue-300/80",
    chipBorder: "border-blue-300/25",
  },
  amber: {
    iconBg: "bg-amber-400/10",
    iconText: "text-amber-300",
    chipText: "text-amber-300/80",
    chipBorder: "border-amber-300/25",
  },
  rose: {
    iconBg: "bg-rose-400/10",
    iconText: "text-rose-300",
    chipText: "text-rose-300/80",
    chipBorder: "border-rose-300/25",
  },
  indigo: {
    iconBg: "bg-indigo-400/10",
    iconText: "text-indigo-300",
    chipText: "text-indigo-300/80",
    chipBorder: "border-indigo-300/25",
  },
  emerald: {
    iconBg: "bg-emerald-400/10",
    iconText: "text-emerald-300",
    chipText: "text-emerald-300/80",
    chipBorder: "border-emerald-300/25",
  },
  purple: {
    iconBg: "bg-purple-400/10",
    iconText: "text-purple-300",
    chipText: "text-purple-300/80",
    chipBorder: "border-purple-300/25",
  },
  gold: {
    iconBg: "bg-accent-gold/10",
    iconText: "text-accent-gold",
    chipText: "text-accent-gold/80",
    chipBorder: "border-accent-gold/25",
  },
};

function generateItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Personality Quizzes by Kanika Batra",
    description:
      "Eight psychological assessments covering Cluster B personality types, the Dark Triad, partner detection, and family-of-origin patterns.",
    numberOfItems: QUIZ_REGISTRY.length,
    itemListElement: QUIZ_REGISTRY.map((q, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}${q.href}`,
      name: q.title,
    })),
  };
}

export default function QuizzesHubPage() {
  const schemas = [
    generateItemListSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Quizzes", url: `${BASE_URL}/quizzes` },
    ]),
    generatePersonSchema(),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <BackgroundEffects />
      <Header />

      <main className="min-h-screen pt-28 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-warm-gold/90 uppercase tracking-[0.3em] text-xs sm:text-sm mb-4">
              The Quiz Suite
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-wider uppercase mb-6"
              style={{
                background:
                  "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Eight Assessments
            </h1>
            <p className="text-text-gray text-lg lg:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Calibrated against the published clinical norms. Written by an
              author with the diagnosis the Cluster B half of this suite is
              built to detect.
            </p>
            <p className="text-text-gray/70 text-sm font-light max-w-2xl mx-auto mt-4 leading-relaxed">
              Pick a starting door. The Dark Mirror is the wide map; the rest
              are calibrated reads on a single axis. None of them diagnose;
              all of them tell the truth more usefully than the binary will.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {QUIZ_REGISTRY.map((q) => {
              const Icon = ICONS[q.iconKey];
              const tone = TONES[q.tone];
              return (
                <Link
                  key={q.slug}
                  href={q.href}
                  className="group block p-6 bg-deep-black/40 border border-warm-gold/15 rounded-2xl hover:border-warm-gold/40 hover:bg-deep-black/60 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`shrink-0 w-11 h-11 rounded-full ${tone.iconBg} flex items-center justify-center`}
                    >
                      <Icon
                        size={20}
                        className={tone.iconText}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-white font-light text-lg leading-snug mb-1 group-hover:text-warm-gold transition-colors">
                        {q.title}
                      </h2>
                      <p
                        className={`text-[11px] uppercase tracking-[0.2em] ${tone.chipText}`}
                      >
                        {q.caption}
                      </p>
                    </div>
                  </div>

                  <p className="text-text-gray text-sm leading-relaxed mb-4">
                    {q.blurb}
                  </p>

                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-text-gray/60">
                    <span>
                      {q.minutes} min · {q.itemCount} items
                    </span>
                    <span className="inline-flex items-center gap-1 text-warm-gold/80 group-hover:text-warm-gold transition-colors">
                      Take
                      <ArrowRight size={12} strokeWidth={1.5} />
                    </span>
                  </div>

                  <p className="mt-3 text-[10px] tracking-wide text-text-gray/40 truncate">
                    {q.instrument}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto p-8 rounded-2xl border border-warm-gold/20 bg-gradient-to-br from-deep-burgundy/20 to-deep-navy/10 text-center">
            <p className="text-warm-gold text-[11px] uppercase tracking-[0.3em] mb-3">
              Where this gets practised
            </p>
            <h2 className="text-white text-2xl font-light mb-3">
              The Consilium, $29/month
            </h2>
            <p className="text-text-gray font-light max-w-xl mx-auto leading-relaxed mb-6">
              The Dark Mirror Simulator runs the patterns these quizzes
              measure as branching scenarios you actually play through. Plus
              the classroom, voice notes, and a moderated community. Cancel
              any time.
            </p>
            <Link
              href="/consilium"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-warm-gold text-deep-black font-medium tracking-wider uppercase text-sm transition-all hover:bg-warm-gold/90"
            >
              Step Inside
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
