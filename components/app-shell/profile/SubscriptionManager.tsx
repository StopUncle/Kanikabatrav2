"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle, ExternalLink } from "lucide-react";

/**
 * Subscriptions on the app profile.
 *
 * Before this, /app/profile queried CommunityMembership alone and rendered
 * a single "Manage subscription" button gated on ACTIVE or SUSPENDED. Three
 * consequences, all bad: a member paying weekly for the Pact saw the word
 * "Free account" and no billing at all; a CANCELLED, EXPIRED or
 * dunning-suspended member got no control of any kind; and the one control
 * that did exist was the Stripe Customer Portal, so cancelling depended on
 * a dashboard setting nothing in this repo can guarantee.
 *
 * Cancellation now runs through the app's own routes, which already
 * existed and were only ever wired into the old dashboard. The portal
 * stays, demoted to what it is actually good at: changing a card and
 * fetching invoices.
 *
 * The rule this component holds to is that every state ends in either an
 * action or a sentence explaining why there is not one. Silence is what
 * produces the "I thought I cancelled" ticket.
 */

export type MembershipStatusLike =
  | "PENDING"
  | "APPROVED"
  | "ACTIVE"
  | "SUSPENDED"
  | "CANCELLED"
  | "EXPIRED";

export interface SubscriptionView {
  status: MembershipStatusLike | null;
  billingCycle: string | null;
  activatedAt: string | null;
  expiresAt: string | null;
  cancelledAt: string | null;
  /** True when a real Stripe subscription backs this, so it renews on its own. */
  autoRenewing: boolean;
  /** Member paused it themselves, so they can resume it themselves. */
  selfPaused: boolean;
  /** Suspended by a failed payment. Needs a new card, not a resume. */
  paymentFailed: boolean;
}

export interface PactView extends SubscriptionView {
  /** Signed under a Consilium entitlement, so nothing is charged for it. */
  entitledFree: boolean;
  /** A covenant exists and has not been broken. */
  covenantLive: boolean;
}

function fmt(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function SubscriptionManager({
  consilium,
  pact,
}: {
  consilium: SubscriptionView | null;
  pact: PactView | null;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);

  async function act(
    key: string,
    path: string,
    { redirectToUrl = false }: { redirectToUrl?: boolean } = {},
  ) {
    setBusy(key);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch(path, { method: "POST" });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // The routes speak in finished sentences already. Prefer their
        // wording over a generic failure, because theirs explains the
        // 422 gift case and the 502 Stripe case in terms a member can act on.
        setError(
          typeof data?.error === "string"
            ? data.error
            : "Something went wrong. Please try again.",
        );
        return;
      }

      if (redirectToUrl && typeof data?.url === "string") {
        window.location.href = data.url;
        return;
      }

      setNotice(
        typeof data?.message === "string" ? data.message : "Done.",
      );
      setConfirming(null);
      router.refresh();
    } catch {
      setError("Could not reach the server. Check your connection.");
    } finally {
      setBusy(null);
    }
  }

  const hasAnything = consilium || pact;
  if (!hasAnything) return null;

  return (
    <div className="space-y-3">
      {error && (
        <div
          className="flex items-start gap-2 rounded-[14px] border border-red-500/25 bg-red-950/25 px-4 py-3 text-app-caption text-red-300"
          role="alert"
        >
          <AlertCircle size={14} className="mt-px shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {notice && (
        <div
          className="rounded-[14px] border border-[var(--app-green)]/25 bg-[var(--app-green)]/10 px-4 py-3 text-app-caption text-[var(--app-green)]"
          aria-live="polite"
        >
          {notice}
        </div>
      )}

      {consilium && (
        <Block title="Consilium" status={consilium.status}>
          <ConsiliumBody
            v={consilium}
            busy={busy}
            confirming={confirming}
            setConfirming={setConfirming}
            act={act}
          />
        </Block>
      )}

      {pact && (
        <Block title="The Blood Pact" status={pact.status}>
          <PactBody v={pact} busy={busy} act={act} />
        </Block>
      )}
    </div>
  );
}

function Block({
  title,
  status,
  children,
}: {
  title: string;
  status: MembershipStatusLike | null;
  children: React.ReactNode;
}) {
  const tone =
    status === "ACTIVE"
      ? "text-[var(--app-green)]"
      : status === "SUSPENDED"
        ? "text-amber-400"
        : "text-[var(--app-dim)]";
  return (
    <div className="rounded-[14px] border border-[var(--app-line-soft)] bg-[var(--app-card-2)] p-4">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="text-app-body text-[var(--app-text)]">{title}</p>
        <span className={`text-app-eyebrow uppercase tracking-app-wide ${tone}`}>
          {status ?? "None"}
        </span>
      </div>
      {children}
    </div>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1 text-app-caption leading-relaxed text-[var(--app-muted)]">
      {children}
    </p>
  );
}

function ConsiliumBody({
  v,
  busy,
  confirming,
  setConfirming,
  act,
}: {
  v: SubscriptionView;
  busy: string | null;
  confirming: string | null;
  setConfirming: (k: string | null) => void;
  act: (
    k: string,
    p: string,
    o?: { redirectToUrl?: boolean },
  ) => Promise<void>;
}) {
  const ends = fmt(v.expiresAt);
  const scheduledToEnd = Boolean(v.cancelledAt) && v.status === "ACTIVE";

  if (v.status === "ACTIVE") {
    return (
      <>
        {scheduledToEnd ? (
          <Line>
            Auto-renewal is off. You keep everything until {ends ?? "your period ends"}
            , then the seat closes.
          </Line>
        ) : v.autoRenewing ? (
          <Line>
            Renews {ends ?? "at the end of the period"}
            {v.billingCycle ? ` on ${v.billingCycle} billing` : ""}.
          </Line>
        ) : (
          <Line>
            This membership does not auto-renew, so there is nothing to
            cancel. It ends on {ends ?? "its scheduled date"}.
          </Line>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {scheduledToEnd && (
            <Action
              label="Turn auto-renewal back on"
              busy={busy === "reactivate"}
              onClick={() =>
                act("reactivate", "/api/consilium/subscription/reactivate")
              }
            />
          )}

          {!scheduledToEnd && v.autoRenewing && (
            <>
              {confirming === "cancel" ? (
                <div className="w-full rounded-[12px] border border-red-500/25 bg-red-950/20 p-3">
                  <p className="text-app-caption leading-relaxed text-[var(--app-muted)]">
                    Cancelling stops the next charge. You keep full access
                    until {ends ?? "the end of the period"}, and nothing is
                    deleted.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Action
                      label="Yes, cancel auto-renewal"
                      tone="danger"
                      busy={busy === "cancel"}
                      onClick={() =>
                        act("cancel", "/api/consilium/subscription/cancel")
                      }
                    />
                    <Action
                      label="Keep it"
                      tone="quiet"
                      onClick={() => setConfirming(null)}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <Action
                    label="Cancel auto-renewal"
                    tone="danger"
                    onClick={() => setConfirming("cancel")}
                  />
                  <Action
                    label="Pause instead"
                    tone="quiet"
                    busy={busy === "pause"}
                    onClick={() =>
                      act("pause", "/api/consilium/subscription/pause")
                    }
                  />
                </>
              )}
            </>
          )}

          {v.autoRenewing && <PortalLink busy={busy} act={act} kind="consilium" />}
        </div>
      </>
    );
  }

  if (v.status === "SUSPENDED") {
    return (
      <>
        {v.selfPaused ? (
          <Line>You paused this. Pick it up whenever you want.</Line>
        ) : v.paymentFailed ? (
          <Line>
            The last payment did not go through, so the seat is on hold. A
            working card brings it straight back.
          </Line>
        ) : (
          <Line>
            This membership is on hold. Updating your billing details is the
            fastest way to sort it.
          </Line>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {v.selfPaused && (
            <Action
              label="Resume membership"
              busy={busy === "resume"}
              onClick={() =>
                act("resume", "/api/consilium/subscription/resume")
              }
            />
          )}
          {!v.selfPaused && (
            <PortalLink
              busy={busy}
              act={act}
              kind="consilium"
              label="Update payment method"
            />
          )}
        </div>
      </>
    );
  }

  // CANCELLED, EXPIRED, and the legacy PENDING / APPROVED rows. These
  // rendered nothing at all before, which read as a broken page.
  return (
    <>
      <Line>
        {v.status === "CANCELLED"
          ? "This membership is closed."
          : v.status === "EXPIRED"
            ? `This membership ended${ends ? ` on ${ends}` : ""}.`
            : "This membership is not active."}{" "}
        Nothing is being charged.
      </Line>
      <div className="mt-3">
        <LinkAction href="/consilium/apply" label="Rejoin the Consilium" />
      </div>
    </>
  );
}

function PactBody({
  v,
  busy,
  act,
}: {
  v: PactView;
  busy: string | null;
  act: (
    k: string,
    p: string,
    o?: { redirectToUrl?: boolean },
  ) => Promise<void>;
}) {
  const renews = fmt(v.expiresAt);

  if (v.covenantLive) {
    return (
      <>
        {v.entitledFree ? (
          <Line>
            Included with your Consilium membership. Nothing is charged for
            the Pact separately.
          </Line>
        ) : (
          <Line>
            Renews {renews ?? "on schedule"}
            {v.billingCycle ? ` on ${v.billingCycle} billing` : ""}.
          </Line>
        )}

        {v.status === "SUSPENDED" && (
          <Line>
            The last payment failed. Your weeks are still here; the card just
            needs replacing.
          </Line>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {/* Breaking a pact is a ceremony with a scar at the end of it, and
              it lives on its own screen. Sending people there beats putting
              a second, quieter cancel button next to it that means the same
              thing but skips the weight. */}
          <LinkAction href="/app/pact/break" label="Break the pact" tone="danger" />
          {v.autoRenewing && (
            <PortalLink
              busy={busy}
              act={act}
              kind="pact"
              label={
                v.status === "SUSPENDED" ? "Update payment method" : undefined
              }
            />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Line>
        Your pact is broken and the record is sealed. Nothing is being
        charged.
      </Line>
      <div className="mt-3 flex flex-wrap gap-2">
        <LinkAction href="/app/pact/record" label="See the record" tone="quiet" />
        <LinkAction href="/app/pact" label="Sign again" />
      </div>
    </>
  );
}

function PortalLink({
  busy,
  act,
  kind,
  label,
}: {
  busy: string | null;
  act: (
    k: string,
    p: string,
    o?: { redirectToUrl?: boolean },
  ) => Promise<void>;
  kind: "consilium" | "pact";
  label?: string;
}) {
  const key = `portal-${kind}`;
  return (
    <Action
      label={label ?? "Manage billing"}
      tone="quiet"
      trailing={<ExternalLink size={12} />}
      busy={busy === key}
      onClick={() =>
        act(key, `/api/${kind}/subscription/portal`, { redirectToUrl: true })
      }
    />
  );
}

const TONE: Record<string, string> = {
  default:
    "border-[var(--app-gold-soft)] text-[var(--app-gold)] active:bg-[var(--app-card)]",
  danger: "border-red-500/40 text-red-300 active:bg-red-950/30",
  quiet: "border-[var(--app-line)] text-[var(--app-muted)] active:bg-[var(--app-card)]",
};

function Action({
  label,
  onClick,
  busy = false,
  tone = "default",
  trailing,
}: {
  label: string;
  onClick: () => void;
  busy?: boolean;
  tone?: "default" | "danger" | "quiet";
  trailing?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-app-tiny uppercase tracking-app-label transition-colors disabled:opacity-50 ${TONE[tone]}`}
    >
      {busy && <Loader2 size={12} className="animate-spin" />}
      {label}
      {!busy && trailing}
    </button>
  );
}

function LinkAction({
  href,
  label,
  tone = "default",
}: {
  href: string;
  label: string;
  tone?: "default" | "danger" | "quiet";
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-app-tiny uppercase tracking-app-label transition-colors ${TONE[tone]}`}
    >
      {label}
    </Link>
  );
}
