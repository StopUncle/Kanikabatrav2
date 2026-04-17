import { redirect } from "next/navigation";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import ConsiliumSeal from "@/components/ConsiliumSeal";
import { ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Claim Your Free Month — The Consilium",
  robots: { index: false, follow: false },
};

interface GiftPayload {
  type: "consilium-gift";
  email: string;
  name: string;
  v: number;
}

/**
 * /consilium/claim?token=...
 *
 * Landing page for the gift-invite email. Verifies the JWT, then:
 *  - No token / bad token       → error screen
 *  - Not logged in              → send to /login?returnTo=... (preserves token)
 *  - Logged in, email mismatch  → error (claim is tied to the book-buyer email)
 *  - Logged in, email matches   → activate 30-day membership + redirect to feed
 *
 * Claim token has 90-day expiry (signed in the backfill script). After
 * claim, the 30-day countdown starts from now.
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
    // Pin the algorithm so an attacker can't forge a token by swapping
    // to `none` or a weaker algorithm. The backfill script signs with
    // HS256 (jsonwebtoken's default), so HS256 is the only acceptable
    // verification algorithm.
    payload = jwt.verify(token, process.env.JWT_SECRET!, {
      algorithms: ["HS256"],
    }) as GiftPayload;
    if (payload.type !== "consilium-gift") {
      throw new Error("wrong token type");
    }
  } catch {
    return <ErrorScreen heading="This claim link is invalid or expired" />;
  }

  const userId = await optionalServerAuth();

  // Not logged in — bounce to login, preserving the token so we come
  // back here after auth.
  if (!userId) {
    const returnTo = encodeURIComponent(`/consilium/claim?token=${token}`);
    redirect(`/login?returnTo=${returnTo}`);
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      communityMembership: {
        select: { status: true, billingCycle: true },
      },
    },
  });

  if (!user) return <ErrorScreen heading="Account lookup failed" />;

  // Email mismatch — the claim is tied to the book-buyer's email.
  if (user.email.toLowerCase() !== payload.email.toLowerCase()) {
    return (
      <ErrorScreen
        heading="This gift belongs to a different account"
        body={`The claim was issued to ${payload.email}. Log in with that email to claim.`}
      />
    );
  }

  // Already an ACTIVE paying member — their access is already covered,
  // send them to the feed instead of downgrading to a gift.
  const cm = user.communityMembership;
  const onPaidPlan =
    cm &&
    cm.status === "ACTIVE" &&
    cm.billingCycle !== "gift" &&
    !cm.billingCycle.startsWith("bundle") &&
    !cm.billingCycle.startsWith("trial");

  if (onPaidPlan) {
    return <AlreadyMember />;
  }

  // Activate — 30 days from now.
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

  return <SuccessScreen />;
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

function SuccessScreen() {
  return (
    <Shell>
      <div className="rounded-3xl border border-warm-gold/30 bg-gradient-to-br from-deep-black/80 via-deep-burgundy/10 to-deep-black/80 p-10 sm:p-12">
        <div className="flex justify-center mb-6">
          <ConsiliumSeal size="xl" haloed />
        </div>
        <p className="text-warm-gold/90 uppercase tracking-[0.3em] text-xs mb-3">
          Your Gift Is Claimed
        </p>
        <h1
          className="text-3xl sm:text-4xl font-extralight tracking-wider uppercase mb-4"
          style={{
            background:
              "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          30 Days Inside
        </h1>
        <p className="text-text-gray font-light leading-relaxed mb-8">
          Welcome. Your month starts now. Use it — the Consilium rewards
          members who actually show up.
        </p>
        <Link
          href="/consilium/feed"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-warm-gold text-deep-black rounded-full font-medium tracking-wider uppercase hover:bg-warm-gold/90 transition-all"
        >
          Enter The Consilium
          <ArrowRight size={16} />
        </Link>
      </div>
    </Shell>
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
          Your paid subscription already gives you full access — no need for
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
