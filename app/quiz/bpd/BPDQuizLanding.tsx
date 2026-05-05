"use client";

import { m } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import FAQSection from "@/components/FAQSection";
import { BPD_QUIZ_INFO, BPD_QUIZ_FAQ } from "@/lib/quiz-bpd-data";
import {
  ShieldAlert,
  HeartCrack,
  ArrowRight,
  ScrollText,
  GraduationCap,
} from "lucide-react";

const RELATED_LINKS = [
  {
    href: "/quiz",
    title: "The Dark Mirror Assessment",
    description:
      "BPD is one of six Cluster B types the Dark Mirror profiles. The wide map: take this if you want to see how BPD traits sit in the broader personality landscape, including the differential against HPD and NPD.",
    type: "Wide map",
  },
  {
    href: "/quiz/sociopath",
    title: "The Sociopath Test (LSRP)",
    description:
      "BPD and ASPD/Psychopathy show high comorbidity in the literature, particularly via the Secondary (impulsive) subscale. If your BPD score was high, the LSRP read is informative.",
    type: "Sister quiz",
  },
  {
    href: "/quiz/daughter",
    title: "The Daughter Pattern Assessment",
    description:
      "BPD has a known relationship with childhood emotional invalidation; many women with BPD configurations had narcissistic mothers. The Daughter Pattern is the assessment for that household-level question.",
    type: "Companion quiz",
  },
  {
    href: "/book",
    title: "The Sociopathic Dating Bible",
    description:
      "The chapter on the BPD pattern in relationships covers both sides, what it's like to date someone with BPD, and what it's like to be the one with BPD trying to date.",
    type: "Book",
  },
] as const;

export default function BPDQuizLanding() {
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
              The MSI-BPD is a screening instrument, not a diagnostic
              one. Only a licensed clinician with a full history can
              diagnose Borderline Personality Disorder. If you are in
              crisis, please contact a licensed therapist or, if there
              is risk, a crisis line.
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
                Calibrated · MSI-BPD
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
              {BPD_QUIZ_INFO.name}
            </h1>

            <p className="text-xl sm:text-2xl text-accent-gold font-light mb-8">
              {BPD_QUIZ_INFO.tagline}
            </p>

            <p className="text-text-gray text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Ten yes/no items, each mapped to one of the nine DSM-5
              criteria for Borderline Personality Disorder. The
              instrument McLean Hospital&rsquo;s research group built and
              validated. Cutoff ≥7 = likely BPD per the validation
              study (81% sensitivity, 85% specificity).
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  {BPD_QUIZ_INFO.itemCount}
                </div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  Items
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">
                  ~{BPD_QUIZ_INFO.estimatedMinutes} min
                </div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  To complete
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">9</div>
                <div className="text-text-gray text-sm uppercase tracking-wider">
                  DSM-5 criteria
                </div>
              </div>
            </div>

            <Link href="/quiz/bpd/take">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black font-medium text-lg tracking-wider uppercase rounded transition-all hover:shadow-lg hover:shadow-accent-gold/20"
              >
                Begin Assessment
              </m.button>
            </Link>
            <p className="mt-3 text-text-gray text-xs">
              Free. The full tier read returned.
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
                <HeartCrack size={22} className="text-accent-gold" />
              </div>
              <div>
                <h3 className="text-xl font-light text-white mb-1">
                  What this measures
                </h3>
                <p className="text-accent-gold text-sm tracking-wider uppercase">
                  Borderline Personality Disorder pattern
                </p>
              </div>
            </div>
            <div className="text-text-gray text-sm leading-relaxed space-y-3">
              <p>
                BPD is one of the most stigmatised, most often-misdiagnosed
                personality disorders. The cultural shorthand &ldquo;BPD =
                difficult woman&rdquo; is not what the diagnosis actually
                describes clinically; the literature describes a
                configuration of affective instability, identity
                uncertainty, intense relationships, impulsivity in
                multiple domains, and (often) self-harm or suicidality.
                The suffering, where it&rsquo;s there, is real.
              </p>
              <p>
                The MSI-BPD is the most widely cited brief screening
                instrument. It maps directly to the DSM-5 BPD criteria
                and was designed for the contemplation stage, when
                someone wants to know whether the pattern they suspect
                in themselves is registering at the level the field
                takes seriously, before booking with a clinician.
              </p>
              <p>
                BPD is also one of the most treatable Cluster B
                disorders when treated correctly (DBT, MBT, TFP, schema
                therapy). The cultural pessimism around the diagnosis
                is not supported by the outcome literature.
              </p>
              <p className="text-text-gray/70 text-xs italic">
                Source instrument:{" "}
                <span className="not-italic">{BPD_QUIZ_INFO.basedOn}</span>
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
                I do not have BPD; my own diagnosis is on a different
                axis (ASPD). What I can offer here is items reproduced
                exactly from Zanarini&rsquo;s validated screen, scoring
                that follows the published cutoff exactly, and tier
                profiles that take the construct seriously without
                leaning into the cultural stigma the diagnosis carries.
                The voice of the result page is mine; the instrument is
                Zanarini&rsquo;s.
              </p>
              <p>
                BPD is a serious diagnosis with serious treatment
                options. If your score is high, please see a clinician
                with specific BPD experience, not a generalist. The
                pattern is shiftable, more so than most Cluster B
                configurations, when treated by someone trained for it.
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
            <Link href="/quiz/bpd/take">
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
            items={BPD_QUIZ_FAQ.map((q) => ({
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
                  {BPD_QUIZ_INFO.disclaimer}
                </p>
              </div>
            </div>
          </m.div>
        </div>
      </main>
    </>
  );
}
