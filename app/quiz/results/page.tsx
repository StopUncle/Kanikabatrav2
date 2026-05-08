"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import Link from "next/link";
import {
  Lock,
  Loader2,
  UserPlus,
  LogIn,
  Stethoscope,
  Radar,
  Activity,
  Users,
  Heart,
  LayoutDashboard,
} from "lucide-react";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import StripeButton from "@/components/StripeButton";
import {
  PERSONALITY_PROFILES,
  PersonalityType,
  QuizScores,
  DiagnosisResult,
  QUIZ_INFO,
} from "@/lib/quiz-data";
import RadarChart from "@/components/quiz/RadarChart";
import { getAttributionForSubmit } from "@/lib/attribution";

interface QuizResultsData {
  scores: QuizScores;
  primaryType: PersonalityType;
  secondaryType: PersonalityType;
  diagnosis: DiagnosisResult;
  answers: Record<number, PersonalityType>;
  completedAt: string;
}

interface ApiQuizResult {
  unlocked: boolean;
  quizResultId?: string;
  preview?: {
    primaryType: string;
    secondaryType: string;
    completedAt: string;
  };
  result?: {
    primaryType: string;
    secondaryType: string;
    scores: QuizScores;
    diagnosis: DiagnosisResult;
    answers: Record<number, PersonalityType>;
    completedAt: string;
  };
  consiliumCredit?: {
    code: string;
    expiresAt: string;
  } | null;
}

type PageState =
  | "loading"
  | "unauthenticated"
  | "no-results"
  | "locked"
  | "unlocked";

export default function QuizResultsPage() {
  const [pageState, setPageState] = useState<PageState>("loading");
  const [sessionData, setSessionData] = useState<QuizResultsData | null>(null);
  const [apiData, setApiData] = useState<ApiQuizResult | null>(null);
  const [email, setEmail] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    let stored: QuizResultsData | null = null;
    try {
      const raw = sessionStorage.getItem("quizResults");
      if (raw) stored = JSON.parse(raw) as QuizResultsData;
    } catch {
      // Ignore parse errors
    }
    setSessionData(stored);

    async function init() {
      // Check auth
      const authRes = await fetch("/api/auth/me");

      if (!authRes.ok) {
        // Not authenticated
        setPageState("unauthenticated");
        return;
      }

      // Authenticated, save quiz if sessionStorage has data
      if (stored) {
        try {
          await fetch("/api/quiz/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              scores: stored.scores,
              primaryType: stored.primaryType,
              secondaryType: stored.secondaryType,
              diagnosis: stored.diagnosis,
              answers: stored.answers,
              completedAt: stored.completedAt,
              // First-touch attribution, only stamped on CREATE
              // server-side, so a returning user's existing source is
              // preserved.
              attribution: getAttributionForSubmit(),
            }),
          });
          sessionStorage.removeItem("quizResults");
        } catch {
          // Save failed silently, results page will still work from DB
        }
      }

      // Load results from DB
      try {
        const resultsRes = await fetch("/api/quiz/my-results");
        if (resultsRes.status === 404) {
          setPageState("no-results");
          return;
        }
        if (!resultsRes.ok) {
          setPageState("no-results");
          return;
        }
        const data = (await resultsRes.json()) as ApiQuizResult;
        setApiData(data);
        setPageState(data.unlocked ? "unlocked" : "locked");
      } catch {
        setPageState("no-results");
      }
    }

    init();
  }, []);

  // Resolve the display data depending on state
  const primaryType: PersonalityType | null =
    pageState === "unlocked" && apiData?.result
      ? (apiData.result.primaryType as PersonalityType)
      : pageState === "locked" && apiData?.preview
        ? (apiData.preview.primaryType as PersonalityType)
        : pageState === "unauthenticated" && sessionData
          ? sessionData.primaryType
          : null;

  const primaryProfile = primaryType
    ? PERSONALITY_PROFILES[primaryType]
    : null;

  // Full results for unlocked state
  const fullResults: QuizResultsData | null =
    pageState === "unlocked" && apiData?.result
      ? {
          scores: apiData.result.scores,
          primaryType: apiData.result.primaryType as PersonalityType,
          secondaryType: apiData.result.secondaryType as PersonalityType,
          diagnosis: apiData.result.diagnosis,
          answers: apiData.result.answers,
          completedAt: apiData.result.completedAt,
        }
      : null;


  // Loading state
  if (pageState === "loading") {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent-gold animate-spin" />
      </div>
    );
  }

  // No results, never took the quiz
  if (pageState === "no-results") {
    return (
      <>
        <BackgroundEffects />
        <Header />
        <main className="min-h-screen pt-24 pb-16 relative z-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center py-24">
              <div className="inline-block mb-6 px-4 py-2 border border-accent-gold/30 rounded-full">
                <span className="text-accent-gold text-sm tracking-[0.2em] uppercase">
                  No Results Found
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extralight text-white mb-4">
                Take the Assessment First
              </h1>
              <p className="text-text-gray font-light mb-8 max-w-lg mx-auto">
                Discover which personality archetype drives your behavior with
                our {QUIZ_INFO.questionCount}-question Dark Mirror Assessment.
              </p>
              <Link
                href="/quiz/take"
                className="inline-block px-10 py-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black font-medium text-lg tracking-wider uppercase rounded transition-all hover:shadow-lg hover:shadow-accent-gold/20"
              >
                Take The Assessment
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Unauthenticated, show auth gate
  if (pageState === "unauthenticated") {
    return (
      <>
        <BackgroundEffects />
        <Header />
        <main className="min-h-screen pt-24 pb-16 relative z-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-block mb-4 px-4 py-2 border border-accent-gold/30 rounded-full">
                <span className="text-accent-gold text-sm tracking-[0.2em] uppercase">
                  Assessment Complete
                </span>
              </div>

              {primaryProfile && (
                <h1 className="text-3xl sm:text-4xl font-extralight text-white mb-6">
                  Your Type:{" "}
                  <span className="text-accent-gold">
                    {primaryProfile.name}
                  </span>
                </h1>
              )}
            </m.div>

            {/* Auth Gate */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-lg mx-auto"
            >
              <div className="p-8 sm:p-10 bg-deep-black/50 border border-accent-gold/20 rounded-xl text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
                  <Lock className="w-7 h-7 text-accent-gold" />
                </div>

                <h2 className="text-2xl font-extralight text-white mb-3">
                  Create an Account to Save &amp; View Your Results
                </h2>
                <p className="text-text-gray font-light mb-8 leading-relaxed">
                  Your assessment has been completed. Create a free account to
                  save your results and access your full personality profile.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/register?returnTo=/quiz/results"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black font-medium tracking-wider uppercase rounded transition-all hover:shadow-lg hover:shadow-accent-gold/20"
                  >
                    <UserPlus size={18} />
                    Create Account
                  </Link>
                  <Link
                    href="/login?returnTo=/quiz/results"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-accent-gold/30 text-accent-gold font-medium tracking-wider uppercase rounded transition-all hover:bg-accent-gold/10"
                  >
                    <LogIn size={18} />
                    Sign In
                  </Link>
                </div>
              </div>
            </m.div>

            {/* Blurred preview teaser */}
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <div className="relative p-8 bg-deep-black/50 border border-accent-gold/20 rounded-lg">
                <div className="blur-md opacity-30 pointer-events-none">
                  <RadarChart scores={sessionData?.scores ?? { psychopathic: 35, sociopathic: 25, narcissistic: 40, borderline: 15, histrionic: 20, neurotypical: 65 }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6 bg-deep-black/80 rounded-lg border border-accent-gold/30">
                    <Lock className="w-8 h-8 text-accent-gold mx-auto mb-3" />
                    <p className="text-white font-light mb-2">
                      Full Profile Locked
                    </p>
                    <p className="text-text-gray text-sm">
                      Create an account to access your complete results
                    </p>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </main>
      </>
    );
  }

  // Locked, authenticated but not unlocked (no book purchase / no payment)
  if (pageState === "locked" && primaryProfile) {
    const secondaryType =
      apiData?.preview?.secondaryType as PersonalityType | undefined;
    const secondaryProfile = secondaryType
      ? PERSONALITY_PROFILES[secondaryType]
      : null;

    return (
      <>
        <BackgroundEffects />
        <Header />
        <main className="min-h-screen pt-24 pb-16 relative z-10">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Results Header */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-block mb-4 px-4 py-2 border border-accent-gold/30 rounded-full">
                <span className="text-accent-gold text-sm tracking-[0.2em] uppercase">
                  Assessment Complete
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extralight text-white mb-4">
                Primary Type:{" "}
                <span className="text-accent-gold">{primaryProfile.name}</span>
              </h1>

              <p className="text-xl text-text-gray font-light italic mb-6">
                &quot;{primaryProfile.tagline}&quot;
              </p>

              {secondaryProfile && (
                <p className="text-text-gray text-sm">
                  Secondary Type: {secondaryProfile.name}
                </p>
              )}

              {/* Blurred Clinical Diagnosis Preview */}
              <div className="relative inline-block mt-6">
                <div className="blur-sm select-none px-6 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg">
                  <p className="text-accent-gold font-mono text-sm">
                    Clinical diagnosis loading...
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xs bg-deep-black/80 px-3 py-1 rounded flex items-center gap-1.5">
                    <Lock size={12} />
                    Unlock to reveal
                  </span>
                </div>
              </div>
            </m.div>

            {/* Locked Radar Chart Preview */}
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="relative p-8 bg-deep-black/50 border border-accent-gold/20 rounded-lg">
                <div className="blur-md opacity-30 pointer-events-none">
                  <RadarChart scores={{ psychopathic: 65, sociopathic: 40, narcissistic: 75, borderline: 30, histrionic: 45, neurotypical: 20 }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6 bg-deep-black/80 rounded-lg border border-accent-gold/30">
                    <Lock className="w-8 h-8 text-accent-gold mx-auto mb-3" />
                    <p className="text-white font-light mb-2">
                      Full Results Locked
                    </p>
                    <p className="text-text-gray text-sm">
                      6-axis breakdown including Neurotypical baseline
                    </p>
                  </div>
                </div>
              </div>
            </m.div>

            {/* What You'll Get */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-xl font-light text-white text-center mb-6">
                Your Full Clinical Report Includes:
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Clinical-Style Diagnosis",
                    desc: "Your type + functioning level assessment",
                    Icon: Stethoscope,
                  },
                  {
                    title: "Complete Radar Chart",
                    desc: "Visual breakdown of all 6 types including NT",
                    Icon: Radar,
                  },
                  {
                    title: "Functioning Analysis",
                    desc: "High/Moderate/Low adaptive assessment",
                    Icon: Activity,
                  },
                  {
                    title: "Primary & Secondary Types",
                    desc: "Deep dive into your top two patterns",
                    Icon: Users,
                  },
                  {
                    title: "Relationship Patterns",
                    desc: "How your type affects your love life",
                    Icon: Heart,
                  },
                  {
                    title: "Delivered Instantly",
                    desc: "Access your results anytime from your dashboard",
                    Icon: LayoutDashboard,
                  },
                ].map((item, index) => (
                  <m.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-deep-black/30 border border-accent-gold/10 rounded-lg"
                  >
                    <item.Icon size={16} className="text-accent-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white font-light">{item.title}</div>
                      <div className="text-text-gray text-sm">{item.desc}</div>
                    </div>
                  </m.div>
                ))}
              </div>
            </m.div>

            {/* Unlock Options */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 max-w-lg mx-auto"
            >
              {/* Option 1: Buy the book (includes quiz) */}
              <Link
                href="/book"
                className="block p-6 bg-deep-black/50 border border-accent-gold/30 rounded-xl hover:border-accent-gold/60 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-accent-gold text-xs uppercase tracking-wider mb-1">
                      Best Value
                    </p>
                    <p className="text-white font-light text-lg">
                      Buy the Sociopathic Dating Bible
                    </p>
                    <p className="text-text-gray text-sm mt-1">
                      Includes full quiz results unlock
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-accent-gold text-2xl font-light">$24.99</p>
                  </div>
                </div>
              </Link>

              {/* Option 2: Unlock results only */}
              {!showPayment ? (
                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full p-6 bg-deep-black/30 border border-accent-gold/10 rounded-xl hover:border-accent-gold/30 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-light text-lg">
                        Unlock Results Only
                      </p>
                      <p className="text-text-gray text-sm mt-1">
                        One-time payment, instant access
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-2xl font-light">
                        ${QUIZ_INFO.price}
                      </p>
                    </div>
                  </div>
                </button>
              ) : (
                <div className="p-6 bg-deep-black/50 border border-accent-gold/20 rounded-xl">
                  <h3 className="text-xl font-light text-white mb-4">
                    Enter Your Email
                  </h3>
                  <p className="text-text-gray text-sm mb-6">
                    Your full clinical report will be sent here.
                  </p>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-deep-black border border-accent-gold/30 rounded text-white placeholder-text-gray/50 focus:border-accent-gold focus:outline-none mb-4"
                  />

                  <StripeButton
                    priceKey="QUIZ"
                    label="Unlock Full Report"
                    price="$9.99"
                    email={email}
                    metadata={{ quizResultId: apiData?.quizResultId || "" }}
                    successUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/quiz/results`}
                  />

                  <button
                    onClick={() => setShowPayment(false)}
                    className="mt-4 w-full text-text-gray text-sm hover:text-white transition-colors"
                  >
                    &larr; Back
                  </button>
                </div>
              )}
            </m.div>

            {/* Personalized Recommendation.
                Order matters at peak intent. Consilium credit (highest
                LTV, recurring) leads. Book / coaching is the secondary
                recommendation, framed as a complementary path rather
                than the headline. Pre-2026-05-08 the order was inverted
                and quiz-buyer credit redemption was 0/9 over 30 days. */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-12"
            >
              {apiData?.consiliumCredit ? (
                <div className="p-6 rounded-xl border border-accent-gold/40 bg-gradient-to-br from-accent-gold/[0.08] to-deep-burgundy/[0.1] text-center">
                  <p className="text-accent-gold text-[10px] uppercase tracking-[0.25em] mb-3 font-semibold">
                    A thank-you from Kanika
                  </p>
                  <p className="text-white font-light text-lg mb-2">
                    Your ${QUIZ_INFO.price.toFixed(2)} is credited toward The Consilium
                  </p>
                  <p className="text-text-gray text-xs mb-4 max-w-md mx-auto leading-relaxed">
                    Inside: the Dark Mirror Simulator, the classroom, voice notes, and a moderated community. Use this code at checkout, it comes off your first month.
                  </p>
                  <div className="inline-block bg-deep-black/60 border border-dashed border-accent-gold/50 rounded-lg px-5 py-3 mb-3">
                    <p className="text-text-gray/70 text-[10px] uppercase tracking-[0.2em] mb-1">
                      Your code
                    </p>
                    <p className="text-accent-gold font-mono text-lg font-bold tracking-[0.2em]">
                      {apiData.consiliumCredit.code}
                    </p>
                  </div>
                  <p className="text-text-gray/50 text-[10px] mb-4">
                    Expires{" "}
                    {new Date(apiData.consiliumCredit.expiresAt).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" },
                    )}{" "}
                    · Single use
                  </p>
                  <Link
                    href="/consilium"
                    className="inline-block px-8 py-3 text-sm font-medium uppercase tracking-wider text-deep-black bg-accent-gold rounded-full hover:bg-accent-gold/90 transition-all"
                  >
                    Apply My Credit
                  </Link>
                </div>
              ) : (
                <div className="p-6 rounded-xl border border-accent-gold/30 bg-accent-gold/[0.04] text-center">
                  <p className="text-accent-gold text-[10px] uppercase tracking-[0.25em] mb-3 font-semibold">
                    Where this gets practised
                  </p>
                  <p className="text-white font-light text-lg mb-3">
                    The Consilium, $29/month
                  </p>
                  <p className="text-text-gray text-xs mb-5 max-w-md mx-auto leading-relaxed">
                    The Dark Mirror Simulator runs the patterns you just scored on as branching scenarios, in real-world artefacts. Plus the classroom, voice notes, and a moderated community. Cancel any time.
                  </p>
                  <Link
                    href="/consilium"
                    className="inline-block px-8 py-3 text-sm font-medium uppercase tracking-wider text-deep-black bg-accent-gold rounded-full hover:bg-accent-gold/90 transition-all"
                  >
                    Step Inside
                  </Link>
                </div>
              )}

              {primaryType &&
              ["narcissistic", "borderline", "histrionic"].includes(
                primaryType,
              ) ? (
                <div className="mt-6 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center">
                  <p className="text-text-gray text-sm mb-2">
                    Also based on your results
                  </p>
                  <p className="text-text-gray/85 font-light text-base mb-4 max-w-md mx-auto leading-relaxed">
                    Your pattern suggests you may be attracting or attracted to high-risk personality types. A session can help you see what you keep missing.
                  </p>
                  <Link
                    href="/coaching"
                    className="inline-block px-6 py-2 text-sm font-medium text-accent-gold border border-accent-gold/20 rounded-full hover:bg-accent-gold/10 transition-all"
                  >
                    Explore Coaching
                  </Link>
                </div>
              ) : (
                <div className="mt-6 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center">
                  <p className="text-text-gray text-sm mb-2">
                    Also based on your results
                  </p>
                  <p className="text-text-gray/85 font-light text-base mb-4 max-w-md mx-auto leading-relaxed">
                    Your empathy levels make you a target for manipulation. The Sociopathic Dating Bible teaches you the playbook so you can see it coming. Members get it for $9.99 (vs $24.99 standalone).
                  </p>
                  <Link
                    href="/book"
                    className="inline-block px-6 py-2 text-sm font-medium text-accent-gold border border-accent-gold/20 rounded-full hover:bg-accent-gold/10 transition-all"
                  >
                    Get the Book
                  </Link>
                </div>
              )}
            </m.div>

            {/* Retake Option */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-center"
            >
              <Link
                href="/quiz"
                className="text-text-gray text-sm hover:text-accent-gold transition-colors"
              >
                &larr; Retake Assessment
              </Link>
            </m.div>
          </div>
        </main>
      </>
    );
  }

  // Unlocked, full results
  if (pageState === "unlocked" && fullResults && primaryProfile) {
    const secondaryProfile =
      PERSONALITY_PROFILES[fullResults.secondaryType];
    const diagnosis = fullResults.diagnosis;

    return (
      <>
        <BackgroundEffects />
        <Header />
        <main className="min-h-screen pt-24 pb-16 relative z-10">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Results Header */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-block mb-4 px-4 py-2 border border-accent-gold/30 rounded-full">
                <span className="text-accent-gold text-sm tracking-[0.2em] uppercase">
                  Assessment Complete
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extralight text-white mb-4">
                Primary Type:{" "}
                <span className="text-accent-gold">{primaryProfile.name}</span>
              </h1>

              <p className="text-xl text-text-gray font-light italic mb-6">
                &quot;{primaryProfile.tagline}&quot;
              </p>

              {/* Clinical Diagnosis */}
              <div className="inline-block px-6 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg">
                <p className="text-accent-gold font-mono text-sm">
                  {diagnosis?.clinicalLabel || "Clinical diagnosis"}
                </p>
              </div>
            </m.div>

            {/* Radar Chart */}
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="p-8 bg-deep-black/50 border border-accent-gold/20 rounded-lg">
                <RadarChart scores={fullResults.scores} />
              </div>
            </m.div>

            {/* Primary Type Deep Dive */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="p-6 bg-deep-black/30 border border-accent-gold/20 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-accent-gold">
                    {primaryProfile.name}
                  </h3>
                  <span className="text-text-gray text-sm">
                    {fullResults.scores[fullResults.primaryType]}%
                  </span>
                </div>
                <p className="text-text-gray leading-relaxed">
                  {primaryProfile.description}
                </p>
              </div>
            </m.div>

            {/* Secondary Type */}
            {secondaryProfile && (
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <div className="p-6 bg-deep-black/30 border border-accent-gold/10 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg text-white font-light">
                      Secondary: {secondaryProfile.name}
                    </h3>
                    <span className="text-text-gray text-sm">
                      {fullResults.scores[fullResults.secondaryType]}%
                    </span>
                  </div>
                  <p className="text-text-gray leading-relaxed">
                    {secondaryProfile.description}
                  </p>
                </div>
              </m.div>
            )}

            {/* Functioning Level */}
            {diagnosis?.functioningLevel && (
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-12"
              >
                <div className="p-6 bg-deep-black/30 border border-accent-gold/10 rounded-lg text-center">
                  <p className="text-text-gray text-sm uppercase tracking-wider mb-2">
                    Functioning Level
                  </p>
                  <p className="text-white text-xl font-light capitalize">
                    {diagnosis.functioningLevel} Adaptive Function
                  </p>
                </div>
              </m.div>
            )}

            {/* Personalized Recommendation */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-12"
            >
              {["narcissistic", "borderline", "histrionic"].includes(
                fullResults.primaryType,
              ) ? (
                <div className="p-6 rounded-xl border border-accent-gold/20 bg-accent-gold/[0.03] text-center">
                  <p className="text-text-gray text-sm mb-2">
                    Based on your results
                  </p>
                  <p className="text-white font-light text-lg mb-4">
                    Your pattern suggests you may be attracting or attracted to
                   , high-risk personality types. A session could help you see
                    what you keep missing.
                  </p>
                  <Link
                    href="/coaching"
                    className="inline-block px-8 py-3 text-sm font-medium uppercase tracking-wider text-accent-gold border border-accent-gold/30 rounded-full hover:bg-accent-gold/10 transition-all"
                  >
                    Explore Coaching
                  </Link>
                </div>
              ) : (
                <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center">
                  <p className="text-text-gray text-sm mb-2">
                    Based on your results
                  </p>
                  <p className="text-white font-light text-lg mb-4">
                    Your empathy levels make you a target for manipulation. The
                    Sociopathic Dating Bible teaches you the playbook they use —
                    so you can see it coming.
                  </p>
                  <Link
                    href="/book"
                    className="inline-block px-8 py-3 text-sm font-medium uppercase tracking-wider text-accent-gold border border-accent-gold/30 rounded-full hover:bg-accent-gold/10 transition-all"
                  >
                    Get the Book
                  </Link>
                </div>
              )}

              {apiData?.consiliumCredit ? (
                <div className="mt-6 p-6 rounded-xl border border-accent-gold/40 bg-gradient-to-br from-accent-gold/[0.08] to-deep-burgundy/[0.1] text-center">
                  <p className="text-accent-gold text-[10px] uppercase tracking-[0.25em] mb-3 font-semibold">
                    A thank-you from Kanika
                  </p>
                  <p className="text-white font-light text-lg mb-2">
                    Your ${QUIZ_INFO.price.toFixed(2)} is credited toward The Consilium
                  </p>
                  <p className="text-text-gray text-xs mb-4 max-w-md mx-auto leading-relaxed">
                    Inside: the Dark Mirror Simulator, the classroom, voice notes, and a moderated community. Use this code at checkout, it comes off your first month.
                  </p>
                  <div className="inline-block bg-deep-black/60 border border-dashed border-accent-gold/50 rounded-lg px-5 py-3 mb-3">
                    <p className="text-text-gray/70 text-[10px] uppercase tracking-[0.2em] mb-1">
                      Your code
                    </p>
                    <p className="text-accent-gold font-mono text-lg font-bold tracking-[0.2em]">
                      {apiData.consiliumCredit.code}
                    </p>
                  </div>
                  <p className="text-text-gray/50 text-[10px] mb-4">
                    Expires{" "}
                    {new Date(apiData.consiliumCredit.expiresAt).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" },
                    )}{" "}
                    · Single use
                  </p>
                  <Link
                    href="/consilium"
                    className="inline-block px-8 py-3 text-sm font-medium uppercase tracking-wider text-deep-black bg-accent-gold rounded-full hover:bg-accent-gold/90 transition-all"
                  >
                    Apply My Credit
                  </Link>
                </div>
              ) : (
                <div className="mt-6 p-5 bg-deep-black/30 border border-accent-gold/10 rounded-xl text-center">
                  <p className="text-text-gray text-sm mb-2">
                    Want to practise spotting these patterns in the wild?
                  </p>
                  <p className="text-text-gray/70 text-xs mb-3 max-w-md mx-auto leading-relaxed">
                    The Dark Mirror Simulator inside The Consilium, branching scenarios on the same axes you just scored on, in real-world artefacts. Plus courses, voice notes, and a moderated community.
                  </p>
                  <Link
                    href="/consilium"
                    className="inline-block px-6 py-2 text-sm font-medium text-accent-gold border border-accent-gold/20 rounded-full hover:bg-accent-gold/10 transition-all"
                  >
                    Explore The Consilium, $29/mo
                  </Link>
                </div>
              )}
            </m.div>

            {/* Retake Option */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-center"
            >
              <Link
                href="/quiz"
                className="text-text-gray text-sm hover:text-accent-gold transition-colors"
              >
                &larr; Retake Assessment
              </Link>
            </m.div>
          </div>
        </main>
      </>
    );
  }

  // Fallback loading
  return (
    <div className="min-h-screen bg-deep-black flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-accent-gold animate-spin" />
    </div>
  );
}
