import { redirect } from "next/navigation";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import ConsiliumSimulatorTeaser from "@/components/consilium/ConsiliumSimulatorTeaser";
import FloatingConsiliumSeal from "@/components/consilium/FloatingConsiliumSeal";
import { catalogueStats } from "@/lib/simulator/stats";

export const metadata = {
  title: "The Consilium | Kanika Batra",
  description: `Home of the Dark Mirror Simulator. Duolingo for dark psychology. ${catalogueStats.scenarios} branching scenarios, ${catalogueStats.scenes} scenes, ${catalogueStats.tacticsTaught} manipulation tactics to learn to spot. Plus courses, voice notes, and a private community.`,
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

  // Benefits grouped into three clusters so the card reads as a
  // three-beat promise (practice / access / people) rather than a
  // flat seven-bullet checkbox list. Each group is a "chapter"; the
  // items inside are supporting points, not competing headlines.
  const benefitGroups = [
    {
      heading: "Practice",
      items: [
        `The Dark Mirror Simulator, ${catalogueStats.scenarios} branching scenarios across ${catalogueStats.tracks} tracks, ${catalogueStats.tacticsTaught} manipulation tactics to learn to spot`,
        "New scenarios, courses, and content added regularly",
      ],
    },
    {
      heading: "Access",
      items: [
        "Full course library, dark psychology, pattern recognition, career strategy",
        "Voice notes from Kanika, raw insights you won't hear anywhere else",
        "Member-exclusive pricing on the Sociopathic Dating Bible, $9.99 (normally $24.99)",
      ],
    },
    {
      heading: "People",
      items: [
        "Community feed, daily insights, discussion prompts, and posts from Kanika",
        "Forum and live chat, connect with members who see what you see",
      ],
    },
  ];

  return (
    <>
      <BackgroundEffects />
      <Header />
      {/* div, not main, the root layout already wraps children in a
          single <main>; a nested <main> here creates two "main content"
          landmarks which confuses assistive tech. */}
      <div className="min-h-screen pt-28 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4">

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

          {/* Hero, 2-column on tablet+: animated seal on the left,
              eyebrow + H1 + pitch + CTA on the right. On mobile the
              two columns stack with the seal above the text. Mirrors
              BookShowcase's layout shape so the two pillar pages feel
              built from the same template. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-20">
            {/* LEFT, animated seal as the section anchor */}
            <div className="flex justify-center order-1">
              <FloatingConsiliumSeal frameSize="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96" sealSize="!w-36 !h-36 sm:!w-44 sm:!h-44 lg:!w-56 lg:!h-56" />
            </div>

            {/* RIGHT, full pitch column */}
            <div className="text-center md:text-left order-2">
              <p className="text-warm-gold/90 uppercase tracking-[0.3em] text-xs sm:text-sm mb-4">
                Private Community · Membership
              </p>
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
              <p className="text-text-gray/85 italic text-sm mb-6 font-light">
                kon·sil·i·um &nbsp;·&nbsp; Latin: council, strategy, deliberation
              </p>
              <p className="text-lg lg:text-xl text-text-gray max-w-xl mx-auto md:mx-0 mb-3 font-light leading-relaxed">
                <strong className="text-text-light">
                  30 days from now you&apos;ll spot the move before it lands.
                </strong>{" "}
                Not by accident. Because someone trained you.
              </p>
              <p className="text-base lg:text-lg text-text-gray/85 max-w-xl mx-auto md:mx-0 mb-8 font-light leading-relaxed">
                The book teaches you the patterns. The Consilium is the
                private membership where you{" "}
                <strong className="text-text-light">practice them</strong>,
                every day, with members navigating the same situations you
                are.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/consilium/apply"
                  className="inline-flex items-center justify-center gap-2 py-4 px-10 rounded-full bg-warm-gold text-deep-black font-medium text-base tracking-wider uppercase transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.45)]"
                >
                  Join the Community, $29/month
                  <ArrowRight size={18} />
                </Link>
              </div>

              <p className="text-text-gray/75 text-sm mt-4">
                Instant access · cancel anytime · no application required
              </p>
            </div>
          </div>

          {/* Concrete feature blocks, replaces the 6-card icon grid
              (which read as AI-template) with the same checkmark-and-
              accent-bar pattern the BookShowcase uses. Real numbers,
              specific verbs, no decorative icons-in-circles. The
              Sociopathic Dating Bible is sold separately, members get
              it at the discounted $9.99, but the book is not bundled. */}
          <div className="max-w-3xl mx-auto space-y-3 mb-20">
            {[
              `${catalogueStats.scenarios} branching scenarios across ${catalogueStats.tracks} tracks. ${catalogueStats.scenes} scenes. ${catalogueStats.tacticsTaught} manipulation tactics. ${catalogueStats.redFlagsTaught} red flags catalogued.`,
              "Ask Kanika, submit one question per day, top-voted get answered by voice or video in your feed",
              "60 daily psychology drops + 28 themed weekday discussion prompts in your community feed",
              "Voice notes from Kanika, raw, unfiltered, dropped when something needs to be said",
              "Forum, live chat, daily insights, connect with members navigating the same patterns",
              "Every comment human-reviewed. Bad actors removed fast. Troll-free by design",
              "Want the book? Members get the Sociopathic Dating Bible at $9.99 (normally $24.99), separate purchase",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-deep-burgundy/20 to-deep-navy/10 border-l-2 sm:border-l-4 border-warm-gold hover:translate-x-1 sm:hover:translate-x-2 transition-transform"
              >
                <Check
                  className="text-warm-gold mt-0.5 shrink-0"
                  size={20}
                />
                <span className="text-text-light">{feature}</span>
              </div>
            ))}
          </div>

          {/* Dedicated simulator section, the Consilium's strongest
              differentiator. Shared with the homepage via the teaser
              component; "landing" variant gives a single Step-Inside
              CTA. The teaser handles its own section padding, so the
              parent div just provides bottom spacing for the next
              block. */}
          <div className="mb-20">
            <ConsiliumSimulatorTeaser variant="landing" />
          </div>

          {/* Testimonial, short, real, mirrors the BookShowcase's
              "Sarah K." pull-quote. Same line as the homepage so cross-
              page voice stays consistent. */}
          <div className="max-w-2xl mx-auto mb-20">
            <div className="glass-card p-6 sm:p-8 border-l-4 border-warm-gold text-center">
              <p className="text-text-light italic text-xl sm:text-2xl leading-relaxed font-light">
                &ldquo;Life changing.&rdquo;
              </p>
              <p className="text-warm-gold text-sm mt-3 uppercase tracking-[0.3em] font-light">
               . Inner Circle member
              </p>
            </div>
          </div>

          {/* What's Inside.
              Restructured from a flat 7-bullet checklist into three
              themed chapters (Practice / Access / People) so the card
              reads as a promise with shape, not another SaaS feature
              table. Each chapter gets a small uppercase label and its
              own small space-y-2 stack of bullet rows; the gold
              checkmark is replaced by a subtle warm-gold left accent
              bar per chapter so the eye reads "three things" before
              it reads "seven bullets". Calmer, easier to scan. */}
          <div className="mb-20">
            {/* Section heading. Previously "EVERYTHING INCLUDED" eyebrow
                + "WHAT'S INSIDE" H2, two uppercase tracked lines doing
                the same job. The H2 alone is enough; the three-chapter
                labels inside (PRACTICE / ACCESS / PEOPLE) provide the
                structural signposts. */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extralight tracking-wider uppercase text-text-light">
                What&apos;s Inside
              </h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="p-8 sm:p-10 bg-gradient-to-br from-deep-navy/60 to-deep-burgundy/60 backdrop-blur-sm border border-warm-gold/20 rounded-2xl">
                <div className="space-y-7 sm:space-y-8">
                  {benefitGroups.map((group) => (
                    <div key={group.heading} className="pl-4 border-l border-warm-gold/30">
                      <p className="text-warm-gold text-[11px] uppercase tracking-[0.3em] font-light mb-3">
                        {group.heading}
                      </p>
                      <ul className="space-y-2">
                        {group.items.map((item) => (
                          <li key={item} className="text-text-gray font-light leading-relaxed text-sm sm:text-base">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Value Stack.
              Component-by-component standalone pricing, then the
              bundled reveal. Each row names what the component
              would cost if sold separately, totals at the bottom,
              then the actual $29/mo lands as the punch. The effect
              is anchor-and-drop, the prospect reads $490 first and
              metabolises the $29 against that ceiling, not against
              "is $29 worth it on its own". The Sociopathic Dating
              Bible is NOT in this stack, it is sold separately
              ($9.99 member price, $24.99 standalone). */}
          <div className="mb-20">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-warm-gold/70 text-[11px] uppercase tracking-[0.35em] mb-3">
                  What you&apos;re actually getting
                </p>
                <h2 className="text-3xl font-extralight tracking-wider uppercase text-text-light">
                  The Stack
                </h2>
              </div>

              <div className="bg-gradient-to-br from-deep-navy/60 to-deep-burgundy/40 backdrop-blur-sm border border-warm-gold/25 rounded-2xl overflow-hidden">
                {[
                  {
                    name: "Weekly voice-note debriefs from Kanika",
                    sub: "52 a year, dropped when something needs to be said",
                    price: "$200 / yr",
                  },
                  {
                    name: "The Dark Mirror Simulator",
                    sub: `${catalogueStats.scenarios} branching scenarios, ${catalogueStats.tacticsTaught} tactics, live-fire practice`,
                    price: "$97",
                  },
                  {
                    name: "Daily Dark Insight cards",
                    sub: "60 rotating psychology drops + 28 themed weekday discussion prompts",
                    price: "$47",
                  },
                  {
                    name: "Ask Kanika queue",
                    sub: "One question per 24h, top-voted answered by voice or video in your feed",
                    price: "$147",
                  },
                ].map((row, i, arr) => (
                  <div
                    key={row.name}
                    className={`flex items-start justify-between gap-4 px-5 sm:px-7 py-4 ${
                      i < arr.length - 1 ? "border-b border-warm-gold/10" : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-text-light font-light text-sm sm:text-base leading-snug">
                        {row.name}
                      </p>
                      <p className="text-text-gray/75 text-xs sm:text-sm font-light leading-relaxed mt-0.5">
                        {row.sub}
                      </p>
                    </div>
                    <p className="text-warm-gold/85 font-light text-sm sm:text-base tabular-nums shrink-0 pt-0.5">
                      {row.price}
                    </p>
                  </div>
                ))}

                {/* Total row, separated by a heavier divider so the
                    eye reads "this is the total of the rows above"
                    before it lands on the $29 reveal. */}
                <div className="flex items-baseline justify-between gap-4 px-5 sm:px-7 py-4 border-t-2 border-warm-gold/30 bg-deep-black/40">
                  <p className="text-text-gray text-xs sm:text-sm uppercase tracking-[0.25em] font-light">
                    Standalone value
                  </p>
                  <p className="text-warm-gold text-xl sm:text-2xl font-extralight tabular-nums">
                    ~$490
                  </p>
                </div>

                {/* The drop. Big, gold, no decoration, the page has
                    been building up to this single number, give it
                    the room. */}
                <div className="text-center px-5 sm:px-7 py-7 bg-gradient-to-b from-warm-gold/[0.04] to-warm-gold/[0.10] border-t border-warm-gold/30">
                  <p className="text-text-gray/80 text-xs uppercase tracking-[0.3em] font-light mb-2">
                    Inside the Consilium
                  </p>
                  <div className="flex items-baseline justify-center gap-2 mb-1">
                    <span className="text-5xl sm:text-6xl font-extralight text-warm-gold leading-none">
                      $29
                    </span>
                    <span className="text-text-gray font-light">/ month</span>
                  </div>
                  <p className="text-text-gray/75 text-xs sm:text-sm font-light">
                    Cancel any time.
                  </p>
                </div>
              </div>

              {/* Guarantee, promoted from footnote to its own card.
                  Sits directly under the stack so the risk-reversal
                  message lands before the CTA, not after. */}
              <div className="mt-5 flex items-start gap-3 px-5 py-4 bg-deep-black/40 border border-warm-gold/20 rounded-xl">
                <ShieldCheck
                  size={20}
                  className="text-warm-gold mt-0.5 shrink-0"
                />
                <div>
                  <p className="text-text-light font-light text-sm sm:text-base">
                    Spend 7 days inside.
                  </p>
                  <p className="text-text-gray/85 font-light text-xs sm:text-sm mt-0.5 leading-relaxed">
                    If it&apos;s not the most useful $29 you&apos;ve spent
                    this year, message us for a full refund. No form, no
                    survey.
                  </p>
                </div>
              </div>

              <div className="mt-7 text-center">
                <Link
                  href="/consilium/apply"
                  className="inline-flex items-center justify-center gap-2 py-4 px-10 rounded-full bg-warm-gold text-deep-black font-medium text-base tracking-wider uppercase transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.45)]"
                >
                  Join the Consilium
                  <ArrowRight size={18} />
                </Link>
                <p className="text-text-gray/75 text-xs mt-3">
                  Instant access. Cancel anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Price comparison anchor.
              Kept the 3-tier bar as a secondary anchor: the value
              stack above does the "$515 collapsed to $29" reveal,
              this card does the comparable-spend frame ("less than a
              single coaching session"). Two different anchor moves
              targeting two different price-shopping mental models. */}
          <div className="mb-20">
            <div className="max-w-2xl mx-auto text-center p-10 bg-deep-black/50 border border-warm-gold/25 rounded-2xl">
              <p className="text-text-gray text-sm uppercase tracking-[0.25em] mb-4">For comparison</p>
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
                  the highlighted $29 cell uses, without this, the
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
              <p className="text-text-gray/85 text-sm font-light leading-relaxed">
                One coaching session covers ten months inside the Consilium.
                The book is sold separately, $9.99 for members ($24.99
                standalone). Pricing isn&apos;t the question. Showing up is.
              </p>
            </div>
          </div>

          {/* Closing section.
              Previously two orphaned grey body lines hanging after the
              $29 pricing card ("Want direct 1:1 access?" and "Have
              questions?"). A weak ending, the page asked for the
              close three times then trailed off. Consolidated into one
              quiet closing card that offers the two alternate paths
              (coaching, contact) side-by-side so the page ends on a
              deliberate note rather than a whisper. Kept uncommercial
             , no third CTA button; these are *alternatives* for
              visitors who don't want to join, not conversion paths. */}
          <div className="mb-4">
            <div className="max-w-2xl mx-auto text-center px-6 py-8 border-t border-warm-gold/10">
              <p className="text-text-gray/85 text-sm font-light mb-4">
                Still deciding?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm">
                <Link
                  href="/coaching"
                  className="text-warm-gold hover:text-warm-gold/80 transition-colors font-light"
                >
                  Explore private coaching →
                </Link>
                <span className="hidden sm:inline text-warm-gold/20">·</span>
                <Link
                  href="/contact"
                  className="text-warm-gold hover:text-warm-gold/80 transition-colors font-light"
                >
                  Get in touch →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
