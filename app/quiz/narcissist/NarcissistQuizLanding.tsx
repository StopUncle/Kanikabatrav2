"use client";

import { m } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import FAQSection from "@/components/FAQSection";
import {
  NARCISSIST_QUIZ_INFO,
  NARCISSIST_QUIZ_FAQ,
} from "@/lib/quiz-narcissist-data";
import {
  ShieldAlert,
  Crown,
  Eye,
  ArrowRight,
  ScrollText,
  GraduationCap,
} from "lucide-react";

const RELATED_LINKS = [
  {
    href: "/quiz/covert-narcissist",
    title: "The Covert Narcissist Test (HSNS)",
    description:
      "The companion test. Where the NPI-40 measures the loud version of narcissism, the HSNS measures the quiet one — vulnerable narcissism, hypersensitivity, shame-based grandiosity. Many people score low here and high there.",
    type: "Companion quiz",
  },
  {
    href: "/quiz/sociopath",
    title: "The Sociopath Test (LSRP)",
    description:
      "Measures psychopathy on two subscales (Primary, Secondary). The narcissism and psychopathy literatures are deeply intertwined; people who score high on the Predatory Pattern here often score high on Primary Psychopathy there.",
    type: "Sister quiz",
  },
  {
    href: "/quiz",
    title: "The Dark Mirror Assessment",
    description:
      "The wide map: profiles you across six Cluster B types instead of one. Take this if you want to see how your narcissism axis sits in the broader personality landscape.",
    type: "Wide map",
  },
  {
    href: "/book",
    title: "The Sociopathic Dating Bible",
    description:
      "Long-form. The chapters on the narcissist's interior were written by an author with an adjacent diagnosis (ASPD, not NPD) and they will read as either familiar or accusatory depending on where in the configuration you currently are.",
    type: "Book",
  },
] as const;

const SUBSCALE_PREVIEW = [
  {
    name: "Grandiose Confidence",
    short: "Loud",
    description:
      "Authority + Self-sufficiency + Superiority. The leadership, dominance, and self-belief factors. The part of narcissism that other people sometimes call charisma.",
    Icon: Crown,
    color: "amber",
  },
  {
    name: "Predatory Pattern",
    short: "Costly",
    description:
      "Exploitativeness + Entitlement + Exhibitionism + Vanity. The factors that produce real-world relational damage. The part of narcissism the people closest to you eventually pay for.",
    Icon: Eye,
    color: "rose",
  },
];

export default function NarcissistQuizLanding() {
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
              Built on the Narcissistic Personality Inventory (NPI-40),
              Raskin & Terry 1988. Measures grandiose narcissism
              specifically. Not a diagnosis. Only a licensed clinician
              with a full history can diagnose Narcissistic Personality
              Disorder.
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
                Calibrated · NPI-40
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
              {NARCISSIST_QUIZ_INFO.name}
            </h1>

            <p className="text-xl sm:text-2xl text-accent-gold font-light mb-8">
              {NARCISSIST_QUIZ_INFO.tagline}
            </p>

            <p className="text-text-gray text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Forty forced-choice items, two subscales, scored against
              the population norms the literature uses. The same
              instrument the field has used for thirty-five years; the
              read no other quiz site bothers to write.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  {NARCISSIST_QUIZ_INFO.itemCount}
                </div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  Items
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  ~{NARCISSIST_QUIZ_INFO.estimatedMinutes} min
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

            <Link href="/quiz/narcissist/take">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black font-medium text-lg tracking-wider uppercase rounded transition-all hover:shadow-lg hover:shadow-accent-gold/20"
              >
                Begin Assessment
              </m.button>
            </Link>
            <p className="mt-3 text-text-gray text-xs">
              Free. Full subscale and per-factor breakdown returned.
            </p>
          </m.div>

          {/* Two subscales */}
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
              The NPI&rsquo;s seven factors split cleanly into two clusters
              that read as different patterns in real life. The
              configuration of the two is what you actually want to
              know, not the total.
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
                      s.color === "amber"
                        ? "bg-amber-400/10 group-hover:bg-amber-400/20"
                        : "bg-rose-400/10 group-hover:bg-rose-400/20"
                    } transition-colors`}
                  >
                    <s.Icon
                      size={20}
                      className={s.color === "amber" ? "text-amber-300" : "text-rose-300"}
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
              high/low) are: Functional Self · the Sovereign · the
              Charmer · the Full Pattern. Your result page returns the
              configuration plus the per-factor breakdown.
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
                The NPI is the most-cited self-report measure of
                grandiose narcissism in the academic literature, the
                reference instrument every other narcissism quiz on the
                internet derives from. Its items have been published
                since 1988 and tested in dozens of populations.
              </p>
              <p>
                The voice difference here is not in the items, those
                are reproduced from Raskin & Terry exactly, with only
                punctuation harmonisation. It&rsquo;s in the result-page
                interpretation, where most clinical-content sites lose
                the courage of the data and where this one doesn&rsquo;t.
              </p>
              <p className="text-text-gray/70 text-xs italic">
                Source instrument:
                <span className="not-italic"> {NARCISSIST_QUIZ_INFO.basedOn}</span>
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
                  title: "Forty forced-choice items",
                  description:
                    "Each item shows two statements; you pick the one that describes you better. Forced-choice is how the NPI was validated; Likert adaptations exist but compromise calibration.",
                },
                {
                  step: "02",
                  title: "Two-subscale + factor scoring",
                  description:
                    "Total score 0-40 plus per-factor breakdown across all seven Raskin & Terry factors. Subscales sum to Grandiose Confidence and Predatory Pattern.",
                },
                {
                  step: "03",
                  title: "Quadrant interpretation",
                  description:
                    "Four configurations from the two-subscale cross: Functional Self, the Sovereign, the Charmer, the Full Pattern. Each gets a long-form read on the results page.",
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
            <Link href="/quiz/narcissist/take">
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
            items={NARCISSIST_QUIZ_FAQ.map((q) => ({
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
                  {NARCISSIST_QUIZ_INFO.disclaimer}
                </p>
              </div>
            </div>
          </m.div>
        </div>
      </main>
    </>
  );
}
