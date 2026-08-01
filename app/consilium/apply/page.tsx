import { redirect } from "next/navigation";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import BackgroundEffects from "@/components/BackgroundEffects";
import JoinPanel from "@/components/consilium/JoinPanel";
import { catalogueStats } from "@/lib/simulator/stats";
import SocialProofTicker from "@/components/consilium/SocialProofTicker";
import { XCircle } from "lucide-react";

export const metadata = {
  title: "Join. The Consilium | Kanika Batra",
  description:
    "Join The Consilium, instant access to the Dark Mirror Simulator, voice notes, courses, and community.",
};

/**
 * Join page. The application gate was removed (2026-04-19). This used
 * to be a multi-field form that PENDING'd the user for admin review.
 * Now it's a single-button checkout entry. Anyone authenticated and
 * eligible jumps straight to Stripe; anyone not authenticated bounces
 * to /register and comes back here.
 *
 * Three special states still need a render branch:
 *   - already ACTIVE → redirect to feed
 *   - CANCELLED + admin-rejected (legacy) → tasteful refusal card
 *   - everyone else → the JoinPanel button
 */
export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ credit?: string }>;
}) {
  const userId = await optionalServerAuth();
  const { credit } = await searchParams;
  const creditCode = typeof credit === "string" ? credit.trim() : "";

  if (!userId) {
    // Send them to register. After signup, /register's returnTo handler
    // brings them back here, where the auth check now passes and they
    // hit the join button. The credit rides along in returnTo so a quiz
    // buyer with an expired session does not silently lose it.
    const returnTo = creditCode
      ? `/consilium/apply?credit=${encodeURIComponent(creditCode)}`
      : "/consilium/apply";
    redirect(`/register?returnTo=${encodeURIComponent(returnTo)}`);
  }

  const membership = await prisma.communityMembership.findUnique({
    where: { userId },
    select: { status: true, applicationData: true },
  });

  if (membership?.status === "ACTIVE") {
    redirect("/consilium/feed");
  }

  // Only surface the credit once it is actually redeemable by THIS user.
  // The checkout route re-checks the same conditions, so a code that
  // fails here would silently buy at full price: promising a discount we
  // will not apply is worse than never mentioning it.
  let validCreditCode = "";
  if (creditCode) {
    const viewer = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });
    const owned = await prisma.quizResult.findFirst({
      where: {
        consiliumCreditCode: creditCode,
        consiliumCreditExpiresAt: { gt: new Date() },
        OR: [
          { userId },
          ...(viewer?.email
            ? [{ email: { equals: viewer.email, mode: "insensitive" as const } }]
            : []),
        ],
      },
      select: { id: true },
    });
    if (owned) validCreditCode = creditCode;
  }

  const data = membership?.applicationData as Record<string, unknown> | null;
  const wasRejected = !!(data && (data.rejectedAt || data.rejectionNote));
  if (membership?.status === "CANCELLED" && wasRejected) {
    return (
      <div className="min-h-screen bg-deep-black text-text-light">
        <BackgroundEffects />
        <div className="relative z-10 max-w-xl mx-auto px-4 pt-32 pb-16">
          <div className="bg-deep-black/50 backdrop-blur-sm border border-warm-gold/20 rounded-2xl p-8 text-center">
            <XCircle className="w-12 h-12 text-text-gray/60 mx-auto mb-5" />
            <h1 className="text-xl font-light text-text-light mb-3">
              Not Available
            </h1>
            <p className="text-text-gray font-light leading-relaxed">
              You aren&apos;t able to enrol at this time. If you believe
              this is in error, please contact{" "}
              <a
                href="mailto:Kanika@kanikarose.com"
                className="text-warm-gold hover:text-warm-gold/80 transition-colors"
              >
                Kanika@kanikarose.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-10">
          <span className="text-warm-gold text-xs tracking-[0.3em] uppercase font-medium">
            The Consilium
          </span>
          <h1 className="text-4xl font-extralight tracking-wider uppercase mt-3 mb-3">
            <span className="gradient-text-gold">Step Inside</span>
          </h1>
          <div className="w-16 h-px bg-warm-gold/30 mx-auto mt-4 mb-5" />
          <p className="text-text-gray font-light max-w-md mx-auto">
            One subscription. Instant access to the simulator, voice
            notes, the classroom, and the council.
          </p>
        </div>

        <SocialProofTicker className="mb-6" />

        <JoinPanel creditCode={validCreditCode || undefined} stats={catalogueStats} />
      </div>
    </div>
  );
}
