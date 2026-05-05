"use client";

import { m } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import FAQSection from "@/components/FAQSection";
import {
  SOCIOPATH_QUIZ_INFO,
  SOCIOPATH_QUIZ_FAQ,
} from "@/lib/quiz-sociopath-data";
import {
  ShieldAlert,
  Snowflake,
  Flame,
  ArrowRight,
  ScrollText,
  GraduationCap,
} from "lucide-react";

// Companion landing page for the Sociopath Test (/quiz/sociopath).
// Matches the Daughter Pattern landing's structure: above-the-fold
// disclaimer, hero, two-subscale explainer (instead of six profiles),
// "who built this" credibility row, how it works, FAQ, related links.
//
// Voice locked to reference/KANIKA-VOICE.md throughout. Second person.
// No reassurance. No life-coach softeners. The credibility play is
// "calibrated by the published instrument the field uses + written by
// the rare author who has the diagnosis the test is built to detect."

const RELATED_LINKS: Array<{
  href: string;
  title: string;
  description: string;
  type: string;
}> = [
  {
    href: "/quiz",
    title: "The Dark Mirror Assessment",
    description:
      "Profiles you across six Cluster B types, Psychopathic, Sociopathic, Narcissistic, Borderline, Histrionic, Neurotypical. Most users take both. The Dark Mirror is the wide map; the Sociopath Test is the calibrated read on the specific axis the wide map flagged.",
    type: "Companion quiz",
  },
  {
    href: "/quiz/daughter",
    title: "The Daughter Pattern Assessment",
    description:
      "For adult daughters of (likely) narcissistic mothers. Six daughter profiles plus a mother-signal band. Different question; different answer.",
    type: "Sister quiz",
  },
  {
    href: "/book",
    title: "The Sociopathic Dating Bible",
    description:
      "70,000-word manual. The chapters on the predator's interior were written by someone who configured similarly to the Full Pattern result, and they will read as either familiar or accusatory depending on where in the pattern you currently are.",
    type: "Book",
  },
  {
    href: "/consilium",
    title: "Join the Consilium",
    description:
      "$29/month. Higher concentration of people with the Calculator and Full Pattern configurations than the general population, by deliberate design. The room is not safer because it's gentler. It's safer because it's read.",
    type: "Community",
  },
];

const SUBSCALE_PREVIEW = [
  {
    name: "Primary Psychopathy",
    short: "Cold core",
    description:
      "Callousness, manipulativeness, lack of remorse, the empathic deficit. The construct most people picture when they hear the word.",
    Icon: Snowflake,
    color: "blue",
  },
  {
    name: "Secondary Psychopathy",
    short: "Hot wire",
    description:
      "Impulsivity, frustration intolerance, antisocial reactivity, the regulation gap. Often the part that produces real-world consequences.",
    Icon: Flame,
    color: "amber",
  },
];

export default function SociopathQuizLanding() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Above-the-fold disclaimer.
              The "by a real sociopath" hook reads as edgy on first
              glance; the disclaimer next to it makes it edgy + honest,
              which is what protects the YMYL trust signal Google reads
              for psychology content. */}
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
              Built on the Levenson Self-Report Psychopathy Scale, a
              research instrument. Not a diagnosis. Only a licensed
              clinician with a full history can diagnose Antisocial
              Personality Disorder. Full disclaimer at the bottom of the
              page.
            </p>
          </m.div>

          {/* Hero */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6 px-4 py-2 border border-accent-gold/30 rounded-full">
              <span className="text-accent-gold text-sm tracking-[0.2em] uppercase">
                Calibrated · LSRP
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
              {SOCIOPATH_QUIZ_INFO.name}
            </h1>

            <p className="text-xl sm:text-2xl text-accent-gold font-light mb-8">
              {SOCIOPATH_QUIZ_INFO.tagline}
            </p>

            <p className="text-text-gray text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Twenty-six items, two subscales, scored against published
              research norms. Calibrated by the field. Written by the
              rare author who has the diagnosis the test is built to
              detect.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  {SOCIOPATH_QUIZ_INFO.itemCount}
                </div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  Items
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  ~{SOCIOPATH_QUIZ_INFO.estimatedMinutes} min
                </div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  To complete
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">2</div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  Subscales
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link href="/quiz/sociopath/take">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black font-medium text-lg tracking-wider uppercase rounded transition-all hover:shadow-lg hover:shadow-accent-gold/20"
              >
                Begin Assessment
              </m.button>
            </Link>
            <p className="mt-3 text-text-gray text-xs">
              Free. Full subscale scores returned. No paywall on the read.
            </p>
          </m.div>

          {/* Two subscales preview */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-white text-center mb-3 tracking-wide">
              The Two Subscales
            </h2>
            <p className="text-text-gray text-center max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              Psychopathy is not one trait. The LSRP separates the cold
              core from the impulsive shell because, in practice, they
              come apart. The configuration of the two is the diagnostic
              fact, not the total score.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {SUBSCALE_PREVIEW.map((s, index) => (
                <m.div
                  key={s.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="p-6 bg-deep-black/50 border border-accent-gold/20 rounded-xl hover:border-accent-gold/40 transition-all duration-300 group"
                >
                  <div
                    className={`w-10 h-10 mb-4 rounded-full flex items-center justify-center ${
                      s.color === "blue"
                        ? "bg-blue-400/10 group-hover:bg-blue-400/20"
                        : "bg-amber-400/10 group-hover:bg-amber-400/20"
                    } transition-colors`}
                  >
                    <s.Icon
                      size={20}
                      className={s.color === "blue" ? "text-blue-300" : "text-amber-300"}
                    />
                  </div>
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="text-accent-gold font-light text-lg">
                      {s.name}
                    </div>
                    <div className="text-text-gray text-xs uppercase tracking-wider">
                      {s.short}
                    </div>
                  </div>
                  <p className="text-text-gray text-sm leading-relaxed">
                    {s.description}
                  </p>
                </m.div>
              ))}
            </div>

            <p className="mt-6 text-text-gray/70 text-xs text-center max-w-2xl mx-auto leading-relaxed">
              The four configurations of the two subscales (high/low ×
              high/low) read as four very different patterns in real
              life. Your result page returns both subscale percentiles
              and the combined quadrant interpretation.
            </p>
          </m.div>

          {/* Who built this */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16 p-8 rounded-xl border border-accent-gold/20 bg-deep-black/40"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent-gold/10 shrink-0">
                <GraduationCap size={22} className="text-accent-gold" />
              </div>
              <div>
                <h3 className="text-xl font-light text-white mb-1">
                  Who built this
                </h3>
                <p className="text-accent-gold text-sm tracking-wider uppercase">
                  Kanika Rose · Diagnosed ASPD · Author
                </p>
              </div>
            </div>
            <div className="text-text-gray text-sm leading-relaxed space-y-3">
              <p>
                Most online sociopath tests are written by anonymous SEO
                operators or by clinical-content sites that have to keep
                a sterile distance from the construct they&rsquo;re describing.
                This one is written by the rare author who has the
                diagnosis the test is built to detect, working from the
                published instrument the academic literature uses.
              </p>
              <p>
                The items track the LSRP source paper closely with light
                wording adjustments for clarity. The scoring follows
                Levenson 1995 exactly. The two-subscale split is the
                field&rsquo;s, not mine. What you get from me, on top of the
                instrument, is the result-page interpretation, what the
                configuration looks like in real life, who actually ends
                up in each quadrant, and what to do with the score if
                anything.
              </p>
              <p className="text-text-gray/70 text-xs italic">
                Source instrument: Levenson, Kiehl, & Fitzpatrick (1995),
                <span className="not-italic">
                  {" "}
                  &ldquo;Assessing psychopathic attributes in a
                  noninstitutionalized population.&rdquo; Journal of
                  Personality and Social Psychology 68(1), 151-158.
                </span>
              </p>
            </div>
          </m.div>

          {/* How it works */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-white text-center mb-8 tracking-wide">
              How it works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Twenty-six Likert items",
                  description:
                    "Each item is a first-person statement (e.g. 'Looking out for myself is my top priority'). You agree or disagree on a four-point scale. Seven items are reverse-keyed; you do not need to identify them, the scoring handles it.",
                },
                {
                  step: "02",
                  title: "Two-subscale scoring",
                  description:
                    "Sixteen items load on Primary (cold core), ten load on Secondary (impulsive shell). Raw scores are converted to percentiles against the Levenson 1995 college-sample norms (n=487).",
                },
                {
                  step: "03",
                  title: "Quadrant interpretation",
                  description:
                    "The combined read of the two subscales places you in one of four configurations: Functional Self, the Calculator, the Hot Wire, or the Full Pattern. Your result page returns the configuration plus what to do with it.",
                },
              ].map((step) => (
                <div key={step.step} className="text-center">
                  <div className="text-accent-gold text-3xl font-light mb-2">
                    {step.step}
                  </div>
                  <h3 className="text-white font-light mb-2">{step.title}</h3>
                  <p className="text-text-gray text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </m.div>

          {/* CTA repeat */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-16"
          >
            <Link href="/quiz/sociopath/take">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black font-medium text-lg tracking-wider uppercase rounded transition-all hover:shadow-lg hover:shadow-accent-gold/20 inline-flex items-center gap-2"
              >
                Take the Assessment
                <ArrowRight size={20} />
              </m.button>
            </Link>
          </m.div>

          {/* FAQ */}
          <FAQSection
            items={SOCIOPATH_QUIZ_FAQ.map((q) => ({
              question: q.question,
              answer: q.answer,
            }))}
          />

          {/* Related */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 mb-12"
          >
            <h2 className="text-xl font-light text-white text-center mb-8 tracking-wide">
              Related reading
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {RELATED_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block p-5 bg-deep-black/40 border border-accent-gold/15 rounded-xl hover:border-accent-gold/40 hover:bg-deep-black/60 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <ScrollText
                      size={12}
                      className="text-accent-gold/70 shrink-0"
                    />
                    <span className="text-accent-gold/70 text-[10px] uppercase tracking-[0.2em]">
                      {link.type}
                    </span>
                  </div>
                  <h3 className="text-white text-base font-light mb-2 group-hover:text-accent-gold transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-text-gray text-sm leading-relaxed">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </m.div>

          {/* Full disclaimer */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 p-6 rounded-lg border border-accent-burgundy/30 bg-accent-burgundy/5"
          >
            <div className="flex items-start gap-3">
              <ShieldAlert
                size={18}
                strokeWidth={1.5}
                className="text-accent-burgundy/80 shrink-0 mt-1"
              />
              <div>
                <h3 className="text-accent-burgundy/90 text-sm font-medium uppercase tracking-wider mb-2">
                  Full disclaimer
                </h3>
                <p className="text-text-gray text-xs leading-relaxed">
                  {SOCIOPATH_QUIZ_INFO.disclaimer}
                </p>
              </div>
            </div>
          </m.div>
        </div>
      </main>
    </>
  );
}
