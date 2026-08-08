import Link from "next/link";
import { Mail, CheckCircle2, AlertTriangle, Undo2 } from "lucide-react";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import {
  verifyUnsubscribeToken,
  type UnsubscribeType,
} from "@/lib/unsubscribe-token";
import { applyUnsubscribe } from "@/lib/unsubscribe-apply";
import { logger } from "@/lib/logger";

export const metadata = {
  title: "Unsubscribe. Kanika Batra",
  description: "Manage your email preferences",
  robots: { index: false, follow: false },
};

// Don't cache. Every request must hit the verify + update path.
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ token?: string; undo?: string }>;
}

const TYPE_LABELS: Record<UnsubscribeType, string> = {
  marketing: "marketing emails",
  productUpdates: "product update emails",
  sessionReminders: "session reminder emails",
  weeklyDigest: "the weekly digest",
  questionAnswered: "answer notifications",
};

/**
 * Public unsubscribe page. Reads ?token=<jwt>, verifies the signature
 * server-side, and flips the corresponding `User.emailPreferences` key to
 * false. No login required, the signed token is the auth.
 *
 * `?undo=1` on the same token puts it back. One-click unsubscribe means
 * one-click MISCLICK, and the person who hit it by accident used to have
 * no route back that did not involve remembering a password.
 *
 * Four render states: success, undone, invalid, missing.
 */
export default async function UnsubscribePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.token;
  const undo = params.undo === "1";

  let state: "success" | "undone" | "invalid" | "missing" = "missing";
  let affectedType: UnsubscribeType | null = null;

  if (token) {
    const payload = verifyUnsubscribeToken(token);
    if (!payload) {
      state = "invalid";
    } else {
      try {
        await applyUnsubscribe(payload, undo);
        state = undo ? "undone" : "success";
        affectedType = payload.type;
      } catch (err) {
        logger.error("[unsubscribe] failed to update preferences", err as Error, {
          userId: payload.userId,
          email: payload.email,
          type: payload.type,
          undo,
        });
        state = "invalid";
      }
    }
  }

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />
      <Header />

      <main className="relative z-10 max-w-xl mx-auto px-4 pt-32 pb-20">
        {state === "success" && affectedType && (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center">
              <CheckCircle2 size={28} className="text-accent-gold" />
            </div>
            <p className="text-accent-gold text-xs uppercase tracking-[0.3em] mb-2">
              Unsubscribed
            </p>
            <h1 className="text-3xl sm:text-4xl font-extralight tracking-wider uppercase gradient-text-gold mb-4">
              You&apos;re off the list
            </h1>
            <div className="w-16 h-px bg-accent-gold/40 mx-auto mb-6" />
            <p className="text-text-gray leading-relaxed mb-2">
              You&apos;ve been removed from {TYPE_LABELS[affectedType]}.
            </p>
            <p className="text-text-gray/70 text-sm mb-8">
              Transactional emails (purchases, password resets, application
              status) are not affected. Those will still reach you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/preferences"
                className="px-6 py-3 text-sm tracking-[0.1em] uppercase border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold/60 transition-all duration-300 rounded"
              >
                Choose which emails you get
              </Link>
              <Link
                href={`/unsubscribe?token=${encodeURIComponent(token!)}&undo=1`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm tracking-[0.1em] uppercase text-text-gray/80 hover:text-accent-gold transition-colors"
              >
                <Undo2 size={14} />
                Undo, that was a mistake
              </Link>
            </div>
          </div>
        )}

        {state === "undone" && affectedType && (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center">
              <Undo2 size={26} className="text-accent-gold" />
            </div>
            <p className="text-accent-gold text-xs uppercase tracking-[0.3em] mb-2">
              Back on
            </p>
            <h1 className="text-3xl sm:text-4xl font-extralight tracking-wider uppercase gradient-text-gold mb-4">
              Nothing changed
            </h1>
            <div className="w-16 h-px bg-accent-gold/40 mx-auto mb-6" />
            <p className="text-text-gray leading-relaxed mb-8">
              You&apos;re still subscribed to {TYPE_LABELS[affectedType]}. If
              you meant to leave, the link in any email will do it.
            </p>
            <Link
              href="/preferences"
              className="inline-block px-6 py-3 text-sm tracking-[0.1em] uppercase border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold/60 transition-all duration-300 rounded"
            >
              Choose which emails you get
            </Link>
          </div>
        )}

        {state === "invalid" && (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <AlertTriangle size={28} className="text-red-400" />
            </div>
            <p className="text-red-400 text-xs uppercase tracking-[0.3em] mb-2">
              Link expired
            </p>
            <h1 className="text-3xl sm:text-4xl font-extralight tracking-wider uppercase gradient-text-gold mb-4">
              This link doesn&apos;t work
            </h1>
            <div className="w-16 h-px bg-accent-gold/40 mx-auto mb-6" />
            <p className="text-text-gray leading-relaxed mb-8">
              The unsubscribe link is invalid or has expired. You can still
              turn any email off from your preferences.
            </p>
            <Link
              href="/preferences"
              className="inline-block px-6 py-3 text-sm tracking-[0.1em] uppercase border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold/60 transition-all duration-300 rounded"
            >
              Choose which emails you get
            </Link>
          </div>
        )}

        {state === "missing" && (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center">
              <Mail size={28} className="text-accent-gold" />
            </div>
            <p className="text-accent-gold text-xs uppercase tracking-[0.3em] mb-2">
              Email preferences
            </p>
            <h1 className="text-3xl sm:text-4xl font-extralight tracking-wider uppercase gradient-text-gold mb-4">
              Manage your emails
            </h1>
            <div className="w-16 h-px bg-accent-gold/40 mx-auto mb-6" />
            <p className="text-text-gray leading-relaxed mb-8">
              Sign in to choose which emails you receive.
            </p>
            <Link
              href="/preferences"
              className="inline-block px-6 py-3 text-sm tracking-[0.1em] uppercase border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold/60 transition-all duration-300 rounded"
            >
              Choose which emails you get
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
