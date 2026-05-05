"use client";

import { m } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import FAQSection from "@/components/FAQSection";
import {
  COVERT_NARCISSIST_QUIZ_INFO,
  COVERT_NARCISSIST_QUIZ_FAQ,
} from "@/lib/quiz-covert-narcissist-data";
import {
  ShieldAlert,
  EyeOff,
  ArrowRight,
  ScrollText,
  GraduationCap,
} from "lucide-react";

const RELATED_LINKS = [
  {
    href: "/quiz/narcissist",
    title: "The Narcissist Test (NPI-40)",
    description:
      "The companion test for grandiose narcissism. Together, the two triangulate: high NPI + low HSNS = grandiose; low NPI + high HSNS = covert; both high = the rare 'malignant' / exhibitionistic-vulnerable blend.",
    type: "Companion quiz",
  },
  {
    href: "/quiz/sociopath",
    title: "The Sociopath Test (LSRP)",
    description:
      "Measures psychopathy on two subscales. Vulnerable narcissism and Secondary psychopathy correlate moderately in the literature; if the Charmer pattern surfaced for you on the Narcissist test, the LSRP read is informative.",
    type: "Sister quiz",
  },
  {
    href: "/quiz",
    title: "The Dark Mirror Assessment",
    description:
      "The wide map: profiles you across six Cluster B types. Take this if you want to see how your covert-narcissism axis sits in the broader personality landscape.",
    type: "Wide map",
  },
  {
    href: "/book",
    title: "The Sociopathic Dating Bible",
    description:
      "Long-form. The chapter on the covert pattern was written by an author with an adjacent diagnosis (ASPD, not NPD) and reads from the inside on the contempt-for-the-needy mechanic.",
    type: "Book",
  },
] as const;

export default function CovertNarcissistQuizLanding() {
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
              Built on the Hypersensitive Narcissism Scale (HSNS),
              Hendin &amp; Cheek 1997. Vulnerable narcissism is not a
              separate DSM diagnosis. Only a licensed clinician can
              diagnose any personality disorder.
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
                Calibrated · HSNS
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
              {COVERT_NARCISSIST_QUIZ_INFO.name}
            </h1>

            <p className="text-xl sm:text-2xl text-accent-gold font-light mb-8">
              {COVERT_NARCISSIST_QUIZ_INFO.tagline}
            </p>

            <p className="text-text-gray text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Ten items, one subscale, scored against published research
              norms. The construct the NPI-40 systematically misses:
              hypersensitivity, shame-based grandiosity, secret contempt
              for the people whose sympathy you require.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  {COVERT_NARCISSIST_QUIZ_INFO.itemCount}
                </div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  Items
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  ~{COVERT_NARCISSIST_QUIZ_INFO.estimatedMinutes} min
                </div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  To complete
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">4</div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  Tier reads
                </div>
              </div>
            </div>

            <Link href="/quiz/covert-narcissist/take">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black font-medium text-lg tracking-wider uppercase rounded transition-all hover:shadow-lg hover:shadow-accent-gold/20"
              >
                Begin Assessment
              </m.button>
            </Link>
            <p className="mt-3 text-text-gray text-xs">
              Free. Tier read returned in full.
            </p>
          </m.div>

          {/* What this measures */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 p-6 sm:p-8 rounded-xl border border-accent-gold/20 bg-deep-black/40"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent-gold/10 shrink-0">
                <EyeOff size={22} className="text-accent-gold" />
              </div>
              <div>
                <h3 className="text-xl font-light text-white mb-1">
                  What this measures
                </h3>
                <p className="text-accent-gold text-sm tracking-wider uppercase">
                  Vulnerable / covert narcissism
                </p>
              </div>
            </div>
            <div className="text-text-gray text-sm leading-relaxed space-y-3">
              <p>
                Most narcissism quizzes measure the loud version, the
                NPI-40 grandiose configuration. This one measures the
                quiet one. The construct dates to Akhtar 1989 and was
                systematised by Pincus and colleagues in the
                Pathological Narcissism Inventory (Pincus et al. 2009).
                The HSNS is the brief self-report measure used widely in
                the literature.
              </p>
              <p>
                Where grandiose narcissism presents as confident,
                dominant, and exhibitionist, vulnerable narcissism
                presents as hypersensitive, self-conscious, and
                contemptuously withdrawn. Same underlying need for
                narcissistic supply, organised around shame instead of
                grandiosity. The two configurations look completely
                different in real life and respond to different
                interventions.
              </p>
              <p className="text-text-gray/70 text-xs italic">
                Source instrument:{" "}
                <span className="not-italic">
                  {COVERT_NARCISSIST_QUIZ_INFO.basedOn}
                </span>
              </p>
            </div>
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
                Most online covert-narcissism quizzes are written by
                anonymous SEO operators, by survivor-blog authors with
                no clinical background, or by therapy-content sites that
                have to keep a sterile distance from the construct
                they're describing. This one is written by an author
                with an adjacent personality-disorder diagnosis (ASPD,
                not NPD), working from the published instrument the
                academic literature actually uses.
              </p>
              <p>
                The items track HSNS exactly. The voice is in the
                tier-profile interpretations, where most clinical
                content sites lose the courage of the data and where
                this one doesn't.
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
            <Link href="/quiz/covert-narcissist/take">
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
            items={COVERT_NARCISSIST_QUIZ_FAQ.map((q) => ({
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
                  {COVERT_NARCISSIST_QUIZ_INFO.disclaimer}
                </p>
              </div>
            </div>
          </m.div>
        </div>
      </main>
    </>
  );
}
