import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import InstinctsHex from "@/components/tells/InstinctsHex";
import { prisma } from "@/lib/prisma";
import { AXIS_KEYS, AXIS_LABELS } from "@/lib/tells/types";

export const dynamic = "force-dynamic";

interface PageParams {
  params: Promise<{ handle: string }>;
}

function tier(rating: number): { label: string; color: string } {
  if (rating < 1100) return { label: "Untrained", color: "text-text-gray" };
  if (rating < 1300) return { label: "Aware", color: "text-text-light" };
  if (rating < 1500) return { label: "Practiced", color: "text-accent-gold" };
  if (rating < 1700) return { label: "Sharp", color: "text-accent-gold" };
  if (rating < 1900) return { label: "Expert", color: "text-emerald-400" };
  return { label: "Native", color: "text-emerald-400" };
}

async function loadProfile(handle: string) {
  const user = await prisma.user.findUnique({
    where: { handle: handle.toLowerCase() },
    select: {
      id: true,
      handle: true,
      displayName: true,
      profilePublic: true,
      instinctScore: true,
      tellStreak: { select: { currentDays: true, longestDays: true } },
    },
  });
  return user;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { handle } = await params;
  const user = await loadProfile(handle);
  if (!user || !user.profilePublic) {
    return { title: "Profile not found" };
  }
  const name = user.displayName ?? `@${user.handle}`;
  return {
    title: `${name} on Train Your Instincts | Kanika Batra`,
    description: `${name}'s instinct hex: six-axis rating across reading people, spotting manipulation, and saying no.`,
    alternates: {
      canonical: `https://kanikarose.com/u/${user.handle}`,
    },
    openGraph: {
      title: `${name} · Train Your Instincts`,
      description: `Six-axis instinct rating across reading people, spotting manipulation, and saying no.`,
      url: `https://kanikarose.com/u/${user.handle}`,
      type: "profile",
      images: [
        {
          url: `/api/u/${user.handle}/og`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} · Train Your Instincts`,
      description: `Six-axis instinct rating.`,
      images: [`/api/u/${user.handle}/og`],
    },
  };
}

export default async function UserProfilePage({ params }: PageParams) {
  const { handle } = await params;
  const user = await loadProfile(handle);

  // Hard 404 for missing or private profiles. We do not leak existence
  // of a private profile by returning a different status code.
  if (!user || !user.profilePublic) notFound();

  const score = user.instinctScore ?? {
    read: 1000,
    spot: 1000,
    reply: 1000,
    refuse: 1000,
    calibrate: 1000,
    hold: 1000,
    totalAnswered: 0,
  };

  const ratings: Record<string, number> = {
    READ: score.read,
    SPOT: score.spot,
    REPLY: score.reply,
    REFUSE: score.refuse,
    CALIBRATE: score.calibrate,
    HOLD: score.hold,
  };
  const composite = Math.round(
    AXIS_KEYS.reduce((sum, a) => sum + ratings[a], 0) / AXIS_KEYS.length,
  );

  const displayName = user.displayName ?? `@${user.handle}`;

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="relative z-10 min-h-screen pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <header className="text-center mb-12">
            <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-3">
              Train Your Instincts &middot; Public profile
            </p>
            <h1 className="text-3xl sm:text-4xl font-extralight tracking-wider text-text-light mb-2">
              {displayName}
            </h1>
            <p className="text-text-gray text-sm">@{user.handle}</p>
          </header>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
            <div className="flex justify-center">
              <InstinctsHex score={score} size={400} showLabels />
            </div>

            <div className="space-y-5">
              <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-5">
                <p className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70 mb-3">
                  Composite
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl text-text-light font-extralight">
                    {composite}
                  </span>
                  <span
                    className={`text-sm uppercase tracking-[0.3em] ${tier(composite).color}`}
                  >
                    {tier(composite).label}
                  </span>
                </div>
                <p className="text-text-gray text-xs mt-3">
                  {user.tellStreak?.currentDays ?? 0} day streak &middot;{" "}
                  {score.totalAnswered} answers logged
                </p>
              </div>

              {AXIS_KEYS.map((axis) => {
                const v = ratings[axis];
                const t = tier(v);
                return (
                  <div
                    key={axis}
                    className="rounded-lg border border-gray-800 bg-deep-black/40 p-3 flex items-center justify-between"
                  >
                    <p className="text-text-light text-sm uppercase tracking-[0.3em]">
                      {AXIS_LABELS[axis]}
                    </p>
                    <p className="flex items-baseline gap-3">
                      <span className="text-accent-gold text-base font-extralight">
                        {v}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-[0.3em] ${t.color}`}
                      >
                        {t.label}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-14 space-y-4">
            <p className="text-text-gray text-sm font-light">
              Train your own. Daily Tell, no signup.
            </p>
            <Link
              href="/tells"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs hover:bg-accent-gold/90 transition-all"
            >
              Today&rsquo;s Tell
              <ArrowRight size={14} />
            </Link>
          </div>

          <p className="text-text-gray/50 text-xs text-center mt-12">
            Pattern recognition training. Not medical, legal, or diagnostic
            advice.
          </p>
        </div>
      </main>
    </>
  );
}
