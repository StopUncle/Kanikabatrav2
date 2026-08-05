import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { PageHeader, PageShell } from "@/components/app-shell/ui";
import { prisma } from "@/lib/prisma";
import ManageSubscriptionButton from "@/app/consilium/(member)/profile/ManageSubscriptionButton";
import NotificationPreferences from "@/app/consilium/(member)/profile/NotificationPreferences";
import HandleClaim from "@/components/tells/HandleClaim";

export const metadata = {
  title: "Profile | Consilium",
};

/**
 * Profile and settings in the app skin: identity, the seat (membership
 * status and billing), what pings the phone. The old page's tenure
 * ladder is deliberately absent; rank lives on the You tab now and the
 * month-badge ladder is the superseded system.
 */
export default async function AppProfilePage() {
  const userId = await requireServerAuth("/app/profile");

  const [user, membership] = await Promise.all([
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
        billingCycle: true,
      },
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
  const renewsLabel =
    membership?.status === "ACTIVE" && membership.expiresAt
      ? membership.expiresAt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : null;
  const statusColor =
    membership?.status === "ACTIVE"
      ? "text-[var(--app-green)]"
      : membership?.status === "SUSPENDED"
        ? "text-amber-400"
        : "text-[var(--app-dim)]";

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

      {/* Membership.
          This block used to read "YOUR SEAT / INACTIVE" and stop there. Two
          pieces of in-house vocabulary and a status word that sounds like a
          fault, offered to the one reader who by definition has not bought
          anything yet: the free account cannot tell whether it is looking at
          a tier or at something broken. Say which tier they are on, in the
          words the rest of the app uses, and give them the door. */}
      <section className="mb-4 rounded-[18px] border border-[var(--app-line)] bg-[var(--app-card)] p-[18px]">
        <p className="mb-3 text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
          Your membership
        </p>
        <p
          className={`text-app-body uppercase tracking-app-wide ${statusColor}`}
        >
          {membership?.status ?? "Free account"}
        </p>
        {!membership && (
          <>
            <p className="mt-2 text-app-caption leading-relaxed text-[var(--app-muted)]">
              You have the free tier: the Simulator, the games, the quizzes and
              your standing. The Pact opens the rest.
            </p>
            <Link
              href="/app/pact"
              className="mt-3 inline-block rounded-full border border-[var(--app-gold-soft)] px-4 py-2 text-app-tiny uppercase tracking-app-label text-[var(--app-gold)] transition-colors active:bg-[var(--app-card-2)]"
            >
              See the Pact
            </Link>
          </>
        )}
        {joinedLabel && (
          <p className="mt-2 text-app-body text-[var(--app-muted)]">
            Joined {joinedLabel}
          </p>
        )}
        {renewsLabel && (
          <p className="mt-1 text-app-body text-[var(--app-muted)]">
            Renews {renewsLabel}
            {membership?.billingCycle && (
              <span className="capitalize text-[var(--app-dim)]">
                {" "}
                · {membership.billingCycle} billing
              </span>
            )}
          </p>
        )}
        {(membership?.status === "ACTIVE" ||
          membership?.status === "SUSPENDED") && (
          <div className="mt-4">
            <ManageSubscriptionButton />
          </div>
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
