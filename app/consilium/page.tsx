import { redirect } from "next/navigation";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import ConsiliumSeal from "@/components/ConsiliumSeal";
import {
  BookOpen,
  Mic,
  Shield,
  Users,
  Zap,
  Film,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import ConsiliumSimulatorTeaser from "@/components/consilium/ConsiliumSimulatorTeaser";

export const metadata = {
  title: "The Consilium | Kanika Batra",
  description:
    "Home of the Dark Mirror Simulator — Duolingo for dark psychology. 30 branching scenarios, 526 scenes, 83 manipulation tactics to learn to spot. Plus courses, voice notes, and a private community.",
};

export default async function InnerCircleLanding({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: statusParam } = await searchParams;
  const userId = await optionalServerAuth();

  if (userId) {
    const membership = await prisma.communityMembership.findUnique({
      where: { userId },
      select: { status: true },
    });

    if (membership?.status === "ACTIVE") {
      redirect("/consilium/feed");
    }
  }

  const features = [
    {
      icon: Film,
      title: "The Dark Mirror Simulator",
      description:
        "Duolingo for dark psychology — 30 branching scenarios where you practice catching manipulation in real time. No theory. Every choice has a consequence",
      highlight: true,
    },
    {
      icon: BookOpen,
      title: "Full Course Library",
      description:
        "Dark psychology foundations, pattern recognition, career power dynamics — learn at your own pace",
    },
    {
      icon: Mic,
      title: "Voice Notes from Kanika",
      description:
        "Raw, unfiltered insights dropped when something needs to be said — not on a schedule",
    },
    {
      icon: Zap,
      title: "Daily Psychology Drops",
      description:
        "Fresh insights on manipulation tactics, power dynamics, and strategic psychology — posted daily",
    },
    {
      icon: Shield,
      title: "Troll-Free Zone",
      description:
        "Every comment is reviewed. Bad actors are removed fast. This space is protected",
    },
    {
      icon: Users,
      title: "People Who Get It",
      description:
        "Connect with others navigating the same power dynamics — in relationships, career, and life",
    },
  ];

  const benefits = [
    "The Dark Mirror Simulator — 30 branching scenarios across three tracks, 83 manipulation tactics to learn to spot, 79 red flags catalogued",
    "Full access to the course library — dark psychology, pattern recognition, career strategy",
    "Voice notes from Kanika — raw insights you won't hear anywhere else",
    "Community feed — daily insights, discussion prompts, and posts from Kanika",
    "Forum and live chat — connect with other members who see what you see",
    "New scenarios, courses, and content added regularly",
    "Member-exclusive pricing on the Sociopathic Dating Bible — $9.99 (normally $24.99)",
  ];

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen pt-28 pb-16 relative z-10">
        <div className="max-w-5xl mx-auto px-4">

          {statusParam === "suspended" && (
            <div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-center">
              <p className="text-red-300 text-sm">
                Your membership has been suspended due to a payment issue. Please update your payment method or contact{" "}
                <a href="mailto:Kanika@kanikarose.com" className="text-warm-gold hover:underline">Kanika@kanikarose.com</a> for help.
              </p>
            </div>
          )}
          {statusParam === "cancelled" && (
            <div className="mb-8 p-4 bg-warm-gold/5 border border-warm-gold/25 rounded-xl text-center">
              <p className="text-text-gray text-sm">
                Your membership has ended. You can reapply below if you&apos;d like to rejoin.
              </p>
            </div>
          )}
          {statusParam === "expired" && (
            <div className="mb-8 p-4 bg-warm-gold/5 border border-warm-gold/25 rounded-xl text-center">
              <p className="text-text-gray text-sm">
                Your membership or approval has expired. You&apos;re welcome to reapply below.
              </p>
            </div>
          )}

          {/* Hero */}
          <div className="text-center mb-20">
            <div className="flex justify-center mb-8">
              <ConsiliumSeal size="xl" haloed />
            </div>
            <p className="text-warm-gold/90 uppercase tracking-[0.3em] text-sm mb-4">
              A Private Council
            </p>
            {/* H1 uses the same 3-stop warm-gold gradient as the Seal
                (#f3d98a -> #d4af37 -> #9c7a1f) so the heading reads as
                struck from the same metal as the medallion above. */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-wider uppercase mb-3"
              style={{
                background:
                  "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              The Consilium
            </h1>
            {/* Literary sub-line. Downgraded from uppercase-tracked
                ("KON·SIL·I·UM · LATIN: COUNCIL, STRATEGY, DELIBERATION")
                to lower-case italic serif so the H1 above owns the moment
                and the eye stops bouncing between three tracked eyebrows.
                The decorative gold hairline that used to sit between this
                line and the body was a break in rhythm — removed. */}
            <p className="text-text-gray/60 italic text-sm mb-8 font-light">
              kon·sil·i·um &nbsp;·&nbsp; Latin: council, strategy, deliberation
            </p>
            <p className="text-xl text-text-gray max-w-2xl mx-auto mb-6 font-light leading-relaxed">
              A private council for people who are done being the ones who get
              played. Practice catching manipulation in real time. Courses,
              voice notes, a space that&apos;s actually safe.
            </p>
            <p className="text-warm-gold/80 text-sm tracking-[0.15em] uppercase max-w-2xl mx-auto mb-10 font-light">
              Home of the Dark Mirror Simulator — Duolingo for dark psychology
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary conversion CTA. Uses the same warm-gold solid
                  treatment as every other Consilium CTA on the page
                  ("Start Practicing", "Step Inside") so the palette stays
                  coherent — no tacked-on indigo stop. */}
              <Link
                href="/consilium/apply"
                className="inline-flex items-center justify-center gap-2 py-4 px-10 rounded-full bg-warm-gold text-deep-black font-medium text-lg tracking-wider uppercase transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.45)]"
              >
                Join — $29/month
                <ArrowRight size={20} />
              </Link>
            </div>

            <p className="text-text-gray/50 text-sm mt-4">
              Instant access. Cancel anytime. No bullshit.
            </p>
          </div>

          {/* Features Grid. The simulator card gets a highlight treatment
              (warm-gold border + subtle gradient) so it reads as the flagship
              surface at a glance — everything else is supporting material. */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 group ${
                  feature.highlight
                    ? "bg-gradient-to-br from-deep-burgundy/25 via-deep-black/60 to-deep-navy/25 border border-warm-gold/45 hover:border-warm-gold/70 shadow-[0_8px_40px_-12px_rgba(212,175,55,0.25)]"
                    : "bg-deep-black/50 border border-warm-gold/15 hover:border-warm-gold/40 hover:shadow-[0_8px_40px_-12px_rgba(212,175,55,0.2)]"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all ${
                    feature.highlight
                      ? "bg-warm-gold/20 border border-warm-gold/50"
                      : "bg-warm-gold/10 border border-warm-gold/20 group-hover:bg-warm-gold/15 group-hover:border-warm-gold/40"
                  }`}
                >
                  <feature.icon className="w-6 h-6 text-warm-gold" strokeWidth={1.5} />
                </div>
                {/* The highlighted card's border + gradient already reads
                    as "the important one"; a separate "Flagship" pill on
                    top of that duplicated the signal, competed with the
                    dedicated simulator teaser section below (which is
                    the actual flagship surface), and read as ornament.
                    Dropped — the warm-gold border does the job alone. */}
                <h3 className="text-text-light font-light text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-text-gray font-light leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Dedicated simulator section — the Consilium's strongest
              differentiator. Shared with the homepage via the teaser
              component; "landing" variant gives a single Step-Inside
              CTA. The teaser handles its own section padding, so the
              parent div just provides bottom spacing for the next
              block. */}
          <div className="mb-20">
            <ConsiliumSimulatorTeaser variant="landing" />
          </div>

          {/* What's Inside */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <p className="text-warm-gold text-sm uppercase tracking-[0.3em] mb-3">Everything Included</p>
              <h2 className="text-3xl font-extralight tracking-wider uppercase text-text-light">
                What&apos;s Inside
              </h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="p-8 bg-gradient-to-br from-deep-navy/60 to-deep-burgundy/60 backdrop-blur-sm border border-warm-gold/20 rounded-2xl">
                <div className="space-y-4">
                  {benefits.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-warm-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <p className="text-text-gray font-light">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price Anchor */}
          <div className="mb-20">
            <div className="max-w-2xl mx-auto text-center p-10 bg-deep-black/50 border border-warm-gold/25 rounded-2xl">
              <p className="text-text-gray text-sm uppercase tracking-[0.25em] mb-4">The Math</p>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-extralight text-warm-gold">$29</span>
                <span className="text-text-gray font-light">/month</span>
              </div>
              <p className="text-text-gray font-light mb-6">
                Less than a single coaching session ($297). Full community access.
              </p>
              {/* All three cells share the same box model (border + py-2)
                  so their prices share a baseline. Cells 1-2 get a
                  transparent border that reserves the same 1px of space
                  the highlighted $29 cell uses — without this, the
                  highlighted cell sits 9px lower than the other two
                  because its border+padding expands its box. */}
              <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
                <div className="text-center border border-transparent rounded-lg py-2">
                  <div className="text-warm-gold/80 text-xl font-light">$297</div>
                  <div className="text-text-gray text-xs">1 Coaching Session</div>
                </div>
                <div className="text-center border border-transparent rounded-lg py-2">
                  <div className="text-warm-gold/80 text-xl font-light">$9.99</div>
                  <div className="text-text-gray text-xs">Book (Member Price)</div>
                </div>
                <div className="text-center border border-warm-gold/50 bg-warm-gold/5 rounded-lg py-2">
                  <div className="text-warm-gold text-xl font-light">$29</div>
                  <div className="text-text-gray text-xs">The Consilium</div>
                </div>
              </div>
              <Link
                href="/consilium/apply"
                className="inline-flex items-center justify-center gap-2 py-4 px-10 bg-warm-gold text-deep-black font-medium tracking-wider uppercase rounded-full transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.45)]"
              >
                Step Inside
                <ArrowRight size={18} />
              </Link>
              <p className="text-text-gray/40 text-xs mt-4">
                Instant access. Cancel anytime.
              </p>
            </div>
          </div>

          {/* Coaching Upgrade.
              mb-20 keeps this section on the same 80px rhythm as every
              other main section — previously mb-16 broke the cadence
              right at the tail. */}
          <div className="mb-20 text-center">
            <p className="text-text-gray font-light mb-2">Want direct 1:1 access?</p>
            <Link
              href="/coaching"
              className="text-warm-gold hover:text-warm-gold/80 transition-colors"
            >
              Explore Private Coaching →
            </Link>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <p className="text-text-gray font-light mb-6">
              Have questions?{" "}
              <Link href="/contact" className="text-warm-gold hover:text-warm-gold/80 transition-colors">
                Get in touch
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
