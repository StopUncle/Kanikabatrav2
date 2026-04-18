"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import StripeButton from "@/components/StripeButton";
import { COACHING_PACKAGES } from "@/lib/constants";
import { Check, ArrowRight, ChevronDown } from "lucide-react";

const COACHING_FAQ = [
  {
    question: "Is this therapy?",
    answer:
      "No. I'm not a licensed therapist and I don't treat mental health conditions. This is strategic coaching — I tell you what I see in a situation, and I give you a move. If you need clinical support, I'll tell you that directly.",
  },
  {
    question: "What if I don't know what to talk about?",
    answer:
      "You do. The situation that made you look at this page — that's what we talk about. A person, a pattern, a decision you can't make. Bring whatever's keeping you up at night.",
  },
  {
    question: "How do I prepare for a session?",
    answer:
      "Think about the one situation you most want clarity on. The more specific you are, the more useful I can be. Screenshots, context, backstory — bring it all.",
  },
  {
    question: "What's your refund policy?",
    answer:
      "If you book and genuinely can't make it, I'll reschedule once. No refunds after the session happens — you're paying for my time and attention, and you'll get both.",
  },
  {
    question: "Can I upgrade to a longer programme after a single session?",
    answer:
      "Yes. If we do a single session and you want to go deeper, I'll credit what you paid toward the Intensive or Career programme. Just let me know.",
  },
  {
    question: "How quickly can I book?",
    answer:
      "Depends on the month. Sometimes I have spots within the week, sometimes it's a 2-3 week wait. Retainer clients get priority scheduling.",
  },
  {
    question: "Is everything confidential?",
    answer:
      "Completely. What you tell me stays between us. I don't share details, names, or situations — not on social media, not with anyone.",
  },
];

const COACHING_PRICE_KEYS: Record<string, string> = {
  "single-session": "COACHING_SINGLE",
  clarity: "COACHING_CLARITY",
  intensive: "COACHING_INTENSIVE",
  career: "COACHING_CAREER",
  retainer: "COACHING_RETAINER",
};

const COACHING_PRICES: Record<string, string> = {
  "single-session": "$297",
  clarity: "$497",
  intensive: "$1,497",
  career: "$2,997",
  retainer: "$4,997",
};

export default function CoachingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState<Record<string, boolean>>({});

  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* ── HEADLINE ── */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-20"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-6">
              <span className="gradient-text">
                I Tell You What I See
              </span>
            </h1>
            <p className="text-text-gray text-lg sm:text-xl max-w-2xl mx-auto">
              You&apos;re not broken. You&apos;re just not seeing it yet.
            </p>
            <p className="text-accent-gold/60 text-sm mt-4 tracking-wider">
              1:1 coaching &middot; Limited spots each month
            </p>
          </m.div>

          {/* ── WHO THIS IS FOR ── */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16 max-w-2xl mx-auto"
          >
            <div className="space-y-5 sm:space-y-6">
              {[
                "You keep repeating the same patterns and you don't know why",
                "You know something is off but you can't name it",
                "You want to walk into any room and read everyone in it",
                "You're done being the person who gets blindsided",
                "You want to think differently — not just feel better",
              ].map((line, i) => (
                <m.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="text-text-light text-base sm:text-lg font-light leading-relaxed pl-5 border-l-2 border-accent-gold/30"
                >
                  {line}
                </m.p>
              ))}
            </div>
          </m.div>

          {/* ── WHO THIS IS NOT FOR ── */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-20 sm:mb-28 max-w-2xl mx-auto"
          >
            <div className="space-y-3 text-text-gray/50 text-sm">
              <p>
                I work with men and women. This is not therapy — I&apos;m not a
                licensed therapist and I don&apos;t treat mental health conditions.
              </p>
              <p>
                This is not for people looking for validation. I tell you what I
                see, whether you like it or not.
              </p>
            </div>
          </m.div>

          {/* ── PRICING TIERS ── */}
          <div className="mb-20 sm:mb-28">
            <m.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center text-3xl sm:text-4xl font-light mb-14"
            >
              <span className="gradient-text-gold">How It Works</span>
            </m.h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
              {COACHING_PACKAGES.map((pkg, index) => {
                const isRetainer = pkg.id === "retainer";
                const hasBundle = pkg.bundlePrice !== pkg.price;
                const badge = (pkg as Record<string, unknown>).badge as
                  | string
                  | null;

                return (
                  <m.div
                    key={pkg.id}
                    id={pkg.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    {/* Popular glow */}
                    {pkg.popular && (
                      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-accent-gold/25 via-accent-gold/8 to-transparent" />
                    )}

                    <div
                      className={`relative rounded-2xl bg-[#0a0a18] border h-full flex flex-col ${
                        pkg.popular
                          ? "border-accent-gold/20"
                          : "border-white/[0.06]"
                      }`}
                    >
                      {/* Badge */}
                      {badge && (
                        <div
                          className={`absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase whitespace-nowrap ${
                            pkg.popular
                              ? "bg-accent-gold text-deep-black"
                              : "bg-white/[0.06] text-text-gray border border-white/[0.06]"
                          }`}
                        >
                          {badge}
                        </div>
                      )}

                      <div className="p-6 sm:p-7 flex flex-col h-full">
                        {/* Name + Description */}
                        <div className="mb-6">
                          <h3 className="text-2xl font-light text-text-light mb-2">
                            {pkg.name}
                          </h3>
                          <p className="text-text-gray/60 text-sm leading-relaxed">
                            {pkg.description}
                          </p>
                        </div>

                        {/* Pricing */}
                        <div className="space-y-3 mb-6">
                          {/* Single / Main Price */}
                          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-text-gray text-xs uppercase tracking-wider">
                                {isRetainer
                                  ? "3 sessions + async"
                                  : hasBundle
                                    ? "Single session"
                                    : pkg.duration}
                              </span>
                              <span className="text-2xl font-light text-accent-gold">
                                ${pkg.price.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {/* Bundle Option */}
                          {hasBundle && (
                            <div className="relative p-4 rounded-xl bg-accent-gold/[0.03] border border-accent-gold/10">
                              <span className="absolute -top-2 right-3 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-accent-burgundy text-white">
                                Save ${pkg.price * 3 - pkg.bundlePrice}
                              </span>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-text-gray text-xs uppercase tracking-wider">
                                  {pkg.bundleDuration}
                                </span>
                                <div className="text-right">
                                  <span className="text-2xl font-light text-accent-gold">
                                    ${pkg.bundlePrice.toLocaleString()}
                                  </span>
                                  <span className="block text-xs text-text-gray/40 line-through">
                                    ${(pkg.price * 3).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Features */}
                        <ul className="space-y-2.5 mb-6 flex-1">
                          {pkg.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-sm text-text-gray/70"
                            >
                              <Check
                                size={14}
                                className="text-accent-gold mt-0.5 flex-shrink-0"
                              />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* CTA Button */}
                        <div className="mt-auto space-y-3">
                          {/* Terms & Conditions Agreement */}
                          <label className="flex items-start gap-2.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={agreedToTerms[pkg.id] || false}
                              onChange={(e) => {
                                setAgreedToTerms(prev => ({ ...prev, [pkg.id]: e.target.checked }));
                              }}
                              className="rounded border-accent-gold/20 text-accent-gold focus:ring-accent-gold/50 mt-0.5 flex-shrink-0"
                            />
                            <span className="text-xs text-text-gray/60 leading-relaxed">
                              I agree to the{" "}
                              <Link href="/terms" target="_blank" className="text-accent-gold hover:text-accent-gold/80 underline">
                                Terms & Conditions
                              </Link>
                              , including the coaching conduct policy
                            </span>
                          </label>

                          {agreedToTerms[pkg.id] && (
                            <StripeButton
                              priceKey={COACHING_PRICE_KEYS[pkg.id]}
                              label="Book Now"
                              price={COACHING_PRICES[pkg.id]}
                              successUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/coaching/success`}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </div>

          {/* ── COMPARISON TABLE ── */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-20 sm:mb-28 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-light text-center mb-10">
              <span className="gradient-text-gold">Compare</span>
            </h2>

            <div className="rounded-xl border border-white/[0.06] overflow-hidden text-sm overflow-x-auto">
              <div className="grid grid-cols-5 bg-white/[0.02] min-w-[640px]">
                <div className="p-3" />
                <div className="p-3 text-center text-text-light font-light text-xs">Single Session</div>
                <div className="p-3 text-center text-accent-gold font-light text-xs border-x border-white/[0.06]">Intensive</div>
                <div className="p-3 text-center text-text-light font-light text-xs">Career</div>
                <div className="p-3 text-center text-text-light font-light text-xs">Retainer</div>
              </div>
              {[
                ["Sessions", "1", "3", "4", "Weekly"],
                ["Duration", "40 min", "4 weeks", "4 weeks", "Ongoing"],
                ["Voice notes", "—", "—", "Between calls", "Between calls"],
                ["Focus", "Any topic", "Personal", "Professional", "Everything"],
                ["Book included", "Yes", "Yes", "Yes", "Yes"],
                ["Price", "$297", "$1,497", "$2,997", "$4,997"],
              ].map(([label, t1, t2, t3, t4], i) => (
                <div key={i} className="grid grid-cols-5 border-t border-white/[0.06] min-w-[640px]">
                  <div className="p-3 text-text-gray/60">{label}</div>
                  <div className="p-3 text-center text-text-gray">{t1}</div>
                  <div className="p-3 text-center text-text-light border-x border-white/[0.06] bg-accent-gold/[0.02]">{t2}</div>
                  <div className="p-3 text-center text-text-gray">{t3}</div>
                  <div className="p-3 text-center text-text-gray">{t4}</div>
                </div>
              ))}
            </div>

            <p className="text-center text-text-gray/40 text-xs mt-6 tracking-wider">
              Limited to 8 clients per month
            </p>
          </m.div>

          {/* ── THE PROCESS ── */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-20 sm:mb-28"
          >
            <h2 className="text-3xl sm:text-4xl font-light text-center mb-14">
              <span className="gradient-text">The Process</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "You talk. I listen.",
                  description:
                    "Bring me the situation. The relationship. The pattern. The person you can't figure out. Give me everything.",
                },
                {
                  step: "02",
                  title: "I tell you what I see.",
                  description:
                    "No softening. No managing your feelings. I show you what's actually happening — the pattern, the dynamic, the thing you keep missing.",
                },
                {
                  step: "03",
                  title: "You leave with a move.",
                  description:
                    "Not a mindset shift. Not a journaling exercise. An actual, concrete thing you do differently the next time you're in that situation.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#0a0a18] border border-white/[0.06] rounded-2xl p-7 sm:p-8 text-center"
                >
                  <div className="text-5xl font-light gradient-text-gold opacity-40 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-light text-text-light mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-gray/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </m.div>

          {/* ── FAQ ── */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-20 sm:mb-28 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-light text-center mb-14">
              <span className="gradient-text-gold">Common Questions</span>
            </h2>

            <div className="space-y-3">
              {COACHING_FAQ.map((item, index) => (
                <div
                  key={index}
                  className="border border-white/[0.06] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-text-light text-sm font-light pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-accent-gold/60 flex-shrink-0 transition-transform duration-200 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="px-5 pb-5 text-text-gray/60 text-sm leading-relaxed">
                          {item.answer}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </m.div>

          {/* ── INNER CIRCLE MENTION ── */}
          <div className="mt-8 text-center">
            <p className="text-text-gray text-sm mb-2">Not ready for 1:1?</p>
            <Link
              href="/consilium"
              className="text-accent-gold hover:text-accent-gold/80 text-sm transition-colors"
            >
              Start with The Consilium — $29/mo →
            </Link>
          </div>

          {/* ── SOCIAL PROOF ── */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-20 sm:mb-28 text-center"
          >
            <p className="text-text-gray/40 text-xs tracking-[0.2em] uppercase">
              As seen on LADbible &middot; 278K Instagram &middot; 157K YouTube
              &middot; Author of The Sociopathic Dating Bible
            </p>
          </m.div>

          {/* ── FINAL CTA ── */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-light mb-6">
              <span className="gradient-text-gold">Book a session</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              {COACHING_PACKAGES.map((pkg) => (
                <a
                  key={pkg.id}
                  href={`#${pkg.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(pkg.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3 rounded-lg border border-accent-gold/20 text-text-light text-sm hover:bg-accent-gold/5 transition-colors"
                >
                  {pkg.name} — ${pkg.price.toLocaleString()}
                  {pkg.price !== pkg.bundlePrice ? "+" : ""}
                </a>
              ))}
            </div>
            <a
              href="/contact"
              className="text-text-gray/50 text-sm hover:text-accent-gold transition-colors inline-flex items-center gap-1.5"
            >
              Questions? Contact us
              <ArrowRight size={14} />
            </a>
          </m.div>
        </div>
      </div>
    </>
  );
}
