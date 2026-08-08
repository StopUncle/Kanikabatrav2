import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { PageHeader, PageShell } from "@/components/app-shell/ui";
import { prisma } from "@/lib/prisma";
import NotificationPreferences from "@/app/consilium/(member)/profile/NotificationPreferences";
import HandleClaim from "@/components/tells/HandleClaim";
import EmailPreferences from "@/components/app-shell/profile/EmailPreferences";
import SubscriptionManager, {
  type MembershipStatusLike,
  type PactView,
  type SubscriptionView,
} from "@/components/app-shell/profile/SubscriptionManager";
import { MEMBER_PAUSE_REASON } from "@/lib/community/pause";

export const metadata = {
  title: "Profile | Consilium",
};

/**
 * Profile and settings in the app skin: identity, the seat (membership
 * status and billing), what pings the phone, what lands in the inbox. The
 * old page's tenure ladder is deliberately absent; rank lives on the You
 * tab now and the month-badge ladder is the superseded system.
 *
 * `?section=emails` is how the unsubscribe link in an email arrives. It is
 * a query param rather than a fragment because a fragment is never sent to
 * a server, so it could not survive the login bounce.
 */
export default async function AppProfilePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params.section;
  const section = Array.isArray(raw) ? raw[0] : raw;
  const wantsEmails = section === "emails";

  // Carry the section through the login door, otherwise someone clicking
  // "manage preferences" in an email while logged out lands on a profile
  // with no idea why they came.
  const userId = await requireServerAuth(
    wantsEmails ? "/app/profile?section=emails" : "/app/profile",
  );

  const [user, membership, pactMembership, pact] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        displayName: true,
        name: true,
        email: true,
        gender: true,
        handle: true,
        profilePublic: true,
      },
    }),
    prisma.communityMembership.findUnique({
      where: { userId },
      select: {
        status: true,
        activatedAt: true,
        expiresAt: true,
        cancelledAt: true,
        suspendReason: true,
        billingCycle: true,
        paypalSubscriptionId: true,
      },
    }),
    prisma.pactMembership.findUnique({
      where: { userId },
      select: {
        status: true,
        activatedAt: true,
        expiresAt: true,
        cancelledAt: true,
        suspendReason: true,
        billingCycle: true,
        stripeSubscriptionId: true,
      },
    }),
    // The active covenant is the newest row with brokenAt null. A member
    // can hold one of these with no PactMembership at all: Consilium
    // members sign for free and never touch Stripe.
    prisma.pact.findFirst({
      where: { userId },
      orderBy: { number: "desc" },
      select: { brokenAt: true, signedAt: true },
    }),
  ]);

  const handle = user?.displayName || user?.name || "Member";
  const joinedLabel = membership?.activatedAt
    ? membership.activatedAt.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const consiliumView: SubscriptionView | null = membership
    ? {
        status: membership.status as MembershipStatusLike,
        billingCycle: membership.billingCycle,
        activatedAt: membership.activatedAt?.toISOString() ?? null,
        expiresAt: membership.expiresAt?.toISOString() ?? null,
        cancelledAt: membership.cancelledAt?.toISOString() ?? null,
        // Only a Stripe-backed row auto-renews. Gift, bundle and trial
        // memberships carry no subscription and the cancel route 422s
        // them, so they must never be offered a cancel button.
        autoRenewing: Boolean(
          membership.paypalSubscriptionId?.startsWith("ST-"),
        ),
        selfPaused: membership.suspendReason === MEMBER_PAUSE_REASON,
        paymentFailed: membership.suspendReason === "payment-failed",
      }
    : null;

  const covenantLive = Boolean(pact && !pact.brokenAt);
  const pactView: PactView | null =
    pactMembership || pact
      ? {
          status: (pactMembership?.status ??
            (covenantLive ? "ACTIVE" : "CANCELLED")) as MembershipStatusLike,
          billingCycle: pactMembership?.billingCycle ?? null,
          activatedAt:
            pactMembership?.activatedAt?.toISOString() ??
            pact?.signedAt.toISOString() ??
            null,
          expiresAt: pactMembership?.expiresAt?.toISOString() ?? null,
          cancelledAt: pactMembership?.cancelledAt?.toISOString() ?? null,
          autoRenewing: Boolean(pactMembership?.stripeSubscriptionId),
          selfPaused: false,
          paymentFailed: pactMembership?.suspendReason === "payment-failed",
          // Signed with no subscription behind it: the Consilium is paying
          // for this one. Saying so matters, because breaking the pact
          // leaves the $29 untouched and people assume otherwise.
          entitledFree:
            covenantLive && !pactMembership?.stripeSubscriptionId,
          covenantLive,
        }
      : null;

  const hasNoSubscriptions = !consiliumView && !pactView;

  return (
    <PageShell>
      <PageHeader
        title="Profile"
        lede="Your identity, your membership, your settings."
      />

      {/* Identity */}
      <section className="mb-4 rounded-[18px] border border-[var(--app-line)] bg-[var(--app-card)] p-[18px]">
        <p className="mb-3 text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
          Identity
        </p>
        <IdentityRow label="Display name" value={handle} />
        <IdentityRow label="Email" value={user?.email ?? ""} muted />
        {user?.gender && (
          <IdentityRow label="Chamber" value={user.gender.toLowerCase()} />
        )}
        {joinedLabel && <IdentityRow label="Joined" value={joinedLabel} muted />}
        {/* Still the old dashboard, because that is where the edit form
            lives and inventing a second one here would give the account two
            places to disagree about a name. Say where it goes and that it
            leaves the app, rather than naming a surface this reader has
            never seen and letting the tap explain itself. */}
        <p className="mt-3 border-t border-[var(--app-line-soft)] pt-3 text-app-eyebrow leading-relaxed text-[var(--app-dim)]">
          Changing your email or display name still happens on the website.{" "}
          <a href="/dashboard" className="text-[var(--app-gold)]">
            Open account settings
          </a>
          , then come back.
        </p>
      </section>

      {/* Subscriptions and billing. Both rungs, every state, and a way out
          of each that does not depend on the Stripe portal being wired up. */}
      <section className="mb-4 rounded-[18px] border border-[var(--app-line)] bg-[var(--app-card)] p-[18px]">
        <p className="mb-3 text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
          Subscriptions and billing
        </p>

        {hasNoSubscriptions ? (
          <>
            <p className="text-app-body uppercase tracking-app-wide text-[var(--app-dim)]">
              Free account
            </p>
            <p className="mt-2 text-app-caption leading-relaxed text-[var(--app-muted)]">
              Nothing is being charged. You have the Simulator, the games, the
              quizzes and your standing. The Pact opens the rest.
            </p>
            <Link
              href="/app/pact"
              className="mt-3 inline-block rounded-full border border-[var(--app-gold-soft)] px-4 py-2 text-app-tiny uppercase tracking-app-label text-[var(--app-gold)] transition-colors active:bg-[var(--app-card-2)]"
            >
              See the Pact
            </Link>
          </>
        ) : (
          <SubscriptionManager consilium={consiliumView} pact={pactView} />
        )}
      </section>

      {/* The player card. The toggle that publishes stats, the Mark
          band, the climb, and the hex at /u/[handle]. Off by default;
          the same switch that has always governed the public hex. */}
      <section className="mb-4 rounded-[18px] border border-[var(--app-line)] bg-[var(--app-card)] p-[18px]">
        <p className="mb-1 text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
          Player card
        </p>
        <p className="mb-3 text-app-caption leading-relaxed text-[var(--app-muted)]">
          A public page with your rank, stats, stars, Mark score, and hex.
          Only what you have built; your blind spots stay yours.
        </p>
        <HandleClaim
          initialHandle={user?.handle ?? null}
          initialPublic={user?.profilePublic ?? false}
        />
      </section>

      {/* Email. Separate section from push on purpose: they are different
          channels with a same-named category (questionAnswered) in each,
          and merging them would make one switch look like it governs both. */}
      <div className="mb-4">
        <EmailPreferences highlight={wantsEmails} />
      </div>

      {/* Notifications */}
      <section className="rounded-[18px] border border-[var(--app-line)] bg-[var(--app-card)] p-[18px]">
        <p className="mb-3 text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
          What pings your phone
        </p>
        <NotificationPreferences />
      </section>
    </PageShell>
  );
}

function IdentityRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-app-eyebrow uppercase tracking-app-wide text-[var(--app-dim)]">
        {label}
      </span>
      <span
        className={`truncate text-app-body ${
          muted ? "text-[var(--app-dim)]" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
