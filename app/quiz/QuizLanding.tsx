"use client";

import { m } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import FAQSection from "@/components/FAQSection";
import { QUIZ_INFO } from "@/lib/quiz-data";
import { ADDITIONAL_QUIZZES } from "@/lib/quiz-registry";
import {
  Crosshair,
  Flame,
  Crown,
  Waves,
  Sparkles,
  Scale,
  ArrowRight,
} from "lucide-react";

// FAQ items chosen to capture long-tail buyer queries: "am I a sociopath
// quiz" / "dark triad vs cluster B" / "personality disorder quiz online" /
// "is the dark mirror accurate" / "am I a narcissist or empath." Each Q
// is intentionally written in the exact phrasing a real searcher uses,
// because Google's FAQPage rich result matches on question phrasing.
// Answers are kept tight (~50–80 words) so they qualify for the rich
// result preview while leaving the full sales pitch above the fold.
const FAQ_ITEMS = [
  {
    question: "What is the Dark Mirror Assessment and what does it measure?",
    answer:
      "The Dark Mirror is a 20-scenario psychological assessment that scores you across six personality patterns: Psychopathic, Sociopathic, Narcissistic, Borderline, Histrionic, and Neurotypical. Unlike standard Big Five tests, it's grounded in the Cluster B framework that clinicians actually use to think about pathological personality and it uses real dating, social, and power scenarios instead of generic agree/disagree statements.",
  },
  {
    question: "How is this different from a Dark Triad personality test?",
    answer:
      "The Dark Triad measures three traits, narcissism, Machiavellianism, and psychopathy. The Dark Mirror covers six patterns and adds the two Cluster B types the Dark Triad omits (Borderline and Histrionic), plus a Neurotypical baseline so you can see your distance from the median. It's also written for women specifically. Most Dark Triad tests are normed on mixed undergraduate samples.",
  },
  {
    question: "Can a quiz tell me if I'm a sociopath, narcissist, or borderline?",
    answer:
      "No quiz can clinically diagnose a personality disorder, only a licensed psychologist can. What this assessment can do is show you which traits are dominant in your personality structure, how those traits shape your behaviour in relationships, and whether the pattern is mild, moderate, or near-clinical. For most people, the answer is closer to 'you have elevated traits in this register' than 'you have the disorder.'",
  },
  {
    question: "How accurate is the Dark Mirror Assessment?",
    answer:
      "The scenarios are calibrated against the diagnostic criteria for Antisocial, Narcissistic, Borderline, and Histrionic Personality Disorders in the DSM-5, and against the Dark Triad psychometric literature. The assessment doesn't replace a clinician, it's an educational tool but it's substantially more rigorous than the BuzzFeed-tier quizzes that dominate the search results. The author is clinically diagnosed with ASPD and writes from the inside.",
  },
  {
    question:
      "Should I take this if I think I'm dating someone with Cluster B traits?",
    answer:
      "Yes but take it for yourself, not for your partner. The most common pattern in people who suspect their partner has a personality disorder is anxious-attached prey behaviour on their own side. Knowing your own profile is what lets you see the dynamic clearly. If you want a target-focused assessment, the recovery and dating posts (linked below) and the Sociopathic Dating Bible cover the partner-detection side.",
  },
  {
    question: "Is the Dark Mirror free? How long does it take?",
    answer: `The 20-scenario assessment is free, about 5 to 7 minutes. Your primary type and a radar-chart preview are returned for free. The full report, clinical-style diagnosis with functioning level (mild / moderate / severe), full per-axis interpretation, and behavioural patterns to watch, unlocks for $${QUIZ_INFO.price} and arrives in your inbox.`,
  },
  {
    question:
      "Am I a narcissist or an empath? Can this quiz help me figure that out?",
    answer:
      "The narcissist-vs-empath framing is mostly a social-media construct, not a clinical one. Most people sit somewhere on a spectrum, not at either pole. The Dark Mirror will surface which traits are dominant in your psychology and whether the pattern is more grandiose (NPD-leaning), more impulsive (BPD-leaning), more cold (ASPD-leaning), or more attention-driven (HPD-leaning). It will tell you the truth more usefully than the binary will.",
  },
  {
    question: "What do I get if I unlock the full report?",
    answer:
      "A multi-page personalised PDF emailed to you within minutes: your scores on all six axes, your dominant type with functioning-level diagnosis (mild / moderate / severe / clinical), behaviours that map to your profile in dating and friendships, the specific patterns you're likely to repeat, and a short reading list, including which chapters of the Sociopathic Dating Bible address your profile most directly.",
  },
];

// Internal-link bridge: each card targets one of the 44 existing posts (or
// the ASPD pillar) that semantically extends one of the six personality
// types in the assessment. SEO purpose: spread quiz-page authority into
// the broader catalogue + give readers a path from "I just took the test"
// to "now I want to read about my type." Ordered to mirror the type grid
// above so Psychopathic ↔ Predator-loyalty, Narcissistic ↔ Narc playbook,
// Borderline ↔ pattern-named etc.
const RELATED_LINKS: Array<{
  href: string;
  title: string;
  description: string;
  type: string;
}> = [
  {
    href: "/quiz/sociopath",
    title: "The Sociopath Test (LSRP-Calibrated)",
    description:
      "The companion quiz: a calibrated read on the Primary and Secondary psychopathy subscales using the Levenson Self-Report Psychopathy Scale. Take this one if your Sociopathic or Psychopathic axis scored high on the Dark Mirror.",
    type: "Companion quiz",
  },
  {
    href: "/quiz/daughter",
    title: "The Daughter Pattern Assessment",
    description:
      "Sister quiz for adult daughters of (likely) narcissistic mothers. Six daughter profiles plus a mother-signal band. Different question; different answer.",
    type: "Sister quiz",
  },
  {
    href: "/blog/dark-triad-personality-types",
    title: "The Dark Triad: Narcissism, Machiavellianism, Psychopathy",
    description:
      "How the three traits actually appear in everyday life, and why they're more common than the academic literature lets on.",
    type: "Foundation",
  },
  {
    href: "/blog/cluster-b-personality-disorders-overview",
    title: "Cluster B Personality Disorders: An Overview",
    description:
      "ASPD, NPD, BPD, HPD, what each one looks like at the dinner table, and how the Dark Mirror's six axes map to them.",
    type: "Foundation",
  },
  {
    href: "/guide/aspd-sociopathy-complete-guide",
    title: "ASPD & Sociopathy. Complete Guide",
    description:
      "The pillar guide on Antisocial Personality Disorder, written by someone clinically diagnosed with it. Read this if your Sociopathic or Psychopathic axis scored high.",
    type: "Pillar",
  },
  {
    href: "/blog/dark-psychology-beginners-guide",
    title: "Dark Psychology. A Beginner's Guide",
    description:
      "What dark psychology actually is (and isn't), why your assessment results matter, and where to start if any axis surprised you.",
    type: "Foundation",
  },
  {
    href: "/blog/signs-dating-a-sociopath",
    title: "Signs You're Dating a Sociopath",
    description:
      "If you took this assessment because someone in your life feels off, start here. Read your Sociopathic axis, then read the partner-detection signs.",
    type: "Recovery",
  },
  {
    href: "/blog/sociopath-vs-psychopath-differences",
    title: "Sociopath vs Psychopath: Real Differences",
    description:
      "The two highest-Cluster-B axes on the assessment confused for each other constantly. Here's what actually separates them and why your scores might split.",
    type: "Foundation",
  },
  {
    href: "/blog/narcissist-playbook-how-they-actually-operate",
    title: "The Narcissist Playbook",
    description:
      "If your Narcissistic axis scored high or you took this thinking about someone else who lives there. This is the operating manual.",
    type: "Recovery",
  },
  {
    href: "/blog/dark-feminine-energy-guide",
    title: "Dark Feminine Energy. A Real Guide",
    description:
      "The aesthetic everyone is talking about, written by someone with an actual clinical framework underneath. The bridge between the test and the lifestyle.",
    type: "Lifestyle",
  },
];

export default function QuizLanding() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6 px-4 py-2 border border-accent-gold/30 rounded-full">
              <span className="text-accent-gold text-sm tracking-[0.2em] uppercase">
                Psychological Assessment
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
              {QUIZ_INFO.name}
            </h1>

            <p className="text-xl sm:text-2xl text-accent-gold font-light mb-8">
              {QUIZ_INFO.tagline}
            </p>

            <p className="text-text-gray text-lg max-w-2xl mx-auto mb-12">
              {QUIZ_INFO.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  {QUIZ_INFO.questionCount}
                </div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  Questions
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  {QUIZ_INFO.estimatedTime}
                </div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  To Complete
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">6</div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  Personality Types
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link href="/quiz/take">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black font-medium text-lg tracking-wider uppercase rounded transition-all hover:shadow-lg hover:shadow-accent-gold/20"
              >
                Begin Assessment
              </m.button>
            </Link>
          </m.div>

          {/* The Six Personality Types */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-white text-center mb-8 tracking-wide">
              The Six Personality Types
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Psychopathic",
                  trait: "Cold & Calculated",
                  Icon: Crosshair,
                },
                {
                  name: "Sociopathic",
                  trait: "Impulsive & Reactive",
                  Icon: Flame,
                },
                {
                  name: "Narcissistic",
                  trait: "Grandiose & Entitled",
                  Icon: Crown,
                },
                { name: "Borderline", trait: "Intense & Unstable", Icon: Waves },
                {
                  name: "Histrionic",
                  trait: "Dramatic & Magnetic",
                  Icon: Sparkles,
                },
                {
                  name: "Neurotypical",
                  trait: "Balanced & Adaptive",
                  Icon: Scale,
                },
              ].map((type, index) => (
                <m.div
                  key={type.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className={`p-5 bg-deep-black/50 border rounded-xl text-center hover:border-accent-gold/40 transition-all duration-300 group ${
                    type.name === "Neurotypical"
                      ? "border-green-600/30 hover:border-green-500/50"
                      : "border-accent-gold/20"
                  }`}
                >
                  <div className={`w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    type.name === "Neurotypical"
                      ? "bg-green-500/10 group-hover:bg-green-500/20"
                      : "bg-accent-gold/10 group-hover:bg-accent-gold/20"
                  } transition-colors`}>
                    <type.Icon size={20} className={
                      type.name === "Neurotypical" ? "text-green-400" : "text-accent-gold"
                    } />
                  </div>
                  <div
                    className={`font-light mb-1 ${type.name === "Neurotypical" ? "text-green-400" : "text-accent-gold"}`}
                  >
                    {type.name}
                  </div>
                  <div className="text-text-gray text-xs">{type.trait}</div>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* The full suite, six additional calibrated assessments
              alongside the Dark Mirror. Surfacing this here both
              helps Dark Mirror visitors discover the rest of the
              suite (internal-link equity into the deeper-read
              instruments) and tells anyone arriving on /quiz that
              this is a single-quiz page nested within a larger
              product, not a standalone test. */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-white text-center mb-3 tracking-wide">
              The Full Suite
            </h2>
            <p className="text-text-gray text-center max-w-2xl mx-auto mb-8 text-sm leading-relaxed">
              The Dark Mirror is the wide map. Six more assessments
              go deeper on each axis, each one calibrated against
              published research norms, each one with the result page
              written from the inside.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {ADDITIONAL_QUIZZES.map((quiz, index) => (
                <m.div
                  key={quiz.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                >
                  <Link
                    href={quiz.href}
                    className="group block p-4 rounded-xl border border-accent-gold/15 bg-deep-black/40 hover:border-accent-gold/40 hover:bg-deep-black/60 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="min-w-0">
                        <h3 className="text-white text-sm font-light group-hover:text-accent-gold transition-colors leading-snug">
                          {quiz.title}
                        </h3>
                        <p className="text-text-gray/70 text-[11px] uppercase tracking-wider mt-0.5">
                          {quiz.caption}
                        </p>
                      </div>
                      <ArrowRight
                        size={14}
                        strokeWidth={1.5}
                        className="text-text-gray/40 group-hover:text-accent-gold group-hover:translate-x-0.5 transition-all shrink-0 mt-1"
                      />
                    </div>
                    <p className="text-text-gray text-[12px] leading-relaxed mb-2">
                      {quiz.blurb}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-accent-gold/70 text-[10px] uppercase tracking-[0.2em]">
                        {quiz.instrument}
                      </span>
                      <span className="text-text-gray/50 text-[11px] tabular-nums">
                        {quiz.itemCount} items &middot; ~{quiz.minutes} min
                      </span>
                    </div>
                  </Link>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* How It Works */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-white text-center mb-8 tracking-wide">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Answer 20 Scenarios",
                  description:
                    "Real dating and social situations with a functioning assessment. No boring agree/disagree, just truth.",
                },
                {
                  step: "02",
                  title: "Get Your Profile",
                  description:
                    "See your primary type and preview your radar chart, for free.",
                },
                {
                  step: "03",
                  title: "Unlock Full Report",
                  description: `Clinical-style diagnosis with functioning level and detailed analysis delivered to your email for $${QUIZ_INFO.price}.`,
                },
              ].map((item, index) => (
                <m.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-extralight text-accent-gold/40 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-light text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-gray text-sm">{item.description}</p>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Why This Quiz */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-16"
          >
            <div className="p-8 bg-gradient-to-br from-accent-gold/5 to-transparent border border-accent-gold/20 rounded-lg">
              <h2 className="text-xl font-light text-accent-gold mb-4 text-center">
                This Isn&apos;t Your Average Personality Test
              </h2>
              <p className="text-text-gray text-center max-w-2xl mx-auto">
                Most quizzes ask generic questions and give vague results. The
                Dark Mirror Assessment puts you in real scenarios, dating
                situations, power dynamics, moments of betrayal and reveals how
                your psychology actually operates when it matters.
              </p>
            </div>
          </m.div>

          {/* FAQ section, emits FAQPage JSON-LD via FAQSection. Targets the
              long-tail buyer queries that share a SERP with this page:
              "am I a sociopath quiz" / "dark triad vs cluster B" /
              "is the dark mirror accurate" / "am I a narcissist or empath." */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mb-16"
          >
            <FAQSection
              items={FAQ_ITEMS}
              title="Frequently Asked Questions"
              className=""
            />
          </m.div>

          {/* Related concept bridge, internal links into the existing 40+
              blog posts and the ASPD pillar. Two SEO purposes: (1) spread
              link equity from the quiz page (high traffic) into the deeper
              catalogue (high relevance), and (2) give readers a logical
              next step after taking the assessment. Each card's title is
              the destination article's H1, so the link text matches the
              target page's primary keyword. */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-light text-white text-center mb-3 tracking-wide">
              Explore the Concepts Behind the Assessment
            </h2>
            <p className="text-text-gray text-center max-w-2xl mx-auto mb-10 text-sm">
              The Dark Mirror is one entry point. These are the deeper reads on
              each personality type, the same framework, applied to dating,
              recovery, and the patterns the test surfaces.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {RELATED_LINKS.map((link, index) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="group block p-5 bg-deep-black/40 border border-accent-gold/15 rounded-xl hover:border-accent-gold/40 hover:bg-deep-black/60 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-accent-gold/70">
                        {link.type}
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-accent-gold/40 group-hover:text-accent-gold group-hover:translate-x-1 transition-all shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-base font-light text-white mb-2 group-hover:text-accent-gold transition-colors leading-snug">
                      {link.title}
                    </h3>
                    <p className="text-text-gray text-sm leading-relaxed">
                      {link.description}
                    </p>
                  </Link>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Disclaimer */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-center"
          >
            <div className="p-6 bg-deep-black/30 border border-accent-gold/10 rounded-lg">
              <p className="text-text-gray text-xs leading-relaxed">
                {QUIZ_INFO.disclaimer}
              </p>
            </div>
          </m.div>

          {/* Bottom CTA */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center mt-12"
          >
            <Link href="/quiz/take">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 border border-accent-gold text-accent-gold font-medium tracking-wider uppercase rounded transition-all hover:bg-accent-gold/10"
              >
                Start Now →
              </m.button>
            </Link>
            <p className="mt-4 text-text-gray text-sm">
              Free to take. Pay only to unlock your full report.
            </p>
          </m.div>
        </div>
      </main>
    </>
  );
}
