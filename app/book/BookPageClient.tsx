"use client";

import { useState } from "react";
import Link from "next/link";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import CountdownTimer from "@/components/CountdownTimer";
import PresaleModal from "@/components/PresaleModal";
// PayPal — kept as fallback
// import PayPalButton from "@/components/PayPalButton";
// import LemonSqueezyButton from "@/components/LemonSqueezyButton";
import StripeButton from "@/components/StripeButton";
import { BOOK_INFO } from "@/lib/constants";
import {
  Check,
  ShieldCheck,
  Bell,
  Zap,
} from "lucide-react";

const CHAPTER_LIST = [
  {
    num: 1,
    title: "The Doctrine of Cold",
    desc: "Why emotional detachment is magnetic — and how to master it",
  },
  {
    num: 2,
    title: "The Holy Grail Doctrine",
    desc: "Reframe your value so they pursue you, not the other way around",
  },
  {
    num: 3,
    title: "The Rotation",
    desc: "Never be emotionally dependent on one person's attention again",
  },
  {
    num: 4,
    title: "The Transformation Protocol",
    desc: "The specific changes that make people unable to look away",
  },
  {
    num: 5,
    title: "Scarcity Tactics",
    desc: "How to be the one they're afraid of losing",
  },
  {
    num: 6,
    title: "Love Bombing Mastery",
    desc: "Create emotional highs that keep them coming back",
  },
  {
    num: 7,
    title: "The Shit Test Matrix",
    desc: "Read what people actually mean — before they finish talking",
  },
  {
    num: 8,
    title: "Family Colonization",
    desc: "Win over the people whose opinion they trust most",
  },
  {
    num: 9,
    title: "Unhinged Texts",
    desc: "Turn texting from anxiety into your most powerful tool",
  },
  {
    num: 10,
    title: "The Beige Protocol",
    desc: "Neutralize competition without them ever knowing",
  },
  {
    num: 11,
    title: "Reputation Warfare",
    desc: "Own the narrative so it always works in your favour",
  },
  {
    num: 12,
    title: "The Nuclear Ghost Protocol",
    desc: "Walk away so cleanly they spend months wondering what they lost",
  },
  {
    num: 13,
    title: "The Upgrade Protocol",
    desc: "Know exactly when to level up — and how to do it gracefully",
  },
  {
    num: 14,
    title: "The Empress Endgame",
    desc: "Reach the point where you don't need anyone's validation",
  },
  {
    num: 15,
    title: "The Perks of Dating a Sociopath",
    desc: "Why the people who see through everything love the hardest",
  },
];

const TESTIMONIALS = [
  {
    quote: "This book decoded the game I didn't even know I was losing. Within 3 weeks of applying these strategies, I went from being overlooked to being pursued.",
    name: "Sarah K.",
    title: "Investment Banker",
  },
  {
    quote: "I used to be the one who got played. Now I'm the one they obsess over. The Rotation System alone is worth ten times the price of this book.",
    name: "Jessica T.",
    title: "Attorney",
  },
  {
    quote: "Forget therapy. This book taught me more about power dynamics in relationships than years of counseling. It's brutal, honest, and absolutely life-changing.",
    name: "Michelle R.",
    title: "CEO",
  },
  {
    quote: "Finally, dating advice that treats attraction as a skill to master. I used to overthink every relationship. Now I operate with clarity and control.",
    name: "Priya M.",
    title: "Marketing Director",
  },
  {
    quote: "Strategic, practical, powerful. This isn't feel-good fluff — it's a tactical manual for winning at modern dating.",
    name: "Daniel R.",
    title: "Sales Director",
  },
  {
    quote: "This book transformed my life.",
    name: "Verified Reader",
    title: "",
  },
];

export default function BookPage() {
  const [showPresaleModal, setShowPresaleModal] = useState(false);

  const handlePresaleSignup = async (
    email: string,
    option: "kdp" | "premium" | "both",
  ) => {
    const response = await fetch("/api/presale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, option }),
    });

    if (!response.ok) {
      throw new Error("Failed to join presale list");
    }

    return response.json();
  };

  const launchDate = new Date(BOOK_INFO.expectedLaunchDate);
  const formattedDate = launchDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const totalValue = BOOK_INFO.premiumBonuses.reduce((sum, b) => sum + b.value, 0);

  return (
    <>
      <BackgroundEffects />
      <Header />

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Visual */}
            <div className="relative">
              <div className="book-3d animate-levitate">
                <div className="relative w-80 h-[480px] mx-auto">
                  <div className="absolute inset-0 book-cover-gradient rounded-lg shadow-2xl">
                    <div className="p-8 h-full flex flex-col justify-between">
                      <div>
                        <p className="text-accent-gold text-xs uppercase tracking-[0.3em] mb-4">
                          As Featured on LADbible &amp; Unilad
                        </p>
                        <h1 className="text-4xl font-serif mb-2 gradient-text-gold">
                          SOCIOPATHIC
                        </h1>
                        <h1 className="text-4xl font-serif mb-2 gradient-text">
                          DATING
                        </h1>
                        <h1 className="text-4xl font-serif gradient-text-gold">
                          BIBLE
                        </h1>
                      </div>
                      <div>
                        <p className="text-text-gray text-sm mb-4 italic">
                          A Cure For Empathy
                        </p>
                        <p className="text-accent-gold font-serif text-lg">
                          KANIKA BATRA
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-4 top-0 bottom-0 w-12 bg-gradient-to-r from-deep-burgundy to-deep-black rounded-r-lg" />
                </div>
              </div>
            </div>

            {/* Book Info */}
            <div className="space-y-6">
              <div>
                <p className="text-accent-burgundy uppercase tracking-[0.2em] text-sm mb-2">
                  Written by a clinically diagnosed sociopath
                </p>
                <h2 className="text-4xl md:text-5xl font-serif mb-4">
                  <span className="gradient-text">The Playbook</span>
                  <br />
                  <span className="text-text-light">You Were Never Meant to See</span>
                </h2>
                <p className="text-text-gray text-lg">
                  {BOOK_INFO.description}
                </p>
              </div>

              <div className="space-y-3">
                {BOOK_INFO.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-accent-gold mt-0.5 shrink-0" />
                    <p className="text-text-light">{feature}</p>
                  </div>
                ))}
              </div>

              {BOOK_INFO.isPresale && (
                <div className="mb-6 space-y-4">
                  <div className="p-4 bg-accent-gold/10 rounded-lg border border-accent-gold/30">
                    <div className="flex items-center gap-2 text-accent-gold mb-3">
                      <Bell size={20} />
                      <span className="font-semibold">
                        Presale - Launching {formattedDate}
                      </span>
                    </div>
                    <CountdownTimer
                      targetDate={BOOK_INFO.expectedLaunchDate}
                      className="justify-center"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                {BOOK_INFO.isPresale ? (
                  <button
                    onClick={() => setShowPresaleModal(true)}
                    className="btn-primary rounded-full text-white px-8 py-4 flex items-center justify-center gap-2"
                  >
                    <Bell className="w-5 h-5" />
                    Join Presale List
                  </button>
                ) : (
                  <StripeButton
                    priceKey="BOOK"
                    label="Get Instant Access"
                    price="$24.99"
                    icon="cart"
                  />
                )}
                <Link
                  href="#chapters"
                  className="btn-secondary rounded-full px-8 py-4 text-center"
                >
                  See What&apos;s Inside
                </Link>
              </div>

              <div className="flex items-center gap-2 text-text-gray text-sm">
                <ShieldCheck size={16} className="text-accent-gold" />
                <span>
                  {BOOK_INFO.isPresale
                    ? "Be notified the moment the book launches + exclusive presale pricing"
                    : "Read 3 chapters. If it doesn't change how you see dating, full refund."}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof — Right After Hero */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-deep-burgundy/10 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-serif text-center mb-12 gradient-text">
              What Readers Are Saying
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {TESTIMONIALS.slice(0, 4).map((t, index) => (
                <div key={index} className="glass-card p-6 border-l-4 border-accent-gold">
                  <p className="text-text-light text-base mb-4 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="text-accent-gold text-sm">
                    — {t.name}{t.title ? `, ${t.title}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter Preview */}
        <section id="chapters" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-serif mb-4">
                <span className="gradient-text">15 Chapters + 2 Bonus</span>
              </h3>
              <p className="text-text-gray text-lg max-w-2xl mx-auto">
                Each chapter gives you a specific framework you can use immediately. No filler, no fluff — just the system.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CHAPTER_LIST.map((chapter) => (
                <div key={chapter.num} className="tier-card p-4 relative">
                  <div className="flex items-start gap-3">
                    <span className="text-accent-gold font-bold">
                      {chapter.num}.
                    </span>
                    <div>
                      <h4 className="text-text-light font-medium mb-1">
                        {chapter.title}
                      </h4>
                      <p className="text-text-gray text-sm">{chapter.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* More Testimonials */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {TESTIMONIALS.slice(4).map((t, index) => (
                <div key={index} className="glass-card p-6 border-l-4 border-accent-gold">
                  <p className="text-text-light text-lg mb-4 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="text-accent-gold">
                    — {t.name}{t.title ? `, ${t.title}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section — Value Stack */}
        <section className="py-20 px-4 border-t border-accent-gold/10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-serif mb-4">
                <span className="gradient-text">Everything You Get</span>
              </h3>
              <p className="text-text-gray text-lg">
                The premium edition includes exclusive content too raw for Amazon&apos;s guidelines.
              </p>
            </div>

            {/* Value Stack */}
            <div className="space-y-3 mb-8">
              {BOOK_INFO.premiumBonuses.map((bonus, i) => (
                <div key={i} className="flex items-start justify-between gap-4 p-4 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-start gap-3">
                    <Check className="text-accent-gold mt-0.5 shrink-0" size={18} />
                    <div>
                      <p className="text-text-light font-medium">{bonus.name}</p>
                      <p className="text-text-gray text-sm mt-0.5">{bonus.desc}</p>
                    </div>
                  </div>
                  <span className="text-text-gray whitespace-nowrap">${bonus.value}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-accent-gold/[0.04] border border-accent-gold/20 mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-gray text-sm">Total value</span>
                <span className="text-text-gray line-through text-lg">${totalValue.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-accent-gold text-sm font-medium">You pay today</span>
                <span className="text-4xl font-light gradient-text-gold">${BOOK_INFO.price}</span>
              </div>
              <div className="text-right mt-1">
                <span className="text-accent-gold/80 text-sm">You save ${(totalValue - BOOK_INFO.price).toFixed(0)}</span>
              </div>
            </div>

            <div className="space-y-4">
                {BOOK_INFO.isPresale ? (
                  <button
                    onClick={() => setShowPresaleModal(true)}
                    className="w-full btn-primary rounded-full text-white px-10 py-4 text-lg flex items-center justify-center gap-2"
                  >
                    <Bell className="w-5 h-5" />
                    Join Presale List
                  </button>
                ) : (
                  <StripeButton
                    priceKey="BOOK"
                    label="Get Instant Access"
                    price="$24.99"
                    icon="cart"
                  />
                )}

                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <ShieldCheck size={24} className="text-accent-gold shrink-0" />
                  <div>
                    <p className="text-text-light text-sm font-medium">Risk-free guarantee</p>
                    <p className="text-text-gray text-xs">Read 3 chapters. Not for you? Full refund, no questions asked.</p>
                  </div>
                </div>

                {/* Premium vs Kindle */}
                <div className="rounded-xl border border-white/[0.06] overflow-hidden">
                  <div className="grid grid-cols-2 text-center">
                    <div className="p-4 bg-accent-gold/[0.05] border-r border-white/[0.06]">
                      <p className="text-accent-gold text-xs uppercase tracking-wider mb-1">Premium Edition</p>
                      <p className="text-2xl font-light text-white">${BOOK_INFO.price}</p>
                      <p className="text-accent-gold/60 text-xs mt-1">Direct download</p>
                    </div>
                    <div className="p-4">
                      <p className="text-text-gray text-xs uppercase tracking-wider mb-1">Kindle Edition</p>
                      <p className="text-2xl font-light text-text-gray">${BOOK_INFO.kdpPrice}</p>
                      <p className="text-text-gray/40 text-xs mt-1">Amazon</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 text-xs border-t border-white/[0.06]">
                    {[
                      ["15 chapters", "15 chapters"],
                      ["Bonus: Understanding Narcissists", "—"],
                      ["Bonus: The Avoidant Playbook", "—"],
                      ["Exclusive uncensored addendum", "—"],
                      ["Instant download", "Kindle delivery"],
                    ].map(([premium, kindle], i) => (
                      <div key={i} className="contents">
                        <div className={`px-4 py-2.5 text-text-light border-r border-white/[0.06] ${i > 0 ? "border-t border-white/[0.06]" : ""}`}>
                          {premium}
                        </div>
                        <div className={`px-4 py-2.5 text-text-gray/50 ${i > 0 ? "border-t border-white/[0.06]" : ""}`}>
                          {kindle}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/[0.06] p-3 text-center">
                    <a
                      href={BOOK_INFO.kdpLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-gray hover:text-text-light text-xs transition-colors"
                    >
                      Prefer Kindle? Get it on Amazon &rarr;
                    </a>
                  </div>
                </div>
              </div>

            <p className="text-text-gray text-sm mt-6 text-center">
              {BOOK_INFO.isPresale
                ? `Launches ${formattedDate} — be the first to know`
                : "Instant digital download — lifetime access"}
            </p>
          </div>
        </section>
      </main>

      <PresaleModal
        isOpen={showPresaleModal}
        onClose={() => setShowPresaleModal(false)}
        onEmailSubmit={handlePresaleSignup}
      />
    </>
  );
}
