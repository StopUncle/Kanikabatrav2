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
        lede="Your identity, your seat, your settings."
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
        <p className="mt-3 border-t border-[var(--app-line-soft)] pt-3 text-app-eyebrow text-[var(--app-dim)]">
          To change your email or display name, open the{" "}
          <a href="/dashboard" className="text-[var(--app-gold)]">
            Dashboard
          </a>
          .
        </p>
      </section>

      {/* The seat */}
      <section className="mb-4 rounded-[18px] border border-[var(--app-line)] bg-[var(--app-card)] p-[18px]">
        <p className="mb-3 text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
          Your seat
        </p>
        <p
          className={`text-app-body uppercase tracking-app-wide ${statusColor}`}
        >
          {membership?.status ?? "Inactive"}
        </p>
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
