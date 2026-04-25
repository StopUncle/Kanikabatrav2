"use client";

import { m } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import FAQSection from "@/components/FAQSection";
import { DAUGHTER_QUIZ_INFO } from "@/lib/quiz-daughter-data";
import {
  Eye,
  Heart,
  ListChecks,
  AlertTriangle,
  Crown,
  Compass,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

// FAQ phrasing keyed to real searcher queries: "am I a daughter of a
// narcissist quiz" / "am I the scapegoat or the golden child" / "is this
// a real diagnosis" / "what's the difference between this and the dark
// mirror." Each Q gets 50–80-word A so the FAQPage rich result captures
// well. Disclaimers surface here too (Q3, Q8) — Google's FAQ rich result
// is one of the few places we can guarantee disclaimer visibility in the
// SERP itself, before the user even clicks.
const FAQ_ITEMS = [
  {
    question:
      "What is the Daughter Pattern Assessment and what does it actually measure?",
    answer:
      "The Daughter Pattern Assessment is a 20-scenario reflective tool for adult daughters (and sons) of mothers with strong narcissistic traits. It scores you on two parallel axes: which trauma response shape your nervous system developed (six profiles — Hypervigilant, Fawn, Over-Functioner, Scapegoat, Golden Cage, Sovereign) and how strongly your mother's behaviour matches the NPD pattern. It's a mirror, not a verdict.",
  },
  {
    question:
      "Is this a clinical diagnosis? Can a quiz tell me if my mother is a narcissist?",
    answer:
      "No. This is not a diagnostic instrument and we are explicit about that — only a licensed clinician with a full history can diagnose any personality disorder, in your mother or in you. What this assessment can do is help you see whether the pattern you grew up in matches the cluster of behaviours that NPD-mother households produce, and how your nervous system has organised itself in response. Use it for self-recognition, not for confronting her.",
  },
  {
    question: "How is this different from the Dark Mirror Assessment?",
    answer:
      "The Dark Mirror profiles your own personality across six Cluster B types (Psychopathic, Sociopathic, Narcissistic, Borderline, Histrionic, Neurotypical). The Daughter Pattern profiles your trauma response to a specific kind of household — one likely run by an NPD-trait-heavy mother. Many women take both: the Daughter Pattern explains the household; the Dark Mirror explains how the household shaped the personality you walk around in now.",
  },
  {
    question:
      "I don't know if my mother is 'really' a narcissist. Should I take this anyway?",
    answer:
      "Yes. A good half of the women this assessment is built for arrive uncertain — they suspect the pattern but feel guilty naming it, or they've been told for years they're 'overreacting.' The Mother Signal axis is built precisely for this case: it returns one of four bands (Likely NPD / Trait-Heavy / Difficult-but-not-NPD / Unlikely), so an honest read of the household is part of what you receive. Sometimes the answer comes back 'unlikely' and that is genuinely useful information.",
  },
  {
    question: "What if I'm a son, not a daughter?",
    answer:
      "Take it. The 'Daughter' framing reflects the typical user — daughters of NPD mothers are the largest demographic in this niche — but the trauma patterns the assessment maps (anxious-attached, fawn, parentified, scapegoat, golden child) are not gender-specific. Sons of NPD mothers develop the same six profiles. The results page will speak in second-person 'you' regardless.",
  },
  {
    question:
      "Will the result tell me what to do — go no-contact, stay in touch, confront her?",
    answer:
      "No, and we'd be wary of any quiz that claimed to. Major life decisions about a parent are not quiz-territory; they involve safety, finances, children, culture, your own capacity, and timing — none of which a 20-question assessment can know. What the result *will* give you is a clearer read of the dynamic and a recovery move scaled to your specific profile. Decisions about contact level should involve a therapist, a trusted friend, or both.",
  },
  {
    question: "How long does it take? Is it free?",
    answer: `The 20-scenario assessment is free — about 5 to 7 minutes. Your daughter-pattern profile, mother-signal band, and a tailored recovery move are returned for free on the results page. There's no paywall on the core read.`,
  },
  {
    question:
      "I'm in active distress about my mother. Is this the right time to take this?",
    answer:
      "Probably not in this order. If you are in active crisis, in an unsafe family situation, or considering immediate action — please prioritise a licensed therapist and (if needed) a crisis line over a self-assessment. This tool is most useful at the contemplation stage: you've started suspecting the pattern, you want a sharper read, and you're stable enough to take in the answer. If that's not where you are right now, bookmark the page and come back when it is.",
  },
];

const RELATED_LINKS: Array<{
  href: string;
  title: string;
  description: string;
  type: string;
}> = [
  {
    href: "/blog/narcissistic-mother-signs-daughter-pattern",
    title:
      "Narcissistic Mother: 14 Signs, the Daughter Pattern, and the Specific Move That Cuts the Cord",
    description:
      "The long-form companion to this assessment. Read it before, during, or after the quiz — many women say the article is what made them realise the assessment was for them.",
    type: "Read first",
  },
  {
    href: "/quiz",
    title: "The Dark Mirror Assessment",
    description:
      "Profiles your own personality across six Cluster B types — Psychopathic, Sociopathic, Narcissistic, Borderline, Histrionic, Neurotypical. Most women in the daughter-of-narcissist niche take both.",
    type: "Companion quiz",
  },
  {
    href: "/blog/cluster-b-personality-disorders-overview",
    title: "Cluster B Personality Disorders: An Overview",
    description:
      "ASPD, NPD, BPD, HPD — what each one looks like at the dinner table. The diagnostic frame the Mother Signal axis is built on.",
    type: "Foundation",
  },
  {
    href: "/blog/narcissist-playbook-how-they-actually-operate",
    title: "The Narcissist Playbook",
    description:
      "The full operating system of NPD — wound, supply, three-phase cycle, why they're easier to read than therapy culture admits. Pairs with the Mother Signal axis.",
    type: "Foundation",
  },
  {
    href: "/blog/why-narcissists-always-come-back-hoovering-cycle",
    title: "Why Narcissists Always Come Back: The Hoovering Cycle",
    description:
      "If you're considering or in low-contact: this is the playbook for the texts, the emergencies, and the third-party messengers that will arrive in week 3.",
    type: "Recovery",
  },
  {
    href: "/book",
    title: "The Sociopathic Dating Bible",
    description:
      "70,000-word manual covering the partner-detection side — how the man you keep ending up with maps onto your mother's pattern, and how to interrupt the loop.",
    type: "Book",
  },
  {
    href: "/consilium",
    title: "Join the Consilium",
    description:
      "The Inner Circle community, $29/month, threads private, members-only simulator with the pc-child track scenarios. Specifically the room I built for women in this assessment's audience.",
    type: "Community",
  },
];

const DAUGHTER_TYPE_PREVIEW = [
  {
    name: "The Hypervigilant",
    trait: "Reads the room before entering it",
    Icon: Eye,
  },
  {
    name: "The Fawn",
    trait: "Apologises first, sorts it out later",
    Icon: Heart,
  },
  {
    name: "The Over-Functioner",
    trait: "If she doesn't do it, no one will",
    Icon: ListChecks,
  },
  {
    name: "The Scapegoat",
    trait: "She's the one who 'always overreacts'",
    Icon: AlertTriangle,
  },
  {
    name: "The Golden Cage",
    trait: "Approved of. Trapped.",
    Icon: Crown,
  },
  {
    name: "The Sovereign",
    trait: "She named it. She left it. She rebuilt.",
    Icon: Compass,
  },
];

export default function DaughterQuizLanding() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Disclaimer banner — surfaces above the fold so visitors see the
              "not medical advice / not a diagnosis" framing before they
              start. Daisy explicitly required this. Visual treatment is
              deliberately understated (small, accent-burgundy outline)
              so it reads as honest framing rather than alarming
              warning. */}
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-start gap-3 rounded-lg border border-accent-burgundy/40 bg-accent-burgundy/5 px-4 py-3"
          >
            <ShieldAlert
              size={16}
              strokeWidth={1.5}
              className="text-accent-burgundy/80 shrink-0 mt-0.5"
            />
            <p className="text-text-gray text-xs leading-relaxed">
              <span className="text-accent-burgundy/90 font-medium">
                Educational use only.
              </span>{" "}
              This assessment is not medical advice and not a clinical
              diagnosis. It cannot diagnose Narcissistic Personality Disorder
              in your mother or in you. Read the full disclaimer at the
              bottom of the page before taking the assessment.
            </p>
          </m.div>

          {/* Hero Section */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6 px-4 py-2 border border-accent-gold/30 rounded-full">
              <span className="text-accent-gold text-sm tracking-[0.2em] uppercase">
                Reflective Assessment
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
              {DAUGHTER_QUIZ_INFO.name}
            </h1>

            <p className="text-xl sm:text-2xl text-accent-gold font-light mb-8">
              {DAUGHTER_QUIZ_INFO.tagline}
            </p>

            <p className="text-text-gray text-lg max-w-2xl mx-auto mb-12">
              {DAUGHTER_QUIZ_INFO.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  {DAUGHTER_QUIZ_INFO.questionCount}
                </div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  Scenarios
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  {DAUGHTER_QUIZ_INFO.estimatedTime}
                </div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  To Complete
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">6</div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  Daughter Profiles
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link href="/quiz/daughter/take">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black font-medium text-lg tracking-wider uppercase rounded transition-all hover:shadow-lg hover:shadow-accent-gold/20"
              >
                Begin Assessment
              </m.button>
            </Link>
            <p className="mt-3 text-text-gray text-xs">
              Free. No paywall on the core result.
            </p>
          </m.div>

          {/* Six Daughter Profiles preview */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-white text-center mb-3 tracking-wide">
              The Six Daughter Profiles
            </h2>
            <p className="text-text-gray text-center max-w-xl mx-auto mb-8 text-sm">
              Twenty years of being raised by a narcissistic mother does not
              produce one shape. It produces six — and which one your nervous
              system locked into is the most diagnostic single fact about your
              adult life.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DAUGHTER_TYPE_PREVIEW.map((type, index) => (
                <m.div
                  key={type.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className={`p-5 bg-deep-black/50 border rounded-xl text-center hover:border-accent-gold/40 transition-all duration-300 group ${
                    type.name === "The Sovereign"
                      ? "border-green-600/30 hover:border-green-500/50"
                      : "border-accent-gold/20"
                  }`}
                >
                  <div
                    className={`w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center ${
                      type.name === "The Sovereign"
                        ? "bg-green-500/10 group-hover:bg-green-500/20"
                        : "bg-accent-gold/10 group-hover:bg-accent-gold/20"
                    } transition-colors`}
                  >
                    <type.Icon
                      size={20}
                      className={
                        type.name === "The Sovereign"
                          ? "text-green-400"
                          : "text-accent-gold"
                      }
                    />
                  </div>
                  <div
                    className={`font-light mb-1 ${type.name === "The Sovereign" ? "text-green-400" : "text-accent-gold"}`}
                  >
                    {type.name}
                  </div>
                  <div className="text-text-gray text-xs">{type.trait}</div>
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
                  title: "Twenty Real Scenarios",
                  description:
                    "Specific moments — Sunday calls, sibling rotations, the signature sentence. No abstract agree/disagree statements. The scenarios are the assessment.",
                },
                {
                  step: "02",
                  title: "Two-Axis Read",
                  description:
                    "Your daughter pattern (one of six profiles) plus a mother-signal band — Likely NPD, Trait-Heavy, Difficult, or Unlikely. Both axes returned together.",
                },
                {
                  step: "03",
                  title: "Specific Recovery Move",
                  description:
                    "Each profile gets a tailored recovery move — the single intervention most useful for your specific shape. Plus a 12-month arc so you know what good looks like.",
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

          {/* Why this assessment */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-16"
          >
            <div className="p-8 bg-gradient-to-br from-accent-gold/5 to-transparent border border-accent-gold/20 rounded-lg">
              <h2 className="text-xl font-light text-accent-gold mb-4 text-center">
                Built for the Recognition, Not the Diagnosis
              </h2>
              <p className="text-text-gray text-center max-w-2xl mx-auto mb-3">
                The clinical assessment of NPD requires a licensed clinician
                with a full history. The diagnostic assessment of trauma
                response requires a therapist, time, and trust. This is
                neither of those — it is a 20-scenario instrument designed to
                surface the recognition that a clinician can later confirm.
              </p>
              <p className="text-text-gray text-center max-w-2xl mx-auto text-sm italic">
                The recognition is the part most women come looking for first.
                The clinical follow-up is the part that comes after.
              </p>
            </div>
          </m.div>

          {/* FAQ */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mb-16"
          >
            <FAQSection items={FAQ_ITEMS} title="Frequently Asked Questions" />
          </m.div>

          {/* Internal-link bridge */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-light text-white text-center mb-3 tracking-wide">
              Read Around the Assessment
            </h2>
            <p className="text-text-gray text-center max-w-2xl mx-auto mb-10 text-sm">
              The assessment is one entry point. These are the deeper reads —
              the long-form article, the companion quiz, and the Cluster B
              foundation that the Mother Signal axis is built on.
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

          {/* Full Disclaimer */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-center"
          >
            <div className="p-6 bg-deep-black/30 border border-accent-burgundy/20 rounded-lg">
              <p className="text-accent-burgundy/80 text-[11px] uppercase tracking-[0.2em] mb-3">
                Full Disclaimer
              </p>
              <p className="text-text-gray text-xs leading-relaxed">
                {DAUGHTER_QUIZ_INFO.disclaimer}
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
            <Link href="/quiz/daughter/take">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 border border-accent-gold text-accent-gold font-medium tracking-wider uppercase rounded transition-all hover:bg-accent-gold/10"
              >
                Start Now →
              </m.button>
            </Link>
            <p className="mt-4 text-text-gray text-sm">
              Free to take. ~6 minutes. No email required to see your result.
            </p>
          </m.div>
        </div>
      </main>
    </>
  );
}
