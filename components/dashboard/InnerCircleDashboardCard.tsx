"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CreditCard, CheckCircle, AlertTriangle, Loader2, Gift, RotateCcw } from "lucide-react";

interface Membership {
  id: string;
  status: string;
  billingCycle: string;
  appliedAt: string | null;
  approvedAt: string | null;
  activatedAt: string | null;
  expiresAt: string | null;
  suspendedAt: string | null;
  suspendReason: string | null;
  cancelledAt: string | null;
  /** "ST-<stripeSubId>" when the member has a real Stripe subscription
   *  that auto-renews. null for gift / trial / bundled-with-book
   *  memberships that lapse naturally at expiresAt. */
  paypalSubscriptionId: string | null;
}

interface Props {
  membership: Membership | null;
}

/**
 * State-aware Inner Circle card for the dashboard.
 *
 * Renders different content depending on the member's status:
 *   - null                 → not a member yet, CTA to join
 *   - PENDING / APPROVED   → legacy pre-2026-04-19 application states.
 *                            One-click "continue to checkout" CTA.
 *   - ACTIVE               → member status + expiry + Manage Subscription + Feed
 *   - SUSPENDED            → suspension reason + resume / contact
 *   - CANCELLED            → cancelled but still has access until expiry
 *   - EXPIRED              → expired, re-join
 *
 * The "Manage Subscription" button hits the Stripe Customer Portal via
 * /api/consilium/subscription/portal, redirecting the user to Stripe's
 * hosted portal where they can change their card, cancel, or view invoices.
 */
export default function InnerCircleDashboardCard({ membership }: Props) {
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  // Optimistic local copy of cancelledAt so the UI flips immediately
  // after the cancel/reactivate POST resolves. Server-rendered initial
  // value comes from props; user actions update this without a refetch.
  const [cancelledAtLocal, setCancelledAtLocal] = useState<string | null>(
    membership?.cancelledAt ?? null,
  );

  const hasStripeSubscription =
    membership?.paypalSubscriptionId?.startsWith("ST-") ?? false;

  const openPortal = async () => {
    setPortalLoading(true);
    setPortalError(null);
    try {
      const res = await fetch("/api/consilium/subscription/portal", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to open portal");
      }
      window.location.href = data.url;
    } catch (err) {
      setPortalError(err instanceof Error ? err.message : "Failed to open portal");
      setPortalLoading(false);
    }
  };

  async function cancelAutoRenewal() {
    if (!confirm(
      "Cancel auto-renewal? You'll keep access until the end of your current billing period, then your membership ends.",
    )) {
      return;
    }
    setCancelLoading(true);
    setCancelError(null);
    try {
      const res = await fetch("/api/consilium/subscription/cancel", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to cancel auto-renewal");
      setCancelledAtLocal(new Date().toISOString());
    } catch (err) {
      setCancelError(err instanceof Error ? err.message : "Failed to cancel");
    } finally {
      setCancelLoading(false);
    }
  }

  async function reactivateAutoRenewal() {
    setCancelLoading(true);
    setCancelError(null);
    try {
      const res = await fetch("/api/consilium/subscription/reactivate", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reactivate");
      setCancelledAtLocal(null);
    } catch (err) {
      setCancelError(err instanceof Error ? err.message : "Failed to reactivate");
    } finally {
      setCancelLoading(false);
    }
  }

  // Not a member, show the explore CTA
  if (!membership) {
    return (
      <div className="text-center py-8">
        <p className="text-text-gray mb-4">
          Access exclusive voice notes, courses, and community discussions.
        </p>
        <Link
          href="/consilium"
          className="inline-flex items-center gap-2 px-6 py-2 bg-accent-gold text-deep-black rounded-full font-medium hover:bg-accent-gold/90 transition-all"
        >
          Explore The Consilium
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  // Legacy PENDING / APPROVED rows from before the application gate
  // was removed (2026-04-19). One-click resume to checkout, no review.
  if (membership.status === "PENDING" || membership.status === "APPROVED") {
    return (
      <div className="text-center py-6">
        <CheckCircle className="w-10 h-10 text-accent-gold mx-auto mb-3" />
        <p className="text-text-light font-light text-lg mb-2">Finish Joining</p>
        <p className="text-text-gray/70 text-sm mb-4">
          Pick up where you left off. One click to checkout.
        </p>
        <Link
          href="/consilium"
          className="inline-flex items-center gap-2 px-6 py-2 bg-accent-gold text-deep-black rounded-full font-medium hover:bg-accent-gold/90 transition-all"
        >
          Continue
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  // Active, show status + cancel/reactivate toggle
  if (membership.status === "ACTIVE") {
    const expiresAt = membership.expiresAt ? new Date(membership.expiresAt) : null;
    const daysUntilExpiry = expiresAt
      ? Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : null;
    const isCancelPending = !!cancelledAtLocal;
    const formattedExpiry = expiresAt
      ? expiresAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : null;

    return (
      <div className="py-2">
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-2 h-2 rounded-full ${isCancelPending ? "bg-amber-400" : "bg-emerald-400"}`} />
          <span className={`text-xs uppercase tracking-wider ${isCancelPending ? "text-amber-400" : "text-emerald-400"}`}>
            {isCancelPending ? "Active, Auto-Renewal Off" : "Active"}
          </span>
        </div>

        {/* Stripe-subscriber branch: shows renewal date + cancel/reactivate toggle. */}
        {hasStripeSubscription && (
          <>
            {expiresAt && (
              <p className="text-text-gray text-sm mb-1">
                {isCancelPending ? "Access until " : "Renews "}
                <span className="text-text-light">{formattedExpiry}</span>
                {daysUntilExpiry !== null && daysUntilExpiry > 0 && daysUntilExpiry <= 7 && (
                  <span className="text-amber-400 ml-2">({daysUntilExpiry} days)</span>
                )}
              </p>
            )}
            <p className="text-text-gray/70 text-xs mb-5 capitalize">
              {membership.billingCycle} billing
            </p>
          </>
        )}

        {/* Gift / trial / bundled branch: no auto-renewal, lapses naturally. */}
        {!hasStripeSubscription && (
          <>
            <div className="flex items-center gap-2 mb-2">
              <Gift size={14} className="text-accent-gold" strokeWidth={1.5} />
              <p className="text-text-gray text-sm">
                Complimentary membership
              </p>
            </div>
            {expiresAt && (
              <p className="text-text-gray text-sm mb-1">
                Access until <span className="text-text-light">{formattedExpiry}</span>
                {daysUntilExpiry !== null && daysUntilExpiry > 0 && daysUntilExpiry <= 7 && (
                  <span className="text-amber-400 ml-2">({daysUntilExpiry} days)</span>
                )}
              </p>
            )}
            <p className="text-text-gray/70 text-xs mb-5">
              No auto-renewal. To continue past the end date, subscribe below.
            </p>
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            href="/consilium/feed"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent-gold text-deep-black rounded-full text-sm font-medium hover:bg-accent-gold/90 transition-all"
          >
            Go to Feed
            <ArrowRight size={14} />
          </Link>

          {hasStripeSubscription ? (
            isCancelPending ? (
              <button
                onClick={reactivateAutoRenewal}
                disabled={cancelLoading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/40 rounded-full text-sm hover:bg-emerald-500/20 transition-all disabled:opacity-50"
              >
                {cancelLoading ? (
                  <><Loader2 size={14} className="animate-spin" />Reactivating…</>
                ) : (
                  <><RotateCcw size={14} />Reactivate Auto-Renewal</>
                )}
              </button>
            ) : (
              <button
                onClick={cancelAutoRenewal}
                disabled={cancelLoading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-deep-black/40 text-text-gray border border-text-gray/30 rounded-full text-sm hover:bg-deep-black/60 hover:text-text-light transition-all disabled:opacity-50"
              >
                {cancelLoading ? (
                  <><Loader2 size={14} className="animate-spin" />Cancelling…</>
                ) : (
                  <>Cancel Auto-Renewal</>
                )}
              </button>
            )
          ) : (
            <Link
              href="/consilium"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded-full text-sm hover:bg-accent-gold/20 transition-all"
            >
              Subscribe to Continue
              <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {/* Secondary: payment method / invoices (Stripe-subscribers only). */}
        {hasStripeSubscription && (
          <div className="mt-3">
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="inline-flex items-center gap-1.5 text-xs text-text-gray/70 hover:text-text-light transition-colors disabled:opacity-50"
            >
              {portalLoading ? (
                <><Loader2 size={12} className="animate-spin" />Opening…</>
              ) : (
                <><CreditCard size={12} />Update payment / view invoices</>
              )}
            </button>
          </div>
        )}

        {cancelError && (
          <p className="text-xs text-red-400 mt-2">{cancelError}</p>
        )}
        {portalError && (
          <p className="text-xs text-red-400 mt-2">{portalError}</p>
        )}
      </div>
    );
  }

  // Suspended, show reason + contact guidance
  if (membership.status === "SUSPENDED") {
    return (
      <div className="py-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className="text-xs uppercase tracking-wider text-amber-400">Suspended</span>
        </div>
        <p className="text-text-gray text-sm mb-4">
          {membership.suspendReason === "payment-failed"
            ? "Your last payment failed. Update your card to reactivate."
            : membership.suspendReason === "member-requested-pause"
              ? "Your membership is paused."
              : "Your membership is suspended. Contact support for details."}
        </p>
        <button
          onClick={openPortal}
          disabled={portalLoading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded-full text-sm hover:bg-accent-gold/20 transition-all disabled:opacity-50"
        >
          {portalLoading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Opening…
            </>
          ) : (
            <>
              <CreditCard size={14} />
              Update Payment
            </>
          )}
        </button>
        {portalError && (
          <p className="text-xs text-red-400 mt-2">{portalError}</p>
        )}
      </div>
    );
  }

  // Cancelled but still has access until expiry
  if (membership.status === "CANCELLED") {
    const expiresAt = membership.expiresAt ? new Date(membership.expiresAt) : null;
    const stillActive = expiresAt && expiresAt > new Date();
    return (
      <div className="py-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-text-gray/50" />
          <span className="text-xs uppercase tracking-wider text-text-gray">Cancelled</span>
        </div>
        <p className="text-text-gray text-sm mb-4">
          {stillActive && expiresAt
            ? `Your membership is cancelled but you still have access until ${expiresAt.toLocaleDateString()}.`
            : "Your membership has ended."}
        </p>
        <Link
          href="/consilium"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gold text-deep-black rounded-full text-sm font-medium hover:bg-accent-gold/90 transition-all"
        >
          Re-join
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  // EXPIRED or unknown, fallback
  return (
    <div className="text-center py-6">
      <p className="text-text-gray mb-4">Your membership has expired.</p>
      <Link
        href="/consilium"
        className="inline-flex items-center gap-2 px-6 py-2 bg-accent-gold text-deep-black rounded-full font-medium hover:bg-accent-gold/90 transition-all"
      >
        Re-join
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
