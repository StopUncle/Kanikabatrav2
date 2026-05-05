"use client";

import { m } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import FAQSection from "@/components/FAQSection";
import {
  DATING_QUIZ_INFO,
  DATING_QUIZ_FAQ,
} from "@/lib/quiz-dating-sociopath-data";
import {
  ShieldAlert,
  Eye,
  Heart,
  ArrowRight,
  ScrollText,
  GraduationCap,
  Phone,
} from "lucide-react";

const RELATED_LINKS = [
  {
    href: "/book",
    title: "The Sociopathic Dating Bible",
    description:
      "The 70,000-word manual this quiz is drawn from. The chapters on partner detection cover the patterns these scenarios test for in much more depth.",
    type: "Book",
  },
  {
    href: "/quiz/sociopath",
    title: "The Sociopath Test (LSRP)",
    description:
      "A self-assessment for the partner this quiz cannot score. If you can get them to take it (or take it as if you were them, based on what you know), the LSRP-calibrated read is informative.",
    type: "Self-test",
  },
  {
    href: "/quiz/daughter",
    title: "The Daughter Pattern Assessment",
    description:
      "If you grew up in an NPD-trait-heavy household, the partner-pattern you keep ending up with often maps onto the household. The Daughter Pattern Assessment is the upstream read.",
    type: "Sister quiz",
  },
  {
    href: "/consilium",
    title: "Join the Consilium",
    description:
      "$29/month members' room. Threads dedicated to the partner-detection territory this quiz covers, run by an author with adjacent personal experience. Not a substitute for therapy.",
    type: "Community",
  },
] as const;

const AXIS_PREVIEW = [
  {
    name: "Behavioural Red Flags",
    short: "Visible",
    description:
      "Money probes, future-faking, charm-on-demand, gaslighting, boundary erosion, isolation. The patterns you can point at.",
    Icon: Eye,
    color: "rose",
  },
  {
    name: "Internal Red Flags",
    short: "Felt",
    description:
      "Smaller after, walking on eggshells, sleep loss, the stomach drop, the daydream of escape. The body's read.",
    Icon: Heart,
    color: "amber",
  },
];

export default function DatingSociopathQuizLanding() {
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
              This quiz cannot diagnose your partner or you. If you are
              in immediate physical danger or being financially
              entrapped, please contact a domestic violence service
              first. Crisis resources surface on the result page when
              scores are high.
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
                Partner Detection
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
              {DATING_QUIZ_INFO.name}
            </h1>

            <p className="text-xl sm:text-2xl text-accent-gold font-light mb-8">
              {DATING_QUIZ_INFO.tagline}
            </p>

            <p className="text-text-gray text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Twenty scenarios drawn from the Sociopathic Dating
              Bible&rsquo;s red-flag chapters. Two axes &mdash; what you have seen,
              and what your body has registered. Combined quadrant
              read. Honest, not alarming.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  {DATING_QUIZ_INFO.itemCount}
                </div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  Scenarios
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  ~{DATING_QUIZ_INFO.estimatedMinutes} min
                </div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  To complete
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">2</div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  Axes
                </div>
              </div>
            </div>

            <Link href="/quiz/dating-sociopath/take">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black font-medium text-lg tracking-wider uppercase rounded transition-all hover:shadow-lg hover:shadow-accent-gold/20"
              >
                Begin Assessment
              </m.button>
            </Link>
            <p className="mt-3 text-text-gray text-xs">
              Free. Quadrant read returned in full.
            </p>
          </m.div>

          {/* Two axes */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-white text-center mb-3 tracking-wide">
              The Two Axes
            </h2>
            <p className="text-text-gray text-center max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              Most partner-detection quizzes ask only what you can see.
              The patterns the literature warns about live in the gap
              between the visible and the felt. The combined read of
              the two is more reliable than either alone.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {AXIS_PREVIEW.map((s, index) => (
                <m.div
                  key={s.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="p-6 bg-deep-black/50 border border-accent-gold/20 rounded-xl hover:border-accent-gold/40 transition-all duration-300 group"
                >
                  <div
                    className={`w-10 h-10 mb-4 rounded-full flex items-center justify-center ${
                      s.color === "rose"
                        ? "bg-rose-400/10 group-hover:bg-rose-400/20"
                        : "bg-amber-400/10 group-hover:bg-amber-400/20"
                    } transition-colors`}
                  >
                    <s.Icon
                      size={20}
                      className={s.color === "rose" ? "text-rose-300" : "text-amber-300"}
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
              The four configurations of the two axes are: Probably
              Not the Pattern · Visible But Unfelt · The Gut Knows ·
              The Pattern Is Confirmed. Your result page returns the
              configuration plus what to do with it.
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
                Most &ldquo;am I dating a sociopath&rdquo; quizzes online
                are written by anonymous SEO operators or by survivor
                blogs without the partner-detection literature
                grounding. This one is drawn directly from the
                Sociopathic Dating Bible chapters on partner detection
                — the same author with the diagnosis (ASPD) the quiz
                is built to detect, working through what the literature
                consistently shows actually flags the configuration.
              </p>
              <p>
                The two-axis structure (visible + felt) is the genuine
                contribution. Partner-detection quizzes that score only
                visible behaviour underread the configurations where
                the body has caught what the head has not yet named;
                quizzes that score only feelings overcall the relationships
                where ambient anxiety produces the same internal
                weather as a sociopathic partner.
              </p>
            </div>
          </m.div>

          {/* CTA repeat */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-16"
          >
            <Link href="/quiz/dating-sociopath/take">
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
            items={DATING_QUIZ_FAQ.map((q) => ({
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

          {/* Crisis resources */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 p-6 rounded-lg border border-rose-400/30 bg-rose-400/5"
          >
            <div className="flex items-start gap-3">
              <Phone
                size={18}
                strokeWidth={1.5}
                className="text-rose-300/80 shrink-0 mt-1"
              />
              <div>
                <h3 className="text-rose-300/90 text-sm font-medium uppercase tracking-wider mb-2">
                  If you are in danger right now
                </h3>
                <p className="text-text-gray text-xs leading-relaxed">
                  Please contact a domestic violence service before
                  taking this quiz. US: National DV Hotline 1-800-799-7233.
                  UK: 0808 2000 247. Australia: 1800RESPECT.
                  International:{" "}
                  <a
                    href="https://findahelpline.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-300 underline hover:text-rose-200"
                  >
                    findahelpline.com
                  </a>
                  . Your safety is more important than this score.
                </p>
              </div>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-4 p-6 rounded-lg border border-accent-burgundy/30 bg-accent-burgundy/5"
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
                  {DATING_QUIZ_INFO.disclaimer}
                </p>
              </div>
            </div>
          </m.div>
        </div>
      </main>
    </>
  );
}
