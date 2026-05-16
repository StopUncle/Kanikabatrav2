import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { generateTokenPair } from "@/lib/auth/jwt";
import { sendInnerCircleWelcomeNewUser } from "@/lib/email";
import {
  buildAttributionRecord,
  type AttributionPayload,
} from "@/lib/attribution";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import ClaimButton from "./ClaimButton";
import { AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Claim Your Free Month. The Consilium",
  robots: { index: false, follow: false },
};

interface GiftPayload {
  type: "consilium-gift";
  email: string;
  name: string;
  v: number;
}

function verifyGiftToken(token: string): GiftPayload {
  // Algorithm pinned to HS256 to prevent `alg: none` forgery. The
  // backfill script + send-test-gift-email script both sign with HS256.
  const payload = jwt.verify(token, process.env.JWT_SECRET!, {
    algorithms: ["HS256"],
  }) as GiftPayload;
  if (payload.type !== "consilium-gift") {
    throw new Error("wrong token type");
  }
  return payload;
}

/**
 * Claim server action.
 *
 * Two modes, chosen by whether an account already exists for the gift
 * email:
 *
 *   A. No account yet (guest book-buyer path)
 *      Re-verify JWT → create user with random password → sign them in
 *      via accessToken/refreshToken cookies → activate 30-day gift →
 *      fire welcome email with 7-day password-set link → redirect to feed.
 *
 *   B. Account already exists (returning customer path)
 *      We NEVER take over an existing account from a JWT, a gift token
 *      in an email is not a full authentication factor, and existing
 *      accounts may have history, purchases, admin role, etc. instead:
 *      bounce to /login with the token preserved. Post-login the page
 *      re-runs, email matches, and we activate against the existing
 *      session cookies.
 *
 * This closes the "claim loads me in as the wrong user" footgun where a
 * stale or alternate user record happened to match the gift email.
 *
 * Wrapped in a button-submitted form (not auto-on-page-load) so email
 * pre-scanners don't accidentally consume the claim.
 */
async function claimAction(formData: FormData): Promise<void> {
  "use server";

  const token = String(formData.get("token") ?? "");
  if (!token) return;

  const payload = verifyGiftToken(token);
  const normalizedEmail = payload.email.toLowerCase();

  const currentUserId = await optionalServerAuth();

  const existing = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true, email: true, name: true, tokenVersion: true },
  });

  // Account exists (or the logged-in session is a different account).
  // In either case we require the user to log in as the claim email —
  // we never take over an existing account from just a JWT in an email.
  if (existing && (!currentUserId || currentUserId !== existing.id)) {
    const returnTo = encodeURIComponent(
      `/consilium/claim?token=${token}`,
    );
    redirect(
      `/login?returnTo=${returnTo}&hint=${encodeURIComponent(normalizedEmail)}`,
    );
  }

  // Path A, brand new account for this email. Create + auto-sign-in.
  // Path A.5, already logged in as the right account. Activate only.
  let user = existing;
  let isNewUser = false;

  if (!user) {
    const tempPassword = crypto.randomBytes(24).toString("hex");
    const hashed = await hashPassword(tempPassword);

    // Decode client-supplied attribution snapshot (first-touch from
    // localStorage, or fresh page context). Folded into the user.create
    // so gift-claim accounts inherit the campaign that drove them
    // instead of showing up as (direct) in admin/traffic forever.
    let attributionData: Record<string, string | null> = {};
    try {
      const raw = String(formData.get("attribution") ?? "");
      const parsed = (raw ? JSON.parse(raw) : null) as
        | AttributionPayload
        | null;
      const requestHeaders = await headers();
      const candidate = buildAttributionRecord(parsed, requestHeaders);
      const hasSignal = Object.values(candidate).some((v) => v !== null);
      if (hasSignal) attributionData = candidate;
    } catch (err) {
      console.error("[claim] attribution parse failed:", err);
    }

    user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashed,
        name: payload.name || "Reader",
        ...attributionData,
      },
      select: { id: true, email: true, name: true, tokenVersion: true },
    });
    isNewUser = true;
  }

  // Activate the 30-day gift membership.
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);
  await prisma.communityMembership.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      status: "ACTIVE",
      billingCycle: "gift",
      activatedAt: new Date(),
      approvedAt: new Date(),
      expiresAt,
    },
    update: {
      status: "ACTIVE",
      billingCycle: "gift",
      activatedAt: new Date(),
      approvedAt: new Date(),
      expiresAt,
    },
  });

  // Only set session cookies for the brand-new-account path. Existing
  // already-signed-in users keep their current session.
  if (isNewUser) {
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
      v: user.tokenVersion,
    });
    const cookieStore = await cookies();
    cookieStore.set("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });
    cookieStore.set("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    try {
      const resetToken = jwt.sign(
        { userId: user.id, type: "password-reset", v: user.tokenVersion },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" },
      );
      await sendInnerCircleWelcomeNewUser(
        user.email,
        user.name || "Reader",
        resetToken,
      );
    } catch (err) {
      console.error("[claim] welcome email failed for", user.email, err);
    }
  }

  // Onboarding drip. Fires for everyone activating a gift membership,
  // new account or existing. Mirrors the INNER_CIRCLE checkout flow,
  // gift claimers are inside Consilium for 30 days and benefit from
  // the same first-week orientation. Idempotent on email + sequence.
  try {
    const { buildConsiliumWelcomeSeries } = await import(
      "@/lib/email-sequences"
    );
    const existingSeq = await prisma.emailQueue.findFirst({
      where: {
        recipientEmail: user.email.toLowerCase(),
        sequence: "inner-circle-welcome",
      },
      select: { id: true },
    });
    if (!existingSeq) {
      const entries = buildConsiliumWelcomeSeries(
        user.email.toLowerCase(),
        user.name || "Reader",
      );
      await prisma.emailQueue.createMany({ data: entries });
    }
  } catch (err) {
    console.error("[claim] welcome series enqueue failed:", err);
  }

  redirect("/consilium/feed?claimed=1");
}

/**
 * /consilium/claim?token=...
 *
 * Landing page for the gift-invite email. Two flows:
 *
 *   1. Already logged in with matching email
 *      → render "Claim" button, server action activates + redirects to feed.
 *
 *   2. Not logged in / no account yet
 *      → render "Claim" button anyway. Server action finds-or-creates the
 *        account for the JWT's email, signs the user in, activates, and
 *        fires a welcome-with-password-set email.
 *
 * The button is always a form submit (not auto-on-mount) so email
 * link-scanners can't accidentally consume the claim.
 */
export default async function ClaimPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) return <ErrorScreen heading="Missing claim link" />;

  let payload: GiftPayload;
  try {
    payload = verifyGiftToken(token);
  } catch {
    return <ErrorScreen heading="This claim link is invalid or expired" />;
  }

  const userId = await optionalServerAuth();

  // Logged-in path: fast-check for email mismatch and already-paid cases
  // so we don't silently over-write a paying member's record.
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        communityMembership: {
          select: { status: true, billingCycle: true },
        },
      },
    });
    if (!user) return <ErrorScreen heading="Account lookup failed" />;

    if (user.email.toLowerCase() !== payload.email.toLowerCase()) {
      return (
        <ErrorScreen
          heading="This gift belongs to a different account"
          body={`The claim was issued to ${payload.email}. Log out and click the link again to claim with that email.`}
        />
      );
    }

    const cm = user.communityMembership;
    const onPaidPlan =
      cm &&
      cm.status === "ACTIVE" &&
      cm.billingCycle !== "gift" &&
      !cm.billingCycle.startsWith("bundle") &&
      !cm.billingCycle.startsWith("trial");

    if (onPaidPlan) return <AlreadyMember />;
  }

  // Show the claim button for everyone else, including guest buyers.
  return (
    <Shell>
      <ClaimButton
        token={token}
        name={payload.name}
        email={payload.email}
        action={claimAction}
      />
    </Shell>
  );
}

// ---------------------------------------------------------------------------
// Screens
// ---------------------------------------------------------------------------

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="relative z-10 min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="max-w-lg w-full px-4 text-center">{children}</div>
      </main>
    </>
  );
}

function AlreadyMember() {
  return (
    <Shell>
      <div className="rounded-3xl border border-warm-gold/20 bg-deep-black/50 p-10">
        <CheckCircle2 className="w-12 h-12 text-warm-gold mx-auto mb-4" />
        <h1 className="text-2xl font-extralight tracking-wider uppercase text-text-light mb-3">
          You&apos;re already a member
        </h1>
        <p className="text-text-gray font-light leading-relaxed mb-8">
          Your paid subscription already gives you full access, no need for
          the gift. Thanks for being here.
        </p>
        <Link
          href="/consilium/feed"
          className="inline-flex items-center gap-2 px-6 py-3 bg-warm-gold/10 border border-warm-gold/40 text-warm-gold rounded-full text-sm tracking-wider uppercase hover:bg-warm-gold/20 transition-all"
        >
          Enter The Consilium
          <ArrowRight size={14} />
        </Link>
      </div>
    </Shell>
  );
}

function ErrorScreen({
  heading,
  body,
}: {
  heading: string;
  body?: string;
}) {
  return (
    <Shell>
      <div className="rounded-3xl border border-red-500/20 bg-deep-black/50 p-10">
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h1 className="text-2xl font-extralight tracking-wider uppercase text-text-light mb-3">
          {heading}
        </h1>
        {body && <p className="text-text-gray font-light mb-6">{body}</p>}
        <Link
          href="/consilium"
          className="text-warm-gold hover:text-warm-gold/80 text-sm tracking-wider uppercase"
        >
          Go to The Consilium →
        </Link>
      </div>
    </Shell>
  );
}
