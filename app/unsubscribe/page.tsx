import Link from "next/link";
import { Mail, CheckCircle2, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import { prisma } from "@/lib/prisma";
import {
  verifyUnsubscribeToken,
  type UnsubscribeType,
} from "@/lib/unsubscribe-token";
import { logger } from "@/lib/logger";

export const metadata = {
  title: "Unsubscribe — Kanika Batra",
  description: "Manage your email preferences",
  robots: { index: false, follow: false },
};

// Don't cache — every request must hit the verify + update path.
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

const TYPE_LABELS: Record<UnsubscribeType, string> = {
  marketing: "marketing emails",
  productUpdates: "product update emails",
  sessionReminders: "session reminder emails",
  weeklyDigest: "the weekly digest",
};

/**
 * Public unsubscribe page. Reads ?token=<jwt>, verifies the signature
 * server-side, and flips the corresponding `User.emailPreferences` key
 * to false. No login required — the signed token is the auth.
 *
 * Three render states:
 *   1. success — token verified, pref updated
 *   2. invalid — bad/expired/forged token
 *   3. missing — no token in URL (someone hit /unsubscribe directly)
 */
export default async function UnsubscribePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.token;

  let state: "success" | "invalid" | "missing" = "missing";
  let unsubscribedFrom: UnsubscribeType | null = null;

  if (token) {
    const payload = verifyUnsubscribeToken(token);
    if (!payload) {
      state = "invalid";
    } else {
      try {
        // Read existing prefs first so we preserve any other keys.
        const user = await prisma.user.findUnique({
          where: { id: payload.userId },
          select: { emailPreferences: true },
        });

        if (!user) {
          // Token signed for a user that no longer exists. Treat as
          // success — there's nothing to opt out of, the unsubscribe
          // intent is satisfied.
          state = "success";
          unsubscribedFrom = payload.type;
        } else {
          const existing =
            user.emailPreferences && typeof user.emailPreferences === "object"
              ? (user.emailPreferences as Record<string, unknown>)
              : {};
          const next = { ...existing, [payload.type]: false };

          await prisma.$executeRaw`
            UPDATE "User"
            SET "emailPreferences" = ${JSON.stringify(next)}::jsonb,
                "updatedAt" = NOW()
            WHERE id = ${payload.userId}
          `;

          state = "success";
          unsubscribedFrom = payload.type;
        }
      } catch (err) {
        logger.error(
          "[unsubscribe] failed to update preferences",
          err as Error,
          { userId: payload.userId, type: payload.type },
        );
        state = "invalid";
      }
    }
  }

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />
      <Header />

      <main className="relative z-10 max-w-xl mx-auto px-4 pt-32 pb-20">
        {state === "success" && unsubscribedFrom && (
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
              You&apos;ve been removed from {TYPE_LABELS[unsubscribedFrom]}.
            </p>
            <p className="text-text-gray/70 text-sm mb-8">
              Transactional emails (purchases, password resets, application
              status) are not affected — those will still reach you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/dashboard"
                className="px-6 py-3 text-sm tracking-[0.1em] uppercase border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold/60 transition-all duration-300 rounded"
              >
                Manage all preferences
              </Link>
              <Link
                href="/"
                className="px-6 py-3 text-sm tracking-[0.1em] uppercase text-text-gray/80 hover:text-accent-gold transition-colors"
              >
                Back to home
              </Link>
            </div>
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
              manage your email preferences from your dashboard.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 text-sm tracking-[0.1em] uppercase border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold/60 transition-all duration-300 rounded"
            >
              Manage preferences
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
              Sign in to your dashboard to choose which emails you receive.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 text-sm tracking-[0.1em] uppercase border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold/60 transition-all duration-300 rounded"
            >
              Go to dashboard
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
