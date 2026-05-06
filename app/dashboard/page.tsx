import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Snowflake,
  Crown,
  EyeOff,
  Skull,
  Activity,
  Heart,
  Users,
  ArrowRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { prisma } from "@/lib/prisma";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSessionsCard from "@/components/dashboard/DashboardSessionsCard";
import InnerCircleDashboardCard from "@/components/dashboard/InnerCircleDashboardCard";
import ProgressBar from "@/components/course/ProgressBar";
import {
  ADDITIONAL_QUIZZES,
  QUIZ_REGISTRY,
  type QuizRegistryEntry,
} from "@/lib/quiz-registry";

export const metadata = {
  title: "Dashboard - Kanika Batra",
  description:
    "Your dark psychology command center — assessments, membership, books, and coaching.",
  robots: { index: false, follow: false },
};

// Consilium imperial-gold gradient. Pulled out of the inline style on
// /consilium so it can repeat across the dashboard's hero + primary
// assessment block. Pairs with `font-extralight tracking-wider uppercase`
// for the same typographic signature as the Consilium feed.
const IMPERIAL_GOLD = {
  background:
    "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

const ICONS: Record<QuizRegistryEntry["iconKey"], LucideIcon> = {
  snowflake: Snowflake,
  crown: Crown,
  "eye-off": EyeOff,
  skull: Skull,
  activity: Activity,
  heart: Heart,
  family: Users,
  mirror: Sparkles,
};

const TONES: Record<
  QuizRegistryEntry["tone"],
  { bg: string; ring: string; icon: string; chip: string }
> = {
  blue: {
    bg: "bg-blue-400/10",
    ring: "ring-blue-400/30",
    icon: "text-blue-300",
    chip: "text-blue-300/80 border-blue-300/30",
  },
  amber: {
    bg: "bg-amber-400/10",
    ring: "ring-amber-400/30",
    icon: "text-amber-300",
    chip: "text-amber-300/80 border-amber-300/30",
  },
  rose: {
    bg: "bg-rose-400/10",
    ring: "ring-rose-400/30",
    icon: "text-rose-300",
    chip: "text-rose-300/80 border-rose-300/30",
  },
  indigo: {
    bg: "bg-indigo-400/10",
    ring: "ring-indigo-400/30",
    icon: "text-indigo-300",
    chip: "text-indigo-300/80 border-indigo-300/30",
  },
  emerald: {
    bg: "bg-emerald-400/10",
    ring: "ring-emerald-400/30",
    icon: "text-emerald-300",
    chip: "text-emerald-300/80 border-emerald-300/30",
  },
  purple: {
    bg: "bg-purple-400/10",
    ring: "ring-purple-400/30",
    icon: "text-purple-300",
    chip: "text-purple-300/80 border-purple-300/30",
  },
  gold: {
    bg: "bg-warm-gold/10",
    ring: "ring-warm-gold/40",
    icon: "text-warm-gold",
    chip: "text-warm-gold/80 border-warm-gold/40",
  },
};

export default async function DashboardPage() {
  const userId = await resolveActiveUserId();
  if (!userId) redirect("/login");

  // Server-side fetch: user, membership, last paid quiz result, purchases,
  // sessions, course subscriptions, simulator-progress count for the
  // first-scenario intercept. Single Prisma roundtrip, page renders
  // instantly instead of waiting on a client-side spinner.
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      _count: { select: { simulatorProgress: true } },
      communityMembership: {
        select: {
          id: true,
          status: true,
          billingCycle: true,
          appliedAt: true,
          approvedAt: true,
          activatedAt: true,
          expiresAt: true,
          suspendedAt: true,
          suspendReason: true,
          cancelledAt: true,
          paypalSubscriptionId: true,
        },
      },
      quizResults: {
        where: { paid: true },
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { id: true, primaryType: true },
      },
      purchases: {
        where: { status: "COMPLETED" },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          type: true,
          productVariant: true,
          downloadToken: true,
          createdAt: true,
        },
      },
      sessions: {
        orderBy: { scheduledAt: "desc" },
        select: {
          id: true,
          packageName: true,
          sessionCount: true,
          scheduledAt: true,
          duration: true,
          status: true,
          meetingUrl: true,
          notes: true,
          userNotes: true,
          feedback: { select: { rating: true, feedback: true } },
        },
      },
    },
  });
  if (!user) redirect("/login");

  // First-scenario intercept. Same logic as the previous /dashboard:
  // ACTIVE members with zero simulator runs get bumped straight into
  // mission-1-1 the first time they hit the dashboard. Once they begin,
  // a SimulatorProgress row is created and the redirect stops firing.
  if (
    user.communityMembership?.status === "ACTIVE" &&
    user._count.simulatorProgress === 0
  ) {
    redirect("/consilium/simulator/mission-1-1?welcome=1");
  }

  // Fetch course subscriptions in a separate roundtrip — the include
  // graph on Subscription (course → modules → lessons + enrollment.progress)
  // is heavy enough that it doesn't belong in the user fetch above.
  const subscriptions = await prisma.subscription.findMany({
    where: { userId },
    include: {
      course: { select: { id: true, title: true, slug: true, tier: true } },
      enrollment: {
        include: {
          progress: { select: { isCompleted: true } },
          course: {
            include: {
              modules: { include: { lessons: { select: { id: true } } } },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedSubscriptions = subscriptions.map((sub) => {
    const totalLessons =
      sub.enrollment?.course.modules.reduce(
        (acc, m) => acc + m.lessons.length,
        0,
      ) || 0;
    const completedLessons =
      sub.enrollment?.progress.filter((p) => p.isCompleted).length || 0;
    const progress =
      totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    return {
      id: sub.id,
      status: sub.status,
      title: sub.course.title,
      slug: sub.course.slug,
      tier: sub.course.tier,
      currentPeriodEnd: sub.currentPeriodEnd?.toISOString() ?? null,
      cancelledAt: sub.cancelledAt?.toISOString() ?? null,
      progress,
      completed: completedLessons,
      total: totalLessons,
    };
  });

  const daysActive = Math.max(
    1,
    Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)),
  );
  const memberStatus = user.communityMembership?.status ?? null;
  const expiresAt = user.communityMembership?.expiresAt ?? null;
  const darkMirror = QUIZ_REGISTRY.find((q) => q.slug === "quiz")!;
  const lastResult = user.quizResults[0] ?? null;
  const displayName = user.name || user.email.split("@")[0];

  // Sessions need to be JSON-serialisable for the client island —
  // Date instances become ISO strings here so SessionsSection's existing
  // shape continues to work unchanged.
  const sessionsForClient = user.sessions.map((s) => ({
    ...s,
    duration: s.duration ?? 0,
    scheduledAt: s.scheduledAt?.toISOString() ?? null,
    feedback: s.feedback
      ? {
          rating: s.feedback.rating,
          feedback: s.feedback.feedback ?? undefined,
        }
      : undefined,
  }));

  // Membership card surfaces only when there's something the user can
  // actually act on (manage sub, reactivate, etc.). For PENDING /
  // APPROVED states the chip + state messaging on the rest of the page
  // already covers it.
  const showMembershipCard =
    memberStatus === "ACTIVE" ||
    memberStatus === "SUSPENDED" ||
    memberStatus === "CANCELLED" ||
    memberStatus === "EXPIRED";

  const membershipForCard = user.communityMembership
    ? {
        ...user.communityMembership,
        appliedAt: user.communityMembership.appliedAt?.toISOString() ?? null,
        approvedAt: user.communityMembership.approvedAt?.toISOString() ?? null,
        activatedAt:
          user.communityMembership.activatedAt?.toISOString() ?? null,
        expiresAt: user.communityMembership.expiresAt?.toISOString() ?? null,
        suspendedAt:
          user.communityMembership.suspendedAt?.toISOString() ?? null,
        cancelledAt:
          user.communityMembership.cancelledAt?.toISOString() ?? null,
      }
    : null;

  return (
    <>
      <DashboardHeader userEmail={user.email} />

      <main className="min-h-screen bg-deep-black pt-28 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-6xl">
          {/* Greeting + member chip — imperial-gold hero,
              matches the Consilium landing H1 treatment exactly. */}
          <section className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-warm-gold/90 uppercase tracking-[0.3em] text-xs sm:text-sm mb-4">
                Today &middot; Day {daysActive}
              </p>
              <h1
                className="text-4xl sm:text-6xl font-extralight tracking-wider uppercase mb-3"
                style={IMPERIAL_GOLD}
              >
                {displayName}
              </h1>
              <div className="w-12 h-px bg-warm-gold/40" />
            </div>
            <MemberChip status={memberStatus} expiresAt={expiresAt} />
          </section>

          {/* Vitals strip */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <Vital
              label="Assessments"
              value={QUIZ_REGISTRY.length.toString()}
              sub="available"
            />
            <Vital
              label="Primary mirror"
              value={lastResult ? capitalise(lastResult.primaryType) : "—"}
              sub={lastResult ? "your result" : "not taken"}
              accent={!!lastResult}
            />
            <Vital
              label="Membership"
              value={
                memberStatus === "ACTIVE"
                  ? "Active"
                  : memberStatus
                    ? capitalise(memberStatus.toLowerCase())
                    : "Public"
              }
              sub={
                expiresAt && memberStatus === "ACTIVE"
                  ? `until ${expiresAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                  : "—"
              }
              accent={memberStatus === "ACTIVE"}
            />
            <Vital
              label="Days inside"
              value={daysActive.toString()}
              sub="since signup"
            />
          </section>

          {/* PRIMARY ASSESSMENT — Dark Mirror hero */}
          <section className="mb-16">
            <SectionHead
              label="Primary assessment"
              caption="Start here"
            />
            <div className="rounded-3xl border border-warm-gold/40 bg-warm-gold/[0.04] p-8 sm:p-10">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-2 flex lg:justify-center">
                  <div
                    className={`w-20 h-20 rounded-2xl ${TONES.gold.bg} ring-1 ${TONES.gold.ring} flex items-center justify-center`}
                  >
                    <Sparkles
                      size={36}
                      className="text-warm-gold"
                      strokeWidth={1.25}
                    />
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <h2
                    className="text-2xl sm:text-4xl font-extralight tracking-wider uppercase mb-3"
                    style={IMPERIAL_GOLD}
                  >
                    {darkMirror.title}
                  </h2>
                  <div className="w-12 h-px bg-warm-gold/40 mb-4" />
                  <p className="text-warm-gold/90 text-xs uppercase tracking-[0.3em] mb-4">
                    {darkMirror.caption}
                  </p>
                  <p className="text-text-gray text-base leading-relaxed max-w-xl">
                    {darkMirror.blurb}
                  </p>
                  <div className="flex items-center gap-4 mt-5 text-xs text-text-gray flex-wrap">
                    <span className="font-mono text-warm-gold/80 uppercase tracking-wider">
                      {darkMirror.instrument}
                    </span>
                    <span className="text-warm-gold/30">&middot;</span>
                    <span className="tabular-nums">
                      {darkMirror.itemCount} items
                    </span>
                    <span className="text-warm-gold/30">&middot;</span>
                    <span className="tabular-nums">
                      ~{darkMirror.minutes} min
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-3 flex flex-col gap-3">
                  {lastResult ? (
                    <>
                      <Link
                        href={`/quiz/results/${lastResult.id}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-warm-gold text-deep-black text-xs font-medium uppercase tracking-[0.25em] hover:bg-warm-gold/90 transition-all"
                      >
                        Read result
                        <ArrowRight size={14} />
                      </Link>
                      <Link
                        href={darkMirror.href}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-warm-gold/40 text-warm-gold text-xs uppercase tracking-[0.25em] hover:bg-warm-gold/10 transition-all"
                      >
                        Retake
                      </Link>
                    </>
                  ) : (
                    <Link
                      href={darkMirror.href}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-warm-gold text-deep-black text-xs font-medium uppercase tracking-[0.25em] hover:bg-warm-gold/90 transition-all"
                    >
                      Begin assessment
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* CALIBRATED INSTRUMENTS — generous 2-col grid */}
          <section className="mb-16">
            <SectionHead
              label="Calibrated instruments"
              caption="Built on published research"
            />
            <div className="grid sm:grid-cols-2 gap-5">
              {ADDITIONAL_QUIZZES.map((quiz) => {
                const Icon = ICONS[quiz.iconKey];
                const tone = TONES[quiz.tone];
                return (
                  <Link
                    key={quiz.slug}
                    href={quiz.href}
                    className="group flex flex-col rounded-2xl border border-warm-gold/15 bg-deep-black/50 p-7 hover:border-warm-gold/45 hover:bg-warm-gold/[0.03] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className={`w-14 h-14 rounded-xl ${tone.bg} ring-1 ${tone.ring} flex items-center justify-center`}
                      >
                        <Icon
                          size={26}
                          className={tone.icon}
                          strokeWidth={1.5}
                        />
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border ${tone.chip}`}
                      >
                        {quiz.instrument.split(" ")[0]}
                      </span>
                    </div>

                    <h3 className="text-text-light text-lg sm:text-xl font-extralight tracking-wider uppercase leading-snug mb-2 group-hover:text-warm-gold transition-colors">
                      {quiz.title}
                    </h3>
                    <div className="w-10 h-px bg-warm-gold/30 mb-4 group-hover:bg-warm-gold/60 transition-colors" />
                    <p className="text-warm-gold/90 text-[11px] uppercase tracking-[0.3em] mb-4">
                      {quiz.caption}
                    </p>
                    <p className="text-text-gray text-sm leading-relaxed mb-6 flex-1">
                      {quiz.blurb}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-warm-gold/15">
                      <p className="text-text-gray/70 text-[11px] tabular-nums uppercase tracking-wider">
                        {quiz.itemCount} items &middot; ~{quiz.minutes} min
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-warm-gold text-[11px] uppercase tracking-[0.25em] group-hover:translate-x-1 transition-transform">
                        Begin
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* DEPARTMENTS row */}
          <section className="mb-16">
            <SectionHead
              label="Also yours"
              caption="Beyond the assessments"
            />
            <div className="grid md:grid-cols-3 gap-4">
              <DeptTile
                title="The Consilium"
                copy={
                  memberStatus === "ACTIVE"
                    ? "Your private feed, voice notes, classroom and chat. Active."
                    : "Voice notes, courses, daily threads. Apply to enter the council."
                }
                cta={memberStatus === "ACTIVE" ? "Enter feed" : "Apply"}
                href={
                  memberStatus === "ACTIVE" ? "/consilium/feed" : "/consilium"
                }
                accent={memberStatus === "ACTIVE"}
              />
              <DeptTile
                title="The Book"
                copy="The Sociopathic Dating Bible. Seventy thousand words. The reference for the partner-detection quiz."
                cta="Open library"
                href="/book"
              />
              <DeptTile
                title="Private Counsel"
                copy="One on one with Kanika. Single sessions, intensives, retainers. Booked manually."
                cta="Enquire"
                href="/coaching"
              />
            </div>
          </section>

          {/* MEMBERSHIP CARD — only if there's a stateful action available */}
          {showMembershipCard && membershipForCard && (
            <section className="mb-16">
              <SectionHead
                label="Council membership"
                caption="Manage your seat"
              />
              <div className="rounded-2xl border border-warm-gold/20 bg-deep-black/50 p-6 sm:p-8">
                <InnerCircleDashboardCard membership={membershipForCard} />
              </div>
            </section>
          )}

          {/* COURSES — only if subscribed */}
          {formattedSubscriptions.length > 0 && (
            <section className="mb-16">
              <SectionHead
                label="Your courses"
                caption="Continue where you left off"
              />
              <div className="space-y-4">
                {formattedSubscriptions.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/courses/${sub.slug}`}
                    className="group block rounded-2xl border border-warm-gold/15 bg-deep-black/50 p-6 hover:border-warm-gold/40 hover:bg-warm-gold/[0.03] transition-all"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-text-light text-lg font-extralight tracking-wider uppercase mb-2 group-hover:text-warm-gold transition-colors">
                          {sub.title}
                        </h3>
                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em]">
                          <span
                            className={`px-2.5 py-1 rounded-full border ${
                              sub.status === "ACTIVE"
                                ? "border-warm-gold/40 text-warm-gold bg-warm-gold/[0.05]"
                                : sub.status === "CANCELLED"
                                  ? "border-amber-400/40 text-amber-300 bg-amber-400/5"
                                  : "border-text-gray/30 text-text-gray bg-deep-black/40"
                            }`}
                          >
                            {sub.status}
                          </span>
                          {sub.currentPeriodEnd && sub.status === "ACTIVE" && (
                            <span className="text-text-gray normal-case tracking-normal">
                              renews{" "}
                              {new Date(sub.currentPeriodEnd).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" },
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-warm-gold text-[11px] uppercase tracking-[0.25em] shrink-0 group-hover:translate-x-1 transition-transform">
                        Continue
                        <ArrowRight size={12} />
                      </span>
                    </div>
                    <ProgressBar
                      progress={sub.progress}
                      showLabel={true}
                      size="sm"
                    />
                    <p className="text-text-gray/70 text-[11px] uppercase tracking-wider mt-3 tabular-nums">
                      {sub.completed} of {sub.total} lessons
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* PURCHASES — only if any */}
          {user.purchases.length > 0 && (
            <section className="mb-16">
              <SectionHead
                label="Your library"
                caption="Books and downloads"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                {user.purchases.map((p) => {
                  const title =
                    p.type === "BOOK"
                      ? "The Sociopathic Dating Bible"
                      : p.productVariant || "Purchase";
                  const downloadHref = p.downloadToken
                    ? `/api/download?token=${p.downloadToken}`
                    : null;
                  return (
                    <div
                      key={p.id}
                      className="rounded-2xl border border-warm-gold/15 bg-deep-black/50 p-6"
                    >
                      <p className="text-warm-gold/90 text-[10px] uppercase tracking-[0.3em] mb-2">
                        {p.type}
                      </p>
                      <h3 className="text-text-light text-lg font-extralight tracking-wider uppercase mb-2">
                        {title}
                      </h3>
                      <div className="w-10 h-px bg-warm-gold/30 mb-4" />
                      <p className="text-text-gray text-[11px] uppercase tracking-wider mb-4 tabular-nums">
                        Purchased{" "}
                        {p.createdAt.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      {downloadHref ? (
                        <a
                          href={downloadHref}
                          className="inline-flex items-center gap-1.5 text-warm-gold text-[11px] uppercase tracking-[0.25em] hover:translate-x-1 transition-transform"
                        >
                          Download
                          <ArrowRight size={12} />
                        </a>
                      ) : (
                        <p className="text-text-gray/60 text-[11px] uppercase tracking-wider">
                          Delivered by email
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* COACHING SESSIONS — only if any */}
          {sessionsForClient.length > 0 && (
            <section>
              <SectionHead
                label="Your sessions"
                caption="Coaching with Kanika"
              />
              <div className="rounded-2xl border border-warm-gold/15 bg-deep-black/50 p-6 sm:p-8">
                <DashboardSessionsCard initialSessions={sessionsForClient} />
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

function SectionHead({ label, caption }: { label: string; caption: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl sm:text-2xl font-extralight tracking-wider uppercase gradient-text-gold mb-2">
        {label}
      </h2>
      <div className="w-12 h-px bg-warm-gold/40 mb-3" />
      <p className="text-text-gray/80 text-sm">{caption}</p>
    </div>
  );
}

function Vital({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 transition-colors ${
        accent
          ? "border-warm-gold/40 bg-warm-gold/[0.04]"
          : "border-warm-gold/15 bg-deep-black/50"
      }`}
    >
      <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.3em] mb-3">
        {label}
      </p>
      <p
        className={`text-2xl sm:text-3xl font-extralight tabular-nums leading-none mb-1.5 ${
          accent ? "text-warm-gold" : "text-text-light"
        }`}
      >
        {value}
      </p>
      <p className="text-text-gray/60 text-[11px] uppercase tracking-wider">
        {sub}
      </p>
    </div>
  );
}

function MemberChip({
  status,
  expiresAt,
}: {
  status: string | null;
  expiresAt: Date | null;
}) {
  if (status === "ACTIVE") {
    return (
      <Link
        href="/consilium/feed"
        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-warm-gold/40 bg-warm-gold/[0.06] text-warm-gold text-[11px] uppercase tracking-[0.3em] hover:bg-warm-gold/10 transition-colors"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-warm-gold animate-pulse" />
        Council &middot; Active
        {expiresAt && (
          <span className="text-warm-gold/70 normal-case tracking-normal">
            until{" "}
            {expiresAt.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
      </Link>
    );
  }
  return (
    <Link
      href="/consilium"
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-warm-gold/30 bg-warm-gold/5 text-warm-gold text-[11px] uppercase tracking-[0.3em] hover:bg-warm-gold/10 transition-colors"
    >
      Council &middot; {status ? capitalise(status.toLowerCase()) : "Apply"}
      <ArrowRight size={12} />
    </Link>
  );
}

function DeptTile({
  title,
  copy,
  cta,
  href,
  accent = false,
}: {
  title: string;
  copy: string;
  cta: string;
  href: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group block rounded-2xl border p-6 transition-all ${
        accent
          ? "border-warm-gold/45 bg-warm-gold/[0.05] hover:bg-warm-gold/[0.09]"
          : "border-warm-gold/15 bg-deep-black/50 hover:border-warm-gold/40"
      }`}
    >
      <h3 className="text-text-light text-base sm:text-lg font-extralight tracking-wider uppercase mb-2 group-hover:text-warm-gold transition-colors">
        {title}
      </h3>
      <div className="w-10 h-px bg-warm-gold/30 mb-4 group-hover:bg-warm-gold/60 transition-colors" />
      <p className="text-text-gray text-sm leading-relaxed mb-5">{copy}</p>
      <span className="inline-flex items-center gap-1.5 text-warm-gold text-[11px] uppercase tracking-[0.25em] group-hover:translate-x-1 transition-transform">
        {cta}
        <ArrowRight size={12} />
      </span>
    </Link>
  );
}

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
