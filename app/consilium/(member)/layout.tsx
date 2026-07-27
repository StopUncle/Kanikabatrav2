import Link from "next/link";
import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import BackgroundEffects from "@/components/BackgroundEffects";
import SessionWatermark from "@/components/consilium/SessionWatermark";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";
import AnalyticsIdentify from "@/components/analytics/AnalyticsIdentify";
import { prisma } from "@/lib/prisma";
import { computeFingerprint } from "@/lib/community/fingerprint";

/**
 * The annex.
 *
 * After the cutover the member's home is /app. This layout no longer serves
 * a member's day: it holds the surfaces that have no /app equivalent yet
 * (the simulator catalog and runner, Adventures, The Lab, Receipts, the
 * instinct hex and history, Previews) plus anything a stale link still
 * reaches.
 *
 * So the sidebar and the pill nav are gone. Two full navigations, each
 * claiming to be the way around, is how an app starts feeling like two
 * half-built apps. What is left is a single way back, and the queries that
 * fed the old nav (online count, tier, streak, recent activity, simulator
 * totals) are gone with it: six round-trips that every one of these pages
 * was paying for a nav it no longer renders.
 */
export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await requireServerAuth("/app");
  const { isMember, redirectUrl } = await checkMembership(userId);

  if (!isMember) {
    redirect(redirectUrl || "/consilium");
  }

  const me = await prisma.user.findUnique({
    where: { id: userId },
    select: { initiationAt: true, role: true },
  });

  // The Initiation is mandatory: members who haven't completed it get
  // routed into the flow before any member surface renders. The
  // initiation route itself lives OUTSIDE this route group, so there is
  // no loop. Admins are exempt (Kanika shouldn't be walled out of her
  // own product by a Day-0 flow).
  if (me && !me.initiationAt && me.role !== "ADMIN") {
    redirect("/consilium/initiation");
  }

  const fingerprint = computeFingerprint(userId);

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />
      <div className="relative z-10">
        <div className="sticky top-0 z-40 border-b border-accent-gold/15 bg-deep-black/85 backdrop-blur-sm">
          <Link
            href="/app"
            className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-text-gray transition-colors hover:text-accent-gold"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to Consilium
          </Link>
        </div>
        <main className="min-w-0">{children}</main>
      </div>
      <SessionWatermark fingerprint={fingerprint} />
      {/* The install and notification prompts moved to the app shell with
          the members. This layout keeps only the service worker (so an
          annex page opened from a push still has one) and identify. */}
      <AnalyticsIdentify userId={userId} />
      <ServiceWorkerRegister />
    </div>
  );
}
