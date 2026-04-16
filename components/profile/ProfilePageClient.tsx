"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import {
  Loader2,
  ArrowRight,
  Crosshair,
  Flame,
  Crown,
  Waves,
  Sparkles,
  Scale,
  BookOpen,
  Calendar,
  Shield,
  Settings,
  ChevronRight,
  Download,
} from "lucide-react";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import RadarChart from "@/components/quiz/RadarChart";
import { PERSONALITY_PROFILES, PersonalityType, QuizScores } from "@/lib/quiz-data";

interface ProfilePageClientProps {
  userId: string;
  email: string;
}

interface QuizData {
  unlocked: boolean;
  preview?: { primaryType: string; secondaryType: string };
  result?: {
    primaryType: string;
    secondaryType: string;
    scores: QuizScores;
    diagnosis: { functioningLevel: string; clinicalLabel: string };
  };
}

interface UserData {
  user: {
    name: string | null;
    email: string;
    createdAt: string;
    purchases: { type: string; amount: number }[];
    sessions: { status: string }[];
  };
}

const TYPE_ICONS: Record<string, typeof Crosshair> = {
  psychopathic: Crosshair,
  sociopathic: Flame,
  narcissistic: Crown,
  borderline: Waves,
  histrionic: Sparkles,
  neurotypical: Scale,
};

export default function ProfilePageClient({ userId: _userId, email }: ProfilePageClientProps) {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [quizRes, userRes] = await Promise.all([
        fetch("/api/quiz/my-results").catch(() => null),
        fetch("/api/user/dashboard").catch(() => null),
      ]);

      if (quizRes && quizRes.ok) {
        const data = await quizRes.json();
        setQuiz(data);
      }

      if (userRes && userRes.ok) {
        const data = await userRes.json();
        setUser(data);
      }

      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent-gold animate-spin" />
      </div>
    );
  }

  const userName = user?.user?.name || email.split("@")[0];
  const memberSince = user?.user?.createdAt
    ? new Date(user.user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;
  const totalPurchases = user?.user?.purchases?.length || 0;
  const completedSessions = user?.user?.sessions?.filter((s) => s.status === "COMPLETED").length || 0;

  const primaryType = quiz?.result?.primaryType || quiz?.preview?.primaryType;
  const secondaryType = quiz?.result?.secondaryType || quiz?.preview?.secondaryType;
  const profile = primaryType ? PERSONALITY_PROFILES[primaryType as PersonalityType] : null;
  const secondaryProfile = secondaryType ? PERSONALITY_PROFILES[secondaryType as PersonalityType] : null;
  const isUnlocked = quiz?.unlocked || false;
  const TypeIcon = primaryType ? TYPE_ICONS[primaryType] || Crosshair : null;

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen pt-28 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Profile Hero */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            {/* Avatar */}
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-burgundy to-accent-sapphire flex items-center justify-center shadow-lg shadow-accent-sapphire/20">
              <span className="text-3xl font-light text-white">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extralight text-text-light tracking-wider mb-2">
              {userName}
            </h1>

            {memberSince && (
              <p className="text-text-gray text-sm flex items-center justify-center gap-2">
                <Calendar size={14} />
                Member since {memberSince}
              </p>
            )}

            {/* Quick Stats Row */}
            <div className="flex justify-center gap-8 mt-6">
              <div className="text-center">
                <div className="text-2xl font-light text-accent-gold">{totalPurchases}</div>
                <div className="text-text-gray text-xs uppercase tracking-wider">Purchases</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-accent-gold">{completedSessions}</div>
                <div className="text-text-gray text-xs uppercase tracking-wider">Sessions</div>
              </div>
              {primaryType && (
                <div className="text-center">
                  <div className="text-2xl font-light text-accent-gold capitalize">{profile?.name?.split(" ").pop()}</div>
                  <div className="text-text-gray text-xs uppercase tracking-wider">Type</div>
                </div>
              )}
            </div>
          </m.div>

          {/* Personality Profile Section */}
          {profile && isUnlocked && quiz?.result ? (
            <>
              {/* Type Header Card */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <div className="p-8 bg-gradient-to-br from-deep-navy/80 to-deep-burgundy/80 backdrop-blur-xl border border-accent-sapphire/20 rounded-2xl shadow-2xl shadow-accent-sapphire/5">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {TypeIcon && (
                      <div className="w-20 h-20 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center flex-shrink-0">
                        <TypeIcon size={36} className="text-accent-gold" />
                      </div>
                    )}
                    <div className="text-center sm:text-left">
                      <p className="text-accent-gold text-xs uppercase tracking-[0.3em] mb-2">Primary Type</p>
                      <h2 className="text-3xl sm:text-4xl font-extralight gradient-text tracking-wider mb-2">
                        {profile.name}
                      </h2>
                      <p className="text-text-gray text-lg font-light italic">
                        &quot;{profile.tagline}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Clinical Label & Functioning */}
                  <div className="flex flex-wrap gap-3 mt-6 justify-center sm:justify-start">
                    <span className="px-4 py-1.5 bg-accent-gold/10 border border-accent-gold/20 rounded-full text-accent-gold text-sm">
                      {quiz.result.diagnosis.clinicalLabel}
                    </span>
                    <span className={`px-4 py-1.5 rounded-full text-sm border ${
                      quiz.result.diagnosis.functioningLevel === "high"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : quiz.result.diagnosis.functioningLevel === "moderate"
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}>
                      {quiz.result.diagnosis.functioningLevel.charAt(0).toUpperCase() + quiz.result.diagnosis.functioningLevel.slice(1)} Adaptive Function
                    </span>
                  </div>
                </div>
              </m.div>

              {/* Radar Chart + Description Grid */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Radar Chart */}
                <m.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="p-6 bg-deep-black/50 border border-accent-gold/10 rounded-2xl h-full flex items-center justify-center">
                    <RadarChart scores={quiz.result.scores} showValues={true} />
                  </div>
                </m.div>

                {/* Description + Relationship Pattern */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="p-6 bg-deep-black/50 border border-accent-gold/10 rounded-2xl">
                    <h3 className="text-accent-gold text-sm uppercase tracking-wider mb-3">About Your Type</h3>
                    <p className="text-text-gray leading-relaxed font-light">
                      {profile.description}
                    </p>
                  </div>

                  <div className="p-6 bg-deep-black/50 border border-accent-gold/10 rounded-2xl">
                    <h3 className="text-accent-gold text-sm uppercase tracking-wider mb-3">Relationship Pattern</h3>
                    <p className="text-text-gray leading-relaxed font-light">
                      {profile.relationshipPattern}
                    </p>
                  </div>
                </m.div>
              </div>

              {/* Traits + Strengths + Blind Spots */}
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                {/* Defining Traits */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="p-6 bg-deep-black/50 border border-accent-gold/10 rounded-2xl"
                >
                  <h3 className="text-accent-gold text-sm uppercase tracking-wider mb-4">Defining Traits</h3>
                  <ul className="space-y-3">
                    {profile.traits.map((trait: string) => (
                      <li key={trait} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-accent-gold rounded-full mt-2 flex-shrink-0" />
                        <span className="text-text-gray text-sm font-light">{trait}</span>
                      </li>
                    ))}
                  </ul>
                </m.div>

                {/* Strengths */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 bg-deep-black/50 border border-emerald-500/10 rounded-2xl"
                >
                  <h3 className="text-emerald-400 text-sm uppercase tracking-wider mb-4">Strengths</h3>
                  <ul className="space-y-3">
                    {profile.strengths.map((s: string) => (
                      <li key={s} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-text-gray text-sm font-light">{s}</span>
                      </li>
                    ))}
                  </ul>
                </m.div>

                {/* Blind Spots */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="p-6 bg-deep-black/50 border border-red-500/10 rounded-2xl"
                >
                  <h3 className="text-red-400 text-sm uppercase tracking-wider mb-4">Blind Spots</h3>
                  <ul className="space-y-3">
                    {profile.blindSpots.map((b: string) => (
                      <li key={b} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-text-gray text-sm font-light">{b}</span>
                      </li>
                    ))}
                  </ul>
                </m.div>
              </div>

              {/* Secondary Type */}
              {secondaryProfile && (
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8"
                >
                  <div className="p-6 bg-deep-black/30 border border-accent-gold/10 rounded-2xl">
                    <div className="flex items-center gap-4 mb-3">
                      {secondaryType && TYPE_ICONS[secondaryType] && (
                        <div className="w-10 h-10 rounded-full bg-accent-gold/5 border border-accent-gold/10 flex items-center justify-center">
                          {(() => {
                            const SecIcon = TYPE_ICONS[secondaryType];
                            return <SecIcon size={18} className="text-accent-gold/70" />;
                          })()}
                        </div>
                      )}
                      <div>
                        <p className="text-text-gray text-xs uppercase tracking-wider">Secondary Type</p>
                        <p className="text-text-light text-lg font-light">{secondaryProfile.name}</p>
                      </div>
                    </div>
                    <p className="text-text-gray text-sm font-light leading-relaxed">
                      {secondaryProfile.description}
                    </p>
                  </div>
                </m.div>
              )}

              {/* Retake CTA */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="text-center mb-12"
              >
                <Link
                  href="/quiz/take"
                  className="text-text-gray text-sm hover:text-accent-gold transition-colors"
                >
                  Retake Assessment →
                </Link>
              </m.div>
            </>
          ) : profile && !isUnlocked ? (
            /* Locked State — quiz taken but not unlocked */
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <div className="p-10 bg-gradient-to-br from-deep-navy/80 to-deep-burgundy/80 backdrop-blur-xl border border-accent-sapphire/20 rounded-2xl text-center">
                {TypeIcon && (
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
                    <TypeIcon size={36} className="text-accent-gold" />
                  </div>
                )}
                <p className="text-accent-gold text-xs uppercase tracking-[0.3em] mb-2">Your Primary Type</p>
                <h2 className="text-3xl font-extralight text-text-light tracking-wider mb-2">
                  {profile.name}
                </h2>
                <p className="text-text-gray font-light italic mb-8">
                  &quot;{profile.tagline}&quot;
                </p>

                <div className="relative inline-block mb-8 w-full max-w-md">
                  <div className="blur-lg opacity-20 pointer-events-none">
                    <div className="h-48 bg-accent-gold/5 rounded-xl" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Shield size={32} className="text-accent-gold mx-auto mb-3" />
                      <p className="text-text-light font-light mb-1">Full Profile Locked</p>
                      <p className="text-text-gray text-sm">Unlock by purchasing the book</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-deep-black font-medium tracking-wider uppercase transition-all hover:shadow-lg"
                    style={{ background: "linear-gradient(135deg, #720921, #6366f1)", boxShadow: "0 8px 20px rgba(114,9,33,0.3), 0 8px 20px rgba(99,102,241,0.3)" }}
                  >
                    <BookOpen size={18} />
                    Get the Book — $24.99
                  </Link>
                  <Link
                    href="/quiz/results"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-accent-gold/30 text-accent-gold font-medium tracking-wider uppercase rounded-full transition-all hover:bg-accent-gold/10"
                  >
                    Unlock Results Only — $9.99
                  </Link>
                </div>
              </div>
            </m.div>
          ) : (
            /* No quiz taken */
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <div className="p-12 bg-gradient-to-br from-deep-navy/80 to-deep-burgundy/80 backdrop-blur-xl border border-accent-sapphire/20 rounded-2xl text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
                  <Crosshair size={36} className="text-accent-gold" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extralight text-text-light tracking-wider mb-4">
                  Discover Your Dark Mirror Type
                </h2>
                <p className="text-text-gray font-light mb-8 max-w-lg mx-auto">
                  Take the 20-question assessment to reveal your dominant personality patterns.
                  Your results will appear here as your permanent profile.
                </p>
                <Link
                  href="/quiz/take"
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-deep-black font-medium text-lg tracking-wider uppercase transition-all hover:shadow-lg"
                  style={{ background: "linear-gradient(135deg, #720921, #6366f1)", boxShadow: "0 8px 20px rgba(114,9,33,0.3), 0 8px 20px rgba(99,102,241,0.3)" }}
                >
                  Take The Assessment
                  <ArrowRight size={20} />
                </Link>
              </div>
            </m.div>
          )}

          {/* Quick Links */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-4 p-5 bg-deep-black/50 border border-accent-gold/10 rounded-xl hover:border-accent-gold/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center group-hover:bg-accent-gold/20 transition-colors">
                  <BookOpen size={18} className="text-accent-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-text-light font-light">Dashboard</p>
                  <p className="text-text-gray text-xs">Purchases, courses & sessions</p>
                </div>
                <ChevronRight size={16} className="text-text-gray group-hover:text-accent-gold transition-colors" />
              </Link>

              <Link
                href="/inner-circle"
                className="flex items-center gap-4 p-5 bg-deep-black/50 border border-accent-gold/10 rounded-xl hover:border-accent-gold/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center group-hover:bg-accent-gold/20 transition-colors">
                  <Crown size={18} className="text-accent-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-text-light font-light">The Consilium</p>
                  <p className="text-text-gray text-xs">Community, courses & voice notes</p>
                </div>
                <ChevronRight size={16} className="text-text-gray group-hover:text-accent-gold transition-colors" />
              </Link>

              <Link
                href="/coaching"
                className="flex items-center gap-4 p-5 bg-deep-black/50 border border-accent-gold/10 rounded-xl hover:border-accent-gold/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center group-hover:bg-accent-gold/20 transition-colors">
                  <Settings size={18} className="text-accent-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-text-light font-light">Private Coaching</p>
                  <p className="text-text-gray text-xs">1-on-1 sessions with Kanika</p>
                </div>
                <ChevronRight size={16} className="text-text-gray group-hover:text-accent-gold transition-colors" />
              </Link>

              <Link
                href="/book"
                className="flex items-center gap-4 p-5 bg-deep-black/50 border border-accent-gold/10 rounded-xl hover:border-accent-gold/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center group-hover:bg-accent-gold/20 transition-colors">
                  <BookOpen size={18} className="text-accent-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-text-light font-light">The Book</p>
                  <p className="text-text-gray text-xs">Sociopathic Dating Bible</p>
                </div>
                <ChevronRight size={16} className="text-text-gray group-hover:text-accent-gold transition-colors" />
              </Link>

              {/* Privacy & data — GDPR export.
                  Hits /api/user/export which builds a JSON of everything
                  Kanika Rose holds about the viewer, then streams it as
                  a file download. */}
              <a
                href="/api/user/export"
                download
                className="flex items-center gap-4 p-5 bg-deep-black/50 border border-accent-gold/10 rounded-xl hover:border-accent-gold/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center group-hover:bg-accent-gold/20 transition-colors">
                  <Download size={18} className="text-accent-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-text-light font-light">Download my data</p>
                  <p className="text-text-gray text-xs">GDPR data export — everything we hold about you as JSON</p>
                </div>
                <ChevronRight size={16} className="text-text-gray group-hover:text-accent-gold transition-colors" />
              </a>
            </div>
          </m.div>
        </div>
      </main>
    </>
  );
}
