"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { QUIZ_INFO } from "@/lib/quiz-data";
import {
  Crosshair,
  Flame,
  Crown,
  Waves,
  Sparkles,
  Scale,
  Check,
} from "lucide-react";

export default function ConsiliumQuizLanding() {
  return (
    <div className="px-4 py-10 sm:py-12">
      <div className="container mx-auto max-w-4xl">
        {/* Hero */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-accent-gold/40 bg-accent-gold/5 rounded-full">
            <Check size={14} className="text-accent-gold" />
            <span className="text-accent-gold text-xs tracking-[0.2em] uppercase">
              Included with your membership
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
            {QUIZ_INFO.name}
          </h1>

          <p className="text-xl sm:text-2xl text-accent-gold font-light mb-8">
            {QUIZ_INFO.tagline}
          </p>

          <p className="text-text-gray text-lg max-w-2xl mx-auto mb-10">
            {QUIZ_INFO.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
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
              <div className="text-3xl font-light text-accent-gold">Free</div>
              <div className="text-text-gray text-sm uppercase tracking-wider">
                For Counselors
              </div>
            </div>
          </div>

          <Link href="/quiz/take">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black font-medium text-lg tracking-wider uppercase rounded transition-all hover:shadow-lg hover:shadow-accent-gold/20"
            >
              Begin Assessment
            </m.button>
          </Link>
          <p className="mt-4 text-text-gray text-sm">
            Your full report unlocks automatically.
          </p>
        </m.div>

        {/* Personality types */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-14"
        >
          <h2 className="text-2xl font-light text-white text-center mb-8 tracking-wide">
            The Six Personality Types
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Psychopathic", trait: "Cold & Calculated", Icon: Crosshair },
              { name: "Sociopathic", trait: "Impulsive & Reactive", Icon: Flame },
              { name: "Narcissistic", trait: "Grandiose & Entitled", Icon: Crown },
              { name: "Borderline", trait: "Intense & Unstable", Icon: Waves },
              { name: "Histrionic", trait: "Dramatic & Magnetic", Icon: Sparkles },
              { name: "Neurotypical", trait: "Balanced & Adaptive", Icon: Scale },
            ].map((type, index) => (
              <m.div
                key={type.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`p-5 bg-deep-black/50 border rounded-xl text-center transition-all duration-300 group ${
                  type.name === "Neurotypical"
                    ? "border-green-600/30 hover:border-green-500/50"
                    : "border-accent-gold/20 hover:border-accent-gold/40"
                }`}
              >
                <div
                  className={`w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center transition-colors ${
                    type.name === "Neurotypical"
                      ? "bg-green-500/10 group-hover:bg-green-500/20"
                      : "bg-accent-gold/10 group-hover:bg-accent-gold/20"
                  }`}
                >
                  <type.Icon
                    size={20}
                    className={
                      type.name === "Neurotypical"
                        ? "text-green-400"
                        : "text-accent-gold"
                    }
                  />
                </div>
                <div
                  className={`font-light mb-1 ${
                    type.name === "Neurotypical" ? "text-green-400" : "text-accent-gold"
                  }`}
                >
                  {type.name}
                </div>
                <div className="text-text-gray text-xs">{type.trait}</div>
              </m.div>
            ))}
          </div>
        </m.div>

        {/* How it works. Consilium version (no paywall step) */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-14"
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
                  "Real dating and social situations. No boring agree/disagree, just truth.",
              },
              {
                step: "02",
                title: "Get Your Profile",
                description:
                  "See your primary type, secondary type, and full radar chart across all six axes.",
              },
              {
                step: "03",
                title: "Clinical Diagnosis",
                description:
                  "Functioning-level analysis delivered instantly. Already unlocked for you.",
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
                <h3 className="text-lg font-light text-white mb-2">{item.title}</h3>
                <p className="text-text-gray text-sm">{item.description}</p>
              </m.div>
            ))}
          </div>
        </m.div>

        {/* Disclaimer */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-10"
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
          className="text-center"
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
        </m.div>
      </div>
    </div>
  );
}
