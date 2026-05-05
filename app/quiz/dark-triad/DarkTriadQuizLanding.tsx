"use client";

import { m } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import FAQSection from "@/components/FAQSection";
import {
  DARK_TRIAD_QUIZ_INFO,
  DARK_TRIAD_QUIZ_FAQ,
} from "@/lib/quiz-dark-triad-data";
import {
  ShieldAlert,
  Crown,
  Snowflake,
  Eye,
  ArrowRight,
  ScrollText,
  GraduationCap,
} from "lucide-react";

const RELATED_LINKS = [
  {
    href: "/quiz/sociopath",
    title: "The Sociopath Test (LSRP)",
    description:
      "Deeper read on the Psychopathy axis. Splits Primary (callous) from Secondary (impulsive); the configuration matters more than the total.",
    type: "Deeper read",
  },
  {
    href: "/quiz/narcissist",
    title: "The Narcissist Test (NPI-40)",
    description:
      "Deeper read on the Narcissism axis. Splits Grandiose Confidence from Predatory Pattern.",
    type: "Deeper read",
  },
  {
    href: "/quiz/covert-narcissist",
    title: "The Covert Narcissist Test (HSNS)",
    description:
      "The vulnerable / covert version of narcissism, which the SD3 underreads. Take this if your Narcissism axis was low but you suspect the construct anyway.",
    type: "Companion quiz",
  },
  {
    href: "/book",
    title: "The Sociopathic Dating Bible",
    description:
      "Long-form. The chapters on the predator's interior were written by an author who configures similarly to the Full Triad result.",
    type: "Book",
  },
] as const;

const AXIS_PREVIEW = [
  {
    name: "Machiavellianism",
    short: "Strategy",
    description:
      "Strategic manipulation, long-game thinking, willingness to keep mental files of useful information for later. The most cognitively-driven axis.",
    Icon: Eye,
    color: "indigo",
  },
  {
    name: "Narcissism",
    short: "Stage",
    description:
      "Grandiosity, attention-seeking, self-belief, comfort with being the centre. The most public axis.",
    Icon: Crown,
    color: "amber",
  },
  {
    name: "Psychopathy",
    short: "Cold",
    description:
      "Callousness, impulsivity, low empathy, low restraint. The most consequence-producing axis.",
    Icon: Snowflake,
    color: "blue",
  },
];

export default function DarkTriadQuizLanding() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
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
              Built on the Short Dark Triad (SD3), Jones &amp; Paulhus
              2014. The dark triad is a personality-psychology
              construct, not a DSM diagnosis. Only a licensed clinician
              can diagnose any personality disorder.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6 px-4 py-2 border border-accent-gold/30 rounded-full">
              <span className="text-accent-gold text-sm tracking-[0.2em] uppercase">
                Calibrated · SD3
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
              {DARK_TRIAD_QUIZ_INFO.name}
            </h1>

            <p className="text-xl sm:text-2xl text-accent-gold font-light mb-8">
              {DARK_TRIAD_QUIZ_INFO.tagline}
            </p>

            <p className="text-text-gray text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Twenty-seven items, three axes, scored against the
              Jones &amp; Paulhus 2014 norms (n=2929). The wide map of
              the dark-personality space. Configuration archetype
              interpretation, plus links to the deeper-read tests for
              each individual axis.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  {DARK_TRIAD_QUIZ_INFO.itemCount}
                </div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  Items
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  ~{DARK_TRIAD_QUIZ_INFO.estimatedMinutes} min
                </div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  To complete
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">3</div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  Axes
                </div>
              </div>
            </div>

            <Link href="/quiz/dark-triad/take">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black font-medium text-lg tracking-wider uppercase rounded transition-all hover:shadow-lg hover:shadow-accent-gold/20"
              >
                Begin Assessment
              </m.button>
            </Link>
            <p className="mt-3 text-text-gray text-xs">
              Free. Three-axis breakdown + configuration archetype.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-white text-center mb-3 tracking-wide">
              The Three Axes
            </h2>
            <p className="text-text-gray text-center max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              The dark triad is not one trait but three correlated
              ones. They sometimes co-occur (the Full Triad) and often
              don't (single-axis or dual-axis dominant). The
              configuration is what reads in real life.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {AXIS_PREVIEW.map((s, index) => (
                <m.div
                  key={s.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="p-5 bg-deep-black/50 border border-accent-gold/20 rounded-xl hover:border-accent-gold/40 transition-all duration-300 group"
                >
                  <div
                    className={`w-10 h-10 mb-4 rounded-full flex items-center justify-center ${
                      s.color === "amber"
                        ? "bg-amber-400/10 group-hover:bg-amber-400/20"
                        : s.color === "indigo"
                          ? "bg-indigo-400/10 group-hover:bg-indigo-400/20"
                          : "bg-blue-400/10 group-hover:bg-blue-400/20"
                    } transition-colors`}
                  >
                    <s.Icon
                      size={20}
                      className={
                        s.color === "amber"
                          ? "text-amber-300"
                          : s.color === "indigo"
                            ? "text-indigo-300"
                            : "text-blue-300"
                      }
                    />
                  </div>
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="text-accent-gold font-light">
                      {s.name}
                    </div>
                    <div className="text-text-gray text-xs uppercase tracking-wider">
                      {s.short}
                    </div>
                  </div>
                  <p className="text-text-gray text-xs leading-relaxed">
                    {s.description}
                  </p>
                </m.div>
              ))}
            </div>
          </m.div>

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
                The SD3 is the most-used brief dark-triad measure in the
                academic literature, the instrument behind almost every
                free dark-triad quiz on the internet. Items reproduced
                from Jones &amp; Paulhus 2014 with only minor
                punctuation harmonisation.
              </p>
              <p>
                The voice difference is in the configuration archetypes
                and the per-axis interpretations on the result page,
                where the SD3 produces a richer read than the
                three-bar-chart treatment most quiz sites give it.
              </p>
              <p className="text-text-gray/70 text-xs italic">
                Source instrument:{" "}
                <span className="not-italic">{DARK_TRIAD_QUIZ_INFO.basedOn}</span>
              </p>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-16"
          >
            <Link href="/quiz/dark-triad/take">
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

          <FAQSection
            items={DARK_TRIAD_QUIZ_FAQ.map((q) => ({
              question: q.question,
              answer: q.answer,
            }))}
          />

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
                  {DARK_TRIAD_QUIZ_INFO.disclaimer}
                </p>
              </div>
            </div>
          </m.div>
        </div>
      </main>
    </>
  );
}
